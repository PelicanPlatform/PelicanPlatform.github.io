import React, { FC, SVGProps } from 'react';
import { Box } from '@mui/material';

// SVG from https://icons.getbootstrap.com/icons/arrow-right/
// Converted to component via https://react-svgr.com/playground/

const ArrowRight = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='currentColor'
      className='bi bi-arrow-right'
      viewBox='0 0 16 14'
      {...props}
    >
      <path
        fillRule='evenodd'
        d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z'
      />
    </svg>
  );
};
export default ArrowRight;
