import { MessageSquare } from 'lucide-react';
import { Page } from '../App';

interface FloatingCTAProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function FloatingCTA({ currentPage, onNavigate }: FloatingCTAProps) {
  if (currentPage === 'contact' || currentPage === 'admin') return null;

  return (
    <button
      onClick={() => onNavigate('contact')}
      className="fixed bottom-6 right-6 z-[200] flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label="Get a free quote"
    >
      <MessageSquare className="w-4 h-4" />
      <span className="hidden sm:inline">Get a Quote</span>
    </button>
  );
}
