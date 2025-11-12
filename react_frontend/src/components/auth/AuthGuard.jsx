import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSupabaseAuth } from '../../hooks/useSupabaseAuth';

/**
 * PUBLIC_INTERFACE
 * AuthGuard: protects routes by requiring an authenticated session.
 */
export function AuthGuard({ children }) {
  const { session, loading } = useSupabaseAuth();
  const location = useLocation();

  if (loading) {
    return <div style={{ padding: 16 }}>Checking authentication…</div>;
  }

  if (!session) {
    return <Navigate to="/auth/sign-in" replace state={{ from: location }} />;
  }

  return children;
}
