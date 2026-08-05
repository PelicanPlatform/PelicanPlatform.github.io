import matter from 'gray-matter';
import { getPaths, getRawFile, getTree } from './github';

type Website = 'htcondor' | 'path' | 'osg' | 'chtc' | 'pelican';

// Every field is optional in the source markdown, so nothing below may assume a
// key is present. A single presentation with missing front matter used to throw
// and take the whole static export (and therefore the deploy) down with it.
export interface Presentation {
  title: string;
  presenter: string;
  event?: string;
  date: string;
  publish_on?: Website[];
  published?: boolean;
  description?: string;
  keywords?: string[];
  links?: {
    name: string;
    value: string;
  }[];

  thumbnail?: {
    src: string;
    alt: string;
  };
  youtubeId?: string;
}

/**
 * The presentation data with additional fields used for the site.
 */
export interface BackendPresentation extends Presentation {
  slug: string[];
  path: string;
}

function getSlug(path: string) {
  const splitSlug = path.slice(0, -3).split('-');
  return [
    splitSlug[0],
    splitSlug[1],
    splitSlug[2],
    splitSlug.slice(3).join('-'),
  ];
}

function isPresentation(path: string) {
  const regex = /\d\d\d\d-\d\d?-\d\d?-.*?\.md/g;
  return path.search(regex) !== -1;
}

// A front matter list may be absent, null, or a bare scalar; normalize to an
// array so callers can iterate or search it without guarding first.
function asArray<T>(value: T | T[] | null | undefined): T[] {
  if (value === null || value === undefined) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}

function filterVisiblePresentations(presentation: BackendPresentation) {
  const isPublished = presentation.published ?? true;
  const isOnPelican = asArray(presentation.publish_on).includes('pelican');
  return isPublished && isOnPelican;
}

export async function getPresentations(
  organization: string,
  repo: string,
  branch: string
): Promise<BackendPresentation[]> {
  const tree = await getTree(organization, repo, branch);
  const paths = getPaths(tree);

  // Filter paths to only include presentation markdown files
  return Promise.all(
    paths
      .filter(isPresentation)
      .map(
        async (path) => await getPresentation(organization, repo, path, branch)
      )
  ).then((presentations) => presentations.filter(filterVisiblePresentations));
}

export async function getPresentation(
  organization: string,
  repo: string,
  path: string,
  branch: string
): Promise<BackendPresentation> {
  const text = await getRawFile(organization, repo, path, branch);
  const data = matter(text).data ?? {};

  // `?? undefined` collapses YAML nulls (a key written with no value) so the
  // components' default parameters kick in instead of receiving null.
  return {
    title: data.title ?? '',
    presenter: data.presenter ?? '',
    event: data.event ?? undefined,
    date: data.date ?? '',
    publish_on: asArray<Website>(data.publish_on),
    published: data.published ?? undefined,
    description: data.description ?? undefined,
    keywords: asArray<string>(data.keywords),
    links: asArray<{ name: string; value: string }>(data.links),
    thumbnail: data.image?.path
      ? {
          src: data.image.path,
          alt: data.image.alt ?? '',
        }
      : undefined,
    youtubeId: data.youtube_video_id ?? undefined,
    slug: getSlug(path),
    path: path,
  };
}

export function getTagColor(tag: string): string {
  // Simple hash function to generate a number from the tag string
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Generate hue from hash but skip harsh ranges (e.g., avoid 60–140 for green/yellow)
  let hue = Math.abs(hash) % 360;
  if (hue >= 60 && hue <= 140) {
    hue = (hue + 80) % 360;
  }

  const saturation = 70;
  const lightness = 40;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
