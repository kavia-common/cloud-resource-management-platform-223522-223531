import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../common/Badge';
import Toast from '../common/Toast';

/**
 * Top navigation bar component with primary accent colors.
 * Uses #3b82f6 (primary) and #06b6d4 (success/accent) per style guide.
 */
export default function TopNav() {
  const [showToast, setShowToast] = React.useState(false);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        width: '100%',
        background: '#ffffffcc',
        backdropFilter: 'saturate(180%) blur(8px)',
        borderBottom: '1px solid #e5e7eb',
      }}
      aria-label="Top navigation"
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          justifyContent: 'space-between',
          padding: '12px 16px',
          maxWidth: 1280,
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
            <span
              aria-hidden
              style={{
                display: 'inline-block',
                width: 32,
                height: 32,
                borderRadius: 8,
                background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                marginRight: 8,
              }}
            />
            <span style={{ fontWeight: 700, color: '#111827' }}>Cloud Manager</span>
          </Link>
          <Badge color="#06b6d4" text="beta" />
        </div>

        <nav aria-label="Primary">
          <ul style={{ display: 'flex', gap: 16, listStyle: 'none', margin: 0, padding: 0 }}>
            <li><Link to="/resources" style={linkStyle}>Resources</Link></li>
            <li><Link to="/monitoring" style={linkStyle}>Monitoring</Link></li>
            <li><Link to="/notifications" style={linkStyle}>Notifications</Link></li>
            <li><Link to="/billing" style={linkStyle}>Billing</Link></li>
            <li><Link to="/admin" style={linkStyle}>Admin</Link></li>
          </ul>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            type="button"
            onClick={() => setShowToast(true)}
            style={buttonStyle}
            aria-label="Show toast"
          >
            Notify
          </button>
          <Link to="/auth" style={{ ...buttonStyle, backgroundColor: '#06b6d4' }}>
            Auth
          </Link>
        </div>
      </div>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        title="Notification"
        message="This is a sample toast"
      />
    </header>
  );
}

const linkStyle = {
  color: '#111827',
  textDecoration: 'none',
  padding: '8px 10px',
  borderRadius: 8,
  transition: 'background-color 120ms',
  display: 'inline-block',
};

const buttonStyle = {
  backgroundColor: '#3b82f6',
  color: '#fff',
  border: 'none',
  padding: '8px 12px',
  borderRadius: 8,
  cursor: 'pointer',
  fontWeight: 600,
};
