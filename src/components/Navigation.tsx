import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Mail, ArrowRight } from 'lucide-react';
import { ROUTES, prefetchRoute } from '../constants/routes';

interface NavigationProps {
  isScrolled?: boolean;
  currentPath?: string;
}

const navItems = [
  { label: 'Home', path: ROUTES.HOME, number: '01' },
  { label: 'About', path: ROUTES.ABOUT, number: '02' },
  { label: 'Services', path: ROUTES.SERVICES, number: '03' },
  { label: 'Projects', path: ROUTES.PROJECTS, number: '04' },
  { label: 'Contact', path: ROUTES.CONTACT, number: '05' },
];

export default function Navigation({ isScrolled = false, currentPath }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath?.startsWith(path) ?? false;
  };

  // C3+C4: Escape key + body scroll lock (iOS Safari compatible)
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        hamburgerRef.current?.focus();
        return;
      }

      if (e.key === 'Tab' && panelRef.current) {
        const focusable = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
          ),
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    const firstFocusable = panelRef.current?.querySelector<HTMLElement>(
      'button:not([disabled]), a[href]',
    );
    firstFocusable?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      const savedY = parseInt(document.body.style.top || '0') * -1;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, savedY);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!panelRef.current) return;
    if (mobileMenuOpen) {
      panelRef.current.removeAttribute('inert');
      // Prefetch top routes when mobile menu opens (no hover on touch)
      prefetchRoute(ROUTES.CONTACT);
      prefetchRoute(ROUTES.SERVICES);
      prefetchRoute(ROUTES.PROJECTS);
    } else {
      panelRef.current.setAttribute('inert', '');
    }
  }, [mobileMenuOpen]);

  return (
    <>
      {/* -- Desktop nav -- */}
      <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1 lg:gap-2">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.label}
              to={item.path}
              onMouseEnter={() => prefetchRoute(item.path)}
              onFocus={() => prefetchRoute(item.path)}
              aria-current={active ? 'page' : undefined}
              className={`relative px-3 lg:px-4 py-2 text-[14px] lg:text-[15px] font-medium tracking-wide transition-colors duration-200 rounded-md
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1
                ${
                  isScrolled
                    ? active
                      ? 'text-[#1B3564] bg-slate-100'
                      : 'text-slate-700 hover:text-[#1B3564] hover:bg-slate-50'
                    : active
                      ? 'text-white bg-white/15'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                }
              `}
            >
              {item.label}
              {active && (
                <span
                  className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full ${
                    isScrolled ? 'bg-[#1B3564]' : 'bg-white'
                  }`}
                />
              )}
            </Link>
          );
        })}

        {/* CTA button in desktop nav */}
        <button
          onClick={() => navigate(ROUTES.CONTACT, { state: { scrollToForm: true } })}
          onMouseEnter={() => prefetchRoute(ROUTES.CONTACT)}
          className={`ml-2 lg:ml-4 px-5 py-2 text-[13px] lg:text-[14px] font-semibold rounded-md transition-all duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
            ${
              isScrolled
                ? 'bg-[#1B3564] text-white hover:bg-[#152a50] shadow-sm'
                : 'bg-white text-[#1B3564] hover:bg-white/90 shadow-sm'
            }
          `}
        >
          Get a Quote
        </button>
      </nav>

      {/* -- Hamburger -- */}
      <button
        ref={hamburgerRef}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className={`md:hidden fixed top-[14px] right-4 z-[210] p-2.5 rounded-lg transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
          ${
            mobileMenuOpen
              ? 'text-white'
              : isScrolled
                ? 'text-slate-800 hover:bg-slate-100'
                : 'text-white hover:bg-white/10'
          }`}
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-menu"
      >
        <span
          className={`block transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : 'rotate-0'}`}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" aria-hidden="true" />
          ) : (
            <Menu className="w-6 h-6" aria-hidden="true" />
          )}
        </span>
      </button>

      {/* -- Backdrop -- */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] md:hidden
          transition-opacity duration-300
          ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* -- Slide-in panel -- */}
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!mobileMenuOpen}
        className={`fixed top-0 right-0 h-screen w-[85vw] max-w-[340px] bg-slate-900
          z-[205] md:hidden flex flex-col
          transition-transform duration-300 ease-in-out shadow-2xl
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="h-1 bg-[#1B3564] w-full flex-shrink-0" />

        <div className="px-6 pt-6 pb-6 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-1">
            <span className="text-white font-bold text-2xl tracking-wide">CLAD</span>
            <span className="text-blue-500 font-bold text-2xl tracking-wide">PRIMECO</span>
          </div>
          <p className="text-white/40 text-xs tracking-widest uppercase mt-1 font-medium text-left">
            Cladding and Roofing Bespoke Specialists
          </p>
        </div>

        <nav aria-label="Mobile navigation" className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`w-full flex items-center justify-start gap-4 px-4 py-4 rounded-xl
                      transition-all duration-200 group
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset
                      ${
                        active
                          ? 'bg-blue-600/15 text-blue-400 border border-blue-500/20'
                          : 'text-white/70 hover:bg-white/5 hover:text-white border border-transparent'
                      }`}
                  >
                    <span
                      className={`text-[10px] font-mono font-bold tracking-widest flex-shrink-0 ${
                        active ? 'text-blue-500' : 'text-white/25 group-hover:text-white/40'
                      }`}
                    >
                      {item.number}
                    </span>
                    <span className="text-xl font-semibold tracking-tight flex-1 text-left">
                      {item.label}
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className={`w-4 h-4 flex-shrink-0 transition-all duration-200 ${
                        active
                          ? 'opacity-100 text-blue-400'
                          : 'opacity-0 group-hover:opacity-50 group-hover:translate-x-1'
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="px-6 py-5 border-t border-white/10 space-y-3 flex-shrink-0">
          <p className="text-white/30 text-[10px] tracking-widest uppercase font-semibold mb-4">
            Get in Touch
          </p>
          <a
            href="tel:+353833468913"
            className="flex items-center justify-start gap-3 text-white/55 hover:text-white transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:rounded-lg"
          >
            <div
              className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center
              group-hover:bg-blue-600/40 transition-colors duration-200 flex-shrink-0"
            >
              <Phone aria-hidden="true" className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <span className="text-sm font-medium">083 346 8913</span>
          </a>
          <a
            href="mailto:cladprimeco@outlook.com"
            className="flex items-center justify-start gap-3 text-white/55 hover:text-white transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:rounded-lg"
          >
            <div
              className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center
              group-hover:bg-blue-600/40 transition-colors duration-200 flex-shrink-0"
            >
              <Mail aria-hidden="true" className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <span className="text-sm font-medium">cladprimeco@outlook.com</span>
          </a>
        </div>
      </div>
    </>
  );
}
