import ExportedImage from 'next-image-export-optimizer';
import { Box, Grid, Typography, Paper } from '@mui/material';
import React from 'react';
import { Staff } from '@/utils/staff';

export function LeaderCard({ name, title, image, institution }: Staff) {
  return (
    <Grid container spacing={2} justifyContent={'center'} mb={2}>
      <Grid item xs={7} sm={6} md={5}>
        <Paper
          sx={{
            padding: 2,
            borderRadius: '50%',
            bgcolor: 'primary.light',
          }}
        >
          <Box sx={{ position: 'relative', aspectRatio: 1 }}>
            <ExportedImage
              src={image}
              alt={name}
              fill={true}
              style={{
                borderRadius: '1rem',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Paper>
      </Grid>

      <Grid item sx={{ pl: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ m: 'auto' }}>
          <Typography variant={'h5'} color={'primary.dark'}>
            {name}
          </Typography>
          <Typography variant={'body1'}>{title}</Typography>
          <Typography variant={'body1'}>{institution}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export function StaffCard({ name, title, image, institution }: Staff) {
  return (
    <Box
      sx={{
        borderRadius: '1rem',
        padding: '1rem',
        backgroundColor: 'white',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Paper
        sx={{
          padding: 1,
          borderRadius: '1rem',
          bgcolor: 'primary.light',
        }}
      >
        <ExportedImage
          src={image}
          alt={name}
          height={150}
          width={150}
          style={{
            borderRadius: '1rem',
            objectFit: 'cover',
          }}
        />
      </Paper>

      <Box sx={{ pl: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ m: 'auto' }}>
          <Typography variant={'h5'} color={'primary.dark'}>
            {name}
          </Typography>
          <Typography variant={'subtitle1'}>{title}</Typography>
          <Typography variant={'subtitle1'} lineHeight={1.4}>
            {institution}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
