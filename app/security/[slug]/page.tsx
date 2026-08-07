import { Box, Button, Link, Typography } from '@mui/material';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import MarkdownContainer from '@/components/MarkdownContainer';
import { Section, tokens } from '@/components/ui/Section';
import {
  SecurityAdvisory,
  advisoryCvss,
  advisorySlug,
  fetchSecurityAdvisories,
  formatAdvisoryDate,
  patchedVersions,
} from '@/utils/security';
import SeverityChip from '../SeverityChip';

export async function generateStaticParams() {
  const advisories = await fetchSecurityAdvisories();
  return advisories.map((advisory) => ({ slug: advisorySlug(advisory) }));
}

async function getAdvisory(slug: string): Promise<SecurityAdvisory | undefined> {
  const advisories = await fetchSecurityAdvisories();
  return advisories.find((advisory) => advisorySlug(advisory) === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const advisory = await getAdvisory((await params).slug);

  if (!advisory) {
    return { title: 'Security Advisory | Pelican Platform' };
  }

  return {
    title: `${advisory.summary} | Pelican Security Advisory`,
    description: `${advisory.severity ? `${advisory.severity} severity — ` : ''}${advisory.ghsa_id}${advisory.cve_id ? ` (${advisory.cve_id})` : ''}`,
  };
}

/** One label/value row in the advisory's metadata panel. */
const MetaItem = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <Box>
    <Typography
      variant='inherit'
      component='dt'
      sx={{
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        fontWeight: 700,
        fontSize: '0.7rem',
        color: tokens.body,
        mb: 0.5,
      }}
    >
      {label}
    </Typography>
    <Box
      component='dd'
      sx={{ m: 0, fontSize: '0.95rem', color: tokens.ink, fontWeight: 600 }}
    >
      {children}
    </Box>
  </Box>
);

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const advisory = await getAdvisory((await params).slug);

  if (!advisory) {
    notFound();
  }

  const cvss = advisoryCvss(advisory);
  const patched = patchedVersions(advisory);
  const vulnerabilities = advisory.vulnerabilities ?? [];
  const credits = advisory.credits ?? [];
  const cwes = advisory.cwes ?? [];

  return (
    <Section tone='light' maxWidth='md' borderTop={false}>
      <Link
        href='/security'
        underline='hover'
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.5,
          fontSize: '0.9rem',
          fontWeight: 600,
          mb: 3,
        }}
      >
        <ArrowBackRoundedIcon fontSize='small' />
        All security advisories
      </Link>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
        <SeverityChip severity={advisory.severity} size='medium' />
        <Typography
          variant='inherit'
          sx={{
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            fontWeight: 600,
            fontSize: '0.8rem',
            color: 'primary.main',
          }}
        >
          Security Advisory
        </Typography>
      </Box>

      <Typography
        variant='h3'
        component='h1'
        sx={{ fontWeight: 700, color: tokens.ink, mb: 3 }}
      >
        {advisory.summary}
      </Typography>

      {/* Metadata panel — the facts an administrator needs before reading prose. */}
      <Box
        component='dl'
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)' },
          gap: 2.5,
          backgroundColor: tokens.white,
          border: `1px solid ${tokens.cardLine}`,
          borderRadius: '18px',
          p: { xs: 2.5, md: 3 },
          m: 0,
          mb: 3,
        }}
      >
        <MetaItem label='Published'>
          {formatAdvisoryDate(advisory.published_at)}
        </MetaItem>
        <MetaItem label='Last updated'>
          {formatAdvisoryDate(advisory.updated_at)}
        </MetaItem>
        <MetaItem label='CVE'>{advisory.cve_id ?? 'Not assigned'}</MetaItem>
        <MetaItem label={cvss ? `CVSS v${cvss.version}` : 'CVSS'}>
          {cvss ? cvss.score.toFixed(1) : 'Not scored'}
        </MetaItem>
      </Box>

      {patched.length > 0 && (
        <Box
          sx={{
            backgroundColor: '#ECF7ED',
            border: '1px solid #C3E2C6',
            borderRadius: '18px',
            p: { xs: 2.5, md: 3 },
            mb: 3,
          }}
        >
          <Typography
            variant='inherit'
            component='h2'
            sx={{
              fontWeight: 700,
              color: '#1E4620',
              fontSize: '1.05rem',
              mb: 0.75,
            }}
          >
            Upgrade to a patched release
          </Typography>
          <Typography
            variant='body2'
            sx={{ color: '#1E4620', lineHeight: 1.7, mb: 1.5 }}
          >
            {patched.join('; ')}
          </Typography>
          <Link
            href='https://docs.pelicanplatform.org/install'
            target='_blank'
            rel='noopener'
            underline='hover'
            sx={{ fontSize: '0.9rem', fontWeight: 600 }}
          >
            Installation and upgrade instructions
          </Link>
        </Box>
      )}

      {vulnerabilities.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography
            variant='h5'
            component='h2'
            sx={{ fontWeight: 700, color: tokens.ink, mb: 2 }}
          >
            Affected versions
          </Typography>
          <Box sx={{ overflowX: 'auto' }}>
            <Box
              component='table'
              sx={{
                borderCollapse: 'collapse',
                width: '100%',
                fontSize: '0.95rem',
                backgroundColor: tokens.white,
                '& th, & td': {
                  border: `1px solid ${tokens.cardLine}`,
                  p: 1.5,
                  textAlign: 'left',
                  verticalAlign: 'top',
                  color: tokens.ink,
                },
                '& th': {
                  backgroundColor: tokens.light,
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                },
              }}
            >
              <thead>
                <tr>
                  <th scope='col'>Package</th>
                  <th scope='col'>Affected</th>
                  <th scope='col'>Patched</th>
                </tr>
              </thead>
              <tbody>
                {vulnerabilities.map((vulnerability, index) => (
                  <tr key={`${vulnerability.package?.name ?? 'package'}-${index}`}>
                    <td>{vulnerability.package?.name ?? 'Pelican'}</td>
                    <td>{vulnerability.vulnerable_version_range ?? 'Unspecified'}</td>
                    <td>{vulnerability.patched_versions || 'No patch listed'}</td>
                  </tr>
                ))}
              </tbody>
            </Box>
          </Box>
        </Box>
      )}

      {advisory.description && (
        <Box
          sx={{
            backgroundColor: tokens.white,
            border: `1px solid ${tokens.cardLine}`,
            borderRadius: '18px',
            p: { xs: 2.5, md: 4 },
            mb: 3,
          }}
        >
          <MarkdownContainer content={advisory.description} />
        </Box>
      )}

      {cwes.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant='h6'
            component='h2'
            sx={{ fontWeight: 700, color: tokens.ink, mb: 1 }}
          >
            Weaknesses
          </Typography>
          <Typography variant='body2' sx={{ color: tokens.body }}>
            {cwes.map((cwe) => `${cwe.cwe_id} — ${cwe.name}`).join(', ')}
          </Typography>
        </Box>
      )}

      {credits.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography
            variant='h6'
            component='h2'
            sx={{ fontWeight: 700, color: tokens.ink, mb: 1 }}
          >
            Credits
          </Typography>
          <Typography variant='body2' sx={{ color: tokens.body, lineHeight: 1.9 }}>
            {credits.map((credit, index) => (
              <Box component='span' key={credit.login}>
                {index > 0 && ', '}
                <Link
                  href={`https://github.com/${credit.login}`}
                  target='_blank'
                  rel='noopener'
                  underline='hover'
                >
                  {credit.login}
                </Link>{' '}
                ({credit.type.replace(/_/g, ' ')})
              </Box>
            ))}
          </Typography>
        </Box>
      )}

      <Button
        component='a'
        href={advisory.html_url}
        target='_blank'
        rel='noopener'
        variant='outlined'
        startIcon={<GitHubIcon />}
        sx={{
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '12px',
          px: 3,
          py: 1.2,
          backgroundColor: '#fff',
        }}
      >
        View {advisory.ghsa_id} on GitHub
      </Button>
    </Section>
  );
};

export default Page;
