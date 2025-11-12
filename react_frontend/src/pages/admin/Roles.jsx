import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Admin Roles page: manage role mappings placeholder.
 */
export default function Roles() {
  return (
    <section style={panel}>
      <h3 style={h3}>Roles</h3>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        <li><strong>admin</strong> — full access</li>
        <li><strong>user</strong> — standard access</li>
      </ul>
    </section>
  );
}

const panel = { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, boxShadow: '0 6px 14px rgba(0,0,0,0.04)' };
const h3 = { margin: 0, color: '#111827' };
