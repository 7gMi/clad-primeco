let globalState = {
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

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      globalState.mobileMenuOpen = !globalState.mobileMenuOpen;
      mobileMenu.classList.toggle('open');

      const menuIcon = mobileMenuBtn.querySelector('.icon-menu');
      const closeIcon = mobileMenuBtn.querySelector('.icon-close');

      if (menuIcon && closeIcon) {
        if (globalState.mobileMenuOpen) {
          menuIcon.style.display = 'none';
          closeIcon.style.display = 'block';
        } else {
          menuIcon.style.display = 'block';
          closeIcon.style.display = 'none';
        }
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        globalState.mobileMenuOpen = false;
        mobileMenu.classList.remove('open');

        const menuIcon = mobileMenuBtn.querySelector('.icon-menu');
        const closeIcon = mobileMenuBtn.querySelector('.icon-close');

        if (menuIcon && closeIcon) {
          menuIcon.style.display = 'block';
          closeIcon.style.display = 'none';
        }
      });
    });
  }
}

function setupScrollListener() {
  const homeScrollContainer = document.querySelector('.home-scroll-container');

  if (homeScrollContainer) {
    homeScrollContainer.addEventListener('scroll', () => {
      const scrollPosition = homeScrollContainer.scrollTop;
      const isScrolled = scrollPosition > 100;

      if (isScrolled !== globalState.isScrolled) {
        globalState.isScrolled = isScrolled;
        updateHeader();
      }
    });
  }

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const isScrolled = scrollPosition > 100;

    if (isScrolled !== globalState.isScrolled) {
      globalState.isScrolled = isScrolled;
      updateHeader();
    }
  });
}

function updateHeader() {
  const header = document.querySelector('header');
  if (header) {
    if (globalState.isScrolled) {
      header.classList.add('scrolled');
      header.classList.remove('not-scrolled');
    } else {
      header.classList.remove('scrolled');
      header.classList.add('not-scrolled');
    }
  }
}
