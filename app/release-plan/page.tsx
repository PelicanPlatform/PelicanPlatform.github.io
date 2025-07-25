import { GithubMilestoneData } from '@/utils/github';
import {
  Box,
  Container,
  Typography,
  Divider,
  Paper,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Link,
} from '@mui/material';

export default async function Page() {
  const milestone = await getCurrentMilestone();

  const preReleaseDate = new Date(milestone.due_on);
  const releaseDate = new Date(
    new Date(milestone.due_on).getTime() + 1000 * 60 * 60 * 24 * 7
  ); // 7 days after the pre-release date

  const releaseSchedule = {
    release_name: milestone.title.replace('v', ''),
    pre_release_date: preReleaseDate.toLocaleDateString('en-US', {
      month: 'numeric',
      day: '2-digit',
      year: 'numeric',
    }),
    release_date: releaseDate.toLocaleDateString('en-US', {
      month: 'numeric',
      day: '2-digit',
      year: 'numeric',
    }),
  };

  return (
    <Box pt={4}>
      <Container maxWidth={'md'}>
        <Typography variant='h3' sx={{ fontWeight: '600' }}>
          Pelican Release Plan
        </Typography>
        <Divider sx={{ marginBottom: '1em' }} />
        <Typography variant='body1' component='p'>
          Pelican makes feature releases containing the development team&apos;s
          latest work approximately once per month. These releases contain
          new features, code improvements and important bug fixes, which is
          why we recommend that you keep your Pelican installation up to date.
          <br /> <br />
          On the first Thursday of the month, Pelican will create a release
          candidate that contains a checkpoint of the work we plan to turn
          into a feature release. Release candidates can be identified by their
          version number, which is the same as the next feature release version
          but with a &quot;-rc.X&quot; suffix, such as &quot;v7.18.0-rc.0&quot;. This release candidate
          is tested by our integration team until it meets our quality standards,
          at which point the &quot;-rc.X&quot; suffix is dropped and the official release
          is made (e.g. &quot;v7.18.0&quot;). Patches for that release series will be
          backported as needed if significant bugs are found. When this happens,
          we will increment the release number accordingly (e.g. &quot;v7.18.1&quot;).
          <br /> <br />
          To download and install an official release, please see our{' '}
          <Link
            style={{ color: '#0885ff' }}
            href='https://docs.pelicanplatform.org/install'
            target='_blank'
            rel='noopener noreferrer'
          >
            Pelican Installation Guide
          </Link>.
          For a full list of Pelican releases and release candidates, please see our{' '}
          <Link
            style={{ color: '#0885ff' }}
            href='https://github.com/PelicanPlatform/pelican/releases'
            target='_blank'
            rel='noopener noreferrer'
          >
            GitHub Releases page
          </Link>.
        </Typography>
        <Paper
          sx={{
            padding: '1em',
            marginTop: '1em',
            backgroundColor: 'rgba(207, 228, 255)',
          }}
        >
          <Typography variant='h4'>
            Next Release: {releaseSchedule.release_name}
          </Typography>
          <Divider sx={{ marginBottom: '1em' }} />
          <Table sx={{ display: 'flex' }}>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant='h6' fontWeight='bold'>
                    Pre-release:
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='h6' align='left'>
                    {releaseSchedule.pre_release_date}
                  </Typography>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <Typography variant='h6' fontWeight='bold'>
                    Release:
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='h6'>
                    {releaseSchedule.release_date}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </Box>
  );
}

async function getCurrentMilestone(): Promise<GithubMilestoneData> {
  const apiUrl =
    'https://api.github.com/repos/PelicanPlatform/pelican/milestones?direction=asc';
  const response = await fetch(apiUrl);
  if (!response.ok) throw new Error('Failed to fetch milestones');

  let milestones: GithubMilestoneData[] = await response.json();

  // Filter out non-release milestones. Our milestones are named like "v7.18", but
  // some milestones are not actual releases (e.g. "parking-lot", "april-docs-focus").
  const semverRegex = /^v?\d+\.\d+$/;
  milestones = milestones.filter(
    (milestone) =>
      semverRegex.test(milestone.title)
  );

  // simple type sanity checks, not exhaustive
  if (!Array.isArray(milestones)) throw new Error('Invalid milestone data');
  if (milestones.length === 0) throw new Error('No milestones found');
  if (!('title' in milestones[0])) throw new Error('Invalid milestone state');
  if (!('state' in milestones[0])) throw new Error('Invalid milestone state');

  const currentMilestone = milestones.find(
    (milestone) => milestone.state === 'open'
  );

  if (!currentMilestone) {
    // if there is no open milestone, default to the last closed one just to gracefully handle the case
    console.warn(
      'No open milestone found, defaulting to the last (closed) one'
    );

    return (
      milestones.findLast((milestone) => milestone.state === 'closed') ??
      milestones[0]
    );
  } else {
    return currentMilestone;
  }
}
