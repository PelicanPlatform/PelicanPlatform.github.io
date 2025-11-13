import { Box, Chip, Typography } from '@mui/material';
import Link from 'next/link';
import { BackendPresentation } from '@/utils/presentations';

interface PresentationCardProps {
  href: string;
  presentation: BackendPresentation;
}

export const PresentationCard = ({
  href,
  presentation,
}: PresentationCardProps) => {
  const cardStyle = {
    transition: 'box-shadow 0.2s',
    boxShadow: 'grey 1px 1px 3px',
    '&:hover': { boxShadow: 'grey 1px 1px 6px' },
    borderRadius: 4,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  };

  return (
    <Box sx={cardStyle}>
      <Link href={href}>

        <Box p={2} display='flex' flexDirection='column' flexGrow={1}>
          <Typography variant='h6' sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            {presentation.title}
          </Typography>
        </Box>
      </Link>
    </Box>
  );
};
