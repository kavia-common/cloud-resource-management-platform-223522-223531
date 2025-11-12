import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Billing page: monthly summary and invoices placeholders.
 */
export default function Billing() {
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <header>
        <h1 style={{ margin: 0 }}>Billing</h1>
        <p style={{ marginTop: 6, color: '#64748b' }}>Read-only placeholders. Connect to billing data later.</p>
      </header>

      <section style={grid}>
        <div style={card}>
          <div style={{ color: '#64748b' }}>Current Month Spend</div>
          <div style={{ fontSize: 28, fontWeight: 800, marginTop: 6 }}>—</div>
        </div>
        <div style={card}>
          <div style={{ color: '#64748b' }}>Projected Spend</div>
          <div style={{ fontSize: 28, fontWeight: 800, marginTop: 6 }}>—</div>
        </div>
        <div style={card}>
          <div style={{ color: '#64748b' }}>Savings</div>
          <div style={{ fontSize: 28, fontWeight: 800, marginTop: 6 }}>—</div>
        </div>
      </section>

      <section style={panel}>
        <h3 style={h3}>Invoices</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={th}>Date</th>
              <th style={th}>Amount</th>
              <th style={th}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={td}>—</td>
              <td style={td}>—</td>
              <td style={td}><span style={badge}>paid</span></td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 };
const card = { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, boxShadow: '0 6px 14px rgba(0,0,0,0.04)' };
const panel = { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, boxShadow: '0 6px 14px rgba(0,0,0,0.04)' };
const h3 = { margin: 0, color: '#111827' };
const th = { textAlign: 'left', padding: '10px 8px', color: '#64748b', borderBottom: '1px solid #e5e7eb' };
const td = { padding: '10px 8px', borderBottom: '1px solid #f1f5f9' };
const badge = { display: 'inline-block', padding: '2px 8px', borderRadius: 999, background: '#dcfce7', border: '1px solid #bbf7d0', color: '#16a34a', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' };
