import { useState, useEffect, lazy, Suspense } from 'react';
import Home from './components/Home';
import { useAuth } from './hooks/useAuth';

export type Page = 'home' | 'about' | 'contact' | 'services' | 'projects' | 'admin';

const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const AdminLogin = lazy(() => import('./components/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-8 h-8 border-2 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
    </div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { session, loading, logout } = useAuth();

  useEffect(() => {
    if (window.location.hash === '#admin') {
      setCurrentPage('admin');
    }
  }, []);

  if (currentPage === 'admin') {
    if (loading) return <PageLoader />;
    return (
      <Suspense fallback={<PageLoader />}>
        {!session ? <AdminLogin /> : <AdminDashboard session={session} onLogout={logout} />}
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<PageLoader />}>
      {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
      {currentPage === 'about' && <About onNavigate={setCurrentPage} />}
      {currentPage === 'services' && <Services onNavigate={setCurrentPage} />}
      {currentPage === 'projects' && <Projects onNavigate={setCurrentPage} />}
      {currentPage === 'contact' && <Contact onNavigate={setCurrentPage} />}
    </Suspense>
  );
}

export default App;
