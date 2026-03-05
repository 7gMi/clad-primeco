import { useState } from 'react';
import { ArrowRight, Thermometer, Palette, Umbrella, Phone, Mail, Instagram, Check } from 'lucide-react';
import Header from './Header';
import BackToTop from './BackToTop';
import Footer from './Footer';
import { Page } from '../App';

import { ServiceType } from '../App';

interface ServicesProps {
  onNavigate: (page: Page, projectId?: number) => void;
  initialService?: ServiceType | null;
}

const servicesData = {
  kingspan: {
    title: 'Kingspan Cladding Systems',
    tagline: 'High-performance insulated panels — fast, precise, on programme.',
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
    icon: Thermometer,
    projectCount: 4,
    projects: [
      { id: 2, name: 'Vantage Power Station', location: 'Dublin 01', surface: '2,400 m²', image: '/images/projects/dub01-vantage/12_Dub01_Vantage_Power_Station.jpg' },
      { id: 3, name: 'Carrigtwohil College', location: 'Cork', surface: '3,000 m²', image: '/images/projects/carrigtwohil-college/1_Carrigtwohil_College_Cork.jpg' },
      { id: 4, name: 'Bausch & Lomb', location: 'Waterford', surface: '3,000 m²', image: '/images/projects/bausch-lomb/1_Bauschandlomb.jpg' },
      { id: 8, name: 'Sandyford Warehouse', location: 'Dublin', surface: '1,700 m²', image: '/images/projects/sandyford-warehouse/1_Sandyford_Warehouse_Depot.JPG' },
    ],
    specifications: [
      { label: 'Panel Thickness', value: '40-200mm' },
      { label: 'Width Options', value: '1000-1200mm' },
      { label: 'Fire Rating', value: 'A2-s1, d0' },
      { label: 'Thermal Performance', value: 'U-values 0.11-0.28 W/m²K' }
    ]
  },
  architectural: {
    title: 'Architectural Panels',
    tagline: 'Striking facades that perform for decades — full weatherproofing.',
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
    icon: Palette,
    projectCount: 2,
    projects: [
      { id: 1, name: 'Amazon Dublin 104', location: 'Dublin', surface: '5,000 m²', image: '/images/projects/dub104-amazon/1_Dub104_Amazon.jpg' },
      { id: 7, name: 'Lily Superstore', location: 'Limerick', surface: '4,000 m²', image: '/images/projects/lily-superstore/14_Lily_Superstore_Limerick.jpg' },
    ],
    specifications: [
      { label: 'Panel Size', value: 'Up to 3000mm length' },
      { label: 'Thickness', value: '10-25mm' },
      { label: 'Finishes', value: '50+ color options' },
      { label: 'Fire Rating', value: 'B-s1, d0 to A2-s1, d0 (system-dependent)' }
    ]
  },
  aluminium: {
    title: 'Aluminium Copings & Roof Deck',
    tagline: 'Custom aluminium systems — watertight, maintenance-free, built to spec.',
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
    icon: Umbrella,
    projectCount: 2,
    projects: [
      { id: 5, name: 'ABP Rathkeale', location: 'Co. Limerick', surface: '1,600 m²', image: '/images/projects/abp-rathkeale/1_ABP_Rathkeale.jpg' },
      { id: 6, name: 'Europort Rosslare', location: 'Co. Wexford', surface: '2,400 m²', image: '/images/projects/europort-rosslare/12_Europort_Rosslare_Wexford.jpg' },
    ],
    specifications: [
      { label: 'Material', value: 'Aluminium 6063-T6' },
      { label: 'Thickness', value: '1.5-3mm' },
      { label: 'Profiles', value: '15+ standard options' },
      { label: 'Finish', value: 'Anodized or painted' }
    ]
  },
};

export default function Services({ onNavigate, initialService }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<ServiceType>(initialService ?? 'kingspan');

  const currentService = servicesData[selectedService];
  const CurrentIcon = currentService.icon;

  const allServices = Object.entries(servicesData).map(([key, data]) => ({
    key: key as ServiceType,
    title: data.title,
    tagline: data.tagline,
    icon: data.icon,
    image: data.image,
    projectCount: data.projectCount,
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
                Three Systems. One Team. One Less Subcontractor to Manage.
              </p>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
              Our <span className="text-blue-600">Services</span>
            </h1>
          </div>
        </div>
      </div>

      {/* ── Service selector cards ── */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {allServices.map((service) => {
              const Icon = service.icon;
              const isActive = selectedService === service.key;
              return (
                <button
                  key={service.key}
                  onClick={() => setSelectedService(service.key)}
                  className={`group relative rounded-2xl overflow-hidden transition-all duration-300 h-72 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    isActive
                      ? 'ring-2 ring-blue-600 shadow-2xl scale-[1.02]'
                      : 'hover:shadow-xl hover:scale-[1.01]'
                  }`}
                >
                  {/* Background image */}
                  <img
                    src={service.image}
                    alt={service.title}
                    width="600"
                    height="288"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient overlay — stronger when active */}
                  <div className={`absolute inset-0 transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-t from-[#1B3564]/95 via-[#1B3564]/50 to-black/20'
                      : 'bg-gradient-to-t from-black/90 via-black/50 to-black/10'
                  }`} />

                  {/* Project count badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full tracking-wider ${
                      isActive
                        ? 'bg-white text-[#1B3564]'
                        : 'bg-white/20 backdrop-blur-sm text-white border border-white/30'
                    }`}>
                      {service.projectCount} projects
                    </span>
                  </div>

                  {/* Active indicator top bar */}
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-white" />
                  )}

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    {/* Icon with ring + glow */}
                    <div className="mb-4 relative inline-flex">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-white shadow-lg shadow-white/30 ring-2 ring-white/50 ring-offset-2 ring-offset-transparent'
                          : 'bg-white/15 backdrop-blur-sm group-hover:bg-white/30 group-hover:shadow-lg'
                      }`}>
                        <Icon className={`w-7 h-7 transition-colors duration-300 ${isActive ? 'text-[#1B3564]' : 'text-white'}`} />
                      </div>
                    </div>
                    <h3 className="text-white font-bold text-lg leading-snug mb-2">
                      {service.title}
                    </h3>
                    <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                      isActive ? 'text-blue-100' : 'text-white/70'
                    }`}>
                      {service.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Service detail panel ── */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Left — image */}
            <div className="relative h-64 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={currentService.image}
                alt={currentService.title}
                width="800"
                height="500"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-8 left-8 bg-blue-600 p-5 rounded-2xl shadow-xl shadow-blue-600/40 ring-4 ring-blue-400/30">
                <CurrentIcon className="w-10 h-10 text-white" />
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/60 backdrop-blur-sm rounded-xl px-4 py-3">
                  <p className="text-white/60 text-xs font-semibold tracking-wider uppercase mb-1">Completed projects</p>
                  <p className="text-white font-bold text-lg">{currentService.projectCount} projects delivered</p>
                </div>
              </div>
            </div>

            {/* Right — content */}
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

              {/* Specs grid */}
              <div className="bg-white rounded-xl p-6 mb-8 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4 text-lg">Key Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {currentService.specifications.map((spec) => (
                    <div key={spec.label} className="border-l-2 border-blue-600 pl-3">
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{spec.label}</p>
                      <p className="text-base font-bold text-slate-900 mt-0.5">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Completed projects for this service ── */}
              <div className="mb-8">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Completed Projects
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {currentService.projects.map((project) => (
                    <button
                      key={project.name}
                      onClick={() => onNavigate('projects', project.id)}
                      className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-36 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <img
                        src={project.image}
                        alt={project.name}
                        width="300"
                        height="144"
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-black/10" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-blue-400 text-[10px] font-semibold mb-0.5">{project.surface}</p>
                        <p className="text-white font-bold text-xs leading-snug">{project.name}</p>
                        <p className="text-white/60 text-[10px] mt-0.5">{project.location}</p>
                      </div>
                    </button>
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

      {/* ── Features & Applications ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-8">Key Features</h3>
              <ul className="space-y-4">
                {currentService.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-1 group-hover:scale-110 transition-transform">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-8">Applications</h3>
              <div className="grid grid-cols-2 gap-4">
                {currentService.applications.map((app) => (
                  <div
                    key={app}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 border border-white/30 rounded-lg p-4 sm:p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-center group relative">
              <div className="w-16 h-16 rounded-full bg-black border-2 border-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                <Phone className="w-8 h-8 text-blue-500" />
              </div>
              <div className="md:ml-4 mt-4 md:mt-0 text-center md:text-left">
                <div className="text-lg font-semibold text-gray-300 mb-1">Phone</div>
                <a href="tel:+353833468913" className="text-xl text-white hover:text-blue-500 transition-colors duration-300">
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
                <a href="mailto:cladprimeco@outlook.com" className="text-base md:text-lg text-white hover:text-blue-500 transition-colors duration-300">
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

      <Footer />
      <BackToTop />
    </div>
  );
}
