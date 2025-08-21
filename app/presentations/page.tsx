import { PresentationGrid } from '@/components/PresentationGrid';
import { getPresentations } from '@/utils/presentations';
import { PresentationCard } from '@chtc/web-components';
import { Box, Container, Grid, Typography } from '@mui/material';

export default async function Page() {
  const presentations = await getPresentations('CHTC', 'Presentations', 'main');

  return (
    <>
      <Box textAlign={'center'} py={5}>
        <Typography variant={'h2'}>Presentations</Typography>
      </Box>
      <PresentationGrid presentations={presentations} />
    </>
  );
}
