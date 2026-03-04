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
      description: 'Kingspan Cladding is a lightweight, high-performance building material with a low carbon footprint. Strong, durable, and versatile, it is suitable for a wide range of applications.',
      image: '/images/kingspan-panel.jpg',
      link: 'services'
    },
    {
      title: 'Aluminium Roof Deck',
      description: 'Aluminium roof decking offers an attractive and cost-effective solution for roofing applications. Designed specifically for each project, aluminium roof decks can be customized to meet individual specifications, sizes, and profiles.',
      image: '/images/aluminium-copings/aluminium-copings.jpg',
      link: 'services'
    },
    {
      title: 'Architectural Cladding Panels',
      description: 'The purpose of cladding is to divert water away from any point of entry and to make any building weatherproof. Architectural panels provide both aesthetic appeal and functional protection for modern buildings.',
      image: '/images/architectural-panels/architectural-panels.jpg',
      link: 'services'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={onNavigate} currentPage="about" />

      <div
        className="relative h-[66vh] bg-cover bg-center pt-20"
        style={{ backgroundImage: 'url(/images/backgrounds/school_carrigtohil.png)' }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex items-center px-8 md:px-16 lg:px-24">
          <div className="max-w-7xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-16 bg-blue-500/50"></div>
              <p className="text-white text-base md:text-lg font-light">
                Clad Primeco
              </p>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
              About <span className="text-blue-600">Us</span>
            </h1>
          </div>
        </div>
      </div>

      <section className="bg-gray-100 pt-12 md:pt-16 pb-20 md:pb-32">
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
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Our Strategic Goals</h3>
                <p className="text-lg">
                  As a unified company with cross industry expertise, our customers can be confident that we will deliver trusted building solutions through:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-lg">Customer Excellence.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-lg">Nurturing the potential of our people.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-lg">Continually improving performance standards.</p>
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
                  We are specialised in Fibre Cement Cladding, Aluminium copings, and Architectural cladding panels.
                  Our project solutions transform buildings into modern architectural statements, delivering perfect
                  results from initial concept through to final installation.
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
              As a unified company with cross industry expertise, our customers can be confident that
              we will deliver trusted building solutions.
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
                      <ArrowRight className="absolute -right-2 -top-3 w-6 h-6 text-blue-500" />
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
                    className="inline-flex items-center gap-2 text-black font-semibold hover:text-blue-600 hover:gap-3 transition-all duration-300"
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
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Get in touch with us today for a consultation
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-2 hover:gap-3 transition-all duration-300"
          >
            Contact Us
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
      <BackToTop />
    </div>
  );
}
