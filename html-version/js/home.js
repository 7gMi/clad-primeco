// JavaScript for Clad Primeco Website

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
  initializeSlideIndicators();

  setInterval(() => {
    handleSlideChange((state.currentSlide + 1) % 3);
  }, 6000);
}

// Initialize Slide Indicators
function initializeSlideIndicators() {
  document.querySelectorAll('.slide-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-slide'));
      handleSlideChange(index);
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
  document.querySelectorAll('.slide-dot').forEach((dot, i) => {
    if (i === state.currentSlide) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Initialize Buttons
function initializeButtons() {
  document.querySelectorAll('.hero-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const button = btn.getAttribute('data-button');
      state.activeButton = button;
      updateButtonStates();
    });
  });
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
