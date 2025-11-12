import React from 'react';
import { Link } from 'react-router-dom';
import { useResourcesStore } from '../../store/useResourcesStore';
import Loader from '../../components/common/Loader';

/**
 * PUBLIC_INTERFACE
 * Resources list page: filter/search and data table with service-backed fetching.
 */
export default function ResourceList() {
  const {
    items, total, page, pageSize, query, provider, loading, error,
    setQuery, setProvider, setPage, setPageSize, fetchList,
  } = useResourcesStore();

  // Load on mount and when filters change (debounced for query)
  const [localQuery, setLocalQuery] = React.useState(query || '');
  React.useEffect(() => {
    const id = setTimeout(() => setQuery(localQuery), 250);
    return () => clearTimeout(id);
  }, [localQuery, setQuery]);

  React.useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, provider, page, pageSize]);

  const totalPages = Math.max(1, Math.ceil((total || 0) / pageSize));

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0 }}>Resources</h1>
          <p style={{ marginTop: 6, color: '#64748b' }}>
            Connected to resourcesService.list with pagination and filters.
          </p>
        </div>
        <Link to="/resources/create" style={primaryBtn}>+ Create Resource</Link>
      </header>

      <section style={toolbar}>
        <input
          type="search"
          placeholder="Search resources…"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          style={input}
          aria-label="Search resources"
        />
        <select value={provider} onChange={(e) => setProvider(e.target.value)} style={input} aria-label="Filter by provider">
          <option value="all">All providers</option>
          <option value="aws">AWS</option>
          <option value="azure">Azure</option>
          <option value="gcp">GCP</option>
        </select>
        <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} style={input} aria-label="Rows per page">
          {[10, 20, 50].map((n) => <option key={n} value={n}>{n} / page</option>)}
        </select>
      </section>

      <section style={tableWrap} aria-label="Resources table">
        {loading && <Loader label="Loading resources..." />}
        {error && (
          <div style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', borderRadius: 8, padding: 10, marginBottom: 8 }}>
            Failed to load resources. {String(error?.message || error)}
          </div>
        )}
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
            {(items || []).length === 0 && !loading ? (
              <tr><td style={td} colSpan={5} aria-live="polite">No resources found.</td></tr>
            ) : (
              (items || []).map((r) => (
                <tr key={r.id}>
                  <td style={td}><Link to={`/resources/${r.id}`} style={{ color: '#3b82f6' }}>{r.name}</Link></td>
                  <td style={td}>{r.type}</td>
                  <td style={td}>{r.provider}</td>
                  <td style={td}>{r.region}</td>
                  <td style={td}><span style={r.status === 'running' ? statusOk : statusOther}>{r.status || '—'}</span></td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
          <div style={{ color: '#94a3b8', fontSize: 13 }}>
            {total} total • Page {page} of {totalPages}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page <= 1}
              style={secondaryBtn}
              aria-label="Previous page"
            >
              ‹ Prev
            </button>
            <button
              type="button"
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page >= totalPages}
              style={secondaryBtn}
              aria-label="Next page"
            >
              Next ›
            </button>
          </div>
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
const secondaryBtn = {
  backgroundColor: '#e5e7eb',
  color: '#111827',
  border: '1px solid #d1d5db',
  padding: '8px 12px',
  borderRadius: 8,
  cursor: 'pointer',
  fontWeight: 600,
};
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
const statusOther = {
  ...statusOk,
  color: '#92400e',
  background: '#fef3c7',
  border: '1px solid #fde68a',
};
