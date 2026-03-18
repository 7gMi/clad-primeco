import { lazy, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  Layout,
  AdminLayout,
  LazyHome,
  LazyAbout,
  LazyServices,
  LazyProjects,
  LazyContact,
  LazyPrivacyPolicy,
  LazyNotFound,
} from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

// Lazy-load admin — keeps Supabase out of the main bundle
// and prevents app crash when env vars are missing (CI).
const LazyAdminGuard = lazy(() => import('./components/admin/AdminGuard'));

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <LazyHome /> },
      { path: 'about', element: <LazyAbout /> },
      { path: 'services', element: <LazyServices /> },
      { path: 'services/:serviceType', element: <LazyServices /> },
      { path: 'projects', element: <LazyProjects /> },
      { path: 'projects/:projectId', element: <LazyProjects /> },
      { path: 'contact', element: <LazyContact /> },
      { path: 'privacy-policy', element: <LazyPrivacyPolicy /> },
      { path: '*', element: <LazyNotFound /> },
    ],
  },
  {
    path: 'admin',
    element: <AdminLayout />,
    children: [{ index: true, element: <LazyAdminGuard /> }],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
);
