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
      {Object.entries(organizedReleases).map(
        ([mainReleaseName, mainReleaseData], index) => {
          return (
            <Box key={index} pb={4}>
              <Typography variant='h3' component='h2'>
                {mainReleaseName[0].toUpperCase() + mainReleaseName.slice(1)}
              </Typography>

              {mainReleaseData.mainRelease &&
              mainReleaseData.mainRelease.body !== '' ? (
                <Box pb={4}>
                  <ReleaseBody content={mainReleaseData.mainRelease.body} />
                </Box>
              ) : null}

              {organizedReleases[mainReleaseName].minorReleases.map(
                (release: GitHubReleaseData) => (
                  <Accordion key={release.tag_name}>
                    <AccordionSummary
                      expandIcon={<ArrowDropDownIcon />}
                      aria-controls={`${release.tag_name}-content`}
                      id={`${release.tag_name}-header`}
                    >
                      <Typography variant='h5' component='h2'>
                        {release.tag_name}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ReleaseBody content={release.body} />
                    </AccordionDetails>
                  </Accordion>
                )
              )}
            </Box>
          );
        }
      )}
    </Container>
  );
};

export default Page;
