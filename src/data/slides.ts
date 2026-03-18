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
    background: '/images/backgrounds/school_carrigtohil.webp',
    tagline: 'Kingspan Certified Installer',
    title: 'Cladding Systems Installed to Programme',
    subtitle:
      'College Carrigtwohill — delivered on spec, on schedule, with full Kingspan warranty compliance.',
  },
  {
    id: 2,
    background: '/images/backgrounds/amazon-dub104.webp',
    tagline: 'Facades That Win Work',
    title: 'Data Centre & Commercial Cladding Specialists',
    subtitle:
      'Amazon DUB104. Vantage Data Centres. Precision-installed facades under fast-track programmes across Ireland.',
  },
  {
    id: 3,
    background: '/images/projects/sandyford-warehouse/1_Sandyford_Warehouse_Depot.webp',
    tagline: 'One Team. Every System. Cork to Dublin.',
    title: 'Kingspan Panels, Architectural Facades, Aluminium Roof Deck',
    subtitle:
      'Sandyford Warehouse Depot — full envelope delivery by a single specialist contractor, from first fix to handover.',
  },
];
