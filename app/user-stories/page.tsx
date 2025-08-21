import { Box, Typography, GridLegacy, Container } from '@mui/material';
import { HorizontalArticleCard, ArticleCard } from '@chtc/web-components';
import { getArticles, filterArticles } from '@/utils/articles';

async function getUserStories() {
  const articles = await getArticles('CHTC', 'Articles', 'main');
  return filterArticles(articles, 'pelican', 'user');
}

export default async function Page() {
  const articles = await getUserStories();

  return (
    <>
      <HorizontalArticleCard
        href={`/user-stories/${articles[0].slug.join('/')}`}
        article={articles[0]}
      />
      <Box textAlign={'center'} py={5}>
        <Typography variant={'h2'}>User Stories</Typography>
      </Box>
      <Container maxWidth={'xl'}>
        <GridLegacy container spacing={1}>
          {articles.map((article) => (
            <GridLegacy key={article.slug.join('-')} item xs={12} md={6} lg={4}>
              <ArticleCard
                key={article.slug.join('-')}
                href={`/user-stories/${article.slug.join('/')}`}
                article={article}
              />
            </GridLegacy>
          ))}
        </GridLegacy>
      </Container>
    </>
  );
}
