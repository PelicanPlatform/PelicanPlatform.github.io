'use client';

import 'mapbox-gl/dist/mapbox-gl.css';

import * as React from 'react';
import Map, { MapRef } from 'react-map-gl/mapbox';
import { Box } from '@mui/material';

import { OsdfServer } from '@/utils/osdfCaches';
import { COMPONENT_BY_KEY, ComponentKey } from './pelicanComponents';

const MAPBOX_TOKEN =
  process.env.NEXT_PUBLIC_MAPBOX_TOKEN ||
  'pk.eyJ1IjoiY2Fubm9uLWxvY2siLCJhIjoiY21tMTUxbjhqMDVnaDJxcHE2eWp6aGo2ZiJ9.oZFr4GezivM26AkP87Cg-w';

const COL = {
  origin: COMPONENT_BY_KEY.origin.color,
  cache: COMPONENT_BY_KEY.cache.color,
  registry: COMPONENT_BY_KEY.registry.color,
  director: COMPONENT_BY_KEY.director.color,
  client: '#0A1652',
} as const;

// Status colors for the "check caches" step: a down cache, then a live one.
const DOWN = '#E04A3F';
const UP = '#1FA85A';
const WARNING = '#f4c04e';

// Lon/lat anchors for the illustrative request. The Client sits in the
// Southwest (away from the central services); the Director + Registry are the
// real OSDF central services in Madison, WI. The Caches and Origin are real
// federation servers, snapped from anchors chosen so the request visibly
// traverses the map rather than bunching in one corner.
const CLIENT: [number, number] = [-112.07, 33.45];
const MADISON: [number, number] = [-89.3849, 43.0739];
// Regional anchors → nearest real server. West cache (the down one), a central
// cache that serves, and a Midwest origin behind it.
const ANCHOR_CACHE_DOWN: [number, number] = [-122.07, 37.4]; // Bay Area
const ANCHOR_SERVING: [number, number] = [-104.99, 39.74]; // Denver
const ANCHOR_ORIGIN: [number, number] = [-96.66, 40.81]; // Nebraska

type LngLat = [number, number];
type Pt = { x: number; y: number };

function dist2(a: LngLat, b: LngLat) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  return dx * dx + dy * dy;
}

function lngLat(s: OsdfServer): LngLat {
  return [s.longitude, s.latitude];
}

export interface FlowActors {
  /** First cache the client tries — it comes back down (red). */
  cacheDown: LngLat;
  /** The live cache that serves the request (green). */
  serving: LngLat;
  origin: LngLat | null;
}

function nearestTo(target: LngLat, list: OsdfServer[]): OsdfServer | null {
  if (list.length === 0) return null;
  return [...list].sort(
    (a, b) => dist2(lngLat(a), target) - dist2(lngLat(b), target)
  )[0];
}

/** Pick the request's supporting cast from the live federation. */
export function computeActors(
  caches: OsdfServer[],
  origins: OsdfServer[]
): FlowActors {
  const servingS = nearestTo(ANCHOR_SERVING, caches);
  // The down cache is a different real cache out west.
  const downS = nearestTo(
    ANCHOR_CACHE_DOWN,
    caches.filter((c) => c !== servingS)
  );
  const originS = nearestTo(ANCHOR_ORIGIN, origins);
  return {
    cacheDown: downS ? lngLat(downS) : ANCHOR_CACHE_DOWN,
    serving: servingS ? lngLat(servingS) : ANCHOR_SERVING,
    origin: originS ? lngLat(originS) : null,
  };
}

interface ProjNodes {
  client: Pt;
  director: Pt;
  registry: Pt;
  cacheDown: Pt;
  serving: Pt;
  origin: Pt | null;
  contextCache: Pt[];
  contextOrigin: Pt[];
}

export interface FlowMapProps {
  caches: OsdfServer[];
  origins: OsdfServer[];
  phase: number;
  /** Component card the user has focused, if any — pulses the matching node. */
  highlight: ComponentKey | null;
}

export default function FlowMap({ caches, origins, phase, highlight }: FlowMapProps) {
  const mapRef = React.useRef<MapRef>(null);
  const [proj, setProj] = React.useState<ProjNodes | null>(null);
  const [dim, setDim] = React.useState<{ w: number; h: number }>({ w: 0, h: 0 });
  // Sub-step within a phase (used to sequence the "check caches" beats).
  const [seq, setSeq] = React.useState(0);

  const actors = React.useMemo(
    () => computeActors(caches, origins),
    [caches, origins]
  );

  // Some phases play out in beats. Phase 2: try the down cache, then the live
  // one. Phase 3: first fetch from the Origin (cache miss), then serve the next
  // request straight from the Cache (cache hit) with the Origin path muted.
  // Phases 2 and 3 play in three stages: ~3s (first) → ~2s (middle: just the
  // dot moves, no lines) → ~5s (last). Advance the sub-step at 3s and 5s.
  React.useEffect(() => {
    setSeq(0);
    if (phase !== 2 && phase !== 3) return;
    const t1 = setTimeout(() => setSeq(1), 4000);
    const t2 = setTimeout(() => setSeq(2), 8000);
    if (phase !== 3 ) return;
    const t3 = setTimeout(() => setSeq(3), 12000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [phase]);

  const recompute = React.useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    const p = (ll: LngLat): Pt => {
      const { x, y } = map.project(ll);
      return { x, y };
    };
    setProj({
      client: p(CLIENT),
      director: p(MADISON),
      // Registry shares the central-services location; nudge it so both read.
      registry: p([MADISON[0] - 0.9, MADISON[1] + 0.7]),
      cacheDown: p(actors.cacheDown),
      serving: p(actors.serving),
      origin: actors.origin ? p(actors.origin) : null,
      contextCache: caches.map((c) => p(lngLat(c))),
      contextOrigin: origins.map((o) => p(lngLat(o))),
    });
    const c = map.getContainer();
    setDim({ w: c.clientWidth, h: c.clientHeight });
  }, [actors, caches, origins]);

  // map.project() is valid as soon as the map is constructed — so project a few
  // times right after mount. This keeps the overlay up even if the basemap
  // style is slow or blocked (the 'load' event may never fire in that case).
  React.useEffect(() => {
    const timers = [80, 300, 700, 1500].map((d) => setTimeout(recompute, d));
    return () => timers.forEach(clearTimeout);
  }, [recompute]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        aspectRatio: '2 / 1',
        borderRadius: '14px',
        overflow: 'hidden',
        bgcolor: '#FBFCFE',
        // Animation keyframes (scoped-but-global via emotion injection).
        '@keyframes flowdash': { to: { strokeDashoffset: -20 } },
        '@keyframes nodepulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.18)' },
        },
        '@keyframes packetmove': {
          '0%': { offsetDistance: '0%', opacity: 0 },
          '12%': { opacity: 1 },
          '100%': { offsetDistance: '100%', opacity: 1 },
        },
        '& .mapboxgl-ctrl-logo, & .mapboxgl-ctrl-attrib': { opacity: 0.6 },
      }}
    >
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          bounds: [
            [-125, 24],
            [-66.5, 49.8],
          ],
          fitBoundsOptions: { padding: 24 },
        }}
        mapStyle='mapbox://styles/mapbox/light-v11'
        style={{ width: '100%', height: '100%' }}
        attributionControl={false}
        interactive={false}
        onLoad={recompute}
        onResize={recompute}
      />

      {proj && dim.w > 0 && (
        <Box
          component='svg'
          width={dim.w}
          height={dim.h}
          sx={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
          }}
        >
          <FlowLayers proj={proj} phase={phase} seq={seq} highlight={highlight} />
        </Box>
      )}
    </Box>
  );
}

// ---- SVG building blocks -------------------------------------------------

// A dot that travels a path, using a CSS motion-path animation (which starts
// when the element renders, sidestepping SMIL's document-timeline issues). The
// animation has a 1s delay and is hidden until it begins, so the connecting
// line shows on its own for a beat before the pulse is sent. `once` makes a
// single pass and rests at the end; otherwise it loops.
function MotionPacket({
  path,
  dur,
  color,
  r = 4,
  once = false,
}: {
  path: string;
  dur: string;
  color: string;
  r?: number;
  once?: boolean;
}) {
  return (
    <circle
      cx={0}
      cy={0}
      r={r}
      fill={color}
      style={{
        offsetPath: `path("${path}")`,
        offsetRotate: '0deg',
        opacity: 0,
        animation: `packetmove ${dur} linear 1s ${once ? '1 both' : 'infinite backwards'}`,
      }}
    />
  );
}

function Beam({
  from,
  to,
  color,
  packetColor,
  dur = '2.4s',
  once = false,
  k,
}: {
  from: Pt;
  to: Pt;
  color: string;
  packetColor?: string;
  dur?: string;
  // When true, the packet makes a single pass and rests at the destination —
  // so it reads as one request rather than a repeating stream.
  once?: boolean;
  k: string;
}) {
  return (
    <g key={k}>
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap='round'
        opacity={0.3}
      />
      <MotionPacket
        path={`M${from.x} ${from.y} L${to.x} ${to.y}`}
        dur={dur}
        color={packetColor ?? color}
        once={once}
      />
    </g>
  );
}

function Node({
  p,
  r,
  fill,
  opacity = 1,
  k,
}: {
  p: Pt;
  r: number;
  fill: string;
  // Accepted for call-site compatibility; the pulsing glow was removed.
  ring?: boolean;
  opacity?: number;
  k: string;
}) {
  return (
    <circle
      key={k}
      cx={p.x}
      cy={p.y}
      r={r}
      fill={fill}
      opacity={opacity}
      style={{ transition: 'opacity .3s ease' }}
    />
  );
}

function Label({ p, text, dy, k }: { p: Pt; text: string; dy: number; k: string }) {
  return (
    <text
      key={k}
      x={p.x}
      y={p.y + dy}
      textAnchor='middle'
      style={{
        font: "600 12px 'Helvetica Neue', Helvetica, Arial, sans-serif",
        fill: '#0A1652',
        paintOrder: 'stroke',
        stroke: '#FBFCFE',
        strokeWidth: 3.5,
        strokeLinejoin: 'round',
      }}
    >
      {text}
    </text>
  );
}

function FlowLayers({
  proj,
  phase,
  seq,
  highlight,
}: {
  proj: ProjNodes;
  phase: number;
  seq: number;
  highlight: ComponentKey | null;
}) {
  const { client, director, registry, cacheDown, serving, origin } = proj;
  const els: React.ReactNode[] = [];

  // Faint context: the whole live federation behind the request.
  els.push(
    <g key='ctx-cache' opacity={0.22}>
      {proj.contextCache.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={3} fill={COL.cache} />
      ))}
    </g>
  );
  els.push(
    <g key='ctx-origin' opacity={0.22}>
      {proj.contextOrigin.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={3} fill={COL.origin} />
      ))}
    </g>
  );

  if (phase === 0) {
    // Request: a single packet travels Client → Director.
    els.push(<Beam k='b0' from={client} to={director} color={COL.director} once />);
    els.push(<Node k='d0' p={director} r={7.5} fill={COL.director} ring />);
    els.push(<Label k='ld0' p={director} text='Director' dy={-14} />);
  } else if (phase === 1) {
    // Cache list: the Director returns a ranked list of Caches — light up the
    // caches that came back, while a packet carries the list to the Client.
    els.push(<Node k='cl-a' p={cacheDown} r={7} fill={COL.cache} ring />);
    els.push(<Label k='cl-b-lbl' p={cacheDown} text='Cache' dy={-13} />);
    els.push(<Node k='cl-b' p={serving} r={7} fill={COL.cache} ring />);
    els.push(<Label k='cl-b-lbl' p={serving} text='Cache' dy={-13} />);
    els.push(<Beam k='b1' from={director} to={client} color={COL.director} once />);
    els.push(<Node k='d1' p={director} r={7.5} fill={COL.director} ring />);
    els.push(<Label k='ld1' p={director} text='Director' dy={-14} />);
  } else if (phase === 2) {
    // Check caches in three stages: (0) try the down cache — it's down;
    // (1) the request travels on to the next cache — just the dot, no lines;
    // (2) the live cache connects and serves.
    if (seq === 0) {
      els.push(<Beam k='q1' from={client} to={cacheDown} color={DOWN} once dur='1.6s' />);
      els.push(<Node k='cd0' p={cacheDown} r={7.5} fill={DOWN} />);
      els.push(<Label k='lcd0' p={cacheDown} text='Cache · Down' dy={-14} />);
    } else if (seq === 1) {
      els.push(<Node k='cd2' p={cacheDown} r={6} fill={DOWN} opacity={0.5} />);
      els.push(<Beam k='q2' from={client} to={serving} color={UP} dur='1.6s' once />);
      els.push(<Node k='cu2' p={serving} r={7.5} fill={UP} />);
      els.push(<Label k='lcu2' p={serving} text='Cache · Live' dy={-14} />);
    } else {
      els.push(<Node k='cd3' p={cacheDown} r={6} fill={DOWN} opacity={0.5} />);
      els.push(<Beam k='q3' from={serving} to={client} color={UP} dur='1.6s' once />);
      els.push(<Node k='cu3' p={serving} r={7.5} fill={UP} />);
      els.push(<Label k='lcu3' p={serving} text='Cache · Live' dy={-14} />);
    }
  } else {
    if(origin == null) return;

    if (seq === 0) {
      els.push(<Beam from={client} to={serving} color={UP} k={'miss'} once/>)
      els.push(<Node k='s3' p={serving} r={7} fill={WARNING}/>);
      els.push(<Label k='cache-label' p={serving} text='Cache' dy={-14}/>);
    } else if (seq === 1) {
      els.push(<Beam from={serving} to={origin} color={UP} k={'to-origin'} once/>)
      els.push(<Node k='requesting-cache' p={serving} r={7} fill={WARNING}/>);
      els.push(<Label k='cache-label' p={serving} text='Cache' dy={-14}/>);
      els.push(<Node k='origin' p={origin} r={7} fill={UP}/>);
      els.push(<Label k='origin-label' p={origin} text='Origin' dy={-14}/>);
    } else if (seq === 2) {
      els.push(<Beam from={origin} to={serving} color={UP} k={'miss'} once/>)
      els.push(<Node k='requesting-cache' p={serving} r={7} fill={WARNING}/>);
      els.push(<Label k='cache-label' p={serving} text='Cache' dy={-14}/>);
      els.push(<Node k='origin' p={origin} r={7} fill={UP}/>);
      els.push(<Label k='origin-label' p={origin} text='Origin' dy={-14}/>);
    } else {
      els.push(<Beam from={serving} to={client} color={UP} k={'response'}/>)
      els.push(<Node k='requesting-cache' p={serving} r={7} fill={UP}/>);
      els.push(<Node k='origin' p={origin} r={7} fill={"#000000"}/>);
      els.push(<Label k='cache-label' p={serving} text='Cache' dy={-14}/>);
      els.push(<Label k='origin-label' p={origin} text='Origin' dy={-14}/>);
    }
  }

  // Registry only enters when the user focuses its card — it underpins trust
  // from the central services but never sits in the data path.
  if (highlight === 'registry') {
    els.push(<Node k='reg' p={registry} r={8} fill={COL.registry} ring />);
    els.push(<Label k='lreg' p={registry} text='Registry' dy={-15} />);
  }

  // The client is always present.
  els.push(
    <circle key='client' cx={client.x} cy={client.y} r={6.5} fill={COL.client} />
  );
  els.push(<Label k='lclient' p={client} text='Client' dy={20} />);

  return <>{els}</>;
}
