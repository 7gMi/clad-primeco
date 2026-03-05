import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden flex flex-col">
      <main className="flex-1 flex items-center justify-center pt-20 pb-20 px-4">
        <div className="text-center max-w-md">
          <p className="text-7xl font-bold text-blue-600 mb-4">404</p>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">Page not found</h1>
          <p className="text-slate-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to={ROUTES.HOME}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
