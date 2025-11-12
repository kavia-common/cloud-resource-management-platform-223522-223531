import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Admin Users page: user list placeholder.
 */
export default function Users() {
  return (
    <section style={panel}>
      <h3 style={h3}>Users</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={th}>Email</th>
            <th style={th}>Role</th>
            <th style={th}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={td}>user@example.com</td>
            <td style={td}><span style={roleBadge}>user</span></td>
            <td style={td}>active</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

const panel = { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, boxShadow: '0 6px 14px rgba(0,0,0,0.04)' };
const h3 = { margin: 0, color: '#111827' };
const th = { textAlign: 'left', padding: '10px 8px', color: '#64748b', borderBottom: '1px solid #e5e7eb' };
const td = { padding: '10px 8px', borderBottom: '1px solid #f1f5f9' };
const roleBadge = { display: 'inline-block', padding: '2px 8px', borderRadius: 999, background: '#eff6ff', border: '1px solid #bfdbfe', color: '#2563eb', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' };
