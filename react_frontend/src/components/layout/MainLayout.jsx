import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';
import Sidebar from './Sidebar';
import ErrorBoundary from '../common/ErrorBoundary';
import Loader from '../common/Loader';

/**
 * Main layout shell with top navigation and collapsible sidebar.
 */
export default function MainLayout() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <TopNav />
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', alignItems: 'stretch' }}>
        <Sidebar />
        <main
          style={{
            padding: 16,
            minHeight: 'calc(100vh - 56px)',
          }}
          role="main"
        >
          <ErrorBoundary>
            <React.Suspense fallback={<Loader label="Loading content..." />}>
              <Outlet />
            </React.Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
