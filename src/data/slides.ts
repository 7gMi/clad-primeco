export interface Slide {
  id: number;
  background: string;
  tagline: string;
  title: string;
  subtitle: string;
}

export const slides: Slide[] = [
  {
    id: 1,
    background: '/images/backgrounds/kingspan-panel.jpg',
    tagline: 'Professional Grade / Guaranteed Quality',
    title: 'Professional Kingspan Cladding Systems',
    subtitle: "Ireland's trusted partner for high-performance insulated panels. From small projects to large-scale developments, we deliver quality materials on time, every time."
  },
  {
    id: 2,
    background: '/images/architectural-panels/architectural-panels.jpg',
    tagline: 'Trusted Partner / Certified Solutions',
    title: 'Build Your Architectural Vision',
    subtitle: 'Our drive to succeed comes from delivering trusted cladding solutions. From concept to completion, we transform your designs into stunning, durable facades.'
  },
  {
    id: 3,
    background: '/images/backgrounds/school_carrigtohil.jpg',
    tagline: 'Eco-Friendly Materials / Sustainable Building',
    title: 'Durable Aluminium Cladding Systems',
    subtitle: 'Modern, eco-conscious cladding made from sustainable materials. Zero maintenance, maximum durability and safe for both your project and the environment.'
  }
];
