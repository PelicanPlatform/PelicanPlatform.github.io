import { GithubMilestoneData } from "@/utils/github";
import { Box, Container, Typography, Divider, Paper, Table, TableCell, TableRow, TableBody } from "@mui/material";

export default async function Page() {
    const milestone = await getCurrentMilestone();

    const preReleaseDate = new Date(new Date(milestone.due_on).getTime() - 1000 * 60 * 60 * 24 * 7); // 7 days before release
    const releaseDate = new Date(milestone.due_on);

    const releaseSchedule = {
        release_name: milestone.title.replace("v", ""),
        pre_release_date: preReleaseDate.toLocaleDateString("en-US", {
            month: "numeric",
            day: "2-digit",
            year: "numeric",
        }),
        release_date: releaseDate.toLocaleDateString("en-US", {
            month: "numeric",
            day: "2-digit",
            year: "numeric",
        }),
    }
    
    return( 
        <Box pt={4}>
            <Container maxWidth={"md"}>
                <Typography variant="h3" sx={{fontWeight: "600"}}>Pelican Release Plan</Typography>
                <Divider sx={{marginBottom:"1em"}}/>
                <Typography variant="body1" component="p">
                    Pelican makes approximately monthly feature releases containing all the latest work of the development team.
                <br/> <br/>
                    On the first Thursday of the month, the Pelican will release a pre-release version. 
                    This can be identified as version `X.Y.Z*` such as `7.6.0`. 
                    This version will then be tested by the integration team and a feature release will occur once their approval is obtained, 
                    ideally a week later. Further patches to that release will be backported as needed if significant bugs are found and will 
                    increment the release number accordingly (e.g. `7.6.1`.)
                </Typography>
                <Paper sx={{padding: "1em", marginTop: "1em", backgroundColor: 'rgba(207, 228, 255)'}}>
                    <Typography variant="h4">Next Release: {releaseSchedule.release_name}</Typography>
                    <Divider sx={{marginBottom:"1em"}}/>
                    <Table sx={{display:"flex"}}>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="h6" fontWeight="bold">
                                        Pre-release:
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6" align="left">
                                        {releaseSchedule.pre_release_date}
                                    </Typography>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    <Typography variant="h6" fontWeight="bold">
                                        Release:
                                    </Typography>    
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">
                                        {releaseSchedule.release_date}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </Container>
        </Box>
    );
}

async function getCurrentMilestone(): Promise<GithubMilestoneData> {
    const apiUrl =
        "https://api.github.com/repos/PelicanPlatform/pelican/milestones?direction=asc";
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch milestones");

    let milestones: GithubMilestoneData[] = await response.json();

    // If the title is 'parking-lot' then skip it
    milestones = milestones.filter((milestone) => milestone.title !== "parking-lot");

    // simple type sanity checks, not exhaustive
    if (!Array.isArray(milestones)) throw new Error("Invalid milestone data");
    if (milestones.length === 0) throw new Error("No milestones found");
    if (!("title" in milestones[0])) throw new Error("Invalid milestone state");
    if (!("state" in milestones[0])) throw new Error("Invalid milestone state");

    const currentMilestone = milestones.find(
        (milestone) => milestone.state === "open"
    );

    if (!currentMilestone) {
        // if there is no open milestone, default to the last closed one just to gracefully handle the case
        console.warn(
            "No open milestone found, defaulting to the last (closed) one"
        );

        return milestones.findLast((milestone) => milestone.state === "closed") ?? milestones[0];
    } else {
        return currentMilestone;
    }
}
