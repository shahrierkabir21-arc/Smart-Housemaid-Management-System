'use client';

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '@/utils/axiosInstance';
import DashboardShell from '@/components/DashboardShell';
import { EmptyState, ErrorMessage, LoadingState, MetricCard, SectionTitle, StatusBadge, SuccessMessage } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import { formatTaka } from '@/lib/format';
import type { Application, Job, User } from '@/types';

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const load = useCallback(async () => {
    try {
      const [u, j, a] = await Promise.all([
        axiosInstance.get<User[]>('/users'), axiosInstance.get<Job[]>('/jobs/admin'), axiosInstance.get<Application[]>('/applications/admin'),
      ]);
      setUsers(u.data); setJobs(j.data); setApps(a.data); setError('');
    } catch { setError('Unable to load dashboard data. Please retry.'); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  async function act(request: () => Promise<unknown>, description: string, confirmation?: string) {
    if (confirmation && !window.confirm(confirmation)) return;
    setBusy(true); setError(''); setSuccess('');
    try { await request(); setSuccess(description); await load(); }
    catch (err: unknown) { setError(axios.isAxiosError(err) ? err.response?.data?.message || 'Action failed.' : 'Action failed.'); }
    finally { setBusy(false); }
  }

  const pendingJobs = jobs.filter(job => job.status === 'Pending');
  const pendingMaids = users.filter(user => user.role === 'housemaid' && user.status === 'Pending' && Boolean(user.description?.trim()));
  const pendingApps = apps.filter(app => app.status === 'Pending');
  return <DashboardShell role="admin" title="Admin overview" description="Review activity, manage your community, and keep the platform running smoothly.">
    <div className="metric-grid"><MetricCard label="Registered users" value={users.length} icon="users" hint="Non-admin members"/><MetricCard label="Jobs awaiting review" value={pendingJobs.length} icon="briefcase" hint="Action required"/><MetricCard label="Pending requests" value={pendingApps.length + pendingMaids.length} icon="clipboard" hint="Profiles & applications"/></div>
    <div className="space-y-4 mb-6"><ErrorMessage message={error}/><SuccessMessage message={success}/></div>
    {loading ? <LoadingState/> : <>
      <section className="dashboard-panel"><SectionTitle title="Job approvals" description="Review new opportunities before they go live." aside={<span className="status-badge status-pending">{pendingJobs.length} pending</span>}/>
        {pendingJobs.length ? <div className="review-list">{pendingJobs.map(job => <div className="review-row" key={job.id}><div><h3>{job.title}</h3><p><Icon name="map-pin" size={13} className="inline"/> {job.location} · {formatTaka(job.salary)}/month</p><p className="mt-1 max-w-xl">{job.description}</p></div><div className="row-actions"><button disabled={busy} type="button" onClick={() => void act(() => axiosInstance.patch(`/jobs/${job.id}/status`, { status: 'Approved' }), 'Job approved.')} className="btn btn-primary btn-sm"><Icon name="check" size={14}/>Approve</button><button disabled={busy} type="button" onClick={() => void act(() => axiosInstance.patch(`/jobs/${job.id}/status`, { status: 'Rejected' }), 'Job rejected.')} className="btn btn-danger btn-sm">Reject</button></div></div>)}</div> : <EmptyState icon="check-circle" title="All caught up" description="There are no pending jobs to review."/>}
      </section>
      <section className="dashboard-panel"><SectionTitle title="Housemaid approvals" description="Review submitted descriptions before publishing profiles." aside={<span className="status-badge status-pending">{pendingMaids.length} pending</span>}/>
        {pendingMaids.length ? <div className="review-list">{pendingMaids.map(maid => <div className="review-row" key={maid.id}><div><h3>{maid.name}</h3><p className="max-w-xl">{maid.description || 'No description submitted yet.'}</p></div><div className="row-actions"><button disabled={busy} type="button" className="btn btn-primary btn-sm" onClick={() => void act(() => axiosInstance.patch(`/users/${maid.id}/status`, { status: 'Approved' }), 'Profile approved.')}><Icon name="check" size={14}/>Approve</button><button disabled={busy} type="button" className="btn btn-danger btn-sm" onClick={() => void act(() => axiosInstance.patch(`/users/${maid.id}/status`, { status: 'Rejected' }), 'Profile rejected.')}>Reject</button></div></div>)}</div> : <EmptyState icon="check-circle" title="No profiles in review" description="New housemaid descriptions will appear here."/>}
      </section>
      <section className="dashboard-panel"><SectionTitle title="Job applications" description="See all applications and approve or reject requests." aside={<span className="text-xs font-bold text-slate-500">{apps.length} total</span>}/>
        {apps.length ? <div className="table-responsive"><table className="data-table"><thead><tr><th>Applicant</th><th>Job</th><th>Status</th><th>Action</th></tr></thead><tbody>{apps.map(app => <tr key={app.id}><td><strong>{app.maidName}</strong></td><td>{app.jobTitle}</td><td><StatusBadge status={app.status}/></td><td><div className="row-actions">{app.status === 'Pending' && <><button type="button" disabled={busy} className="btn btn-primary btn-sm" onClick={() => void act(() => axiosInstance.patch(`/applications/${app.id}/status`, { status: 'Approved' }), 'Application approved.')}>Approve</button><button type="button" disabled={busy} className="btn btn-danger btn-sm" onClick={() => void act(() => axiosInstance.patch(`/applications/${app.id}/status`, { status: 'Rejected' }), 'Application rejected.')}>Reject</button></>}<button type="button" disabled={busy} className="icon-button" aria-label={`Delete application ${app.id}`} onClick={() => void act(() => axiosInstance.delete(`/applications/${app.id}`), 'Application deleted.', 'Delete this application permanently?')}><Icon name="trash" size={16}/></button></div></td></tr>)}</tbody></table></div> : <EmptyState icon="clipboard" title="No applications yet" description="Applications will show up as soon as housemaids start applying."/>}
      </section>
      <section className="dashboard-panel"><SectionTitle title="Community members" description="Manage employer and housemaid accounts." aside={<span className="text-xs font-bold text-slate-500">{users.length} people</span>}/>
        {users.length ? <div className="table-responsive"><table className="data-table"><thead><tr><th>Member</th><th>Role</th><th>Profile status</th><th>Action</th></tr></thead><tbody>{users.map(member => <tr key={member.id}><td><strong>{member.name}</strong><div className="text-xs text-slate-400 mt-1">{member.email}</div></td><td className="capitalize">{member.role}</td><td>{member.role === 'housemaid' ? <StatusBadge status={member.status || 'Pending'}/> : '—'}</td><td><button type="button" disabled={busy} className="btn btn-danger btn-sm" onClick={() => void act(() => axiosInstance.delete(`/users/${member.id}`), 'User deleted.', `Permanently delete ${member.name} and associated records?`)}><Icon name="trash" size={15}/>Delete</button></td></tr>)}</tbody></table></div> : <EmptyState icon="users" title="No members" description="Registered members will appear here."/>}
      </section>
    </>}
  </DashboardShell>;
}
