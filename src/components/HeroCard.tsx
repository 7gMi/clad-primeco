import { Page } from '../App';

interface HeroCardProps {
  tagline: string;
  title: string;
  subtitle: string;
  onNavigate: (page: Page) => void;
}

export default function HeroCard({ tagline, title, subtitle, onNavigate }: HeroCardProps) {
  return (
    <div className="hero-card max-w-4xl">
      <p className="text-blue-400 text-sm md:text-base lg:text-lg mb-4 font-medium tracking-wider uppercase">
        {tagline}
      </p>

      <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
        {title}
      </h1>

      <h2 className="text-gray-200 text-base md:text-lg lg:text-xl mb-8 md:mb-10 leading-relaxed max-w-3xl">
        {subtitle}
      </h2>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => onNavigate('projects')}
          className="bg-blue-600 border-2 border-blue-600 text-white px-8 py-4 rounded-3xl text-lg font-semibold transition-all duration-300 hover:bg-blue-700 hover:border-blue-700 hover:scale-105 shadow-lg whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent"
        >
          Our Projects
        </button>
        <button
          onClick={() => onNavigate('contact')}
          className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-3xl text-lg font-semibold transition-all duration-300 hover:bg-white/10 hover:scale-105 shadow-lg whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
        >
          Free Consultation
        </button>
      </div>
    </div>
  );
}
