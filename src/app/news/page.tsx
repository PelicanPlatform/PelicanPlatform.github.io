import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import {Box, Typography, Grid, Container} from "@mui/material";
import Balancer from "react-wrap-balancer";

import {HeroCard, ArticleCard} from "@/components/Article";
import {getArticles, filterArticles} from "@/utils/articles";


async function getUserStories(){
	const articles = await getArticles("CHTC", "Articles", "main")
	return filterArticles(articles, "pelican", "news")
}

export default async function Page({ params }: { params: { slug: string[] } }) {
	const articles = await getUserStories()

	return (
			<>
				<HeroCard href={`/user-stories/${articles[0].slug.join("/")}`} article={articles[0]}/>
				<Box textAlign={"center"} py={5}>
					<Typography variant={"h2"}>News</Typography>
				</Box>
				<Container maxWidth={"xl"}>
					<Grid container >
						<Grid item xs={4}>
							{articles.map(article => <ArticleCard href={`/user-stories/${articles[0].slug.join("/")}`} article={articles[0]}/>)}
						</Grid>
					</Grid>
				</Container>
			</>

	)
}