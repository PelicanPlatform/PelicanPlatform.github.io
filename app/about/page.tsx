import { Box, Link, List, ListItem, ListItemText, Typography } from '@mui/material';
import ExportedImage from 'next-image-export-optimizer';
import { Section, SectionHeading, cardSx, tokens } from '@/components/ui/Section';

const paragraph = {
  fontSize: '1.1rem',
  lineHeight: 1.75,
  color: tokens.body,
  mb: 3,
};

export default function Page() {
  return (
    <Section tone='light' maxWidth='md' borderTop={false}>
      <SectionHeading
        eyebrow='About Pelican'
        title='What is the Pelican Platform?'
        align='left'
      />

      <Typography variant='inherit' component='p' sx={paragraph}>
        Pelican provides an open-source software platform for federating dataset
        repositories together and delivering the objects to computing capacity
        such as the{' '}
        <Link
          href='https://osg-htc.org/services/open_science_pool.html'
          target='_blank'
          rel='noopener'
          underline='hover'
        >
          OSPool
        </Link>
        .
      </Typography>

      {/* Capabilities card */}
      <Box sx={{ ...cardSx, mb: 3 }}>
        <Typography
          variant='inherit'
          component='h2'
          sx={{ fontSize: '1.25rem', fontWeight: 700, color: tokens.ink, mb: 1 }}
        >
          Pelican enables:
        </Typography>
        <List sx={{ py: 0 }}>
          {[
            'Researchers to access their datasets at scales from a notebook to a campus cluster to the national computing fabric',
            'Repositories and storage providers to export datasets in a scalable manner and helps implement FAIR principles',
            'Compute providers to cache datasets on-site',
            'Cyberinfrastructures to build gateways and portals to large-scale datasets',
          ].map((item) => (
            <ListItem key={item} sx={{ px: 0, py: 0.5 }}>
              <ListItemText
                primaryTypographyProps={{
                  sx: { fontSize: '1rem', lineHeight: 1.6, color: tokens.body },
                }}
                primary={item}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Typography variant='inherit' component='p' sx={paragraph}>
        Objects in a federation are accessible through a common namespace; given
        an object name, the Pelican client can discover the object’s location and
        download it through the access layer. The access layer consists of
        distributed caches which reduce the load on the origin for repeated
        accesses.
      </Typography>

      <FeatureCard
        src={'../../static/images/pelican-and-osdf-opt-2048.webp'}
        alt={'Pelican and OSDF'}
        body={`A Pelican data federation provides an access layer that helps the origin distribute datasets in the repositories. A client wanting an object contacts the manager to find the closest cache which either serves the objects from local storage or streams it through the origin.`}
      />

      <Typography variant='inherit' component='p' sx={paragraph}>
        The flagship Pelican federation is the{' '}
        <Box component='span' sx={{ fontWeight: 700, color: tokens.ink }}>
          Open Science Data Federation (OSDF)
        </Box>
        . The OSDF has approximately two dozen caches located throughout the
        world, often at points of presence within the global Research and
        Education networks such as ESNet and Internet2.
      </Typography>

      <FeatureCard
        src={'../../static/images/pelican-bus-opt-2048.webp'}
        alt={'Pelican as a transport bus'}
        body={`The OSDF serves as a transport bus, connecting a variety of backend storage types.`}
      />

      <Typography variant='inherit' component='p' sx={{ ...paragraph, mb: 0 }}>
        Central to Pelican is the concept of the origin service. The origin is
        the intermediary between the existing storage and the federation. The
        origin is responsible for serving data as well as issuing tokens
        (credentials) authorizing access to datasets based on the local policy.
      </Typography>
    </Section>
  );
}

function FeatureCard({
  src,
  alt,
  body,
}: {
  src: string;
  alt: string;
  body: string;
}) {
  return (
    <Box
      sx={{
        ...cardSx,
        mb: 3,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        gap: 3,
      }}
    >
      <Box sx={{ flex: 'none' }}>
        <ExportedImage src={src} alt={alt} height={300} width={300} />
      </Box>
      <Typography
        variant='inherit'
        component='p'
        sx={{ fontSize: '1.05rem', lineHeight: 1.7, color: tokens.body }}
      >
        {body}
      </Typography>
    </Box>
  );
}
