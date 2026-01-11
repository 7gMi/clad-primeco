import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Page } from '../App';

interface PresentationProps {
  onNavigate: (page: Page) => void;
}

interface PresentationSlide {
  id: number;
  type: 'title' | 'content' | 'image' | 'split' | 'conclusion';
  title?: string;
  subtitle?: string;
  content?: string[];
  image?: string;
  imageLeft?: string;
  imageRight?: string;
  background?: string;
  theme?: 'dark' | 'light';
}

const presentationSlides: PresentationSlide[] = [
  {
    id: 1,
    type: 'title',
    title: 'Professional Cladding Solutions',
    subtitle: 'Excellence in Building Envelope Systems',
    background: '/images/backgrounds/kingspan-panel.jpg',
    theme: 'dark'
  },
  {
    id: 2,
    type: 'content',
    title: 'Our Expertise',
    content: [
      'Kingspan Insulated Panels',
      'Architectural Cladding Systems',
      'Aluminium Copings & Trims',
      'Complete Installation Services'
    ],
    theme: 'light'
  },
  {
    id: 3,
    type: 'image',
    title: 'Kingspan Panel Systems',
    subtitle: 'Industry-leading thermal performance and fire safety',
    image: '/images/backgrounds/kingspan-panel copy.jpg',
    theme: 'dark'
  },
  {
    id: 4,
    type: 'split',
    title: 'Quality Projects',
    imageLeft: '/images/architectural-panels/amazon1.jpg',
    imageRight: '/images/architectural-panels/amazon2.jpg',
    theme: 'light'
  },
  {
    id: 5,
    type: 'image',
    title: 'Architectural Excellence',
    subtitle: 'Custom solutions for distinctive buildings',
    image: '/images/architectural-panels/architectural-panels.jpg',
    theme: 'dark'
  },
  {
    id: 6,
    type: 'content',
    title: 'Why Choose Us?',
    content: [
      'Certified & Approved Materials',
      'Expert Installation Teams',
      'On-Time Project Delivery',
      'Comprehensive Warranties',
      'Dedicated Support'
    ],
    theme: 'light'
  },
  {
    id: 7,
    type: 'image',
    title: 'Sustainable Solutions',
    subtitle: 'Eco-friendly materials for modern construction',
    image: '/images/backgrounds/school_carrigtohil.png',
    theme: 'dark'
  },
  {
    id: 8,
    type: 'conclusion',
    title: 'Let\'s Build Together',
    subtitle: 'Contact us for your next project',
    content: [
      'Professional consultation',
      'Detailed quotations',
      'Project management',
      'Quality assurance'
    ],
    theme: 'dark',
    background: '/images/backgrounds/4k.jpg'
  }
];

export default function Presentation({ onNavigate }: PresentationProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const nextSlide = useCallback(() => {
    if (currentSlide < presentationSlides.length - 1) {
      setDirection('forward');
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection('backward');
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowRight':
      case ' ':
      case 'PageDown':
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault();
        prevSlide();
        break;
      case 'Home':
        e.preventDefault();
        setCurrentSlide(0);
        break;
      case 'End':
        e.preventDefault();
        setCurrentSlide(presentationSlides.length - 1);
        break;
      case 'Escape':
        onNavigate('home');
        break;
    }
  }, [nextSlide, prevSlide, onNavigate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const slide = presentationSlides[currentSlide];

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Exit Button */}
      <button
        onClick={() => onNavigate('home')}
        className="fixed top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
        aria-label="Exit presentation"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Slide Content */}
      <div
        key={currentSlide}
        className={`absolute inset-0 transition-all duration-700 ${
          direction === 'forward' ? 'animate-slideInRight' : 'animate-slideInLeft'
        }`}
      >
        {slide.type === 'title' && (
          <div className="relative h-full w-full flex items-center justify-center">
            {slide.background && (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.background})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
              </div>
            )}
            <div className="relative z-10 text-center px-8 max-w-5xl">
              <h1 className="text-7xl font-bold text-white mb-6 leading-tight">
                {slide.title}
              </h1>
              <p className="text-3xl text-gray-200 font-light">
                {slide.subtitle}
              </p>
            </div>
          </div>
        )}

        {slide.type === 'content' && (
          <div className={`h-full w-full flex items-center justify-center ${
            slide.theme === 'dark' ? 'bg-gray-900' : 'bg-white'
          }`}>
            <div className="max-w-4xl px-16">
              <h2 className={`text-6xl font-bold mb-16 ${
                slide.theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {slide.title}
              </h2>
              <ul className="space-y-8">
                {slide.content?.map((item, index) => (
                  <li
                    key={index}
                    className={`text-3xl flex items-center space-x-6 ${
                      slide.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`
                    }}
                  >
                    <span className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {slide.type === 'image' && (
          <div className="relative h-full w-full">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-end p-16 pb-24">
              <h2 className="text-6xl font-bold text-white mb-4">
                {slide.title}
              </h2>
              {slide.subtitle && (
                <p className="text-2xl text-gray-200 font-light max-w-3xl">
                  {slide.subtitle}
                </p>
              )}
            </div>
          </div>
        )}

        {slide.type === 'split' && (
          <div className={`h-full w-full ${
            slide.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
          }`}>
            <div className="h-full flex flex-col p-16">
              <h2 className={`text-5xl font-bold mb-12 ${
                slide.theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {slide.title}
              </h2>
              <div className="flex-1 grid grid-cols-2 gap-8">
                <div
                  className="bg-cover bg-center rounded-2xl shadow-2xl"
                  style={{ backgroundImage: `url(${slide.imageLeft})` }}
                />
                <div
                  className="bg-cover bg-center rounded-2xl shadow-2xl"
                  style={{ backgroundImage: `url(${slide.imageRight})` }}
                />
              </div>
            </div>
          </div>
        )}

        {slide.type === 'conclusion' && (
          <div className="relative h-full w-full flex items-center justify-center">
            {slide.background && (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.background})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />
              </div>
            )}
            <div className="relative z-10 text-center px-8 max-w-4xl">
              <h2 className="text-7xl font-bold text-white mb-6">
                {slide.title}
              </h2>
              <p className="text-3xl text-gray-200 mb-16 font-light">
                {slide.subtitle}
              </p>
              <div className="grid grid-cols-2 gap-8 text-left">
                {slide.content?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`
                    }}
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full" />
                    <span className="text-xl text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-6">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="p-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-full transition-all backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        {/* Progress Indicator */}
        <div className="flex items-center space-x-3 px-6 py-3 bg-white/10 rounded-full backdrop-blur-sm">
          {presentationSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all rounded-full ${
                index === currentSlide
                  ? 'w-8 h-2 bg-white'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === presentationSlides.length - 1}
          className="p-3 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed rounded-full transition-all backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Slide Counter */}
      <div className="fixed top-6 left-6 z-50 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
        <span className="text-white font-medium">
          {currentSlide + 1} / {presentationSlides.length}
        </span>
      </div>
    </div>
  );
}
