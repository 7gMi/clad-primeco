import { StrictMode } from 'react';
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
  LazyAdminLogin,
  LazyAdminDashboard,
} from './App';
import AdminGuard from './components/admin/AdminGuard';
import './index.css';

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
    ],
  },
  {
    path: 'admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminGuard /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
