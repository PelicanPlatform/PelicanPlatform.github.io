import { Box } from '@mui/material';
import { AdvisorySeverity } from '@/utils/security';

/**
 * Severity is the first thing an administrator reads, so each level gets a
 * distinct hue rather than relying on the label alone. Text is dark-on-tint to
 * keep contrast well above 4.5:1.
 */
const SEVERITY_COLORS: Record<
  AdvisorySeverity | 'unknown',
  { fg: string; bg: string; border: string }
> = {
  critical: { fg: '#8C1D18', bg: '#FDECEA', border: '#F5C6C0' },
  high: { fg: '#9A3412', bg: '#FFF1E8', border: '#FBD3B8' },
  medium: { fg: '#854D0E', bg: '#FEF7E0', border: '#F5E0A8' },
  low: { fg: '#1E4620', bg: '#ECF7ED', border: '#C3E2C6' },
  unknown: { fg: '#56638A', bg: '#F7FAFE', border: '#E4ECF8' },
};

interface SeverityChipProps {
  severity: AdvisorySeverity | null;
  size?: 'small' | 'medium';
}

const SeverityChip = ({ severity, size = 'small' }: SeverityChipProps) => {
  const colors = SEVERITY_COLORS[severity ?? 'unknown'];

  return (
    <Box
      component='span'
      sx={{
        display: 'inline-block',
        backgroundColor: colors.bg,
        color: colors.fg,
        border: `1px solid ${colors.border}`,
        borderRadius: '999px',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        fontWeight: 700,
        whiteSpace: 'nowrap',
        fontSize: size === 'small' ? '0.7rem' : '0.8rem',
        px: size === 'small' ? 1.1 : 1.5,
        py: size === 'small' ? 0.35 : 0.5,
      }}
    >
      {severity ?? 'unrated'}
    </Box>
  );
};

export default SeverityChip;
