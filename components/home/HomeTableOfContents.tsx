'use client';

import * as React from 'react';
import { Box, ButtonBase, Typography, useMediaQuery } from '@mui/material';

import { tokens } from '@/components/ui/Section';

// The homepage sections, in page order. `id` must match the `id` on each
// section band so anchor scrolling and the scrollspy line up.
const SECTIONS = [
  { id: 'clients', label: 'User Clients' },
  { id: 'suite', label: 'Visualizing the Federation' },
  { id: 'backends', label: 'Connecting your Data' },
  { id: 'components', label: 'Components Overview' },
  { id: 'community', label: 'News & Releases' },
] as const;

export default function HomeTableOfContents() {
  const [active, setActive] = React.useState<string>(SECTIONS[0].id);
  // The TOC stays hidden over the hero and animates in once the first section
  // (Clients & Tools) is reached.
  const [shown, setShown] = React.useState(false);
  // Desktop: the index peeks in briefly on scroll, then tucks away — unless the
  // cursor is near the left edge, in which case it stays put for navigation.
  const [peek, setPeek] = React.useState(false);
  const [nearLeft, setNearLeft] = React.useState(false);
  const peekTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const mobileNavRef = React.useRef<HTMLDivElement>(null);
  // On very wide screens there's room to keep the index out permanently, with
  // no panel background. Narrower desktops fall back to the peek behavior.
  const isWide = useMediaQuery('(min-width:1920px)');

  // Scrollspy: the active section is the last one whose top has scrolled above
  // an activation line near the top of the viewport. This stays correct for
  // sections of any height and has no dead bands between them.
  React.useEffect(() => {
    const compute = () => {
      const line = window.innerHeight * 0.33;
      let current: string = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top - line <= 0) current = s.id;
      }
      // At the very bottom the last section may never reach the line — pin it.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = SECTIONS[SECTIONS.length - 1].id;
      setActive(current);

      const first = document.getElementById(SECTIONS[0].id);
      setShown(!!first && first.getBoundingClientRect().top - line <= 0);
    };

    // Peek the desktop index in on scroll, then hide it after a short pause.
    const onScroll = () => {
      compute();
      setPeek(true);
      if (peekTimer.current) clearTimeout(peekTimer.current);
      peekTimer.current = setTimeout(() => setPeek(false), 500);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', compute);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', compute);
      if (peekTimer.current) clearTimeout(peekTimer.current);
    };
  }, []);

  // Keep the desktop index open whenever the cursor hovers near the left edge.
  React.useEffect(() => {
    const onMove = (e: MouseEvent) => setNearLeft(e.clientX <= 240);
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Keep the active chip in view in the horizontal mobile nav, without moving
  // the page itself.
  React.useEffect(() => {
    const nav = mobileNavRef.current;
    if (!nav) return;
    const chip = nav.querySelector<HTMLElement>(`[data-toc-id="${active}"]`);
    if (chip) nav.scrollTo({ left: chip.offsetLeft - 16, behavior: 'smooth' });
  }, [active]);

  const handleClick =
    (id: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

  // Past the hero: very wide screens keep the index out; narrower desktops
  // reveal it on scroll or left-edge hover.
  const desktopVisible = shown && (isWide || peek || nearLeft);

  return (
    <>
      {/* Desktop: a vertical index floating at the left edge. */}
      <Box
        component='nav'
        aria-label='Page sections'
        sx={{
          display: { xs: 'none', lg: 'flex' },
          flexDirection: 'column',
          gap: 0.25,
          position: 'fixed',
          top: '50%',
          left: 16,
          zIndex: 5,
          p: 1,
          borderRadius: '14px',
          backgroundColor: isWide ? 'transparent' : 'rgba(255,255,255,0.82)',
          backdropFilter: isWide ? 'none' : 'blur(10px)',
          border: isWide ? 'none' : `1px solid ${tokens.cardLine}`,
          boxShadow: isWide ? 'none' : '0 12px 30px rgba(13,30,80,0.10)',
          opacity: desktopVisible ? 1 : 0,
          transform: desktopVisible
            ? 'translate(0, -50%)'
            : 'translate(-16px, -50%)',
          pointerEvents: desktopVisible ? 'auto' : 'none',
          transition: 'opacity .35s ease, transform .35s ease',
        }}
      >
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <ButtonBase
              key={s.id}
              component='a'
              href={`#${s.id}`}
              onClick={handleClick(s.id)}
              sx={{
                justifyContent: 'flex-start',
                px: 1,
                py: 0.6,
                borderRadius: '8px',
                '&:hover .toc-label': { color: tokens.ink },
              }}
            >
              <Typography
                className='toc-label'
                variant='inherit'
                sx={{
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? tokens.ink : tokens.body,
                  whiteSpace: 'nowrap',
                  pb: '2px',
                  borderBottom: '2px solid',
                  borderColor: isActive ? 'primary.main' : 'transparent',
                  transition: 'color .2s ease, border-color .2s ease',
                }}
              >
                {s.label}
              </Typography>
            </ButtonBase>
          );
        })}
      </Box>

      {/* Mobile / tablet: a sticky row of quick-nav buttons below the header. */}
      <Box
        ref={mobileNavRef}
        component='nav'
        aria-label='Page sections'
        sx={{
          display: { xs: 'flex', lg: 'none' },
          gap: 1,
          overflowX: 'auto',
          overflowY: 'hidden',
          position: 'sticky',
          top: 0,
          zIndex: 6,
          px: 2,
          py: shown ? 1.5 : 0,
          maxHeight: shown ? '64px' : 0,
          opacity: shown ? 1 : 0,
          pointerEvents: shown ? 'auto' : 'none',
          backgroundColor: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(8px)',
          borderBottom: `1px solid ${shown ? tokens.sectionLine : 'transparent'}`,
          transition: 'max-height .35s ease, padding .35s ease, opacity .35s ease',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <ButtonBase
              key={s.id}
              data-toc-id={s.id}
              component='a'
              href={`#${s.id}`}
              onClick={handleClick(s.id)}
              sx={{
                flex: 'none',
                px: 1.75,
                py: 0.75,
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                border: '1px solid',
                borderColor: isActive ? 'primary.main' : tokens.cardLine,
                color: isActive ? '#fff' : tokens.body,
                backgroundColor: isActive ? 'primary.main' : '#fff',
                transition: 'background-color .2s ease, color .2s ease, border-color .2s ease',
              }}
            >
              {s.label}
            </ButtonBase>
          );
        })}
      </Box>
    </>
  );
}
