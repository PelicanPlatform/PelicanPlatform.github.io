import { Box, Container, Grid, Typography } from '@mui/material';

import { COMPONENT_BY_KEY, ComponentKey } from './pelicanComponents';
import ArrowRight from '@/components/svg/arrowright';

const ADD_DATA_HREF =
  'https://docs.pelicanplatform.org/getting-started#adding-your-data-to-an-existing-federation';

// Demo ordering: the two storage services, then the two central services.
const DETAIL_ORDER: ComponentKey[] = ['origin', 'cache', 'director', 'registry'];

export default function ComponentDetails() {
  return (
    <Box
      component='section'
      sx={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid #EAF1FB',
        py: { xs: 6, md: 10 },
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
            Meet the Components
          </Typography>
          <Typography variant='h3' sx={{ fontWeight: 700, mb: 1.5 }}>
            What each part does.
          </Typography>
          <Typography variant='h6' sx={{ fontWeight: 400, color: 'text.secondary' }}>
            Two storage services run by data owners and sites, and two central
            services run by the federation — together they make data findable,
            trustworthy, and fast.
          </Typography>
        </Box>

        {/* Detail cards */}
        <Grid container spacing={3}>
          {DETAIL_ORDER.map((key) => {
            const c = COMPONENT_BY_KEY[key];
            return (
              <Grid key={key} size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#ffffff',
                    border: '1px solid #E4ECF8',
                    borderRadius: '18px',
                    p: { xs: 3, md: 4 },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box
                      sx={{
                        flex: 'none',
                        width: 52,
                        height: 52,
                        borderRadius: '13px',
                        bgcolor: c.tint,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <c.Icon size={27} color={c.color} />
                    </Box>
                    <Box>
                      <Typography
                        variant='inherit'
                        sx={{ fontSize: '1.4rem', fontWeight: 700, lineHeight: 1.2, color: '#0A1652' }}
                      >
                        {c.name}
                      </Typography>
                      <Typography
                        variant='inherit'
                        sx={{
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          color: c.color,
                        }}
                      >
                        {c.group === 'Storage Services' ? 'Storage Service' : 'Central Service'}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    variant='inherit'
                    sx={{ fontSize: '1rem', lineHeight: 1.7, color: 'text.secondary' }}
                  >
                    {c.long}
                  </Typography>
                  {key === 'origin' && (
                    <Box
                      component='a'
                      href={ADD_DATA_HREF}
                      target='_blank'
                      rel='noopener noreferrer'
                      sx={{
                        mt: 'auto',
                        pt: 3,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.75,
                        alignSelf: 'flex-start',
                        textDecoration: 'none',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: c.color,
                        '&:hover .add-data-arrow': { transform: 'translateX(0.3em)' },
                      }}
                    >
                      Connect my data to OSDF
                      <ArrowRight
                        className='add-data-arrow'
                        height={14}
                        width={20}
                        fill={'currentColor'}
                        style={{ transition: 'transform .18s ease' }}
                      />
                    </Box>
                  )}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
