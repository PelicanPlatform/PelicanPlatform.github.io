'use client'

import ExportedImage from "next-image-export-optimizer";
import BurgerMenu from "@/components/BurgerMenu";
import React, {useState, useEffect, useRef} from "react";
import { Box, Menu, MenuItem } from "@mui/material"
import styles from "../../app/page.module.css"
import Link from "next/link";
import GitHubIcon from '@mui/icons-material/GitHub';
import DescriptionIcon from '@mui/icons-material/Description';
import PelicanLogo from "../../public/static/images/PelicanPlatformLogo_Icon.png"
import {Typography, useTheme, useMediaQuery} from "@mui/material";
import {ArrowDropUp, ArrowDropDown} from "@mui/icons-material";

export const Header = () => {
	const theme = useTheme();
	const isViewportSmallerThanMedium = useMediaQuery(theme.breakpoints.down("md"));

	let [scrolledTop, setScrolledTop] = useState(true);

	useEffect(() => {
		setScrolledTop(window.scrollY < 50);
		addEventListener("scroll", (event) => {
			setScrolledTop(window.scrollY < 50);
		});
	}, [])

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	console.log(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
	  setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
	  setAnchorEl(null);
	};
	return (
		
		<div className={`${styles.header} ${scrolledTop ? styles.headerScrolled : ""}`} style={{
			display: "flex",
			justifyContent: "space-between",
			padding: "1rem",
			position: "fixed",
			zIndex: "1",
			width: "100%",
			overflow: "hidden"
		}}> {isViewportSmallerThanMedium ? 
				<BurgerMenu/>
			: 
			 <>
			<Box display={"flex"}>
				<Link href={"/"}>
					<Box style={{display: "flex"}}>
						<ExportedImage src={PelicanLogo} alt={"Pelican Logo"} height={36}/>
						<Typography variant={"h5"} pl={1} my={"auto"}>Pelican Platform</Typography>
					</Box>
				</Link>
				<Link href={"#"} style={{display: "flex"}}
					aria-controls={anchorEl?.id === "about-header" ? 'about-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={anchorEl?.id === "about-header" ? 'true' : undefined}
				>
					<Typography id="about-header" display={"flex"} my={"auto"} pl={2} lineHeight={1} variant={"h6"} onClick={handleClick}>
						<Box display={"inline"} my={"auto"}>
							About
						</Box>
						{anchorEl?.id === "about-header" ?
								<ArrowDropUp /> :
								<ArrowDropDown />
						}
					</Typography>
				</Link>
				<Menu
					id="about-menu"
					anchorEl={anchorEl}
					open={anchorEl?.id === "about-header"}
					onClose={handleClose}
					MenuListProps={{
					'aria-labelledby': 'about-button',
					}}
				>
					<Link href={"/about"}>
						<MenuItem onClick={handleClose}>What&#39;s Pelican?</MenuItem>
					</Link>
					<Link href={"/team"}>
						<MenuItem onClick={handleClose}>Team</MenuItem>
					</Link>
					<Link href={"/contact"}>
						<MenuItem onClick={handleClose}>Contact</MenuItem>
					</Link>
				</Menu>
				<Link href={"#"} style={{display: "flex"}}
							id="community-button"
							aria-controls={anchorEl?.id === "community-header" ? 'community-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={anchorEl?.id === "community-header" ? 'true' : undefined}
				>
					<Typography id="community-header" display={"flex"} my={"auto"} pl={2} lineHeight={1} variant={"h6"} onClick={handleClick}>
						<Box display={"inline"} my={"auto"}>
							Community
						</Box>
						{anchorEl?.id === "community-header" ?
								<ArrowDropUp /> :
								<ArrowDropDown />
						}
					</Typography>
				</Link>
				
				<Link href={"#"} style={{display: "flex"}}
							id="software-button"
							aria-controls={anchorEl?.id === "software-header" ? 'software-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={anchorEl?.id === "software-header" ? 'true' : undefined}
				>
					<Typography id="software-header" display={"flex"} my={"auto"} pl={2} lineHeight={1} variant={"h6"} onClick={handleClick}>
						<Box display={"inline"} my={"auto"}>
							Software
						</Box>
						{anchorEl?.id === "software-header" ?
								<ArrowDropUp /> :
								<ArrowDropDown />
						}
					</Typography>
				</Link>
				

				<Link href={"https://docs.pelicanplatform.org/"} style={{display: "flex"}} target="_blank">
					<Typography id="docs-header" my={"auto"} pl={2} lineHeight={1} variant={"h6"}>Documentation</Typography>
				</Link>
				<Menu
						id="community-menu"
						anchorEl={anchorEl}
						open={anchorEl?.id === "community-header"}
						onClose={handleClose}
						MenuListProps={{
							'aria-labelledby': 'community-button',
						}}
				>
					<Link href={"/user-stories"}>
						<MenuItem onClick={handleClose}>User Stories</MenuItem>
					</Link>
					<Link href={"/news"}>
						<MenuItem onClick={handleClose}>News</MenuItem>
					</Link>
				</Menu>

				<Menu
						id="software-menu"
						anchorEl={anchorEl}
						open={anchorEl?.id === "software-header"}
						onClose={handleClose}
						MenuListProps={{
							'aria-labelledby': 'software-button',
						}}
				>
					<Link href={"/release-plan"}>
						<MenuItem onClick={handleClose}>Release Plan</MenuItem>
					</Link>
					<Link href={"/releases"}>
						<MenuItem onClick={handleClose}>Releases</MenuItem>
					</Link>
				</Menu>
			</Box>
			<Box sx={{display:"flex", flexDirection:"row", alignItems:"center"}}>
				<Link
					href={"https://docs.pelicanplatform.org/"}
					
					target="_blank"
				>
					<DescriptionIcon 
						fontSize="large" 
						sx={{
							":hover": {
								transform: "scale(1.15)",
								transition: "transform 0.3s",
						},
						marginTop: "2px"
					}}/>
				</Link>
				<Link href={"https://github.com/PelicanPlatform"} target="_blank">
					<GitHubIcon 
						fontSize="large"
						sx={{
							":hover": {
								transform: "scale(1.15)",
								transition: "transform 0.3s",
							},
							marginLeft: "1rem"
						}} />
				</Link>
			</Box>
			</>
			}
		</div>
	)
}