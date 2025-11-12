# Supabase Integration Notes

This frontend integrates with Supabase for authentication and realtime using `@supabase/supabase-js` v2.

## Environment Variables (set in .env)

- REACT_APP_SUPABASE_URL
- REACT_APP_SUPABASE_ANON_KEY
- REACT_APP_FRONTEND_URL (used as SITE_URL for email redirects)
- Other optional variables documented in src/config/env.js

Do not commit secrets. The CI/CD will inject environment variables. For local development, create a `.env` file in the `react_frontend` root with the above variables.

Example (.env.example):
```
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGci...
REACT_APP_FRONTEND_URL=http://localhost:3000
```

## Email Redirects

- Sign-up verification: `emailRedirectTo` is set to `${REACT_APP_FRONTEND_URL}/auth/callback`
- Password reset: `redirectTo` is set to `${REACT_APP_FRONTEND_URL}/auth/callback`

Ensure `REACT_APP_FRONTEND_URL` matches the deployed site URL for production.

## Auth Flow

- Zustand store in `src/store/useAuthStore.js` tracks session and exposes actions.
- Hook `useSupabaseAuth()` initializes the store and exposes state/actions.
- Guards `AuthGuard` and `RoleGuard` enforce authentication and authorization.
- Auth routes under `/auth/*`:
  - `/auth/sign-in`
  - `/auth/sign-up`
  - `/auth/forgot-password`
  - `/auth/verify-email` (informational)
  - `/auth/callback` (handles email verification and password recovery)

## Session Handling

- `supabase-js` auto-detects the session in URL.
- The store subscribes to `onAuthStateChange` to react to sign-in/out across tabs.
- `persistSession: true` and `autoRefreshToken: true` are configured.

