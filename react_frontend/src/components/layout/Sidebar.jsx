import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUIStore } from '../../store/useUIStore';

/**
 * Collapsible sidebar for main navigation.
 */
export default function Sidebar() {
  const collapsed = useUIStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  return (
    <aside
      style={{
        width: collapsed ? 64 : 220,
        transition: 'width 160ms',
        borderRight: '1px solid #e5e7eb',
        background: '#ffffff',
        height: 'calc(100vh - 56px)',
        position: 'sticky',
        top: 56,
      }}
      aria-label="Sidebar navigation"
    >
      <div style={{ display: 'flex', justifyContent: collapsed ? 'center' : 'flex-end', padding: 8 }}>
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          style={{
            border: '1px solid #e5e7eb',
            background: '#fff',
            borderRadius: 8,
            padding: '6px 10px',
            cursor: 'pointer',
          }}
        >
          {collapsed ? '»' : '«'}
        </button>
      </div>
      <nav>
        <ul style={{ listStyle: 'none', margin: 0, padding: 8 }}>
          {items.map((item) => (
            <li key={item.to} style={{ marginBottom: 4 }}>
              <NavLink
                to={item.to}
                style={({ isActive }) => ({
                  display: 'block',
                  textDecoration: 'none',
                  color: '#111827',
                  padding: '10px 12px',
                  borderRadius: 8,
                  background: isActive ? 'rgba(59,130,246,0.12)' : 'transparent',
                  fontWeight: isActive ? 700 : 500,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                })}
                title={item.label}
              >
                {collapsed ? item.icon : `${item.icon} ${item.label}`}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

const items = [
  { to: '/', label: 'Dashboard', icon: '🏠' },
  { to: '/resources', label: 'Resources', icon: '🗂️' },
  { to: '/monitoring', label: 'Monitoring', icon: '📈' },
  { to: '/notifications', label: 'Notifications', icon: '🔔' },
  { to: '/billing', label: 'Billing', icon: '💳' },
  { to: '/admin', label: 'Admin', icon: '🛡️' },
];
