import React, { Suspense, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Loader from './components/common/Loader';
import ErrorBoundary from './components/common/ErrorBoundary';
import { AuthGuard } from './components/auth/AuthGuard';
import { RoleGuard } from './components/auth/RoleGuard';
import { env } from './config/env';
import AuthRoutes from './pages/auth';

// App pages
import Dashboard from './pages/Dashboard';
import ResourceList from './pages/resources/ResourceList';
import ResourceCreate from './pages/resources/ResourceCreate';
import ResourceDetail from './pages/resources/ResourceDetail';
import Monitoring from './pages/Monitoring';
import Notifications from './pages/Notifications';
import Billing from './pages/Billing';
import Admin from './pages/admin';

/**
 * Compute health path based on environment variable with default.
 * REACT_APP_HEALTHCHECK_PATH if set, else '/health'
 */
function useHealthPath() {
  return useMemo(() => {
    const p = env.HEALTHCHECK_PATH || '/health';
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
          <Route path={healthPath} element={<div style={{ padding: 16 }}>ok</div>} />

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

            {/* Resources */}
            <Route path="resources" element={<ResourceList />} />
            <Route path="resources/create" element={<ResourceCreate />} />
            <Route path="resources/:id" element={<ResourceDetail />} />

            {/* Other main sections */}
            <Route path="monitoring" element={<Monitoring />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="billing" element={<Billing />} />

            {/* Admin (role-restricted) */}
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
