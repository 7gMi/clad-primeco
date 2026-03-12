import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          <a href="tel:+353833468913" className="hover:text-white transition-colors duration-200">083 346 8913</a>
          <a href="mailto:cladprimeco@outlook.com" className="hover:text-white transition-colors duration-200">cladprimeco@outlook.com</a>
          <Link to={ROUTES.PRIVACY} className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
        </div>
        <p className="text-sm md:text-base">
          &copy;2023-{new Date().getFullYear()} Clad Primeco Cladding and Roofing Specialists - Industrial Building Solutions. All rights reserved.
        </p>
        <p className="text-xs text-gray-500">
          Site by{' '}
          <a
            href="https://mihaigaina.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            Mihai Gaïna
          </a>
        </p>
      </div>
    </footer>
  );
}
