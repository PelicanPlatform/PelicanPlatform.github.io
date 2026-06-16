'use client';

import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';
import { FC } from 'react';
import { Poppins } from 'next/font/google';
import LinkBehavior from 'next/link';

const poppins = Poppins({
  subsets: ['latin'],
  style: ['normal'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

// Exposed so non-theme components (e.g. the header nav) can match the
// heading typeface.
export const poppinsFontFamily = poppins.style.fontFamily;

let theme = createTheme({
  palette: {
    primary: {
      dark: '#002b54',
      main: '#0885ff',
      light: '#CFE4FF',
    },
  },
  typography: {
    h1: {
      fontFamily: poppins.style.fontFamily,
    },
    h2: {
      fontFamily: poppins.style.fontFamily,
    },
    h3: {
      fontFamily: poppins.style.fontFamily,
    },
    h4: {
      fontFamily: poppins.style.fontFamily,
    },
    h5: {
      fontFamily: poppins.style.fontFamily,
    },
    h6: {
      fontFamily: poppins.style.fontFamily,
    },
    body1: {
      fontSize: '1.2rem',
      paddingBottom: '1rem',
    },
    fontFamily: [
      'Helvetica Neue',
      'Helvetica',
      'Arial',
      'Lucida Grande',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiContainer: {
      defaultProps: {},
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      }
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior
      }
    },
    // Don't lock body scroll for popover-style menus — the scroll lock reserves
    // the scrollbar's width as right-side padding, which shows as a whitespace
    // gap when a header dropdown opens.
    MuiMenu: {
      defaultProps: {
        disableScrollLock: true,
      },
    },
    MuiPopover: {
      defaultProps: {
        disableScrollLock: true,
      },
    },
  },
});

theme = responsiveFontSizes(theme, { factor: 3 });

interface ThemeProviderClientProps {
  children: React.ReactNode;
}

export const ThemeProviderClient: FC<ThemeProviderClientProps> = ({
  children,
}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
