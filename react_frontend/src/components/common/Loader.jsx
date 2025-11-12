import React from 'react';

/**
 * Simple loader/spinner with accessible label.
 * PUBLIC_INTERFACE
 */
export default function Loader({ label = 'Loading...' }) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12 }}
    >
      <span
        aria-hidden
        style={{
          width: 18,
          height: 18,
          border: '2px solid #3b82f6',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          display: 'inline-block',
          animation: 'spin 1s linear infinite',
        }}
      />
      <span>{label}</span>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
