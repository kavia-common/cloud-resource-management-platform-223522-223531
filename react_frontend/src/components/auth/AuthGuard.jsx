import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase, getCurrentSession } from '../../lib/supabaseClient';

/**
 * Hook to get auth session; placeholder using Supabase directly until store is ready.
 */
function useSession() {
  const [session, setSession] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const s = await getCurrentSession();
        if (mounted) setSession(s);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, _session) => {
      setSession(_session);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { session, loading };
}

// PUBLIC_INTERFACE
export function AuthGuard({ children }) {
  const { session, loading } = useSession();
  const location = useLocation();

  if (loading) {
    return <div style={{ padding: 16 }}>Checking authentication…</div>;
  }

  if (!session) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return children;
}
