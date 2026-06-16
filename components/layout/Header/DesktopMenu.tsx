'use client';

import * as React from 'react';
import { Box, Button, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import Link from 'next/link';
import { ArrowDropDown } from '@mui/icons-material';

import { tokens } from '@/components/ui/Section';
import { poppinsFontFamily } from '@/public/theme';
import type { HeaderLinkItem, HeaderMenuProps } from './index.d';

type NavItem = Omit<HeaderMenuProps, 'setAnchor' | 'anchorEl'> | HeaderLinkItem;

const navButtonSx = (active: boolean) => ({
  fontFamily: poppinsFontFamily,
  textTransform: 'none' as const,
  fontSize: '1.1rem',
  fontWeight: 500,
  color: active ? 'primary.main' : '#42537A',
  px: 2,
  py: 0.9,
  borderRadius: '10px',
  minWidth: 0,
  '&:hover': { backgroundColor: '#EEF3FB', color: tokens.ink },
});

const menuPaperSx = {
  mt: 1,
  borderRadius: '12px',
  border: `1px solid ${tokens.cardLine}`,
  boxShadow: '0 14px 34px rgba(13,30,80,0.14)',
  minWidth: 220,
  '& .MuiList-root': { py: 0.75 },
};

const menuItemSx = {
  fontFamily: poppinsFontFamily,
  py: 1,
  px: 2,
  fontSize: '1rem',
  fontWeight: 500,
  color: tokens.ink,
  '&:hover': { backgroundColor: '#F0F4FB' },
};

/** Centered nav: dropdowns and top-level links rendered as buttons. */
export const DesktopMenu = ({ menuItems }: { menuItems: NavItem[] }) => {
  const navItems = menuItems.filter((x) => !('type' in x && x.type === 'icon'));

  return (
    <Box
      component='nav'
      sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}
    >
      {navItems.map((item) =>
        'menuItems' in item ? (
          <NavDropdown key={item.value} item={item} />
        ) : (
          <Button
            key={item.value}
            component='a'
            href={item.href as string}
            target={item.target}
            sx={navButtonSx(false)}
          >
            {item.value}
          </Button>
        )
      )}
    </Box>
  );
};

const NavDropdown = ({
  item,
}: {
  item: Omit<HeaderMenuProps, 'setAnchor' | 'anchorEl'>;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const close = () => setAnchorEl(null);

  return (
    <>
      <Button
        onClick={(e) => setAnchorEl(e.currentTarget)}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        endIcon={
          <ArrowDropDown
            sx={{
              transition: 'transform .2s ease',
              transform: open ? 'rotate(180deg)' : 'none',
            }}
          />
        }
        sx={navButtonSx(open)}
      >
        {item.value}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={close}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        slotProps={{ paper: { sx: menuPaperSx } }}
      >
        {item.menuItems.map((sub) => (
          <MenuItem
            key={sub.value}
            component={Link}
            href={sub.href}
            target={sub.target}
            onClick={close}
            sx={menuItemSx}
          >
            {sub.value}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

/** Right-side icon actions (Contact, Download, Docs, GitHub, …). */
export const DesktopActions = ({ menuItems }: { menuItems: NavItem[] }) => {
  const iconItems = menuItems.filter(
    (x): x is HeaderLinkItem => 'type' in x && x.type === 'icon'
  );

  return (
    <Box
      sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.25 }}
    >
      {iconItems.map((item) => (
        <Tooltip key={item.value} title={item.value}>
          <IconButton
            component={Link}
            href={item.href}
            target={item.target}
            aria-label={item.value}
            sx={{
              color: '#42537A',
              borderRadius: '10px',
              '&:hover': { backgroundColor: '#EEF3FB', color: 'primary.main' },
            }}
          >
            {React.cloneElement(item.icon, { fontSize: 'small' })}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
};
