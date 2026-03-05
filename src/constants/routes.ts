export type ServiceType = 'kingspan' | 'architectural' | 'aluminium';

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  SERVICE: (type: ServiceType) => `/services/${type}`,
  PROJECTS: '/projects',
  PROJECT: (id: number) => `/projects/${id}`,
  CONTACT: '/contact',
  PRIVACY: '/privacy-policy',
  ADMIN: '/admin',
} as const;

/** Prefetch map — maps route paths to the dynamic import that loads them. */
export const prefetchMap: Record<string, () => Promise<unknown>> = {
  [ROUTES.ABOUT]: () => import('../components/About'),
  [ROUTES.SERVICES]: () => import('../components/Services'),
  [ROUTES.PROJECTS]: () => import('../components/Projects'),
  [ROUTES.CONTACT]: () => import('../components/Contact'),
  [ROUTES.PRIVACY]: () => import('../components/PrivacyPolicy'),
};

export function prefetchRoute(path: string): void {
  const loader = prefetchMap[path];
  if (loader) loader();
}
