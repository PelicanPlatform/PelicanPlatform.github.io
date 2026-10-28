import type { MetadataRoute } from 'next';
import { siteConfig } from '@/site.config';

// A statically exported site has no server to run this on request.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { allow: ['/'] },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
