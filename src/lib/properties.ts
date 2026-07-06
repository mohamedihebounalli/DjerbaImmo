

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
function blockRange(startOffsetDays: number, count: number): string[] {
  const dates: string[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + startOffsetDays + i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

export const PROPERTIES: Property[] = [
{
    id: "p1",
    ref: "MD0001", // M for Midoun based on your text
    slug: "/location-saisonniere/villa-mia", // Kept exactly as /villa-mia so your route works
    title: "VILLA ADNEN",
    type: "villa",
    transaction: "seasonal",
    zone: "Midoun",
    rooms: 3,
    baths: 2,
    area: 0,
    landArea: 0,
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
              // blockedDates: [...blockRange(15, 10), ...blockRange(60, 21)],

  },
{
    id: "p2",
    ref: "MD0002", // Based on proximity to Bourgou Mall / Midoun zone mentioned in hashtags
    slug: "/location-saisonniere/villa-soleil", // Kept exact original slug structure as requested
    title: "VILLA SHAIMA",
    type: "villa",
    transaction: "seasonal",
    zone: "Midoun",
    rooms: 3,
    baths: 0,
    area: 0,
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
              // blockedDates: [...blockRange(15, 10), ...blockRange(60, 21)],

  },
  {
      id: "p3",
      ref: "HS0001", // HS for Houmt Souk
      slug: "/location-saisonniere/appartement-medina", // Kept original slug structure
      title: "Villa Ridha", // Extracted title matching style from description header
      type: "villa", // Changed from apartment to villa
      transaction: "seasonal",
      zone: "Houmt Souk",
      rooms: 3, // 2 suites + 1 bedroom = 3 rooms total
      baths: 2, // 1 inside salle d'eau + 1 outside salle d'eau
      area: 0,
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
      ref: "TZ0001", // TZ for Tezdaine region
      slug: "/location-saisonniere/menzel-tezdaine", // Kept original slug structure
      title: "VILLA MIA",
      type: "villa", // Changed from menzel to villa based on new description
      transaction: "seasonal",
      zone: "Tezdaine",
      rooms: 5, // 5 chambres (studio independent mentioned but grouped or separate as in template)
      baths: 0,
      area: 0,
      landArea: 0,
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
              // blockedDates: [...blockRange(15, 10), ...blockRange(60, 21)],
    },
    {
    id: "p5",
    ref: "TZ0002", // TZ for Tezdayin area
    slug: "/location-saisonniere/villa-islem", // Dynamic slug based on name
    title: "VILLA ISLEM",
    type: "villa",
    transaction: "seasonal",
    zone: "Tezdayin",
    rooms: 3, // 3 chambres dont une suite parentale
    baths: 1, // 1 suite parentale implicitly includes/implies a bath context, but explicitly only 1 exterior WC/douche is detailed. Setting minimal or 0 if strictly strict, or 1 for the suite. Let's look: text says "Douche extérieure + WC", interior baths missing info -> 0 or 1. Let's put 1 for the suite parentale.
    area: 0,
    landArea: 0,
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
    ref: "MZ0001", // MZ for Mezraya
    slug: "/location-saisonniere/villa-charlotte",
    title: "VILLA CHARLOTTE",
    type: "villa",
    transaction: "seasonal",
    zone: "Mezraya",
    rooms: 4, // 4 chambres dont 1 suite parentale
    baths: 3, // 3 salles d’eau
    area: 0,
    landArea: 0,
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
              // blockedDates: [...blockRange(15, 10), ...blockRange(60, 21)],

  },
  {
    id: "p7",
    ref: "MD0003", // M for Midoun (Plage Yeti region)
    slug: "/location-saisonniere/villa-yeti-1",
    title: "VILLA YETI 1",
    type: "villa",
    transaction: "seasonal",
    zone: "Midoun",
    rooms: 3, // S+3 (1 suite RDC + 2 suites à l'étage)
    baths: 3, // 3 suites parentales avec salle d’eau privative (plus 1 salle d'eau indépendante au RDC, totalisant 4 zones d'eau)
    area: 0,
    landArea: 0,
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
              // blockedDates: [...blockRange(15, 10), ...blockRange(60, 21)],

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
    area: 0,
    landArea: 0,
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
              // blockedDates: [...blockRange(15, 10), ...blockRange(60, 21)],

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
    area: 0,
    landArea: 0,
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
              // blockedDates: [...blockRange(15, 10), ...blockRange(60, 21)],

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
    area: 0,
    landArea: 0,
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
      "Terrasse sous arcade",
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
              // blockedDates: [...blockRange(15, 10), ...blockRange(60, 21)],

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
    area: 0,
    landArea: 0,
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
{
    id: "",
    ref: "",
    slug: "",
    title: "",
    type: "studio",
    transaction: "annual",
    zone: "",
    area: 0,
    salePrice: 0,
    featured: false,
    constructible: false,
    zoning: "",
    shortDescription: "",
    description: "",
    features: [],
    images: [],
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
          "/assets/VILLASALES/Villa1AV/Villa1AV1.webp",
          "/assets/VILLASALES/Villa1AV/Villa1AV2.webp",
          "/assets/VILLASALES/Villa1AV/Villa1AV3.webp",
          "/assets/VILLASALES/Villa1AV/Villa1AV4.webp",
          "/assets/VILLASALES/Villa1AV/Villa1AV5.webp",
          "/assets/VILLASALES/Villa1AV/Villa1AV6.webp",
          "/assets/VILLASALES/Villa1AV/Villa1AV7.webp",
          "/assets/VILLASALES/Villa1AV/Villa1AV8.webp",
          "/assets/VILLASALES/Villa1AV/Villa1AV9.webp",
          "/assets/VILLASALES/Villa1AV/Villa1AV10.webp",
          "/assets/VILLASALES/Villa1AV/Villa1AV11.webp",
          "/assets/VILLASALES/Villa1AV/Villa1AV12.webp",
          "/assets/VILLASALES/Villa1AV/Villa1AV13.webp",
          "/assets/VILLASALES/Villa1AV/Villa1AV14.webp",
          "/assets/VILLASALES/Villa1AV/Villa1AV15.webp"
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
            "/assets/VILLASALES/Villa2AV/Villa2AV1.webp",
            "/assets/VILLASALES/Villa2AV/Villa2AV2.webp",
            "/assets/VILLASALES/Villa2AV/Villa2AV3.webp",
            "/assets/VILLASALES/Villa2AV/Villa2AV4.webp",
            "/assets/VILLASALES/Villa2AV/Villa2AV5.webp",
            "/assets/VILLASALES/Villa2AV/Villa2AV6.webp",
            "/assets/VILLASALES/Villa2AV/Villa2AV7.webp",
            "/assets/VILLASALES/Villa2AV/Villa2AV8.webp",
            "/assets/VILLASALES/Villa2AV/Villa2AV9.webp",
            "/assets/VILLASALES/Villa2AV/Villa2AV10.webp",
            "/assets/VILLASALES/Villa2AV/Villa2AV11.webp",
            "/assets/VILLASALES/Villa2AV/Villa2AV12.webp",
            "/assets/VILLASALES/Villa2AV/Villa2AV13.webp"
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
          "/assets/VILLASALES/Villa3AV/Villa3AV1.webp",
          "/assets/VILLASALES/Villa3AV/Villa3AV2.webp",
          "/assets/VILLASALES/Villa3AV/Villa3AV3.webp",
          "/assets/VILLASALES/Villa3AV/Villa3AV4.webp",
          "/assets/VILLASALES/Villa3AV/Villa3AV5.webp",
          "/assets/VILLASALES/Villa3AV/Villa3AV6.webp",
          "/assets/VILLASALES/Villa3AV/Villa3AV7.webp",
          "/assets/VILLASALES/Villa3AV/Villa3AV8.webp",
          "/assets/VILLASALES/Villa3AV/Villa3AV9.webp",
          "/assets/VILLASALES/Villa3AV/Villa3AV10.webp",
          "/assets/VILLASALES/Villa3AV/Villa3AV11.webp"
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
          "/assets/VILLASALES/Villa4AV/Villa4AV1.webp",
          "/assets/VILLASALES/Villa4AV/Villa4AV2.webp",
          "/assets/VILLASALES/Villa4AV/Villa4AV3.webp",
          "/assets/VILLASALES/Villa4AV/Villa4AV4.webp",
          "/assets/VILLASALES/Villa4AV/Villa4AV5.webp",
          "/assets/VILLASALES/Villa4AV/Villa4AV6.webp",
          "/assets/VILLASALES/Villa4AV/Villa4AV7.webp",
          "/assets/VILLASALES/Villa4AV/Villa4AV8.webp",
          "/assets/VILLASALES/Villa4AV/Villa4AV9.webp"
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
      "/assets/VILLASALES/Villa5AV/Villa5AV1.webp",
      "/assets/VILLASALES/Villa5AV/Villa5AV2.webp",
      "/assets/VILLASALES/Villa5AV/Villa5AV3.webp",
      "/assets/VILLASALES/Villa5AV/Villa5AV4.webp",
      "/assets/VILLASALES/Villa5AV/Villa5AV5.webp",
      "/assets/VILLASALES/Villa5AV/Villa5AV6.webp",
      "/assets/VILLASALES/Villa5AV/Villa5AV7.webp",
      "/assets/VILLASALES/Villa5AV/Villa5AV8.webp",
      "/assets/VILLASALES/Villa5AV/Villa5AV9.webp",
      "/assets/VILLASALES/Villa5AV/Villa5AV10.webp",
      "/assets/VILLASALES/Villa5AV/Villa5AV11.webp",
      "/assets/VILLASALES/Villa5AV/Villa5AV12.webp",
      "/assets/VILLASALES/Villa5AV/Villa5AV13.webp",
      "/assets/VILLASALES/Villa5AV/Villa5AV14.webp"
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
      "/assets/VILLASALES/Villa6AV/Villa6AV4.webp",
      "/assets/VILLASALES/Villa6AV/Villa6AV1.webp",
      "/assets/VILLASALES/Villa6AV/Villa6AV2.webp",
      "/assets/VILLASALES/Villa6AV/Villa6AV3.webp",
      "/assets/VILLASALES/Villa6AV/Villa6AV5.webp",
      "/assets/VILLASALES/Villa6AV/Villa6AV6.webp",
      "/assets/VILLASALES/Villa6AV/Villa6AV7.webp",
      "/assets/VILLASALES/Villa6AV/Villa6AV8.webp",
      "/assets/VILLASALES/Villa6AV/Villa6AV9.webp",
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
      "/assets/VILLASALES/Villa7AV/Villa7AV1.webp",
      "/assets/VILLASALES/Villa7AV/Villa7AV2.webp",
      "/assets/VILLASALES/Villa7AV/Villa7AV3.webp",
      "/assets/VILLASALES/Villa7AV/Villa7AV4.webp",
      "/assets/VILLASALES/Villa7AV/Villa7AV5.webp",
      "/assets/VILLASALES/Villa7AV/Villa7AV6.webp",
      "/assets/VILLASALES/Villa7AV/Villa7AV7.webp",
      "/assets/VILLASALES/Villa7AV/Villa7AV8.webp",
      "/assets/VILLASALES/Villa7AV/Villa7AV9.webp",
      "/assets/VILLASALES/Villa7AV/Villa7AV10.webp",
      "/assets/VILLASALES/Villa7AV/Villa7AV11.webp",
      "/assets/VILLASALES/Villa7AV/Villa7AV12.webp"
    ],
  },
  // Land
{
    id: "",
    ref: "",
    slug: "",
    title: "",
    type: "land",
    transaction: "sale",
    zone: "",
    area: 0,
    salePrice: 0,
    featured: false,
    constructible: false,
    zoning: "",
    shortDescription: "",
    description: "",
    features: [],
    images: [],
  },
];

export function findProperty(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug);
}
