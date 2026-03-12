interface SlideIndicatorsProps {
  totalSlides: number;
  currentSlide: number;
  onSlideChange: (index: number) => void;
}

export default function SlideIndicators({
  totalSlides,
  currentSlide,
  onSlideChange,
}: SlideIndicatorsProps) {
  return (
    <div className="flex gap-2 sm:gap-3 justify-center mt-6 sm:mt-8 md:mt-12">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSlideChange(index)}
          className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-transparent ${
            currentSlide === index
              ? 'bg-blue-500 border-blue-500 scale-110'
              : 'bg-transparent border-white hover:border-blue-400 hover:scale-105'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}
