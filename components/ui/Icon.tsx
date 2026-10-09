import type { ReactNode, SVGProps } from 'react';

export type IconName = 'home' | 'arrow-right' | 'arrow-up-right' | 'arrow-left' | 'briefcase' | 'users' | 'user' | 'shield' | 'check' | 'check-circle' | 'search' | 'map-pin' | 'wallet' | 'menu' | 'x' | 'log-out' | 'heart' | 'sparkles' | 'clock' | 'chevron-right' | 'star' | 'bell' | 'layout' | 'plus' | 'clipboard' | 'mail' | 'lock' | 'eye' | 'eye-off' | 'send' | 'filter' | 'calendar' | 'file-check' | 'settings' | 'quote' | 'alert-circle' | 'info' | 'shield-check' | 'check-check' | 'trash' | 'refresh' | 'loader' | 'phone';

const paths: Record<IconName, ReactNode> = {
  home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21v-8h6v8"/></>,
  'arrow-right': <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
  'arrow-up-right': <><path d="M7 17 17 7"/><path d="M7 7h10v10"/></>,
  'arrow-left': <><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></>,
  briefcase: <><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  'check-circle': <><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  'map-pin': <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  wallet: <><rect x="3" y="6" width="18" height="15" rx="2"/><path d="M3 10h18M6 6V4h12"/><path d="M16 15h2"/></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
  x: <><path d="M18 6 6 18M6 6l12 12"/></>,
  'log-out': <><path d="M10 17l5-5-5-5M15 12H3M12 3h6a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-6"/></>,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>,
  sparkles: <><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7zM19 17l.6 1.4L21 19l-1.4.6L19 21l-.6-1.4L17 19l1.4-.6z"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  'chevron-right': <path d="m9 18 6-6-6-6"/>,
  star: <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.3-6.2 3.3 1.2-6.8-5-4.9 6.9-1z"/>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 9h18c0-1-3-2-3-9M10 21h4"/></>,
  layout: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12"/></>,
  plus: <path d="M12 5v14M5 12h14"/>,
  clipboard: <><rect x="5" y="5" width="14" height="17" rx="2"/><path d="M9 5V3h6v2M9 12h6M9 16h6"/></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></>,
  eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>,
  'eye-off': <><path d="m3 3 18 18M10.6 5.1A12 12 0 0 1 12 5c6 0 10 7 10 7a17 17 0 0 1-3.5 4.3M6.1 6.5C3.5 8.4 2 12 2 12s4 7 10 7a10.7 10.7 0 0 0 3.4-.6"/></>,
  send: <><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></>,
  filter: <><path d="M4 6h16M7 12h10M10 18h4"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/></>,
  'file-check': <><path d="M13 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10z"/><path d="M13 3v7h7m-12 6 3 3 5-5"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></>,
  quote: <><path d="M10 11H4V6h7v7l-5 5M20 11h-6V6h7v7l-5 5"/></>,
  'alert-circle': <><circle cx="12" cy="12" r="10"/><path d="M12 7v6M12 17h.01"/></>,
  info: <><circle cx="12" cy="12" r="10"/><path d="M12 11v6M12 7h.01"/></>,
  'shield-check': <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m8 12 3 3 5-6"/></>,
  'check-check': <><path d="m2 12 4 4 6-6m-3 2 4 4 9-9"/></>,
  trash: <><path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15M10 10v7M14 10v7"/></>,
  refresh: <><path d="M20 7a9 9 0 0 0-15-2L3 8M3 3v5h5M4 17a9 9 0 0 0 15 2l2-3M21 21v-5h-5"/></>,
  loader: <path d="M21 12a9 9 0 1 1-9-9"/>,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19 19 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.7L7.5 9.8a16 16 0 0 0 6.7 6.7l1.4-1.4a2 2 0 0 1 1.7-.6l3 .5a2 2 0 0 1 1.7 1.9Z"/>,
};

export function Icon({ name, size = 20, ...props }: SVGProps<SVGSVGElement> & { name: IconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}
