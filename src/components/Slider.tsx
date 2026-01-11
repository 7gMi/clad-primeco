import { useState, useEffect } from 'react';
import { slides } from '../data/slides';
import Header from './Header';
import HeroCard from './HeroCard';
import SlideIndicators from './SlideIndicators';
import { Page } from '../App';

interface SliderProps {
  onNavigate: (page: Page) => void;
}

export default function Slider({ onNavigate }: SliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleSlideChange((currentSlide + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleSlideChange = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-800 ease-in-out ${
              currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={slide.background}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}

        <Header onNavigate={onNavigate} />

        <div className="relative z-20 h-full flex flex-col justify-center pt-24 md:pt-28 pb-16 px-6 md:px-12 lg:px-16">
          <div className="flex-shrink-0 w-full">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-all duration-800 ease-in-out ${
                  currentSlide === index
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8 pointer-events-none absolute'
                }`}
              >
                <HeroCard
                  tagline={slide.tagline}
                  title={slide.title}
                  subtitle={slide.subtitle}
                />
              </div>
            ))}
          </div>

          <div className="flex-shrink-0 flex justify-center w-full">
            <SlideIndicators
              totalSlides={slides.length}
              currentSlide={currentSlide}
              onSlideChange={handleSlideChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
