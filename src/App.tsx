import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import Home from './components/Home';
import FloatingCTA from './components/FloatingCTA';
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
  const [displayedPage, setDisplayedPage] = useState<Page>('home');
  const [isVisible, setIsVisible] = useState(true);
  const { session, loading, logout } = useAuth();

  useEffect(() => {
    if (window.location.hash === '#admin') {
      setCurrentPage('admin');
      setDisplayedPage('admin');
    }
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    if (displayedPage === 'home') {
      const container = document.querySelector('.home-scroll-container');
      container?.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [displayedPage]);

  const handleNavigate = useCallback((page: Page) => {
    if (page === displayedPage) return;
    setCurrentPage(page);
    setIsVisible(false);
    setTimeout(() => {
      setDisplayedPage(page);
      setIsVisible(true);
    }, 200);
  }, [displayedPage]);

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
      <div className={`transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {displayedPage === 'home' && <Home onNavigate={handleNavigate} />}
        {displayedPage === 'about' && <About onNavigate={handleNavigate} />}
        {displayedPage === 'services' && <Services onNavigate={handleNavigate} />}
        {displayedPage === 'projects' && <Projects onNavigate={handleNavigate} />}
        {displayedPage === 'contact' && <Contact onNavigate={handleNavigate} />}
      </div>
      <FloatingCTA currentPage={displayedPage} onNavigate={handleNavigate} />
    </Suspense>
  );
}

export default App;
