import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

// Mock env vars before importing Contact
vi.stubEnv('VITE_SUPABASE_URL', 'https://test.supabase.co');
vi.stubEnv('VITE_SUPABASE_ANON_KEY', 'test-key');
vi.stubEnv('VITE_HCAPTCHA_SITEKEY', '');

// Mock HCaptcha
vi.mock('@hcaptcha/react-hcaptcha', () => ({
  default: () => <div data-testid="hcaptcha-mock">hCaptcha</div>,
}));

const { default: Contact } = await import('../components/Contact');

function renderContact() {
  return render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>,
  );
}

describe('Contact page', () => {
  it('renders contact form with all fields', () => {
    renderContact();
    expect(screen.getByLabelText(/^name$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^message$/i)).toBeInTheDocument();
  });

  it('renders contact info (phone and email)', () => {
    renderContact();
    expect(screen.getByText('083 346 8913')).toBeInTheDocument();
    expect(screen.getByText('cladprimeco@outlook.com')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    renderContact();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('submit button is disabled without captcha', () => {
    renderContact();
    const btn = screen.getByRole('button', { name: /send message/i });
    expect(btn).toBeDisabled();
  });

  it('allows typing in form fields', async () => {
    const user = userEvent.setup();
    renderContact();

    const nameInput = screen.getByLabelText(/^name$/i);
    await user.type(nameInput, 'John Doe');
    expect(nameInput).toHaveValue('John Doe');

    const emailInput = screen.getByLabelText(/^email$/i);
    await user.type(emailInput, 'john@test.com');
    expect(emailInput).toHaveValue('john@test.com');

    const messageInput = screen.getByLabelText(/^message$/i);
    await user.type(messageInput, 'Hello');
    expect(messageInput).toHaveValue('Hello');
  });

  it('renders privacy policy link', () => {
    renderContact();
    expect(screen.getByRole('link', { name: /privacy policy/i })).toHaveAttribute(
      'href',
      '/privacy-policy',
    );
  });

  it('renders service dropdown with options', () => {
    renderContact();
    const select = screen.getByLabelText(/service/i);
    expect(select).toBeInTheDocument();
    expect(screen.getByText('Kingspan Cladding')).toBeInTheDocument();
    expect(screen.getByText('Architectural Panels')).toBeInTheDocument();
    expect(screen.getByText(/aluminium copings/i)).toBeInTheDocument();
  });
});
