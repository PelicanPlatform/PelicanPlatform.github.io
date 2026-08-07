import { getAll } from './github';

/**
 * Subset of GitHub's repository security advisory payload that we render.
 * https://docs.github.com/en/rest/security-advisories/repository-advisories
 */
export interface SecurityAdvisory {
  ghsa_id: string;
  cve_id: string | null;
  html_url: string;
  summary: string;
  description: string | null;
  severity: AdvisorySeverity | null;
  state: string;
  published_at: string | null;
  updated_at: string | null;
  withdrawn_at: string | null;
  identifiers: { value: string; type: string }[] | null;
  vulnerabilities: AdvisoryVulnerability[] | null;
  cvss_severities: {
    cvss_v3?: { vector_string: string | null; score: number | null } | null;
    cvss_v4?: { vector_string: string | null; score: number | null } | null;
  } | null;
  cwes: { cwe_id: string; name: string }[] | null;
  credits: { login: string; type: string }[] | null;
}

export interface AdvisoryVulnerability {
  package: { ecosystem: string; name: string | null } | null;
  vulnerable_version_range: string | null;
  patched_versions: string | null;
}

export type AdvisorySeverity = 'critical' | 'high' | 'medium' | 'low';

/**
 * How recently an advisory must have been published for the site to treat it as
 * breaking news (homepage banner, "New" badge on the list).
 */
export const RECENT_ADVISORY_WINDOW_DAYS = 7;

const ADVISORIES_URL =
  'https://api.github.com/repos/PelicanPlatform/pelican/security-advisories';

/** Where the community is told to send reports — mirrors the repo's SECURITY.md. */
export const SECURITY_CONTACT_EMAIL = 'security@pelicanplatform.org';
export const SECURITY_POLICY_URL =
  'https://github.com/PelicanPlatform/pelican/security/policy';

/**
 * Every published, non-withdrawn advisory for the pelican repo, newest first.
 *
 * Draft and withdrawn advisories are dropped: a draft isn't public yet, and a
 * withdrawn one was retracted, so republishing either here would be wrong.
 */
export async function fetchSecurityAdvisories(): Promise<SecurityAdvisory[]> {
  const advisories: SecurityAdvisory[] = await getAll(ADVISORIES_URL);

  return advisories
    .filter(
      (advisory) => advisory.state === 'published' && !advisory.withdrawn_at
    )
    .sort((a, b) => publishedTime(b) - publishedTime(a));
}

/** URL slug for an advisory — the GHSA id is already unique and stable. */
export function advisorySlug(advisory: SecurityAdvisory): string {
  return advisory.ghsa_id;
}

export function advisoryHref(advisory: SecurityAdvisory): string {
  return `/security/${advisorySlug(advisory)}`;
}

/** Epoch millis an advisory went public; unpublished sorts last. */
export function publishedTime(advisory: SecurityAdvisory): number {
  return advisory.published_at ? Date.parse(advisory.published_at) : 0;
}

/**
 * The CVSS score to display, preferring v4 over v3 since that is what GitHub
 * shows on the advisory itself. Returns null when neither is scored.
 */
export function advisoryCvss(
  advisory: SecurityAdvisory
): { version: string; score: number; vector: string | null } | null {
  const v4 = advisory.cvss_severities?.cvss_v4;
  if (v4?.score) {
    return { version: '4.0', score: v4.score, vector: v4.vector_string };
  }

  const v3 = advisory.cvss_severities?.cvss_v3;
  if (v3?.score) {
    return { version: '3.1', score: v3.score, vector: v3.vector_string };
  }

  return null;
}

/**
 * Advisories published within the last `RECENT_ADVISORY_WINDOW_DAYS`.
 *
 * `now` is evaluated when the site is built, not when it is viewed — this is a
 * statically exported site. The deploy workflow rebuilds several times a day,
 * so a banner appears within hours of an advisory going out and ages off on its
 * own once the window closes.
 */
export function recentAdvisories(
  advisories: SecurityAdvisory[],
  now: number = Date.now()
): SecurityAdvisory[] {
  const cutoff = now - RECENT_ADVISORY_WINDOW_DAYS * 24 * 60 * 60 * 1000;
  return advisories.filter((advisory) => publishedTime(advisory) >= cutoff);
}

const SEVERITY_RANK: Record<AdvisorySeverity, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
};

/** The advisory a visitor most needs to see: worst severity, then newest. */
export function mostSevere(
  advisories: SecurityAdvisory[]
): SecurityAdvisory | undefined {
  return [...advisories].sort((a, b) => {
    const rank =
      (b.severity ? SEVERITY_RANK[b.severity] : 0) -
      (a.severity ? SEVERITY_RANK[a.severity] : 0);
    return rank !== 0 ? rank : publishedTime(b) - publishedTime(a);
  })[0];
}

/** Non-empty patched version strings across an advisory's affected packages. */
export function patchedVersions(advisory: SecurityAdvisory): string[] {
  return (advisory.vulnerabilities ?? [])
    .map((vulnerability) => vulnerability.patched_versions?.trim())
    .filter((versions): versions is string => Boolean(versions));
}

export function formatAdvisoryDate(date: string | null): string {
  if (!date) {
    return 'Unpublished';
  }

  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
