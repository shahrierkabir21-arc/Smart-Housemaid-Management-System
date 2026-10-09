'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { EmptyState, LoadingState } from '@/components/ui';
import type { Role } from '@/types';

export default function RequireAuth({ roles, children }: { roles?: Role[]; children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [loading, user, router]);

  if (loading || !user) return <LoadingState label="Verifying your account..." />;
  if (roles && !roles.includes(user.role)) return <EmptyState icon="shield" title="Access restricted" description="This area is for a different account type." />;
  return <>{children}</>;
}
