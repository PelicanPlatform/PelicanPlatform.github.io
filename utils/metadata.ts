import type { Metadata } from 'next';
import {
  openGraphDefaults,
  pageTitle,
  shareImages,
  twitterDefaults,
} from '@chtc/web-components/content';
import { PELICAN_SITE } from '@/site.config';

/**
 * Metadata for a listing page: title, description, and its own canonical URL.
 *
 * The library builds metadata from a piece of content; a listing page has
 * none, so this assembles the same shape from the two lines of copy a list
 * page does have. It emits a complete `openGraph` block for the reason given
 * in `openGraphDefaults`: Next replaces the inherited one rather than
 * merging it.
 */
export function listingMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  const full = pageTitle(title, PELICAN_SITE);
  return {
    title: full,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...openGraphDefaults(PELICAN_SITE),
      type: 'website',
      title: full,
      description,
      url: path,
      images: shareImages(undefined, undefined, PELICAN_SITE),
    },
    twitter: { ...twitterDefaults, title: full, description },
  };
}

/** Hosts that are this site; a canonical naming one of them means "this page". */
const OWN_HOSTS = new Set(['pelicanplatform.org', 'www.pelicanplatform.org']);

/**
 * An article's `canonical_url`, unless it names this site.
 *
 * Articles are shared with the CHTC and OSG sites, so a syndicated one keeps
 * its off-site canonical. One naming this site falls back to the page's own
 * path, so a stale or mistyped address on this host never wins over the page
 * itself. A few values are wrapped in parentheses or padded with whitespace;
 * those are cleaned up, and anything still unparseable is dropped.
 */
export function offSiteCanonical(raw: string | undefined): string | undefined {
  const cleaned = raw?.trim().replace(/^\((.*)\)$/, '$1').trim();
  if (!cleaned) return undefined;
  try {
    const url = new URL(cleaned);
    return OWN_HOSTS.has(url.hostname) ? undefined : url.href;
  } catch {
    return undefined;
  }
}
