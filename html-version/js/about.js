let state = {
  isScrolled: false,
  mobileMenuOpen: false
};

document.addEventListener('DOMContentLoaded', () => {
  initializeHeader();
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
