'use client';

import * as React from 'react';
import { Box, ButtonBase, Container, IconButton, Typography } from '@mui/material';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';

import { OsdfServer } from '@/utils/osdfCaches';
import FlowMap from './FlowMap';
import {
  COMPONENTS,
  COMPONENT_BY_KEY,
  ComponentGroup,
  ComponentKey,
  PelicanComponent,
} from './pelicanComponents';

// Per-phase auto-advance timing (ms) and copy, ported from the demo.
// Step dwell times. The two multi-stage steps (Check caches, Fetch & deliver)
// run three sub-stages of ~3s + 2s + 5s = 10s; the others stay at 5s.
const PHASE_DURATIONS = [4000, 4000, 10000, 16000];
const STEP_LABELS = ['Request', 'Cache list', 'Check caches', 'Fetch & deliver'];
const STEP_COLORS = [
  COMPONENT_BY_KEY.director.color,
  COMPONENT_BY_KEY.director.color,
  COMPONENT_BY_KEY.cache.color,
  COMPONENT_BY_KEY.origin.color,
];
const STEP_DESCRIPTIONS = [
  'The client sends a request — it first reaches the Director, the federation’s routing service.',
  'The Director replies with a ranked list of Caches the client should try. The list is carefully ranked with federation context.',
  'The client makes a request to those Caches, asking if they already hold the object and falling back to another cache on error.',
  'On a cache miss, the Cache fetches the object from the Origin and streams it back to the client.',
];

// Selecting a component card jumps the flow to the step where it stars.
// Origin and Cache both star in the fetch-and-deliver step, so they share it.
// Registry never sits in the data path, so it has no signature step.
const SIGNATURE_PHASE: Record<ComponentKey, number | null> = {
  director: 0,
  cache: 3,
  origin: 3,
  registry: null,
};

const GROUPS: ComponentGroup[] = ['Storage Services', 'Central Services'];

interface FederationSuiteProps {
  caches: OsdfServer[];
  origins: OsdfServer[];
}

export default function FederationSuite({ caches, origins }: FederationSuiteProps) {
  const [phase, setPhase] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const [selected, setSelected] = React.useState<ComponentKey | null>(null);

  // Auto-advance the flow while playing.
  React.useEffect(() => {
    if (!playing) return;
    const t = setTimeout(
      () => setPhase((p) => (p + 1) % 4),
      PHASE_DURATIONS[phase] ?? 2700
    );
    return () => clearTimeout(t);
  }, [phase, playing]);

  const selectComponent = (key: ComponentKey) => {
    if (selected === key) {
      setSelected(null);
      setPlaying(true);
      return;
    }
    setSelected(key);
    setPlaying(false);
    const sig = SIGNATURE_PHASE[key];
    if (sig !== null) setPhase(sig);
  };

  const goToStep = (i: number) => {
    setSelected(null);
    setPlaying(false);
    setPhase(i);
  };

  const togglePlay = () => {
    setSelected(null);
    setPlaying((p) => !p);
  };

  const statFor = (key: ComponentKey): string => {
    if (key === 'origin') return `${origins.length} U.S. origins`;
    if (key === 'cache') return `${caches.length} U.S. caches`;
    return 'Central · Madison, WI';
  };

  const accent = selected ? COMPONENT_BY_KEY[selected].color : STEP_COLORS[phase];
  const description = selected
    ? COMPONENT_BY_KEY[selected].short
    : STEP_DESCRIPTIONS[phase];

  return (
    <Box
      component='section'
      id='suite'
      sx={{
        backgroundColor: '#F7FAFE',
        borderTop: '1px solid #EAF1FB',
        py: { xs: 6, md: 10 },
        scrollMarginTop: '1rem',
      }}
    >
      <Container maxWidth='xl'>
        {/* Heading */}
        <Box sx={{ textAlign: 'center', maxWidth: 760, mx: 'auto', mb: { xs: 4, md: 6 } }}>
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
            The Pelican Software Suite
          </Typography>
          <Typography variant='h3' sx={{ fontWeight: 700, mb: 1.5 }}>
            Four components, one federation.
          </Typography>
          <Typography variant='h6' sx={{ fontWeight: 400, color: 'text.secondary' }}>
            Watch a request travel the federation — or pick a component to see the
            part it plays.
          </Typography>
        </Box>

        {/* Cards + map */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(300px, 360px) 1fr' },
            gap: 3,
            alignItems: 'stretch',
          }}
        >
          {/* LEFT: component cards */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {GROUPS.map((group) => (
              <React.Fragment key={group}>
                <Typography
                  variant='inherit'
                  sx={{
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    color: '#8090B5',
                    mt: group === 'Central Services' ? 0.5 : 0,
                  }}
                >
                  {group}
                </Typography>
                {COMPONENTS.filter((c) => c.group === group).map((c) => (
                  <ComponentCard
                    key={c.key}
                    component={c}
                    selected={selected === c.key}
                    onSelect={() => selectComponent(c.key)}
                  />
                ))}
              </React.Fragment>
            ))}
          </Box>

          {/* RIGHT: map panel */}
          <Box
            sx={{
              backgroundColor: '#ffffff',
              border: '1px solid #E4ECF8',
              borderRadius: '20px',
              p: 2.5,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 50px rgba(13,30,80,0.06)',
            }}
          >
            {/* Header: legend + play/pause */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                mb: 1,
                flexWrap: 'wrap',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  '@keyframes flowblink': {
                    '0%,100%': { opacity: 1 },
                    '50%': { opacity: 0.25 },
                  },
                }}
              >
                <Box
                  sx={{
                    width: 9,
                    height: 9,
                    borderRadius: '50%',
                    bgcolor: accent,
                    animation: playing ? 'flowblink 1.3s ease-in-out infinite' : 'none',
                  }}
                />
                <Typography
                  variant='inherit'
                  sx={{ fontSize: '0.8rem', color: 'text.secondary', fontWeight: 500 }}
                >
                  {selected ? COMPONENT_BY_KEY[selected].name : 'Live object request'}
                </Typography>
              </Box>
              <IconButton
                onClick={togglePlay}
                size='small'
                aria-label={playing ? 'Pause animation' : 'Play animation'}
                title={playing ? 'Pause' : 'Play'}
                sx={{
                  bgcolor: '#EEF3FB',
                  color: '#33405F',
                  '&:hover': { bgcolor: '#E0E8F6' },
                }}
              >
                {playing ? (
                  <PauseRoundedIcon fontSize='small' />
                ) : (
                  <PlayArrowRoundedIcon fontSize='small' />
                )}
              </IconButton>
            </Box>

            {/* Map */}
            <FlowMap
              caches={caches}
              origins={origins}
              phase={phase}
              highlight={selected}
            />

            {/* Caption / stepper */}
            <Box
              sx={{
                mt: 2,
                p: 2,
                backgroundColor: '#F7FAFE',
                borderRadius: '14px',
              }}
            >
              {selected ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      flex: 'none',
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: accent,
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant='inherit'
                      sx={{ fontSize: '1rem', fontWeight: 700, color: '#0A1652' }}
                    >
                      {COMPONENT_BY_KEY[selected].name}
                    </Typography>
                    <Typography
                      variant='inherit'
                      sx={{ fontSize: '0.9rem', color: 'text.secondary' }}
                    >
                      {description}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      flex: 'none',
                      fontSize: '0.72rem',
                      fontWeight: 500,
                      color: '#33405F',
                      bgcolor: '#fff',
                      border: '1px solid #E4ECF8',
                      px: 1.5,
                      py: 1,
                      borderRadius: '9px',
                      whiteSpace: 'nowrap',
                      display: { xs: 'none', sm: 'block' },
                    }}
                  >
                    {statFor(selected)}
                  </Box>
                </Box>
              ) : (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: { xs: 0.5, sm: 1 },
                      flexWrap: 'wrap',
                    }}
                  >
                    {STEP_LABELS.map((label, i) => {
                      const active = i === phase;
                      return (
                        <ButtonBase
                          key={label}
                          onClick={() => goToStep(i)}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            px: 0.75,
                            py: 0.5,
                            borderRadius: '8px',
                          }}
                        >
                          <Box
                            sx={{
                              flex: 'none',
                              width: 25,
                              height: 25,
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.78rem',
                              fontWeight: 600,
                              bgcolor: active ? STEP_COLORS[i] : '#E5ECF7',
                              color: active ? '#fff' : '#9AA7C4',
                              transition: 'background .3s, color .3s',
                            }}
                          >
                            {i + 1}
                          </Box>
                          <Typography
                            variant='inherit'
                            sx={{
                              fontSize: '0.82rem',
                              fontWeight: 600,
                              lineHeight: 1,
                              whiteSpace: 'nowrap',
                              color: active ? '#0A1652' : '#9AA7C4',
                              transition: 'color .3s',
                            }}
                          >
                            {label}
                          </Typography>
                        </ButtonBase>
                      );
                    })}
                  </Box>
                  <Typography
                    variant='inherit'
                    sx={{ fontSize: '0.9rem', color: 'text.secondary', mt: 1.5 }}
                  >
                    {description}
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function ComponentCard({
  component,
  selected,
  onSelect,
}: {
  component: PelicanComponent;
  selected: boolean;
  onSelect: () => void;
}) {
  const { name, tag, short, color, tint, Icon } = component;
  return (
    <ButtonBase
      onClick={onSelect}
      aria-pressed={selected}
      sx={{
        position: 'relative',
        textAlign: 'left',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 2,
        backgroundColor: '#fff',
        border: '1px solid #E4ECF8',
        borderRadius: '16px',
        p: 2.5,
        display: 'flex',
        transition: 'transform .18s ease, box-shadow .18s ease',
        boxShadow: selected
          ? `0 14px 30px ${color}2E, 0 0 0 2px ${color}`
          : 'none',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: selected
            ? `0 14px 30px ${color}2E, 0 0 0 2px ${color}`
            : '0 12px 26px rgba(13,30,80,0.08)',
        },
      }}
    >
      <Box
        sx={{
          flex: 'none',
          width: 46,
          height: 46,
          borderRadius: '12px',
          bgcolor: tint,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={24} color={color} />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant='inherit'
            sx={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.2, color: '#0A1652' }}
          >
            {name}
          </Typography>
          <Box
            sx={{
              fontSize: '0.62rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              color,
              bgcolor: tint,
              px: 0.75,
              py: '3px',
              borderRadius: '6px',
            }}
          >
            {tag}
          </Box>
        </Box>
        <Typography
          variant='inherit'
          sx={{ fontSize: '0.85rem', lineHeight: 1.5, color: '#56638A', mt: 0.5 }}
        >
          {short}
        </Typography>
      </Box>
    </ButtonBase>
  );
}
