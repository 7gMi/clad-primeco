import { Phone, Mail, Instagram } from 'lucide-react';

export default function ContactBar() {
  return (
    <section className="bg-black text-white min-h-[33vh] flex items-center justify-center py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 border border-white/30 rounded-lg p-4 sm:p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-center group relative">
            <div className="w-16 h-16 rounded-full bg-black border-2 border-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
              <Phone className="w-8 h-8 text-blue-500" />
            </div>
            <div className="md:ml-4 mt-4 md:mt-0 text-center md:text-left">
              <div className="text-lg font-semibold text-gray-300 mb-1">Phone</div>
              <a
                href="tel:+353833468913"
                aria-label="Call Clad-Primeco at 083 346 8913"
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
                aria-label="Email Clad-Primeco at cladprimeco@outlook.com"
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
                aria-label="Follow Clad-Primeco on Instagram"
                className="text-xl text-white hover:text-blue-500 transition-colors duration-300"
              >
                @cladprimeco
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
