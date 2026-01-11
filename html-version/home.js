// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initSlider();
  initProcessButtons();
  smoothScroll();
});

// ==================== HEADER SCROLL BEHAVIOR ====================

function initHeader() {
  const header = document.getElementById('header');
  let scrollTimeout;

  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);

    const scrollPosition = window.scrollY;

    if (scrollPosition > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ==================== SLIDER ====================

function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const indicators = document.querySelectorAll('.indicator');
  let currentSlide = 0;
  let isTransitioning = false;
  let autoplayInterval;

  const totalSlides = slides.length;

  function showSlide(index) {
    if (isTransitioning) return;

    isTransitioning = true;

    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    slides[index].classList.add('active');
    indicators[index].classList.add('active');

    currentSlide = index;

    setTimeout(() => {
      isTransitioning = false;
    }, 800);
  }

  function nextSlide() {
    const nextIndex = (currentSlide + 1) % totalSlides;
    showSlide(nextIndex);
  }

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 6000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  // Initialize first slide
  showSlide(0);

  // Start autoplay
  startAutoplay();

  // Indicator click handlers
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      showSlide(index);
      resetAutoplay();
    });
  });

  // Pause on hover
  document.querySelector('.slides-container').addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
  });

  document.querySelector('.slides-container').addEventListener('mouseleave', () => {
    startAutoplay();
  });

  // Pause on mobile touch
  let touchStartX = 0;
  let touchEndX = 0;

  document.querySelector('.slides-container').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(autoplayInterval);
  });

  document.querySelector('.slides-container').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    resetAutoplay();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prevIndex);
      }
    }
  }
}

// ==================== PROCESS BUTTONS ====================

function initProcessButtons() {
  const processSteps = document.querySelectorAll('.process-step');

  processSteps.forEach((step, index) => {
    const button = step.querySelector('.process-button');

    button.addEventListener('click', () => {
      const isSelected = step.classList.contains('selected');

      processSteps.forEach(s => s.classList.remove('selected'));

      if (!isSelected) {
        step.classList.add('selected');
      }
    });

    // Optional: Auto-select first step on load
    if (index === 0) {
      step.classList.add('selected');
    }
  });
}

// ==================== SMOOTH SCROLL ====================

function smoothScroll() {
  const navLinks = document.querySelectorAll('.nav-menu a');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');

      if (targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const headerHeight = document.getElementById('header').offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Also handle logo click
  document.querySelector('.logo-container').addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.service-card, .process-step, .contact-item').forEach(el => {
    observer.observe(el);
  });
}

// Initialize scroll animations when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
  initScrollAnimations();
}

// ==================== KEYBOARD NAVIGATION ====================

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    const prevSlide = (parseInt(document.querySelector('.slide.active').dataset.slide) - 2 + 3) % 3;
    document.querySelector(`[data-slide="${prevSlide + 1}"]`).click();
  } else if (e.key === 'ArrowRight') {
    const nextSlide = parseInt(document.querySelector('.slide.active').dataset.slide) % 3;
    document.querySelector(`[data-slide="${nextSlide + 1}"]`).click();
  }
});
