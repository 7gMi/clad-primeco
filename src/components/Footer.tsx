export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
        <div className="flex justify-center gap-6 text-sm">
          <a href="tel:+353833468913" className="hover:text-white transition-colors duration-200">083 346 8913</a>
          <a href="mailto:cladprimeco@outlook.com" className="hover:text-white transition-colors duration-200">cladprimeco@outlook.com</a>
        </div>
        <p className="text-sm md:text-base">
          &copy;2023-2026 Clad Primeco Professional Cladding - Industrial Building Solutions. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
