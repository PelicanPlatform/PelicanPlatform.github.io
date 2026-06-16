import {
  Box,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import ReleaseBody from '../ReleaseBody';
import { GitHubReleaseData } from '../../../utils/github';
import { fetchAllReleases } from '@/utils/releases';
import { Section, accordionSx, tokens } from '@/components/ui/Section';

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

  return (
    <Section tone='light' maxWidth='md' borderTop={false}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography
            variant='inherit'
            sx={{
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              fontWeight: 600,
              fontSize: '0.8rem',
              color: 'primary.main',
              mb: 1,
            }}
          >
            Release
          </Typography>
          <Typography variant='h3' sx={{ fontWeight: 700, color: tokens.ink }}>
            {slug.join('.')}
          </Typography>
        </Box>
        <Button
          component='a'
          href={getDownloadLink(releaseData)}
          target='_blank'
          rel='noopener'
          variant='contained'
          startIcon={<DownloadRoundedIcon />}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '12px',
            px: 3,
            py: 1.2,
          }}
        >
          Download
        </Button>
      </Box>

      <ReleaseBody content={specificRelease?.body || ''} />

      {patchReleases.length > 0 && (
        <Box sx={{ mt: 4 }}>
          {patchReleases.map((release: GitHubReleaseData) => (
            <Accordion
              key={release.tag_name}
              disableGutters
              elevation={0}
              sx={accordionSx}
            >
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls={`${release.tag_name}-content`}
                id={`${release.tag_name}-header`}
              >
                <Typography
                  variant='inherit'
                  component='h2'
                  sx={{ fontSize: '1.05rem', fontWeight: 600, color: tokens.ink }}
                >
                  {release.tag_name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ borderTop: `1px solid ${tokens.sectionLine}` }}
              >
                <ReleaseBody content={release.body} />
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}
    </Section>
  );
};

export default Page;
