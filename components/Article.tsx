import {Grid, Typography, Box, Container} from '@mui/material';
import Balancer from "react-wrap-balancer";

import {BackendArticle} from '@/utils/articles'
import { TopStyledBlock } from "@/components/StyledBlock";
import Link from "next/link";
import ArrowRight from "@/components/svg/arrowright";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import {BackendPresentation} from "@/utils/presentations";
import Image from 'next/image';

interface CardProps {
	href: string;
	article: BackendArticle;
}

export const HeroCard = ({href, article} : CardProps) => {
	return (
			<Box sx={{ display: { xs: 'none', md: 'block' } }}>
				<Grid container>
					<Grid item xs={6}>
						<img style={{objectFit: "cover", width: "100%", height: "100%", aspectRatio: 2}} src={article.image.path} alt={article.image.alt} />
					</Grid>
					<Grid xs={6} display={"flex"}>
						<Box width={"100%"} pl={2} p={3} display={"flex"} flexDirection={"column"} bgcolor={"#cfe4ff52"}>
							<Box py={1}>
								<TopStyledBlock height={".25rem"} width={"5rem"} offset={"-.75rem"}>
									<Typography variant={"h5"}><Balancer>{article.title}</Balancer></Typography>
								</TopStyledBlock>
							</Box>
							<Typography variant={"body1"}>{article.excerpt}</Typography>
							<Box sx={{marginTop: "auto", paddingTop: "2rem", fontWeight: "300"}}>
								<Box sx={{color: "#0885ff"}}>
									<Link href={href}>
										<Typography variant={"body1"} sx={{display: "inline", paddingRight: ".2rem"}}>
											Read More
										</Typography>
										<ArrowRight height={18} width={24} fill={"currentColor"}/>
									</Link>
								</Box>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Box>
	)
}

export const ArticleCard = ({href, article} : CardProps) => {

	const style = {
		transition: "box-shadow .2s",
		boxShadow: "grey 1px 1px 3px",
		"&:hover": {boxShadow: "grey 1px 1px 5px"},
	}

	return (
		<Box borderRadius={2} overflow={"hidden"} sx={style}>
			<Link href={href}>
				<Box>
					<img style={{objectFit: "cover", width: "100%", aspectRatio: 2}} src={article.image.path} alt={article.image.alt} />
				</Box>
				<Box>
					<Box pl={2} p={2}>
						<Box py={1} pt={1}>
							<TopStyledBlock height={".25rem"} width={"5rem"} offset={"-.75rem"}>
								<Typography variant={"h6"} sx={{fontWeight: "bold"}}><Balancer>{article.title}</Balancer></Typography>
							</TopStyledBlock>
						</Box>
						<Typography variant={"body1"}>{article.excerpt}</Typography>
					</Box>
				</Box>
			</Link>
		</Box>
	)
}

export const Article = (article: BackendArticle) => {
	return (
		<Container maxWidth={"md"}>
			<Box pt={6}>
				<Box textAlign={"center"} pb={2}>
					<Box pb={6}>
						<Typography variant={"h3"} ><Balancer>{article.title}</Balancer></Typography>
					</Box>
					<Box height={"1rem"} borderRadius={"10px"} bgcolor={"primary.main"}></Box>
					<Box pt={1} display={"flex"} justifyContent={"space-between"}>
						<Typography variant={"h5"}>{article.author}</Typography>
						<Typography variant={"h5"}>{article.date.toLocaleDateString()}</Typography>
					</Box>
				</Box>
				<Markdown
						rehypePlugins={[rehypeRaw]}
						components={{
							h1: ({node, children}) => <Typography variant={"h1"}>{children}</Typography>,
							h2: ({node, children}) => <Typography variant={"h1"}>{children}</Typography>,
							h3: ({node, children}) => <Typography variant={"h1"}>{children}</Typography>,
							h4: ({node, children}) => <Typography variant={"h1"}>{children}</Typography>,
							h5: ({node, children}) => <Typography variant={"h1"}>{children}</Typography>,
							h6: ({node, children}) => <Typography variant={"h1"}>{children}</Typography>,
							p: ({node, children}) => <Typography variant={"body1"}>{children}</Typography>,
							a: ({children, href}) => <a style={{color: "#0885ff"}} href={href}>{children}</a>,
							img: ({node, src, alt}) => <img style={{maxWidth: "100%", height: "auto"}} src={src} alt={alt} />,
						}}
				>
					{article.content}
				</Markdown>
			</Box>
		</Container>
	)
}
