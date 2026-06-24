import { Box, Button, Grid, Typography } from '@mui/material';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import CloudRoundedIcon from '@mui/icons-material/CloudRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import { SvgIconComponent } from '@mui/icons-material';

import { Section, SectionHeading, tokens } from '@/components/ui/Section';

const ADD_DATA_HREF =
  'https://docs.pelicanplatform.org/getting-started#adding-your-data-to-an-existing-federation';

interface Backend {
  name: string;
  color: string;
  tint: string;
  Icon: SvgIconComponent;
  description: string;
}

// The storage backends an Origin can sit in front of and export to a
// federation — no copying or moving of the underlying data required.
const BACKENDS: Backend[] = [
  {
    name: 'POSIX',
    color: '#1B43C9',
    tint: '#EAEFFC',
    Icon: FolderRoundedIcon,
    description: 'Local and network-mounted filesystems.',
  },
  {
    name: 'S3',
    color: '#0E9F8E',
    tint: '#E0F4F1',
    Icon: CloudRoundedIcon,
    description: 'Amazon S3 and S3-compatible object stores.',
  },
  {
    name: 'Globus',
    color: '#6A5AE0',
    tint: '#EDEAFC',
    Icon: HubRoundedIcon,
    description: 'Collections served from Globus endpoints.',
  },
  {
    name: 'SSH',
    color: '#1E293B',
    tint: '#E8ECF3',
    Icon: TerminalRoundedIcon,
    description: 'Files on a remote host over SSH.',
  },
  {
    name: 'HTTPS',
    color: '#17A2DC',
    tint: '#E4F4FC',
    Icon: LanguageRoundedIcon,
    description: 'Existing web servers and HTTP(S) endpoints.',
  },
];

export default function SupportedBackends() {
  return (
    <Section id='backends' tone='light' sx={{ scrollMarginTop: { xs: '64px', lg: '1rem' } }}>
      <SectionHeading
        eyebrow='Supported Backends'
        title='Connect your existing data repository'
        subtitle='An Origin sits in front of the storage you already have and exports its
          objects to the federation — without moving or copying a thing.'
      />
      <Grid container spacing={3} justifyContent='center'>
        {BACKENDS.map((backend) => (
          <Grid key={backend.name} size={{ xs: 6, sm: 4, md: 'grow' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                height: '100%',
                backgroundColor: tokens.white,
                border: `1px solid ${tokens.cardLine}`,
                borderRadius: '18px',
                p: { xs: 2.5, md: 3 },
              }}
            >
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: '13px',
                  bgcolor: backend.tint,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                <backend.Icon sx={{ fontSize: 28, color: backend.color }} />
              </Box>
              <Typography
                variant='inherit'
                sx={{ fontSize: '1.05rem', fontWeight: 700, color: tokens.ink, mb: 0.75 }}
              >
                {backend.name}
              </Typography>
              <Typography
                variant='inherit'
                sx={{ fontSize: '0.85rem', lineHeight: 1.55, color: tokens.body }}
              >
                {backend.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ textAlign: 'center', mt: { xs: 4, md: 6 } }}>
        <Button
          component='a'
          href={ADD_DATA_HREF}
          target='_blank'
          rel='noopener noreferrer'
          variant='contained'
          size='large'
          sx={{
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            borderRadius: '12px',
            px: 3.5,
            py: 1.4,
            boxShadow: '0 10px 24px rgba(8,133,255,0.26)',
          }}
        >
          Connect my data to the OSDF
        </Button>
      </Box>
    </Section>
  );
}
