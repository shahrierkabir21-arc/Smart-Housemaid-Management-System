'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import axiosInstance from '@/utils/axiosInstance';
import { useAuth } from '@/components/AuthProvider';
import { ErrorMessage, Eyebrow, LoadingState, SuccessMessage } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import { formatTaka } from '@/lib/format';
import type { Job } from '@/types';

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { user } = useAuth();
  useEffect(() => {
    let active = true;
    axiosInstance.get<Job>(`/jobs/${params.id}`).then(({ data }) => { if (active) setJob(data); }).catch(() => { if (active) setError('This job is unavailable or no longer approved.'); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [params.id]);
  async function apply() {
    setSubmitting(true); setError('');
    try { await axiosInstance.post('/applications', { jobId: job?.id }); setMessage('Application submitted! You can track it in your dashboard.'); }
    catch (err: unknown) { setError(axios.isAxiosError(err) ? err.response?.data?.message || 'Could not submit your application.' : 'Could not submit your application.'); }
    finally { setSubmitting(false); }
  }
  if (loading) return <div className="container"><LoadingState label="Loading job details..."/></div>;
  if (!job) return <div className="container py-16"><ErrorMessage message={error}/><Link href="/jobs" className="btn btn-text mt-5"><Icon name="arrow-left" size={17}/>Back to jobs</Link></div>;
  return <div className="container"><div className="detail-wrap reveal"><Link href="/jobs" className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 mb-6"><Icon name="arrow-left" size={17}/>All jobs</Link>
    <article className="card-surface detail-panel"><div className="flex items-center flex-wrap justify-between gap-3"><Eyebrow>Approved opportunity</Eyebrow><span className="status-badge status-approved"><span className="status-dot"/>Admin approved</span></div><h1>{job.title}</h1>
      <div className="listing-meta !border-b-0 !border-t-0 !mt-0 !pt-2"><span><Icon name="map-pin" size={18}/>{job.location}</span><span><Icon name="wallet" size={18}/>{formatTaka(job.salary)} / month</span></div>
      <div className="detail-description"><h2 className="font-extrabold text-xl text-slate-800 mb-4">About this opportunity</h2>{job.description}</div>
      <div className="mt-6 space-y-3"><ErrorMessage message={error}/><SuccessMessage message={message}/></div>
      <div className="detail-actions"><span className="text-sm text-slate-500 inline-flex items-center gap-2"><Icon name="shield-check" size={19}/>Reviewed by an admin</span>{user?.role === 'housemaid' ? <button type="button" className="btn btn-primary" onClick={() => void apply()} disabled={submitting || !!message}>{submitting ? 'Sending...' : message ? 'Application sent' : 'Apply for this job'}<Icon name="arrow-right" size={18}/></button> : <Link href={user ? `/dashboard/${user.role}` : '/login'} className="btn btn-secondary">{user ? 'Go to dashboard' : 'Sign in to apply'}<Icon name="arrow-right" size={18}/></Link>}</div>
    </article>
  </div></div>;
}
