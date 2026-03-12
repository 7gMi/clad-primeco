import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center space-y-2">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          <a href="tel:+353833468913" className="hover:text-white transition-colors duration-200">083 346 8913</a>
          <a href="mailto:cladprimeco@outlook.com" className="hover:text-white transition-colors duration-200">cladprimeco@outlook.com</a>
          <Link to={ROUTES.PRIVACY} className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
        </div>
        <p className="text-sm md:text-base">
          &copy;2023-{new Date().getFullYear()} Clad Primeco Cladding and Roofing Specialists - Industrial Building Solutions. All rights reserved.
        </p>
      </div>

      {/* Creator banner */}
      <div className="border-t border-gray-800/60">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <a
            href="https://mihaigaina.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 text-xs text-gray-500 transition-all duration-300 hover:text-gray-300"
          >
            <span className="inline-block h-px w-6 bg-gray-700 transition-all duration-300 group-hover:w-10 group-hover:bg-blue-500" />
            <span>
              Designed & built by{' '}
              <span className="font-medium text-gray-400 transition-colors duration-300 group-hover:text-blue-400">
                Mihai Gaïna
              </span>
            </span>
            <span className="text-gray-600 transition-all duration-300 group-hover:text-blue-400 group-hover:translate-x-0.5">
              &rarr;
            </span>
            <span className="inline-block h-px w-6 bg-gray-700 transition-all duration-300 group-hover:w-10 group-hover:bg-blue-500" />
          </a>
          <p className="mt-1 text-center text-[10px] text-gray-600 transition-colors duration-300">
            Need a website for your business?{' '}
            <a
              href="https://mihaigaina.dev/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors duration-200 hover:text-blue-400"
            >
              Get in touch
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
