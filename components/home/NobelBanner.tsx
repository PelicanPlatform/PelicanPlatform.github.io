'use client';

import * as React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Link from "next/link";

import { tokens } from '@/components/ui/Section';

/** Where the "Read More" button sends visitors. */
const READ_MORE_HREF =
  '/news/2026/10/06/francis-halzen-nobel-prize';

const BANNER_HEIGHT = 60;

// Confetti palette: a few bright party colors plus the site's ink blue so the
// strip still reads as part of the page.
const CONFETTI_COLORS = [
  'rgb(249 65 68 / 0.5)',
  'rgb(248 150 30 / 0.47)',
  'rgb(249 199 79 / 0.26)',
  'rgb(144 190 109 / 0.62)',
  'rgb(67 170 139 / 0.44)',
  'rgb(87 117 144 / 0.53)',
  'rgb(181 23 158 / 0.54)',
  tokens.ink,
];

type Piece = {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  vy: number;
  vx: number;
  angle: number;
  spin: number;
  wobble: number;
  wobbleSpeed: number;
};

/**
 * Animated confetti rendered on a canvas that fills the banner. Pieces drift
 * down and wrap back to the top, so the celebration keeps going for as long as
 * the banner is on screen. Visitors who prefer reduced motion get a single
 * static frame instead.
 */
function Confetti() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let width = 0;
    let height = 0;
    let pieces: Piece[] = [];
    let frame = 0;

    const makePiece = (fromTop: boolean): Piece => {
      const size = 5 + Math.random() * 5;
      return {
        x: Math.random() * width,
        y: fromTop ? -size : Math.random() * height,
        w: size,
        h: size * (0.4 + Math.random() * 0.5),
        color:
          CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        vy: 0.3 + Math.random() * 0.6,
        vx: -0.2 + Math.random() * 0.4,
        angle: Math.random() * Math.PI * 2,
        spin: -0.06 + Math.random() * 0.12,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.04,
      };
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Roughly one piece per 60px of banner width keeps density consistent
      // across screen sizes.
      const count = Math.max(40, Math.round(width / 12));
      pieces = Array.from({ length: count }, () => makePiece(false));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of pieces) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        // Squash the width with the wobble to fake a flat piece of paper
        // tumbling in three dimensions.
        const squash = Math.abs(Math.cos(p.wobble));
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.9;
        ctx.fillRect((-p.w * squash) / 2, -p.h / 2, p.w * squash, p.h);
        ctx.restore();
      }
    };

    const step = () => {
      for (let i = 0; i < pieces.length; i++) {
        const p = pieces[i];
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.wobble) * 0.3;
        p.angle += p.spin;
        p.wobble += p.wobbleSpeed;
        if (p.y - p.h > height) {
          pieces[i] = makePiece(true);
        } else if (p.x < -p.w) {
          p.x = width + p.w;
        } else if (p.x > width + p.w) {
          p.x = -p.w;
        }
      }
      draw();
      frame = window.requestAnimationFrame(step);
    };

    resize();
    draw();
    if (!reduceMotion) {
      frame = window.requestAnimationFrame(step);
    }

    const observer = new ResizeObserver(() => {
      resize();
      draw();
    });
    observer.observe(canvas);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <Box
      component='canvas'
      ref={canvasRef}
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}

/**
 * Celebration strip pinned to the top of the homepage announcing Francis
 * Halzen's 2026 Nobel Prize, with confetti falling behind the text.
 */
export default function NobelBanner() {
  return (
    <Box
      component='aside'
      aria-label='Announcement'
      sx={{
        position: 'relative',
        height: BANNER_HEIGHT,
        overflow: 'hidden',
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #F3E2A6',
      }}
    >
      <Confetti />
      <Container
        maxWidth='lg'
        sx={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Typography
          variant='body1'
          sx={{
            color: tokens.ink,
            pb: 0,
            fontWeight: 700,
            fontSize: { xs: '0.9rem', sm: '1.05rem' },
            lineHeight: 1.2,
            textAlign: 'center',
            // A faint halo keeps the text readable when confetti passes behind it.
            textShadow:
              '0 0 6px #FFF8E1, 0 0 10px #FFF8E1, 0 0 14px #FFF8E1',
          }}
        >
          Pelican user, Francis Halzen awarded the 2026 Nobel Prize!
        </Typography>
        <Button
          component={Link}
          href={READ_MORE_HREF}
          target='_blank'
          rel='noopener noreferrer'
          variant='contained'
          size='small'
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '10px',
            px: 2,
            whiteSpace: 'nowrap',
            backgroundColor: tokens.ink,
            '&:hover': { backgroundColor: '#132270' },
          }}
        >
          Read More
        </Button>
      </Container>
    </Box>
  );
}
