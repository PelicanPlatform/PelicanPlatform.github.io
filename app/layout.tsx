import './globals.css';
import { Header } from '@/components/layout/Header';
import { ThemeProviderClient } from '@/public/theme';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';

export const metadata = {
  title: 'Pelican Platform',
  description: 'Software designed to make data distribution easy',
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
