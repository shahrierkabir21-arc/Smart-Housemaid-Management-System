'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import axiosInstance from '@/utils/axiosInstance';
import AuthAside from '@/components/AuthAside';
import { ErrorMessage } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import { registerSchema } from '@/utils/schemas';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'employer' as 'employer' | 'housemaid' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const [visible, setVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const change = (key: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: '' }));
  };
  async function submit(e: FormEvent) {
    e.preventDefault(); setErrors({}); setServerError('');
    const result = registerSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach(issue => { if (issue.path[0]) fieldErrors[String(issue.path[0])] = issue.message; });
      setErrors(fieldErrors); return;
    }
    setSubmitting(true);
    try { await axiosInstance.post('/auth/register', result.data); router.push('/login?registered=1'); }
    catch (err: unknown) { setServerError(axios.isAxiosError(err) ? err.response?.data?.message || 'Unable to register.' : 'Please try again.'); }
    finally { setSubmitting(false); }
  }
  return <div className="container"><div className="auth-shell reveal"><AuthAside register/><div className="auth-content"><span className="eyebrow">GET STARTED</span><h1 className="mt-4">Create your account</h1><p>Join in minutes. Choose how you’d like to use the platform.</p>
    <form onSubmit={submit} className="form-stack"><ErrorMessage message={serverError}/>
      <div><span className="input-label" id="role-label">I am joining as</span><div className="role-options" role="radiogroup" aria-labelledby="role-label">{(['employer', 'housemaid'] as const).map(role => <label className="role-option" data-active={form.role === role} key={role}><input type="radio" name="role" checked={form.role === role} onChange={() => change('role', role)}/><Icon name={role === 'employer' ? 'home' : 'heart'} size={19}/>{role === 'employer' ? 'Employer' : 'Housemaid'}</label>)}</div></div>
      <div><label htmlFor="signup-name" className="input-label">Full name</label><input id="signup-name" className="input" placeholder="Your full name" autoComplete="name" maxLength={100} value={form.name} onChange={e => change('name', e.target.value)} required/>{errors.name && <p className="text-red-600 text-xs mt-2">{errors.name}</p>}</div>
      <div><label htmlFor="signup-email" className="input-label">Email address</label><input id="signup-email" type="email" className="input" placeholder="you@example.com" autoComplete="email" value={form.email} onChange={e => change('email', e.target.value)} required/>{errors.email && <p className="text-red-600 text-xs mt-2">{errors.email}</p>}</div>
      <div><label htmlFor="signup-password" className="input-label">Create a password</label><div className="password-field"><input id="signup-password" className="input" type={visible ? 'text' : 'password'} placeholder="At least 8 characters" autoComplete="new-password" minLength={8} value={form.password} onChange={e => change('password', e.target.value)} required/><button type="button" aria-label={visible ? 'Hide password' : 'Show password'} onClick={() => setVisible(!visible)}><Icon name={visible ? 'eye-off' : 'eye'} size={19}/></button></div>{errors.password && <p className="text-red-600 text-xs mt-2">{errors.password}</p>}</div>
      <button type="submit" className="btn btn-primary w-full" disabled={submitting}>{submitting ? 'Creating account...' : 'Create my account'}<Icon name="arrow-right" size={18}/></button><p className="form-note text-center">By registering, you agree to use the platform responsibly.</p>
    </form><p className="auth-helper">Already have an account? <Link href="/login">Sign in</Link></p>
  </div></div></div>;
}
