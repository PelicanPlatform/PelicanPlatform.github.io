import { Box, Link, Typography } from '@mui/material';
import { Metadata } from 'next';
import { Section, SectionHeading, tokens } from '@/components/ui/Section';
import {
  SECURITY_CONTACT_EMAIL,
  SECURITY_POLICY_URL,
  advisorySlug,
  fetchSecurityAdvisories,
  recentAdvisories,
} from '@/utils/security';
import AdvisoryCard from './AdvisoryCard';

export const metadata: Metadata = {
  title: 'Security Advisories | Pelican Platform',
  description:
    'Published security advisories for the Pelican Platform, including affected versions, patched releases, and mitigation guidance.',
};

const Page = async () => {
  const advisories = await fetchSecurityAdvisories();
  const recentIds = new Set(
    recentAdvisories(advisories).map((advisory) => advisory.ghsa_id)
  );

  return (
    <Section tone='light' maxWidth='md' borderTop={false}>
      <SectionHeading
        eyebrow='Security'
        title='Security Advisories'
        subtitle='Published advisories for Pelican, mirrored from the project’s GitHub Security Advisories. Each entry lists the affected versions and the releases that fix them.'
        align='left'
      />

      <Box
        sx={{
          backgroundColor: tokens.white,
          border: `1px solid ${tokens.cardLine}`,
          borderRadius: '18px',
          p: { xs: 2.5, md: 3 },
          mb: 4,
        }}
      >
        <Typography
          variant='inherit'
          component='h2'
          sx={{ fontWeight: 700, color: tokens.ink, mb: 1, fontSize: '1.05rem' }}
        >
          Reporting a vulnerability
        </Typography>
        <Typography variant='body2' sx={{ color: tokens.body, lineHeight: 1.7 }}>
          If you believe you have found a security issue in Pelican, please
          email{' '}
          <Link href={`mailto:${SECURITY_CONTACT_EMAIL}`} underline='hover'>
            {SECURITY_CONTACT_EMAIL}
          </Link>{' '}
          rather than opening a public issue. See the{' '}
          <Link
            href={SECURITY_POLICY_URL}
            target='_blank'
            rel='noopener'
            underline='hover'
          >
            security policy
          </Link>{' '}
          for what to include in a report.
        </Typography>
      </Box>

      {advisories.length === 0 ? (
        <Box
          sx={{
            backgroundColor: tokens.white,
            border: `1px solid ${tokens.cardLine}`,
            borderRadius: '18px',
            p: { xs: 3, md: 4 },
            textAlign: 'center',
          }}
        >
          <Typography variant='body1' sx={{ color: tokens.body }}>
            There are no published security advisories for Pelican at this time.
          </Typography>
        </Box>
      ) : (
        advisories.map((advisory) => (
          <AdvisoryCard
            key={advisorySlug(advisory)}
            advisory={advisory}
            isRecent={recentIds.has(advisory.ghsa_id)}
          />
        ))
      )}
    </Section>
  );
};

export default Page;
