import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCurrentSession } from '../../lib/supabaseClient';

/**
 * Placeholder role resolution: tries user.app_metadata.role, else 'user'.
 */
async function resolveRole() {
  const session = await getCurrentSession();
  const role =
    session?.user?.app_metadata?.role ||
    session?.user?.user_metadata?.role ||
    'user';
  return String(role);
}

// PUBLIC_INTERFACE
export function RoleGuard({ allow = ['user'], children }) {
  const location = useLocation();
  const [role, setRole] = React.useState(null);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      const r = await resolveRole();
      if (mounted) setRole(r);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (!role) {
    return <div style={{ padding: 16 }}>Authorizing…</div>;
  }

  if (!allow.includes(role)) {
    return <Navigate to="/" replace state={{ from: location, reason: 'forbidden' }} />;
  }

  return children;
}
