import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

export default function Footer() {
  return <footer className="site-footer"><div className="container"><div className="footer-top">
    <div><Link href="/" className="brand footer-brand"><span className="brand-mark"><Icon name="home" size={23}/></span>SmartHousemaid</Link><p className="footer-description">A thoughtful place to connect households and helpers through admin-reviewed profiles, transparent job listings, and simple applications.</p></div>
    <div className="footer-links"><div><h4>Explore</h4><Link href="/jobs">Available jobs</Link><Link href="/maids">Housemaid profiles</Link></div><div><h4>Your account</h4><Link href="/login">Sign in</Link><Link href="/register">Register</Link><Link href="/profile">Profile</Link></div></div>
  </div><div className="footer-bottom"><span>© {new Date().getFullYear()} SmartHousemaid. All rights reserved.</span><span>Made to make finding help simpler.</span></div></div></footer>;
}
