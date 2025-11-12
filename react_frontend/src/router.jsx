import React, { Suspense, lazy, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Loader from './components/common/Loader';
import ErrorBoundary from './components/common/ErrorBoundary';
import { AuthGuard } from './components/auth/AuthGuard';
import { RoleGuard } from './components/auth/RoleGuard';
import { env } from './config/env';

// Lazy load basic page components (placeholder pages for now)
const Dashboard = lazy(() => Promise.resolve({ default: () => <div>Dashboard</div> }));
const Resources = lazy(() => Promise.resolve({ default: () => <div>Resources</div> }));
const ResourceDetail = lazy(() => Promise.resolve({ default: () => <div>Resource Detail</div> }));
const Monitoring = lazy(() => Promise.resolve({ default: () => <div>Monitoring</div> }));
const Notifications = lazy(() => Promise.resolve({ default: () => <div>Notifications</div> }));
const Billing = lazy(() => Promise.resolve({ default: () => <div>Billing</div> }));
const Admin = lazy(() => Promise.resolve({ default: () => <div>Admin</div> }));
const AuthRoutes = lazy(() => Promise.resolve({
  default: function AuthContainer() {
    return (
      <div style={{ padding: 24 }}>
        <h2>Auth</h2>
        <p>Public auth pages placeholder (sign in/up, magic link, reset password).</p>
      </div>
    );
  },
}));

/**
 * Compute health path based on environment variable with default.
 * REACT_APP_HEALTHCHECK_PATH if set, else '/health'
 */
function useHealthPath() {
  return useMemo(() => {
    const p = env.HEALTHCHECK_PATH || '/health';
    // normalize: ensure leading slash
    return p.startsWith('/') ? p : `/${p}`;
  }, []);
}

// PUBLIC_INTERFACE
export default function AppRouter() {
  const healthPath = useHealthPath();

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader label="Loading..." />}>
        <Routes>
          {/* Health route - publicly accessible */}
          <Route
            path={healthPath}
            element={<div style={{ padding: 16 }}>ok</div>}
          />

          {/* Public auth area */}
          <Route path="/auth/*" element={<AuthRoutes />} />

          {/* Protected area */}
          <Route
            path="/"
            element={
              <AuthGuard>
                <MainLayout />
              </AuthGuard>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="resources" element={<Resources />} />
            <Route path="resources/:id" element={<ResourceDetail />} />
            <Route path="monitoring" element={<Monitoring />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="billing" element={<Billing />} />
            <Route
              path="admin"
              element={
                <RoleGuard allow={['admin']}>
                  <Admin />
                </RoleGuard>
              }
            />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
