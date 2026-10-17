import Link from 'next/link';
import type { Maid } from '@/types';
import { getInitials } from '@/lib/format';
import { Icon } from '@/components/ui/Icon';

export default function MaidCard({ maid }: { maid: Maid }) {
  return <article className="listing-card reveal"><div className="listing-top"><div className="listing-avatar">{getInitials(maid.name)}</div><span className="status-badge status-approved"><span className="status-dot"/>Approved</span></div>
    <h2>{maid.name}</h2><p className="listing-text">{maid.description ? (maid.description.length > 115 ? `${maid.description.slice(0, 115)}…` : maid.description) : 'Profile details will be available soon.'}</p>
    <div className="listing-meta"><span><Icon name="shield-check" size={16}/>Admin reviewed</span><span><Icon name="user" size={16}/>Housemaid</span></div>
    <div className="listing-bottom"><span className="text-xs font-bold text-slate-500">View their experience</span><Link href={`/maids/${maid.id}`} className="btn btn-secondary btn-sm">View profile <Icon name="arrow-right" size={15}/></Link></div>
  </article>;
}
