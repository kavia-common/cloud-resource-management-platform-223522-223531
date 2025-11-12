/// Simple structured logger utility
/// PUBLIC_INTERFACE
/**
 * Lightweight logging utility with level gating and safe metadata handling.
 * Uses env.LOG_LEVEL to determine log verbosity.
 */
import { env } from '../config/env';

const LEVELS = ['error', 'warn', 'info', 'debug'];
const currentLevelIdx = Math.max(0, LEVELS.indexOf(String(env.LOG_LEVEL || 'info').toLowerCase()));

function safe(obj) {
  try {
    return JSON.parse(JSON.stringify(obj, (_, v) => (typeof v === 'function' ? undefined : v)));
  } catch {
    return undefined;
  }
}

// PUBLIC_INTERFACE
export const logger = {
  /** Log at info level */
  info(message, meta) {
    if (currentLevelIdx >= LEVELS.indexOf('info')) {
      // eslint-disable-next-line no-console
      console.info('[INFO]', message, meta ? safe(meta) : '');
    }
  },
  /** Log at warn level */
  warn(message, meta) {
    if (currentLevelIdx >= LEVELS.indexOf('warn')) {
      // eslint-disable-next-line no-console
      console.warn('[WARN]', message, meta ? safe(meta) : '');
    }
  },
  /** Log at error level */
  error(message, meta) {
    if (currentLevelIdx >= LEVELS.indexOf('error')) {
      // eslint-disable-next-line no-console
      console.error('[ERROR]', message, meta ? safe(meta) : '');
    }
  },
  /** Log at debug level */
  debug(message, meta) {
    if (currentLevelIdx >= LEVELS.indexOf('debug')) {
      // eslint-disable-next-line no-console
      console.debug('[DEBUG]', message, meta ? safe(meta) : '');
    }
  },
};
