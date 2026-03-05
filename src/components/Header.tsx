import { useEffect, useState, useCallback } from 'react';
import Navigation from './Navigation';
import Logo from './Logo';
import { Page } from '../App';

interface HeaderProps {
  onNavigate?: (page: Page) => void;
  currentPage?: Page;
  /**
   * When true, the header starts transparent over the hero slider and
   * listens to the `.home-scroll-container` for scroll events instead of
   * `window`. Used only on the Home page.
   */
  isHomePage?: boolean;
}

export default function Header({ onNavigate, currentPage, isHomePage = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    if (isHomePage) {
      const container = document.querySelector('.home-scroll-container');
      if (container) setIsScrolled(container.scrollTop > 50);
    } else {
      setIsScrolled(window.scrollY > 50);
    }
  }, [isHomePage]);

  useEffect(() => {
    if (isHomePage) {
      const container = document.querySelector('.home-scroll-container');
      if (container) {
        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => container.removeEventListener('scroll', handleScroll);
      }
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isHomePage, handleScroll]);

  // All pages have a hero section with a background image, so the header
  // starts transparent and transitions to white on scroll.
  const showTransparent = !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-in-out ${
        showTransparent
          ? 'bg-gradient-to-b from-black/50 via-black/20 to-transparent'
          : 'bg-white/95 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.08)] border-b border-slate-200/60'
      }`}
    >
      {/* Top accent line -- brand navy, visible in both states */}
      <div
        className={`h-[2px] w-full transition-colors duration-300 ${
          showTransparent ? 'bg-transparent' : 'bg-[#1B3564]'
        }`}
      />

      <div
        className={`mx-auto flex items-center justify-between transition-all duration-300 ease-in-out px-4 sm:px-6 md:px-10 lg:px-16 ${
          showTransparent
            ? 'py-2 md:py-3 max-w-full'
            : 'py-1.5 md:py-2 max-w-full'
        }`}
      >
        {/* Logo area */}
        <button
          className="group flex items-center gap-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md"
          onClick={() => onNavigate?.('home')}
          aria-label="Go to homepage"
        >
          {/* Logo card -- white card only in transparent state for contrast */}
          <div
            className={`flex items-center transition-all duration-300 ease-in-out rounded-md ${
              showTransparent
                ? 'bg-white/95 shadow-sm px-2.5 py-1.5 gap-2.5'
                : 'bg-transparent px-0 py-0 gap-2'
            }`}
          >
            <Logo
              className={`h-auto block flex-shrink-0 transition-all duration-300 ease-in-out ${
                showTransparent
                  ? 'w-[60px] sm:w-[70px] md:w-[80px] lg:w-[100px]'
                  : 'w-[60px] sm:w-[70px] md:w-[80px] lg:w-[110px]'
              }`}
            />

            {/* Tagline -- always rendered for smooth transitions, hidden via opacity + max-width */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                showTransparent
                  ? 'max-w-[200px] opacity-100 ml-0'
                  : 'max-w-0 opacity-0 ml-0'
              }`}
            >
              <p
                className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[12px] tracking-[0.15em] text-[#1B3564] font-semibold leading-tight border-l-2 border-[#1B3564]/30 pl-3 whitespace-nowrap"
                style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif" }}
              >
                CLADDING<br />AND ROOFING<br />SPECIALISTS
              </p>
            </div>
          </div>
        </button>

        {/* Desktop navigation + mobile hamburger */}
        <Navigation
          onNavigate={onNavigate}
          isScrolled={!showTransparent}
          currentPage={currentPage}
        />
      </div>
    </header>
  );
}
