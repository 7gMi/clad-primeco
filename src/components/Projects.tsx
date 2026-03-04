import { useState } from 'react';
import { ArrowRight, Phone, Mail, Instagram, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Header from './Header';
import BackToTop from './BackToTop';
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
      title: 'Amazon — Dublin 104',
      client: 'Amazon',
      location: 'Dublin, Ireland',
      year: 2025,
      description: 'Large-scale cladding installation for Amazon\'s Dublin 104 facility. This project involved the supply and installation of high-performance cladding systems across the full building envelope, meeting strict client specifications and tight programme requirements.',
      specifications: {
        surface: 'N/A',
        materials: 'Architectural Cladding Systems',
        duration: 'N/A',
        status: 'Completed'
      },
      images: [
        '/images/projects/dub104-amazon/1_Dub104_Amazon.jpg',
        '/images/projects/dub104-amazon/2_Dub104_Amazon.jpg',
        '/images/projects/dub104-amazon/3_Dub104_Amazon.jpg',
        '/images/projects/dub104-amazon/4_Dub104_Amazon.jpg',
        '/images/projects/dub104-amazon/6_Dub104_Amazon.jpg',
        '/images/projects/dub104-amazon/10_Dub104_Amazon.JPG',
        '/images/projects/dub104-amazon/11_Dub104_Amazon.JPG',
      ],
      serviceType: 'Architectural Panels'
    },
    {
      id: 2,
      title: 'Vantage Power Station — Dublin 01',
      client: 'Vantage Data Centers',
      location: 'Dublin, Ireland',
      year: 2024,
      description: 'Cladding works on the Vantage Power Station facility in Dublin. The project required precision installation of industrial cladding systems to meet the demanding technical requirements of a critical energy infrastructure facility.',
      specifications: {
        surface: 'N/A',
        materials: 'Industrial Cladding Systems',
        duration: 'N/A',
        status: 'Completed'
      },
      images: [
        '/images/projects/dub01-vantage/10_Dub01_Vantage_Power_Station.jpg',
        '/images/projects/dub01-vantage/11_Dub01_Vantage_Power_Station.jpg',
        '/images/projects/dub01-vantage/12_Dub01_Vantage_Power_Station.jpg',
        '/images/projects/dub01-vantage/13_Dub01_Vantage_Power_Station.jpg',
        '/images/projects/dub01-vantage/14_Dub01_Vantage_Power_Station.jpg',
        '/images/projects/dub01-vantage/15_Dub01_Vantage_Power_Station.jpg',
        '/images/projects/dub01-vantage/16_Dub01_Vantage_Power_Station.jpg',
      ],
      serviceType: 'Industrial Cladding'
    },
    {
      id: 3,
      title: 'Carrigtwohil College',
      client: 'Department of Education',
      location: 'Carrigtwohil, Cork',
      year: 2024,
      description: 'Full cladding package for the new Carrigtwohil College building in Cork. The works included supply and installation of Kingspan insulated panels and architectural cladding systems, delivering both thermal performance and a modern aesthetic for the educational facility.',
      specifications: {
        surface: 'N/A',
        materials: 'Kingspan Panels + Architectural Systems',
        duration: 'N/A',
        status: 'Completed'
      },
      images: [
        '/images/projects/carrigtwohil-college/1_Carrigtwohil_College_Cork.jpg',
        '/images/projects/carrigtwohil-college/2_Carrigtwohil_College_Cork.jpg',
        '/images/projects/carrigtwohil-college/3_Carrigtwohil_College_Cork.jpg',
        '/images/projects/carrigtwohil-college/4_Carrigtwohil_College_Cork.jpg',
        '/images/projects/carrigtwohil-college/5_Carrigtwohil_College_Cork.jpg',
        '/images/projects/carrigtwohil-college/6_Carrigtwohil_College_Cork.jpg',
        '/images/projects/carrigtwohil-college/10_Carrigtwohil_College_Cork.jpg',
        '/images/projects/carrigtwohil-college/11_Carrigtwohil_College_Cork.jpg',
      ],
      serviceType: 'Mixed Systems'
    },
    {
      id: 4,
      title: 'Bausch & Lomb Facility',
      client: 'Bausch & Lomb',
      location: 'Waterford, Ireland',
      year: 2023,
      description: 'Cladding installation for the Bausch & Lomb manufacturing facility. This industrial project required high-precision cladding works to maintain the facility\'s operational continuity while achieving superior building envelope performance.',
      specifications: {
        surface: 'N/A',
        materials: 'Industrial Cladding Systems',
        duration: 'N/A',
        status: 'Completed'
      },
      images: [
        '/images/projects/bausch-lomb/1_Bausch%26lomb.jpg',
        '/images/projects/bausch-lomb/2_Bausch%26lomb.jpg',
        '/images/projects/bausch-lomb/3_Bausch%26lomb.jpg',
        '/images/projects/bausch-lomb/4_Bausch%26lomb.jpg',
        '/images/projects/bausch-lomb/5_Bausch%26lomb.jpg',
        '/images/projects/bausch-lomb/6_Bausch%26lomb.jpg',
        '/images/projects/bausch-lomb/10_Bausch%26lomb.jpg',
      ],
      serviceType: 'Kingspan Systems'
    },
    {
      id: 5,
      title: 'ABP Rathkeale',
      client: 'ABP Group',
      location: 'Rathkeale, Co. Limerick',
      year: 2023,
      description: 'Industrial cladding works for the ABP food processing facility in Rathkeale. The project involved full external cladding installation across multiple building sections, delivering a robust and thermally efficient envelope for this large-scale industrial client.',
      specifications: {
        surface: 'N/A',
        materials: 'Kingspan Insulated Panels',
        duration: 'N/A',
        status: 'Completed'
      },
      images: [
        '/images/projects/abp-rathkeale/1_ABP_Rathkeale.jpg',
        '/images/projects/abp-rathkeale/2_ABP_Rathkeale.jpg',
        '/images/projects/abp-rathkeale/3_ABP_Rathkeale.jpg',
        '/images/projects/abp-rathkeale/4_ABP_Rathkeale.jpg',
        '/images/projects/abp-rathkeale/5_ABP_Rathkeale.jpg',
        '/images/projects/abp-rathkeale/6_ABP_Rathkeale.jpg',
        '/images/projects/abp-rathkeale/7_ABP_Rathkeale.jpg',
      ],
      serviceType: 'Kingspan Systems'
    },
    {
      id: 6,
      title: 'Europort Rosslare',
      client: 'Rosslare Europort',
      location: 'Rosslare, Co. Wexford',
      year: 2024,
      description: 'Cladding installation at Rosslare Europort, one of Ireland\'s busiest ferry terminals. Works were carried out within an active port environment, requiring strict coordination with port operations to deliver the cladding package on schedule.',
      specifications: {
        surface: 'N/A',
        materials: 'Architectural Cladding Systems',
        duration: 'N/A',
        status: 'Completed'
      },
      images: [
        '/images/projects/europort-rosslare/12_Europort_Rosslare_Wexford.jpg',
        '/images/projects/europort-rosslare/17_Europort_Rosslare_Wexford.jpg',
      ],
      serviceType: 'Architectural Panels'
    },
    {
      id: 7,
      title: 'Lily Superstore',
      client: 'Lily Retail Group',
      location: 'Limerick, Ireland',
      year: 2025,
      description: 'Cladding and facade works for the Lily Superstore in Limerick. The project delivered a modern, high-quality exterior finish that enhances the retail building\'s visual identity while providing long-term weather protection and thermal performance.',
      specifications: {
        surface: 'N/A',
        materials: 'Architectural Cladding',
        duration: 'N/A',
        status: 'Completed'
      },
      images: [
        '/images/projects/lily-superstore/14_Lily_Superstore_Limerick.jpg',
        '/images/projects/lily-superstore/16_Lily_Superstore_Limerick.jpg',
      ],
      serviceType: 'Architectural Panels'
    },
    {
      id: 8,
      title: 'Sandyford Warehouse & Depot',
      client: 'Confidential',
      location: 'Sandyford, Dublin',
      year: 2025,
      description: 'Supply and installation of cladding systems for a warehouse and depot facility in Sandyford Business District, Dublin. The project was completed on programme, delivering a durable and well-finished building envelope for the commercial client.',
      specifications: {
        surface: 'N/A',
        materials: 'Kingspan Panels',
        duration: 'N/A',
        status: 'Completed'
      },
      images: [
        '/images/projects/sandyford-warehouse/1_Sandyford_Warehouse_Depot.JPG',
        '/images/projects/sandyford-warehouse/2_Sandyford_Warehouse_Depot.JPG',
        '/images/projects/sandyford-warehouse/3_Sandyford_Warehouse_Depot.JPG',
        '/images/projects/sandyford-warehouse/4_Sandyford_Warehouse_Depot.JPG',
        '/images/projects/sandyford-warehouse/5_Sandyford_Warehouse_Depot.JPG',
        '/images/projects/sandyford-warehouse/6_Sandyford_Warehouse_Depot.JPG',
      ],
      serviceType: 'Kingspan Systems'
    },
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[150] flex items-center justify-center p-4 pt-20 md:pt-4">
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

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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
