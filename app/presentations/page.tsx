import { PresentationGrid } from '@/components/PresentationGrid';
import { getPresentations, filterPresentations } from '@chtc/web-components';
import { Box, Container, Typography } from '@mui/material';

export default async function Page() {
  const presentations = filterPresentations(
    await getPresentations('CHTC', 'Presentations', 'main'),
    'pelican'
  );

  return (
    <>
      {/*<HeroCard href={`/user-stories/${presentations[0].slug.join("/")}`} article={presentations[0]}/>*/}
      <Box textAlign={'center'} py={5}>
        <Typography variant={'h2'}>Presentations</Typography>
      </Box>
      <Container maxWidth={'xl'}>
        <PresentationGrid presentations={presentations} />
      </Container>
    </>
  );
}
