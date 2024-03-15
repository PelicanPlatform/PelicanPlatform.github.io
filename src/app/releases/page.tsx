import React from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Box, Container, Divider, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { GitHubReleaseData } from "@/utils/github";
import { organizeReleases } from "@/utils/releases";



const Page = async () => {
    const organizedReleases = await organizeReleases();
    
    return (
        <Container maxWidth="md">
            <Box pt={6} pb={4}>
                <Typography variant="h2" component="h1">
                    Pelican Releases
                </Typography>
                <Divider sx={{
                    bgcolor: "primary.main",
                    height: "0.25rem",
                }} />
            </Box>
                    {Object.keys(organizedReleases).map((mainRelease, index) => {
                        return (
                            <Box key={index} pb={4}>
                                <Typography variant="h3" component="h2">
                                    {mainRelease[0].toUpperCase() + mainRelease.slice(1)}
                                </Typography>
                                {organizedReleases[mainRelease].mainRelease.body !== "" ? (
                                    <Box pb={4}>
                                        <Markdown
                                            rehypePlugins={[rehypeRaw]}
                                            components={{
                                                h1: ({node, children}) => <Typography variant="h4" pb={2}>{children}</Typography>,
                                                h2: ({node, children}) => <Typography variant="h5" pb={2}>{children}</Typography>,
                                                h3: ({node, children}) => <Typography variant="h6" pb={2}>{children}</Typography>,
                                                h4: ({node, children}) => <Typography variant="subtitle1" pb={2}>{children}</Typography>,
                                                h5: ({node, children}) => <Typography variant="subtitle2" pb={2}>{children}</Typography>,
                                                h6: ({node, children}) => <Typography variant="caption">{children}</Typography>,
                                                p: ({node, children}) => <Typography variant="body1" paragraph>{children}</Typography>,
                                                li: ({node, children}) => <ListItem disablePadding sx={{display:"inline"}}>{children}<br/></ListItem>,
                                                ul: ({node, children}) => <List style={{paddingLeft: "1rem"}}>{children}</List>,
                                                a: ({children, href}) => <Typography component="a" href={href} style={{ color: "#0885ff" }}>{children}</Typography>,
                                                strong: ({node, children}) => <Box component="span" display="inline" fontWeight="bold">{children}</Box>,
                                                text: ({ node, children }) => <Typography variant="body1" display="inline">{children}</Typography>,
                                                div: ({node, children}) => <Box>{children}</Box>,
                                            }}
                                        >
                                            {organizedReleases[mainRelease].mainRelease.body}
                                        </Markdown>
                                    </Box>
                                ) : null}
                                {organizedReleases[mainRelease].minorReleases.map((release: GitHubReleaseData) => (
                                    <Accordion key={release.tag_name}>
                                        <AccordionSummary
                                            expandIcon={<ArrowDropDownIcon />}
                                            aria-controls={`${release.tag_name}-content`}
                                            id={`${release.tag_name}-header`}
                                        >
                                            <Typography variant="h5" component="h2">
                                                {release.tag_name}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Markdown
                                                rehypePlugins={[rehypeRaw]}
                                                components={{
                                                    h1: ({node, children}) => <Typography variant="body1" fontWeight="strong" >{children}</Typography>,
                                                    h2: ({node, children}) => <Typography variant="body1" fontWeight="strong">{children}</Typography>,
                                                    h3: ({node, children}) => <Typography variant="body1" fontWeight="strong">{children}</Typography>,
                                                    h4: ({node, children}) => <Typography variant="body1" fontWeight="strong">{children}</Typography>,
                                                    h5: ({node, children}) => <Typography variant="body1" fontWeight="strong">{children}</Typography>,
                                                    h6: ({node, children}) => <Typography variant="body1" fontWeight="strong">{children}</Typography>,
                                                    p: ({node, children}) => <Typography variant="body1" paragraph>{children}</Typography>,
                                                    li: ({node, children}) => <ListItem disablePadding sx={{display:"inline"}}>{children}<br/></ListItem>,
                                                    a: ({children, href}) => <Typography component="a" href={href} style={{ color: "#0885ff" }}>{children}</Typography>,
                                                    strong: ({node, children}) => <Box component="span" fontWeight="bold" display="inline">{children}</Box>,
                                                    em: ({node, children}) => <Box component="span" sx={{ display: "inline", fontStyle:"italic"}}>{children}</Box>,
                                                    ul: ({node, children}) => <List style={{paddingLeft: "1rem"}}>{children}</List>,
                                                    div: ({node, children}) => <Box>{children}</Box>,
                                                  }}
                                            >
                                                {release.body}
                                            </Markdown>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </Box>
                        );
                    })}
                </Container>
            );
}

export default Page;