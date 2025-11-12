import React from 'react';

/**
 * Small badge/pill component.
 * PUBLIC_INTERFACE
 */
export default function Badge({ text, color = '#3b82f6' }) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 8px',
        background: `${color}20`,
        color,
        border: `1px solid ${color}55`,
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
        textTransform: 'uppercase',
      }}
    >
      {text}
    </span>
  );
}
