/// Roles and authorization helpers
/// PUBLIC_INTERFACE
/**
 * Role utilities to standardize role checks across app.
 */
export const ROLES = Object.freeze({
  ADMIN: 'admin',
  USER: 'user',
});

// PUBLIC_INTERFACE
export function getUserRole(user) {
  return (
    user?.app_metadata?.role ||
    user?.user_metadata?.role ||
    ROLES.USER
  );
}

// PUBLIC_INTERFACE
export function hasRole(user, allowed = [ROLES.USER]) {
  const role = String(getUserRole(user));
  return allowed.map(String).includes(role);
}
