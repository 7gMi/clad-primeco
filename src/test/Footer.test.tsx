import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../components/Footer';

describe('Footer', () => {
  it('renders copyright text', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`2023-${year}`))).toBeInTheDocument();
  });

  it('renders phone link', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    const phone = screen.getByText('083 346 8913');
    expect(phone).toHaveAttribute('href', 'tel:+353833468913');
  });

  it('renders email link', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    const email = screen.getByText('cladprimeco@outlook.com');
    expect(email).toHaveAttribute('href', 'mailto:cladprimeco@outlook.com');
  });

  it('renders privacy policy link', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });

  it('renders creator credit with link', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    expect(screen.getByText('Mihai Gaina')).toBeInTheDocument();
    expect(screen.getByText(/Need a website/)).toBeInTheDocument();
  });
});
