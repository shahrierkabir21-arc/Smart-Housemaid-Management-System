import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/components/AuthProvider';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'SmartHousemaid | Care starts with a connection', template: '%s | SmartHousemaid' },
  description: 'Discover admin-reviewed household jobs and housemaid profiles on SmartHousemaid.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><AuthProvider><div className="site-shell"><Navbar/><main id="main-content" className="site-main">{children}</main><Footer/></div></AuthProvider></body></html>;
}
