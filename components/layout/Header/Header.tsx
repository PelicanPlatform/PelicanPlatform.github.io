'use client';

import ExportedImage from 'next-image-export-optimizer';
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import styles from '../../../app/page.module.css';
import Link, { LinkProps } from 'next/link';
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
} from '@mui/icons-material';
import GitHubIcon from '@mui/icons-material/GitHub';

import PelicanLogo from '../../../public/static/images/PelicanPlatformLogo_Icon.png';
import { HeaderLinkItem, HeaderMenuProps } from './index.d';
import { BurgerMenu, DesktopMenu, ImageIcon } from './index';

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
  // Scroll watcher for opacity
  let [scrolledTop, setScrolledTop] = useState(true);
  useEffect(() => {
    setScrolledTop(window.scrollY < 50);
    addEventListener('scroll', (event) => {
      setScrolledTop(window.scrollY < 50);
    });
  }, []);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <Box
      className={`${styles.header} ${scrolledTop ? styles.headerScrolled : ''}`}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem',
        position: 'fixed',
        zIndex: '1',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <Box display={'flex'} flexGrow={1}>
        <Link href={'/'}>
          <Box style={{ display: 'flex' }}>
            <ExportedImage src={PelicanLogo} alt={'Pelican Logo'} height={36} />
            <Typography variant={'h5'} pl={1} my={'auto'}>
              Pelican Platform
            </Typography>
          </Box>
        </Link>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }} flexGrow={1}>
          <BurgerMenu menuItems={MENU_ITEMS} />
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }} flexGrow={1}>
          <DesktopMenu menuItems={MENU_ITEMS} />
        </Box>
      </Box>
    </Box>
  );
};
