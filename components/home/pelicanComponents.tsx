import { FC } from 'react';

export type ComponentKey = 'origin' | 'cache' | 'director' | 'registry';
export type ComponentGroup = 'Storage Services' | 'Central Services';

interface IconProps {
  size?: number;
  color?: string;
}

const OriginIcon: FC<IconProps> = ({ size = 24, color = '#1B43C9' }) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
    <ellipse cx='12' cy='5.5' rx='7.5' ry='2.8' stroke={color} strokeWidth='1.8' />
    <path
      d='M4.5 5.5v6c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8v-6'
      stroke={color}
      strokeWidth='1.8'
    />
    <path
      d='M4.5 11.5v6c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8v-6'
      stroke={color}
      strokeWidth='1.8'
    />
  </svg>
);

const CacheIcon: FC<IconProps> = ({ size = 24, color = '#17A2DC' }) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
    <path
      d='M12 3l8 4.2-8 4.2-8-4.2L12 3z'
      stroke={color}
      strokeWidth='1.8'
      strokeLinejoin='round'
    />
    <path d='M4 12.2l8 4.2 8-4.2' stroke={color} strokeWidth='1.8' strokeLinejoin='round' />
    <path d='M4 16.8l8 4.2 8-4.2' stroke={color} strokeWidth='1.8' strokeLinejoin='round' />
  </svg>
);

const RegistryIcon: FC<IconProps> = ({ size = 24, color = '#6A5AE0' }) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
    <path
      d='M12 3l7 2.5v5.2c0 4.3-2.9 7.6-7 9-4.1-1.4-7-4.7-7-9V5.5L12 3z'
      stroke={color}
      strokeWidth='1.8'
      strokeLinejoin='round'
    />
    <circle cx='12' cy='10.4' r='2' stroke={color} strokeWidth='1.8' />
    <path d='M12 12.4v3' stroke={color} strokeWidth='1.8' strokeLinecap='round' />
  </svg>
);

const DirectorIcon: FC<IconProps> = ({ size = 24, color = '#0E9F8E' }) => (
  <svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
    <circle cx='12' cy='12' r='8.5' stroke={color} strokeWidth='1.8' />
    <path
      d='M15.5 8.5l-2 5-5 2 2-5 5-2z'
      stroke={color}
      strokeWidth='1.8'
      strokeLinejoin='round'
    />
  </svg>
);

export interface PelicanComponent {
  key: ComponentKey;
  name: string;
  tag: string;
  group: ComponentGroup;
  /** Accent color — also used to color this component's nodes on the map. */
  color: string;
  /** Tinted background for the icon chip. */
  tint: string;
  Icon: FC<IconProps>;
  /** One-liner used on the suite cards. */
  short: string;
  /** Full description used in the "What each part does" detail cards. */
  long: string;
}

export const COMPONENTS: PelicanComponent[] = [
  {
    key: 'origin',
    name: 'Origin',
    tag: 'SOURCE',
    group: 'Storage Services',
    color: '#1B43C9',
    tint: '#EAEFFC',
    Icon: OriginIcon,
    short:
      'Sits in front of a data repository and makes its objects available to the federation.',
    long: 'An Origin is how data enters a federation. It sits in front of an existing repository — a POSIX filesystem, an S3 bucket, and more — and exports its objects without moving or copying them. At startup it registers its namespace and public key with the Registry, then advertises the prefixes it serves to the Director. From that moment on, the data it backs is reachable from anywhere in the federation.',
  },
  {
    key: 'cache',
    name: 'Cache',
    tag: 'EDGE',
    group: 'Storage Services',
    color: '#17A2DC',
    tint: '#E4F4FC',
    Icon: CacheIcon,
    short: "Stores objects close to where they're needed, on fast, high-bandwidth storage.",
    long: 'A Cache keeps copies of objects close to where researchers and compute live, on fast, high-bandwidth, low-latency storage. When a client requests an object the Director points it at the best Cache: if that Cache already holds the object it serves it instantly, and if not it fetches the object once from the Origin, keeps a copy, and streams it to the client. Popular data arrives quickly — and the Origin is never overwhelmed.',
  },
  {
    key: 'registry',
    name: 'Registry',
    tag: 'TRUST',
    group: 'Central Services',
    color: '#6A5AE0',
    tint: '#EDEAFC',
    Icon: RegistryIcon,
    short: 'Registers every namespace and distributes the keys that establish trust.',
    long: 'The Registry is the federation’s root of trust. It records every namespace prefix together with the public key that owns it, so the federation can verify that a server is genuinely authorized to serve — or write to — a given path. Origins and Caches register automatically when they start, and federation operators can require manual approval before a new server is allowed to join. Because authorization rests on time-sensitive tokens, the Registry quietly underpins secure access across every other component.',
  },
  {
    key: 'director',
    name: 'Director',
    tag: 'ROUTING',
    group: 'Central Services',
    color: '#0E9F8E',
    tint: '#E0F4F1',
    Icon: DirectorIcon,
    short: 'Knows where every object lives and routes each client to the best Cache.',
    long: "The Director is the federation’s traffic controller. It keeps a live map of every Origin and Cache and the namespaces they serve, and when a client asks for an object it returns a ranked list of Caches to try — ordered by availability, load, and proximity rather than geography alone. It also hosts the federation’s discovery endpoint, so clients and servers can locate the other central services. Notably, data never passes through the Director itself; it only does the routing.",
  },
];

export const COMPONENT_BY_KEY: Record<ComponentKey, PelicanComponent> =
  COMPONENTS.reduce(
    (acc, c) => {
      acc[c.key] = c;
      return acc;
    },
    {} as Record<ComponentKey, PelicanComponent>
  );
