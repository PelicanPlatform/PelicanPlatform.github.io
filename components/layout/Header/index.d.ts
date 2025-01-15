import { ReactNode } from 'react';
import { LinkProps } from 'next/link';

interface HeaderMenuProps {
  icon: ReactElement;
  value: string;
  anchorEl: HTMLElement | null;
  setAnchor: (x: HTMLElement | null) => void;
  menuItems: HeaderLinkItem[];
}

interface HeaderLinkItem extends LinkProps {
  icon: ReactElement;
  value: string;
  target?: '_self' | '_blank';
  type?: 'icon' | 'text';
}
