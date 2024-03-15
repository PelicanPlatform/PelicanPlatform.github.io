'use client';
import React, {useState} from "react";
import {Box,Typography, IconButton, Drawer, Divider, List, ListSubheader} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import PelicanLogo from "../public/static/images/PelicanPlatformLogo_Icon.png"
import ExportedImage from "next-image-export-optimizer";
import Link from "next/link";
import {
    Home, GitHub, Description, Groups, Email, Help, Group, Info, Grade, Newspaper, Close, Terminal, CalendarMonth, FileDownload
} from "@mui/icons-material";
import { HeaderDropdown, HeaderLink, HeaderMainLink } from "./HeaderDropdown";

export const BurgerMenu = () => {
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleDrawer = () => {
        setOpenDrawer(!openDrawer);
    };

  return (
    <Box sx={{display: "flex", alignItems:"center", justifyContent:"space-between" , width: "100%"}}>
        <Link href={"/"}>
            <Box style={{display: "flex", marginLeft: "1rem"}}>
                <ExportedImage src={PelicanLogo} alt={"Pelican Logo"} height={36}/>
                <Typography variant={"h5"} pl={1} my={"auto"}>Pelican Platform</Typography>
            </Box>
        </Link>
        <IconButton
            sx={{marginRight: "1rem"}}
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawer}
        >
            <MenuIcon sx={{fontSize:"2rem"}}/>
        </IconButton>
        <Drawer anchor={"right"} open={openDrawer} onClose={handleDrawer} 
            sx={{
                "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: "100%",
                    "@media (min-width: 576px)": {
                        width: "30rem",
                    }
                },
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
                backdropFilter: "blur(2px)",
                WebkitBackdropFilter: "blur(2px)",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}
        >
            <List
                sx={{margin: "1rem" }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        <Box style={{display: "flex", flexDirection:"row", justifyContent:"start" }}>
                            <ExportedImage src={PelicanLogo} alt={"Pelican Logo"} height={48}/>
                            <Typography variant={"h5"} pl={1} my={"auto"}>Pelican Platform</Typography>
                            <IconButton
                                sx={{ml: "auto"}}
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={handleDrawer}
                            >
                                <Close sx={{fontSize:"2rem"}}/>
                            </IconButton>
                        </Box>
                    </ListSubheader>
                }
            >
                <Divider sx={{my:2}}/>
                <HeaderMainLink name={"Home"} href={"/"} icon={<Home />} target="_self" onClick={handleDrawer} />
                <HeaderMainLink name={"Team"} href={"/team"} icon={<Groups />} target="_self" onClick={handleDrawer}/>

                <HeaderDropdown name={"About"} icon={<Info />} >
                    <HeaderLink name={"What's Pelican?"} href={"/about"} icon={<Help />} target="_self" onClick={handleDrawer}/>
                    <HeaderLink name={"Contact"} href={"/contact"} icon={<Email />} target="_self" onClick={handleDrawer}/>
                </HeaderDropdown>

                <HeaderDropdown name={"Community"} icon={<Group />} >
                    <HeaderLink name={"User Stories"} href={"/user-stories"} icon={<Grade />} target="_self" onClick={handleDrawer}/>
                    <HeaderLink name={"News"} href={"/news"} icon={<Newspaper />} target="_self" onClick={handleDrawer}/>
                </HeaderDropdown>

                <HeaderDropdown name={"Software"} icon = {<Terminal />} >
                    <HeaderLink name={"Release Plan"} href={"/release-plan"} icon={<CalendarMonth />} target="_self" onClick={handleDrawer}/>
                    <HeaderLink name={"Releases"} href={"/releases"} icon={<FileDownload />} target="_self" onClick={handleDrawer}/>
                </HeaderDropdown>

                <HeaderMainLink name={"Documentation"} href={"https://docs.pelicanplatform.org/"} icon={<Description />} target="_blank" onClick={handleDrawer}/>
                <HeaderMainLink name={"GitHub"} href={"https://github.com/PelicanPlatform"} icon={<GitHub />} target="_blank" onClick={handleDrawer}/>
            </List>
        </Drawer>
    </Box>
  );
}

export default BurgerMenu;