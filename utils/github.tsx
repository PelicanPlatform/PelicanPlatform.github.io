interface GitTreeItem {
  path: string;
  mode: string;
  type: string;
  sha: string;
  size: number;
  url: string;
}
interface GitTree {
  sha: string;
  url: string;
  tree: GitTreeItem[];
}

export async function getTree(
  organization: string,
  repo: string,
  branch: string
): Promise<GitTree> {
  const url = `https://api.github.com/repos/${organization}/${repo}/git/trees/${branch}?recursive=1`;
  const res = await fetch(url);
  const json = await res.json();
  return json as GitTree;
}

export function getPaths(tree: GitTree): string[] {
  return tree.tree.map((item) => item['path']);
}

export async function getRawFile(
  organization: string,
  repo: string,
  path: string,
  branch: string
): Promise<string> {
  const url = new URL(
    `https://raw.githubusercontent.com/${organization}/${repo}/${branch}/${path}`
  );

  const res = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.raw',
      authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  return await res.text();
}

/**
 * Provided a Github URL will paginate all the results available and return a single array
 */
export const getAll = async (apiUrl:string) => {
  // This function will fetch all pages of a Github API endpoint
  const results: any[] = [];
  let page = 1;
  let perPage = 100; // Default to 100 items per page
  let url = `${apiUrl}?per_page=${perPage}&page=${page}`;

  while (true) {

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }
    const data = await res.json();
    results.push(...data);

    // Check if there is a next page of results
    const linkHeader = res.headers.get('link');
    const nextLinkHeaderValue = linkHeader?.split(',').find((link: string) => link.endsWith('"next"'))


    // Check if the link header exists and contains a link to the next page
    if (!res.headers.get('link') || nextLinkHeaderValue == undefined) {
      // No more pages
      break;
    }

    // Parse the next url from the header which is in form
    // `<https://api.github.com/repositories/652665253/releases?page=2>; rel="next"`
    const nextUrlMatch = nextLinkHeaderValue?.match(/<([^>]+)>/);
    url = nextUrlMatch && nextUrlMatch[1] ? nextUrlMatch[1] : ''; // Extract the URL from the match
  }

  return results;
}

export interface GitHubReleaseData {
  tag_name: string;
  target_commitish: string;
  body: string;
  id: number;
  name: string;
  published_at: string;
  html_url: string;
  prerelease: boolean;
}

export interface ReleasePageProps {
  releaseData: GitHubReleaseData;
}

export interface GithubMilestoneData {
  title: string;
  state: 'open' | 'closed';
  created_at: string;
  updated_at: string;
  closed_at: string;
  due_on: string;
}
