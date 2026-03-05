import { Page } from '../App';
import { useState, useEffect, useCallback, useRef } from 'react';
import { slides } from '../data/slides';
import HeroCard from './HeroCard';
import SlideIndicators from './SlideIndicators';
import { ArrowRight, Thermometer, Palette, Droplets, PenTool, FileText, CheckCircle, Phone, Mail, Instagram, Building2 } from 'lucide-react';
import Header from './Header';
import BackToTop from './BackToTop';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProcess, setSelectedProcess] = useState<number | null>(null);
  // Use a ref for the transitioning flag to avoid stale closure issues in
  // setInterval and to prevent unnecessary re-renders on every transition tick.
  const isTransitioningRef = useRef(false);

  // PERFORMANCE: stable handleSlideChange — no re-creation on every render.
  // Using a ref for isTransitioning means this callback never goes stale
  // and the setInterval below doesn't need it in its dependency array.
  const handleSlideChange = useCallback((index: number) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setCurrentSlide(index);
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 800);
  }, []); // empty deps — safe because we read/write via ref

  useEffect(() => {
    const timer = setInterval(() => {
      // Read current slide via functional updater to avoid a stale closure,
      // then advance. handleSlideChange is stable (empty deps, ref-based).
      setCurrentSlide((prev) => {
        const next = (prev + 1) % slides.length;
        if (!isTransitioningRef.current) {
          isTransitioningRef.current = true;
          setTimeout(() => { isTransitioningRef.current = false; }, 800);
          return next;
        }
        return prev;
      });
    }, 6000);

    return () => clearInterval(timer);
  }, []); // empty deps — all state is read via functional updaters or refs


  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden bg-white home-scroll-container">
      <Header onNavigate={onNavigate} currentPage="home" isHomePage />

      {/* Hero slider section */}
      <div className="relative w-full h-screen overflow-hidden bg-black">
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${
                currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              style={{ backgroundImage: `url(${slide.background})` }}
              /*
                PERFORMANCE NOTE — background-image vs <img>:
                The hero background is set via CSS background-image so that
                bg-cover / bg-center work correctly for full-viewport cover.
                Slide 0's image is preloaded in index.html via <link rel="preload">.
                Slides 1 and 2 load lazily when the carousel advances.
              */
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-black/40" />
            </div>
          ))}

          <div className="relative z-20 h-full flex flex-col justify-center pt-[110px] sm:pt-[100px] md:pt-[90px] lg:pt-[140px] pb-16 px-6 md:px-10 lg:px-16">
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

      {/* About section */}
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
                Why Contractors Choose Us
              </h3>
              <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-6">
                We work directly with main contractors, developers, and project managers across Ireland. Our commitment on every project is simple:
              </p>
              <ul className="space-y-4 text-lg md:text-xl text-slate-700">
                <li className="flex items-start">
                  <ArrowRight className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                  <span>Programme-driven delivery — we protect your schedule</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                  <span>Experienced crews who get it right first time</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                  <span>Clear communication from quote to final inspection</span>
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="hidden sm:block absolute -top-6 -left-6 w-24 h-24 border-t-4 border-l-4 border-blue-600 rounded-tl-3xl"></div>
              <div className="hidden sm:block absolute -bottom-6 -right-6 w-24 h-24 border-b-4 border-r-4 border-blue-600 rounded-br-3xl"></div>

              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                {/*
                  CLS FIX: width+height attributes set the intrinsic aspect ratio
                  so the browser reserves the correct space before the image loads.
                  loading=lazy: image is below the fold — defer network request
                  until the user scrolls near it (~1 viewport away).
                */}
                <img
                  src="/images/backgrounds/school_carrigtohil.jpg"
                  alt="Carrigtwohil school project — example of our cladding work"
                  width="800"
                  height="500"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center"
                />

                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-4 sm:p-6 max-w-[200px] sm:max-w-xs border-l-4 border-blue-600">
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Trusted Across Ireland</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Amazon, Vantage Data Centers, Bausch & Lomb — completed on time, to specification
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions / Services section */}
      <section className="min-h-screen bg-slate-50 flex items-center pt-32 md:pt-36 lg:pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
          <div className="mb-16">
            <p className="text-sm font-semibold text-blue-600 tracking-wider uppercase mb-4">
              What We Deliver
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-slate-900">Our </span>
              <span className="text-blue-600">Solutions</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl">
              Three specialist systems. One reliable team. We handle the full cladding package — so your project stays on track and your building performs for decades.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {/* Card: Kingspan Panels */}
            <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 hover:-translate-y-1">
              <div className="relative h-52 overflow-hidden">
                <img
                  src="/images/kingspan-panel.jpg"
                  alt="Kingspan insulated panels"
                  width="600"
                  height="208"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-white/70 bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
                    Insulated Panels
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300 flex-shrink-0">
                    <Thermometer className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Kingspan Panels</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">
                  High-performance insulated panels delivering exceptional thermal efficiency and fast installation — keeping your programme on track.
                </p>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-blue-600 font-semibold text-sm hover:gap-3 transition-all duration-300 flex items-center gap-2 group/btn focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                >
                  Get Kingspan Pricing
                  <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Card: Architectural Panels */}
            <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 hover:-translate-y-1">
              <div className="relative h-52 overflow-hidden">
                <img
                  src="/images/architectural-panels/amazon4.jpg"
                  alt="Architectural cladding panels"
                  width="600"
                  height="208"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-white/70 bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
                    Facade Systems
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300 flex-shrink-0">
                    <Palette className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Architectural Panels</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">
                  Striking, durable facades that perform for decades — full weatherproofing with the aesthetic finish your design demands.
                </p>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-blue-600 font-semibold text-sm hover:gap-3 transition-all duration-300 flex items-center gap-2 group/btn focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                >
                  Discuss Your Facade
                  <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Card: Aluminium Copings */}
            <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 hover:-translate-y-1">
              <div className="relative h-52 overflow-hidden">
                <img
                  src="/images/aluminium-copings/aluminium-copings.jpg"
                  alt="Aluminium coping systems"
                  width="600"
                  height="208"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-white/70 bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
                    Roof Deck
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300 flex-shrink-0">
                    <Droplets className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Aluminium Copings & Roof Deck</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">
                  Watertight, low-maintenance roof deck and copings — lightweight aluminium profiles to your exact specifications.
                </p>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-blue-600 font-semibold text-sm hover:gap-3 transition-all duration-300 flex items-center gap-2 group/btn focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                >
                  Request Specifications
                  <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Process section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-blue-400 text-sm font-semibold tracking-wider uppercase mb-3">
              How We Work
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">Our Process</h2>
            <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
              A structured, proven approach — from initial survey through to final sign-off. No surprises. No delays that come from our side.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
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
                      aria-pressed={isSelected}
                      aria-label={`Step ${step.number}: ${step.title}`}
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
                    <div className={`text-4xl md:text-6xl font-bold mb-2 transition-colors duration-300 ${
                      isSelected ? 'text-blue-400' : 'text-slate-600'
                    }`}>
                      {step.number}
                    </div>
                    <h3 className={`text-xl md:text-2xl font-semibold transition-colors duration-300 ${
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

      {/* Contact bar */}
      <section className="bg-black text-white min-h-[33vh] flex items-center justify-center py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 border border-white/30 rounded-lg p-4 sm:p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-center group relative">
              <div className="w-16 h-16 rounded-full bg-black border-2 border-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                <Phone className="w-8 h-8 text-blue-500" />
              </div>
              <div className="md:ml-4 mt-4 md:mt-0 text-center md:text-left">
                <div className="text-lg font-semibold text-gray-300 mb-1">Phone</div>
                <a
                  href="tel:+353833468913"
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
                <div className="text-lg font-semibold text-gray-300 mb-1">Instagram</div>
                <a
                  href="https://www.instagram.com/cladprimeco/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-white hover:text-blue-500 transition-colors duration-300"
                >
                  @cladprimeco
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black text-gray-400 py-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm md:text-base">
            &copy;2023-2026 Clad Primeco Cladding and Roofing Specialists - Industrial Building Solutions. All rights reserved.
          </p>
        </div>
      </footer>
      <BackToTop />
    </div>
  );
}
