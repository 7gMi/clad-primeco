import { useState } from 'react';

interface HeroCardProps {
  tagline: string;
  title: string;
  subtitle: string;
}

export default function HeroCard({ tagline, title, subtitle }: HeroCardProps) {
  const [activeButton, setActiveButton] = useState<'projects' | 'quote'>('projects');

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
          onClick={() => setActiveButton('projects')}
          className={`border-2 px-8 py-4 rounded-3xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap focus:outline-none focus:ring-0 ${
            activeButton === 'projects'
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'bg-transparent hover:bg-white/10 border-white text-white'
          }`}
        >
          Our Projects
        </button>
        <button
          onClick={() => setActiveButton('quote')}
          className={`border-2 px-8 py-4 rounded-3xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap focus:outline-none focus:ring-0 ${
            activeButton === 'quote'
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'bg-transparent hover:bg-white/10 border-white text-white'
          }`}
        >
          Free Consultation
        </button>
      </div>
    </div>
  );
}
