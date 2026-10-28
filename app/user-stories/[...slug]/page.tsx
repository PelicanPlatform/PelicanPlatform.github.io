import type { Metadata } from 'next';
import {
  Article,
  getArticles,
  filterArticles,
  getArticle,
} from '@chtc/web-components';
import { articleMetadata } from '@chtc/web-components/content';
import { offSiteCanonical } from '@/utils/metadata';
import { PELICAN_SITE } from '@/site.config';

export async function generateStaticParams() {
  const articles = await getArticles('CHTC', 'Articles', 'main');
  return filterArticles(articles, 'pelican', 'user');
}

async function getMarkdownFile(slug: string[]) {
  return getArticle('CHTC', 'Articles', slug.join('-') + '.md', 'main');
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const article = await getMarkdownFile(slug);
  return articleMetadata(
    { ...article, canonical_url: offSiteCanonical(article.canonical_url) },
    { path: `/user-stories/${slug.join('/')}`, site: PELICAN_SITE }
  );
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
