import ExportedImage from 'next-image-export-optimizer';
import { BackgroundPage } from '@/components/Background';
import {
  Box,
  Container,
  GridLegacy,
  Typography,
  Link,
  Divider,
  Button,
} from '@mui/material';
import hero from '../public/static/images/pelican-hero.png';
import ArrowRight from '@/components/svg/arrowright';
import pelicanDiagram from '../public/static/images/pelican-concept-map_Realistic.png';
import { ArticleCard } from '@chtc/web-components';
import { getArticles, filterArticles, BackendArticle } from '@/utils/articles';
import Releases from '../components/Releases';
import VideoCard from '@/components/VideoCard';

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

  return (
    <Box>
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
      <BackgroundPage image={hero} />
      <Container maxWidth={'xl'}>
        <Box sx={{ paddingTop: '4rem', paddingBottom: '10rem' }}>
          <GridLegacy container spacing={2}>
            <GridLegacy
              item
              xs={12}
              lg={7}
              xl={6}
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              <Box sx={{ marginTop: 'auto', marginBottom: 'auto' }}>
                <Typography
                  variant={'h4'}
                  sx={{
                    fontWeight: '600',
                    textAlign: { xs: 'center', lg: 'left' },
                  }}
                >
                  Software Designed to
                </Typography>
                <Typography
                  variant={'h3'}
                  sx={{
                    fontWeight: '600',
                    textAlign: { xs: 'center', lg: 'left' },
                  }}
                >
                  Make Data Distribution Easy
                </Typography>
                <Typography
                  variant={'h6'}
                  sx={{
                    fontWeight: '400',
                    textAlign: { xs: 'center', lg: 'left' },
                  }}
                >
                  Functional and Dependable for Consumers
                </Typography>
                <Typography
                  variant={'h6'}
                  sx={{
                    fontWeight: '400',
                    textAlign: { xs: 'center', lg: 'left' },
                  }}
                >
                  Robust and Maintainable for Providers
                </Typography>
              </Box>
            </GridLegacy>
            <GridLegacy
              item
              xs={6}
              lg={5}
              xl={6}
              sx={{ display: { lg: 'block', xs: 'none' } }}
            >
              <ExportedImage
                style={{ width: '100%', height: 'auto' }}
                src={pelicanDiagram}
                alt={'Sky level diagram of Pelican'}
                width={1000}
              />
            </GridLegacy>
          </GridLegacy>
        </Box>
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              top: { xs: '-6rem', sm: '-4rem', md: '-5rem', lg: '-6rem' },
            }}
          >
            <GridLegacy container>
              <GridLegacy item xs={12} lg={10} sx={{ margin: 'auto' }}>
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: '1rem',
                    padding: { xs: '1rem', lg: '3rem' },
                    backgroundColor: 'primary.light',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant={'h6'}>
                    The Pelican Platform is designed to meet the needs of data
                    providers and consumers in the age of “Big Data”.{' '}
                    <b>Our Mission?</b> Provide a platform that makes deploying
                    data easy and accessing this data easier via well documented
                    APIs and client tools.
                  </Typography>
                </Box>
              </GridLegacy>
            </GridLegacy>
          </Box>
        </Box>
      </Container>

      <Box
        sx={{
          backgroundColor: '#F5F5F5',
          paddingTop: { xs: '11rem', sm: '8rem', md: '6rem', lg: '10rem' },
          paddingBottom: { xs: '32rem', sm: '4rem' },
        }}
      >
        <Container maxWidth={'xl'}>
          <GridLegacy container spacing={2}>
            <GridLegacy item xs={12} md={6}>
              <Box sx={{ borderRadius: '1rem', overflow: 'hidden' }}>
                <iframe
                  width='100%'
                  height='500px'
                  frameBorder='0'
                  allow='fullscreen'
                  src='https://map.opensciencegrid.org/map/iframe?view=OpenScienceDataFederation&navigation=0#45.737115,-90.140436|2'
                ></iframe>
              </Box>
            </GridLegacy>
            <GridLegacy item xs={12} md={6} sx={{ display: 'flex' }}>
              <Box
                sx={{
                  paddingBottom: '1rem',
                  paddingTop: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box
                  height={'0.5rem'}
                  bgcolor={'#f4b627'}
                  width={'3rem'}
                  marginBottom={'1rem'}
                >
                  {' '}
                </Box>
                <Typography variant={'h4'} sx={{ paddingBottom: '1.5rem' }}>
                  The Open Science Data Federation
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: '1',
                  }}
                >
                  <Box>
                    <Typography
                      variant={'body1'}
                      sx={{ paddingBottom: '1rem' }}
                    >
                      Backed by the Pelican Platform, the Open Science Data
                      Federation (OSDF) is an OSG service hosting data origins
                      and caches across the globe.
                    </Typography>
                    <Typography variant={'body1'}>
                      Integrated with other OSG services such as the OSPool, the
                      OSDF facilitates the distributed nature of a national
                      compute pool. In addition to the performance improvements,
                      purpose built plugins for HTCondor make it easy for
                      researchers to harness these caches.
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      marginTop: 'auto',
                      paddingTop: '2rem',
                      fontWeight: '300',
                    }}
                  >
                    <Box sx={{ color: '#0885ff' }}>
                      <Link href={'https://osg-htc.org/services/osdf.html'}>
                        <Typography
                          variant={'h6'}
                          sx={{
                            display: 'inline',
                            paddingRight: '.2rem',
                            transition: 'padding-right 0.3s ease-in-out',
                            '&:hover': {
                              '.arrow-icon': {
                                transform: 'translateX(0.3em)',
                              },
                            },
                            '.arrow-icon': {
                              paddingLeft: '0.3em',
                              transition: 'transform 0.3s ease-in-out',
                            },
                          }}
                        >
                          Learn More
                          <ArrowRight
                            className='arrow-icon'
                            height={18}
                            width={24}
                            fill={'currentColor'}
                          />
                        </Typography>
                      </Link>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </GridLegacy>
          </GridLegacy>
        </Container>
        <Container maxWidth={'xl'}>
          <Box mt={6}>
            <GridLegacy container spacing={2}>
              <GridLegacy
                item
                xs={12}
                sm={6}
                md={6}
                lg={4}
                xl={4}
                sx={{ display: { xs: 'none', lg: 'block' } }}
              >
                <Typography
                  variant={'h4'}
                  sx={{ paddingBottom: '1.5rem', textAlign: 'center' }}
                >
                  <Link
                    href={'/user-stories'}
                    underline='hover'
                    color='inherit'
                  >
                    User Stories
                  </Link>
                </Typography>
                {userStories.length > 0 && (
                  <GridLegacy
                    key={userStories[userStories.length - 1].slug.join('-')}
                    sx={{ backgroundColor: '#FFFFFF' }}
                  >
                    <ArticleCard
                      key={userStories[userStories.length - 1].slug.join('-')}
                      href={`/user-stories/${userStories[userStories.length - 1].slug.join('/')}`}
                      article={userStories[userStories.length - 1]}
                    />
                  </GridLegacy>
                )}
              </GridLegacy>
              <GridLegacy
                item
                xs={12}
                sm={6}
                md={6}
                lg={4}
                xl={4}
                sx={{ order: { xs: 2, sm: 1 } }}
              >
                <Typography
                  variant={'h4'}
                  sx={{
                    paddingBottom: '1.5rem',
                    marginTop: { xs: '1.5rem', sm: '0', textAlign: 'center' },
                  }}
                >
                  <Link href={'/news'} underline='hover' color='inherit'>
                    News
                  </Link>
                </Typography>
                {news.length > 0 && (
                  <GridLegacy
                    key={news[news.length - 1].slug.join('-')}
                    sx={{ backgroundColor: '#FFFFFF' }}
                  >
                    <ArticleCard
                      href={`/news/${news[news.length - 1].slug.join('/')}`}
                      article={news[news.length - 1]}
                    />
                  </GridLegacy>
                )}
              </GridLegacy>
              <GridLegacy
                item
                xs={12}
                sm={6}
                md={6}
                lg={4}
                xl={4}
                sx={{ order: { xs: 1, sm: 2 } }}
              >
                <Typography
                  variant={'h4'}
                  sx={{ paddingBottom: '1.5rem', textAlign: 'center' }}
                >
                  Latest Releases
                </Typography>
                <Releases />
              </GridLegacy>
            </GridLegacy>
            <Box sx={{ mt: 6 }}>
              <VideoCard
                src={
                  'https://www.youtube.com/embed/ySYdZ2HAyB8?si=z72HZryDHhE2H3n8'
                }
                title={'Data in Flight - Delivering Data with Pelican'}
                description={`
                                    Researcher Facilitator, Andrew Owen, explains how to use Pelican to connect your data to existing data federations, 
                                    including the OSDF. He then provides steps on how to deploy an origin on top of your 
                                    data repository.
                                `}
                author={'Andrew Owen'}
                button={{
                  href: 'https://agenda.hep.wisc.edu/event/2175/contributions/31337/',
                  text: 'View Tutorial Materials',
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
