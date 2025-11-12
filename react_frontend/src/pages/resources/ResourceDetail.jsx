import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * ResourceDetail page: shows resource metadata and placeholder actions.
 */
export default function ResourceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0 }}>Resource: resource-{id}</h1>
          <p style={{ marginTop: 6, color: '#64748b' }}>This is a read-only placeholder page.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" style={dangerBtn} onClick={() => navigate('/resources')}>Delete</button>
          <Link to="/resources" style={secondaryBtn}>Back to list</Link>
        </div>
      </header>

      <section style={panel}>
        <h3 style={panelTitle}>Overview</h3>
        <div style={grid2}>
          <InfoRow k="Name" v={`resource-${id}`} />
          <InfoRow k="Type" v="vm" />
          <InfoRow k="Provider" v="aws" />
          <InfoRow k="Region" v="us-east-1" />
          <InfoRow k="Status" v="running" />
          <InfoRow k="Created" v="—" />
        </div>
      </section>

      <section style={panel}>
        <h3 style={panelTitle}>Activity</h3>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          <li>No recent events (placeholder)</li>
        </ul>
      </section>
    </div>
  );
}

function InfoRow({ k, v }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 8 }}>
      <div style={{ color: '#64748b' }}>{k}</div>
      <div>{v}</div>
    </div>
  );
}

const panel = {
  background: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: 12,
  padding: 16,
  boxShadow: '0 6px 14px rgba(0,0,0,0.04)',
};
const panelTitle = { margin: 0, color: '#111827' };
const grid2 = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 };
const dangerBtn = {
  backgroundColor: '#ef4444',
  color: '#fff',
  border: 'none',
  padding: '10px 12px',
  borderRadius: 8,
  cursor: 'pointer',
  fontWeight: 700,
};
const secondaryBtn = {
  backgroundColor: '#e5e7eb',
  color: '#111827',
  padding: '10px 12px',
  borderRadius: 8,
  textDecoration: 'none',
  fontWeight: 600,
};
