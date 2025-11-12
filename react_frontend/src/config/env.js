/// Environment configuration for the React app (Create React App compatible)
/// PUBLIC_INTERFACE
/**
 * Provides a safe, validated configuration object sourced from process.env.
 * - Validates the presence of Supabase URL and ANON KEY in development.
 * - Parses feature flags from JSON or comma-separated string.
 * - Exposes other optional environment variables as strings.
 *
 * Security: No secrets are hardcoded; all values are read from process.env.
 */

/**
 * Parse feature flags from either JSON or comma-separated list.
 * @param {string | undefined} raw
 * @returns {Record<string, boolean>}
 */
function parseFeatureFlags(raw) {
  if (!raw) return {};
  const trimmed = String(raw).trim();

  // Try JSON parse first
  try {
    const parsed = JSON.parse(trimmed);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      const normalized = {};
      for (const [k, v] of Object.entries(parsed)) {
        normalized[String(k)] = Boolean(v);
      }
      return normalized;
    }
  } catch {
    // fall through to CSV parsing
  }

  // Fallback to comma-separated values -> set true for each key
  return trimmed
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
}

/**
 * Coerce truthy string values to boolean.
 * Accepts: "true", "1", "yes", "on" (case-insensitive) as true.
 * @param {string | undefined} val
 * @returns {boolean}
 */
function toBool(val) {
  if (!val) return false;
  const v = String(val).toLowerCase();
  return v === "true" || v === "1" || v === "yes" || v === "on";
}

// Build config from environment
const config = {
  // Supabase
  SUPABASE_URL: process.env.REACT_APP_SUPABASE_URL || "",
  SUPABASE_ANON_KEY: process.env.REACT_APP_SUPABASE_ANON_KEY || "",

  // Endpoints
  API_BASE: process.env.REACT_APP_API_BASE || "",
  BACKEND_URL: process.env.REACT_APP_BACKEND_URL || "",
  FRONTEND_URL: process.env.REACT_APP_FRONTEND_URL || "",
  WS_URL: process.env.REACT_APP_WS_URL || "",

  // Environment and build flags
  NODE_ENV: process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV || "development",
  NEXT_TELEMETRY_DISABLED: toBool(process.env.REACT_APP_NEXT_TELEMETRY_DISABLED),
  ENABLE_SOURCE_MAPS: toBool(process.env.REACT_APP_ENABLE_SOURCE_MAPS),

  // Server/proxy
  PORT: process.env.REACT_APP_PORT || "3000",
  TRUST_PROXY: toBool(process.env.REACT_APP_TRUST_PROXY),

  // Logging/health
  LOG_LEVEL: process.env.REACT_APP_LOG_LEVEL || "info",
  HEALTHCHECK_PATH: process.env.REACT_APP_HEALTHCHECK_PATH || "/healthz",

  // Feature flags
  FEATURE_FLAGS: parseFeatureFlags(process.env.REACT_APP_FEATURE_FLAGS),
  EXPERIMENTS_ENABLED: toBool(process.env.REACT_APP_EXPERIMENTS_ENABLED),
};

// Validate critical variables in development only to avoid breaking build previews
(function validate() {
  const isDev = (config.NODE_ENV || "development") === "development";
  if (isDev) {
    const missing = [];
    if (!config.SUPABASE_URL) missing.push("REACT_APP_SUPABASE_URL");
    if (!config.SUPABASE_ANON_KEY) missing.push("REACT_APP_SUPABASE_ANON_KEY");
    if (missing.length) {
      // In development, be explicit to help setup
      // Throw to surface configuration issues early
      throw new Error(
        `Missing required environment variables: ${missing.join(
          ", "
        )}. Please set them in your environment or .env file.`
      );
    }
  } else {
    // In non-dev, warn but do not throw to allow static build environments
    if (!config.SUPABASE_URL || !config.SUPABASE_ANON_KEY) {
      // eslint-disable-next-line no-console
      console.warn(
        "Supabase configuration is missing. REACT_APP_SUPABASE_URL and/or REACT_APP_SUPABASE_ANON_KEY are not set."
      );
    }
  }
})();

// PUBLIC_INTERFACE
/**
 * Returns the immutable configuration object.
 * Consumers should import { env } and read properties as needed.
 */
export const env = Object.freeze(config);

// PUBLIC_INTERFACE
/**
 * Convenience helper to check if a feature flag is enabled.
 * @param {string} key - Feature flag name
 * @returns {boolean}
 */
export function isFeatureEnabled(key) {
  return Boolean(env.FEATURE_FLAGS?.[key]);
}

// PUBLIC_INTERFACE
/**
 * Convenience helper to check if experiments are enabled globally.
 * @returns {boolean}
 */
export function experimentsEnabled() {
  return Boolean(env.EXPERIMENTS_ENABLED);
}
