import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from '../components/Navigation';

function renderNav(props = {}) {
  return render(
    <MemoryRouter>
      <Navigation currentPath="/" isScrolled={false} {...props} />
    </MemoryRouter>,
  );
}

describe('Navigation', () => {
  it('renders all desktop nav links', () => {
    renderNav();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Services' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
  });

  it('renders Get a Quote CTA button', () => {
    renderNav();
    expect(screen.getByRole('button', { name: /get a quote/i })).toBeInTheDocument();
  });

  it('marks current page as active (aria-current)', () => {
    renderNav({ currentPath: '/about' });
    const aboutLinks = screen.getAllByRole('link', { name: 'About' });
    const desktopAbout = aboutLinks.find((link) => link.getAttribute('aria-current') === 'page');
    expect(desktopAbout).toBeDefined();
  });

  it('Home link has correct href', () => {
    renderNav();
    const homeLinks = screen.getAllByRole('link', { name: 'Home' });
    expect(homeLinks[0]).toHaveAttribute('href', '/');
  });

  it('renders hamburger button for mobile', () => {
    renderNav();
    expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument();
  });

  it('mobile menu panel has aria-hidden true by default', () => {
    renderNav();
    const panel = document.getElementById('mobile-menu');
    expect(panel).toHaveAttribute('aria-hidden', 'true');
  });

  it('mobile menu panel has role dialog', () => {
    renderNav();
    const panel = document.getElementById('mobile-menu');
    expect(panel).toHaveAttribute('role', 'dialog');
  });
});
