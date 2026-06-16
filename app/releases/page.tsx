import { Box } from '@mui/material';
import { organizeReleases } from '@/utils/releases';
import ReleaseSection from './ReleaseSection';
import ReleaseNav from './ReleaseNav';
import { Section, SectionHeading } from '@/components/ui/Section';

const idFor = (name: string) => `release-${name}`;
const labelFor = (name: string) => name[0].toUpperCase() + name.slice(1);

const Page = async () => {
  const organizedReleases = await organizeReleases();
  const versions = Object.keys(organizedReleases);
  const navItems = versions.map((name) => ({
    id: idFor(name),
    label: labelFor(name),
  }));

  return (
    <Section tone='light' maxWidth='lg' borderTop={false}>
      {/* 3-column grid: the side nav sits in the left gutter and the content
          stays centered at a fixed readable width (the empty right column
          balances it), so the nav never narrows the content. */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            lg: 'minmax(150px, 1fr) minmax(0, 800px) minmax(150px, 1fr)',
          },
          columnGap: { lg: 4 },
        }}
      >
        <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
          <ReleaseNav items={navItems} />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <SectionHeading
            eyebrow='Changelog'
            title='Pelican Releases'
            subtitle='Every Pelican release, with notes grouped by version.'
            align='left'
          />
          {versions.map((mainReleaseName) => (
            <ReleaseSection
              key={mainReleaseName}
              id={idFor(mainReleaseName)}
              mainReleaseName={mainReleaseName}
              organizedReleases={organizedReleases}
            />
          ))}
        </Box>
      </Box>
    </Section>
  );
};

export default Page;
