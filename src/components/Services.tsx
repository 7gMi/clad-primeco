import { useState } from 'react';
import { ArrowRight, Building2, Layers, Shield, Phone, Mail, Instagram } from 'lucide-react';
import Header from './Header';
import BackToTop from './BackToTop';
import { Page } from '../App';

interface ServicesProps {
  onNavigate: (page: Page) => void;
}

type ServiceType = 'kingspan' | 'architectural' | 'aluminium';

export default function Services({ onNavigate }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<ServiceType>('kingspan');

  const servicesData = {
    kingspan: {
      title: 'Kingspan Cladding Systems',
      subtitle: 'The Industry Standard — Installed by Specialists',
      description: 'Kingspan insulated panels deliver the thermal performance, fire resistance, and installation speed that demanding commercial and industrial projects require. We supply and install the full Kingspan range — ensuring your building envelope meets spec, on time, and without rework.',
      features: [
        'Outstanding thermal performance — U-values as low as 0.11 W/m²K',
        'Non-combustible fire rating: A2-s1, d0 for full compliance',
        'Lightweight panels that reduce structural load and material costs',
        'Fast installation sequences that protect your programme',
        'Weather-resistant finish built to perform for decades',
        'Minimal ongoing maintenance — lower lifetime cost for your client'
      ],
      applications: [
        'Industrial warehouses',
        'Data centres',
        'Manufacturing facilities',
        'Cold storage facilities',
        'Commercial buildings'
      ],
      image: '/images/kingspan-panel.jpg',
      icon: Building2,
      specifications: [
        { label: 'Panel Thickness', value: '40-200mm' },
        { label: 'Width Options', value: 'Custom up to 1150mm' },
        { label: 'Fire Rating', value: 'A2-s1, d0' },
        { label: 'Thermal Performance', value: 'U-values 0.11-0.28 W/m²K' }
      ]
    },
    architectural: {
      title: 'Architectural Panels',
      subtitle: 'A Facade That Works as Hard as It Looks',
      description: 'Architectural cladding panels give your building a distinctive, professional finish while delivering full weatherproofing and long-term durability. Whether you are working to a tight design brief or an open specification, we will match the right system to your project and install it to a high standard.',
      features: [
        'Broad range of finishes and colours — match any design intent',
        'Weather-resistant fibre cement: no rust, no rot, no repainting',
        'Superior fire performance for full Building Regulations compliance',
        'Zero maintenance required — low lifetime cost for the end user',
        'Bespoke dimensions and profiles to suit any facade geometry',
        'Responsibly sourced, low-impact materials'
      ],
      applications: [
        'Commercial office buildings',
        'Retail centres',
        'Educational institutions',
        'Healthcare facilities',
        'Mixed-use developments',
        'Residential buildings'
      ],
      image: '/images/architectural-panels/amazon4.jpg',
      icon: Layers,
      specifications: [
        { label: 'Panel Size', value: 'Up to 3000mm length' },
        { label: 'Thickness', value: '10-25mm' },
        { label: 'Finishes', value: '50+ color options' },
        { label: 'Fire Rating', value: 'A2-s1, d0' }
      ]
    },
    aluminium: {
      title: 'Aluminium Copings & Roof Deck',
      subtitle: 'The Right Finish. Built to Last.',
      description: 'Aluminium copings and roof deck systems complete your building envelope — sealing exposed edges, protecting parapets, and delivering a clean, professional finish. Designed to your exact project specifications, our aluminium systems integrate seamlessly with any cladding installation and require zero ongoing maintenance.',
      features: [
        'Corrosion-resistant aluminium — performs in all Irish weather conditions',
        'Lightweight profile reduces structural demands and speeds installation',
        'Custom-designed to your specified sizes, shapes, and profiles',
        'Engineered to integrate seamlessly with adjacent cladding systems',
        'Anodised or powder-coated finish — long-life, maintenance-free',
        'Effective weather exclusion protecting the full building envelope'
      ],
      applications: [
        'Roof edge protection',
        'Parapet coping',
        'Fascia systems',
        'Soffit applications',
        'Window and door surrounds',
        'Architectural trim details'
      ],
      image: '/images/aluminium-copings/aluminium-copings.jpg',
      icon: Shield,
      specifications: [
        { label: 'Material', value: 'Aluminium 6063-T5' },
        { label: 'Thickness', value: '1.5-3mm' },
        { label: 'Profiles', value: '15+ standard options' },
        { label: 'Finish', value: 'Anodized or painted' }
      ]
    },
  };

  const currentService = servicesData[selectedService];
  const CurrentIcon = currentService.icon;

  const allServices = Object.entries(servicesData).map(([key, data]) => ({
    key: key as ServiceType,
    title: data.title,
    icon: data.icon,
    image: data.image
  }));

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={onNavigate} currentPage="services" />

      <div
        className="relative h-[66vh] bg-cover bg-center pt-20"
        style={{ backgroundImage: 'url(/images/backgrounds/kingspan-panel.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex items-center px-8 md:px-16 lg:px-24">
          <div className="max-w-7xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-16 bg-blue-500/50"></div>
              <p className="text-white text-base md:text-lg font-light">
                Three Systems. One Specialist Contractor.
              </p>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
              Our <span className="text-blue-600">Services</span>
            </h1>
          </div>
        </div>
      </div>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {allServices.map((service) => {
              const Icon = service.icon;
              const isActive = selectedService === service.key;
              return (
                <button
                  key={service.key}
                  onClick={() => setSelectedService(service.key)}
                  className={`group relative rounded-xl overflow-hidden transition-all duration-300 h-48 ${
                    isActive
                      ? 'ring-2 ring-blue-600 shadow-xl'
                      : 'hover:shadow-lg'
                  }`}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="relative h-full flex flex-col items-center justify-end pb-4">
                    <Icon className={`w-8 h-8 mb-3 transition-all ${isActive ? 'text-blue-400' : 'text-white'}`} />
                    <h3 className={`text-sm md:text-base font-semibold text-center px-2 ${isActive ? 'text-blue-400' : 'text-white'}`}>
                      {service.title.split(' ')[0]}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={currentService.image}
                alt={currentService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-8 left-8 bg-blue-600 p-6 rounded-xl shadow-xl">
                <CurrentIcon className="w-12 h-12 text-white" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px bg-blue-600 w-12"></div>
                <p className="text-blue-600 font-semibold tracking-wider uppercase text-sm">
                  Service Details
                </p>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
                {currentService.title}
              </h2>
              <p className="text-lg text-blue-600 font-semibold mb-6">
                {currentService.subtitle}
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-8">
                {currentService.description}
              </p>

              <div className="bg-white rounded-xl p-6 mb-8 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4 text-lg">Key Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentService.specifications.map((spec, index) => (
                    <div key={index}>
                      <p className="text-sm text-slate-600 font-medium">{spec.label}</p>
                      <p className="text-base font-semibold text-slate-900">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onNavigate('contact')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold inline-flex items-center gap-2 transition-all duration-300 hover:gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Request a Quote
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-8">Key Features</h3>
              <ul className="space-y-4">
                {currentService.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-1 group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-8">Applications</h3>
              <div className="grid grid-cols-2 gap-4">
                {currentService.applications.map((app, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 hover:shadow-lg transition-all"
                  >
                    <p className="font-semibold text-slate-900">{app}</p>
                  </div>
                ))}
              </div>
            </div>
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
