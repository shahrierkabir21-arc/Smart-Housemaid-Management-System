'use client';

import { useEffect, useMemo, useState } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import JobCard from '@/components/JobCard';
import { EmptyState, ErrorMessage, LoadingState, PageHeader } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import type { Job } from '@/types';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    axiosInstance.get<Job[]>('/jobs').then(({ data }) => { if (active) setJobs(data); }).catch(() => { if (active) setError('Unable to load jobs. Please reload to try again.'); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  const filtered = useMemo(() => jobs.filter(job => `${job.title} ${job.location} ${job.description}`.toLowerCase().includes(query.toLowerCase().trim())).sort((a, b) => sort === 'salary-high' ? Number(b.salary) - Number(a.salary) : sort === 'salary-low' ? Number(a.salary) - Number(b.salary) : b.id - a.id), [jobs, query, sort]);
  return <div className="container pb-24"><PageHeader eyebrow="Explore opportunities" title="Find work that fits your life." description="Browse admin-approved household opportunities and discover your next step."/>
    <div className="directory-toolbar"><div className="search-wrap"><Icon name="search" size={21}/><input aria-label="Search jobs" className="input" placeholder="Search by role, location, or keyword..." value={query} onChange={e => setQuery(e.target.value)}/></div><select className="select" style={{ width: 'auto', minWidth: 175 }} value={sort} aria-label="Sort jobs" onChange={e => setSort(e.target.value)}><option value="newest">Newest first</option><option value="salary-high">Highest salary</option><option value="salary-low">Lowest salary</option></select></div>
    <div className="directory-meta"><span>{loading ? 'Finding opportunities...' : `${filtered.length} approved job${filtered.length === 1 ? '' : 's'} found`}</span><span className="inline-flex items-center gap-2"><Icon name="shield-check" size={16}/>Admin-moderated</span></div>
    {loading ? <LoadingState/> : error ? <ErrorMessage message={error}/> : filtered.length ? <div className="directory-grid">{filtered.map(job => <JobCard key={job.id} job={job}/>)}</div> : <EmptyState icon="briefcase" title="No jobs found" description={query ? 'Try another location or a different search term.' : 'There are no approved jobs available right now. Check back later.'}/>}
  </div>;
}
