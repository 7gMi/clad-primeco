export interface Project {
  id: number;
  title: string;
  client: string;
  location: string;
  year: number;
  description: string;
  specifications: {
    surface: string;
    materials: string;
    duration: string;
    status: string;
  };
  images: string[];
  serviceType: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Amazon — Dublin 104',
    client: 'Amazon',
    location: 'Dublin, Ireland',
    year: 2024,
    description: 'Full building envelope package for Amazon\'s Dublin 104 logistics facility — one of the largest contracts in our portfolio. Works included 5,000 m² of architectural panels and Kingspan insulated panels, complete with window cills, door flashings and aluminium copings, delivered over 7 months to meet Amazon\'s demanding programme and quality standards.',
    specifications: {
      surface: '5,000 m²',
      materials: 'Architectural Panels · Kingspan · Window Cills · Door Flashings · Copings',
      duration: 'July 2023 – January 2024',
      status: 'Completed'
    },
    images: [
      '/images/projects/dub104-amazon/2_Dub104_Amazon.webp',
      '/images/projects/dub104-amazon/10_Dub104_Amazon.webp',
      '/images/projects/dub104-amazon/11_Dub104_Amazon.webp',
      '/images/projects/dub104-amazon/1_Dub104_Amazon.webp',
      '/images/projects/dub104-amazon/3_Dub104_Amazon.webp',
      '/images/projects/dub104-amazon/4_Dub104_Amazon.webp',
      '/images/projects/dub104-amazon/6_Dub104_Amazon.webp',
      '/images/projects/dub104-amazon/5.webp',
    ],
    serviceType: 'Architectural Panels'
  },
  {
    id: 2,
    title: 'Vantage Power Station — Dublin 01',
    client: 'Vantage Data Centers',
    location: 'Dublin, Ireland',
    year: 2025,
    description: 'Cladding package for Vantage\'s power station facility in Dublin city centre. Works covered 2,400 m² of Kingspan RW panels complete with copings, door flashings and window cills — installed to the exacting standards required for critical energy infrastructure, completed in 3 months.',
    specifications: {
      surface: '2,400 m²',
      materials: 'Kingspan RW Panels · Copings · Door Flashings · Window Cills',
      duration: 'January 2025 (3 months)',
      status: 'Completed'
    },
    images: [
      '/images/projects/dub01-vantage/12_Dub01_Vantage_Power_Station.webp',
      '/images/projects/dub01-vantage/15_Dub01_Vantage_Power_Station.webp',
      '/images/projects/dub01-vantage/16_Dub01_Vantage_Power_Station.webp',
      '/images/projects/dub01-vantage/10_Dub01_Vantage_Power_Station.webp',
      '/images/projects/dub01-vantage/11_Dub01_Vantage_Power_Station.webp',
      '/images/projects/dub01-vantage/13_Dub01_Vantage_Power_Station.webp',
      '/images/projects/dub01-vantage/14_Dub01_Vantage_Power_Station.webp',
      '/images/projects/dub01-vantage/17.webp',
    ],
    serviceType: 'Kingspan Cladding'
  },
  {
    id: 3,
    title: 'Carrigtwohil College',
    client: 'Department of Education',
    location: 'Carrigtwohil, Cork',
    year: 2023,
    description: 'Kingspan cladding installation for the new Carrigtwohil College building in Cork. The 3,000 m² package included Kingspan insulated panels, door flashings and window cills — delivering thermal performance and a clean architectural finish for this new educational facility.',
    specifications: {
      surface: '3,000 m²',
      materials: 'Kingspan Panels · Door Flashings · Window Cills',
      duration: 'March – June 2023',
      status: 'Completed'
    },
    images: [
      '/images/projects/carrigtwohil-college/5_Carrigtwohil_College_Cork.webp',
      '/images/projects/carrigtwohil-college/10_Carrigtwohil_College_Cork.webp',
      '/images/projects/carrigtwohil-college/11_Carrigtwohil_College_Cork.webp',
      '/images/projects/carrigtwohil-college/1_Carrigtwohil_College_Cork.webp',
      '/images/projects/carrigtwohil-college/2_Carrigtwohil_College_Cork.webp',
      '/images/projects/carrigtwohil-college/3_Carrigtwohil_College_Cork.webp',
      '/images/projects/carrigtwohil-college/4_Carrigtwohil_College_Cork.webp',
      '/images/projects/carrigtwohil-college/6_Carrigtwohil_College_Cork.webp',
    ],
    serviceType: 'Kingspan Cladding'
  },
  {
    id: 4,
    title: 'Bausch & Lomb Facility',
    client: 'Bausch & Lomb',
    location: 'Waterford, Ireland',
    year: 2025,
    description: 'Cladding upgrade for Bausch & Lomb\'s pharmaceutical manufacturing facility in Waterford. The 3,000 m² programme of Kingspan architectural panels was carried out within an active facility, maintaining strict safety and quality protocols throughout the 4-month contract.',
    specifications: {
      surface: '3,000 m²',
      materials: 'Kingspan Architectural Panels',
      duration: 'January – April 2025',
      status: 'Completed'
    },
    images: [
      '/images/projects/bausch-lomb/1_Bauschandlomb.webp',
      '/images/projects/bausch-lomb/2_Bauschandlomb.webp',
      '/images/projects/bausch-lomb/3_Bauschandlomb.webp',
      '/images/projects/bausch-lomb/4_Bauschandlomb.webp',
      '/images/projects/bausch-lomb/5_Bauschandlomb.webp',
      '/images/projects/bausch-lomb/6_Bauschandlomb.webp',
      '/images/projects/bausch-lomb/10_Bauschandlomb.webp',
      '/images/projects/bausch-lomb/11.webp',
    ],
    serviceType: 'Kingspan Cladding'
  },
  {
    id: 5,
    title: 'ABP Rathkeale',
    client: 'ABP Group',
    location: 'Rathkeale, Co. Limerick',
    year: 2026,
    description: 'Roof and facade cladding for ABP\'s food processing facility in Rathkeale. The 1,600 m² contract covered Kingspan roof panels combined with aluminium RW facade cladding — delivered in just 3 months to keep the facility\'s expansion programme on schedule.',
    specifications: {
      surface: '1,600 m²',
      materials: 'Kingspan Roof Panels · Aluminium RW Facade Cladding',
      duration: 'November 2025 – January 2026',
      status: 'Completed'
    },
    images: [
      '/images/projects/abp-rathkeale/1_ABP_Rathkeale.webp',
      '/images/projects/abp-rathkeale/2_ABP_Rathkeale.webp',
      '/images/projects/abp-rathkeale/3_ABP_Rathkeale.webp',
      '/images/projects/abp-rathkeale/4_ABP_Rathkeale.webp',
      '/images/projects/abp-rathkeale/5_ABP_Rathkeale.webp',
      '/images/projects/abp-rathkeale/6_ABP_Rathkeale.webp',
      '/images/projects/abp-rathkeale/7_ABP_Rathkeale.webp',
    ],
    serviceType: 'Mixed Systems'
  },
  {
    id: 6,
    title: 'Europort Rosslare',
    client: 'Rosslare Europort',
    location: 'Rosslare, Co. Wexford',
    year: 2025,
    description: 'Roofing and cladding works at Rosslare Europort, one of Ireland\'s busiest ferry terminals. The contract covered 2,400 m² of standing seam roofing and cladding with door flashings and window cills — executed over 3 months within an active port environment requiring strict coordination with port operations.',
    specifications: {
      surface: '2,400 m²',
      materials: 'Standing Seam Roofing · Cladding · Door Flashings · Window Cills',
      duration: 'June – August 2025',
      status: 'Completed'
    },
    images: [
      '/images/projects/europort-rosslare/12_Europort_Rosslare_Wexford.webp',
      '/images/projects/europort-rosslare/11.webp',
      '/images/projects/europort-rosslare/13.webp',
      '/images/projects/europort-rosslare/15.webp',
      '/images/projects/europort-rosslare/17_Europort_Rosslare_Wexford.webp',
      '/images/projects/europort-rosslare/10.webp',
      '/images/projects/europort-rosslare/14.webp',
      '/images/projects/europort-rosslare/16.webp',
    ],
    serviceType: 'Aluminium Roof Deck'
  },
  {
    id: 7,
    title: 'Lily Superstore',
    client: 'Lily Retail Group',
    location: 'Limerick, Ireland',
    year: 2024,
    description: 'Facade cladding package for the Lily Superstore in Limerick. The 4,000 m² contract included external cladding panels, aluminium copings, window cills and door flashings — delivered over 4 months to a tight retail programme, achieving a high-quality finish that enhances the building\'s commercial identity.',
    specifications: {
      surface: '4,000 m²',
      materials: 'Cladding Panels · Copings · Window Cills · Door Flashings',
      duration: 'February – June 2024',
      status: 'Completed'
    },
    images: [
      '/images/projects/lily-superstore/10.webp',
      '/images/projects/lily-superstore/12.webp',
      '/images/projects/lily-superstore/15.webp',
      '/images/projects/lily-superstore/16_Lily_Superstore_Limerick.webp',
      '/images/projects/lily-superstore/17.webp',
      '/images/projects/lily-superstore/14_Lily_Superstore_Limerick.webp',
      '/images/projects/lily-superstore/11_.webp',
      '/images/projects/lily-superstore/13.webp',
    ],
    serviceType: 'Architectural Panels'
  },
  {
    id: 8,
    title: 'Sandyford Warehouse & Depot',
    client: 'Confidential',
    location: 'Sandyford, Dublin',
    year: 2024,
    description: 'Fast-track Kingspan cladding installation for a warehouse and depot facility in Sandyford Business District, Dublin. The 1,700 m² package was completed in just 2 months, demonstrating our ability to deliver quality works to compressed programmes for commercial clients.',
    specifications: {
      surface: '1,700 m²',
      materials: 'Kingspan Insulated Panels',
      duration: 'February – March 2024',
      status: 'Completed'
    },
    images: [
      '/images/projects/sandyford-warehouse/1_Sandyford_Warehouse_Depot.webp',
      '/images/projects/sandyford-warehouse/2_Sandyford_Warehouse_Depot.webp',
      '/images/projects/sandyford-warehouse/3_Sandyford_Warehouse_Depot.webp',
      '/images/projects/sandyford-warehouse/4_Sandyford_Warehouse_Depot.webp',
      '/images/projects/sandyford-warehouse/5_Sandyford_Warehouse_Depot.webp',
      '/images/projects/sandyford-warehouse/6_Sandyford_Warehouse_Depot.webp',
    ],
    serviceType: 'Kingspan Cladding'
  },
];
