import { getPaths, getTree } from '@/utils/github';
import yaml from 'js-yaml';

export async function getStaff(website: Website): Promise<Staff[]> {
  return getStaffFromRepo(
    'chtc',
    'staff-list',
    'init-staff-list',
    'https://chtc.github.io/staff-list/',
    website
  );
}

async function getStaffFromRepo(
  organization: string,
  repo: string,
  branch: string,
  url: string,
  website: Website
): Promise<Staff[]> {
  const tree = await getTree(organization, repo, branch);
  const paths = getPaths(tree);

  // Filter out the non-article paths and pull down and parse the remote files
  return Promise.all(
    paths
      .filter((path) => path.endsWith('.yml') && !path.includes('/'))
      .map(async (path) => await fetchStaff(url, path, website))
  );
}

async function fetchStaff(
  baseURL: string,
  file: string,
  website: Website
): Promise<Staff> {
  const res = await fetch(baseURL + file);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch staff file: ${res.status} ${res.statusText} \n ${baseURL + file}`
    );
  }

  const text = await res.text();
  const json = yaml.load(text) as Staff;

  return {
    ...json,
    ...json?.[website],
    image: baseURL + json.image,
  };
}

export type Staff = StaffBase & {
  [key in Website]?: Partial<StaffBase>;
};

type Website = 'htcondor' | 'path' | 'osg' | 'chtc' | 'pelican';

interface StaffBase {
  name: string;
  image: string;
  title: string;
  website?: string;
  institution?: string;
  promoted?: boolean;
  weight?: number;
  description?: string;
  status: 'Staff' | 'Student' | 'Past';
  organizations: Website[];
}
