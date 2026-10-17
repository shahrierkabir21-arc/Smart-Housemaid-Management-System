'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import RequireAuth from '@/components/RequireAuth';
import { useAuth } from '@/components/AuthProvider';
import { Icon, type IconName } from '@/components/ui/Icon';
import type { Role } from '@/types';

export default function DashboardShell({ role, title, description, children }: { role: Role; title: string; description: string; children: ReactNode }) {
  return <RequireAuth roles={[role]}><DashboardContent role={role} title={title} description={description}>{children}</DashboardContent></RequireAuth>;
}

function DashboardContent({ role, title, description, children }: { role: Role; title: string; description: string; children: ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const items: { href: string; label: string; icon: IconName }[] = [
    { href: `/dashboard/${role}`, label: 'Overview', icon: 'layout' },
    { href: role === 'housemaid' ? '/jobs' : '/maids', label: role === 'housemaid' ? 'Find jobs' : 'Find housemaids', icon: role === 'housemaid' ? 'briefcase' : 'users' },
    { href: '/profile', label: 'My profile', icon: 'user' },
  ];
  return <div className="container dashboard-container reveal"><aside className="dashboard-sidebar"><div className="sidebar-label">Workspace</div><nav aria-label="Dashboard navigation">{items.map(item => <Link key={item.href} href={item.href} className={`side-link ${pathname === item.href ? 'active' : ''}`}><Icon name={item.icon} size={18}/>{item.label}</Link>)}</nav><div className="side-user"><span className="avatar-xs">{user?.name?.[0]?.toUpperCase() || 'U'}</span><div><strong>{user?.name}</strong><small>{user?.role}</small></div></div></aside>
    <div className="dashboard-body"><header className="dashboard-greeting"><span className="eyebrow"><Icon name="sparkles" size={15}/> Your workspace</span><h1 className="mt-3">{title}</h1><p>{description}</p></header>{children}</div>
  </div>;
}
