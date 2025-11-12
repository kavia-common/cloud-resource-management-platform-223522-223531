import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * ResourceCreate page: simple form placeholder for creating a resource.
 */
export default function ResourceCreate() {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    name: '',
    type: 'vm',
    provider: 'aws',
    region: 'us-east-1',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    // Placeholder: in future, call create API then navigate to detail
    navigate('/resources');
  };

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <header>
        <h1 style={{ margin: 0 }}>Create Resource</h1>
        <p style={{ marginTop: 6, color: '#64748b' }}>
          This form is a placeholder. Submit will return to list for now.
        </p>
      </header>

      <form onSubmit={onSubmit} style={formStyle}>
        <label>
          <div>Name</div>
          <input
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            style={input}
            placeholder="my-resource"
          />
        </label>

        <label>
          <div>Type</div>
          <select
            value={form.type}
            onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
            style={input}
          >
            <option value="vm">Virtual Machine</option>
            <option value="db">Database</option>
            <option value="storage">Storage</option>
          </select>
        </label>

        <label>
          <div>Provider</div>
          <select
            value={form.provider}
            onChange={(e) => setForm((f) => ({ ...f, provider: e.target.value }))}
            style={input}
          >
            <option value="aws">AWS</option>
            <option value="azure">Azure</option>
            <option value="gcp">GCP</option>
          </select>
        </label>

        <label>
          <div>Region</div>
          <input
            value={form.region}
            onChange={(e) => setForm((f) => ({ ...f, region: e.target.value }))}
            style={input}
            placeholder="us-east-1"
          />
        </label>

        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit" style={primaryBtn}>Create</button>
          <Link to="/resources" style={secondaryBtn}>Cancel</Link>
        </div>
      </form>
    </div>
  );
}

const formStyle = {
  display: 'grid',
  gap: 12,
  background: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: 12,
  padding: 16,
  maxWidth: 560,
};
const input = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: 8,
  border: '1px solid #e5e7eb',
  marginTop: 6,
  background: '#fff',
};
const primaryBtn = {
  backgroundColor: '#3b82f6',
  color: '#fff',
  border: 'none',
  padding: '10px 12px',
  borderRadius: 8,
  cursor: 'pointer',
  fontWeight: 700,
  textDecoration: 'none',
};
const secondaryBtn = {
  backgroundColor: '#e5e7eb',
  color: '#111827',
  padding: '10px 12px',
  borderRadius: 8,
  textDecoration: 'none',
  fontWeight: 600,
};
