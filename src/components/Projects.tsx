import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ROUTES } from '../constants/routes';
import { usePageMeta } from '../hooks/usePageMeta';
import { projects } from '../data/projects';

export default function Projects() {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId?: string }>();
  const [selectedProject, setSelectedProject] = useState<number | null>(projectId ? Number(projectId) : null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (projectId) {
      setSelectedProject(Number(projectId));
      setCurrentImageIndex(0);
    } else {
      setSelectedProject(null);
    }
  }, [projectId]);

  usePageMeta({
    title: 'Our Projects | Clad-Primeco',
    description: 'Featured cladding and roofing projects across Ireland — Amazon, Vantage Data Centers, Bausch & Lomb, and more.',
  });

  const currentProject = selectedProject !== null ? projects.find(p => p.id === selectedProject) : null;

  const nextImage = useCallback(() => {
    if (currentProject) {
      setCurrentImageIndex((prev) => (prev + 1) % currentProject.images.length);
    }
  }, [currentProject]);

  const prevImage = useCallback(() => {
    if (currentProject) {
      setCurrentImageIndex((prev) => (prev - 1 + currentProject.images.length) % currentProject.images.length);
    }
  }, [currentProject]);

  // Keyboard navigation: ArrowLeft/Right for images, Escape to close
  useEffect(() => {
    if (!currentProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextImage();
      else if (e.key === 'ArrowLeft') prevImage();
      else if (e.key === 'Escape') { setSelectedProject(null); setCurrentImageIndex(0); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentProject, nextImage, prevImage]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!currentProject) return;
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
    };
  }, [currentProject]);

  return (
    <div className="min-h-screen bg-white">
      <main>
      <div
        className="relative h-[66vh] bg-cover bg-center pt-20"
        style={{ backgroundImage: 'url(/images/backgrounds/4k.webp)' }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative h-full flex items-center px-8 md:px-16 lg:px-24">
          <div className="max-w-7xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-16 bg-blue-500/50"></div>
              <p className="text-white text-base md:text-lg font-light">
                Delivered Across Ireland
              </p>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
              Featured <span className="text-blue-600">Projects</span>
            </h1>
          </div>
        </div>
      </div>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => {
                  setSelectedProject(project.id);
                  setCurrentImageIndex(0);
                }}
                className="group text-left rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    width="600"
                    height="256"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-blue-400 text-sm font-semibold mb-1.5">{project.serviceType}</p>
                    <h3 className="text-white font-bold text-lg leading-snug">{project.title}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-slate-600 text-sm font-medium mb-1">{project.location}</p>
                  <p className="text-slate-400 text-xs font-medium tracking-wide">{project.year}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {currentProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[150] flex items-start md:items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) { setSelectedProject(null); setCurrentImageIndex(0); } }}
        >
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[85vh] md:max-h-[90vh] overflow-y-auto mt-16 md:mt-0">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 md:px-8 py-4 flex items-center justify-between z-10">
              <h2 id="project-modal-title" className="text-2xl md:text-3xl font-bold text-slate-900">
                {currentProject.title}
              </h2>
              <button
                aria-label="Close project detail"
                onClick={() => {
                  setSelectedProject(null);
                  setCurrentImageIndex(0);
                }}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-1"
              >
                <X className="w-6 h-6 text-slate-600" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6 md:p-8">
              <div className="mb-8">
                <div className="relative h-56 md:h-96 bg-slate-900 rounded-xl overflow-hidden mb-4">
                  <img
                    src={currentProject.images[currentImageIndex]}
                    alt={`${currentProject.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain"
                    width="800"
                    height="500"
                    loading="lazy"
                    decoding="async"
                  />
                  <button
                    onClick={prevImage}
                    aria-label="Previous image"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full transition-all"
                  >
                    <ChevronLeft className="w-6 h-6 text-slate-900" />
                  </button>
                  <button
                    onClick={nextImage}
                    aria-label="Next image"
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
                      key={`${currentProject.id}-${index}`}
                      aria-label={`View photo ${index + 1} of ${currentProject.images.length}`}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index
                          ? 'border-blue-600'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${currentProject.title} — photo ${index + 1} of ${currentProject.images.length}`}
                        width="200"
                        height="80"
                        loading="lazy"
                        decoding="async"
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
                  navigate(ROUTES.CONTACT, { state: { scrollToForm: true } });
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold inline-flex items-center justify-center gap-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Request a Quote for a Similar Project
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      </main>
    </div>
  );
}
