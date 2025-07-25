import React from 'react';
import {
  Box,
  Container,
  Divider,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { GitHubReleaseData } from '@/utils/github';
import { organizeReleases } from '@/utils/releases';
import ReleaseBody from './ReleaseBody';
import ReleaseSection from './ReleaseSection';

const Page = async () => {
  const organizedReleases = await organizeReleases();

  return (
    <Container maxWidth='md'>
      <Box pt={6} pb={4}>
        <Typography variant='h2' component='h1'>
          Pelican Releases
        </Typography>
        <Divider
          sx={{
            bgcolor: 'primary.main',
            height: '0.25rem',
          }}
        />
      </Box>
      {Object.keys(organizedReleases).map((mainReleaseName) => (
        <ReleaseSection
          key={mainReleaseName}
          mainReleaseName={mainReleaseName}
          organizedReleases={organizedReleases}
        />
      ))}
    </Container>
  );
};

export default Page;
