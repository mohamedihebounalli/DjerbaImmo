export type PropertyType = "villa" | "apartment" | "menzel" | "studio" | "land";
export type Transaction = "sale" | "annual" | "seasonal";

export type Property = {
  id: string;
  ref: string;
  slug: string; // url path including section, e.g. /location/saisonniere/villa-mia
  title: string;
  type: PropertyType;
  transaction: Transaction;
  zone: string;
  rooms?: number;
  baths?: number;
  area: number; // m²
  landArea?: number;
  pricePerMonth?: number; // for annual rentals (TND)
  pricePerNight?: number; // for seasonal (TND)
  salePrice?: number; // for sales (TND)
  isNew?: boolean;
  featured?: boolean;
  shortDescription: string;
  description: string;
  features: string[];
  amenities?: string[];
  images: string[];
  // ISO yyyy-mm-dd dates already booked / blocked (seasonal only)
  blockedDates?: string[];
  // for land
  constructible?: boolean;
  zoning?: string;
};

export const ZONES = [
  "Midoun",
  "Houmt Souk",
  "Aghir",
  "Tezdaine",
  "Sidi Mahrez",
  "Sidi Jmour",
  "Mezraya",
  "Sedouikech",
];

// helper to produce ISO dates within next N months
function blockRange(
  startDay: number,
  startMonth: number,
  startYear: number,
  endDay: number,
  endMonth: number,
  endYear: number
): string[] {
  const dates: string[] = [];
  
  const current = new Date(startYear, startMonth - 1, startDay);
  const target = new Date(endYear, endMonth - 1, endDay);

  current.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  while (current <= target) {
    dates.push(current.toISOString().slice(0, 10));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

export const PROPERTIES: Property[] = [
{
    id: "p1",
    ref: "MD0001", 
    slug: "/location-saisonniere/villa-mia", 
    title: "VILLA ADNEN",
    type: "villa",
    transaction: "seasonal",
    zone: "Midoun",
    rooms: 3,
    baths: 2,
    area: 150,
    landArea: 500,
    pricePerNight: 0,
    featured: true,
    isNew: true,
    shortDescription: "Villa moderne et haut de gamme avec piscine privée à Djerba.",
    description:
      "Offrez-vous un séjour dans une villa moderne et haut de gamme, idéale pour des vacances en famille ou entre amis. Le cadre idéal pour des vacances inoubliables à Djerba, dans le calme, le confort et l'intimité.",
    features: [
      "Piscine privée",
      "3 chambres élégantes avec TV connectée",
      "2 salles de bain modernes",
      "Douche extérieure au bord de la piscine",
      "Grand salon lumineux ouvert sur la terrasse",
      "Cuisine entièrement équipée",
      "Espace barbecue & Salon de jardin",
      "Wi-Fi illimité & Réservoir d'eau",
    ],
    amenities: [
      "Wi-Fi illimité",
      "Piscine privée",
      "Douche extérieure",
      "TV connectée",
      "Machine à café à capsules",
      "Four",
      "Micro-ondes",
      "Lave-vaisselle",
      "Réfrigérateur",
      "Espace barbecue",
      "Terrasse avec coin repas",
      "Salon de jardin",
      "Réservoir d'eau",
      "Buanderie",
      "Parking privé",
    ],
    images: [
          "/assets/VillaAdnen/VillaAdnen1.webp",
          "/assets/VillaAdnen/VillaAdnen2.webp",
          "/assets/VillaAdnen/VillaAdnen3.webp",
          "/assets/VillaAdnen/VillaAdnen4.webp",
          "/assets/VillaAdnen/VillaAdnen5.webp",
          "/assets/VillaAdnen/VillaAdnen6.webp",
          "/assets/VillaAdnen/VillaAdnen7.webp",
          "/assets/VillaAdnen/VillaAdnen8.webp"
    ],
    blockedDates: [
    ...blockRange(29, 6, 2026, 1, 7, 2026),
    ...blockRange(7, 7, 2026, 11, 7, 2026),
    ...blockRange(18, 7, 2026, 19, 7, 2026),
    ...blockRange(20, 7, 2026, 26, 7, 2026),
    ...blockRange(27, 7, 2026, 28, 7, 2026),
    ...blockRange(1, 8, 2026, 2, 8, 2026),
    ...blockRange(3, 8, 2026, 9, 8, 2026),
    ...blockRange(10, 8, 2026, 16, 8, 2026),
    ...blockRange(17, 8, 2026, 22, 8, 2026)
    ],

  },
{
    id: "p2",
    ref: "MD0002", 
    slug: "/location-saisonniere/villa-soleil",
    title: "VILLA SHAIMA",
    type: "villa",
    transaction: "seasonal",
    zone: "Midoun",
    rooms: 3,
    baths: 2,
    area: 150,
    landArea: 0,
    pricePerNight: 0,
    featured: true,
    isNew: true,
    shortDescription: "Villa élégante avec piscine privée proche de Bourgou Mall.",
    description:
      "Votre havre de paix à Djerba. Offrez-vous un séjour inoubliable dans la VILLA SHAIMA, une propriété élégante avec piscine privée, alliant confort, tranquillité et proximité des plus belles adresses de Djerba, à seulement quelques minutes de Bourgou Mall et du Café Chichkhan.",
    features: [
      "Piscine privée",
      "3 chambres confortables, dont une superbe suite parentale",
      "Idéal jusqu'à 6 personnes",
      "Grand salon lumineux",
      "Espace détente à l'extérieur",
      "Cadre calme, sans vis-à-vis",
    ],
    amenities: [
      "Piscine privée",
      "Suite parentale",
      "Espace détente",
      "Grand salon",
    ],
    images: [
          "/assets/VillaShaima/VillaShaima1.webp",
          "/assets/VillaShaima/VillaShaima2.webp",
          "/assets/VillaShaima/VillaShaima3.webp",
          "/assets/VillaShaima/VillaShaima4.webp",
          "/assets/VillaShaima/VillaShaima5.webp",
          "/assets/VillaShaima/VillaShaima6.webp",
          "/assets/VillaShaima/VillaShaima7.webp",
          "/assets/VillaShaima/VillaShaima8.webp",
          "/assets/VillaShaima/VillaShaima9.webp",
          "/assets/VillaShaima/VillaShaima10.webp"
    ],
    ...blockRange(30, 6, 2026, 5, 7, 2026),
    ...blockRange(21, 7, 2026, 26, 7, 2026),
    ...blockRange(29, 7, 2026, 1, 8, 2026),
    ...blockRange(9, 8, 2026, 9, 8, 2026),
    ...blockRange(10, 8, 2026, 13, 8, 2026)
  },
  {
      id: "p3",
      ref: "HS0001", 
      slug: "/location-saisonniere/appartement-medina", 
      title: "Villa Ridha", 
      type: "villa", 
      transaction: "seasonal",
      zone: "Houmt Souk",
      rooms: 3, 
      baths: 4,
      area: 180,
      landArea: 450,
      pricePerNight: 0,
      featured: true,
      isNew: true,
      shortDescription: "Magnifique villa avec piscine privée idéalement située à Houmt Souk.",
      description:
        "Offrez-vous des vacances inoubliables dans une magnifique villa idéalement située à Houmt Souk, à proximité du magasin Aziza et de l'aéroport international de Djerba. Un cadre parfait alliant commodités, espace et confort pour votre séjour.",
      features: [
        "Magnifique piscine privée",
        "2 suites confortables + 1 chambre supplémentaire",
        "Salon spacieux avec salle à manger",
        "Cuisine entièrement équipée",
        "Jardin arboré à l'extérieur",
        "Garage privé",
        "Salle d'eau extérieure",
      ],
      amenities: [
        "Piscine privée",
        "Garage",
        "Jardin arboré",
        "Salle d'eau extérieure",
        "Cuisine équipée",
        "Salon spacieux",
      ],
      images: [
            "/assets/VillaRidha/VillaRidha1.webp",
            "/assets/VillaRidha/VillaRidha2.webp",
            "/assets/VillaRidha/VillaRidha3.webp",
            "/assets/VillaRidha/VillaRidha4.webp",
            "/assets/VillaRidha/VillaRidha5.webp",
            "/assets/VillaRidha/VillaRidha12.webp",
            "/assets/VillaRidha/VillaRidha6.webp",
            "/assets/VillaRidha/VillaRidha7.webp",
            "/assets/VillaRidha/VillaRidha8.webp",
            "/assets/VillaRidha/VillaRidha9.webp",
            "/assets/VillaRidha/VillaRidha10.webp",
            "/assets/VillaRidha/VillaRidha11.webp"
          ],
              // blockedDates: [...blockRange(15, 10), ...blockRange(60, 21)],

  },
  {
      id: "p4",
      ref: "TZ0001", 
      slug: "/location-saisonniere/menzel-tezdaine", 
      title: "VILLA MIA",
      type: "villa", 
      transaction: "seasonal",
      zone: "Tezdaine",
      rooms: 5,
      baths: 3,
      area: 800,
      landArea: 200,
      pricePerNight: 0,
      featured: true,
      isNew: true,
      shortDescription: "Villa d'exception à Tezdaine avec piscine privée sans vis-à-vis.",
      description:
        "Découvrez VILLA MIA, une villa d’exception située à Tezdaine, à seulement 4 minutes des plus belles plages de Djerba. Le confort d’un hôtel, l’intimité d’une villa privée. Vivez des vacances inoubliables sous le soleil de Djerba !",
      features: [
        "Piscine privée sans vis-à-vis",
        "5 chambres + studio indépendant",
        "Grand jardin aménagé",
        "Espace barbecue",
        "Table de ping-pong & badminton",
        "Wifi • TV satellite • IPTV",
        "Résidence sécurisée 24h/24",
        "Proche des plages, du Golf de Djerba et des principales attractions touristiques",
      ],
      amenities: [
        "Piscine privée",
        "Studio indépendant",
        "Grand jardin",
        "Espace barbecue",
        "Table de ping-pong",
        "Badminton",
        "Wifi",
        "TV satellite",
        "IPTV",
        "Résidence sécurisée",
      ],
      images: [
         "/assets/VillaMia/VillaMia1.webp",
          "/assets/VillaMia/VillaMia2.webp",
          "/assets/VillaMia/VillaMia3.webp",
          "/assets/VillaMia/VillaMia4.webp",
          "/assets/VillaMia/VillaMia5.webp",
          "/assets/VillaMia/VillaMia6.webp",
          "/assets/VillaMia/VillaMia7.webp",
          "/assets/VillaMia/VillaMia8.webp",
          "/assets/VillaMia/VillaMia9.webp",
          "/assets/VillaMia/VillaMia10.webp",
          "/assets/VillaMia/VillaMia11.webp"
      ],
    ...blockRange(6, 7, 2026, 12, 7, 2026),
    ...blockRange(20, 7, 2026, 26, 7, 2026),
    ...blockRange(27, 7, 2026, 2, 8, 2026),
    ...blockRange(3, 8, 2026, 9, 8, 2026),
    ...blockRange(10, 8, 2026, 15, 8, 2026),
    ...blockRange(21, 8, 2026, 23, 8, 2026),
    ...blockRange(24, 8, 2026, 30, 8, 2026)
    },
    {
    id: "p5",
    ref: "TZ0002", 
    slug: "/location-saisonniere/villa-islem", 
    title: "VILLA ISLEM",
    type: "villa",
    transaction: "seasonal",
    zone: "Tezdayin",
    rooms: 3, 
    baths: 3, 
    area: 170,
    landArea: 500,
    pricePerNight: 0,
    featured: true,
    isNew: true,
    shortDescription: "Villa de vacances avec piscine privée à Tezdayin – Midoun.",
    description:
      "Profitez du calme, du confort et du soleil de Djerba à la VILLA ISLEM. Un cadre idéal pour vos vacances en famille ou entre amis situé à Tezdayin – Midoun. Dernières disponibilités pour la saison !",
    features: [
      "Piscine privée",
      "3 chambres dont une suite parentale",
      "Salon spacieux et confortable",
      "Cuisine entièrement équipée",
      "Coin barbecue & Espace extérieur",
      "Douche extérieure + WC",
      "Parking privé",
    ],
    amenities: [
      "Piscine privée",
      "Cuisine équipée",
      "Coin barbecue",
      "Douche extérieure",
      "WC extérieur",
      "Parking privé",
    ],
    images: [
        "/assets/VillaIslem/VillaIslem1.webp",
        "/assets/VillaIslem/VillaIslem2.webp",
        "/assets/VillaIslem/VillaIslem3.webp",
        "/assets/VillaIslem/VillaIslem4.webp",
        "/assets/VillaIslem/VillaIslem5.webp",
        "/assets/VillaIslem/VillaIslem6.webp",
        "/assets/VillaIslem/VillaIslem7.webp",
        "/assets/VillaIslem/VillaIslem8.webp",
        "/assets/VillaIslem/VillaIslem9.webp",
        "/assets/VillaIslem/VillaIslem10.webp",
        "/assets/VillaIslem/VillaIslem11.webp",
        "/assets/VillaIslem/VillaIslem12.webp",
        "/assets/VillaIslem/VillaIslem13.webp"
    ],
              // blockedDates: [...blockRange(15, 10), ...blockRange(60, 21)],

  },
  {
    id: "p6",
    ref: "MZ0001", 
    slug: "/location-saisonniere/villa-charlotte",
    title: "VILLA CHARLOTTE", // Villa Adel
    type: "villa",
    transaction: "seasonal",
    zone: "Mezraya",
    rooms: 4, 
    baths: 3, 
    area: 1200,
    landArea: 240,
    pricePerNight: 0,
    featured: true,
    isNew: true,
    shortDescription: "Magnifique villa S+4 avec grande piscine privée à Mezraya.",
    description:
      "Découvrez la VILLA CHARLOTTE, une magnifique villa S+4 idéale pour des vacances en famille ou entre amis à Mezraya. Pouvant accueillir jusqu’à 10 personnes, elle offre le cadre parfait pour un séjour inoubliable à Djerba.",
    features: [
      "Grande piscine privée 12m x 3.5m",
      "4 chambres dont 1 suite parentale",
      "Grand salon lumineux avec vue sur la piscine",
      "Cuisine entièrement équipée",
      "Jardin gazonné",
      "Entrée de parking (jusqu'à 3 voitures)",
      "Séjour minimum : 5 nuitées",
    ],
    amenities: [
      "Piscine privée",
      "Suite parentale",
      "Grand salon",
      "Cuisine équipée",
      "Jardin",
      "Parking privé",
    ],
    images: [
      "/assets/VillaCharlotte/VillaCharlotte1.webp",
      "/assets/VillaCharlotte/VillaCharlotte2.webp",
      "/assets/VillaCharlotte/VillaCharlotte3.webp",
      "/assets/VillaCharlotte/VillaCharlotte4.webp",
      "/assets/VillaCharlotte/VillaCharlotte5.webp",
      "/assets/VillaCharlotte/VillaCharlotte6.webp",
      "/assets/VillaCharlotte/VillaCharlotte7.webp",
      "/assets/VillaCharlotte/VillaCharlotte8.webp",
      "/assets/VillaCharlotte/VillaCharlotte9.webp"
    ],
    ...blockRange(5, 7, 2026, 5, 7, 2026),
    ...blockRange(6, 7, 2026, 8, 7, 2026),
    ...blockRange(10, 7, 2026, 12, 7, 2026),
    ...blockRange(14, 7, 2026, 16, 7, 2026),
    ...blockRange(2, 8, 2026, 2, 8, 2026),
    ...blockRange(3, 8, 2026, 6, 8, 2026)
  },
  {
    id: "p7",
    ref: "MD0003", 
    slug: "/location-saisonniere/villa-yeti-1",
    title: "VILLA YETI 1",
    type: "villa",
    transaction: "seasonal",
    zone: "Midoun",
    rooms: 3, 
    baths: 3, 
    area: 150,
    landArea: 240,
    pricePerNight: 0,
    featured: true,
    isNew: true, // "Magnifique villa récente"
    shortDescription: "Villa récente haut standing S+3 avec piscine privée à 1km de la plage Yeti.",
    description:
      "Découvrez Villa Yeti 1, une magnifique villa récente haut standing, entièrement meublée, climatisée et parfaitement équipée. Située à seulement 1 km de la plage Yeti, elle offre calme, confort et prestations haut de gamme pour un séjour d’exception à Djerba.",
    features: [
      "Piscine privée extérieure",
      "À seulement 1 km de la plage Yeti",
      "3 suites parentales complètes (dressing, salle d'eau)",
      "Salon spacieux et lumineux au RDC",
      "Cuisine moderne entièrement équipée",
      "Terrasse à l'étage & 2 balcons",
      "Wi-Fi 5G illimité & Espace barbecue",
      "Garage privé clos",
    ],
    amenities: [
      "Piscine privée",
      "Climatisation",
      "Wi-Fi 5G",
      "Garage",
      "Espace barbecue",
      "Cuisine équipée",
      "Dressing",
      "Terrasse",
      "Balcon",
    ],
    images: [
          "/assets/VillaYati1/VillaYati1.webp",
          "/assets/VillaYati1/VillaYati2.webp",
          "/assets/VillaYati1/VillaYati3.webp",
          "/assets/VillaYati1/VillaYati4.webp",
          "/assets/VillaYati1/VillaYati5.webp",
          "/assets/VillaYati1/VillaYati6.webp",
          "/assets/VillaYati1/VillaYati7.webp",
          "/assets/VillaYati1/VillaYati8.webp",
          "/assets/VillaYati1/VillaYati9.webp",
          "/assets/VillaYati1/VillaYati10.webp",
          "/assets/VillaYati1/VillaYati11.webp",
          "/assets/VillaYati1/VillaYati12.webp",
          "/assets/VillaYati1/VillaYati13.webp"
    ],
    ...blockRange(5, 7, 2026, 5, 7, 2026),
    ...blockRange(6, 7, 2026, 12, 7, 2026),
    ...blockRange(13, 7, 2026, 19, 7, 2026),
    ...blockRange(25, 7, 2026, 26, 7, 2026),
    ...blockRange(27, 7, 2026, 1, 8, 2026),
    ...blockRange(5, 8, 2026, 9, 8, 2026),
    ...blockRange(11, 8, 2026, 15, 8, 2026),
    ...blockRange(25, 8, 2026, 28, 8, 2026)
  },
  {
    id: "p8",
    ref: "MD0004", // M for Midoun (Plage Yeti region)
    slug: "/location-saisonniere/villa-yeti-2",
    title: "VILLA YETI 2",
    type: "villa",
    transaction: "seasonal",
    zone: "Midoun",
    rooms: 3, // S+3
    baths: 3, // 3 suites confortables
    area: 150,
    landArea: 240,
    pricePerNight: 0,
    featured: true,
    isNew: true,
    shortDescription: "Villa S+3 haut standing avec piscine privée à 1 km de la plage Yeti.",
    description:
      "Bienvenue à la VILLA YETI 2, une propriété de haut standing située à seulement 1 km de la plage Yeti. Offrant 3 suites confortables et une piscine privée, c'est le cadre idéal pour vos vacances à Djerba en famille.",
    features: [
      "À seulement 1 km de la plage Yeti",
      "Piscine privée",
      "3 suites confortables",
      "Cuisine équipée",
      "Espace barbecue",
      "Garage privé",
      "Climatisation complète",
    ],
    amenities: [
      "Piscine privée",
      "Cuisine équipée",
      "Espace barbecue",
      "Garage",
      "Climatisation",
    ],
    images: [
          "/assets/VillaYati2/VillaYatii7.webp",
          "/assets/VillaYati2/VillaYatii1.webp",
          "/assets/VillaYati2/VillaYatii2.webp",
          "/assets/VillaYati2/VillaYatii3.webp",
          "/assets/VillaYati2/VillaYatii4.webp",
          "/assets/VillaYati2/VillaYatii5.webp",
          "/assets/VillaYati2/VillaYatii6.webp",
          "/assets/VillaYati2/VillaYatii8.webp",
          "/assets/VillaYati2/VillaYatii9.webp",
          "/assets/VillaYati2/VillaYatii10.webp"
    ],
    ...blockRange(29, 6, 2026, 4, 7, 2026),
    ...blockRange(6, 7, 2026, 12, 7, 2026),
    ...blockRange(18, 7, 2026, 19, 7, 2026),
    ...blockRange(20, 7, 2026, 25, 7, 2026),
    ...blockRange(9, 8, 2026, 9, 8, 2026),
    ...blockRange(10, 8, 2026, 15, 8, 2026)
  },
  {
    id: "p9",
    ref: "MD0005", // Default to M (Midoun) as most beach-adjacent villa listings in this group are situated there
    slug: "/location-saisonniere/villa-maldives",
    title: "VILLA MALDIVES",
    type: "villa",
    transaction: "seasonal",
    zone: "Midoun",
    rooms: 4, // 4 suites
    baths: 4, // 4 suites avec salles de bain privées
    area: 280,
    landArea: 1000,
    pricePerNight: 0,
    featured: true,
    isNew: true,
    shortDescription: "Villa d'exception avec piscine privée à seulement 4 minutes de la plage.",
    description:
      "Offrez-vous un séjour d'exception à la VILLA MALDIVES dans un cadre calme, moderne et confortable, idéal pour des vacances en famille ou entre amis. Située à seulement 4 minutes de la plage, elle est parfaite pour votre séjour de l'été 2026.",
    features: [
      "À seulement 4 minutes de la plage",
      "Piscine privée",
      "4 suites avec salles de bain privées",
      "Jardin aménagé",
      "Espace barbecue",
      "Climatisation dans toute la villa",
      "Connexion Wi-Fi",
    ],
    amenities: [
      "Piscine privée",
      "Salles de bain privées",
      "Jardin",
      "Espace barbecue",
      "Climatisation",
      "Wi-Fi",
    ],
    images: [
          "/assets/VillaMaldives/VillaMaldives1.webp",
          "/assets/VillaMaldives/VillaMaldives2.webp",
          "/assets/VillaMaldives/VillaMaldives3.webp",
          "/assets/VillaMaldives/VillaMaldives4.webp",
          "/assets/VillaMaldives/VillaMaldives5.webp",
          "/assets/VillaMaldives/VillaMaldives6.webp",
          "/assets/VillaMaldives/VillaMaldives7.webp",
          "/assets/VillaMaldives/VillaMaldives8.webp",
          "/assets/VillaMaldives/VillaMaldives9.webp",
          "/assets/VillaMaldives/VillaMaldives10.webp",
          "/assets/VillaMaldives/VillaMaldives11.webp",
          "/assets/VillaMaldives/VillaMaldives12.webp",
          "/assets/VillaMaldives/VillaMaldives13.webp",
          "/assets/VillaMaldives/VillaMaldives14.webp",
          "/assets/VillaMaldives/VillaMaldives15.webp",
          "/assets/VillaMaldives/VillaMaldives16.webp"
    ],
    ...blockRange(18, 7, 2026, 19, 7, 2026),
    ...blockRange(20, 7, 2026, 20, 7, 2026),
    ...blockRange(25, 7, 2026, 26, 7, 2026),
    ...blockRange(27, 7, 2026, 27, 7, 2026),
    ...blockRange(3, 8, 2026, 6, 8, 2026),
    ...blockRange(13, 8, 2026, 16, 8, 2026)
  },
  {
    id: "p10",
    ref: "MD0006", // Default M prefix due to close proximity to beach and town center
    slug: "/location-saisonniere/villa-bournia",
    title: "VILLA BOURNIA",
    type: "villa",
    transaction: "seasonal",
    zone: "Midoun",
    rooms: 3,
    baths: 0,
    area: 150,
    landArea: 1100,
    pricePerNight: 0,
    featured: true,
    isNew: true,
    shortDescription: "Magnifique villa tout confort avec grande piscine 5x10 et terrain de pétanque.",
    description:
      "Bienvenue à la VILLA BOURNIA, une magnifique villa tout confort idéale pour vos séjours en famille. Située dans un quartier calme et sans vis-à-vis, elle offre un cadre parfait à proximité immédiate de la plage et du centre-ville.",
    features: [
      "Grande piscine 5x10",
      "3 chambres tout confort",
      "Grand salon lumineux avec baies vitrées",
      "Cuisine entièrement équipée",
      "Grand jardin avec pergola & Espace barbecue",
      "Terrain de pétanque privé",
      "Terrasse sous arcsh",
      "Quartier calme, sans vis-à-vis proche plage & centre-ville",
    ],
    amenities: [
      "Piscine privée",
      "Cuisine équipée",
      "Terrasse",
      "Pergola",
      "Jardin",
      "Espace barbecue",
      "Terrain de pétanque",
    ],
    images: [
      "/assets/VillaBourina/VillaBourina1.webp",
      "/assets/VillaBourina/VillaBourina3.webp",
      "/assets/VillaBourina/VillaBourina4.webp",
      "/assets/VillaBourina/VillaBourina5.webp",
      "/assets/VillaBourina/VillaBourina6.webp",
      "/assets/VillaBourina/VillaBourina7.webp",
      "/assets/VillaBourina/VillaBourina8.webp",
      "/assets/VillaBourina/VillaBourina9.webp",
      "/assets/VillaBourina/VillaBourina10.webp"
    ],
    ...blockRange(6, 7, 2026, 12, 7, 2026),
    ...blockRange(13, 7, 2026, 14, 7, 2026),
    ...blockRange(17, 7, 2026, 19, 7, 2026),
    ...blockRange(20, 7, 2026, 25, 7, 2026),
    ...blockRange(28, 7, 2026, 2, 8, 2026),
    ...blockRange(4, 8, 2026, 9, 8, 2026),
    ...blockRange(10, 8, 2026, 10, 8, 2026),
    ...blockRange(14, 8, 2026, 16, 8, 2026),
    ...blockRange(17, 8, 2026, 20, 8, 2026)
  },
  {
    id: "p111",
    ref: "AG0001", // AG for Aghir region
    slug: "/location-saisonniere/villa-yassine",
    title: "VILLA YASSINE",
    type: "villa",
    transaction: "seasonal",
    zone: "Aghir",
    rooms: 2, // S+2 (1 suite parentale + 1 chambre)
    baths: 2, // 1 suite parentale + 1 salle d'eau commune
    area: 130,
    landArea: 550,
    pricePerNight: 0,
    featured: true,
    isNew: true,
    shortDescription: "Superbe villa S+2 avec piscine privée proche de la plage d'Aghir.",
    description:
      "Offrez-vous des vacances inoubliables à la Villa Yassine, une superbe villa S+2 avec piscine privée, idéale pour un séjour en famille ou entre amis (capacité 5 personnes). Entièrement meublée et climatisée, elle est située dans un quartier calme et agréable à proximité de la magnifique plage d'Aghir.",
    features: [
      "1 suite parentale",
      "1 chambre confortable",
      "Salon spacieux avec salle à manger",
      "Cuisine équipée",
      "Capacité d'accueil : 5 personnes",
      "Villa entièrement meublée et climatisée",
      "Quartier calme et agréable proche plage",
    ],
    amenities: [
      "Piscine privée",
      "Espace barbecue",
      "Entrée voiture",
      "Douche extérieure",
    ],
    images: [
      "/assets/VillaYassine/VillaYassine1.webp",
      "/assets/VillaYassine/VillaYassine2.webp",
      "/assets/VillaYassine/VillaYassine3.webp",
      "/assets/VillaYassine/VillaYassine4.webp",
      "/assets/VillaYassine/VillaYassine5.webp",
      "/assets/VillaYassine/VillaYassine6.webp",
      "/assets/VillaYassine/VillaYassine7.webp",
      "/assets/VillaYassine/VillaYassine8.webp",
      "/assets/VillaYassine/VillaYassine9.webp",
      "/assets/VillaYassine/VillaYassine10.webp",
      "/assets/VillaYassine/VillaYassine11.webp",
    ],
    // blockedDates: [],
  },
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  // Annual rentals
  {
    id: "p32",
    ref: "HS3001",
    slug: "/location-annuelle/villa-meublee-houmt-souk",
    title: "VILLA MEUBLÉE S+4 – HOUMT SOUK",
    type: "villa",
    transaction: "annual",
    zone: "Houmt Souk",
    rooms: 4,
    baths: 2,
    area: 0,
    landArea: 0,
    pricePerMonth: 0,
    featured: false,
    isNew: false,
    shortDescription: "Superbe villa meublée S+4 dans un quartier résidentiel calme.",
    description: "Découvrez cette superbe villa meublée, située dans un quartier résidentiel calme et sécurisé à Houmt Souk, idéale pour une famille à la recherche de confort et de tranquillité. Située à proximité du magasin Aziza et de l’École Internationale Victor Hugo.",
    features: [
      "Villa entièrement meublée",
      "4 chambres dont 1 suite parentale",
      "Grand salon lumineux",
      "Cuisine fonctionnelle entièrement équipée",
      "Quartier calme, agréable et sécurisé",
      "Proche des commerces et commodités",
      "À quelques minutes de l’École Internationale Victor Hugo"
    ],
    amenities: [
      "Garage"
    ],
    images: [
      "/assets/AnnualVilla/Villa1AN/Villa1AN1.webp",
      "/assets/AnnualVilla/Villa1AN/Villa1AN2.webp",
      "/assets/AnnualVilla/Villa1AN/Villa1AN3.webp",
      "/assets/AnnualVilla/Villa1AN/Villa1AN4.webp",
      "/assets/AnnualVilla/Villa1AN/Villa1AN5.webp",
      "/assets/AnnualVilla/Villa1AN/Villa1AN6.webp",
      "/assets/AnnualVilla/Villa1AN/Villa1AN7.webp",
      "/assets/AnnualVilla/Villa1AN/Villa1AN8.webp",
      "/assets/AnnualVilla/Villa1AN/Villa1AN9.webp",
      "/assets/AnnualVilla/Villa1AN/Villa1AN10.webp"
    ]
  },
  {
    id: "p33",
    ref: "HS3002",
    slug: "/location-annuelle/villa-neuve-piscine-houmt-souk",
    title: "VILLA NEUVE S+5 AVEC PISCINE – HOUMT SOUK",
    type: "villa",
    transaction: "annual",
    zone: "Houmt Souk",
    rooms: 5,
    baths: 2,
    area: 0,
    landArea: 0,
    pricePerMonth: 0,
    featured: false,
    isNew: true,
    shortDescription: "Magnifique villa neuve, non meublée S+5 avec piscine privée à Houmt Souk.",
    description: "Découvrez cette magnifique villa neuve, non meublée, située dans un quartier résidentiel calme et sécurisé à Houmt Souk. Offrant 5 chambres et une superbe piscine privée, elle est idéalement située à proximité du magasin Aziza et de l’École Internationale Victor Hugo.",
    features: [
      "Villa neuve (non meublée)",
      "5 chambres dont 1 suite parentale",
      "Grand salon lumineux",
      "Cuisine fonctionnelle",
      "Quartier résidentiel calme et sécurisé",
      "À proximité du magasin Aziza",
      "À quelques minutes de l’École Internationale Victor Hugo"
    ],
    amenities: [
      "Piscine privée",
      "Garage"
    ],
    images: [
      "/assets/AnnualVilla/Villa2AN/Villa2AN1.webp",
      "/assets/AnnualVilla/Villa2AN/Villa2AN2.webp",
      "/assets/AnnualVilla/Villa2AN/Villa2AN3.webp",
      "/assets/AnnualVilla/Villa2AN/Villa2AN4.webp",
      "/assets/AnnualVilla/Villa2AN/Villa2AN5.webp",
      "/assets/AnnualVilla/Villa2AN/Villa2AN6.webp"
        ]
  },
  {
    id: "p34",
    ref: "HS3003",
    slug: "/location-annuelle/villa-meublee-victor-hugo",
    title: "VILLA MEUBLÉE PROCHE ÉCOLE VICTOR HUGO",
    type: "villa",
    transaction: "annual",
    zone: "Houmt Souk",
    rooms: 3,
    baths: 2,
    area: 0,
    landArea: 0,
    pricePerMonth: 0,
    featured: false,
    isNew: false,
    shortDescription: "Charmante villa meublée S+3 avec grand garage proche de l'École Victor Hugo.",
    description: "Charmante villa meublée S+3 disponible en location annuelle à Houmt Souk, idéalement située à proximité immédiate de l'École Française Victor Hugo. Un cadre idéal, calme et confortable pour accueillir une famille.",
    features: [
      "Villa meublée",
      "3 chambres dont 1 suite parentale",
      "Salon spacieux et lumineux",
      "Cuisine équipée",
      "1 salle d’eau",
      "Idéal pour une famille (confort et tranquillité)",
      "Proximité École Française Victor Hugo"
    ],
    amenities: [
      "Jardin agréable",
      "Garage spacieux (6m x 4m)",
      "Entrée voiture"
    ],
    images: [
      "/assets/AnnualVilla/Villa3AN/Villa3AN1.webp",
      "/assets/AnnualVilla/Villa3AN/Villa3AN2.webp",
      "/assets/AnnualVilla/Villa3AN/Villa3AN3.webp",
      "/assets/AnnualVilla/Villa3AN/Villa3AN4.webp",
      "/assets/AnnualVilla/Villa3AN/Villa3AN5.webp",
      "/assets/AnnualVilla/Villa3AN/Villa3AN6.webp",
      "/assets/AnnualVilla/Villa3AN/Villa3AN7.webp",
      "/assets/AnnualVilla/Villa3AN/Villa3AN8.webp",
      "/assets/AnnualVilla/Villa3AN/Villa3AN9.webp"

    ]
  },
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales
  // Sales

  {
      id: "p20",
      ref: "GZ0001",
      slug: "/vente-maison/villa-ghizen",
      title: "CHARMANTE VILLA DE PLAIN-PIED AVEC PISCINE",
      type: "villa",
      transaction: "sale",
      zone: "Ghizen",
      rooms: 3,
      baths: 2,
      area: 190,
      landArea: 650,
      salePrice: 630000,
      shortDescription: "Charmante villa de plain-pied avec piscine à Ghizen, Djerba.",
      description:
        "Vis-à-Vis Immobilier Djerba vous présente cette magnifique villa de plain-pied, alliant confort, modernité et prestations de qualité. Située à Ghizen, elle offre un cadre de vie idéal avec un grand terrain en Zone ZA et un titre bleu individuel.",
      features: [
        "1 suite parentale avec salle d'eau privative",
        "2 chambres confortables",
        "2 salles d'eau au total",
        "Grand salon lumineux",
        "Espace salle à manger",
        "Cuisine ouverte moderne",
      ],
      amenities: [
        "Piscine privée avec banquette intégrée",
        "Jardin aménagé avec grandes terrasses",
        "Espace barbecue",
        "Titre bleu individuel",
        "Pré-installation de climatisation",
        "Pré-installation pour système de vidéosurveillance",
        "Porte d'entrée sécurisée avec caméra et ouverture à distance",
        "Matériaux de construction haut de gamme",
      ],
      images: [
          "/assets/SalesVilla/Villa1AV/Villa1AV1.webp",
          "/assets/SalesVilla/Villa1AV/Villa1AV2.webp",
          "/assets/SalesVilla/Villa1AV/Villa1AV3.webp",
          "/assets/SalesVilla/Villa1AV/Villa1AV4.webp",
          "/assets/SalesVilla/Villa1AV/Villa1AV5.webp",
          "/assets/SalesVilla/Villa1AV/Villa1AV6.webp",
          "/assets/SalesVilla/Villa1AV/Villa1AV7.webp",
          "/assets/SalesVilla/Villa1AV/Villa1AV8.webp",
          "/assets/SalesVilla/Villa1AV/Villa1AV9.webp",
          "/assets/SalesVilla/Villa1AV/Villa1AV10.webp",
          "/assets/SalesVilla/Villa1AV/Villa1AV11.webp",
          "/assets/SalesVilla/Villa1AV/Villa1AV12.webp",
          "/assets/SalesVilla/Villa1AV/Villa1AV13.webp",
          "/assets/SalesVilla/Villa1AV/Villa1AV14.webp",
          "/assets/SalesVilla/Villa1AV/Villa1AV15.webp"
      ],
    },
  {
      id: "p21", // Next sequential ID
      ref: "HS0003", // Updated project reference prefix to 2026
      slug: "/vente-maison/villa-moderne-houmt-souk",
      title: "VILLA NEUVE & MODERNE S+3 - ZONE AGRICOLE",
      type: "villa",
      transaction: "sale",
      zone: "Houmt Souk",
      rooms: 3,
      baths: 2, // 1 suite parentale + 1 commune
      area: 200,
      landArea: 600,
      salePrice: 580000,
      shortDescription: "Villa neuve et moderne S+3 avec piscine située en zone agricole à Houmt Souk.",
      description:
        "Immo Djerba vous présente une magnifique villa neuve et moderne de plain-pied, offrant calme absolu et intimité garantie en zone agricole. Idéalement située à seulement 2 minutes du magasin Aziza et de l'école française Victor Hugo, elle dispose de superbes volumes et de prestations fonctionnelles.",
      features: [
        "1 suite parentale avec salle d’eau privative",
        "2 chambres confortables",
        "Salle d’eau commune",
        "Salon spacieux et baigné de lumière naturelle",
        "Cuisine moderne entièrement équipée",
        "Surface construite de 200 m²",
        "Terrain de 600 m² en zone agricole",
      ],
      amenities: [
        "Piscine privée",
        "Jardin arboré & verdoyant",
        "Garage fermé",
        "Propriété entièrement clôturée avec portail",
        "Proche commodités (2 min Aziza et École Victor Hugo)",
      ],
      images: [
            "/assets/SalesVilla/Villa2AV/Villa2AV1.webp",
            "/assets/SalesVilla/Villa2AV/Villa2AV2.webp",
            "/assets/SalesVilla/Villa2AV/Villa2AV3.webp",
            "/assets/SalesVilla/Villa2AV/Villa2AV4.webp",
            "/assets/SalesVilla/Villa2AV/Villa2AV5.webp",
            "/assets/SalesVilla/Villa2AV/Villa2AV6.webp",
            "/assets/SalesVilla/Villa2AV/Villa2AV7.webp",
            "/assets/SalesVilla/Villa2AV/Villa2AV8.webp",
            "/assets/SalesVilla/Villa2AV/Villa2AV9.webp",
            "/assets/SalesVilla/Villa2AV/Villa2AV10.webp",
            "/assets/SalesVilla/Villa2AV/Villa2AV11.webp",
            "/assets/SalesVilla/Villa2AV/Villa2AV12.webp",
            "/assets/SalesVilla/Villa2AV/Villa2AV13.webp"
      ],
    },
{
    id: "p22",
    ref: "HS0004",
    slug: "/vente-maison/villa-neuve-piscine-djerba",
    title: "VILLA NEUVE AVEC PISCINE & ÉTAGE INDÉPENDANT",
    type: "villa",
    transaction: "sale",
    zone: "Houmet Souk", // Can be specified more precisely if needed (e.g., Midoun, Houmt Souk)
    rooms: 4, // 1 suite + 2 chambres (RDC) + 1 suite indépendante (Étage)
    baths: 3, // 1 suite (RDC) + 1 salle d'eau (RDC) + 1 suite (Étage)
    area: 148,
    landArea: 322,
    salePrice: 540000,
    shortDescription: "Villa neuve moderne avec piscine et un étage indépendant à fort potentiel locatif.",
    description:
      "Coup de cœur à Djerba ! Magnifique villa neuve offrant un intérieur moderne et lumineux. Elle se distingue par une configuration unique comprenant un rez-de-chaussée complet et un étage totalement indépendant avec sa propre suite parentale, idéal pour recevoir ou générer un excellent rendement locatif. Disponible immédiatement.",
    features: [
      "Rez-de-chaussée : 1 suite parentale + 2 chambres confortables",
      "Étage indépendant : Suite parentale privative avec salle d'eau",
      "Salon spacieux baigné de lumière",
      "Cuisine ouverte contemporaine",
      "Dressings intégrés dans toutes les chambres",
      "Surface bâtie de 148 m²",
      "Terrain de 322 m²",
    ],
    amenities: [
      "Piscine privée (3x5 m)",
      "Jardin aménagé",
      "Entrée voiture avec porte coulissante",
      "Acte notarié disponible",
    ],
    images: [
          "/assets/SalesVilla/Villa3AV/Villa3AV1.webp",
          "/assets/SalesVilla/Villa3AV/Villa3AV2.webp",
          "/assets/SalesVilla/Villa3AV/Villa3AV3.webp",
          "/assets/SalesVilla/Villa3AV/Villa3AV4.webp",
          "/assets/SalesVilla/Villa3AV/Villa3AV5.webp",
          "/assets/SalesVilla/Villa3AV/Villa3AV6.webp",
          "/assets/SalesVilla/Villa3AV/Villa3AV7.webp",
          "/assets/SalesVilla/Villa3AV/Villa3AV8.webp",
          "/assets/SalesVilla/Villa3AV/Villa3AV9.webp",
          "/assets/SalesVilla/Villa3AV/Villa3AV10.webp",
          "/assets/SalesVilla/Villa3AV/Villa3AV11.webp"
    ],
  },
  {
    id: "p23",
    ref: "HS0005",
    slug: "/vente-maison/villa-vue-mer-houmt-souk",
    title: "SUPERBE VILLA AVEC VUE SUR MER S+5",
    type: "villa",
    transaction: "sale",
    zone: "Houmt Souk",
    rooms: 5, // S+5 (2 chambres + 1 suite au RDC, 2 chambres + 1 suite à l'étage)
    baths: 4, // 1 suite RDC + 1 SDB RDC + 1 suite Étage + 1 SDB Étage
    area: 256,
    landArea: 408,
    salePrice: 800000,
    featured: true,
    zoning: "Zone urbaine",
    shortDescription: "Magnifique villa S+5 avec vue sur mer, piscine privée et garage à Houmt Souk.",
    description:
      "Offrez-vous un cadre de vie exceptionnel avec cette magnifique villa S+5 idéalement située en zone urbaine à Houmt Souk. Bénéficiant d'une vue sur mer imprenable, d'une piscine privée et d'installations traditionnelles comme une citerne d'eau (fesguia), cette propriété offre de superbes volumes répartis sur deux niveaux.",
    features: [
      "Rez-de-chaussée : Grand salon lumineux, cuisine équipée",
      "RDC Nuit : 1 suite parentale, 1 chambre, 1 salle de bain",
      "Étage : 1 suite parentale, 2 chambres, 1 salle de bain",
      "Surface couverte de 256 m²",
      "Terrain de 408 m² en zone urbaine",
      "Vue sur mer dégagée",
    ],
    amenities: [
      "Piscine privée (3,30 x 8,30 m)",
      "Jardin arboré",
      "Garage privatif",
      "Citerne d'eau traditionnelle (Fesguia)",
    ],
    images: [
          "/assets/SalesVilla/Villa4AV/Villa4AV1.webp",
          "/assets/SalesVilla/Villa4AV/Villa4AV2.webp",
          "/assets/SalesVilla/Villa4AV/Villa4AV3.webp",
          "/assets/SalesVilla/Villa4AV/Villa4AV4.webp",
          "/assets/SalesVilla/Villa4AV/Villa4AV5.webp",
          "/assets/SalesVilla/Villa4AV/Villa4AV6.webp",
          "/assets/SalesVilla/Villa4AV/Villa4AV7.webp",
          "/assets/SalesVilla/Villa4AV/Villa4AV8.webp",
          "/assets/SalesVilla/Villa4AV/Villa4AV9.webp"
    ],
  },
  {
    id: "p24",
    ref: "HS2005",
    slug: "/vente-maison/villa-moderne-houmt-souk-calme",
    title: "VILLA MODERNE DANS QUARTIER RÉSIDENTIEL",
    type: "villa",
    transaction: "sale",
    zone: "Houmt Souk",
    rooms: 3, // 3 chambres dont 2 suites
    baths: 3, // 2 suites privatives + 1 salle d'eau commune (généralement configuré ainsi)
    area: 230,
    landArea: 437,
    salePrice: 660000,
    shortDescription: "Villa moderne de 230 m² dans un quartier calme et résidentiel à Houmt Souk.",
    description:
      "Une opportunité à ne pas rater à Houmt Souk ! Magnifique villa moderne de haut standing située dans un quartier calme et résidentiel. Elle offre une surface couverte de 230 m² sur un beau terrain de 437 m² avec un jardin aménagé et la possibilité d'y intégrer une piscine.",
    features: [
      "3 chambres au total dont 2 suites parentales",
      "Grand salon moderne et lumineux",
      "Surface construite de 230 m²",
      "Terrain de 437 m²",
      "Emplacement dans un secteur calme et résidentiel",
    ],
    amenities: [
      "Jardin entièrement aménagé",
      "Possibilité de construire une piscine",
      "Garage fermé",
      "Entrée de voiture supplémentaire",
    ],
    images: [
      "/assets/SalesVilla/Villa5AV/Villa5AV1.webp",
      "/assets/SalesVilla/Villa5AV/Villa5AV2.webp",
      "/assets/SalesVilla/Villa5AV/Villa5AV3.webp",
      "/assets/SalesVilla/Villa5AV/Villa5AV4.webp",
      "/assets/SalesVilla/Villa5AV/Villa5AV5.webp",
      "/assets/SalesVilla/Villa5AV/Villa5AV6.webp",
      "/assets/SalesVilla/Villa5AV/Villa5AV7.webp",
      "/assets/SalesVilla/Villa5AV/Villa5AV8.webp",
      "/assets/SalesVilla/Villa5AV/Villa5AV9.webp",
      "/assets/SalesVilla/Villa5AV/Villa5AV10.webp",
      "/assets/SalesVilla/Villa5AV/Villa5AV11.webp",
      "/assets/SalesVilla/Villa5AV/Villa5AV12.webp",
      "/assets/SalesVilla/Villa5AV/Villa5AV13.webp",
      "/assets/SalesVilla/Villa5AV/Villa5AV14.webp"
    ],
  },
  {
    id: "p25",
    ref: "HS2006",
    slug: "/vente-maison/villa-neuve-houmt-souk",
    title: "VILLA NEUVE DANS UN QUARTIER RECHERCHÉ",
    type: "villa",
    transaction: "sale",
    zone: "Houmt Souk",
    rooms: 3, // 3 chambres dont une belle suite parentale
    baths: 2, // 1 suite parentale + 1 salle d'eau moderne
    area: 160,
    landArea: 320,
    salePrice: 0, // Price not specified in the text
    shortDescription: "Villa neuve S+3 de 160 m² habitables avec garage, idéalement située à Houmt Souk.",
    description:
      "IMMO DJERBA vous présente une opportunité rare au cœur de Houmt Souk. Cette villa neuve offre confort, tranquillité et un cadre de vie exceptionnel. Située dans un quartier calme, recherché et proche de toutes les commodités (écoles, commerces), elle est parfaite pour une résidence principale ou un investissement locatif à fort potentiel.",
    features: [
      "3 chambres confortables dont une belle suite parentale",
      "Grand salon lumineux avec espace séjour",
      "Cuisine fonctionnelle et bien agencée",
      "Salle d’eau moderne",
      "Surface bâtie de 160 m²",
      "Terrain de 320 m²",
    ],
    amenities: [
      "Construction neuve de plain-pied",
      "Jardin agréable pour la détente",
      "Garage privé",
      "Proximité immédiate des commodités",
    ],
    images: [
      "/assets/SalesVilla/Villa6AV/Villa6AV4.webp",
      "/assets/SalesVilla/Villa6AV/Villa6AV1.webp",
      "/assets/SalesVilla/Villa6AV/Villa6AV2.webp",
      "/assets/SalesVilla/Villa6AV/Villa6AV3.webp",
      "/assets/SalesVilla/Villa6AV/Villa6AV5.webp",
      "/assets/SalesVilla/Villa6AV/Villa6AV6.webp",
      "/assets/SalesVilla/Villa6AV/Villa6AV7.webp",
      "/assets/SalesVilla/Villa6AV/Villa6AV8.webp",
      "/assets/SalesVilla/Villa6AV/Villa6AV9.webp",
    ],
  },
  {
    id: "p26",
    ref: "HS2007",
    slug: "/vente-maison/villa-haut-standing-houmt-souk",
    title: "VILLA HAUT STANDING AVEC ISOLATION THERMIQUE",
    type: "villa",
    transaction: "sale",
    zone: "Houmt Souk",
    rooms: 4, // RDC: 1 chambre | Étage: 2 chambres + 1 suite parentale
    baths: 3, // RDC: 1 salle d'eau | Étage: 1 suite parentale + 1 salle d'eau
    area: 275,
    landArea: 487,
    salePrice: 0, // Prix non spécifié dans l'annonce
    shortDescription: "Villa de haut standing de 275 m² avec piscine, garage et prestations techniques de qualité.",
    description:
      "Magnifique villa de haut standing située à Houmt Souk, offrant confort et tranquillité absolue. Conçue avec des prestations techniques rares (isolation thermique, suivi ingénieur) et entièrement équipée, elle dispose de superbes volumes répartis sur deux niveaux, idéals pour une habitation principale ou un investissement de prestige.",
    features: [
      "Rez-de-chaussée : 1 chambre, 2 salons spacieux, cuisine équipée, 1 salle d'eau",
      "Étage : 1 suite parentale privative, 2 chambres, 1 salle d'eau",
      "Suivi des travaux rigoureux par des ingénieurs béton",
      "Isolation thermique et phonique haute performance (Isomat)",
      "Surface couverte de 275 m²",
      "Terrain de 487 m²",
    ],
    amenities: [
      "Piscine privée avec garantie de 5 ans",
      "Cuisine entièrement équipée",
      "3 climatiseurs installés",
      "Système de sécurité avec 4 caméras de surveillance",
      "Garage privé",
      "Espace extérieur entièrement aménagé",
    ],
    images: [
      "/assets/SalesVilla/Villa7AV/Villa7AV1.webp",
      "/assets/SalesVilla/Villa7AV/Villa7AV2.webp",
      "/assets/SalesVilla/Villa7AV/Villa7AV3.webp",
      "/assets/SalesVilla/Villa7AV/Villa7AV4.webp",
      "/assets/SalesVilla/Villa7AV/Villa7AV5.webp",
      "/assets/SalesVilla/Villa7AV/Villa7AV6.webp",
      "/assets/SalesVilla/Villa7AV/Villa7AV7.webp",
      "/assets/SalesVilla/Villa7AV/Villa7AV8.webp",
      "/assets/SalesVilla/Villa7AV/Villa7AV9.webp",
      "/assets/SalesVilla/Villa7AV/Villa7AV10.webp",
      "/assets/SalesVilla/Villa7AV/Villa7AV11.webp",
    ],
  },
{
    id: "p27",
    ref: "HS2007",
    slug: "/vente-maison/villa-luxe-aghir",
    title: "VILLA DE LUXE À AGHIR – DJERBA",
    type: "villa",
    transaction: "sale",
    zone: "Aghir",
    rooms: 4,
    baths: 3,
    area: 340,
    landArea: 1530,
    salePrice: 0,
    shortDescription: "Villa d'exception de 340 m² avec piscine privée, située à Aghir, Djerba.",
    description:
      "VILLA DE LUXE À AGHIR – DJERBA. Vous cherchez une villa d'exception à acheter ? Découvrez cette magnifique propriété de 340 m², bâtie sur un terrain de 1530 m², située dans le prestigieux quartier d'Aghir, à quelques minutes de la mer. Disponible également en location saisonnière. Immo Djerba – Votre partenaire immobilier de confiance.",
    features: [
      "4 chambres dont 2 suites parentales",
      "Cuisine entièrement équipée",
      "Grand salon lumineux",
      "Grande terrasse avec vue dégagée",
      "Surface couverte de 340 m²",
      "Terrain de 1530 m²",
    ],
    amenities: [
      "Piscine privée",
      "Jardin aménagé",
      "Espace barbecue",
      "Garage + abri voiture",
      "Caméras de sécurité",
      "Pièce de rangement",
    ],
    images: [
      "/assets/SalesVilla/Villa9AV/Villa9AV1.webp",
      "/assets/SalesVilla/Villa9AV/Villa9AV2.webp",
      "/assets/SalesVilla/Villa9AV/Villa9AV3.webp",
      "/assets/SalesVilla/Villa9AV/Villa9AV4.webp",
      "/assets/SalesVilla/Villa9AV/Villa9AV5.webp",
      "/assets/SalesVilla/Villa9AV/Villa9AV6.webp",
      "/assets/SalesVilla/Villa9AV/Villa9AV7.webp",
      "/assets/SalesVilla/Villa9AV/Villa9AV8.webp",
      "/assets/SalesVilla/Villa9AV/Villa9AV9.webp",
      "/assets/SalesVilla/Villa9AV/Villa9AV10.webp",
      "/assets/SalesVilla/Villa9AV/Villa9AV11.webp"
    ],
  },
  {
    id: "p28",
    ref: "MD2008",
    slug: "/vente-maison/villa-moderne-midoun",
    title: "VILLA S+4 MODERNE AVEC PISCINE – DJERBA MIDOUN",
    type: "villa",
    transaction: "sale",
    zone: "Midoun",
    rooms: 4,
    baths: 3,
    area: 315,
    landArea: 560,
    salePrice: 0,
    shortDescription: "Villa moderne et spacieuse de 315 m² avec piscine privée, située en zone urbaine à Midoun.",
    description: "VILLA S+4 AVEC PISCINE À VENDRE – DJERBA MIDOUN. Située en zone urbaine et accessible aux étrangers, cette propriété dispose d'un titre bleu individuel et d'un plan conforme. Elle offre un cadre de vie moderne et spacieux. Immo Djerba – Votre partenaire immobilier de confiance.",
    features: [
      "4 chambres dont 3 suites",
      "Grand salon lumineux",
      "Cuisine équipée",
      "Surface couverte de 315 m²",
      "Terrain de 560 m²",
      "Titre bleu individuel et plan conforme",
      "Zone urbaine accessible aux étrangers"
    ],
    amenities: [
      "Piscine privée",
      "Jardin gazonné avec palmiers",
      "Espace barbecue",
      "Douche extérieure",
      "Système de sécurité (alarme + caméras)",
      "Climatisation installée"
    ],
    images: [
      "/assets/SalesVilla/Villa10AV/Villa10AV1.webp",
      "/assets/SalesVilla/Villa10AV/Villa10AV2.webp",
      "/assets/SalesVilla/Villa10AV/Villa10AV3.webp",
      "/assets/SalesVilla/Villa10AV/Villa10AV4.webp",
      "/assets/SalesVilla/Villa10AV/Villa10AV5.webp",
      "/assets/SalesVilla/Villa10AV/Villa10AV6.webp",
      "/assets/SalesVilla/Villa10AV/Villa10AV7.webp",
      "/assets/SalesVilla/Villa10AV/Villa10AV8.webp",
      "/assets/SalesVilla/Villa10AV/Villa10AV9.webp",
      "/assets/SalesVilla/Villa10AV/Villa10AV10.webp",
      "/assets/SalesVilla/Villa10AV/Villa10AV11.webp",
      "/assets/SalesVilla/Villa10AV/Villa10AV12.webp",
      "/assets/SalesVilla/Villa10AV/Villa10AV13.webp",
      "/assets/SalesVilla/Villa10AV/Villa10AV14.webp"    ],
  },

  {
    id: "p29",
    ref: "MD0029", 
    slug: "/vente-maison/villa-plain-pied-arkou",
    title: "VILLA DE PLAIN-PIED À ARKOU",
    type: "villa",
    transaction: "sale",
    zone: "Arkou",
    rooms: 3, 
    baths: 3, 
    area: 200, 
    landArea: 700, 
    salePrice: 0,
    featured: true,
    isNew: false,
    shortDescription: "Belle villa de plain-pied de 200 m² sur un terrain de 700 m² à Arkou.",
    description:
      "Découvrez cette belle villa de plain-pied située dans un environnement calme à Arkou, idéale pour vivre à l’année ou pour un investissement locatif. Une opportunité exclusive proposée par Immo Djerba.",
    features: [
      "Villa de plain-pied",
      "Surface couverte : 200 m²",
      "Terrain de 700 m²",
      "Située en zone agricole",
      "Environnement calme à Arkou",
      "Entrée voiture / Parking privé",
    ],
    amenities: [
      "Grand salon",
      "Jardin gazonné",
      "Pergola",
      "Cuisine",
      "Parking",
    ],
      images: [
        "/assets/SalesVilla/Villa11AV/Villa11AV1.webp",
        "/assets/SalesVilla/Villa11AV/Villa11AV2.webp",
        "/assets/SalesVilla/Villa11AV/Villa11AV3.webp",
        "/assets/SalesVilla/Villa11AV/Villa11AV4.webp",
        "/assets/SalesVilla/Villa11AV/Villa11AV5.webp",
        "/assets/SalesVilla/Villa11AV/Villa11AV6.webp",
        "/assets/SalesVilla/Villa11AV/Villa11AV7.webp",
        "/assets/SalesVilla/Villa11AV/Villa11AV8.webp",
        "/assets/SalesVilla/Villa11AV/Villa11AV9.webp",
        "/assets/SalesVilla/Villa11AV/Villa11AV10.webp",
    ],
  },
  {
    id: "p30",
    ref: "AG0030", 
    slug: "/vente-maison/villa-luxe-vue-mer-aghir",
    title: "VILLA DE LUXE AVEC VUE MER",
    type: "villa",
    transaction: "sale",
    zone: "Aghir",
    rooms: 4, 
    baths: 4, 
    area: 280, 
    landArea: 1000,
    salePrice: 0,
    featured: true,
    isNew: false,
    shortDescription: "Magnifique villa haut standing de 280 m² avec vue mer exceptionnelle et piscine.",
    description:
      "Magnifique villa haut standing avec une vue mer exceptionnelle située entre Midoun & Aghir, à seulement 5 minutes de la plage d'Aghir. Dotée d'un Titre Bleu et située en Zone Agricole, cette propriété dispose d'énergie photovoltaïque et d'un puits d'eau.",
    features: [
      "Vue mer exceptionnelle",
      "À seulement 5 minutes de la plage d'Aghir",
      "Piscine de 9 m × 4,5 m",
      "4 suites parentales indépendantes",
      "4 terrasses, dont 2 avec vue mer",
      "Énergie photovoltaïque & Puits d'eau",
      "Titre Bleu (Zone Agricole)",
      "Surface couverte : 280 m² | Terrain : 1 000 m²",
    ],
    amenities: [
      "Piscine privée",
      "Vue mer",
      "Terrasses",
      "Jardin arboré",
      "Espace barbecue",
      "Patio avec fontaine",
      "Panneaux photovoltaïques",
      "Puits d'eau",
      "Cuisine moderne",
    ],
    images: [
      "/assets/SalesVilla/Villa12AV/Villa12AV1.webp",
      "/assets/SalesVilla/Villa12AV/Villa12AV2.webp",
      "/assets/SalesVilla/Villa12AV/Villa12AV3.webp",
      "/assets/SalesVilla/Villa12AV/Villa12AV4.webp",
      "/assets/SalesVilla/Villa12AV/Villa12AV5.webp",
      "/assets/SalesVilla/Villa12AV/Villa12AV6.webp",
      "/assets/SalesVilla/Villa12AV/Villa12AV7.webp",
      "/assets/SalesVilla/Villa12AV/Villa12AV8.webp",
      "/assets/SalesVilla/Villa12AV/Villa12AV9.webp",
      "/assets/SalesVilla/Villa12AV/Villa12AV10.webp"
    ],
  },

  // Land
  // Land
  // Land
  // Land
  // Land
  // Land
  // Land
  // Land
  // Land
  // Land
  // Land
  // Land
  // Land
  // Land
  // Land
  // Land
  // Land
  // Land
  // Land
  // Land
  // Land
  // Land
  // Land
  // Land
  // Land
  // Land
  // Land
  // Land
  // Land
  // Land
  // Land
  // Land
  // Land
  // Land
  // Land
  // Land

];

export function findProperty(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug);
}
