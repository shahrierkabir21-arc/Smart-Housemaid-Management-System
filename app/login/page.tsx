'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import axiosInstance from '@/utils/axiosInstance';
import { useAuth } from '@/components/AuthProvider';
import AuthAside from '@/components/AuthAside';
import { ErrorMessage } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';
import type { User } from '@/types';

export default function LoginPage() {
  const router = useRouter();
  const { refresh } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault(); setError(''); setSubmitting(true);
    try {
      const response = await axiosInstance.post<{ user: User }>('/auth/login', { email, password });
      await refresh();
      router.push(`/dashboard/${response.data.user.role}`);
      router.refresh();
    } catch (err: unknown) {
      setError(axios.isAxiosError(err) ? err.response?.data?.message || 'Sign in failed. Please try again.' : 'Unable to sign in right now.');
    } finally { setSubmitting(false); }
  }

  return <div className="container"><div className="auth-shell reveal"><AuthAside/><div className="auth-content"><span className="eyebrow">YOUR ACCOUNT</span><h1 className="mt-4">Welcome back!</h1><p>Sign in to continue your SmartHousemaid journey.</p>
    <form onSubmit={submit} className="form-stack"><ErrorMessage message={error}/>
      <div><label className="input-label" htmlFor="login-email">Email address</label><div className="input-icon-wrap"><Icon name="mail" size={19}/><input id="login-email" type="email" className="input" placeholder="you@example.com" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)}/></div></div>
      <div><label className="input-label" htmlFor="login-password">Password</label><div className="password-field"><input id="login-password" className="input" type={showPassword ? 'text' : 'password'} minLength={1} placeholder="Enter your password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)}/><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}><Icon name={showPassword ? 'eye-off' : 'eye'} size={19}/></button></div></div>
      <button type="submit" className="btn btn-primary w-full" disabled={submitting}>{submitting ? 'Signing in...' : 'Sign in to dashboard'}<Icon name={submitting ? 'loader' : 'arrow-right'} size={18}/></button>
    </form><p className="auth-helper">New to SmartHousemaid? <Link href="/register">Create an account</Link></p>
  </div></div></div>;
}
