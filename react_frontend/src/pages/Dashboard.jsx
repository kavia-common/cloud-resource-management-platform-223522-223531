import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Dashboard page: high-level overview cards and quick links.
 */
export default function Dashboard() {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <header>
        <h1 style={{ margin: 0, color: '#111827' }}>Dashboard</h1>
        <p style={{ marginTop: 6, color: '#64748b' }}>
          Welcome back. This is a read-only snapshot. Live data wiring to follow.
        </p>
      </header>

      <section style={cards}>
        {[
          { title: 'Total Resources', value: '—', hint: 'Across all providers' },
          { title: 'Active Alerts', value: '—', hint: 'Triggered in last 24h' },
          { title: 'Monthly Spend', value: '—', hint: 'Estimated current month' },
          { title: 'Users', value: '—', hint: 'Active users' },
        ].map((c) => (
          <div key={c.title} style={card}>
            <div style={{ fontSize: 13, color: '#64748b' }}>{c.title}</div>
            <div style={{ fontSize: 24, fontWeight: 800, marginTop: 6 }}>{c.value}</div>
            <div style={{ marginTop: 6, color: '#94a3b8' }}>{c.hint}</div>
          </div>
        ))}
      </section>

      <section style={{ display: 'grid', gap: 16 }}>
        <div style={panel}>
          <h3 style={panelTitle}>Recent Activity</h3>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li>— No activity to display (placeholder)</li>
          </ul>
        </div>

        <div style={panel}>
          <h3 style={panelTitle}>Health & Monitoring</h3>
          <div style={{ color: '#94a3b8' }}>Charts coming soon…</div>
        </div>
      </section>
    </div>
  );
}

const cards = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: 12,
};
const card = {
  background: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: 12,
  padding: 16,
  boxShadow: '0 6px 14px rgba(0,0,0,0.04)',
};
const panel = {
  background: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: 12,
  padding: 16,
  boxShadow: '0 6px 14px rgba(0,0,0,0.04)',
};
const panelTitle = { margin: 0, color: '#111827' };
