import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../components/common/Loader';
import { supabase } from '../../lib/supabaseClient';
import { useSupabaseAuth } from '../../hooks/useSupabaseAuth';

/**
 * PUBLIC_INTERFACE
 * Callback page used by Supabase for:
 * - Email verification (sign-up confirm)
 * - Password recovery flow (type=recovery), allows user to set new password
 */
export default function Callback() {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateUserPassword } = useSupabaseAuth();

  const params = new URLSearchParams(location.search);
  const type = params.get('type'); // 'signup', 'recovery', etc.

  const [ready, setReady] = React.useState(type !== 'recovery');
  const [password, setPassword] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    let cancelled = false;

    // When redirected here via magic link, supabase-js detects session in URL by default.
    // For sign-up confirm or email change, we can just show a success and redirect after a moment.
    if (type !== 'recovery') {
      const id = setTimeout(() => {
        if (!cancelled) navigate('/auth/sign-in', { replace: true });
      }, 1500);
      return () => {
        cancelled = true;
        clearTimeout(id);
      };
    } else {
      // For recovery, ensure we set the session from URL so updateUser works.
      (async () => {
        await supabase.auth.getSession(); // trigger session parsing from URL
        setReady(true);
      })();
    }

    return () => {
      cancelled = true;
    };
  }, [type, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await updateUserPassword(password);
    setSubmitting(false);
    if (!error) {
      setMessage('Password updated. Redirecting to sign in...');
      setTimeout(() => navigate('/auth/sign-in', { replace: true }), 1200);
    } else {
      setMessage(error.message || String(error));
    }
  };

  if (!ready) return <Loader label="Finalizing authentication..." />;

  if (type !== 'recovery') {
    return (
      <div style={container}>
        <div style={card}>
          <h3 style={{ marginTop: 0 }}>Email verified</h3>
          <p>Taking you to the sign in page...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={container}>
      <div style={card}>
        <h3 style={{ marginTop: 0 }}>Set a new password</h3>
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
          <label>
            <div>New password</div>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={input}
              placeholder="Enter a strong password"
            />
          </label>
          <button type="submit" style={button} disabled={submitting}>
            {submitting ? 'Updating...' : 'Update password'}
          </button>
        </form>
        {message && <div style={{ marginTop: 10 }}>{message}</div>}
      </div>
    </div>
  );
}

const container = {
  minHeight: 'calc(100vh - 56px)',
  display: 'grid',
  placeItems: 'center',
  padding: 16,
};
const card = {
  width: '100%',
  maxWidth: 420,
  background: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: 12,
  padding: 16,
  boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
};
const input = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: 8,
  border: '1px solid #e5e7eb',
  marginTop: 6,
};
const button = {
  backgroundColor: '#3b82f6',
  color: '#fff',
  border: 'none',
  padding: '10px 12px',
  borderRadius: 8,
  cursor: 'pointer',
  fontWeight: 600,
  marginTop: 8,
};
