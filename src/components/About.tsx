import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { ServiceType } from '../constants/routes';
import { usePageMeta } from '../hooks/usePageMeta';
import { ArrowRight, Check, Thermometer, Palette, Umbrella } from 'lucide-react';
import ProcessSection from './ProcessSection';

export default function About() {
  const navigate = useNavigate();

  usePageMeta({
    title: 'About Us | Clad-Primeco',
    description:
      'Learn about Clad-Primeco — specialist cladding and roofing contractors based in Dublin, delivering projects across Ireland.',
  });

  const services: {
    title: string;
    tagline: string;
    description: string;
    image: string;
    imageAlt: string;
    icon: typeof Thermometer;
    badge: string;
    serviceType: ServiceType;
  }[] = [
    {
      title: 'Kingspan Cladding',
      tagline: 'Thermal performance. Fire rating. On programme.',
      description:
        'Kingspan insulated panels give you exceptional thermal performance, fire resistance, and a fast installation sequence — keeping your programme on track while future-proofing the building envelope.',
      image: '/images/kingspan-panel.webp',
      imageAlt: 'Kingspan insulated panels installed on a commercial building facade',
      icon: Thermometer,
      badge: '4 projects delivered',
      serviceType: 'kingspan',
    },
    {
      title: 'Aluminium Roof Deck',
      tagline: 'Watertight. Maintenance-free. Built to spec.',
      description:
        'A watertight, low-maintenance roof deck tailored to your project. Lightweight aluminium profiles are designed to your exact specifications — custom sizes, profiles, and finishes available.',
      image: '/images/aluminium-copings/aluminium-copings.webp',
      imageAlt: 'Aluminium roof deck and coping system on a commercial building',
      icon: Umbrella,
      badge: '2 projects delivered',
      serviceType: 'aluminium',
    },
    {
      title: 'Architectural Panels',
      tagline: 'Striking facades that perform for decades.',
      description:
        'Give your building a striking, durable facade that performs for decades. Our architectural panels provide full weatherproofing while delivering the aesthetic finish your design demands.',
      image: '/images/architectural-panels/architectural-panels.webp',
      imageAlt: 'Architectural cladding panels on a modern building facade',
      icon: Palette,
      badge: '2 projects delivered',
      serviceType: 'architectural',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <main>
        <div
          className="relative h-[66vh] bg-cover bg-center pt-20"
          style={{ backgroundImage: 'url(/images/backgrounds/school_carrigtohil.webp)' }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative h-full flex items-center px-8 md:px-16 lg:px-24">
            <div className="max-w-7xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-16 bg-blue-500/50"></div>
                <p className="text-white text-base md:text-lg font-light">
                  Ireland's Cladding Specialists
                </p>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
                About <span className="text-blue-600">Us</span>
              </h1>
            </div>
          </div>
        </div>

        <section className="bg-slate-50 pt-12 md:pt-16 pb-20 md:pb-32 overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
              <div>
                <div className="relative mb-8">
                  {/* Corner accent — top-left */}
                  <div className="hidden sm:block absolute -top-4 -left-4 w-14 h-14 bg-blue-600 rounded-tl-2xl z-0" />
                  {/* Corner accent — bottom-right */}
                  <div className="hidden sm:block absolute -bottom-4 -right-4 w-8 h-8 bg-blue-100 rounded-br-xl z-0" />
                  <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src="/images/projects/carrigtwohil-college/1_Carrigtwohil_College_Cork.webp"
                      alt="Clad Primeco team at work on Carrigtwohil College"
                      width="800"
                      height="600"
                      loading="lazy"
                      decoding="async"
                      className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                  </div>
                </div>

                <div className="space-y-6 text-slate-700 leading-relaxed">
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                    What We Stand For
                  </h3>
                  <p className="text-lg">
                    We operate as a focused, specialist contractor — not a generalist. Every project
                    we take on gets the same level of attention, from the first site visit to the
                    final fixing:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-1">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-lg">
                        Delivery on programme — protecting your project timeline.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-1">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-lg">
                        Experienced site crews with proven cladding expertise.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-1">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-lg">
                        Consistent quality standards — every project, every time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:pt-20">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                  Clad <span className="text-blue-600">Primeco</span>
                </h2>
                <div className="space-y-6 text-lg text-slate-700 leading-relaxed mb-8">
                  <p>
                    Clad Primeco is a specialist cladding and roofing contractor based in Dublin,
                    delivering projects across Ireland for main contractors, developers, and public
                    sector clients.
                  </p>
                  <p>
                    We specialise in Kingspan insulated panels, architectural cladding systems, and
                    aluminium copings and roof deck — handling supply, installation, and
                    coordination from initial survey through to handover.
                  </p>
                  <p>
                    Our track record includes large-scale data centres, pharmaceutical facilities,
                    educational buildings, commercial warehouses, and active port environments. If
                    your envelope needs to perform, we deliver it.
                  </p>
                </div>

                <div className="relative mt-16">
                  {/* Corner accent — top-right (mirrored) */}
                  <div className="hidden sm:block absolute -top-4 -right-4 w-14 h-14 bg-blue-600 rounded-tr-2xl z-0" />
                  {/* Corner accent — bottom-left */}
                  <div className="hidden sm:block absolute -bottom-4 -left-4 w-8 h-8 bg-blue-100 rounded-bl-xl z-0" />
                  <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src="/images/about_image_droite_.webp"
                      alt="Clad Primeco cladding installation in progress"
                      width="800"
                      height="600"
                      loading="lazy"
                      decoding="async"
                      className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {/* Stats badge */}
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex gap-2 sm:gap-3 justify-center">
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-2.5 sm:px-4 py-2 sm:py-2.5 text-center min-w-0">
                        <div className="text-white font-bold text-base sm:text-xl leading-none">
                          20+
                        </div>
                        <div className="text-white/70 text-[9px] sm:text-[10px] tracking-wide uppercase mt-1">
                          Projects
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-2.5 sm:px-4 py-2 sm:py-2.5 text-center min-w-0">
                        <div className="text-white font-bold text-base sm:text-xl leading-none">
                          20k+
                        </div>
                        <div className="text-white/70 text-[9px] sm:text-[10px] tracking-wide mt-1">
                          m² installed
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-2.5 sm:px-4 py-2 sm:py-2.5 text-center min-w-0">
                        <div className="text-white font-bold text-base sm:text-xl leading-none">
                          All
                        </div>
                        <div className="text-white/70 text-[9px] sm:text-[10px] tracking-wide uppercase mt-1">
                          Ireland
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProcessSection subtitle="A clear, structured process — from pre-construction planning through to final inspection. We keep you informed at every stage so there are no surprises on site." />

        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-blue-600 text-sm font-semibold tracking-wider uppercase mb-3">
                What We Do
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Our Services</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.title}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-100"
                  >
                    {/* Image with overlay content */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.imageAlt}
                        width="600"
                        height="224"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                      {/* Badge top-right */}
                      <div className="absolute top-4 right-4">
                        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30 tracking-wide">
                          {service.badge}
                        </span>
                      </div>

                      {/* Icon bottom-left on image */}
                      <div className="absolute bottom-4 left-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/40 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-6">
                      <p className="text-blue-600 text-xs font-semibold tracking-wider uppercase mb-2">
                        {service.tagline}
                      </p>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-5">
                        {service.description}
                      </p>
                      <button
                        onClick={() => navigate(ROUTES.SERVICE(service.serviceType))}
                        className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:gap-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded group/btn"
                      >
                        View service
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Discuss Your Project?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Send us your drawings or brief — we'll come back with a detailed, competitive quote.
            </p>
            <button
              onClick={() => navigate(ROUTES.CONTACT, { state: { scrollToForm: true } })}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 inline-flex items-center gap-2 hover:gap-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
            >
              Request a Quote
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
