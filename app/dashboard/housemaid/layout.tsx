'use client';

import type { ReactNode } from 'react';
import { useAuth } from '@/components/AuthProvider';
import Notification from '@/components/Notification';

export default function HousemaidLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  return <>
    {user?.role === 'housemaid' && <div className="container pt-6"><Notification userId={user.id} /></div>}
    {children}
  </>;
}
