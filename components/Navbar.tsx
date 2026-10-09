'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Icon } from '@/components/ui/Icon';

const links = [{ href: '/', label: 'Home' }, { href: '/jobs', label: 'Find jobs' }, { href: '/maids', label: 'Find housemaids' }];

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);
  const dashboard = user ? `/dashboard/${user.role}` : '/login';

  return <header className="site-nav"><div className="container nav-inner">
    <Link href="/" className="brand" aria-label="SmartHousemaid home"><span className="brand-mark"><Icon name="home" size={23}/></span>Smart<span className="brand-dot">Housemaid</span></Link>
    <nav className="nav-links" aria-label="Main navigation">{links.map(link => <Link key={link.href} href={link.href} className={pathname === link.href ? 'active' : ''}>{link.label}</Link>)}</nav>
    <div className="nav-actions">
      {loading ? <span className="text-xs text-slate-400">Checking account...</span> : user ? <>
        <Link className="nav-profile" href="/profile"><span className="avatar-xs">{user.name.slice(0, 1).toUpperCase()}</span><span className="max-w-24 truncate">{user.name}</span></Link>
        <Link href={dashboard} className="btn btn-primary btn-sm">Dashboard <Icon name="arrow-up-right" size={16}/></Link>
        <button type="button" onClick={() => void logout()} className="icon-button" title="Sign out" aria-label="Sign out"><Icon name="log-out" size={19}/></button>
      </> : <><Link className="nav-signin" href="/login">Sign in</Link><Link className="btn btn-primary btn-sm" href="/register">Get started <Icon name="arrow-up-right" size={16}/></Link></>}
    </div>
    <button type="button" className="nav-mobile-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}><Icon name={open ? 'x' : 'menu'}/></button>
  </div>
  {open && <nav id="mobile-nav" aria-label="Mobile navigation" className="mobile-panel">{links.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}{user ? <><Link href="/profile">My profile</Link><Link href={dashboard}>Dashboard</Link><button type="button" onClick={() => void logout()}>Sign out</button></> : <><Link href="/login">Sign in</Link><Link href="/register">Create an account</Link></>}</nav>}
  </header>;
}
