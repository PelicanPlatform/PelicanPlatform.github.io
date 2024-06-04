import { CircularProgress, Container, Typography, Box, Divider, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import React from "react";
import MarkdownContainer from '@/components/MarkdownContainer';
import { GitHubReleaseData } from "../../../utils/github";

export async function generateStaticParams() {
  const allAssetsApiUrl = `https://api.github.com/repos/PelicanPlatform/pelican/releases`;
  const releasesData = await fetch(allAssetsApiUrl).then(response => response.json());
  const slugs = releasesData.map((release: GitHubReleaseData) => release.tag_name);
  return slugs.map((slug: string) => ({ slug: [slug] }));
}


async function getPageData(slugArray: string[]) {
  const slug = slugArray.join(''); // Join the array into a single string
  const allAssetsApiUrl = `https://api.github.com/repos/PelicanPlatform/pelican/releases`;
  const releasesData = await fetch(allAssetsApiUrl).then(response => response.json());
  const [majorVersion, minorVersionBase] = slug.split('.');
  const minorVersion = parseInt(minorVersionBase, 10);
  const newVersionPrefix = `${majorVersion}.${minorVersion}`;
  const specificRelease = releasesData.find((release: GitHubReleaseData) => release.tag_name === slug);
  const patchReleases = releasesData.filter((release: GitHubReleaseData) => 
    release.tag_name.startsWith(newVersionPrefix) && 
    !release.tag_name.endsWith('0')
  );
  return { specificRelease, patchReleases };
}



const Page = async ({ params }: { params: { slug: string[] } }) => {
  const slugString = params.slug.join('.'); // Join the array into a single string with a dot
  const releaseData = await getPageData(params.slug);
  const { specificRelease, patchReleases } = releaseData;

  if (!specificRelease) {
    return (
      <Container maxWidth="md">
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box pt={6} pb={4}>
        <Typography variant="h2" component="h1">
          {params.slug}
        </Typography>
        <Divider sx={{
          bgcolor: "primary.main",
          height: "0.25rem",
        }} />
      </Box>
      <MarkdownContainer
        content={specificRelease.body || ""}
      />
      <Box pt={4}>
        <Box pb={4}>
          {patchReleases.map((release: GitHubReleaseData) => (
            <Accordion key={release.tag_name}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls={`${release.tag_name}-content`}
                id={`${release.tag_name}-header`}
              >
                <Typography variant="h5" component="h2">
                  {release.tag_name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ mx: 3 }}>
                <MarkdownContainer
                  content={release.body}
                />
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Page;
