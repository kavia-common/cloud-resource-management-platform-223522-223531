import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSupabaseAuth } from '../../hooks/useSupabaseAuth';
import Loader from '../../components/common/Loader';

/**
 * PUBLIC_INTERFACE
 * SignIn page - email/password.
 */
export default function SignIn() {
  const { loading, error, signInWithPassword } = useSupabaseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = React.useState({ email: '', password: '' });
  const [submitting, setSubmitting] = React.useState(false);
  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await signInWithPassword(form.email, form.password);
    setSubmitting(false);
    if (!error) {
      navigate(from, { replace: true });
    }
  };

  if (loading && !submitting) {
    return <Loader label="Loading auth..." />;
  }

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Sign in</h2>
        {error && <div style={errorBox}>{String(error?.message || error)}</div>}
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
          <label>
            <div>Email</div>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              style={input}
              placeholder="you@example.com"
            />
          </label>
          <label>
            <div>Password</div>
            <input
              required
              type="password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              style={input}
              placeholder="Enter your password"
            />
          </label>
          <button type="submit" style={button} disabled={submitting}>
            {submitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <div style={{ marginTop: 12 }}>
          <Link to="/auth/forgot-password">Forgot password?</Link>
        </div>
        <div style={{ marginTop: 8 }}>
          New here? <Link to="/auth/sign-up">Create an account</Link>
        </div>
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
const errorBox = {
  padding: 10,
  background: '#fee2e2',
  color: '#991b1b',
  borderRadius: 8,
  marginBottom: 8,
};
