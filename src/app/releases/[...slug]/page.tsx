import { CircularProgress, Container, Typography, Box, Divider, Card, CardContent, Stack, Alert, ListItem, List, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from 'rehype-raw';
import { GitHubReleaseData } from "../../../utils/github"; // Assuming this is correctly defined

export async function generateStaticParams() {
  const allAssetsApiUrl = `https://api.github.com/repos/PelicanPlatform/pelican/releases`;
  const releasesData = await fetch(allAssetsApiUrl).then(response => response.json());
  const slugs = releasesData.map((release: GitHubReleaseData) => release.tag_name);
  return slugs.map((slug: string) => ({ params: { slug: slug.split('.') } }));
}

export async function getPageData(slug: string[]) {
  const allAssetsApiUrl = `https://api.github.com/repos/PelicanPlatform/pelican/releases`;
  const releasesData = await fetch(allAssetsApiUrl).then(response => response.json());
  const fullSlug = slug.join('.');
  const [majorVersion, minorVersionBase] = fullSlug.split('.');
  const minorVersion = parseInt(minorVersionBase, 10);
  const newVersionPrefix = `${majorVersion}.${minorVersion}`;
  const specificRelease = releasesData.find((release: GitHubReleaseData) => release.tag_name === fullSlug);
  const patchReleases = releasesData.filter((release: GitHubReleaseData) => 
    release.tag_name.startsWith(newVersionPrefix) && 
    !release.tag_name.endsWith('0')
  );
  return { specificRelease, patchReleases };
}

const Page = async ({ params }: { params: { slug: string[] } }) => {
  const releaseData = await getPageData(params.slug);
  const { specificRelease, patchReleases } = releaseData;

  if (!releaseData) {
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
      <Markdown 
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({node, children}) => <Typography variant="h4" pb={2}>{children}</Typography>,
          h2: ({node, children}) => <Typography variant="h5" pb={2}>{children}</Typography>,
          h3: ({node, children}) => <Typography variant="h6" pb={2}>{children}</Typography>,
          h4: ({node, children}) => <Typography variant="subtitle1" pb={2}>{children}</Typography>,
          h5: ({node, children}) => <Typography variant="subtitle2" pb={2}>{children}</Typography>,
          h6: ({node, children}) => <Typography variant="caption">{children}</Typography>,
          p: ({node, children}) => <Typography variant="body1">{children}</Typography>,
          li: ({node, children}) => <ListItem disablePadding sx={{display:"inline"}}>{children}<br/></ListItem>,
          ul: ({node, children}) => <List style={{paddingLeft: "1rem"}}>{children}</List>,
          a: ({children, href}) => <Typography component="a" href={href} style={{ color: "#0885ff" }}>{children}</Typography>,
          strong: ({node, children}) => <Box display="inline" fontWeight="bold">{children}</Box>,
          text: ({ node, children }) => <Typography variant="body1" display="inline">{children}</Typography>,
        }}
      >
        {specificRelease?.body || ""}
      </Markdown>
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
                <Markdown
                  components={{
                    p: ({node, children}) => <Typography variant="body1" paragraph>{children}</Typography>,
                    li: ({node, children}) => <ListItem disablePadding sx={{display:"inline"}}>{children}<br/></ListItem>,
                    a: ({children, href}) => <Typography component="a" href={href} style={{ color: "#0885ff" }}>{children}</Typography>,
                    strong: ({node, children}) => <Box fontWeight="bold" display="inline">{children}</Box>,
                    em: ({node, children}) => <Box sx={{ display: "inline", fontStyle:"italic"}}>{children}</Box>,
                    ul: ({node, children}) => <List style={{paddingLeft: "1rem"}}>{children}</List>,
                  }}
                >
                  {release.body}
              </Markdown>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Page;