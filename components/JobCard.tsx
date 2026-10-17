import Link from 'next/link';
import type { Job } from '@/types';
import { formatTaka } from '@/lib/format';
import { Icon } from '@/components/ui/Icon';

export default function JobCard({ job }: { job: Job }) {
  return <article className="listing-card reveal"><div className="listing-top"><div className="listing-avatar"><Icon name="briefcase" size={25}/></div><span className="status-badge status-approved"><span className="status-dot"/>Approved</span></div>
    <h2>{job.title}</h2><p className="listing-text">{job.description.length > 115 ? `${job.description.slice(0, 115)}…` : job.description}</p>
    <div className="listing-meta"><span><Icon name="map-pin" size={16}/>{job.location}</span><span><Icon name="shield-check" size={16}/>Admin reviewed</span></div>
    <div className="listing-bottom"><div className="listing-salary">{formatTaka(job.salary)}<small> / month</small></div><Link href={`/jobs/${job.id}`} className="btn btn-secondary btn-sm">View job <Icon name="arrow-right" size={15}/></Link></div>
  </article>;
}
