import { getPresentations } from '@/utils/presentations';
import { Box, Container, Grid, Typography } from '@mui/material';
import { PresentationCard } from '@/components/Presentation';

export default async function Page() {
  const presentations = await getPresentations('CHTC', 'Presentations', 'main');

  console.log(" presentations", presentations)
  return (
    <>
      {/*<HeroCard href={`/user-stories/${presentations[0].slug.join("/")}`} article={presentations[0]}/>*/}
      <Box textAlign={'center'} py={5}>
        <Typography variant={'h2'}>Presentations</Typography>
      </Box>
      <Container maxWidth={'xl'}>
        <Grid container spacing={1}>
          {presentations.map((presentation) => (
            <Grid
              key={presentation.slug.join('-')}
              size={{
                xs: 12,
                md: 6,
                lg: 4
              }}>
              <PresentationCard
                href={`/presentations/${presentation.slug.join('/')}`}
                presentation={presentation}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
