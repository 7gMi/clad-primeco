import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Layout } from '../App';

describe('Layout', () => {
  it('renders skip-to-content link', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>,
    );
    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('renders main element with id', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>,
    );
    const main = document.getElementById('main-content');
    expect(main).toBeInTheDocument();
    expect(main?.tagName).toBe('MAIN');
  });

  it('renders header', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>,
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders footer', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>,
    );
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
