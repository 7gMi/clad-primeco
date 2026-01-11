import { Page } from '../App';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-slate-900/95 backdrop-blur-sm text-white shadow-lg">
      <div className="container mx-auto px-4 py-1.5">
        <div className="flex flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-4 md:gap-6">
            <button
              onClick={() => onNavigate('home')}
              className="text-gray-300 hover:text-white transition-colors text-xs font-medium"
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="text-gray-300 hover:text-white transition-colors text-xs font-medium"
            >
              About
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="text-gray-300 hover:text-white transition-colors text-xs font-medium"
            >
              Contact
            </button>
          </div>

          <div className="text-gray-400 text-xs hidden sm:block">
            © 2025 Clad-Primeco
          </div>
        </div>
      </div>
    </footer>
  );
}
