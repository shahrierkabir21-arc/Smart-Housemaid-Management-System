import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { Eyebrow, ActionLink } from '@/components/ui';

const features = [
  { icon: 'shield-check' as const, title: 'Admin-reviewed listings', text: 'Profiles and job listings go through a moderation process before appearing in public directories.' },
  { icon: 'users' as const, title: 'Built for both sides', text: 'A simple experience for households looking for support and housemaids looking for opportunities.' },
  { icon: 'check-check' as const, title: 'Application updates', text: 'Follow each application in your dashboard and know when its review status changes.' },
];

export default function HomePage() {
  return <>
    <section className="container hero-zone"><div className="hero reveal">
      <div className="hero-content"><Eyebrow light>Better connections, better homes</Eyebrow><h1>Great homes begin with <em>great people.</em></h1><p className="hero-subtitle">A welcoming platform connecting households with domestic helpers, and talented housemaids with opportunities that fit their lives.</p>
      <div className="hero-buttons"><ActionLink href="/maids" variant="white">Find a housemaid</ActionLink><Link href="/jobs" className="btn btn-secondary">Explore jobs <Icon name="arrow-right" size={18}/></Link></div>
      <div className="hero-proof"><span><Icon name="check-circle" size={17}/> Admin-reviewed profiles</span><span><Icon name="check-circle" size={17}/> Simple applications</span></div></div>
      <div className="hero-art" aria-hidden="true"><div className="art-glow"/><div className="art-stars"><Icon name="sparkles" size={36}/></div><div className="art-portrait"><div className="art-bun"/><div className="art-hair"/><div className="art-face"/><div className="art-uniform"/></div><div className="art-floating top"><Icon name="shield-check" size={25}/><div>Reviewed profiles<p>For added peace of mind</p></div></div><div className="art-floating bottom"><Icon name="heart" size={25}/><div>Care that connects<p>Helping homes thrive</p></div></div></div>
    </div></section>
    <div className="container trust-strip"><span>Designed with care for</span><span className="trust-point"><Icon name="home" size={18}/> Families & households</span><span className="trust-point"><Icon name="users" size={18}/> Domestic professionals</span><span className="trust-point"><Icon name="shield-check" size={18}/> Admin-moderated recruitment</span></div>
    <section className="container section-pad"><div className="intro-heading"><Eyebrow>Why SmartHousemaid</Eyebrow><h2>More confidence in every connection.</h2><p>Finding the right fit should be straightforward. We bring applications, reviews, and profiles together in one easy-to-use place.</p></div><div className="feature-grid">{features.map(f => <article className="feature-card" key={f.title}><div className="feature-icon"><Icon name={f.icon} size={27}/></div><h3>{f.title}</h3><p>{f.text}</p></article>)}</div></section>
    <section className="steps-section section-pad"><div className="container"><div className="intro-heading"><Eyebrow>How it works</Eyebrow><h2>Three simple steps. A better way forward.</h2></div><div className="steps">{[
      ['01', 'Create your profile', 'Register as an employer or housemaid and set up your account in just a few steps.'],
      ['02', 'Explore opportunities', 'Browse approved jobs or housemaid profiles with clear descriptions and details.'],
      ['03', 'Make a connection', 'Send an application or post a job, then track its status from your dashboard.'],
    ].map(([index,title,text]) => <article className="step" key={index}><span className="step-index">{index}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="container section-pad"><div className="cta-banner"><div><Eyebrow light>Your next chapter begins here</Eyebrow><h2>Ready to find the right opportunity or helping hand?</h2><p>Join a thoughtful community built around meaningful connections.</p></div><ActionLink href="/register" variant="white">Create an account</ActionLink></div></section>
  </>;
}
