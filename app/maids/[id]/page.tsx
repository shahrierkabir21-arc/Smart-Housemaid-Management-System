'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axiosInstance from '@/utils/axiosInstance';
import { ErrorMessage, Eyebrow, LoadingState } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import { getInitials } from '@/lib/format';
import type { Maid } from '@/types';

export default function MaidProfilePage({ params }: { params: { id: string } }) {
  const [maid, setMaid] = useState<Maid | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    axiosInstance.get<Maid>(`/maids/${params.id}`).then(({ data }) => { if (active) setMaid(data); }).catch(() => { if (active) setError('This profile is unavailable or has not been approved.'); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [params.id]);
  if (loading) return <div className="container"><LoadingState label="Loading profile..."/></div>;
  if (!maid) return <div className="container py-16"><ErrorMessage message={error}/><Link href="/maids" className="btn btn-text mt-5"><Icon name="arrow-left" size={17}/>Back to profiles</Link></div>;
  return <div className="container"><div className="detail-wrap reveal"><Link href="/maids" className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 mb-6"><Icon name="arrow-left" size={17}/>All housemaids</Link>
    <article className="card-surface detail-panel"><div className="person-hero"><div className="person-avatar">{getInitials(maid.name)}</div><div><Eyebrow>Housemaid profile</Eyebrow><h1 className="!my-2">{maid.name}</h1><span className="status-badge status-approved"><span className="status-dot"/>Admin approved</span></div></div>
      <div className="detail-description"><h2 className="font-extrabold text-xl text-slate-800 mb-4">About {maid.name.split(' ')[0]}</h2>{maid.description || 'No description provided yet.'}</div>
      <div className="panel-helper mt-7"><Icon name="shield-check" size={23}/><span>This profile has been approved for public listing by an admin. Approval is not an identity or background verification.</span></div>
      <div className="detail-actions"><Link href="/maids" className="btn btn-outline"><Icon name="arrow-left" size={18}/>Browse more profiles</Link><Link href="/register" className="btn btn-primary">Get started <Icon name="arrow-right" size={18}/></Link></div>
    </article>
  </div></div>;
}
