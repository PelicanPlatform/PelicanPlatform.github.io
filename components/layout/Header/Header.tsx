'use client';

import ExportedImage from 'next-image-export-optimizer';
import React from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import {
  Home,
  Groups,
  Help,
  Email,
  Grade,
  Newspaper,
  Terminal,
  CalendarMonth,
  FileDownload,
  Description,
  AlternateEmail,
  Security,
} from '@mui/icons-material';
import GitHubIcon from '@mui/icons-material/GitHub';

import PelicanLogo from '../../../public/static/images/PelicanPlatformLogo_Icon.png';
import { HeaderLinkItem, HeaderMenuProps } from './index.d';
import { BurgerMenu, DesktopMenu, DesktopActions, ImageIcon } from './index';
import { tokens } from '@/components/ui/Section';

const MENU_ITEMS: (
  | Omit<HeaderMenuProps, 'setAnchor' | 'anchorEl'>
  | HeaderLinkItem
)[] = [
  {
    value: 'About',
    icon: <Help />,
    menuItems: [
      {
        value: "What's Pelican?",
        href: '/about',
        icon: <Help />,
      },
      {
        value: 'Team',
        href: '/team',
        icon: <Groups />,
      },
      {
        value: 'Contact',
        href: '/contact',
        icon: <Email />,
      },
    ],
  },
  {
    value: 'Software',
    icon: <Terminal />,
    menuItems: [
      {
        value: 'Download and Install',
        href: 'https://docs.pelicanplatform.org/install',
        icon: <FileDownload />,        
      },
      {
        value: 'Release Plan',
        href: '/release-plan',
        icon: <CalendarMonth />,
      },
      {
        value: 'Releases',
        href: '/releases',
        icon: <FileDownload />,
      },
      {
        value: 'Security Advisories',
        href: '/security',
        icon: <Security />,
      },
      {
        value: 'Documentation',
        href: 'https://docs.pelicanplatform.org/',
        target: '_blank',
        icon: <Description />,
      },
    ],
  },
  {
    value: 'Community',
    icon: <Groups />,
    menuItems: [
      {
        value: 'User Stories',
        href: '/user-stories',
        icon: <Grade />,
      },
      {
        value: 'News',
        href: '/news',
        icon: <Newspaper />,
      },
      {
        value: 'Presentations',
        href: '/presentations',
        icon: <Grade />,
      },
    ],
  },
  {
    value: 'OSDF',
    href: 'https://osg-htc.org/services/osdf',
    icon: <ImageIcon src={'/static/images/osg-logo.png'} alt='OSG Logo' />,
    type: 'text',
  },
  {
    value: 'Contact',
    href: '/contact',
    icon: <AlternateEmail />,
    type: 'icon',
  },
  {
    value: 'Download',
    href: 'https://docs.pelicanplatform.org/install',
    target: '_blank',
    icon: <FileDownload />,
    type: 'icon',   
  },
  {
    value: 'Documentation',
    href: 'https://docs.pelicanplatform.org/',
    target: '_blank',
    icon: <Description />,
    type: 'icon',
  },
  {
    value: 'GitHub',
    href: 'https://github.com/PelicanPlatform',
    target: '_blank',
    icon: <GitHubIcon />,
    type: 'icon',
  },
];

export const Header = () => {
  return (
    <Box
      component='header'
      sx={{
        position: 'relative',
        zIndex: 10,
        backgroundColor: '#ffffff',
        borderBottom: `1px solid ${tokens.sectionLine}`,
      }}
    >
      <Box
        sx={{
          maxWidth: 1320,
          mx: 'auto',
          px: { xs: 2, md: 4 },
          py: 1.25,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* Left: logo */}
        <Box sx={{ flex: 1, display: 'flex', minWidth: 0 }}>
          <Link
            href={'/'}
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <ExportedImage src={PelicanLogo} alt={'Pelican Logo'} height={34} />
            <Typography
              variant='h5'
              sx={{
                pl: 1,
                fontWeight: 700,
                fontSize: '1.2rem',
                color: tokens.ink,
                whiteSpace: 'nowrap',
              }}
            >
              Pelican Platform
            </Typography>
          </Link>
        </Box>

        {/* Center: nav */}
        <DesktopMenu menuItems={MENU_ITEMS} />

        {/* Right: actions + mobile menu */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <DesktopActions menuItems={MENU_ITEMS} />
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <BurgerMenu menuItems={MENU_ITEMS} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
