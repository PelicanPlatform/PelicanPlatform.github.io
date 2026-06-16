'use client';

import ExportedImage from 'next-image-export-optimizer';
import { Box, Container, Grid, Link as MuiLink, Typography } from '@mui/material';
import Link from 'next/link';

import chtcLogo from '../../public/static/images/CHTC_Logo.svg';
import morgridgeLogo from '../../public/static/images/Morgridge_Logo.png';
import { tokens } from '@/components/ui/Section';

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        borderTop: `1px solid ${tokens.sectionLine}`,
        backgroundColor: tokens.light,
        py: 5,
      }}
    >
      <Container maxWidth='xl'>
        <Grid
          container
          spacing={3}
          alignItems='center'
          justifyContent='space-between'
        >
          <Grid>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Link href={'https://chtc.cs.wisc.edu'}>
                <ExportedImage src={chtcLogo} alt={'CHTC Logo'} height={40} />
              </Link>
              <Link href={'https://morgridge.org'}>
                <ExportedImage
                  src={morgridgeLogo}
                  alt={'Morgridge Logo'}
                  height={40}
                />
              </Link>
            </Box>
          </Grid>
          <Grid>
            <Box
              sx={{
                display: 'flex',
                gap: 3,
                fontSize: '0.95rem',
                fontWeight: 600,
                color: tokens.ink,
              }}
            >
              <MuiLink href={'/branding'} underline='hover' color='inherit'>
                Branding
              </MuiLink>
              <MuiLink href={'/contact'} underline='hover' color='inherit'>
                Contact Us
              </MuiLink>
              <MuiLink
                href={'https://docs.pelicanplatform.org/'}
                underline='hover'
                color='inherit'
                target='_blank'
                rel='noopener'
              >
                Documentation
              </MuiLink>
            </Box>
          </Grid>
        </Grid>

        <Typography
          variant='inherit'
          sx={{
            display: 'block',
            mt: 4,
            fontSize: '0.8rem',
            lineHeight: 1.6,
            color: tokens.body,
            textAlign: 'center',
            maxWidth: 900,
            mx: 'auto',
          }}
        >
          This project is supported by the National Science Foundation under
          Cooperative Agreement{' '}
          <MuiLink
            href={'https://www.nsf.gov/awardsearch/showAward?AWD_ID=2331480'}
            color='primary'
            underline='hover'
          >
            OAC-2331480
          </MuiLink>
          . Any opinions, findings, conclusions or recommendations expressed in
          this material are those of the authors and do not necessarily reflect
          the views of the National Science Foundation.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
