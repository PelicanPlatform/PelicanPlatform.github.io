import { Box, Link, Typography } from '@mui/material';
import ArrowRight from '@/components/svg/arrowright';
import { tokens } from '@/components/ui/Section';
import SeverityChip from './SeverityChip';
import {
  SecurityAdvisory,
  advisoryCvss,
  advisoryHref,
  formatAdvisoryDate,
  patchedVersions,
} from '@/utils/security';

interface AdvisoryCardProps {
  advisory: SecurityAdvisory;
  /** Marks advisories inside the "recent" window with a New badge. */
  isRecent?: boolean;
}

const AdvisoryCard = ({ advisory, isRecent = false }: AdvisoryCardProps) => {
  const cvss = advisoryCvss(advisory);
  const patched = patchedVersions(advisory);
  const href = advisoryHref(advisory);

  return (
    <Box
      component='article'
      sx={{
        backgroundColor: tokens.white,
        border: `1px solid ${tokens.cardLine}`,
        borderRadius: '18px',
        p: { xs: 2.5, md: 3.5 },
        mb: 2.5,
        transition: 'box-shadow .2s ease, border-color .2s ease',
        '&:hover': {
          borderColor: '#CBD9F2',
          boxShadow: '0 12px 26px rgba(13,30,80,0.08)',
        },
        '&:hover .arrow-icon': { transform: 'translateX(0.3em)' },
        '.arrow-icon': { transition: 'transform 0.3s ease-in-out' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1,
          mb: 1.5,
        }}
      >
        <SeverityChip severity={advisory.severity} />
        {cvss && (
          <Box
            component='span'
            sx={{ fontSize: '0.8rem', fontWeight: 600, color: tokens.body }}
          >
            CVSS {cvss.score.toFixed(1)}
          </Box>
        )}
        {isRecent && (
          <Box
            component='span'
            sx={{
              backgroundColor: 'primary.main',
              color: '#fff',
              borderRadius: '999px',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              px: 1.1,
              py: 0.35,
            }}
          >
            New
          </Box>
        )}
        <Box
          sx={{
            ml: 'auto',
            fontSize: '0.85rem',
            color: tokens.body,
            whiteSpace: 'nowrap',
          }}
        >
          {formatAdvisoryDate(advisory.published_at)}
        </Box>
      </Box>

      <Typography
        variant='h5'
        component='h2'
        sx={{ fontWeight: 700, color: tokens.ink, mb: 1, fontSize: '1.35rem' }}
      >
        <Link href={href} underline='hover' color='inherit'>
          {advisory.summary}
        </Link>
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1.5,
          fontSize: '0.85rem',
          fontFamily: 'monospace',
          color: tokens.body,
          mb: patched.length > 0 ? 1.5 : 2,
        }}
      >
        <Box component='span'>{advisory.ghsa_id}</Box>
        {advisory.cve_id && <Box component='span'>{advisory.cve_id}</Box>}
      </Box>

      {patched.length > 0 && (
        <Typography
          variant='body2'
          sx={{ color: tokens.body, mb: 2, lineHeight: 1.7 }}
        >
          <Box component='span' sx={{ fontWeight: 700, color: tokens.ink }}>
            Patched in:{' '}
          </Box>
          {patched.join('; ')}
        </Typography>
      )}

      <Link href={href} underline='none'>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            fontSize: '0.95rem',
            fontWeight: 600,
            color: 'primary.main',
          }}
        >
          Read the advisory
          <ArrowRight
            className='arrow-icon'
            height={16}
            width={22}
            fill={'currentColor'}
          />
        </Box>
      </Link>
    </Box>
  );
};

export default AdvisoryCard;
