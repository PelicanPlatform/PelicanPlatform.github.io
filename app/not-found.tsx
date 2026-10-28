import type { Metadata } from 'next';
import { Link, Typography } from '@mui/material';
import { Section, SectionHeading, tokens } from '@/components/ui/Section';

export const metadata: Metadata = {
  title: '404 Not Found — Pelican Platform',
  description:
    'The page you were looking for was not found on the Pelican Platform website.',
  // Nothing here is worth a search result, and it has no canonical URL of its
  // own: the same page answers for every address that does not exist.
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Section tone='light' maxWidth='md' borderTop={false}>
      <SectionHeading eyebrow='404' title='Page Not Found' align='left' />
      <Typography
        variant='inherit'
        component='p'
        sx={{ fontSize: '1.1rem', lineHeight: 1.7, color: tokens.body }}
      >
        The page you were looking for was not found. Try the{' '}
        <Link href='/' underline='hover'>
          home page
        </Link>{' '}
        or the{' '}
        <Link href='https://docs.pelicanplatform.org/' underline='hover'>
          documentation
        </Link>
        , or email{' '}
        <Link href='mailto:help@pelicanplatform.org' underline='hover'>
          help@pelicanplatform.org
        </Link>
        .
      </Typography>
    </Section>
  );
}
