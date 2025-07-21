import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ReleaseBody from "./ReleaseBody";
import { GitHubReleaseData } from "@/utils/github";
import { OrganizedReleasesType } from "@/utils/releases";

interface ReleaseSectionProps {
    mainReleaseName: string;
    organizedReleases: OrganizedReleasesType;
}

const ReleaseSection = ({ mainReleaseName, organizedReleases }: ReleaseSectionProps) => {
    const mainReleaseData = organizedReleases[mainReleaseName];

    // Combine major and minor releases into a single array
    const allReleases = mainReleaseData.mainRelease
        ? [...mainReleaseData.minorReleases, mainReleaseData.mainRelease]
        : mainReleaseData.minorReleases;

    // Parse sections in reverse so that the original major version is first in the lists
    const parsedSections = parseIntoSections([...allReleases].reverse());

    const aggregatedBody = Object.entries(parsedSections).reduce(
        (body, [sectionTitle, sectionContent]) => {
            return (
                body +
                `## ${sectionTitle}\n` +
                sectionContent.join('\n') +
                '\n\n'
            );
        },
        "",
    );

    return (
        <Box key={mainReleaseName} pb={4}>
            <Typography variant='h3' component='h2'>
                {mainReleaseName[0].toUpperCase() + mainReleaseName.slice(1)}
            </Typography>

            {mainReleaseData.mainRelease &&
                mainReleaseData.mainRelease.body !== '' ? (
                <Box pb={4}>
                    <ReleaseBody content={aggregatedBody} />
                </Box>
            ) : null}

            {allReleases.map(
                (release: GitHubReleaseData) => (
                    <Accordion key={release.tag_name}>
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls={`${release.tag_name}-content`}
                            id={`${release.tag_name}-header`}
                        >
                            <Typography variant='h5' component='h2'>
                                {release.tag_name}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ReleaseBody content={release.body} />
                        </AccordionDetails>
                    </Accordion>
                )
            )}
        </Box>);
}

/**
 * Parses the body of multiple release notes to extract sections based on the "##" headers.
 * 
 * @param body The body of the release notes.
 * @returns An object where keys are section titles and values are the content of those sections.
 */
function parseIntoSections(releases: GitHubReleaseData[]): Record<string, string[]> {
    const result: Record<string, string[]> = {};

    for (const release of releases) {
        const lines = release.body.split('\n');
        let currentSection: string | null = null;

        for (const line of lines) {
            const trimmedLine = line.trim();

            if (trimmedLine.startsWith('## ')) {
                // Check if the line starts with "## " indicating a section header

                currentSection = trimmedLine.slice(3).trim(); // Remove "## ", trim whitespace
                currentSection = currentSection.replace(/:$/, ''); // Remove trailing colon if present
                
                if (!result[currentSection]) {
                    result[currentSection] = []; // Initialize the section if it doesn't exist
                }
            } else if (currentSection && (trimmedLine.startsWith("- ") || trimmedLine.startsWith("* "))) {
                // Check if the line is an item within a list

                const placeholders = ["N/A", "None", "TBD", "...", "TODO"];

                // Check if the bullet point starts with a placeholder
                const bulletContent = trimmedLine.slice(2).trim();
                if (placeholders.some(placeholder => bulletContent.startsWith(placeholder))) {
                    continue;
                } else {
                    // note: this pushes the bullet point itself, too
                    result[currentSection].push(trimmedLine);
                }

            }
        }
    }

    // Remove empty sections
    for (const section in result) {
        if (result[section].length === 0) {
            delete result[section];
        }
    }

    return result;
}

export default ReleaseSection;
