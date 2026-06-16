import { Box, Container, Typography } from '@mui/material';
import { ContainerProps } from '@mui/material/Container';
import { ReactNode } from 'react';

/**
 * Shared design tokens for the refreshed site style — banded sections,
 * navy headings, soft-bordered cards. Kept here so every page pulls from one
 * source of truth.
 */
export const tokens = {
  ink: '#0A1652', // headings / strong text
  body: '#56638A', // secondary body text
  cardLine: '#E4ECF8', // card borders
  sectionLine: '#EAF1FB', // section top borders
  light: '#F7FAFE', // light band background
  white: '#ffffff',
} as const;

/** sx for a soft white card — matches the home components. */
export const cardSx = {
  backgroundColor: tokens.white,
  border: `1px solid ${tokens.cardLine}`,
  borderRadius: '18px',
  p: { xs: 3, md: 4 },
} as const;

/**
 * sx for a soft, bordered MUI <Accordion> (use with `disableGutters elevation={0}`).
 * Strips the default shadow + divider line and gives it a rounded card look.
 */
export const accordionSx = {
  backgroundColor: tokens.white,
  border: `1px solid ${tokens.cardLine}`,
  borderRadius: '12px',
  mb: 1.5,
  boxShadow: 'none',
  overflow: 'hidden',
  '&:before': { display: 'none' },
  '&.Mui-expanded': { margin: '0 0 12px 0' },
} as const;

type Tone = 'light' | 'white';

interface SectionProps {
  children: ReactNode;
  /** Background band: light (#F7FAFE) or white. Alternate these down a page. */
  tone?: Tone;
  maxWidth?: ContainerProps['maxWidth'];
  /** Hairline separating this band from the one above. */
  borderTop?: boolean;
  id?: string;
  /** Extra sx merged onto the outer band. */
  sx?: object;
}

/** A full-width background band with a centered content container. */
export function Section({
  children,
  tone = 'white',
  maxWidth = 'lg',
  borderTop = true,
  id,
  sx,
}: SectionProps) {
  return (
    <Box
      component='section'
      id={id}
      sx={{
        backgroundColor: tone === 'light' ? tokens.light : tokens.white,
        borderTop: borderTop ? `1px solid ${tokens.sectionLine}` : 'none',
        py: { xs: 6, md: 10 },
        ...sx,
      }}
    >
      <Container maxWidth={maxWidth}>{children}</Container>
    </Box>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'center' | 'left';
  /** Max width of the heading block (helps keep subtitles readable). */
  maxWidth?: number;
}

/** Eyebrow + title + subtitle block used at the top of every section. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  maxWidth = 760,
}: SectionHeadingProps) {
  return (
    <Box
      sx={{
        textAlign: align,
        maxWidth,
        mx: align === 'center' ? 'auto' : 0,
        mb: { xs: 4, md: 6 },
      }}
    >
      {eyebrow && (
        <Typography
          variant='inherit'
          sx={{
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            fontWeight: 600,
            fontSize: '0.8rem',
            color: 'primary.main',
            mb: 1.5,
          }}
        >
          {eyebrow}
        </Typography>
      )}
      <Typography variant='h3' sx={{ fontWeight: 700, color: tokens.ink, mb: subtitle ? 1.5 : 0 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant='h6' sx={{ fontWeight: 400, color: 'text.secondary' }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
