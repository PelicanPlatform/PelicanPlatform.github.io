'use client';
import React, { ReactNode, useState } from 'react';
import {
  Typography,
  ListItemButton,
  ListItemIcon,
  Collapse,
} from '@mui/material';
import Link, { LinkProps } from 'next/link';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface HeaderLinkProps extends LinkProps {
  value: string;
  icon: ReactNode;
  target?: string;
  onClick: () => void;
}

export const HeaderLink = ({
  value,
  href,
  icon,
  target,
  onClick,
}: HeaderLinkProps) => {
  return (
    <ListItemButton onClick={onClick}>
      <ListItemIcon
        sx={{ marginRight: '-0.8em', fontSize: '1.5em', marginLeft: '1em' }}
      >
        {icon}
      </ListItemIcon>
      <Typography variant='h6'>
        <Link href={href} target={target}>
          {value}
        </Link>
      </Typography>
    </ListItemButton>
  );
};

export const HeaderMainLink = ({
  value,
  href,
  icon,
  target,
  onClick,
}: HeaderLinkProps) => {
  return (
    <ListItemButton onClick={onClick}>
      <ListItemIcon sx={{ marginRight: '-0.8em', fontSize: '2em' }}>
        {icon}
      </ListItemIcon>
      <Typography variant='h5'>
        <Link href={href} target={target}>
          {value}
        </Link>
      </Typography>
    </ListItemButton>
  );
};

export const HeaderDropdown = ({
  value,
  children,
  icon,
}: {
  value: string;
  children: ReactNode;
  icon: ReactNode;
}) => {
  const [openState, setOpenState] = useState(false);
  const handleClick = () => {
    setOpenState(!openState);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon sx={{ marginRight: '-0.8em', fontSize: '2em' }}>
          {icon}
        </ListItemIcon>
        <Typography variant='h5'>{value}</Typography>
        {openState ? (
          <ExpandLess sx={{ marginLeft: '1em' }} />
        ) : (
          <ExpandMore sx={{ marginLeft: '0.5em' }} />
        )}
      </ListItemButton>
      <Collapse in={openState} timeout='auto' unmountOnExit>
        {children}
      </Collapse>
    </>
  );
};
