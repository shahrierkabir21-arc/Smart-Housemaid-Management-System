'use client';

import Link from 'next/link';
import RequireAuth from '@/components/RequireAuth';
import { useAuth } from '@/components/AuthProvider';
import { Eyebrow } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import { getInitials } from '@/lib/format';

export default function ProfilePage() {
  return <RequireAuth><ProfileContent/></RequireAuth>;
}

function ProfileContent() {
  const { user } = useAuth();
  if (!user) return null;
  return <div className="container"><div className="detail-wrap reveal"><Link href={`/dashboard/${user.role}`} className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 mb-6"><Icon name="arrow-left" size={17}/>Back to dashboard</Link><div className="card-surface detail-panel">
    <Eyebrow>Your account</Eyebrow><div className="person-hero mt-6"><div className="person-avatar">{getInitials(user.name)}</div><div><h1 className="!my-1">{user.name}</h1><p className="text-sm text-slate-500 capitalize">{user.role} account</p></div></div>
    <div className="detail-description"><h2 className="text-lg font-extrabold text-slate-800 mb-5">Account information</h2><div className="space-y-4">
      <div className="flex flex-wrap justify-between gap-3 border-b border-slate-100 pb-4"><span className="text-slate-500 inline-flex gap-2 items-center"><Icon name="user" size={18}/>Full name</span><strong className="text-slate-800">{user.name}</strong></div>
      <div className="flex flex-wrap justify-between gap-3 border-b border-slate-100 pb-4"><span className="text-slate-500 inline-flex gap-2 items-center"><Icon name="mail" size={18}/>Email address</span><strong className="text-slate-800 break-all">{user.email}</strong></div>
      <div className="flex flex-wrap justify-between gap-3 border-b border-slate-100 pb-4"><span className="text-slate-500 inline-flex gap-2 items-center"><Icon name="shield" size={18}/>Account type</span><strong className="text-slate-800 capitalize">{user.role}</strong></div>
      {user.role === 'housemaid' && <div className="flex flex-wrap justify-between gap-3"><span className="text-slate-500 inline-flex gap-2 items-center"><Icon name="file-check" size={18}/>Profile status</span><strong className="text-slate-800">{user.status || 'Pending'}</strong></div>}
    </div></div><div className="panel-helper mt-7"><Icon name="lock" size={22}/><span>Your personal account details are visible only to you and authorized administrators.</span></div>
  </div></div></div>;
}
