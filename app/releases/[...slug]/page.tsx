import {
  CircularProgress,
  Container,
  Typography,
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import React from 'react';
import { ReleaseBody } from '../page';
import { GitHubReleaseData } from '../../../utils/github';
import { fetchAllReleases } from '@/utils/releases';

interface ReleaseData {
  specificRelease?: GitHubReleaseData;
  patchReleases: GitHubReleaseData[];
}

export async function generateStaticParams() {
  const releases = await fetchAllReleases(false);
  const slugs = releases.map((release: GitHubReleaseData) => release.tag_name);
  return slugs.map((slug: string) => ({ slug: [slug] }));
}

async function getPageData(slug: string[]): Promise<ReleaseData> {
  const releasesData = await fetchAllReleases(false);

  const fullSlug = slug.join('.');
  const [majorVersion, minorVersionBase] = fullSlug.split('.');
  const minorVersion = parseInt(minorVersionBase, 10);
  const newVersionPrefix = `${majorVersion}.${minorVersion}`;
  const specificRelease = releasesData.find(
    (release: GitHubReleaseData) => release.tag_name === fullSlug
  );
  const patchReleases = releasesData.filter(
    (release: GitHubReleaseData) =>
      release.tag_name.startsWith(newVersionPrefix) &&
      !release.tag_name.endsWith('0')
  );
  return { specificRelease, patchReleases };
}

function getDownloadLink(releaseData: ReleaseData) {
  // Prevent the download link from being a release candidate
  const latestPatches = releaseData.patchReleases.filter(
    (release) => !release.prerelease
  );

  if (latestPatches.length === 0) {
    return `https://docs.pelicanplatform.org/install#determine-which-executable-to-download`;
  } else {
    return `https://docs.pelicanplatform.org/install?version=${latestPatches[0]?.name ?? ''}#determine-which-executable-to-download`;
  }
}

const Page = async ({ params }: { params: Promise<{ slug: string[] }> }) => {
  const slug = (await params).slug;
  const releaseData = await getPageData(slug);
  const { specificRelease, patchReleases } = releaseData;

  if (!releaseData) {
    return (
      <Container maxWidth='md'>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }
  return (
    <Container maxWidth='md'>
      <Box pt={6} pb={4}>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='flex-end'
        >
          <Typography variant='h2' component='h1'>
            {slug}
          </Typography>
          <Typography variant='h4' component='h2'>
            <Link href={getDownloadLink(releaseData)} target='_blank'>
              Download
            </Link>
          </Typography>
        </Box>
        <Divider
          sx={{
            bgcolor: 'primary.main',
            height: '0.25rem',
          }}
        />
      </Box>
      <ReleaseBody content={specificRelease?.body || ''} />
      <Box pt={4}>
        <Box pb={4}>
          {patchReleases.map((release: GitHubReleaseData) => (
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
              <AccordionDetails sx={{ mx: 3 }}>
                <ReleaseBody content={release.body} />
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Page;
