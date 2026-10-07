import {
  GitHubMilestone,
  findCurrentMilestone,
  getMilestones,
} from '@chtc/web-components';
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

/**
 * The release milestone the team is currently working toward. Milestones come
 * back soonest-due first, so the first open release milestone is the next one;
 * if none is open, the most recently closed one is used so the page still
 * renders. A milestone without a due date can't be turned into a schedule, so
 * that fails the build rather than printing "Invalid Date".
 */
async function getCurrentMilestone(): Promise<
  GitHubMilestone & { due_on: string }
> {
  const milestones = await getMilestones('PelicanPlatform', 'pelican');
  const milestone = findCurrentMilestone(milestones);

  if (!milestone) throw new Error('No release milestone found');
  if (!milestone.due_on) {
    throw new Error(`Release milestone ${milestone.title} has no due date`);
  }

  return { ...milestone, due_on: milestone.due_on };
}
