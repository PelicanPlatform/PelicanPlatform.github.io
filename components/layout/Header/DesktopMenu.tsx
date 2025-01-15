'use client';

import React, { useState, ReactNode, useRef, ComponentType } from 'react';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  IconProps,
} from '@mui/material';
import Link, { LinkProps } from 'next/link';
import { Typography } from '@mui/material';
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';

import type { HeaderLinkItem, HeaderMenuProps } from './index.d';

export const DesktopMenu = ({
  menuItems,
}: {
  menuItems: (
    | Omit<HeaderMenuProps, 'setAnchor' | 'anchorEl'>
    | HeaderLinkItem
  )[];
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <>
      <Box display={'flex'} mb={0.5}>
        {menuItems
          .filter((x) => ('type' in x ? x?.type != 'icon' : true))
          .map((item) => (
            <HeaderItem
              key={item.value}
              {...item}
              anchorEl={anchorEl}
              setAnchor={(element) => {
                setAnchorEl((anchorEl) => {
                  if (element == null) {
                    return element;
                  }
                  if (anchorEl?.id == element.id) {
                    return null;
                  }
                  return element;
                });
              }}
            />
          ))}
      </Box>
      <Box marginLeft={'auto'}>
        <Grid container spacing={1}>
          {menuItems
            .filter((x) => ('type' in x ? x?.type == 'icon' : false))
            .map((item) => (
              <Grid key={item.value} item>
                <HeaderIconLink {...(item as HeaderLinkItem)} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
};

const HeaderItem = ({ ...props }: HeaderMenuProps | HeaderLinkItem) => {
  if ('menuItems' in props) {
    return <HeaderMenu {...props} />;
  } else if (props.type == 'text') {
    return <HeaderLink {...props} />;
  } else {
    return <HeaderIconLink {...props} />;
  }
};

const HeaderMenu = ({
  icon,
  value,
  anchorEl,
  setAnchor,
  menuItems,
}: HeaderMenuProps) => {
  const anchorId = `${value}-button`;
  const open = anchorEl?.id == anchorId;
  const anchorRef = useRef<HTMLAnchorElement>(null);

  return (
    <>
      <Link
        href={'#'}
        style={{ display: 'flex' }}
        ref={anchorRef}
        id={anchorId}
        aria-controls={open ? `${value}-menu` : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={(e) => setAnchor(anchorRef.current)}
      >
        <Typography
          id={`${value}-header`}
          display={'flex'}
          my={'auto'}
          pl={2}
          lineHeight={1}
          variant={'h6'}
        >
          <Box display={'inline'} my={'auto'}>
            {value}
          </Box>
          {open ? <ArrowDropUp /> : <ArrowDropDown />}
        </Typography>
      </Link>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchor(null)}>
        {menuItems.map((item) => (
          <Link key={item.value} {...item}>
            <MenuItem onClick={(e) => setAnchor(anchorRef.current)}>
              {item.value}
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </>
  );
};

const HeaderLink = ({ ...props }: HeaderLinkItem) => {
  return (
    <Link {...props} style={{ display: 'flex' }}>
      <Typography my={'auto'} pl={2} lineHeight={1} variant={'h6'}>
        {props.value}
      </Typography>
    </Link>
  );
};

const HeaderIconLink = ({ ...props }: HeaderLinkItem) => {
  return (
    <Link href={props.href} target={props.target}>
      <Tooltip title={props.value}>
        <Box
          sx={{
            ':hover': {
              transform: 'scale(1.15)',
              transition: 'transform 0.3s',
            },
            marginTop: '2px',
          }}
        >
          {React.cloneElement(props.icon, {
            fontSize: 'large',
            sx: {
              ':hover': {
                transform: 'scale(1.15)',
                transition: 'transform 0.3s',
              },
              marginTop: '2px',
            },
          })}
        </Box>
      </Tooltip>
    </Link>
  );
};
