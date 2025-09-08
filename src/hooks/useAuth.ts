'use client';

import { useSession } from 'next-auth/react';
import { User } from '@/lib/types';

export function useAuth() {
  const { data: session, status } = useSession();

  const user: User | null = session?.user ? {
    id: session.user.id || '',
    name: session.user.name || '',
    email: session.user.email || '',
    role: session.user.role || 'member',
    createdAt: '',
    updatedAt: ''
  } : null;

  return {
    user,
    isLoading: status === 'loading',
    isAuthenticated: !!session,
    isAdmin: user?.role === 'admin',
    isMember: user?.role === 'member',
  };
}
