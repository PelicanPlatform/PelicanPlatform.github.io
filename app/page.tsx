import { Box, Container, Grid, Typography, Link, Button } from '@mui/material';
import { ArticleCard } from '@chtc/web-components';
import { getArticles, filterArticles } from '@/utils/articles';
import Releases from '../components/Releases';
import FederationSuite from '@/components/home/FederationSuite';
import ComponentDetails from '@/components/home/ComponentDetails';
import ClientCards from '@/components/home/ClientCards';
import SupportedBackends from '@/components/home/SupportedBackends';
import HomeTableOfContents from '@/components/home/HomeTableOfContents';
import { getOsdfFederation } from '@/utils/osdfCaches';
import { Section, SectionHeading, tokens } from '@/components/ui/Section';

async function getUserStories() {
  const articles = await getArticles('CHTC', 'Articles', 'main');
  return filterArticles(articles, 'pelican', 'user');
}

async function getNews() {
  const articles = await getArticles('CHTC', 'Articles', 'main');
  return filterArticles(articles, 'pelican', 'news');
}

export default async function Home() {
  const userStories = await getUserStories();
  const news = await getNews();
  // Fetched on the server at build time — a director outage fails the build
  // rather than shipping a map with no real federation behind it.
  const { caches, origins } = await getOsdfFederation();

  return (
    <Box>
      <HomeTableOfContents />
      <Box>
        {Date.now() < Date.parse('2024-08-15') && (
          <Container
            maxWidth={'xl'}
            sx={{
              backgroundColor: 'primary.light',
              p: 1,
            }}
          >
            <Typography component={'h6'} sx={{ display: 'inline', pt: 1 }}>
              CHTC is hiring! View the new Research Cyberinfrastructure
              Specialist position on the jobs page and apply by August 15th.
            </Typography>
            <Button
              variant='contained'
              href='https://chtc.cs.wisc.edu/jobs.html#full-time-positions'
              sx={{
                ml: 1,
              }}
            >
              View Job Posting
            </Button>
          </Container>
        )}
      </Box>
      <Box
        component='section'
        sx={{
          background: 'linear-gradient(180deg, #F4F8FE 0%, #ffffff 100%)',
          textAlign: 'center',
          px: 3,
          pt: { xs: 8, md: 12 },
          pb: { xs: 7, md: 11 },
        }}
      >
        <Container maxWidth='md' disableGutters>
          <Typography
            variant='h2'
            sx={{
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: tokens.ink,
              lineHeight: 1.05,
              mb: 3,
              textWrap: 'balance',
            }}
          >
            Software designed to make data distribution easy.
          </Typography>
          <Typography
            variant='h6'
            sx={{
              fontWeight: 400,
              color: 'text.secondary',
              maxWidth: 680,
              mx: 'auto',
              mb: 4.5,
            }}
          >
            Pelican federates data repositories across the country and delivers
            their objects to researchers — open, fast, and at national scale.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 1.75,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Button
              component='a'
              href='#suite'
              variant='contained'
              size='large'
              sx={{
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '12px',
                px: 3.5,
                py: 1.4,
                boxShadow: '0 10px 24px rgba(8,133,255,0.26)',
              }}
            >
              Explore the suite
            </Button>
            <Button
              component='a'
              href='https://docs.pelicanplatform.org/'
              target='_blank'
              rel='noopener'
              variant='outlined'
              size='large'
              sx={{
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '12px',
                px: 3.5,
                py: 1.4,
                backgroundColor: '#fff',
                borderColor: '#CBD9F2',
                color: 'primary.main',
                '&:hover': { borderColor: 'primary.main', backgroundColor: '#fff' },
              }}
            >
              Read the docs
            </Button>
          </Box>
        </Container>
      </Box>
      <ClientCards />
      <FederationSuite caches={caches} origins={origins} />
      <SupportedBackends />
      <ComponentDetails />
      <Section id='community' tone='white' sx={{ scrollMarginTop: { xs: '64px', lg: '1rem' } }}>
        <SectionHeading
          eyebrow='From the Community'
          title='Stories, news, and releases'
          subtitle='See how researchers put Pelican to work, catch up on project news, and track the latest software releases.'
        />
        <Grid container spacing={3} alignItems='flex-start'>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                fontSize: '1.3rem',
                fontWeight: 700,
                color: tokens.ink,
                textAlign: 'center',
                mb: 2,
              }}
            >
              <Link href={'/user-stories'} underline='hover' color='inherit'>
                User Stories
              </Link>
            </Box>
            {userStories.length > 0 && (
              <Box
                sx={{
                  borderRadius: '18px',
                  overflow: 'hidden',
                  border: `1px solid ${tokens.cardLine}`,
                  backgroundColor: '#fff',
                }}
              >
                <ArticleCard
                  href={`/user-stories/${userStories[userStories.length - 1].slug.join('/')}`}
                  article={userStories[userStories.length - 1]}
                />
              </Box>
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                fontSize: '1.3rem',
                fontWeight: 700,
                color: tokens.ink,
                textAlign: 'center',
                mb: 2,
              }}
            >
              <Link href={'/news'} underline='hover' color='inherit'>
                News
              </Link>
            </Box>
            {news.length > 0 && (
              <Box
                sx={{
                  borderRadius: '18px',
                  overflow: 'hidden',
                  border: `1px solid ${tokens.cardLine}`,
                  backgroundColor: '#fff',
                }}
              >
                <ArticleCard
                  href={`/news/${news[news.length - 1].slug.join('/')}`}
                  article={news[news.length - 1]}
                />
              </Box>
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                fontSize: '1.3rem',
                fontWeight: 700,
                color: tokens.ink,
                textAlign: 'center',
                mb: 2,
              }}
            >
              Latest Releases
            </Box>
            <Releases />
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
}
