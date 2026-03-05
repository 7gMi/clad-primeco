import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, Thermometer, Palette, Umbrella, Check, ExternalLink } from 'lucide-react';
import { ROUTES, ServiceType } from '../constants/routes';
import { usePageMeta } from '../hooks/usePageMeta';
import { servicesData } from '../data/services';
import type { LucideIcon } from 'lucide-react';

const serviceIcons: Record<string, LucideIcon> = {
  kingspan: Thermometer,
  architectural: Palette,
  aluminium: Umbrella,
};

export default function Services() {
  const navigate = useNavigate();
  const { serviceType: serviceParam } = useParams<{ serviceType?: string }>();
  const [selectedService, setSelectedService] = useState<ServiceType>((serviceParam as ServiceType) ?? 'kingspan');

  useEffect(() => {
    if (serviceParam && serviceParam in servicesData) {
      setSelectedService(serviceParam as ServiceType);
    }
  }, [serviceParam]);

  const currentService = servicesData[selectedService];
  const CurrentIcon = serviceIcons[selectedService];

  usePageMeta({
    title: `${currentService.title} | Clad-Primeco Services`,
    description: currentService.tagline,
  });

  const allServices = Object.entries(servicesData).map(([key, data]) => ({
    key: key as ServiceType,
    title: data.title,
    tagline: data.tagline,
    icon: serviceIcons[key],
    image: data.image,
    projectCount: data.projectCount,
  }));

  return (
    <div className="min-h-screen bg-white">
      <main>
      <div
        className="relative h-[66vh] bg-cover bg-center pt-20"
        style={{ backgroundImage: 'url(/images/backgrounds/kingspan-panel.webp)' }}
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

            {/* Left — image + materials (desktop) */}
            <div>
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

              {/* Materials block — desktop only */}
              <div className="hidden md:block mt-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 text-lg mb-3">{currentService.materials.heading}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">
                  {currentService.materials.description}
                </p>
                <div className="space-y-3 mb-5">
                  {currentService.materials.products.map((product) => (
                    <div key={product.name} className="flex items-start gap-3 bg-slate-50 rounded-lg p-3">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{product.name}</p>
                        <p className="text-slate-500 text-xs">{product.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <a
                  href={currentService.materials.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
                >
                  {currentService.materials.link.label}
                  <ExternalLink className="w-4 h-4" />
                </a>
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
                      onClick={() => navigate(ROUTES.PROJECT(project.id))}
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
                onClick={() => navigate(ROUTES.CONTACT, { state: { scrollToForm: true } })}
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

      </main>
    </div>
  );
}
