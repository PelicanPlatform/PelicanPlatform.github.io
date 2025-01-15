import { Box, Container, Typography, Divider } from '@mui/material';
import Link from 'next/link';
export default function Page() {
  return (
    <Box pt={4}>
      <Container maxWidth={'md'}>
        <Typography
          variant={'h3'}
          sx={{ fontWeight: '600', textAlign: { xs: 'center', lg: 'left' } }}
        >
          Contact Pelican Platform
        </Typography>
        <Divider sx={{ margin: 2 }} />
        <Typography variant={'h6'} sx={{ fontWeight: '400' }}>
          For help using the Pelican software suite please refer to our
          <Link
            style={{ color: '#0885ff' }}
            href='https://docs.pelicanplatform.org/'
          >
            {' '}
            documentation{' '}
          </Link>
          or email
          <Link
            style={{ color: '#0885ff' }}
            href='mailto:help@pelicanplatform.org'
          >
            {' '}
            help@pelicanplatform.org
          </Link>
          .
        </Typography>
        <Typography variant={'h6'} sx={{ fontWeight: '400' }}>
          To connect with the Pelican PI team please email{' '}
          <Link
            style={{ color: '#0885ff' }}
            href='mailto:pi-team@pelicanplatform.org'
          >
            pi-team@pelicanplatform.org
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
