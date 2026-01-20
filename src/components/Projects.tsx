import { useState } from 'react';
import { ArrowRight, Phone, Mail, Instagram, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Header from './Header';
import { Page } from '../App';

interface ProjectsProps {
  onNavigate: (page: Page) => void;
}

interface Project {
  id: number;
  title: string;
  client: string;
  location: string;
  year: number;
  description: string;
  specifications: {
    surface: string;
    materials: string;
    duration: string;
    status: string;
  };
  images: string[];
  serviceType: string;
}

export default function Projects({ onNavigate }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Amazon Data Center - Dublin',
      client: 'Amazon Web Services',
      location: 'Dublin, Ireland',
      year: 2024,
      description: 'Large-scale data center facility with architectural cladding systems. This project showcases our ability to deliver premium cladding solutions for mission-critical infrastructure. The installation featured custom architectural panels with precision engineering to meet strict AWS specifications.',
      specifications: {
        surface: '45,000 m²',
        materials: 'Architectural Panels + Kingspan Systems',
        duration: '18 months',
        status: 'Completed'
      },
      images: [
        '/images/architectural-panels/amazon1.jpg',
        '/images/architectural-panels/amazon2.jpg',
        '/images/architectural-panels/amazon4.jpg',
        '/images/architectural-panels/amazon_3.jpg'
      ],
      serviceType: 'Architectural Panels'
    },
    {
      id: 2,
      title: 'Carrigtwohill School Complex',
      client: 'Department of Education',
      location: 'Cork, Ireland',
      year: 2023,
      description: 'Modern educational facility featuring comprehensive cladding solutions. This project combined both Kingspan insulated panels for thermal efficiency and architectural panels for aesthetic appeal. The school achieved LEED certification partly through our high-performance cladding systems.',
      specifications: {
        surface: '28,500 m²',
        materials: 'Kingspan Panels + Architectural Systems',
        duration: '14 months',
        status: 'Completed'
      },
      images: [
        '/images/backgrounds/school_carrigtohil.png',
        '/images/backgrounds/school_carrigtohil copy.png',
        '/images/architectural-panels/amazon1 copy.jpg',
        '/images/backgrounds/amazon-dub104.jpg'
      ],
      serviceType: 'Mixed Systems'
    },
    {
      id: 3,
      title: 'Industrial Warehouse - Cork',
      client: 'Logistics Plus',
      location: 'Cork, Ireland',
      year: 2023,
      description: 'High-performance warehouse facility with premium insulation and rapid installation. This project demonstrates our expertise in industrial applications, delivering superior thermal performance and durability. The facility now operates at 40% lower energy costs.',
      specifications: {
        surface: '32,000 m²',
        materials: 'Kingspan Panels 100mm',
        duration: '9 months',
        status: 'Completed'
      },
      images: [
        '/images/kingspan-panel.jpg',
        '/images/backgrounds/kingspan-panel.jpg',
        '/images/backgrounds/kingspan-panel copy.jpg',
        '/images/architectural-panels/amazon2 copy.jpg'
      ],
      serviceType: 'Kingspan Systems'
    },
    {
      id: 4,
      title: 'Commercial Office Building - Dublin',
      client: 'Commercial Developers Ltd',
      location: 'Dublin, Ireland',
      year: 2022,
      description: 'Premium office building with architectural cladding creating a striking modern facade. This project required precision installation of custom architectural panels with integrated drainage systems. The building became an architectural landmark in Dublin\'s financial district.',
      specifications: {
        surface: '18,500 m²',
        materials: 'Premium Architectural Panels',
        duration: '12 months',
        status: 'Completed'
      },
      images: [
        '/images/backgrounds/aluminium-cladding.jpg',
        '/images/aluminium-copings/aluminium-copings.jpg',
        '/images/architectural-panels/amazon1 copy.jpg',
        '/images/backgrounds/kingspan-panel.jpg'
      ],
      serviceType: 'Architectural Panels'
    },
    {
      id: 5,
      title: 'Aluminium Copings Installation - Multiple Sites',
      client: 'National Building Services',
      location: 'Ireland (National)',
      year: 2023,
      description: 'Comprehensive aluminium copings and trim installation across multiple industrial facilities. This contract showcased our expertise in finishing systems and precision metalwork. All installations completed to specification with zero defects.',
      specifications: {
        surface: '12,500 m (linear)',
        materials: 'Anodized Aluminium Profiles',
        duration: '6 months',
        status: 'Completed'
      },
      images: [
        '/images/aluminium-copings/aluminium-copings.jpg',
        '/images/aluminium-copings/aluminium-coppings-1.jpg',
        '/images/aluminium-copings/aluminium-coppings-2.jpg',
        '/images/aluminium-copings/aluminium-coppings-3.jpg'
      ],
      serviceType: 'Aluminium Systems'
    },
    {
      id: 6,
      title: 'Healthcare Facility - Galway',
      client: 'Irish Health Systems',
      location: 'Galway, Ireland',
      year: 2022,
      description: 'Modern healthcare facility with fire-rated cladding systems and enhanced insulation. This project required specialized fire protection cladding meeting stringent healthcare standards. The facility features state-of-the-art thermal and acoustic performance.',
      specifications: {
        surface: '22,000 m²',
        materials: 'Fire-Rated Panels + Kingspan',
        duration: '16 months',
        status: 'Completed'
      },
      images: [
        '/images/backgrounds/4k.jpg',
        '/images/architectural-panels/architectural-panels.jpg',
        '/images/backgrounds/kingspan-panel.jpg',
        '/images/backgrounds/aluminium-cladding.jpg'
      ],
      serviceType: 'Specialized Systems'
    }
  ];

  const currentProject = selectedProject !== null ? projects.find(p => p.id === selectedProject) : null;

  const nextImage = () => {
    if (currentProject) {
      setCurrentImageIndex((prev) => (prev + 1) % currentProject.images.length);
    }
  };

  const prevImage = () => {
    if (currentProject) {
      setCurrentImageIndex((prev) => (prev - 1 + currentProject.images.length) % currentProject.images.length);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={onNavigate} currentPage="projects" />

      <div
        className="relative h-[66vh] bg-cover bg-center pt-20"
        style={{ backgroundImage: 'url(/images/backgrounds/4k.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex items-center px-8 md:px-16 lg:px-24">
          <div className="max-w-7xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-16 bg-blue-500/50"></div>
              <p className="text-white text-base md:text-lg font-light">
                Our Portfolio
              </p>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
              Featured <span className="text-blue-600">Projects</span>
            </h1>
          </div>
        </div>
      </div>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => {
                  setSelectedProject(project.id);
                  setCurrentImageIndex(0);
                }}
                className="group text-left rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-blue-400 text-sm font-semibold mb-2">{project.serviceType}</p>
                    <h3 className="text-white font-bold text-lg">{project.title}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-slate-600 text-sm mb-2">{project.location}</p>
                  <p className="text-slate-500 text-xs">{project.year}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {currentProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 md:px-8 py-4 flex items-center justify-between z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                {currentProject.title}
              </h2>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  setCurrentImageIndex(0);
                }}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="p-6 md:p-8">
              <div className="mb-8">
                <div className="relative h-96 bg-slate-200 rounded-xl overflow-hidden mb-4">
                  <img
                    src={currentProject.images[currentImageIndex]}
                    alt={`${currentProject.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full transition-all"
                  >
                    <ChevronLeft className="w-6 h-6 text-slate-900" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full transition-all"
                  >
                    <ChevronRight className="w-6 h-6 text-slate-900" />
                  </button>
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm font-medium">
                    {currentImageIndex + 1} / {currentProject.images.length}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {currentProject.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index
                          ? 'border-blue-600'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-slate-600 mb-4 leading-relaxed text-lg">
                    {currentProject.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 mb-4 text-xl">Project Details</h3>
                  <div className="space-y-4">
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-slate-600 text-sm font-medium">Client</p>
                      <p className="text-slate-900 font-semibold">{currentProject.client}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-slate-600 text-sm font-medium">Location</p>
                      <p className="text-slate-900 font-semibold">{currentProject.location}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-slate-600 text-sm font-medium">Service Type</p>
                      <p className="text-slate-900 font-semibold">{currentProject.serviceType}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-slate-600 text-sm font-medium">Status</p>
                      <p className="text-green-600 font-semibold">{currentProject.specifications.status}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-200">
                <h3 className="font-bold text-slate-900 mb-4 text-lg">Specifications</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-slate-600 text-sm font-medium mb-1">Surface Area</p>
                    <p className="text-slate-900 font-bold text-lg">{currentProject.specifications.surface}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 text-sm font-medium mb-1">Materials</p>
                    <p className="text-slate-900 font-bold">{currentProject.specifications.materials}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 text-sm font-medium mb-1">Duration</p>
                    <p className="text-slate-900 font-bold">{currentProject.specifications.duration}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 text-sm font-medium mb-1">Year Completed</p>
                    <p className="text-slate-900 font-bold">{currentProject.year}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedProject(null);
                  onNavigate('contact');
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold inline-flex items-center justify-center gap-2 transition-all"
              >
                Interested? Contact Us
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

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
                  href="mailto:cladprimeco@gmail.com"
                  className="text-base md:text-lg text-white hover:text-blue-500 transition-colors duration-300"
                >
                  cladprimeco@gmail.com
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
    </div>
  );
}
