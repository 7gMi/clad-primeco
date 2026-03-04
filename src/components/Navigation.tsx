import { Page } from '../App';
import { prefetchPage } from '../App';
import { useState } from 'react';
import { Menu, X, Phone, Mail, ArrowRight } from 'lucide-react';

interface NavigationProps {
  onNavigate?: (page: Page) => void;
  isScrolled?: boolean;
  currentPage?: Page;
}

const navItems = [
  { label: 'Home',     page: 'home'     as Page, number: '01' },
  { label: 'About',    page: 'about'    as Page, number: '02' },
  { label: 'Services', page: 'services' as Page, number: '03' },
  { label: 'Projects', page: 'projects' as Page, number: '04' },
  { label: 'Contact',  page: 'contact'  as Page, number: '05' },
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
      {/* ── Desktop nav ── */}
      <nav className="hidden md:block">
        <ul className="flex gap-8 lg:gap-10">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => onNavigate?.(item.page)}
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

      {/* ── Hamburger toggle (always above overlay) ── */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className={`md:hidden z-[210] relative p-2 rounded-lg transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
          ${mobileMenuOpen ? 'text-white' : textColor}`}
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-menu"
      >
        <span
          className={`block transition-all duration-300 ${mobileMenuOpen ? 'rotate-90 opacity-100' : 'rotate-0 opacity-100'}`}
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </span>
      </button>

      {/* ── Backdrop ── */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] md:hidden
          transition-opacity duration-300
          ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* ── Slide-in panel ── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!mobileMenuOpen}
        className={`fixed top-0 right-0 h-full w-[82vw] max-w-[320px] bg-slate-900
          z-[205] md:hidden flex flex-col
          transition-transform duration-300 ease-in-out shadow-2xl
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Blue accent bar at top */}
        <div className="h-1 bg-blue-600 w-full flex-shrink-0" />

        {/* Brand header */}
        <div className="px-6 pt-6 pb-6 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-1">
            <span className="text-white font-bold text-2xl tracking-wide">CLAD</span>
            <span className="text-blue-500 font-bold text-2xl tracking-wide">PRIMECO</span>
          </div>
          <p className="text-white/40 text-xs tracking-widest uppercase mt-1 font-medium">
            Cladding Specialists
          </p>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavClick(item.page)}
                    onMouseEnter={() => prefetchPage(item.page)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl
                      transition-all duration-200 group text-left
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset
                      ${isActive
                        ? 'bg-blue-600/15 text-blue-400 border border-blue-500/20'
                        : 'text-white/70 hover:bg-white/5 hover:text-white border border-transparent'
                      }`}
                  >
                    <span className={`text-[10px] font-mono font-bold tracking-widest flex-shrink-0 ${
                      isActive ? 'text-blue-500' : 'text-white/25 group-hover:text-white/40'
                    }`}>
                      {item.number}
                    </span>
                    <span className="text-xl font-semibold tracking-tight flex-1">
                      {item.label}
                    </span>
                    <ArrowRight className={`w-4 h-4 flex-shrink-0 transition-all duration-200 ${
                      isActive
                        ? 'opacity-100 text-blue-400'
                        : 'opacity-0 group-hover:opacity-50 group-hover:translate-x-1'
                    }`} />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Contact footer */}
        <div className="px-6 py-5 border-t border-white/10 space-y-3 flex-shrink-0">
          <p className="text-white/30 text-[10px] tracking-widest uppercase font-semibold mb-4">
            Get in Touch
          </p>
          <a
            href="tel:0833468913"
            className="flex items-center gap-3 text-white/55 hover:text-white transition-colors duration-200 group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center
              group-hover:bg-blue-600/40 transition-colors duration-200 flex-shrink-0">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <span className="text-sm font-medium">083 346 8913</span>
          </a>
          <a
            href="mailto:cladprimeco@outlook.com"
            className="flex items-center gap-3 text-white/55 hover:text-white transition-colors duration-200 group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center
              group-hover:bg-blue-600/40 transition-colors duration-200 flex-shrink-0">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <span className="text-sm font-medium">cladprimeco@outlook.com</span>
          </a>
        </div>
      </div>
    </>
  );
}
