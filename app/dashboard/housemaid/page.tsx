'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import axios from 'axios';
import axiosInstance from '@/utils/axiosInstance';
import { useAuth } from '@/components/AuthProvider';
import DashboardShell from '@/components/DashboardShell';
import { EmptyState, ErrorMessage, LoadingState, MetricCard, SectionTitle, StatusBadge, SuccessMessage } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import { descriptionSchema } from '@/utils/schemas';
import type { Application } from '@/types';

export default function HousemaidDashboard() {
  const { user, refresh } = useAuth();
  const [description, setDescription] = useState('');
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  useEffect(() => { if (user) setDescription(user.description || ''); }, [user]);
  useEffect(() => {
    let active = true;
    axiosInstance.get<Application[]>('/applications/my-applications').then(({ data }) => { if (active) setApps(data); }).catch(() => { if (active) setError('Unable to fetch your applications.'); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  async function saveDescription(event: FormEvent) {
    event.preventDefault(); setMessage(''); setError('');
    const parsed = descriptionSchema.safeParse({ description });
    if (!parsed.success) { setError(parsed.error.issues[0].message); return; }
    if (!user) return;
    setSubmitting(true);
    try { await axiosInstance.put(`/users/${user.id}`, parsed.data); await refresh(); setMessage('Your profile has been sent for admin review.'); }
    catch (err: unknown) { setError(axios.isAxiosError(err) ? err.response?.data?.message || 'Could not update profile.' : 'Could not update profile.'); }
    finally { setSubmitting(false); }
  }

  return <DashboardShell role="housemaid" title="Housemaid dashboard" description="Build your profile, discover opportunities, and follow every application.">
    <div className="metric-grid"><MetricCard label="My applications" value={apps.length} icon="clipboard" hint="Requests submitted"/><MetricCard label="Approved applications" value={apps.filter(a => a.status === 'Approved').length} icon="check-circle" hint="Accepted requests"/><MetricCard label="Pending applications" value={apps.filter(a => a.status === 'Pending').length} icon="clock" hint="Awaiting review"/></div>
    <div className="space-y-4 mb-6"><ErrorMessage message={error}/><SuccessMessage message={message}/></div>
    <section className="dashboard-panel"><SectionTitle title="Your public profile" description="Describe your skills and experience to help employers learn about you." aside={user?.status && <StatusBadge status={user.status}/>}/>
      <form onSubmit={saveDescription} className="form-stack"><div><label className="input-label" htmlFor="maid-description">About me</label><textarea id="maid-description" className="textarea" minLength={20} maxLength={2000} required placeholder="Describe your skills, previous experience, availability, and the kind of work you are seeking..." value={description} onChange={e => setDescription(e.target.value)}/><p className="form-note mt-1">After each update, your profile is submitted to admin for approval.</p></div><div className="flex items-center justify-between flex-wrap gap-3"><span className="text-xs font-semibold text-slate-500 inline-flex items-center gap-2"><Icon name="shield-check" size={17}/>Visible once approved</span><button type="submit" disabled={submitting} className="btn btn-primary">{submitting ? 'Submitting...' : 'Save my description'}<Icon name="arrow-right" size={17}/></button></div></form>
    </section>
    <section className="dashboard-panel"><SectionTitle title="My applications" description="Stay up to date with where each application stands." aside={<Link className="btn btn-secondary btn-sm" href="/jobs">Browse jobs <Icon name="arrow-right" size={16}/></Link>}/>
      {loading ? <LoadingState/> : apps.length ? <div className="review-list">{apps.map(app => <div className="review-row" key={app.id}><div><h3>{app.jobTitle}</h3><p>Job application #{app.id}</p></div><StatusBadge status={app.status}/></div>)}</div> : <EmptyState icon="clipboard" title="No applications yet" description="Start exploring approved jobs and apply for an opportunity that interests you." action={<Link className="btn btn-primary" href="/jobs">Explore jobs <Icon name="arrow-right" size={17}/></Link>}/>}
    </section>
  </DashboardShell>;
}
