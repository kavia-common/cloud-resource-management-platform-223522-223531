import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSupabaseAuth } from '../../hooks/useSupabaseAuth';

/**
 * PUBLIC_INTERFACE
 * RoleGuard checks the current user's role from app_metadata or user_metadata.
 */
export function RoleGuard({ allow = ['user'], children }) {
  const location = useLocation();
  const { user, loading } = useSupabaseAuth();

  const role = React.useMemo(() => {
    return (
      user?.app_metadata?.role ||
      user?.user_metadata?.role ||
      'user'
    );
  }, [user]);

  if (loading) {
    return <div style={{ padding: 16 }}>Authorizing…</div>;
  }

  if (!user) {
    return <Navigate to="/auth/sign-in" replace state={{ from: location }} />;
  }

  if (!allow.includes(String(role))) {
    return <Navigate to="/" replace state={{ from: location, reason: 'forbidden' }} />;
  }

  return children;
}
