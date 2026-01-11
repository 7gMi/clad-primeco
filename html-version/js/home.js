let homeState = {
  currentSlide: 0,
  isTransitioning: false,
  selectedProcess: null,
  activeButton: 'projects'
};

document.addEventListener('DOMContentLoaded', () => {
  initializeSlider();
  initializeButtons();
  initializeProcess();
});

function initializeSlider() {
  initializeSlideIndicators();

  setInterval(() => {
    handleSlideChange((homeState.currentSlide + 1) % 3);
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
    if (button === homeState.activeButton) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function handleSlideChange(index) {
  if (homeState.isTransitioning) return;

  homeState.isTransitioning = true;
  homeState.currentSlide = index;

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
    homeState.isTransitioning = false;
  }, 800);
}

function updateSlideIndicators() {
  document.querySelectorAll('.slide-dot').forEach((dot, i) => {
    if (i === homeState.currentSlide) {
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
      homeState.activeButton = button;
      updateButtonStates();
    });
  });
}

function initializeProcess() {
  const processItems = document.querySelectorAll('.process-item');

  processItems.forEach((item) => {
    const index = parseInt(item.getAttribute('data-index'));
    const btn = item.querySelector('.process-button');

    if (btn) {
      btn.addEventListener('click', () => {
        const isSelected = homeState.selectedProcess === index;
        homeState.selectedProcess = isSelected ? null : index;
        updateProcessStates();
      });
    }
  });

  updateProcessStates();
}

function updateProcessStates() {
  const processItems = document.querySelectorAll('.process-item');

  processItems.forEach((item) => {
    const index = parseInt(item.getAttribute('data-index'));
    if (index === homeState.selectedProcess) {
      item.classList.add('selected');
    } else {
      item.classList.remove('selected');
    }
  });
}
