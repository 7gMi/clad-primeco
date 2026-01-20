import { useState } from 'react';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';

export type Page = 'home' | 'about' | 'contact' | 'services' | 'projects';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

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
