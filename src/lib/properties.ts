import heroDjerba from "@/assets/hero-djerba.jpg";
import villaMia from "@/assets/villa-mia.jpg";
import villa2 from "@/assets/villa-2.jpg";
import apartment1 from "@/assets/apartment-1.jpg";
import menzel1 from "@/assets/menzel-1.jpg";
import studio1 from "@/assets/studio-1.jpg";
import terrain1 from "@/assets/terrain-1.jpg";
import terrain2 from "@/assets/terrain-2.jpg";

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
  "Cedouikech",
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
    ref: "VS-2401",
    slug: "/location/saisonniere/villa-mia",
    title: "VILLA MIA",
    type: "villa",
    transaction: "seasonal",
    zone: "Aghir",
    rooms: 4,
    baths: 3,
    area: 280,
    landArea: 800,
    pricePerNight: 850,
    featured: true,
    isNew: true,
    shortDescription:
      "Villa contemporaine avec piscine privée, à 5 min de la plage d'Aghir.",
    description:
      "Élégante villa moderne nichée dans une résidence sécurisée à Aghir. Vastes espaces baignés de lumière, terrasse plein sud avec piscine chauffée, jardin paysager planté d'oliviers et de palmiers. Idéale pour des vacances en famille ou entre amis, à quelques minutes des plus belles plages du sud-est de l'île.",
    features: [
      "4 chambres climatisées",
      "3 salles de bain en suite",
      "Salon double et salle à manger",
      "Cuisine équipée ouverte",
      "Piscine privée chauffée",
      "Terrasse couverte 60 m²",
      "Jardin clos 800 m²",
      "Parking privé 2 voitures",
      "Résidence sécurisée 24/7",
    ],
    amenities: [
      "Wifi fibre",
      "Climatisation",
      "Piscine",
      "Barbecue",
      "Ping-pong",
      "Télévision",
      "Lave-linge",
      "Lave-vaisselle",
      "Linge de maison fourni",
      "Ménage de fin de séjour",
    ],
    images: [villaMia, villa2, apartment1, heroDjerba, menzel1],
    blockedDates: [
      ...blockRange(5, 4),
      ...blockRange(22, 7),
      ...blockRange(45, 10),
    ],
  },
  {
    id: "p2",
    ref: "VS-2402",
    slug: "/location/saisonniere/villa-soleil",
    title: "VILLA SOLEIL",
    type: "villa",
    transaction: "seasonal",
    zone: "Sidi Jmour",
    rooms: 3,
    baths: 2,
    area: 200,
    landArea: 600,
    pricePerNight: 620,
    featured: true,
    shortDescription:
      "Villa pieds dans l'eau à Sidi Jmour, vue mer panoramique.",
    description:
      "Villa de charme construite face à la lagune. Esprit bord de mer, terrasses en bois, accès direct à la plage. Parfaite pour un séjour ressourçant au coucher du soleil le plus célèbre de Djerba.",
    features: [
      "3 chambres",
      "2 salles de bain",
      "Salon avec vue mer",
      "Cuisine équipée",
      "Terrasse bois 50 m²",
      "Accès direct plage",
    ],
    amenities: ["Wifi", "Climatisation", "Barbecue", "Kayaks", "Parking privé"],
    images: [villa2, villaMia, heroDjerba],
    blockedDates: [...blockRange(10, 5), ...blockRange(30, 14)],
  },
  {
    id: "p3",
    ref: "AP-2403",
    slug: "/location/saisonniere/appartement-houmt-souk",
    title: "APPARTEMENT MEDINA",
    type: "apartment",
    transaction: "seasonal",
    zone: "Houmt Souk",
    rooms: 2,
    baths: 1,
    area: 85,
    pricePerNight: 220,
    shortDescription:
      "Appartement lumineux au cœur de Houmt Souk, proche des souks.",
    description:
      "Au premier étage d'une bâtisse traditionnelle restaurée, cet appartement allie charme djerbien et confort moderne. À deux pas des souks, restaurants et galeries.",
    features: ["2 chambres", "Salle de bain", "Salon spacieux", "Terrasse 15 m²"],
    amenities: ["Wifi", "Climatisation", "Lave-linge"],
    images: [apartment1, studio1, menzel1],
    blockedDates: blockRange(2, 3),
  },
  {
    id: "p4",
    ref: "MZ-2404",
    slug: "/location/saisonniere/menzel-tezdaine",
    title: "MENZEL EL BAHJA",
    type: "menzel",
    transaction: "seasonal",
    zone: "Tezdaine",
    rooms: 5,
    baths: 4,
    area: 380,
    landArea: 1500,
    pricePerNight: 1200,
    featured: true,
    shortDescription:
      "Menzel traditionnel restauré, vastes patios et piscine.",
    description:
      "Authentique menzel djerbien des années 1900, entièrement restauré dans le respect de l'architecture vernaculaire. Patios fleuris, plafonds en palmier, piscine creusée dans un ancien bassin. Une expérience inoubliable au cœur de Tezdaine.",
    features: [
      "5 chambres dont 2 suites",
      "4 salles d'eau",
      "Salon traditionnel + salon moderne",
      "Patio central",
      "Piscine 12×5 m",
      "Hammam privatif",
    ],
    amenities: [
      "Wifi",
      "Climatisation",
      "Piscine",
      "Hammam",
      "Barbecue",
      "Service ménage",
      "Chef sur demande",
    ],
    images: [menzel1, villaMia, villa2, heroDjerba],
    blockedDates: [...blockRange(15, 10), ...blockRange(60, 21)],
  },
  // Annual rentals
  {
    id: "p5",
    ref: "LA-2405",
    slug: "/location/annuelle/villa-midoun",
    title: "VILLA LES OLIVIERS",
    type: "villa",
    transaction: "annual",
    zone: "Midoun",
    rooms: 4,
    baths: 3,
    area: 240,
    landArea: 700,
    pricePerMonth: 3500,
    shortDescription:
      "Villa familiale dans résidence calme à 10 min de Midoun centre.",
    description:
      "Belle villa contemporaine idéale pour résidence principale ou expatriation. Quartier résidentiel calme, écoles internationales à proximité, jardin arboré.",
    features: [
      "4 chambres",
      "3 salles de bain",
      "Cuisine équipée",
      "Jardin 700 m²",
      "Garage 2 voitures",
    ],
    amenities: ["Climatisation", "Chauffage", "Alarme", "Parking"],
    images: [villa2, villaMia, apartment1],
  },
  {
    id: "p6",
    ref: "LA-2406",
    slug: "/location/annuelle/appartement-houmt-souk-2",
    title: "APPARTEMENT VUE MER",
    type: "apartment",
    transaction: "annual",
    zone: "Houmt Souk",
    rooms: 3,
    baths: 2,
    area: 120,
    pricePerMonth: 1400,
    isNew: true,
    shortDescription: "T4 lumineux avec vue mer, parking et ascenseur.",
    description:
      "Appartement traversant de 120 m² au 4e étage avec ascenseur. Grande terrasse avec vue dégagée sur la mer. Résidence sécurisée et entretenue.",
    features: [
      "3 chambres",
      "2 salles de bain",
      "Salon + salle à manger",
      "Terrasse 18 m²",
      "Ascenseur",
      "Parking sous-sol",
    ],
    amenities: ["Climatisation", "Interphone", "Gardien"],
    images: [apartment1, studio1, villa2],
  },
  {
    id: "p7",
    ref: "LA-2407",
    slug: "/location/annuelle/studio-mezraya",
    title: "STUDIO MEZRAYA",
    type: "studio",
    transaction: "annual",
    zone: "Mezraya",
    rooms: 1,
    baths: 1,
    area: 38,
    pricePerMonth: 600,
    shortDescription: "Studio meublé et équipé, idéal jeune actif ou étudiant.",
    description:
      "Studio entièrement rénové, cuisine équipée, salle d'eau moderne. Quartier calme et bien desservi.",
    features: ["Pièce de vie", "Coin nuit", "Cuisine équipée", "Salle d'eau"],
    amenities: ["Wifi inclus", "Climatisation", "Meublé"],
    images: [studio1, apartment1],
  },
  // Sales
  {
    id: "p8",
    ref: "VT-2408",
    slug: "/vente/maisons/villa-aghir",
    title: "VILLA AGHIR PIEDS DANS L'EAU",
    type: "villa",
    transaction: "sale",
    zone: "Aghir",
    rooms: 5,
    baths: 4,
    area: 350,
    landArea: 1200,
    salePrice: 1850000,
    featured: true,
    shortDescription:
      "Villa d'exception en première ligne, piscine à débordement.",
    description:
      "Propriété rare en première ligne sur la plage d'Aghir. Architecture contemporaine, prestations haut de gamme, piscine à débordement face à la mer, dépendance pour personnel. Titre bleu, à voir absolument.",
    features: [
      "5 chambres dont suite parentale 60 m²",
      "4 salles de bain",
      "Triple séjour",
      "Cuisine professionnelle",
      "Piscine à débordement",
      "Pool house",
      "Dépendance gardien",
      "Titre bleu (TFB)",
    ],
    amenities: ["Domotique", "Climatisation gainable", "Alarme + vidéo"],
    images: [villaMia, heroDjerba, villa2, menzel1, apartment1],
  },
  {
    id: "p9",
    ref: "VT-2409",
    slug: "/vente/maisons/menzel-restaure",
    title: "MENZEL RESTAURÉ",
    type: "menzel",
    transaction: "sale",
    zone: "Cedouikech",
    rooms: 6,
    baths: 4,
    area: 420,
    landArea: 2200,
    salePrice: 980000,
    isNew: true,
    shortDescription:
      "Menzel authentique entièrement restauré sur 2200 m² de jardin.",
    description:
      "Magnifique menzel du XIXe restauré avec passion par un architecte. Conserve toutes ses pièces d'origine : skifa, west ed-dar, ghorfas… Jardin d'oliviers centenaires.",
    features: [
      "6 chambres",
      "4 salles d'eau",
      "Patios traditionnels",
      "Hammam d'origine restauré",
      "Puits ancien fonctionnel",
      "Oliveraie 50 arbres",
    ],
    images: [menzel1, villaMia, heroDjerba],
  },
  {
    id: "p10",
    ref: "VT-2410",
    slug: "/vente/maisons/appartement-houmt-souk-vente",
    title: "APPARTEMENT NEUF CENTRE",
    type: "apartment",
    transaction: "sale",
    zone: "Houmt Souk",
    rooms: 3,
    baths: 2,
    area: 110,
    salePrice: 320000,
    shortDescription: "T4 neuf prêt à habiter, prestations soignées.",
    description:
      "Programme neuf au centre de Houmt Souk. Appartement de 110 m² livré avec cuisine équipée, climatisation, garantie décennale.",
    features: ["3 chambres", "2 salles de bain", "Cuisine US", "Balcon 12 m²"],
    images: [apartment1, studio1],
  },
  // Land
  {
    id: "p11",
    ref: "TR-2411",
    slug: "/vente/terrains/terrain-aghir-plage",
    title: "TERRAIN PIEDS DANS L'EAU AGHIR",
    type: "land",
    transaction: "sale",
    zone: "Aghir",
    area: 1800,
    salePrice: 1200000,
    featured: true,
    constructible: true,
    zoning: "Zone touristique (UT)",
    shortDescription:
      "Parcelle constructible de 1800 m² en première ligne, titre bleu.",
    description:
      "Opportunité rare : terrain plat de 1800 m² avec façade mer de 30 mètres. Permis de construire récupérable, viabilisé, accès goudronné.",
    features: [
      "Surface : 1800 m²",
      "Façade mer : 30 m",
      "Titre foncier bleu",
      "Zone UT (touristique)",
      "Viabilisé (eau, électricité, assainissement)",
    ],
    images: [terrain1, heroDjerba],
  },
  {
    id: "p12",
    ref: "TR-2412",
    slug: "/vente/terrains/terrain-tezdaine",
    title: "TERRAIN AGRICOLE TEZDAINE",
    type: "land",
    transaction: "sale",
    zone: "Tezdaine",
    area: 5000,
    salePrice: 280000,
    constructible: false,
    zoning: "Agricole",
    shortDescription:
      "5000 m² d'oliveraie et palmeraie, idéal projet agritourisme.",
    description:
      "Terrain agricole planté de 80 oliviers centenaires et 30 palmiers dattiers. Possibilité de construire une habitation rurale après autorisation.",
    features: [
      "Surface : 5000 m²",
      "80 oliviers centenaires",
      "30 palmiers dattiers",
      "Puits artésien",
      "Accès chemin carrossable",
    ],
    images: [terrain2, terrain1],
  },
  {
    id: "p13",
    ref: "TR-2413",
    slug: "/vente/terrains/terrain-midoun",
    title: "TERRAIN URBAIN MIDOUN",
    type: "land",
    transaction: "sale",
    zone: "Midoun",
    area: 600,
    salePrice: 180000,
    constructible: true,
    zoning: "Zone urbaine (UA)",
    isNew: true,
    shortDescription:
      "Lot de 600 m² en zone urbaine, idéal villa familiale.",
    description:
      "Beau lot d'angle dans lotissement résidentiel. Toutes commodités à proximité. Permis de construire R+1 + sous-sol.",
    features: [
      "Surface : 600 m²",
      "Lot d'angle",
      "Lotissement clos",
      "Zone UA",
      "Toutes viabilités en bordure",
    ],
    images: [terrain1, terrain2],
  },
];

export function findProperty(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug);
}
