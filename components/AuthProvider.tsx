'use client';

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import type { User } from '@/types';

type AuthValue = { user: User | null; loading: boolean; refresh: () => Promise<void>; logout: () => Promise<void> };
const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get<{ user: User | null }>('/auth/me');
      setUser(data.user);
    } catch { setUser(null); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  const logout = async () => {
    try { await axiosInstance.post('/auth/logout'); }
    finally { setUser(null); window.location.assign('/'); }
  };

  return <AuthContext.Provider value={{ user, loading, refresh, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
