import { Page } from '../App';
import { prefetchPage } from '../App';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  onNavigate?: (page: Page) => void;
  isScrolled?: boolean;
  currentPage?: Page;
}

const navItems = [
  { label: 'Home', page: 'home' as Page },
  { label: 'About', page: 'about' as Page },
  { label: 'Services', page: 'services' as Page },
  { label: 'Projects', page: 'projects' as Page },
  { label: 'Contact', page: 'contact' as Page }
];

export default function Navigation({ onNavigate, isScrolled, currentPage }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const textColor = isScrolled ? 'text-slate-900' : 'text-white';
  const hoverColor = isScrolled ? 'hover:text-blue-600' : 'hover:text-blue-400';

  const handleNavClick = (page?: Page) => {
    if (page) onNavigate?.(page);
    setMobileMenuOpen(false);
  };

  const getActiveClass = (page: Page): string => {
    if (currentPage !== page) return '';
    return isScrolled
      ? 'text-blue-600 border-b-2 border-blue-600 pb-0.5'
      : 'text-blue-400 border-b-2 border-blue-400 pb-0.5';
  };

  return (
    <>
      <nav className="hidden md:block">
        <ul className="flex gap-8 lg:gap-10">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => onNavigate?.(item.page)}
                // PERFORMANCE: prefetch the page chunk when the user hovers
                // or focuses the nav link. By the time they click, the JS chunk
                // will already be in the browser cache, eliminating the Suspense
                // fallback flash (~200-600ms saving on slow connections).
                onMouseEnter={() => prefetchPage(item.page)}
                onFocus={() => prefetchPage(item.page)}
                aria-current={currentPage === item.page ? 'page' : undefined}
                className={`${textColor} ${hoverColor} ${getActiveClass(item.page)} text-[14px] md:text-[16px] lg:text-[18px] transition-colors duration-300 font-medium`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className={`md:hidden ${textColor} z-50 relative p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1`}
        aria-label="Toggle menu"
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
      </button>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-lg z-40 md:hidden">
          <nav className="flex items-center justify-center h-full">
            <ul className="flex flex-col items-center gap-8">
              {navItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavClick(item.page)}
                    aria-current={currentPage === item.page ? 'page' : undefined}
                    className={`text-2xl font-medium transition-colors duration-300 ${
                      currentPage === item.page
                        ? 'text-blue-400 border-b-2 border-blue-400 pb-1'
                        : 'text-white hover:text-blue-400'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
