import { Box, Link, Typography } from '@mui/material';
import ArrowRight from '@/components/svg/arrowright';
import { fetchAllReleases } from '@/utils/releases';
import semverRCompare from 'semver/functions/rcompare';
import { tokens } from '@/components/ui/Section';

const Releases = async () => {
  const releases = await fetchAllReleases();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <Box
      sx={{
        borderRadius: '18px',
        overflow: 'hidden',
        border: `1px solid ${tokens.cardLine}`,
        backgroundColor: '#fff',
        boxShadow: '0 6px 16px rgba(13,30,80,0.06)',
        transition: 'box-shadow .2s ease',
        '&:hover': { boxShadow: '0 12px 26px rgba(13,30,80,0.10)' },
        px: 3,
        pt: 2,
        pb: 1,
      }}
    >
      {Array.isArray(releases) &&
        releases
          .filter((release) => !release.prerelease)
          .sort((a, b) => semverRCompare(a.name, b.name))
          .slice(0, 4)
          .map((release) => (
            <Box
              key={release.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                py: 1.25,
                borderBottom: `1px solid ${tokens.sectionLine}`,
                '&:last-of-type': { borderBottom: 'none' },
              }}
            >
              <Box>
                <Box sx={{ fontSize: '1.05rem', fontWeight: 700, color: tokens.ink }}>
                  <Link href={`/releases/${release.name}`} underline='hover' color='inherit'>
                    Release
                  </Link>
                </Box>
                <Box sx={{ fontSize: '0.85rem', color: tokens.body }}>
                  {formatDate(release.published_at)}
                </Box>
              </Box>
              <Box sx={{ fontSize: '1.15rem', fontWeight: 700, color: 'primary.main' }}>
                {release.name}
              </Box>
            </Box>
          ))}

      <Link href={'/releases'} underline='none'>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            py: 1.5,
            fontSize: '0.95rem',
            fontWeight: 600,
            color: 'primary.main',
            '&:hover .arrow-icon': { transform: 'translateX(0.3em)' },
            '.arrow-icon': { transition: 'transform 0.3s ease-in-out' },
          }}
        >
          All Releases
          <ArrowRight className='arrow-icon' height={16} width={22} fill={'currentColor'} />
        </Box>
      </Link>
    </Box>
  );
};

export default Releases;
