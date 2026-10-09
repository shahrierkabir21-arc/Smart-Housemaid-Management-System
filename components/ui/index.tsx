import Link from 'next/link';
import type { ReactNode } from 'react';
import { Icon, IconName } from './Icon';
import type { ReviewStatus } from '@/types';

export function StatusBadge({ status }: { status: ReviewStatus | string }) {
  const style = status === 'Approved' ? 'status-approved' : status === 'Rejected' ? 'status-rejected' : 'status-pending';
  return <span className={`status-badge ${style}`}><span className="status-dot" />{status}</span>;
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <span className={`eyebrow ${light ? 'eyebrow-light' : ''}`}><Icon name="sparkles" size={15} />{children}</span>;
}

export function PageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: ReactNode }) {
  return <header className="page-heading reveal"><div><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1>{description && <p>{description}</p>}</div>{action && <div className="page-heading-action">{action}</div>}</header>;
}

export function EmptyState({ icon = 'search', title, description, action }: { icon?: IconName; title: string; description: string; action?: ReactNode }) {
  return <div className="empty-state"><div className="empty-icon"><Icon name={icon} size={28}/></div><h3>{title}</h3><p>{description}</p>{action}</div>;
}

export function ErrorMessage({ message }: { message: string }) {
  if (!message) return null;
  return <div role="alert" className="form-message form-message-error"><Icon name="alert-circle" size={18}/><span>{message}</span></div>;
}

export function SuccessMessage({ message }: { message: string }) {
  if (!message) return null;
  return <div role="status" className="form-message form-message-success"><Icon name="check-circle" size={18}/><span>{message}</span></div>;
}

export function LoadingState({ label = 'Loading content...' }: { label?: string }) {
  return <div className="loading-state" role="status"><span className="loading-spinner" />{label}</div>;
}

export function MetricCard({ label, value, icon, hint }: { label: string; value: number | string; icon: IconName; hint: string }) {
  return <div className="metric-card"><div className="metric-top"><span className="metric-icon"><Icon name={icon}/></span><Icon name="arrow-up-right" size={17} className="text-slate-400"/></div><div className="metric-value">{value}</div><div className="metric-label">{label}</div><div className="metric-hint">{hint}</div></div>;
}

export function SectionTitle({ title, description, aside }: { title: string; description?: string; aside?: ReactNode }) {
  return <div className="section-title"><div><h2>{title}</h2>{description && <p>{description}</p>}</div>{aside}</div>;
}

export function ActionLink({ href, children, variant = 'primary' }: { href: string; children: ReactNode; variant?: 'primary' | 'secondary' | 'white' | 'text' }) {
  return <Link className={`btn btn-${variant}`} href={href}>{children}<Icon name="arrow-right" size={18}/></Link>;
}
