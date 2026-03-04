import { Page } from '../App';
import { Phone, Mail, Instagram } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const navLinks: { label: string; page: Page }[] = [
  { label: 'Home', page: 'home' },
  { label: 'About', page: 'about' },
  { label: 'Services', page: 'services' },
  { label: 'Projects', page: 'projects' },
  { label: 'Contact', page: 'contact' },
];

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Identité */}
          <div>
            <picture>
              <source media="(min-width: 1024px)" srcSet="/images/logo/logo-desktop.png" />
              <source media="(min-width: 768px)" srcSet="/images/logo/logo-tab.png" />
              <img
                src="/images/logo/logo-mobile.png"
                alt="Clad-Primeco"
                className="h-10 w-auto mb-4 brightness-0 invert"
              />
            </picture>
            <p className="text-slate-400 text-sm leading-relaxed">
              Professional cladding and roofing specialists based in Dublin, Ireland.
              Quality craftsmanship for industrial and commercial projects.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-300 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map(({ label, page }) => (
                <li key={page}>
                  <button
                    onClick={() => onNavigate(page)}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-300 mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:0833468913"
                  className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  083 346 8913
                </a>
              </li>
              <li>
                <a
                  href="mailto:cladprimeco@outlook.com"
                  className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  cladprimeco@outlook.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/cladprimeco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm"
                >
                  <Instagram className="w-4 h-4 flex-shrink-0" />
                  @cladprimeco
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-slate-500 text-xs">© 2026 Clad-Primeco. All rights reserved.</p>
          <p className="text-slate-600 text-xs">Dublin, Ireland</p>
        </div>
      </div>
    </footer>
  );
}
