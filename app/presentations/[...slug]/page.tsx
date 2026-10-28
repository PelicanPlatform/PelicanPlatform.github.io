import type { Metadata } from 'next';
import {
  BackendPresentation,
  Presentation,
  filterPresentations,
  getPresentations,
} from '@chtc/web-components';
import {
  isoDate,
  openGraphDefaults,
  pageTitle,
  shareImages,
  summarize,
  twitterDefaults,
} from '@chtc/web-components/content';
import { Box, Container, Typography } from '@mui/material';
import { PELICAN_SITE } from '@/site.config';

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

/**
 * The library has no `presentationMetadata` builder yet, so this assembles
 * the same complete shape `articleMetadata` emits (see `listingMetadata` for
 * why the `openGraph` block must be complete).
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const presentation = await getPresentationBySlug(slug);
  if (!presentation) return { title: 'Presentation Not Found' };

  const path = `/presentations/${slug.join('/')}`;
  const title = pageTitle(presentation.title, PELICAN_SITE);
  // Frontmatter rarely carries a description, so fall back to the facts the
  // listing itself shows: who gave the talk, and where.
  const attribution = [
    presentation.presenter && `Presented by ${presentation.presenter}`,
    presentation.event,
  ]
    .filter(Boolean)
    .join(' at ');
  const description =
    summarize(presentation.description) ?? (attribution || undefined);
  // The recording's YouTube still is what the listing card shows, so it is
  // the natural link-preview image when the talk names no thumbnail.
  const images = shareImages(
    presentation.thumbnail?.src ??
      (presentation.youtubeId
        ? `https://img.youtube.com/vi/${presentation.youtubeId}/hqdefault.jpg`
        : undefined),
    presentation.thumbnail?.alt ?? presentation.title,
    PELICAN_SITE
  );

  return {
    title,
    description,
    authors: presentation.presenter
      ? [{ name: presentation.presenter }]
      : undefined,
    keywords: presentation.keywords,
    alternates: { canonical: path },
    openGraph: {
      ...openGraphDefaults(PELICAN_SITE),
      type: 'article',
      title,
      description,
      url: path,
      publishedTime: isoDate(presentation.date),
      authors: presentation.presenter ? [presentation.presenter] : undefined,
      images,
    },
    twitter: { ...twitterDefaults, title, description, images },
  };
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
