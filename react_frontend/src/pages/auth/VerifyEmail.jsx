import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Verify Email information page - instructs users to check their inbox.
 */
export default function VerifyEmail() {
  return (
    <div style={container}>
      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Verify your email</h2>
        <p>
          We sent a verification link to your email. Click the link to verify your account, then return here to sign in.
        </p>
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
  maxWidth: 520,
  background: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: 12,
  padding: 16,
  boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
};
