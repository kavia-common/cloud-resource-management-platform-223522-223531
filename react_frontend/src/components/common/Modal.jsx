import React from 'react';

/**
 * Accessible modal component with backdrop.
 * PUBLIC_INTERFACE
 */
export default function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        display: 'grid',
        placeItems: 'center',
        background: 'rgba(0,0,0,0.4)',
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 560,
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          overflow: 'hidden',
        }}
      >
        <header style={{ padding: 16, borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between' }}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: 18,
            }}
          >
            ✕
          </button>
        </header>
        <section style={{ padding: 16 }}>
          {children}
        </section>
        {footer && <footer style={{ padding: 16, borderTop: '1px solid #e5e7eb' }}>{footer}</footer>}
      </div>
    </div>
  );
}
