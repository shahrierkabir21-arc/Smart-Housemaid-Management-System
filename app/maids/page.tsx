'use client';

import { useEffect, useMemo, useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import MaidCard from '@/components/MaidCard';
import { EmptyState, ErrorMessage, LoadingState, PageHeader } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import type { Maid } from '@/types';

export default function MaidsPage() {
  const [maids, setMaids] = useState<Maid[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    axiosInstance.get<Maid[]>('/maids').then(({ data }) => { if (active) setMaids(data); }).catch(() => { if (active) setError('Unable to load housemaid profiles. Please try again later.'); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  const filtered = useMemo(() => maids.filter(maid => `${maid.name} ${maid.description || ''}`.toLowerCase().includes(query.toLowerCase().trim())), [maids, query]);
  return <div className="container pb-24"><PageHeader eyebrow="People who make a difference" title="Find your helping hand." description="Explore admin-approved housemaid profiles and discover people who could be a great fit for your home."/>
    <div className="directory-toolbar"><div className="search-wrap"><Icon name="search" size={21}/><input aria-label="Search housemaids" className="input" placeholder="Search by name, skills, or experience..." value={query} onChange={e => setQuery(e.target.value)}/></div><span className="text-xs text-slate-500 font-semibold px-3 inline-flex items-center gap-2"><Icon name="filter" size={17}/>Search profiles</span></div>
    <div className="directory-meta"><span>{loading ? 'Finding profiles...' : `${filtered.length} approved profile${filtered.length === 1 ? '' : 's'} found`}</span><span className="inline-flex items-center gap-2"><Icon name="shield-check" size={16}/>Admin-moderated</span></div>
    {loading ? <LoadingState/> : error ? <ErrorMessage message={error}/> : filtered.length ? <div className="directory-grid">{filtered.map(maid => <MaidCard key={maid.id} maid={maid}/>)}</div> : <EmptyState icon="users" title="No profiles found" description={query ? 'Try a different name or skill to find matching profiles.' : 'There are no approved profiles available right now.'}/>}
  </div>;
}
