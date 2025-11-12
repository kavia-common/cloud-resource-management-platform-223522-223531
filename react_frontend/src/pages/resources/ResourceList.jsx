import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Resources list page: filter/search and data table placeholder.
 */
export default function ResourceList() {
  const [query, setQuery] = React.useState('');
  const [provider, setProvider] = React.useState('all');

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0 }}>Resources</h1>
          <p style={{ marginTop: 6, color: '#64748b' }}>
            Read-only placeholder. Connect to services to populate this table.
          </p>
        </div>
        <Link to="/resources/create" style={primaryBtn}>+ Create Resource</Link>
      </header>

      <section style={toolbar}>
        <input
          type="search"
          placeholder="Search resources…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={input}
          aria-label="Search resources"
        />
        <select value={provider} onChange={(e) => setProvider(e.target.value)} style={input} aria-label="Filter by provider">
          <option value="all">All providers</option>
          <option value="aws">AWS</option>
          <option value="azure">Azure</option>
          <option value="gcp">GCP</option>
        </select>
      </section>

      <section style={tableWrap} aria-label="Resources table">
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>Name</th>
              <th style={th}>Type</th>
              <th style={th}>Provider</th>
              <th style={th}>Region</th>
              <th style={th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((i) => (
              <tr key={i}>
                <td style={td}><Link to={`/resources/${i}`} style={{ color: '#3b82f6' }}>resource-{i}</Link></td>
                <td style={td}>vm</td>
                <td style={td}>aws</td>
                <td style={td}>us-east-1</td>
                <td style={td}><span style={statusOk}>running</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ color: '#94a3b8', marginTop: 10, fontSize: 13 }}>
          This is placeholder data. Filtering and pagination will be wired later.
        </div>
      </section>
    </div>
  );
}

const primaryBtn = {
  backgroundColor: '#3b82f6',
  color: '#fff',
  textDecoration: 'none',
  padding: '10px 12px',
  borderRadius: 8,
  fontWeight: 700,
};
const toolbar = { display: 'flex', gap: 8, alignItems: 'center' };
const input = {
  padding: '10px 12px',
  border: '1px solid #e5e7eb',
  borderRadius: 8,
  background: '#fff',
};
const tableWrap = {
  background: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: 12,
  padding: 8,
  overflowX: 'auto',
};
const table = { width: '100%', borderCollapse: 'collapse' };
const th = { textAlign: 'left', padding: '10px 8px', color: '#64748b', borderBottom: '1px solid #e5e7eb' };
const td = { padding: '10px 8px', borderBottom: '1px solid #f1f5f9' };
const statusOk = {
  display: 'inline-block',
  padding: '2px 8px',
  borderRadius: 999,
  color: '#16a34a',
  background: '#dcfce7',
  border: '1px solid #bbf7d0',
  fontSize: 12,
  fontWeight: 700,
  textTransform: 'uppercase',
};
