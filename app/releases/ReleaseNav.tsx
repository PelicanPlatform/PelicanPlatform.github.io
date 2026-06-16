'use client';

import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { tokens } from '@/components/ui/Section';

export interface ReleaseNavItem {
  id: string;
  label: string;
}

/**
 * Sticky side navigation listing every release version, with the section
 * currently in view highlighted (scrollspy via IntersectionObserver).
 */
export default function ReleaseNav({ items }: { items: ReleaseNavItem[] }) {
  const [active, setActive] = React.useState<string | undefined>(items[0]?.id);

  React.useEffect(() => {
    const visible: Record<string, boolean> = {};
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          visible[e.target.id] = e.isIntersecting;
        });
        // The active section is the first (topmost in document order) that is
        // currently crossing the band near the top of the viewport.
        const current = items.find((i) => visible[i.id]);
        if (current) setActive(current.id);
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );

    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <Box
      component='nav'
      aria-label='Releases'
      sx={{ position: 'sticky', top: 24 }}
    >
      <Typography
        variant='inherit'
        sx={{
          display: 'block',
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          fontWeight: 600,
          fontSize: '0.7rem',
          color: '#8090B5',
          mb: 1.5,
          pl: 1.5,
        }}
      >
        All Releases
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 'calc(100vh - 8rem)',
          overflowY: 'auto',
        }}
      >
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <Box
              key={item.id}
              component='a'
              href={`#${item.id}`}
              sx={{
                display: 'block',
                py: 0.6,
                pl: 1.5,
                borderLeft: '2px solid',
                borderColor: isActive ? 'primary.main' : 'transparent',
                color: isActive ? 'primary.main' : tokens.body,
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.95rem',
                textDecoration: 'none',
                transition: 'color .15s ease, border-color .15s ease',
                '&:hover': { color: tokens.ink },
              }}
            >
              {item.label}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
