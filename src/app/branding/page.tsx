'use client'

import ExportedImage from "next-image-export-optimizer";
import {BackgroundPage} from "@/components/Background";
import {Box, Container, Grid, Typography, Stack, Chip} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import hero from '../public/static/images/pelican-hero.png'
import {Poppins} from 'next/font/google'
import ArrowRight from "@/components/svg/arrowright";
import styles from "../page.module.css"

import pelicanDiagram from "../../public/static/images/pelican-concept-map_Realistic.png"
import pelicanIcon from "../../public/static/images/PelicanPlatformLogo_Icon.png"
import pelicanLogo from "../../public/static/images/PelicanPlatformLogo_Full_Text.png"

import Link from "next/link";


export default function Home() {
	return (
			<main className={styles.main}>
				<Container maxWidth={"xl"}>
					<Grid container justifyContent={"Center"}>
						<Grid item xs={12} md={10} lg={8}>
							<Typography variant={"h2"} pb={2}>Branding</Typography>
							<Typography pb={2} variant={"body1"}>
								The following is a list of branding assets for the Pelican Platform. We suggest use of SVGs where possible, 
								but have also provided PNGs for convenience.
							</Typography>
							<Typography variant={"h3"} pt={3} pb={2}>Colors</Typography>
							<Stack direction="row" spacing={1}>
								<Chip
										icon={<ContentCopyIcon/>}
										onClick={(e) => navigator.clipboard.writeText("#0885ff")}
										label="Light: #0885ff"
										sx={{backgroundColor: "primary.light"}}
								/>
								<Chip
										icon={<ContentCopyIcon />}
										onClick={(e) => navigator.clipboard.writeText("#CFE4FF")}
										label="Primary: #CFE4FF"
										color="primary"
								/>
							</Stack>
							<Typography variant={"h3"} pt={3} pb={2}>Visuals</Typography>

							<Typography variant={"h4"} pt={3} pb={2}>Icon</Typography>
							<a href={"../../static/images/PelicanPlatformLogo_Icon.png"}>
								<ExportedImage height={150} src={pelicanIcon} alt={"Pelican Icon"}/>
							</a>

							<Typography variant={"h4"} pt={3} pb={2}>Logo</Typography>
							<a href={"../../static/images/PelicanPlatformLogo_Full_Text.png"}>
								<ExportedImage height={120} src={pelicanLogo} alt={"Pelican Logo"}/>
							</a>

							<Typography variant={"h4"} pt={3} pb={2}>Concept Map</Typography>
							<a href={"../../static/images/pelican-concept-map.png"}>
								<ExportedImage height={180} src={pelicanDiagram} alt={"Pelican Concept map"}/>
							</a>
						</Grid>
					</Grid>
				</Container>
			</main>
	)
}