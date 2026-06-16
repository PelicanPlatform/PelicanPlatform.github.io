import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ReleaseBody from "./ReleaseBody";
import { GitHubReleaseData } from "@/utils/github";
import { OrganizedReleasesType } from "@/utils/releases";
import { accordionSx, tokens } from "@/components/ui/Section";

interface ReleaseSectionProps {
    mainReleaseName: string;
    organizedReleases: OrganizedReleasesType;
    id?: string;
}

const ReleaseSection = ({ mainReleaseName, organizedReleases, id }: ReleaseSectionProps) => {
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
        <Box key={mainReleaseName} id={id} pb={6} sx={{ scrollMarginTop: '1.5rem' }}>
            <Typography
                variant='h4'
                component='h2'
                sx={{ fontWeight: 700, color: tokens.ink, mb: 2 }}
            >
                {mainReleaseName[0].toUpperCase() + mainReleaseName.slice(1)}
            </Typography>

            <Box pb={3}>
                <ReleaseBody content={aggregatedBody} />
            </Box>

            {allReleases.map(
                (release: GitHubReleaseData) => (
                    <Accordion
                        key={release.tag_name}
                        disableGutters
                        elevation={0}
                        sx={accordionSx}
                    >
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls={`${release.tag_name}-content`}
                            id={`${release.tag_name}-header`}
                        >
                            <Typography
                                variant='inherit'
                                component='h3'
                                sx={{ fontSize: '1.05rem', fontWeight: 600, color: tokens.ink }}
                            >
                                {release.tag_name}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ borderTop: `1px solid ${tokens.sectionLine}` }}>
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
                    // note: this pushes the bullet point itself, too (i.e. "- xyz" or "* xyz")
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
