let state = {
  currentSlide: 0,
  isTransitioning: false,
  isScrolled: false,
  mobileMenuOpen: false,
  selectedProcess: null,
  activeButton: 'projects'
};

document.addEventListener('DOMContentLoaded', () => {
  initializeHeader();
  initializeSlider();
  initializeButtons();
  initializeProcess();
  setupScrollListener();
});

function initializeHeader() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const navLinks = document.querySelectorAll('.mobile-menu nav a');

  mobileMenuBtn.addEventListener('click', () => {
    state.mobileMenuOpen = !state.mobileMenuOpen;
    mobileMenu.classList.toggle('open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      state.mobileMenuOpen = false;
      mobileMenu.classList.remove('open');
    });
  });
}

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

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const isScrolled = scrollPosition > 100;

    if (isScrolled !== state.isScrolled) {
      state.isScrolled = isScrolled;
      updateHeader();
    }
  });
}

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

function initializeSlider() {
  initializeSlideIndicators();

  setInterval(() => {
    handleSlideChange((state.currentSlide + 1) % 3);
  }, 6000);
}

function initializeSlideIndicators() {
  document.querySelectorAll('.slide-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-slide'));
      handleSlideChange(index);
    });
  });
}

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

function updateSlideIndicators() {
  document.querySelectorAll('.slide-dot').forEach((dot, i) => {
    if (i === state.currentSlide) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function initializeButtons() {
  document.querySelectorAll('.hero-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const button = btn.getAttribute('data-button');
      state.activeButton = button;
      updateButtonStates();
    });
  });
}

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
