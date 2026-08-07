import { Box, Button, Container, Link, Typography } from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import {
  RECENT_ADVISORY_WINDOW_DAYS,
  advisoryHref,
  fetchSecurityAdvisories,
  mostSevere,
  recentAdvisories,
} from '@/utils/security';

/**
 * Banner shown when Pelican published a security advisory within the last
 * {@link RECENT_ADVISORY_WINDOW_DAYS} days, so administrators landing on the
 * homepage see it without going looking.
 *
 * The window is measured against build time — this site is statically
 * exported — and the deploy workflow rebuilds several times a day, so the
 * banner appears within hours of an advisory and disappears on its own.
 */
const SecurityBanner = async () => {
  const advisories = await fetchSecurityAdvisories();
  const recent = recentAdvisories(advisories);
  const headline = mostSevere(recent);

  if (!headline) {
    return null;
  }

  const others = recent.length - 1;

  return (
    <Box
      component='aside'
      aria-label='Security advisory'
      sx={{
        backgroundColor: '#FDECEA',
        borderBottom: '1px solid #F5C6C0',
        py: 1.75,
      }}
    >
      <Container maxWidth='lg'>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1.5,
          }}
        >
          <WarningAmberRoundedIcon sx={{ color: '#8C1D18' }} />
          <Typography
            variant='body1'
            sx={{ color: '#8C1D18', fontWeight: 600, flex: 1, minWidth: 260 }}
          >
            <Box component='span' sx={{ textTransform: 'capitalize' }}>
              {headline.severity ?? 'New'}
            </Box>{' '}
            security advisory: {headline.summary}
            {others > 0 && (
              <>
                {' '}
                <Box component='span' sx={{ fontWeight: 400 }}>
                  (and {others} other recent{' '}
                  {others === 1 ? 'advisory' : 'advisories'} —{' '}
                  <Link href='/security' color='inherit' underline='always'>
                    see all
                  </Link>
                  )
                </Box>
              </>
            )}
          </Typography>
          <Button
            component='a'
            href={advisoryHref(headline)}
            variant='contained'
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: '10px',
              px: 2.5,
              backgroundColor: '#8C1D18',
              whiteSpace: 'nowrap',
              '&:hover': { backgroundColor: '#6E1613' },
            }}
          >
            Read the advisory
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default SecurityBanner;
