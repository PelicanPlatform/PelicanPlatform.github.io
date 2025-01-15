import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Link,
} from '@mui/material';
import ExportedImage from 'next-image-export-optimizer';
export default function Page() {
  return (
    <Box pt={4}>
      <Container maxWidth={'md'}>
        <Typography
          variant={'h3'}
          sx={{ fontWeight: '600', textAlign: { xs: 'center', lg: 'left' } }}
        >
          What Is the Pelican Platform?
        </Typography>
        <Divider sx={{ margin: 2 }} />
        <Typography
          variant={'body1'}
          sx={{ fontWeight: '400', textAlign: { xs: 'center', lg: 'left' } }}
        >
          Pelican provides an open-source software platform for federating
          dataset repositories together and delivering the objects to computing
          capacity such as the
          <Link
            style={{ color: '#0885ff' }}
            href='https://osg-htc.org/services/open_science_pool.html'
          >
            {' '}
            OSPool
          </Link>
          .
        </Typography>

        <Paper
          sx={{
            margin: 2,
            backgroundColor: 'rgba(207, 228, 255)',
            display: 'flex',
            flexDirection: 'column',
          }}
          elevation={5}
        >
          <Typography
            variant={'h6'}
            sx={{ fontWeight: 'bold', marginX: 2, marginTop: 1 }}
          >
            Pelican enables:
          </Typography>
          <List aria-label='Pelican capabilities'>
            <ListItem>
              <ListItemText primary='Researchers to access their datasets at scales from a notebook to a campus cluster to the national computing fabric' />
            </ListItem>
            <ListItem>
              <ListItemText primary='Repositories and storage providers to export datasets in a scalable manner and helps implement FAIR principles' />
            </ListItem>
            <ListItem>
              <ListItemText primary='Compute providers to cache datasets on-site' />
            </ListItem>
            <ListItem>
              <ListItemText primary='Cyberinfrastructures to build gateways and portals to large-scale datasets' />
            </ListItem>
          </List>
        </Paper>
        <Typography variant={'body1'}>
          Objects in a federation are accessible through a common namespace;
          given an object name, the Pelican client can discover the object’s
          location and download it through the access layer. The access layer
          consists of distributed caches which reduce the load on the origin for
          repeated accesses.
        </Typography>
        <Paper
          sx={{
            margin: 2,
            backgroundColor: 'rgba(207, 228, 255)',
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
          elevation={5}
        >
          <ExportedImage
            src={'../../static/images/pelican-and-osdf-opt-2048.webp'}
            alt={'Pelican and OSDF'}
            height={350}
            width={350}
          />
          <Typography variant={'body1'} sx={{ margin: 2 }}>
            A Pelican data federation provides an access layer that helps the
            origin distribute datasets in the repositories. A client wanting an
            object contacts the manager to find the closest cache which either
            serves the objects from local storage or streams it through the
            origin.
          </Typography>
        </Paper>
        <Typography variant={'body1'}>
          The flagship Pelican federation is the{' '}
          <span style={{ fontWeight: 'bold' }}>
            Open Science Data Federation (OSDF)
          </span>
          . The OSDF has approximately two dozen caches located throughout the
          world, often at points of presence within the global Research and
          Education networks such as ESNet and Internet2.
        </Typography>
        <Paper
          sx={{
            margin: 2,
            backgroundColor: 'rgba(207, 228, 255)',
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
          elevation={3}
        >
          <ExportedImage
            src={'../../static/images/pelican-bus-opt-2048.webp'}
            alt={'Pelican and OSDF'}
            height={350}
            width={350}
          />
          <Typography variant={'body1'} sx={{ margin: 2 }}>
            The OSDF serves as a transport bus, connecting a variety of backend
            storage types
          </Typography>
        </Paper>
        <Typography variant={'body1'}>
          Central to Pelican is the concept of the origin service. The origin is
          the intermediary between the existing storage and the federation. The
          origin is responsible for serving data as well as issuing tokens
          (credentials) authorizing access to datasets based on the local
          policy.
        </Typography>
      </Container>
    </Box>
  );
}
