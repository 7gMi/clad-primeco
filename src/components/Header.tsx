import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Logo from './Logo';
import { ROUTES } from '../constants/routes';

interface HeaderProps {
  /** When true, the header starts transparent over the hero slider. */
  isHomePage?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Header({ isHomePage = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const showTransparent = !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-in-out ${
        showTransparent
          ? 'bg-gradient-to-b from-black/50 via-black/20 to-transparent'
          : 'bg-white/95 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.08)] border-b border-slate-200/60'
      }`}
    >
      <div
        className={`h-[2px] w-full transition-colors duration-300 ${
          showTransparent ? 'bg-transparent' : 'bg-[#1B3564]'
        }`}
      />

      <div
        className={`mx-auto flex items-center justify-between transition-all duration-300 ease-in-out px-4 sm:px-6 md:px-10 lg:px-16 ${
          showTransparent ? 'py-2 md:py-3 max-w-full' : 'py-1.5 md:py-2 max-w-full'
        }`}
      >
        <button
          className="group flex items-center gap-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md"
          onClick={() => navigate(ROUTES.HOME)}
          aria-label="Go to homepage"
        >
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

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                showTransparent ? 'max-w-[200px] opacity-100 ml-0' : 'max-w-0 opacity-0 ml-0'
              }`}
            >
              <p
                className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[12px] tracking-[0.15em] text-[#1B3564] font-semibold leading-tight border-l-2 border-[#1B3564]/30 pl-3 whitespace-nowrap"
                style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif" }}
              >
                CLADDING
                <br />
                AND ROOFING
                <br />
                SPECIALISTS
              </p>
            </div>
          </div>
        </button>

        <Navigation isScrolled={!showTransparent} currentPath={pathname} />
      </div>
    </header>
  );
}
