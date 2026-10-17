'use client';

import { useEffect, useState, type FormEvent } from 'react';
import axios from 'axios';
import axiosInstance from '@/utils/axiosInstance';
import DashboardShell from '@/components/DashboardShell';
import { EmptyState, ErrorMessage, LoadingState, MetricCard, SectionTitle, StatusBadge, SuccessMessage } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import { jobSchema } from '@/utils/schemas';
import { formatTaka } from '@/lib/format';
import type { Application, Job } from '@/types';

const blankForm = { title: '', location: '', salary: '', description: '' };
export default function EmployerDashboard() {
  const [form, setForm] = useState(blankForm);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function load() {
    try { const [j, a] = await Promise.all([axiosInstance.get<Job[]>('/jobs/mine'), axiosInstance.get<Application[]>('/applications/employer')]); setJobs(j.data); setApps(a.data); setError(''); }
    catch { setError('Unable to load your dashboard. Please refresh to try again.'); }
    finally { setLoading(false); }
  }
  useEffect(() => { void load(); }, []);

  async function postJob(event: FormEvent) {
    event.preventDefault(); setError(''); setMessage('');
    const parsed = jobSchema.safeParse(form);
    if (!parsed.success) { setError(parsed.error.issues[0].message); return; }
    setSubmitting(true);
    try { await axiosInstance.post('/jobs', parsed.data); setForm(blankForm); setMessage('Your job has been submitted for admin review.'); await load(); }
    catch (err: unknown) { setError(axios.isAxiosError(err) ? err.response?.data?.message || 'Unable to submit your job.' : 'Unable to submit your job.'); }
    finally { setSubmitting(false); }
  }

  return <DashboardShell role="employer" title="Employer dashboard" description="Post opportunities, review your listings, and connect with applicants.">
    <div className="metric-grid"><MetricCard label="Jobs posted" value={jobs.length} icon="briefcase" hint="All your listings"/><MetricCard label="Jobs approved" value={jobs.filter(j => j.status === 'Approved').length} icon="check-circle" hint="Visible in the directory"/><MetricCard label="Approved applications" value={apps.filter(a => a.status === 'Approved').length} icon="users" hint="Successful applications"/></div>
    {loading ? <LoadingState/> : <><div className="space-y-4 mb-6"><ErrorMessage message={error}/><SuccessMessage message={message}/></div>
    <section className="dashboard-panel"><SectionTitle title="Post a new job" description="Tell housemaids what help you need. Your listing goes live after admin approval."/>
      <form onSubmit={postJob} className="form-stack"><div className="form-row"><div><label className="input-label" htmlFor="job-title">Job title</label><input id="job-title" className="input" required minLength={5} maxLength={120} placeholder="e.g. Full-time home helper" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}/></div><div><label className="input-label" htmlFor="job-location">Location</label><input id="job-location" className="input" required placeholder="e.g. Dhanmondi, Dhaka" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}/></div></div>
      <div><label className="input-label" htmlFor="job-salary">Monthly salary (BDT)</label><div className="input-icon-wrap"><Icon name="wallet" size={19}/><input id="job-salary" className="input" required min="1" max="10000000" type="number" placeholder="e.g. 12000" value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })}/></div></div>
      <div><label className="input-label" htmlFor="job-description">Job description</label><textarea id="job-description" className="textarea" required minLength={20} maxLength={4000} placeholder="Include duties, schedule, preferred skills, and any relevant details..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}/><p className="form-note mt-1">At least 20 characters. Keep details clear and specific.</p></div>
      <div className="flex flex-wrap justify-between gap-3 items-center"><span className="text-xs text-slate-500 inline-flex items-center gap-2"><Icon name="shield-check" size={17}/>Reviewed before publishing</span><button type="submit" disabled={submitting} className="btn btn-primary">{submitting ? 'Submitting...' : 'Submit job for review'}<Icon name="send" size={17}/></button></div></form>
    </section>
    <section className="dashboard-panel"><SectionTitle title="My job listings" description="Keep track of the moderation status of each listing."/>{jobs.length ? <div className="review-list">{jobs.map(job => <div className="review-row" key={job.id}><div><h3>{job.title}</h3><p><Icon name="map-pin" size={13} className="inline"/> {job.location} · {formatTaka(job.salary)} / month</p></div><StatusBadge status={job.status}/></div>)}</div> : <EmptyState icon="briefcase" title="No jobs posted yet" description="Your new job postings will appear here."/>}</section>
    <section className="dashboard-panel"><SectionTitle title="Approved applications" description="Applicants the admin has approved for your jobs."/>{apps.filter(a => a.status === 'Approved').length ? <div className="review-list">{apps.filter(a => a.status === 'Approved').map(app => <div className="review-row" key={app.id}><div><h3>{app.maidName}</h3><p>Applied for: {app.jobTitle}</p></div><StatusBadge status={app.status}/></div>)}</div> : <EmptyState icon="users" title="No approved applicants yet" description="Approved applications for your jobs will appear here."/>}</section>
    </>}
  </DashboardShell>;
}
