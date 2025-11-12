/// Simple input validators
/// PUBLIC_INTERFACE

// PUBLIC_INTERFACE
export function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

// PUBLIC_INTERFACE
export function isEmail(v) {
  if (!isNonEmptyString(v)) return false;
  // Basic RFC5322-like check
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

// PUBLIC_INTERFACE
export function isPositiveInt(n) {
  return Number.isInteger(n) && n > 0;
}

// PUBLIC_INTERFACE
export function sanitizeSearch(q) {
  if (!q) return '';
  return String(q).slice(0, 200).replace(/[^\w\s\-.:@/]/g, '').trim();
}
