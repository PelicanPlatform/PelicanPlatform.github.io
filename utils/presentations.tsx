/**
 * The full presentation data structure from Figshare.
 */
export interface Presentation {
  id: number;
  title: string;
  description: string;
  authors: {
    id: number;
    full_name: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    url_name: string;
    orcid_id: string | null;
  }[];
  figshare_url: string;
  download_disabled: boolean;
  files: {
    id: number;
    name: string;
    size: number;
    is_link_only: boolean;
    download_url: string;
    supplied_md5: string;
    computed_md5: string;
    mimetype: string;
  }[];
  funding: string;
  funding_list: {
    id: number;
    title: string;
    grant_code: string | null;
    funder_name: string | null;
    is_user_defined: number;
    url?: string;
  }[];
  license: {
    value: number;
    name: string;
    url: string;
  };
  tags: string[];
  categories: {
    id: number;
    title: string;
    parent_id: number;
    path: string;
    source_id: string;
    taxonomy_id: number;
  }[];
  citation: string;
  published_date: string;
  thumb: string;
  doi: string;
  status: string;
  defined_type_name: string;
  url_public_html: string;
  created_date: string;
  modified_date: string;
  timeline: {
    posted: string;
    firstOnline: string;
  };
}

/**
 * The presentation data with additional fields used for the site.
 */
export interface BackendPresentation extends Presentation {
  slug: string[];
  path: string;
  download_url: string;
}

export async function getPresentations(): Promise<BackendPresentation[]> {
  try {
    const response = await fetch(
      'https://api.figshare.com/v2/collections/6881710/articles'
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch Figshare articles: ${response.statusText}`
      );
    }

    // does not return full data, just slimmed down
    const slimData = await response.json();

    // get the full data for each presentation from the API
    const fullDataPromises = slimData.map((item: { url: string; }) =>
      fetch(item.url).then(res => res.json())
    );
    const fullData = await Promise.all(fullDataPromises);

    return fullData.map((presentation) => ({
      ...presentation,
      slug: presentation.title
        .toLowerCase()
        .replace(/[\s:/()]+/g, '-')
        .split('/'),
    }));
  } catch (error) {
    console.error('Error fetching presentations from Figshare:', error);
    return [];
  }
}

export async function getPresentation(
  articleId: number
): Promise<Presentation> {
  try {
    const response = await fetch(
      `https://api.figshare.com/v2/articles/${articleId}`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch Figshare article: ${response.statusText}`
      );
    }

    const data = await response.json();
    // console.log("Presentation fetched from Figshare:", data)
    return data;
  } catch (error) {
    console.error('Error fetching presentation from Figshare:', error);
    return Promise.reject(error);
  }
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
