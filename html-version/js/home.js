// SVG Icon Definitions
const icons = {
  arrowRight: `<svg class="icon-arrow-right" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
  building: `<svg class="icon-building" viewBox="0 0 24 24"><path d="M4 20V10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10"></path><rect x="4" y="3" width="4" height="4"></rect><rect x="10" y="3" width="4" height="4"></rect><rect x="16" y="3" width="4" height="4"></rect></svg>`,
  layers: `<svg class="icon-layers" viewBox="0 0 24 24"><polygon points="12 2 2 7 2 12 12 17 22 12 22 7 12 2"></polygon><polyline points="2 12 12 17 22 12"></polyline><polyline points="2 7 12 12 22 7"></polyline></svg>`,
  shield: `<svg class="icon-shield" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
  menu: `<svg class="icon-menu" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`,
  close: `<svg class="icon-close" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  phone: `<svg class="icon-phone" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
  mail: `<svg class="icon-mail" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="M2 6l10 7.5L22 6"></path></svg>`,
  instagram: `<svg class="icon-instagram" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8" fill="none"></path><circle cx="18.5" cy="5.5" r="1.5" fill="currentColor"></circle></svg>`,
  fileText: `<svg class="icon-file-text" viewBox="0 0 24 24"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline><line x1="9" y1="13" x2="15" y2="13"></line><line x1="9" y1="17" x2="15" y2="17"></line></svg>`,
  penTool: `<svg class="icon-pen-tool" viewBox="0 0 24 24"><path d="M12 19l7-7 3 3S5 2 2 5l3 3 7 7"></path><path d="M18.5 9.5l-1.5-1.5"></path></svg>`,
  checkCircle: `<svg class="icon-check-circle" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
};

// Slide Data
const slides = [
  {
    id: 1,
    background: '/images/backgrounds/kingspan-panel copy.jpg',
    tagline: 'Professional Grade / Guaranteed Quality',
    title: 'Professional Kingspan Cladding Systems',
    subtitle: "Ireland's trusted partner for high-performance insulated panels. From small projects to large-scale developments, we deliver quality materials on time, every time."
  },
  {
    id: 2,
    background: '/images/architectural-panels/architectural-panels.jpg',
    tagline: 'Trusted Partner / Certified Solutions',
    title: 'Build Your Architectural Vision',
    subtitle: 'Our drive to succeed comes from delivering trusted cladding solutions. From concept to completion, we transform your designs into stunning, durable facades.'
  },
  {
    id: 3,
    background: '/images/backgrounds/school_carrigtohil.png',
    tagline: 'Eco-Friendly Materials / Sustainable Building',
    title: 'Durable Aluminium Cladding Systems',
    subtitle: 'Modern, eco-conscious cladding made from sustainable materials. Zero maintenance, maximum durability and safe for both your project and the environment.'
  }
];

// State Management
let state = {
  currentSlide: 0,
  isTransitioning: false,
  isScrolled: false,
  mobileMenuOpen: false,
  selectedProcess: null,
  activeButton: 'projects'
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initializeHeader();
  initializeSlider();
  initializeButtons();
  initializeProcess();
  setupScrollListener();
});

// Header Initialization
function initializeHeader() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const navButtons = document.querySelectorAll('nav button');

  mobileMenuBtn.addEventListener('click', () => {
    state.mobileMenuOpen = !state.mobileMenuOpen;
    mobileMenu.classList.toggle('open');
  });

  navButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      state.mobileMenuOpen = false;
      mobileMenu.classList.remove('open');
    });
  });
}

// Scroll Listener
function setupScrollListener() {
  const homeScrollContainer = document.querySelector('.home-scroll-container');
  const header = document.querySelector('header');

  homeScrollContainer?.addEventListener('scroll', () => {
    const scrollPosition = homeScrollContainer.scrollTop;
    const isScrolled = scrollPosition > 100;

    if (isScrolled !== state.isScrolled) {
      state.isScrolled = isScrolled;
      updateHeader();
    }
  });

  // Fallback for regular window scroll
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const isScrolled = scrollPosition > 100;

    if (isScrolled !== state.isScrolled) {
      state.isScrolled = isScrolled;
      updateHeader();
    }
  });
}

// Update Header
function updateHeader() {
  const header = document.querySelector('header');
  if (state.isScrolled) {
    header.classList.add('scrolled');
    header.classList.remove('not-scrolled');
  } else {
    header.classList.remove('scrolled');
    header.classList.add('not-scrolled');
  }
}

// Slider Initialization
function initializeSlider() {
  renderSlides();
  updateSlideIndicators();

  setInterval(() => {
    handleSlideChange((state.currentSlide + 1) % slides.length);
  }, 6000);
}

// Render Slides
function renderSlides() {
  const sliderBg = document.querySelector('.slider-background');

  sliderBg.innerHTML = slides.map((slide, index) => `
    <div class="slide-item ${index === state.currentSlide ? 'active' : ''}" data-slide="${index}">
      <img src="${slide.background}" alt="${slide.title}" />
      <div class="slide-overlay"></div>
    </div>
  `).join('');

  const heroText = document.querySelector('.hero-text');

  heroText.innerHTML = slides.map((slide, index) => `
    <div class="slide-content ${index === state.currentSlide ? 'active' : 'inactive'}" data-slide="${index}">
      <div class="hero-card">
        <p>${slide.tagline}</p>
        <h1>${slide.title}</h1>
        <h2>${slide.subtitle}</h2>
        <div class="hero-buttons">
          <button class="hero-btn ${state.activeButton === 'projects' ? 'active' : ''}" data-button="projects">
            Our Projects
          </button>
          <button class="hero-btn ${state.activeButton === 'quote' ? 'active' : ''}" data-button="quote">
            Free Consultation
          </button>
        </div>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.hero-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const button = btn.getAttribute('data-button');
      state.activeButton = button;
      updateButtonStates();
    });
  });
}

// Update Button States
function updateButtonStates() {
  document.querySelectorAll('.hero-btn').forEach(btn => {
    const button = btn.getAttribute('data-button');
    if (button === state.activeButton) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Handle Slide Change
function handleSlideChange(index) {
  if (state.isTransitioning) return;

  state.isTransitioning = true;
  state.currentSlide = index;

  const slides = document.querySelectorAll('.slide-item');
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });

  const contents = document.querySelectorAll('.slide-content');
  contents.forEach((content, i) => {
    if (i === index) {
      content.classList.add('active');
      content.classList.remove('inactive');
    } else {
      content.classList.remove('active');
      content.classList.add('inactive');
    }
  });

  updateSlideIndicators();

  setTimeout(() => {
    state.isTransitioning = false;
  }, 800);
}

// Update Slide Indicators
function updateSlideIndicators() {
  const indicators = document.querySelector('.slide-indicators');

  indicators.innerHTML = Array.from({ length: slides.length }).map((_, i) => `
    <button class="slide-dot ${i === state.currentSlide ? 'active' : ''}" data-slide="${i}" aria-label="Go to slide ${i + 1}"></button>
  `).join('');

  document.querySelectorAll('.slide-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-slide'));
      handleSlideChange(index);
    });
  });
}

// Initialize Buttons
function initializeButtons() {
  renderSlides();
}

// Initialize Process
function initializeProcess() {
  const processItems = document.querySelectorAll('.process-item');

  processItems.forEach((item, index) => {
    const btn = item.querySelector('.process-button');
    btn.addEventListener('click', () => {
      const isSelected = state.selectedProcess === index;
      state.selectedProcess = isSelected ? null : index;
      updateProcessStates();
    });
  });

  updateProcessStates();
}

// Update Process States
function updateProcessStates() {
  const processItems = document.querySelectorAll('.process-item');

  processItems.forEach((item, index) => {
    if (index === state.selectedProcess) {
      item.classList.add('selected');
    } else {
      item.classList.remove('selected');
    }
  });
}
