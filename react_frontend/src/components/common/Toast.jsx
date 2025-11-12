import React from 'react';

/**
 * Toast message component.
 * PUBLIC_INTERFACE
 */
export default function Toast({ show, onClose, title, message }) {
  React.useEffect(() => {
    if (!show) return;
    const id = setTimeout(() => onClose?.(), 3000);
    return () => clearTimeout(id);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        right: 16,
        top: 72,
        background: '#111827',
        color: '#fff',
        padding: '12px 14px',
        borderRadius: 10,
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        zIndex: 50,
        minWidth: 220,
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 4, color: '#06b6d4' }}>{title}</div>
      <div>{message}</div>
      <button
        onClick={() => onClose?.()}
        aria-label="Dismiss"
        style={{
          marginTop: 8,
          background: '#3b82f6',
          color: '#fff',
          padding: '6px 8px',
          borderRadius: 6,
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Dismiss
      </button>
    </div>
  );
}
