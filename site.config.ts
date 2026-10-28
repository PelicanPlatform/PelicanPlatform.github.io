import type { SiteMetadata } from '@chtc/web-components/content';

/**
 * What this site is.
 *
 * The name, the one-line description and the share image live here and
 * `app/layout.tsx`, `app/manifest.ts` and the metadata helpers read from
 * this module, so changing any of them is a one-place edit.
 */
export const siteConfig = {
  name: 'Pelican Platform',
  shortName: 'Pelican',
  description:
    'Open-source software for federating data repositories and delivering their objects to computing capacity anywhere.',
  locale: 'en_US',
  /**
   * The one production address, matching `CNAME`. The sitemap, robots.txt
   * and canonical links need it absolute. It is written out rather than read
   * from `HOSTNAME`, which shells and CI runners set to the machine's name.
   */
  url: 'https://pelicanplatform.org',
  /**
   * The site-wide share image.
   *
   * `app/opengraph-image.jpg` already covers every page that does not define
   * its own `openGraph` block. A page that does define one has to name an
   * image explicitly, because Next replaces the inherited block wholesale
   * rather than merging it — this is that same file.
   */
  shareImage: {
    url: '/opengraph-image.jpg',
    width: 1200,
    height: 630,
    alt: 'The Pelican Platform logo',
  },
} as const;

/**
 * The same identity in the shape `@chtc/web-components`' metadata builders
 * take. They are handed a site per call rather than reading the environment,
 * so this is the one place the site names itself to them.
 */
export const PELICAN_SITE: SiteMetadata = {
  siteName: siteConfig.name,
  locale: siteConfig.locale,
  fallbackImage: { ...siteConfig.shareImage },
};
