import { GitHubReleaseData } from './github';

export type OrganizedReleasesType = {
  [key: string]: {
    mainRelease?: GitHubReleaseData;
    minorReleases: GitHubReleaseData[];
  };
};

// This function fetches all releases from the GitHub API
export async function fetchAllReleases(
  excludeReleaseCandidates: boolean = true
): Promise<GitHubReleaseData[]> {
  const apiUrl =
    'https://api.github.com/repos/PelicanPlatform/pelican/releases';

  const response = await fetch(apiUrl);
  let releases: GitHubReleaseData[] = await response.json();

  if (excludeReleaseCandidates) {
    releases = releases.filter(
      (release) => !release.tag_name.match(/^.*rc.*$/)
    );
  }

  return releases;
}

// Organize releases into main and minor releases
export async function organizeReleases() {
  let releases = await fetchAllReleases();
  const organizedReleases: OrganizedReleasesType = {};

  releases.forEach((release) => {
    const versionMatch = release.tag_name.match(/^(v\d+\.\d+)\.(\d+)$/);
    if (versionMatch) {
      const [, baseVersion, patchVersion] = versionMatch;

      if (patchVersion === '0') {
        // It's a main release
        if (!organizedReleases[baseVersion]) {
          organizedReleases[baseVersion] = {
            mainRelease: release,
            minorReleases: [],
          };
        } else {
          // Update the main release in case the ordering was off
          organizedReleases[baseVersion].mainRelease = release;
        }
      } else {
        // It's a minor release
        if (!organizedReleases[baseVersion]) {
          organizedReleases[baseVersion] = {
            minorReleases: [release],
          };
        } else {
          organizedReleases[baseVersion].minorReleases.push(release);
        }
      }
    }
  });

  // Filter out any entries that do not have a main release, if necessary
  // This step depends on whether you still want to keep the minor versions even if the main version is missing
  const filteredOrganizedReleases: OrganizedReleasesType = Object.keys(organizedReleases).reduce(
    (acc, key) => {
      if (organizedReleases[key]?.mainRelease) {
        acc[key] = organizedReleases[key];
      }
      return acc;
    },
    {} as OrganizedReleasesType
  );

  return filteredOrganizedReleases;
}
