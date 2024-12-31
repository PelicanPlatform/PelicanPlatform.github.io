import {Article} from "@chtc/web-components";
import {getArticles, filterArticles, getArticle} from "../../../utils/articles";

export async function generateStaticParams() {
	const articles = await getArticles("CHTC", "Articles", "main")
	return filterArticles(articles, "pelican", "news")
}

async function getMarkdownFile(slug: string[]){
	return getArticle("CHTC", "Articles", slug.join("-") + ".md", "main")
}

export default async function Page({ params }: { params: { slug: string[] } }) {
	const markdownData = await getMarkdownFile(params.slug)

	return (
		<Article article={markdownData} />
	)
}
