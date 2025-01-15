import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

interface StyledBlockProps {
  children: ReactNode;
  width?: string;
  offset?: string;
}

export const StyledBlock: React.FC<StyledBlockProps> = ({
  children,
  width,
  offset,
}) => {
  width = width ? width : '1rem';
  offset = offset ? offset : '-2rem';

  return (
    <Box display={'flex'}>
      <Box width={0}>
        <Box
          bgcolor={'primary.main'}
          width={width}
          ml={offset}
          borderRadius={2}
          height={1}
        ></Box>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default StyledBlock;
