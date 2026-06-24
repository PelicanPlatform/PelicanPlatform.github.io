import { Box, Container, Grid, Typography } from '@mui/material';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import { SvgIconComponent } from '@mui/icons-material';
import ArrowRight from '@/components/svg/arrowright';

interface PelicanClient {
  name: string;
  tag: string;
  color: string;
  tint: string;
  Icon: SvgIconComponent;
  description: string;
  href: string;
  /** Call-to-action label for the card. Defaults to "Learn more". */
  action?: string;
}

// The ways to access data from a Pelican federation. The first three are the
// clients featured in the docs' "Getting Data With Pelican" section; the web
// client rounds out the set for browser-based access.
const CLIENTS: PelicanClient[] = [
  {
    name: 'Command-Line Client',
    tag: 'TERMINAL',
    color: '#1E293B',
    tint: '#E8ECF3',
    Icon: TerminalRoundedIcon,
    description:
      'Get, put, list, and sync objects from any terminal with the pelican client. Ideal for scripting and moving large collections of data.',
    href: 'https://docs.pelicanplatform.org/getting-data-with-pelican/client',
  },
  {
    name: 'Python (FSSpec)',
    tag: 'LIBRARY',
    color: '#1B43C9',
    tint: '#EAEFFC',
    Icon: CodeRoundedIcon,
    description:
      'The pelicanfs library plugs Pelican straight into Python — read objects from xarray, PyTorch data loaders, or a Jupyter notebook.',
    href: 'https://docs.pelicanplatform.org/getting-data-with-pelican/fsspec',
  },
  {
    name: 'HTCondor Plugin',
    tag: 'JOBS',
    color: '#0E9F8E',
    tint: '#E0F4F1',
    Icon: HubRoundedIcon,
    description:
      'Pelican is the preferred file-transfer plugin for HTCondor pools like the OSPool, delivering job inputs and outputs with automatic retries.',
    href: 'https://docs.pelicanplatform.org/advanced-concepts/plugin',
  },
  {
    name: 'Web Client',
    tag: 'BROWSER',
    color: '#6A5AE0',
    tint: '#EDEAFC',
    Icon: PublicRoundedIcon,
    description:
      'Open public objects right in the browser through their HTTPS URL — the Director routes you to the nearest cache. No install required.',
    href: 'https://osdf-client.osg-htc.org',
    action: 'View Web Client',
  },
];

export default function ClientCards() {
  return (
    <Box
      component='section'
      id='clients'
      sx={{
        backgroundColor: '#F7FAFE',
        borderTop: '1px solid #EAF1FB',
        py: { xs: 6, md: 10 },
        scrollMarginTop: { xs: '64px', lg: '1rem' },
      }}
    >
      <Container maxWidth='lg'>
        {/* Heading */}
        <Box sx={{ textAlign: 'center', maxWidth: 720, mx: 'auto', mb: { xs: 4, md: 6 } }}>
          <Typography
            variant='inherit'
            sx={{
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              fontWeight: 600,
              fontSize: '0.8rem',
              color: 'primary.main',
              mb: 1.5,
            }}
          >
            Clients &amp; Tools
          </Typography>
          <Typography variant='h3' sx={{ fontWeight: 700, mb: 1.5 }}>
            Get your data, anywhere.
          </Typography>
          <Typography variant='h6' sx={{ fontWeight: 400, color: 'text.secondary' }}>
            Pelican meets your data where it lives — from the command line to your
            Python code, your batch jobs, or a browser.
          </Typography>
        </Box>

        {/* Client cards */}
        <Grid container spacing={3}>
          {CLIENTS.map((client) => (
            <Grid key={client.name} size={{ xs: 12, sm: 6, md: 3 }}>
              <Box
                component='a'
                href={client.href}
                target='_blank'
                rel='noopener noreferrer'
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  textDecoration: 'none',
                  color: 'inherit',
                  backgroundColor: '#ffffff',
                  border: '1px solid #E4ECF8',
                  borderRadius: '18px',
                  p: 3,
                  transition: 'transform .18s ease, box-shadow .18s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 14px 30px rgba(13,30,80,0.10)',
                    '.client-arrow': { transform: 'translateX(0.3em)' },
                  },
                }}
              >
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: '13px',
                    bgcolor: client.tint,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <client.Icon sx={{ fontSize: 28, color: client.color }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography
                    variant='inherit'
                    sx={{ fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.2, color: '#0A1652' }}
                  >
                    {client.name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    alignSelf: 'flex-start',
                    fontSize: '0.62rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    color: client.color,
                    bgcolor: client.tint,
                    px: 0.75,
                    py: '3px',
                    borderRadius: '6px',
                    mb: 1.5,
                  }}
                >
                  {client.tag}
                </Box>
                <Typography
                  variant='inherit'
                  sx={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#56638A' }}
                >
                  {client.description}
                </Typography>
                <Box
                  sx={{
                    mt: 'auto',
                    pt: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: client.color,
                  }}
                >
                  {client.action ?? 'Learn more'}
                  <ArrowRight
                    className='client-arrow'
                    height={14}
                    width={20}
                    fill={'currentColor'}
                  />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
