'use client'

import ExportedImage from "next-image-export-optimizer";
import {Grid, Box, Container, Divider, Typography} from "@mui/material";

import chtcLogo from "../../public/static/images/CHTC_Logo.svg"
import morgridgeLogo from "../../public/static/images/Morgridge_Logo.png"
import Link from "next/link";
import {TypeSpecimen} from "@mui/icons-material";

const Footer = () => {

    return (
        <>
            <Box mt={1} sx={{paddingTop: "2rem", paddingBottom: "2rem"}}>
                <Container maxWidth={"xl"}>
                    <Grid container sx={{display: "flex", justifyContent: "center"}} spacing={2}>
                        <Grid item>
                            <Link href={"https://chtc.cs.wisc.edu"}>
                                <ExportedImage src={chtcLogo} alt={"CHTC Logo"} height={40}/>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href={"https://morgridge.org"}>
                                <ExportedImage src={morgridgeLogo} alt={"Morgridge Logo"} height={40}/>
                            </Link>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Box sx={{backgroundColor:"#F5F5F5"}} pt={3}>
                <Container maxWidth={"xl"}>
                    <Grid container justifyContent={"center"} spacing={2}>
                        <Grid item>
                            <Typography>
                                <Link href={"./branding"}>Branding</Link>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography>
                                <Link href={"./contact"}>Contact Us</Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Box sx={{backgroundColor:"#F5F5F5"}} py={1}>
                <Container maxWidth={"xl"}>
                    <Grid container justifyContent={"center"}>
                        <Grid xs={12} lg={10} item>
                            <Box>
                                <Typography variant={"subtitle1"} sx={{textAlign: "center", color: "grey"}}>
                                    This project is supported by National Science Foundation under Cooperative
                                    Agreement
                                    <Link style={{color: "#0885ff"}} href={"https://www.nsf.gov/awardsearch/showAward?AWD_ID=2331480"}> OAC-2331480</Link>. Any opinions, findings, conclusions or recommendations
                                    expressed in this material are those of the authors and do not necessarily
                                    reflect the views of the National Science Foundation.
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}

export default Footer;