import { useEffect, useState } from 'react';
import Navigation from './Navigation';
import Logo from './Logo';
import { Page } from '../App';

interface HeaderProps {
  onNavigate?: (page: Page) => void;
  currentPage?: Page;
}

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] px-4 sm:px-6 md:px-12 lg:px-16 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-2 sm:py-3 border-b border-slate-100'
          : 'bg-gradient-to-b from-black/60 via-black/30 to-transparent pt-2 md:pt-3 pb-3 sm:pb-4'
      }`}
    >
      <div className="flex justify-between items-center">
        <button className="logo-container cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded" onClick={() => onNavigate?.('home')} aria-label="Go to homepage">
          <div className={`transition-all duration-300 rounded-lg flex items-center gap-3 ${
            isScrolled ? '' : 'bg-white/95 px-3 py-2 shadow-sm'
          }`}>
            <Logo
              className={`h-auto transition-all duration-300 block flex-shrink-0 ${
                isScrolled
                  ? 'w-[80px] sm:w-[100px] md:w-[120px] lg:w-[180px]'
                  : 'w-[80px] sm:w-[90px] md:w-[110px] lg:w-[140px]'
              }`}
            />
            {!isScrolled && (
              <p
                className="text-[9px] sm:text-[10px] md:text-[11px] lg:text-[13px] tracking-widest text-slate-700 font-semibold leading-tight border-l border-slate-300 pl-3"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                CLADDING<br />AND ROOFING<br />SPECIALISTS
              </p>
            )}
          </div>
        </button>

        <Navigation onNavigate={onNavigate} isScrolled={isScrolled} currentPage={currentPage} />
      </div>
    </header>
  );
}
