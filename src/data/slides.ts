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
    tagline: 'Built to Perform',
    title: 'College Carrigtwohill',
    subtitle: "Trusted by Ireland's leading contractors and developers. We deliver high-performance Kingspan systems on time, on programme, and to specification — every project, every time."
  },
  {
    id: 2,
    background: '/images/backgrounds/amazon-dub104.webp',
    tagline: 'Facades That Win Work',
    title: 'Amazon DUB104',
    subtitle: 'From Amazon Dublin to Vantage Data Centers — we bring precision and pace to every facade. Durable finishes, tight deadlines, zero compromise on quality.'
  },
  {
    id: 3,
    background: '/images/projects/sandyford-warehouse/1_Sandyford_Warehouse_Depot.webp',
    tagline: 'From Cork to Dublin. Brief to Handover.',
    title: 'Sandyford Warehouse Depot',
    subtitle: 'Kingspan panels, architectural facades, aluminium roof deck — managed by one specialist team. We protect your programme from first fixing to final sign-off.'
  }
];
