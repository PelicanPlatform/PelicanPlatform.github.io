import {Box, Button, Container, Typography} from "@mui/material";
import Link from "next/link";
import DownloadIcon from "@mui/icons-material/Download";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Balancer from "react-wrap-balancer";

interface PresentationCardProps {
    href: string;
    presentation: PresentationProps;
}

export interface PresentationProps {
    id: number;
    title: string;
    description: string;
    authors:
        {
            id: number;
            full_name: string;
            first_name: string;
            last_name: string;
            is_active: boolean;
            url_name: string;
            orcid_id: string | null;
        }[];
    published_date: string;
    download_url: string;
    path: string;
    thumb: string;
}


export const PresentationCard = ({href, presentation}: PresentationCardProps) => {

    const cardStyle = {
        transition: "box-shadow 0.2s",
        boxShadow: "grey 1px 1px 3px",
        "&:hover": {boxShadow: "grey 1px 1px 6px"},
        borderRadius: 4,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
    };

    return (
        <Box sx={cardStyle}>
            <Link href={href}>
                <Box>
                    <img
                        style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                        }}
                        src={presentation.thumb}
                    />
                </Box>
                <Box p={2} display="flex" flexDirection="column" flexGrow={1}>
                    <Typography
                        variant="h6"
                        sx={{fontWeight: "bold", marginBottom: 1}}
                    >
                        {presentation.title}
                    </Typography>
                    {/*<Typography*/}
                    {/*    variant="body2"*/}
                    {/*    color="textSecondary"*/}
                    {/*    sx={{ marginBottom: 2 }}*/}
                    {/*>*/}
                    {/*    By {presentation.authors}*/}
                    {/*</Typography>*/}
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{marginBottom: 2}}
                    >
                        Posted on {new Date(presentation.published_date).toLocaleDateString()}
                    </Typography>
                    {/*<Typography*/}
                    {/*    variant="body2"*/}
                    {/*    color="textSecondary"*/}
                    {/*    sx={{*/}
                    {/*        marginBottom: "auto",*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    {presentation.excerpt}*/}
                    {/*</Typography>*/}
                </Box>
            </Link>
        </Box>
    );
};


export const Presentation = ({
                                 id,
                                 title,
                                 published_date,
                                 path,
                                 authors,
                                 description,
                                 download_url,
                                 thumb,
                             }: PresentationProps) => {
    return (
        <Container maxWidth="md">
            <Box pt={6}>
                <Box textAlign="center" pb={2}>
                    <Typography variant="h3">
                        <Balancer>{title}</Balancer>
                    </Typography>
                    <Box
                        height="1rem"
                        borderRadius="10px"
                        bgcolor="primary.main"
                        mt={2}
                    />
                    <Box pt={1} display={"flex"} justifyContent={"space-between"}>
                        {/*<Typography variant="h5">By {authors}</Typography>*/}
                        <Typography variant={"h5"}>{authors.map(author => author.full_name).join(", ")}</Typography>
                        <Typography variant="h5">
                            {new Date(published_date).toLocaleDateString()}
                        </Typography>
                    </Box>
                </Box>

                <Box
                    mt={4}
                    sx={{
                        position: "relative",
                        overflow: "hidden",
                        paddingTop: "56.25%",
                    }}
                >
                    <iframe
                        src={`https://widgets.figshare.com/articles/${id}/embed?show_title=1`}
                        title="Interactive Presentation Viewer"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            border: "none",
                        }}
                        allowFullScreen
                    ></iframe>
                </Box>

                <Box
                    pt={4}
                    display="flex"
                    justifyContent="center"
                    gap={2}
                >
                    {/*<Button*/}
                    {/*    variant="contained"*/}
                    {/*    color="primary"*/}
                    {/*    startIcon={<DownloadIcon />}*/}
                    {/*    href={download_url}*/}
                    {/*    target="_blank"*/}
                    {/*    rel="noopener noreferrer"*/}
                    {/*>*/}
                    {/*    Download Presentation*/}
                    {/*</Button>*/}
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<OpenInNewIcon/>}
                        href={path}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View on Figshare
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};