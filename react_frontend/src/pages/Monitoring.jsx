import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Monitoring page: system health and metrics placeholders.
 */
export default function Monitoring() {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <header>
        <h1 style={{ margin: 0 }}>Monitoring</h1>
        <p style={{ marginTop: 6, color: '#64748b' }}>
          Real-time charts and logs will appear here. This is a placeholder UI.
        </p>
      </header>

      <section style={grid}>
        <div style={card}>
          <h3 style={h3}>CPU Utilization</h3>
          <div style={chartBox}>Chart placeholder</div>
        </div>
        <div style={card}>
          <h3 style={h3}>Memory Usage</h3>
          <div style={chartBox}>Chart placeholder</div>
        </div>
        <div style={card}>
          <h3 style={h3}>Network I/O</h3>
          <div style={chartBox}>Chart placeholder</div>
        </div>
      </section>

      <section style={card}>
        <h3 style={h3}>Recent Alerts</h3>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          <li>No alerts (placeholder)</li>
        </ul>
      </section>
    </div>
  );
}

const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 };
const card = { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, boxShadow: '0 6px 14px rgba(0,0,0,0.04)' };
const h3 = { margin: 0, color: '#111827' };
const chartBox = { height: 160, background: 'linear-gradient(135deg, #f8fafc, #eef2ff)', border: '1px dashed #c7d2fe', borderRadius: 8, display: 'grid', placeItems: 'center', color: '#64748b' };
