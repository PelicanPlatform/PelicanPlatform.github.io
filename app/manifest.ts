import type { MetadataRoute } from 'next';
import { siteConfig } from '@/site.config';

/*
 * Web app manifest, emitted at /manifest.webmanifest and linked from every
 * page. The theme color is the primary blue from `public/theme.tsx`, repeated
 * as a literal because that module is a client component.
 */
// `manifest.ts` is a Route Handler, and a statically exported site has no
// server to run it on request, so it has to be marked static explicitly.
export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#0885ff',
    icons: [
      {
        src: '/pelican-icon-512.png',
        type: 'image/png',
        sizes: '512x512',
      },
    ],
  };
}
