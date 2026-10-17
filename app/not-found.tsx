import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

export default function NotFound() {
  return <section className="container" style={{ maxWidth: 650, paddingBlock: 110, textAlign: 'center' }}><span className="eyebrow">PAGE NOT FOUND</span><h1 className="text-6xl font-extrabold tracking-tight my-5">404</h1><p className="text-slate-500 mb-8">This page may have moved. Let’s get you back to a familiar place.</p><Link href="/" className="btn btn-primary"><Icon name="arrow-left" size={17}/> Back to home</Link></section>;
}
