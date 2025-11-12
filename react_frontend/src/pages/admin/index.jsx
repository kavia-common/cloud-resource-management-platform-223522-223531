import React from 'react';
import Users from './Users';
import Roles from './Roles';
import AuditLogs from './AuditLogs';

/**
 * PUBLIC_INTERFACE
 * Admin root page: renders sub-pages via simple tab navigation.
 */
export default function Admin() {
  const [tab, setTab] = React.useState('users');

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <header>
        <h1 style={{ margin: 0 }}>Admin</h1>
        <p style={{ marginTop: 6, color: '#64748b' }}>
          Restricted area. Read-only placeholders for now.
        </p>
      </header>

      <nav style={tabs}>
        <button onClick={() => setTab('users')} style={tabBtn(tab === 'users')}>Users</button>
        <button onClick={() => setTab('roles')} style={tabBtn(tab === 'roles')}>Roles</button>
        <button onClick={() => setTab('audit')} style={tabBtn(tab === 'audit')}>Audit Logs</button>
      </nav>

      {tab === 'users' && <Users />}
      {tab === 'roles' && <Roles />}
      {tab === 'audit' && <AuditLogs />}
    </div>
  );
}

const tabs = { display: 'flex', gap: 8, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 6 };
const tabBtn = (active) => ({
  padding: '8px 12px',
  borderRadius: 8,
  border: '1px solid ' + (active ? '#93c5fd' : '#e5e7eb'),
  background: active ? '#eff6ff' : '#fff',
  color: active ? '#1d4ed8' : '#111827',
  cursor: 'pointer',
  fontWeight: active ? 800 : 600,
});
