import { useState, useEffect } from 'react';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import { useAuth } from './hooks/useAuth';

export type Page = 'home' | 'about' | 'contact' | 'services' | 'projects' | 'admin';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { session, loading, logout } = useAuth();

  useEffect(() => {
    if (window.location.hash === '#admin') {
      setCurrentPage('admin');
    }
  }, []);

  if (currentPage === 'admin') {
    if (loading) return null;
    if (!session) return <AdminLogin />;
    return <AdminDashboard session={session} onLogout={logout} />;
  }

  return (
    <>
      {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
      {currentPage === 'about' && <About onNavigate={setCurrentPage} />}
      {currentPage === 'services' && <Services onNavigate={setCurrentPage} />}
      {currentPage === 'projects' && <Projects onNavigate={setCurrentPage} />}
      {currentPage === 'contact' && <Contact onNavigate={setCurrentPage} />}
    </>
  );
}

export default App;
