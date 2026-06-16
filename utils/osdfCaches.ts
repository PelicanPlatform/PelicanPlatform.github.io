/**
 * Server-side loader for OSDF server locations.
 *
 * The director exposes every federation server (Origins + Caches) at the URL
 * below. We fetch it at build time, keep only servers that have real
 * coordinates, and slim each record down to what the homepage map needs — so
 * the browser never has to call the director itself.
 */

const DIRECTOR_URL =
  'https://osdf-director.osg-htc.org/api/v1.0/director_ui/servers';

export type ServerHealth = 'OK' | 'Initializing' | 'Error' | 'Unknown';

export type ServerType = 'Origin' | 'Cache';

export interface OsdfServer {
  name: string;
  type: ServerType;
  latitude: number;
  longitude: number;
  health: ServerHealth;
  webUrl: string;
  version: string;
}

// Kept for backwards compatibility / readability at call sites.
export type OsdfCache = OsdfServer;

export interface OsdfFederation {
  origins: OsdfServer[];
  caches: OsdfServer[];
}

interface DirectorServer {
  name?: string;
  type?: string;
  latitude?: number;
  longitude?: number;
  healthStatus?: string;
  webUrl?: string;
  version?: string;
}

function normalizeHealth(status?: string): ServerHealth {
  if (status === 'OK' || status === 'Initializing' || status === 'Error') {
    return status;
  }
  return 'Unknown';
}

function hasGeo(
  s: DirectorServer
): s is DirectorServer & { latitude: number; longitude: number } {
  return (
    // Only show healthy servers — skip those in Error or still Initializing.
    s.healthStatus === 'OK' &&
    typeof s.latitude === 'number' &&
    typeof s.longitude === 'number' &&
    // (0,0) is the director's "no geolocation" sentinel.
    !(s.latitude === 0 && s.longitude === 0)
  );
}

function toServer(s: DirectorServer, type: ServerType): OsdfServer {
  return {
    name: s.name ?? `Unknown ${type.toLowerCase()}`,
    type,
    latitude: s.latitude as number,
    longitude: s.longitude as number,
    health: normalizeHealth(s.healthStatus),
    webUrl: s.webUrl ?? '',
    version: s.version ?? '',
  };
}

/**
 * Fetch and slim the OSDF server list, partitioned into Origins and Caches.
 * Runs on the server (build time for the static export). Throws if the
 * director is unreachable or returns a non-OK response — we deliberately fail
 * the build rather than ship a site with a silently empty map.
 */
export async function getOsdfFederation(): Promise<OsdfFederation> {
  const res = await fetch(DIRECTOR_URL);
  if (!res.ok) {
    throw new Error(
      `OSDF director request failed: ${res.status} ${res.statusText} (${DIRECTOR_URL})`
    );
  }

  const servers = (await res.json()) as DirectorServer[];

  const origins: OsdfServer[] = [];
  const caches: OsdfServer[] = [];
  for (const s of servers) {
    if (!hasGeo(s)) continue;
    if (s.type === 'Origin') origins.push(toServer(s, 'Origin'));
    else if (s.type === 'Cache') caches.push(toServer(s, 'Cache'));
  }

  return { origins, caches };
}

/**
 * Convenience wrapper that returns just the Caches. Kept so existing call
 * sites that only care about caches read cleanly.
 */
export async function getOsdfCaches(): Promise<OsdfServer[]> {
  return (await getOsdfFederation()).caches;
}
