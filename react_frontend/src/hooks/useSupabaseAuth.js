import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { env } from '../config/env';

/**
 * PUBLIC_INTERFACE
 * Hook to access Supabase authentication state and actions using Zustand.
 * Ensures the auth store is initialized exactly once.
 */
export function useSupabaseAuth() {
  const initialized = useAuthStore((s) => s.initialized);
  const loading = useAuthStore((s) => s.loading);
  const session = useAuthStore((s) => s.session);
  const user = useAuthStore((s) => s.user);
  const error = useAuthStore((s) => s.error);

  const init = useAuthStore((s) => s.init);
  const signInWithPassword = useAuthStore((s) => s.signInWithPassword);
  const signUpWithEmail = useAuthStore((s) => s.signUpWithEmail);
  const signOut = useAuthStore((s) => s.signOut);
  const resetPasswordForEmail = useAuthStore((s) => s.resetPasswordForEmail);
  const updateUserPassword = useAuthStore((s) => s.updateUserPassword);

  React.useEffect(() => {
    let unsub = null;
    if (!initialized) {
      init().then((u) => {
        unsub = u;
      });
    }
    return () => {
      if (typeof unsub === 'function') unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized]);

  // compute email redirect base
  const siteUrl = env.FRONTEND_URL || window.location.origin;

  return {
    initialized,
    loading,
    session,
    user,
    error,
    // actions
    signInWithPassword,
    signUpWithEmail,
    signOut,
    resetPasswordForEmail,
    updateUserPassword,
    // helpers
    siteUrl,
  };
}
