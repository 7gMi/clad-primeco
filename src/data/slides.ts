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
    tagline: 'Built to Perform',
    title: 'Kingspan Cladding. Installed Right.',
    subtitle: "Trusted by Ireland's leading contractors and developers. We deliver high-performance Kingspan systems on time, on programme, and to specification — every project, every time."
  },
  {
    id: 2,
    background: '/images/architectural-panels/architectural-panels.jpg',
    tagline: 'Facades That Win Work',
    title: 'Architectural Cladding That Sets You Apart',
    subtitle: 'From Amazon Dublin to Vantage Data Centers — we bring precision and pace to every facade. Durable finishes, tight deadlines, zero compromise on quality.'
  },
  {
    id: 3,
    background: '/images/backgrounds/school_carrigtohil.jpg',
    tagline: 'Ireland-Wide. Project-Ready.',
    title: 'Commercial Roofing & Cladding Specialists',
    subtitle: 'Aluminium copings, roof deck, and cladding systems for industrial and commercial builds across Ireland. One trusted contractor — from brief to handover.'
  }
];
