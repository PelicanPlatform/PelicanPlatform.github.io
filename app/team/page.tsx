import { Box, Container, GridLegacy, Typography, Divider } from '@mui/material';
import { LeaderCard, StaffCard } from './cards';
import React from 'react';
import { getStaff } from '../../utils/staff';

export default async function Page() {
  const team = await getStaff('pelican');

  const promoted = team
    .filter(
      (member) =>
        member?.promoted == true &&
        member.organizations.includes('pelican') &&
        member.status !== 'Past'
    )
    .sort((a, b) => (a.pelican?.weight || 0) - (b.pelican?.weight || 0));
  const staff = team
    .filter(
      (member) =>
        member.organizations.includes('pelican') && member.status !== 'Past'
    )
    .sort((a, b) => (a.pelican?.weight || 0) - (b.pelican?.weight || 0));
  const pastStaff = team.filter(
    (member) =>
      member.organizations.includes('pelican') && member.status === 'Past'
  );

  return (
    <Box pt={6}>
      <Container maxWidth={'xl'}>
        <GridLegacy container justifyContent={'center'}>
          <GridLegacy item xs={12} sm={6} lg={5}>
            <LeaderCard {...promoted[0]} />
          </GridLegacy>
        </GridLegacy>
        <GridLegacy container justifyContent={'center'}>
          {promoted.slice(1, 3).map((member) => {
            return (
              <GridLegacy key={member.name} item xs={12} sm={6} lg={5}>
                <LeaderCard {...member} />
              </GridLegacy>
            );
          })}
        </GridLegacy>
        <GridLegacy container justifyContent={'center'}>
          {staff.map((member) => (
            <StaffCard key={member.name} {...member} />
          ))}
        </GridLegacy>
        {pastStaff.length > 0 && (
          <>
            <Box pt={6} pb={4}>
              <Divider
                sx={{
                  bgcolor: 'primary.main',
                  height: '0.3rem',
                  width: '3rem',
                }}
              />
              <Typography variant='h4' component='h2'>
                Previous Staff
              </Typography>
            </Box>
            <GridLegacy container justifyContent={'center'}>
              {pastStaff.map((member) => (
                <StaffCard key={member.name} {...member} />
              ))}
            </GridLegacy>
          </>
        )}
      </Container>
    </Box>
  );
}
