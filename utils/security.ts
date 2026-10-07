import { formatLongDate, type SecurityAdvisory } from '@chtc/web-components';

/**
 * Pelican-specific pieces of the security pages. Fetching, filtering, and
 * scoring advisories lives in @chtc/web-components so every site renders
 * GitHub security advisories the same way.
 */

/** Where the community is told to send reports — mirrors the repo's SECURITY.md. */
export const SECURITY_CONTACT_EMAIL = 'security@pelicanplatform.org';
export const SECURITY_POLICY_URL =
  'https://github.com/PelicanPlatform/pelican/security/policy';

/** URL slug for an advisory — the GHSA id is already unique and stable. */
export function advisorySlug(advisory: SecurityAdvisory): string {
  return advisory.ghsa_id;
}

export function advisoryHref(advisory: SecurityAdvisory): string {
  return `/security/${advisorySlug(advisory)}`;
}

export function formatAdvisoryDate(date: string | null): string {
  return date ? formatLongDate(date) : 'Unpublished';
}
