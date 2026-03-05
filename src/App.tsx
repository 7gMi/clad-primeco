import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import FloatingCTA from './components/FloatingCTA';
import ScrollToTop from './components/ScrollToTop';

// Lazy-loaded page components — each produces a separate JS chunk.
export const LazyHome = lazy(() => import('./components/Home'));
export const LazyAbout = lazy(() => import('./components/About'));
export const LazyServices = lazy(() => import('./components/Services'));
export const LazyProjects = lazy(() => import('./components/Projects'));
export const LazyContact = lazy(() => import('./components/Contact'));
export const LazyPrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
export const LazyNotFound = lazy(() => import('./components/NotFound'));
export const LazyAdminLogin = lazy(() => import('./components/admin/AdminLogin'));
export const LazyAdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-8 h-8 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
    </div>
  );
}

/** Main layout — wraps all public pages with FloatingCTA + scroll management. */
export function Layout() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ScrollToTop />
      <Outlet />
      <FloatingCTA />
    </Suspense>
  );
}

/** Admin layout — no header, no FloatingCTA. */
export function AdminLayout() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  );
}

export default Layout;
