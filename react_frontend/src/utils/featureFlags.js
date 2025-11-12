/// Feature flag helpers
/// PUBLIC_INTERFACE
import { env } from '../config/env';

// PUBLIC_INTERFACE
export function isEnabled(flag) {
  return Boolean(env.FEATURE_FLAGS?.[flag]);
}

// PUBLIC_INTERFACE
export function allFlags() {
  return { ...(env.FEATURE_FLAGS || {}) };
}
