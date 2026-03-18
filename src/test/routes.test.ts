import { describe, it, expect } from 'vitest';
import { ROUTES } from '../constants/routes';

describe('ROUTES', () => {
  it('has correct static paths', () => {
    expect(ROUTES.HOME).toBe('/');
    expect(ROUTES.ABOUT).toBe('/about');
    expect(ROUTES.SERVICES).toBe('/services');
    expect(ROUTES.PROJECTS).toBe('/projects');
    expect(ROUTES.CONTACT).toBe('/contact');
    expect(ROUTES.PRIVACY).toBe('/privacy-policy');
    expect(ROUTES.ADMIN).toBe('/admin');
  });

  it('SERVICE() builds correct path', () => {
    expect(ROUTES.SERVICE('kingspan')).toBe('/services/kingspan');
    expect(ROUTES.SERVICE('architectural')).toBe('/services/architectural');
    expect(ROUTES.SERVICE('aluminium')).toBe('/services/aluminium');
  });

  it('PROJECT() builds correct path', () => {
    expect(ROUTES.PROJECT(1)).toBe('/projects/1');
    expect(ROUTES.PROJECT(42)).toBe('/projects/42');
  });
});
