'use client';
import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Drawer,
  Divider,
  List,
  ListSubheader,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PelicanLogo from '../../../public/static/images/PelicanPlatformLogo_Icon.png';
import ExportedImage from 'next-image-export-optimizer';
import Link from 'next/link';
import {
  Home,
  GitHub,
  Description,
  Groups,
  Email,
  Help,
  Group,
  Info,
  Grade,
  Newspaper,
  Close,
  Terminal,
  CalendarMonth,
  FileDownload,
} from '@mui/icons-material';
import { HeaderDropdown, HeaderLink, HeaderMainLink } from './HeaderDropdown';
import { HeaderLinkItem, HeaderMenuProps } from './index.d';

export const BurgerMenu = ({
  menuItems,
}: {
  menuItems: (
    | Omit<HeaderMenuProps, 'setAnchor' | 'anchorEl'>
    | HeaderLinkItem
  )[];
}) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <Box ml={'auto'}>
      <IconButton aria-label='menu' onClick={handleDrawer}>
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor={'right'}
        open={openDrawer}
        onClose={handleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: '100%',
            '@media (min-width: 576px)': {
              width: '30rem',
            },
          },
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
        }}
      >
        <List
          sx={{ margin: '1rem' }}
          component='nav'
          aria-labelledby='nested-list-subheader'
          subheader={
            <ListSubheader component='div' id='nested-list-subheader'>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'start',
                }}
              >
                <ExportedImage
                  src={PelicanLogo}
                  alt={'Pelican Logo'}
                  height={48}
                />
                <Typography variant={'h5'} pl={1} my={'auto'}>
                  Pelican Platform
                </Typography>
                <IconButton
                  sx={{ ml: 'auto' }}
                  edge='start'
                  color='inherit'
                  aria-label='menu'
                  onClick={handleDrawer}
                >
                  <Close sx={{ fontSize: '2rem' }} />
                </IconButton>
              </Box>
            </ListSubheader>
          }
        >
          <Divider sx={{ my: 2 }} />
          {menuItems.map((item) => {
            if ('menuItems' in item) {
              // This is a dropdown item
              return (
                <HeaderDropdown
                  key={item.value}
                  value={item.value}
                  icon={item.icon}
                >
                  {item.menuItems.map((subItem) => (
                    <HeaderLink
                      key={item.value}
                      value={subItem.value}
                      href={subItem.href}
                      icon={subItem.icon}
                      target={subItem?.target}
                      onClick={handleDrawer}
                    />
                  ))}
                </HeaderDropdown>
              );
            } else {
              // This is a main link item
              return (
                <HeaderMainLink
                  key={item.value}
                  value={item.value}
                  href={item.href}
                  icon={item.icon}
                  target={item.target}
                  onClick={handleDrawer}
                />
              );
            }
          })}
        </List>
      </Drawer>
    </Box>
  );
};

export default BurgerMenu;
