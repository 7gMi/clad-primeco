import { ArrowRight, Building2, PenTool, FileText, CheckCircle, Check, Phone, Mail, Instagram } from 'lucide-react';
import Header from './Header';
import BackToTop from './BackToTop';
import { Page } from '../App';

interface AboutProps {
  onNavigate: (page: Page) => void;
}

export default function About({ onNavigate }: AboutProps) {
  const processSteps = [
    { number: '01', title: 'Planning', icon: FileText },
    { number: '02', title: 'Design', icon: PenTool },
    { number: '03', title: 'Construct', icon: Building2 },
    { number: '04', title: 'Finishing', icon: CheckCircle }
  ];

  const services = [
    {
      title: 'Kingspan Cladding',
      description: 'Kingspan insulated panels give you exceptional thermal performance, fire resistance, and a fast installation sequence — keeping your programme on track while future-proofing the building envelope.',
      image: '/images/kingspan-panel.jpg',
      link: 'services'
    },
    {
      title: 'Aluminium Roof Deck',
      description: 'A watertight, low-maintenance roof deck tailored to your project. Lightweight aluminium profiles are designed to your exact specifications — custom sizes, profiles, and finishes available.',
      image: '/images/aluminium-copings/aluminium-copings.jpg',
      link: 'services'
    },
    {
      title: 'Architectural Cladding Panels',
      description: 'Give your building a striking, durable facade that performs for decades. Our architectural panels provide full weatherproofing while delivering the aesthetic finish your design demands.',
      image: '/images/architectural-panels/architectural-panels.jpg',
      link: 'services'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={onNavigate} currentPage="about" />

      <div
        className="relative h-[66vh] bg-cover bg-center pt-20"
        style={{ backgroundImage: 'url(/images/backgrounds/school_carrigtohil.jpg)' }}
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
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
              About <span className="text-blue-600">Us</span>
            </h1>
          </div>
        </div>
      </div>

      <section className="bg-slate-50 pt-12 md:pt-16 pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            <div>
              <div className="relative mb-8">
                <div className="absolute -top-8 -left-8 w-64 h-8 bg-blue-600 z-0"></div>
                <div className="relative z-10 bg-white p-2 shadow-2xl">
                  <img
                    src="/images/about_gauche_.jpeg"
                    alt="Clad Primeco project"
                    className="w-full h-auto"
                  />
                </div>
              </div>

              <div className="space-y-6 text-slate-700 leading-relaxed">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900">What We Stand For</h3>
                <p className="text-lg">
                  We operate as a focused, specialist contractor — not a generalist. Every project we take on gets the same level of attention, from the first site visit to the final fixing:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-lg">Delivery on programme — protecting your project timeline.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-lg">Experienced site crews with proven cladding expertise.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-lg">Consistent quality standards — every project, every time.</p>
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
                  Clad Primeco is a specialist cladding and roofing contractor based in Dublin, delivering projects across Ireland for main contractors, developers, and public sector clients.
                </p>
                <p>
                  We specialise in Kingspan insulated panels, architectural cladding systems, and aluminium copings and roof deck — handling supply, installation, and coordination from initial survey through to handover.
                </p>
                <p>
                  Our track record includes large-scale data centres, pharmaceutical facilities, educational buildings, commercial warehouses, and active port environments. If your envelope needs to perform, we deliver it.
                </p>
              </div>

              <div className="relative mt-12">
                <div className="absolute -top-8 -left-8 w-64 h-8 bg-blue-600 z-0"></div>
                <div className="relative z-10 bg-white p-2 shadow-2xl">
                  <img
                    src="/images/about_image_droite_.jpeg"
                    alt="Clad Primeco construction site"
                    className="w-full h-auto"
                  />
                </div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Process</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              A clear, structured process — from pre-construction planning through to final inspection. We keep you informed at every stage so there are no surprises on site.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative">
                  <div className="text-center group">
                    <div className="relative inline-flex items-center justify-center mb-6">
                      <div className="relative w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    <div className="text-6xl font-bold mb-3 text-blue-400">
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-semibold">{step.title}</h3>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-12 left-[calc(50%+60px)] w-[calc(100%-120px)] h-0.5 bg-slate-700">
                      <ArrowRight className="absolute -right-2 -top-3 w-6 h-6 text-blue-600" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-blue-600 text-sm font-semibold tracking-wider uppercase mb-3">
              What We Do
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Our Services</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <button
                    onClick={() => onNavigate(service.link as Page)}
                    className="inline-flex items-center gap-2 text-slate-900 font-semibold hover:text-blue-600 hover:gap-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  >
                    View service
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Discuss Your Project?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Send us your drawings or brief — we'll come back with a detailed, competitive quote.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 inline-flex items-center gap-2 hover:gap-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
          >
            Request a Quote
            <ArrowRight className="w-5 h-5" />
          </button>
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
      <BackToTop />
    </div>
  );
}
