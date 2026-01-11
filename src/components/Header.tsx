import { useEffect, useState } from 'react';
import Navigation from './Navigation';
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] px-4 sm:px-6 md:px-12 lg:px-16 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg py-2 sm:py-3'
          : 'bg-gradient-to-b from-black/60 via-black/30 to-transparent pt-2 md:pt-3 pb-3 sm:pb-4'
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="logo-container cursor-pointer" onClick={() => onNavigate?.('home')}>
          <picture>
            <source media="(min-width: 1024px)" srcSet="/images/logo/logo-desktop.png" />
            <source media="(min-width: 768px)" srcSet="/images/logo/logo-tab.png" />
            <img
              src="/images/logo/logo-mobile.png"
              alt="Company Logo"
              className={`h-auto transition-all duration-300 ${
                isScrolled
                  ? 'w-[80px] sm:w-[100px] md:w-[120px] lg:w-[180px]'
                  : 'w-[120px] sm:w-[140px] md:w-[160px] lg:w-[300px]'
              }`}
            />
          </picture>
          {!isScrolled && (
            <p
              className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] mt-1 tracking-wide text-white transition-all duration-300 hidden sm:block"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              CLADDING PROFESSIONALS
            </p>
          )}
        </div>

        <Navigation onNavigate={onNavigate} isScrolled={isScrolled} />
      </div>
    </header>
  );
}
