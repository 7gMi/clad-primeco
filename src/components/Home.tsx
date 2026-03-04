import { Page } from '../App';
import { useState, useEffect } from 'react';
import { slides } from '../data/slides';
import HeroCard from './HeroCard';
import SlideIndicators from './SlideIndicators';
import { ArrowRight, Building2, Layers, Shield, PenTool, FileText, CheckCircle, Phone, Mail, Instagram } from 'lucide-react';
import Navigation from './Navigation';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedProcess, setSelectedProcess] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleSlideChange((currentSlide + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      const scrollPosition = target.scrollTop;
      setIsScrolled(scrollPosition > 100);
    };

    const scrollContainer = document.querySelector('.home-scroll-container');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleSlideChange = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  return (
    <div className="h-screen overflow-y-auto bg-white home-scroll-container">
      <header
        className={`fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 lg:px-16 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-lg py-3'
            : 'bg-gradient-to-b from-black/60 via-black/30 to-transparent pt-2 md:pt-3 pb-4'
        }`}
      >
        <div className="flex justify-between items-center">
          <div className="logo-container cursor-pointer" onClick={() => onNavigate('home')}>
            <picture>
              <source media="(min-width: 1024px)" srcSet="/images/logo/logo-desktop.png" />
              <source media="(min-width: 768px)" srcSet="/images/logo/logo-tab.png" />
              <img
                src="/images/logo/logo-mobile.png"
                alt="Company Logo"
                className={`h-auto transition-all duration-300 ${
                  isScrolled
                    ? 'w-[80px] sm:w-[100px] md:w-[120px] lg:w-[180px]'
                    : 'w-[120px] sm:w-[140px] md:w-[160px] lg:w-[300px]'
                }`}
              />
            </picture>
            {!isScrolled && (
              <p
                className="text-[14px] md:text-[16px] lg:text-[18px] mt-1 tracking-wide text-white transition-all duration-300"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                CLADDING PROFESSIONALS
              </p>
            )}
          </div>

          <Navigation onNavigate={onNavigate} isScrolled={isScrolled} currentPage="home" />
        </div>
      </header>

      <div className="relative w-full h-screen overflow-hidden bg-black">
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${
                currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              style={{ backgroundImage: `url(${slide.background})` }}
            >
              <div className="absolute inset-0 bg-black/40" />
            </div>
          ))}

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
                    onNavigate={onNavigate}
                  />
                </div>
              ))}
            </div>

            <div className="flex-shrink-0 flex justify-start w-full">
              <SlideIndicators
                totalSlides={slides.length}
                currentSlide={currentSlide}
                onSlideChange={handleSlideChange}
              />
            </div>
          </div>
        </div>
      </div>

      <section className="min-h-screen bg-white flex items-center pt-32 md:pt-36 lg:pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
          <div className="mb-16">
            <div className="flex items-center mb-6">
              <div className="h-px bg-gradient-to-r from-blue-600 to-transparent w-32 md:w-48"></div>
              <div className="mx-4 md:mx-6">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                  <span className="text-slate-900">About </span>
                  <span className="text-blue-600">US</span>
                </h2>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 md:gap-16">
            <div className="lg:w-1/2">
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
                Our Strategic Goals
              </h3>
              <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-6">
                As a unified company with cross-industry expertise, our clients can be confident that we will deliver trusted industrial solutions through:
              </p>
              <ul className="space-y-4 text-lg md:text-xl text-slate-700">
                <li className="flex items-start">
                  <ArrowRight className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                  <span>Client Excellence</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                  <span>Nurturing the potential of our people</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                  <span>Continually improving performance standards</span>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 border-t-4 border-l-4 border-blue-600 rounded-tl-3xl"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-4 border-r-4 border-blue-600 rounded-br-3xl"></div>

              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/backgrounds/school_carrigtohil.png"
                  alt="Our Strategic Goals"
                  className="w-full h-full object-cover object-center"
                />

                <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 max-w-xs border-l-4 border-blue-600">
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Excellence</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Building tomorrow's industrial solutions with precision and dedication
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-slate-50 flex items-center pt-32 md:pt-36 lg:pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
          <div className="mb-16">
            <p className="text-sm md:text-base lg:text-lg font-semibold text-slate-900 tracking-wider mb-4">
              What We Offer
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-slate-900">Our </span>
              <span className="text-blue-600">Solutions</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl">
              We provide comprehensive cladding solutions tailored to meet the unique demands of modern industrial and commercial buildings.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="/images/kingspan-panel.jpg"
                  alt="Kingspan Panels"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative px-8 pt-12 pb-8">
                <div className="absolute -top-8 left-8">
                  <div className="bg-blue-600 p-5 rounded-lg shadow-xl transform group-hover:scale-110 transition-all duration-300">
                    <Building2 className="w-10 h-10 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-4">
                  Kingspan Panels
                </h3>

                <button
                  onClick={() => onNavigate('services')}
                  className="text-slate-900 font-medium text-lg hover:text-blue-600 transition-colors duration-300 flex items-center gap-2 group/btn"
                >
                  View service
                  <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>

            <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="/images/architectural-panels/amazon4.jpg"
                  alt="Architectural Panels"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative px-8 pt-12 pb-8">
                <div className="absolute -top-8 left-8">
                  <div className="bg-blue-600 p-5 rounded-lg shadow-xl transform group-hover:scale-110 transition-all duration-300">
                    <Layers className="w-10 h-10 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-4">
                  Architectural Panels
                </h3>

                <button
                  onClick={() => onNavigate('services')}
                  className="text-slate-900 font-medium text-lg hover:text-blue-600 transition-colors duration-300 flex items-center gap-2 group/btn"
                >
                  View service
                  <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>

            <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="/images/aluminium-copings/aluminium-copings.jpg"
                  alt="Aluminium Copings"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="relative px-8 pt-12 pb-8">
                <div className="absolute -top-8 left-8">
                  <div className="bg-blue-600 p-5 rounded-lg shadow-xl transform group-hover:scale-110 transition-all duration-300">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-4">
                  Aluminium Copings
                </h3>

                <button
                  onClick={() => onNavigate('services')}
                  className="text-slate-900 font-medium text-lg hover:text-blue-600 transition-colors duration-300 flex items-center gap-2 group/btn"
                >
                  View service
                  <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-blue-400 text-sm font-semibold tracking-wider uppercase mb-3">
              How We Work
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">Our Process</h2>
            <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
              As a unified company with cross-industry expertise, our customers can be confident that we will deliver trusted building solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '01', title: 'Planning', icon: FileText },
              { number: '02', title: 'Design', icon: PenTool },
              { number: '03', title: 'Construct', icon: Building2 },
              { number: '04', title: 'Finishing', icon: CheckCircle }
            ].map((step, index) => {
              const Icon = step.icon;
              const isSelected = selectedProcess === index;
              return (
                <div key={step.number} className="relative">
                  <div className="text-center">
                    <button
                      onClick={() => setSelectedProcess(isSelected ? null : index)}
                      className="relative inline-flex items-center justify-center mb-6 group cursor-pointer transition-all duration-300"
                    >
                      {isSelected && (
                        <div className="absolute inset-0 w-28 h-28 -top-4 -left-4 rounded-full bg-white/20 animate-pulse"></div>
                      )}
                      <div className={`relative w-20 h-20 rounded-full transition-all duration-300 flex items-center justify-center ${
                        isSelected
                          ? 'bg-white'
                          : 'bg-blue-600 group-hover:scale-110 group-hover:bg-blue-500'
                      }`}>
                        <Icon className={`w-10 h-10 transition-all duration-300 ${
                          isSelected ? 'text-blue-600' : 'text-white'
                        }`} />
                      </div>
                    </button>
                    <div className={`text-6xl font-bold mb-2 transition-colors duration-300 ${
                      isSelected ? 'text-blue-400' : 'text-slate-600'
                    }`}>
                      {step.number}
                    </div>
                    <h3 className={`text-2xl font-semibold transition-colors duration-300 ${
                      isSelected ? 'text-blue-400' : 'text-white'
                    }`}>{step.title}</h3>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-10 left-[calc(50%+50px)] w-[calc(100%-100px)] h-0.5 bg-slate-700">
                      <ArrowRight className="absolute -right-2 -top-3 w-6 h-6 text-blue-600" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-black text-white min-h-[33vh] flex items-center justify-center py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 border border-white/30 rounded-lg p-8">
            <div className="flex flex-col md:flex-row items-center justify-center group relative">
              <div className="w-16 h-16 rounded-full bg-black border-2 border-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                <Phone className="w-8 h-8 text-blue-500" />
              </div>
              <div className="md:ml-4 mt-4 md:mt-0 text-center md:text-left">
                <div className="text-lg font-semibold text-gray-300 mb-1">Phone</div>
                <a
                  href="tel:0833468913"
                  className="text-xl text-white hover:text-blue-500 transition-colors duration-300"
                >
                  083 346 8913
                </a>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-px h-1/2 bg-white/30 transform -translate-y-1/2"></div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center group relative">
              <div className="w-16 h-16 rounded-full bg-black border-2 border-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                <Mail className="w-8 h-8 text-blue-500" />
              </div>
              <div className="md:ml-4 mt-4 md:mt-0 text-center md:text-left">
                <div className="text-lg font-semibold text-gray-300 mb-1">Email</div>
                <a
                  href="mailto:cladprimeco@outlook.com"
                  className="text-base md:text-lg text-white hover:text-blue-500 transition-colors duration-300"
                >
                  cladprimeco@outlook.com
                </a>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-px h-1/2 bg-white/30 transform -translate-y-1/2"></div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center group">
              <div className="w-16 h-16 rounded-full bg-black border-2 border-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                <Instagram className="w-8 h-8 text-blue-500" />
              </div>
              <div className="md:ml-4 mt-4 md:mt-0 text-center md:text-left">
                <a
                  href="https://www.instagram.com/cladprimeco/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-white hover:text-blue-500 transition-colors duration-300"
                >
                  Follow Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black text-gray-400 py-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm md:text-base">
            ©2025 Clad Primeco Professional Cladding - Industrial Building Solutions. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
