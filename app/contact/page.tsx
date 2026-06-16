import { Link, Typography } from '@mui/material';
import { Section, SectionHeading, tokens } from '@/components/ui/Section';

export default function Page() {
  const paragraph = {
    fontSize: '1.1rem',
    lineHeight: 1.7,
    color: tokens.body,
    mb: 2,
  };

  return (
    <Section tone='light' maxWidth='md' borderTop={false}>
      <SectionHeading
        eyebrow='Get in Touch'
        title='Contact Pelican Platform'
        align='left'
      />
      <Typography variant='inherit' component='p' sx={paragraph}>
        For help using the Pelican software suite, please refer to our{' '}
        <Link
          href='https://docs.pelicanplatform.org/'
          target='_blank'
          rel='noopener'
          underline='hover'
        >
          documentation
        </Link>{' '}
        or email{' '}
        <Link href='mailto:help@pelicanplatform.org' underline='hover'>
          help@pelicanplatform.org
        </Link>
        .
      </Typography>
      <Typography variant='inherit' component='p' sx={{ ...paragraph, mb: 0 }}>
        To connect with the Pelican PI team, please email{' '}
        <Link href='mailto:pi-team@pelicanplatform.org' underline='hover'>
          pi-team@pelicanplatform.org
        </Link>
        .
      </Typography>
    </Section>
  );
}
