import React from 'react';
import Loader from '../components/common/Loader';
import { useNotificationsStore } from '../store/useNotificationsStore';
import { useNotificationsRealtime } from '../hooks/useRealtime';

/**
 * PUBLIC_INTERFACE
 * Notifications page: realtime list with ability to mark-as-read.
 */
export default function Notifications() {
  const { items, loading, error, unreadCount, load, markRead } = useNotificationsStore();

  // initial load
  React.useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // realtime subscription
  const { onRealtimeInsert, onRealtimeUpdate, onRealtimeDelete } = useNotificationsStore.getState();
  useNotificationsRealtime({
    onInsert: onRealtimeInsert,
    onUpdate: onRealtimeUpdate,
    onDelete: onRealtimeDelete,
  });

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <header>
        <h1 style={{ margin: 0 }}>Notifications</h1>
        <p style={{ marginTop: 6, color: '#64748b' }}>
          Unread: <strong>{unreadCount}</strong>
        </p>
      </header>

      <section style={panel}>
        {loading && <Loader label="Loading notifications..." />}
        {error && (
          <div style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', borderRadius: 8, padding: 10, marginBottom: 8 }}>
            Failed to load notifications. {String(error?.message || error)}
          </div>
        )}
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {(items || []).map((n) => (
            <li key={n.id} style={row}>
              <div>
                <div style={{ fontWeight: 700 }}>
                  {n.title} {!n.read && <span style={badge}>new</span>}
                </div>
                <div style={{ color: '#64748b' }}>{n.desc || n.message}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{new Date(n.created_at || Date.now()).toLocaleString()}</div>
                {!n.read && (
                  <button
                    type="button"
                    onClick={() => markRead(n.id)}
                    style={markBtn}
                    aria-label={`Mark notification ${n.id} as read`}
                  >
                    Mark read
                  </button>
                )}
              </div>
            </li>
          ))}
          {(items || []).length === 0 && !loading && <li style={{ color: '#94a3b8' }}>No notifications</li>}
        </ul>
      </section>
    </div>
  );
}

const panel = { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, boxShadow: '0 6px 14px rgba(0,0,0,0.04)' };
const row = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f1f5f9' };
const badge = { display: 'inline-block', marginLeft: 8, padding: '2px 6px', borderRadius: 999, background: '#eff6ff', border: '1px solid #bfdbfe', color: '#2563eb', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' };
const markBtn = { backgroundColor: '#e5e7eb', color: '#111827', border: '1px solid #d1d5db', padding: '6px 10px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 };
