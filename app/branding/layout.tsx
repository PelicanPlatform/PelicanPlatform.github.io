import { listingMetadata } from '@/utils/metadata';

// The page is a client component, which cannot export metadata, so it lives
// on this pass-through layout instead.
export const metadata = listingMetadata(
  'Branding',
  'Pelican Platform logos, icons, colors and diagrams for use in presentations and publications.',
  '/branding'
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
