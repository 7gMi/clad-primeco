export interface ServiceProject {
  id: number;
  name: string;
  location: string;
  surface: string;
  image: string;
}

export interface ServiceMaterials {
  heading: string;
  description: string;
  products: { name: string; detail: string }[];
  link: { url: string; label: string };
}

export interface ServiceData {
  title: string;
  tagline: string;
  subtitle: string;
  description: string;
  features: string[];
  applications: string[];
  image: string;
  projectCount: number;
  projects: ServiceProject[];
  specifications: { label: string; value: string }[];
  materials: ServiceMaterials;
}

export const servicesData: Record<string, ServiceData> = {
  kingspan: {
    title: 'Kingspan Cladding Systems',
    tagline: 'High-performance insulated panels — fast, precise, on programme.',
    subtitle: 'The Industry Standard — Installed by Specialists',
    description:
      'Kingspan insulated panels deliver the thermal performance, fire resistance, and installation speed that demanding commercial and industrial projects require. We supply and install the full Kingspan range — ensuring your building envelope meets spec, on time, and without rework.',
    features: [
      'Outstanding thermal performance — U-values as low as 0.11 W/m²K',
      'Non-combustible fire rating: A2-s1, d0 for full compliance',
      'Lightweight panels that reduce structural load and material costs',
      'Fast installation sequences that protect your programme',
      'Weather-resistant finish built to perform for decades',
      'Minimal ongoing maintenance — lower lifetime cost for your client',
    ],
    applications: [
      'Industrial warehouses',
      'Data centres',
      'Manufacturing facilities',
      'Cold storage facilities',
      'Commercial buildings',
    ],
    image: '/images/kingspan-panel.webp',
    projectCount: 4,
    projects: [
      {
        id: 2,
        name: 'Vantage Power Station',
        location: 'Dublin 01',
        surface: '2,400 m²',
        image: '/images/projects/dub01-vantage/12_Dub01_Vantage_Power_Station.webp',
      },
      {
        id: 3,
        name: 'Carrigtwohil College',
        location: 'Cork',
        surface: '3,000 m²',
        image: '/images/projects/carrigtwohil-college/1_Carrigtwohil_College_Cork.webp',
      },
      {
        id: 4,
        name: 'Bausch & Lomb',
        location: 'Waterford',
        surface: '3,000 m²',
        image: '/images/projects/bausch-lomb/1_Bauschandlomb.webp',
      },
      {
        id: 8,
        name: 'Sandyford Warehouse',
        location: 'Dublin',
        surface: '1,700 m²',
        image: '/images/projects/sandyford-warehouse/1_Sandyford_Warehouse_Depot.webp',
      },
    ],
    specifications: [
      { label: 'Panel Thickness', value: '40-200mm' },
      { label: 'Width Options', value: '1000-1200mm' },
      { label: 'Fire Rating', value: 'A2-s1, d0' },
      { label: 'Thermal Performance', value: 'U-values 0.11-0.28 W/m²K' },
    ],
    materials: {
      heading: 'Experienced Kingspan Installer',
      description:
        "We are trained installers of the full Kingspan insulated panel range — including KS1000 RW, KS600, and QuadCore systems. Every installation follows Kingspan's specification guidelines to ensure warranty compliance and peak thermal performance.",
      products: [
        { name: 'KS1000 RW', detail: 'Wall panel — PIR core, 0.15 W/m²K' },
        { name: 'KS600', detail: 'Trapezoidal roof — spanning up to 6m' },
        { name: 'QuadCore', detail: 'Next-gen insulation — 20% better thermal' },
      ],
      link: {
        url: 'https://www.kingspan.com/ie/en/products/insulated-panels/',
        label: 'View Kingspan Range',
      },
    },
  },
  architectural: {
    title: 'Architectural Panels',
    tagline: 'Striking facades that perform for decades — full weatherproofing.',
    subtitle: 'A Facade That Works as Hard as It Looks',
    description:
      'Architectural cladding panels give your building a distinctive, professional finish while delivering full weatherproofing and long-term durability. Whether you are working to a tight design brief or an open specification, we will match the right system to your project and install it to a high standard.',
    features: [
      'Broad range of finishes and colours — match any design intent',
      'Weather-resistant fibre cement: no rust, no rot, no repainting',
      'Superior fire performance for full Building Regulations compliance',
      'Zero maintenance required — low lifetime cost for the end user',
      'Bespoke dimensions and profiles to suit any facade geometry',
      'Responsibly sourced, low-impact materials',
    ],
    applications: [
      'Commercial office buildings',
      'Retail centres',
      'Educational institutions',
      'Healthcare facilities',
      'Mixed-use developments',
      'Residential buildings',
    ],
    image: '/images/architectural-panels/amazon4.webp',
    projectCount: 2,
    projects: [
      {
        id: 1,
        name: 'Amazon Dublin 104',
        location: 'Dublin',
        surface: '5,000 m²',
        image: '/images/projects/dub104-amazon/1_Dub104_Amazon.webp',
      },
      {
        id: 7,
        name: 'Lily Superstore',
        location: 'Limerick',
        surface: '4,000 m²',
        image: '/images/projects/lily-superstore/14_Lily_Superstore_Limerick.webp',
      },
    ],
    specifications: [
      { label: 'Panel Size', value: 'Up to 3000mm length' },
      { label: 'Thickness', value: '10-25mm' },
      { label: 'Finishes', value: '50+ color options' },
      { label: 'Fire Rating', value: 'B-s1, d0 to A2-s1, d0 (system-dependent)' },
    ],
    materials: {
      heading: 'Premium Facade Materials',
      description:
        'We work with industry-leading fibre cement and composite panel systems — including Cedral, Equitone, and Kingspan Optimo facades. Each material is selected to match your design intent, fire requirements, and budget.',
      products: [
        { name: 'Fibre Cement', detail: 'Weather-resistant, non-combustible finish' },
        { name: 'Composite Panels', detail: 'Lightweight, wide colour range' },
        { name: 'Kingspan Optimo', detail: 'Insulated facade — thermal + aesthetic' },
      ],
      link: {
        url: 'https://www.kingspan.com/ie/en/products/insulated-panels/facade-systems/',
        label: 'View Kingspan Facades',
      },
    },
  },
  aluminium: {
    title: 'Aluminium Copings & Roof Deck',
    tagline: 'Custom aluminium systems — watertight, maintenance-free, built to spec.',
    subtitle: 'The Right Finish. Built to Last.',
    description:
      'Aluminium copings and roof deck systems complete your building envelope — sealing exposed edges, protecting parapets, and delivering a clean, professional finish. Designed to your exact project specifications, our aluminium systems integrate seamlessly with any cladding installation and require zero ongoing maintenance.',
    features: [
      'Corrosion-resistant aluminium — performs in all Irish weather conditions',
      'Lightweight profile reduces structural demands and speeds installation',
      'Custom-designed to your specified sizes, shapes, and profiles',
      'Engineered to integrate seamlessly with adjacent cladding systems',
      'Anodised or powder-coated finish — long-life, maintenance-free',
      'Effective weather exclusion protecting the full building envelope',
    ],
    applications: [
      'Roof edge protection',
      'Parapet coping',
      'Fascia systems',
      'Soffit applications',
      'Window and door surrounds',
      'Architectural trim details',
    ],
    image: '/images/aluminium-copings/aluminium-copings.webp',
    projectCount: 2,
    projects: [
      {
        id: 5,
        name: 'ABP Rathkeale',
        location: 'Co. Limerick',
        surface: '1,600 m²',
        image: '/images/projects/abp-rathkeale/1_ABP_Rathkeale.webp',
      },
      {
        id: 6,
        name: 'Europort Rosslare',
        location: 'Co. Wexford',
        surface: '2,400 m²',
        image: '/images/projects/europort-rosslare/12_Europort_Rosslare_Wexford.webp',
      },
    ],
    specifications: [
      { label: 'Material', value: 'Aluminium 6063-T6' },
      { label: 'Thickness', value: '1.5-3mm' },
      { label: 'Profiles', value: '15+ standard options' },
      { label: 'Finish', value: 'Anodized or painted' },
    ],
    materials: {
      heading: 'Aluminium Systems & Flashings',
      description:
        'All copings, flashings, and roof deck profiles are fabricated from marine-grade aluminium to our exact specifications. We supply pressed aluminium copings, standing seam roof deck, and bespoke flashings — powder-coated or mill-finished to suit your project.',
      products: [
        { name: 'Pressed Copings', detail: 'Parapet protection — custom lengths' },
        { name: 'Standing Seam', detail: 'Watertight roof deck — clip-fix system' },
        { name: 'Bespoke Flashings', detail: 'Door, window & junction details' },
      ],
      link: {
        url: 'https://www.kingspan.com/ie/en/products/insulated-panels/roof-panels/',
        label: 'View Kingspan Roof Systems',
      },
    },
  },
};
