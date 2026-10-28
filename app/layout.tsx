import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { ThemeProviderClient } from '@/public/theme';
import Footer from '@/components/layout/Footer';
import { siteConfig } from '@/site.config';
import styles from './page.module.css';

/*
 * Site-wide metadata. Every page inherits what it does not set, so this holds
 * only the fields that are true of the whole site.
 *
 * `openGraph` and `twitter` deliberately carry no title, description or url:
 * a child that sets plain `title`/`description` does not get its values
 * copied into an inherited `openGraph` block, so anything named here would
 * stick on every page. Left unset, Next fills og:title and og:description
 * from each page's own title and description. The shared og:image comes from
 * `opengraph-image.jpg` in this folder, which applies to every route.
 */
export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    locale: siteConfig.locale,
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <ThemeProviderClient>
        <body>
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer />
        </body>
      </ThemeProviderClient>
    </html>
  );
}
