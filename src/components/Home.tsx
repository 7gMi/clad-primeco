import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { usePageMeta } from '../hooks/usePageMeta';
import { useState, useEffect, useCallback, useRef } from 'react';
import { slides } from '../data/slides';
import HeroCard from './HeroCard';
import SlideIndicators from './SlideIndicators';
import { ArrowRight, Thermometer, Palette, Droplets, Quote } from 'lucide-react';
import ProcessSection from './ProcessSection';
import { testimonials } from '../data/testimonials';

export default function Home() {
  const navigate = useNavigate();

  usePageMeta({
    title: 'Clad-Primeco | Cladding & Roofing Contractors — Dublin, Ireland',
    description:
      'Specialist cladding and roofing contractors. Kingspan panels, architectural cladding, aluminium copings — installed across Ireland.',
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  // Use a ref for the transitioning flag to avoid stale closure issues in
  // setInterval and to prevent unnecessary re-renders on every transition tick.
  const isTransitioningRef = useRef(false);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // PERFORMANCE: stable handleSlideChange — no re-creation on every render.
  // Using a ref for isTransitioning means this callback never goes stale
  // and the setInterval below doesn't need it in its dependency array.
  const handleSlideChange = useCallback((index: number) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setCurrentSlide(index);
    clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = setTimeout(() => {
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
          setTimeout(() => {
            isTransitioningRef.current = false;
          }, 800);
          return next;
        }
        return prev;
      });
    }, 6000);

    return () => {
      clearInterval(timer);
      clearTimeout(transitionTimerRef.current);
    };
  }, []); // empty deps — all state is read via functional updaters or refs

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero slider section */}
        <h1 className="sr-only">Cladding &amp; Roofing Contractors in Dublin, Ireland</h1>
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
                  We work directly with main contractors, developers, and project managers across
                  Ireland. Our commitment on every project is simple:
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
                    src="/images/backgrounds/school_carrigtohil.webp"
                    alt="Carrigtwohil school project — example of our cladding work"
                    width="800"
                    height="500"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center"
                  />

                  <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-4 sm:p-6 max-w-[200px] sm:max-w-xs border-l-4 border-blue-600">
                    <h4 className="text-xl font-bold text-slate-900 mb-2">
                      Trusted Across Ireland
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Amazon, Vantage Data Centers, Bausch & Lomb — completed on time, to
                      specification
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
                Three specialist systems. One reliable team. We handle the full cladding package —
                so your project stays on track and your building performs for decades.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Card: Kingspan Panels */}
              <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 hover:-translate-y-1">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src="/images/kingspan-panel.webp"
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
                    High-performance insulated panels delivering exceptional thermal efficiency and
                    fast installation — keeping your programme on track.
                  </p>
                  <button
                    onClick={() => navigate(ROUTES.SERVICE('kingspan'))}
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
                    src="/images/architectural-panels/amazon4.webp"
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
                    Striking, durable facades that perform for decades — full weatherproofing with
                    the aesthetic finish your design demands.
                  </p>
                  <button
                    onClick={() => navigate(ROUTES.SERVICE('architectural'))}
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
                    src="/images/aluminium-copings/aluminium-copings.webp"
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
                    <h3 className="text-xl font-bold text-slate-900">
                      Aluminium Copings & Roof Deck
                    </h3>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">
                    Watertight, low-maintenance roof deck and copings — lightweight aluminium
                    profiles to your exact specifications.
                  </p>
                  <button
                    onClick={() => navigate(ROUTES.SERVICE('aluminium'))}
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

        <ProcessSection subtitle="A structured, proven approach — from initial survey through to final sign-off. No surprises. No delays that come from our side." />

        {/* Testimonials section */}
        {testimonials.length > 0 && (
          <section className="bg-slate-50 py-20">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="text-center mb-16">
                <p className="text-blue-600 text-sm font-semibold tracking-wider uppercase mb-3">
                  Testimonials
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                  What Our Clients <span className="text-blue-600">Say</span>
                </h2>
                <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
                  Don't just take our word for it — hear from contractors and project managers who
                  trust us to deliver.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="bg-white rounded-2xl shadow-md border border-slate-100 p-8 flex flex-col"
                  >
                    <Quote
                      className="w-8 h-8 text-blue-600/20 mb-4 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <p className="text-slate-700 leading-relaxed flex-1 mb-6">"{t.text}"</p>
                    <div className="border-t border-slate-100 pt-4">
                      <p className="font-semibold text-slate-900">{t.name}</p>
                      <p className="text-sm text-slate-500">
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
