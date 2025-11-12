import React from 'react';
import { Link } from 'react-router-dom';
import { useSupabaseAuth } from '../../hooks/useSupabaseAuth';
import Loader from '../../components/common/Loader';

/**
 * PUBLIC_INTERFACE
 * SignUp page for email/password with email verification flow.
 */
export default function SignUp() {
  const { loading, error, signUpWithEmail, siteUrl } = useSupabaseAuth();
  const [form, setForm] = React.useState({ email: '', password: '' });
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const redirectTo = `${siteUrl}/auth/callback`;
    const { error } = await signUpWithEmail(form.email, form.password, redirectTo);
    setSubmitting(false);
    if (!error) {
      setSubmitted(true);
    }
  };

  if (loading && !submitted) {
    return <Loader label="Loading auth..." />;
  }

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Create your account</h2>
        {error && <div style={errorBox}>{String(error?.message || error)}</div>}
        {submitted ? (
          <div style={{ background: '#ecfeff', border: '1px solid #cffafe', color: '#155e75', padding: 12, borderRadius: 8 }}>
            Check your email to verify your account. After verification, return to the app to sign in.
          </div>
        ) : (
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
                placeholder="Create a strong password"
              />
            </label>
            <button type="submit" style={button} disabled={submitting}>
              {submitting ? 'Creating account...' : 'Sign up'}
            </button>
          </form>
        )}
        <div style={{ marginTop: 12 }}>
          Already have an account? <Link to="/auth/sign-in">Sign in</Link>
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
