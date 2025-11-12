import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Notifications page: list view of alerts/messages placeholders.
 */
export default function Notifications() {
  const items = [
    { id: 1, title: 'Scale event', desc: 'Auto-scaled VM group', time: 'Just now' },
    { id: 2, title: 'Cost threshold', desc: 'Monthly spend reached 80%', time: '1h ago' },
  ];

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <header>
        <h1 style={{ margin: 0 }}>Notifications</h1>
        <p style={{ marginTop: 6, color: '#64748b' }}>This is placeholder content.</p>
      </header>

      <section style={panel}>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {items.map((n) => (
            <li key={n.id} style={row}>
              <div>
                <div style={{ fontWeight: 700 }}>{n.title}</div>
                <div style={{ color: '#64748b' }}>{n.desc}</div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{n.time}</div>
            </li>
          ))}
          {items.length === 0 && <li style={{ color: '#94a3b8' }}>No notifications</li>}
        </ul>
      </section>
    </div>
  );
}

const panel = { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, boxShadow: '0 6px 14px rgba(0,0,0,0.04)' };
const row = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f1f5f9' };
