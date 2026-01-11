import { useState } from 'react';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';

export type Page = 'home' | 'about' | 'contact';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  return (
    <>
      {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
      {currentPage === 'about' && <About onNavigate={setCurrentPage} />}
      {currentPage === 'contact' && <Contact onNavigate={setCurrentPage} />}
    </>
  );
}

export default App;
