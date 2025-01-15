import { Article } from '@chtc/web-components';
import { getArticles, filterArticles, getArticle } from '@/utils/articles';

export async function generateStaticParams() {
  const articles = await getArticles('CHTC', 'Articles', 'main');
  return filterArticles(articles, 'pelican', 'news');
}

async function getMarkdownFile(slug: string[]) {
  return getArticle('CHTC', 'Articles', slug.join('-') + '.md', 'main');
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const slug = (await params).slug;
  const markdownData = await getMarkdownFile(slug);

  return <Article article={markdownData} />;
}
