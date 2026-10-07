import {
  BackendPresentation,
  Presentation,
  filterPresentations,
  getPresentations,
} from '@chtc/web-components';
import { Box, Container, Typography } from '@mui/material';

export async function generateStaticParams() {
  try {
    const presentations = filterPresentations(
      await getPresentations('CHTC', 'Presentations', 'main'),
      'pelican'
    );

    return presentations.map((presentation) => ({
      slug: presentation.slug,
    }));
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

async function getPresentationBySlug(
  slug: string[]
): Promise<BackendPresentation | null> {
  try {
    const presentations = filterPresentations(
      await getPresentations('CHTC', 'Presentations', 'main'),
      'pelican'
    );
    const matchedPresentation = presentations.find(
      (presentation) => presentation.slug.join('-') === slug.join('-')
    );

    if (!matchedPresentation) {
      return null;
    }

    return matchedPresentation;
  } catch (error) {
    console.error('Error finding presentation by slug:', error);
    return null;
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const slug = (await params).slug;
  const presentation = await getPresentationBySlug(slug);

  if (!presentation) {
    return (
      <Container>
        <Box textAlign='center' pt={6}>
          <Typography variant='h3'>Presentation Not Found</Typography>
        </Box>
      </Container>
    );
  }

  return <Presentation {...presentation} />;
}
