import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "fr" | "ar" | "en";

type Dict = Record<string, string>;

const fr: Dict = {
  "nav.home": "Accueil",
  "nav.sale": "Vente",
  "nav.sale.houses": "Maisons",
  "nav.sale.land": "Terrains",
  "nav.rent": "Location",
  "nav.rent.seasonal": "Saisonnière",
  "nav.rent.annual": "Annuelle",
  "nav.about": "À propos",
  "nav.contact": "Contact",

  "hero.title": "Découvrez votre havre de paix à Djerba",
  "hero.subtitle":
    "Vente, achat et location de villas, menzels, appartements et terrains sur toute l'île.",
  "hero.cta": "Explorer les biens",

  "search.title": "Trouvez votre bien",
  "search.type": "Type de bien",
  "search.transaction": "Transaction",
  "search.location": "Zone",
  "search.rooms": "Chambres",
  "search.priceMin": "Prix min.",
  "search.priceMax": "Prix max.",
  "search.submit": "Rechercher",
  "search.reset": "Réinitialiser",
  "search.all": "Tous",
  "search.anyRooms": "Indifférent",

  "type.villa": "Villa",
  "type.apartment": "Appartement",
  "type.menzel": "Menzel",
  "type.studio": "Studio",
  "type.land": "Terrain",
  "tx.annual": "Location annuelle",
  "tx.seasonal": "Location saisonnière",
  "tx.sale": "Vente",

  "card.ref": "Réf.",
  "card.rooms": "ch.",
  "card.baths": "sdb.",
  "card.area": "m²",
  "card.perMonth": "/ mois",
  "card.perNight": "/ nuit",
  "card.new": "Nouveau",
  "card.view": "Voir le bien",
  "card.contactForPrice": "Nous contacter pour le prix",

  "home.categories.title": "Nos services",
  "home.categories.sale": "Achat de maisons",
  "home.categories.seasonal": "Location saisonnière",
  "home.categories.annual": "Location annuelle",
  "home.categories.land": "Terrains à vendre",
  "home.featured": "Sélection du moment",
  "home.featured.sub": "Nos biens coups de cœur sur l'île de Djerba",
  "home.about.title": "L'agence Immo Djerba",
  "home.about.body":
    "Spécialistes de l'immobilier à Djerba, nous vous accompagnons dans la vente, l'achat et la location de biens d'exception. De la villa pieds dans l'eau au menzel traditionnel restauré, nous sélectionnons pour vous des propriétés qui racontent l'âme de l'île.",
  "home.about.cta": "En savoir plus",

  "list.sale.title": "Maisons à vendre",
  "list.sale.sub": "Villas, menzels et appartements à acheter à Djerba",
  "list.land.title": "Terrains à vendre",
  "list.land.sub": "Parcelles constructibles, agricoles et pieds dans l'eau",
  "list.annual.title": "Locations annuelles",
  "list.annual.sub": "Biens à louer à l'année à Djerba",
  "list.seasonal.title": "Locations saisonnières",
  "list.seasonal.sub": "Villas et appartements à louer pour vos vacances",
  "list.empty": "Aucun bien ne correspond à vos critères.",
  "list.results": "biens trouvés",

  "detail.description": "Description",
  "detail.features": "Caractéristiques",
  "detail.amenities": "Équipements",
  "detail.location": "Localisation",
  "detail.gallery": "Galerie",
  "detail.availability": "Disponibilités",
  "detail.checkin": "Arrivée",
  "detail.checkout": "Départ",
  "detail.guests": "Voyageurs",
  "detail.adults": "Adultes",
  "detail.children": "Enfants",
  "detail.nights": "nuits",
  "detail.total": "Total",
  "detail.bookCta": "Réserver via WhatsApp",
  "detail.infoCta": "Demander des informations",
  "detail.visitCta": "Demander un rendez-vous",
  "detail.shareWa": "Contacter sur WhatsApp",
  "detail.selectDates": "Sélectionnez vos dates",

  "inquiry.title": "Votre demande",
  "inquiry.name": "Nom complet",
  "inquiry.phone": "Téléphone",
  "inquiry.email": "Email (optionnel)",
  "inquiry.adults": "Adultes",
  "inquiry.children": "Enfants",
  "inquiry.message": "Message (optionnel)",
  "inquiry.send": "Envoyer via WhatsApp",
  "inquiry.note": "Votre demande sera transmise directement sur WhatsApp.",

  "contact.title": "Contactez-nous",
  "contact.sub": "Une question, un projet ? Écrivez-nous, nous répondons sous 24h.",
  "contact.firstname": "Prénom",
  "contact.lastname": "Nom",
  "contact.type": "Type de demande",
  "contact.type.sale": "Vente",
  "contact.type.rent": "Location",
  "contact.type.other": "Autre",
  "contact.send": "Envoyer via WhatsApp",
  "contact.info": "Nos coordonnées",
  "contact.phone": "Téléphone / WhatsApp",
  "contact.email": "Email",
  "contact.address": "Adresse",
  "contact.follow": "Suivez-nous",

  "footer.tag": "Vente · Achat · Location",
  "footer.rights": "Tous droits réservés.",
  "footer.nav": "Navigation",
  "footer.contact": "Contact",

  "about.title": "À propos d'Immo Djerba",
  "about.lead":
    "Une agence à taille humaine, passionnée par Djerba et son patrimoine architectural.",
  "about.mission": "Notre mission",
  "about.missionBody":
    "Faciliter la vente, l'achat et la location de biens immobiliers à Djerba avec transparence, expertise locale et un accompagnement humain de A à Z.",
  "about.values": "Nos engagements",
  "about.v1.t": "Expertise locale",
  "about.v1.b": "Une connaissance approfondie de chaque zone de l'île : Midoun, Houmt Souk, Aghir, Tezdaine, Sidi Mahrez…",
  "about.v2.t": "Transparence",
  "about.v2.b": "Des prix justes, des descriptifs précis et un suivi clair à chaque étape.",
  "about.v3.t": "Disponibilité",
  "about.v3.b": "Une équipe joignable 7j/7 sur WhatsApp pour répondre à toutes vos demandes.",
};

const en: Dict = {
  "nav.home": "Home",
  "nav.sale": "Buy",
  "nav.sale.houses": "Houses",
  "nav.sale.land": "Land",
  "nav.rent": "Rent",
  "nav.rent.seasonal": "Seasonal",
  "nav.rent.annual": "Annual",
  "nav.about": "About",
  "nav.contact": "Contact",

  "hero.title": "Find your haven on Djerba island",
  "hero.subtitle":
    "Buy, sell and rent villas, menzels, apartments and land across the island.",
  "hero.cta": "Browse properties",

  "search.title": "Find your property",
  "search.type": "Property type",
  "search.transaction": "Transaction",
  "search.location": "Area",
  "search.rooms": "Bedrooms",
  "search.priceMin": "Min price",
  "search.priceMax": "Max price",
  "search.submit": "Search",
  "search.reset": "Reset",
  "search.all": "All",
  "search.anyRooms": "Any",

  "type.villa": "Villa",
  "type.apartment": "Apartment",
  "type.menzel": "Menzel",
  "type.studio": "Studio",
  "type.land": "Land",
  "tx.annual": "Annual rental",
  "tx.seasonal": "Seasonal rental",
  "tx.sale": "For sale",

  "card.ref": "Ref.",
  "card.rooms": "bd",
  "card.baths": "ba",
  "card.area": "sqm",
  "card.perMonth": "/ month",
  "card.perNight": "/ night",
  "card.new": "New",
  "card.view": "View property",
  "card.contactForPrice": "Contact us for price",

  "home.categories.title": "Our services",
  "home.categories.sale": "Buy a home",
  "home.categories.seasonal": "Seasonal rental",
  "home.categories.annual": "Annual rental",
  "home.categories.land": "Land for sale",
  "home.featured": "Featured listings",
  "home.featured.sub": "Hand-picked properties on Djerba island",
  "home.about.title": "About Immo Djerba",
  "home.about.body":
    "Djerba real-estate specialists. From beachfront villas to restored traditional menzels, we curate properties that capture the soul of the island.",
  "home.about.cta": "Learn more",

  "list.sale.title": "Houses for sale",
  "list.sale.sub": "Villas, menzels and apartments to buy on Djerba",
  "list.land.title": "Land for sale",
  "list.land.sub": "Buildable, agricultural and beachfront plots",
  "list.annual.title": "Annual rentals",
  "list.annual.sub": "Long-term rentals on Djerba",
  "list.seasonal.title": "Seasonal rentals",
  "list.seasonal.sub": "Villas and apartments for your holidays",
  "list.empty": "No properties match your filters.",
  "list.results": "results",

  "detail.description": "Description",
  "detail.features": "Features",
  "detail.amenities": "Amenities",
  "detail.location": "Location",
  "detail.gallery": "Gallery",
  "detail.availability": "Availability",
  "detail.checkin": "Check-in",
  "detail.checkout": "Check-out",
  "detail.guests": "Guests",
  "detail.adults": "Adults",
  "detail.children": "Children",
  "detail.nights": "nights",
  "detail.total": "Total",
  "detail.bookCta": "Book on WhatsApp",
  "detail.infoCta": "Request information",
  "detail.visitCta": "Request a visit",
  "detail.shareWa": "Contact on WhatsApp",
  "detail.selectDates": "Select your dates",

  "inquiry.title": "Your request",
  "inquiry.name": "Full name",
  "inquiry.phone": "Phone",
  "inquiry.email": "Email (optional)",
  "inquiry.adults": "Adults",
  "inquiry.children": "Children",
  "inquiry.message": "Message (optional)",
  "inquiry.send": "Send via WhatsApp",
  "inquiry.note": "Your request is sent directly to our WhatsApp.",

  "contact.title": "Get in touch",
  "contact.sub": "A question or a project? We reply within 24 hours.",
  "contact.firstname": "First name",
  "contact.lastname": "Last name",
  "contact.type": "Request type",
  "contact.type.sale": "Buy / Sell",
  "contact.type.rent": "Rental",
  "contact.type.other": "Other",
  "contact.send": "Send via WhatsApp",
  "contact.info": "Contact info",
  "contact.phone": "Phone / WhatsApp",
  "contact.email": "Email",
  "contact.address": "Address",
  "contact.follow": "Follow us",

  "footer.tag": "Sale · Purchase · Rental",
  "footer.rights": "All rights reserved.",
  "footer.nav": "Navigation",
  "footer.contact": "Contact",

  "about.title": "About Immo Djerba",
  "about.lead":
    "A boutique agency passionate about Djerba and its architectural heritage.",
  "about.mission": "Our mission",
  "about.missionBody":
    "Make buying, selling and renting on Djerba simple, transparent and human — with deep local expertise from start to finish.",
  "about.values": "Our commitments",
  "about.v1.t": "Local expertise",
  "about.v1.b": "Deep knowledge of every area: Midoun, Houmt Souk, Aghir, Tezdaine, Sidi Mahrez…",
  "about.v2.t": "Transparency",
  "about.v2.b": "Fair pricing, accurate descriptions and clear follow-up at every step.",
  "about.v3.t": "Availability",
  "about.v3.b": "Reachable 7 days a week on WhatsApp for any request.",
};

const ar: Dict = {
  "nav.home": "الرئيسية",
  "nav.sale": "بيع",
  "nav.sale.houses": "منازل",
  "nav.sale.land": "أراضي",
  "nav.rent": "كراء",
  "nav.rent.seasonal": "موسمي",
  "nav.rent.annual": "سنوي",
  "nav.about": "من نحن",
  "nav.contact": "اتصل بنا",

  "hero.title": "اكتشف ملاذك في جزيرة جربة",
  "hero.subtitle": "بيع، شراء وكراء فيلات ومنازل وشقق وأراضي في كامل الجزيرة.",
  "hero.cta": "تصفح العقارات",

  "search.title": "ابحث عن عقارك",
  "search.type": "نوع العقار",
  "search.transaction": "المعاملة",
  "search.location": "المنطقة",
  "search.rooms": "الغرف",
  "search.priceMin": "أدنى سعر",
  "search.priceMax": "أعلى سعر",
  "search.submit": "بحث",
  "search.reset": "إعادة",
  "search.all": "الكل",
  "search.anyRooms": "أي عدد",

  "type.villa": "فيلا",
  "type.apartment": "شقة",
  "type.menzel": "منزل",
  "type.studio": "ستوديو",
  "type.land": "أرض",
  "tx.annual": "كراء سنوي",
  "tx.seasonal": "كراء موسمي",
  "tx.sale": "للبيع",

  "card.ref": "مرجع",
  "card.rooms": "غرف",
  "card.baths": "حمام",
  "card.area": "م²",
  "card.perMonth": "/ شهر",
  "card.perNight": "/ ليلة",
  "card.new": "جديد",
  "card.view": "عرض العقار",
  "card.contactForPrice": "اتصل بنا لمعرفة السعر",

  "home.categories.title": "خدماتنا",
  "home.categories.sale": "شراء منزل",
  "home.categories.seasonal": "كراء موسمي",
  "home.categories.annual": "كراء سنوي",
  "home.categories.land": "أراضي للبيع",
  "home.featured": "عقارات مختارة",
  "home.featured.sub": "اختيارات مميزة من جزيرة جربة",
  "home.about.title": "وكالة إيمو جربة",
  "home.about.body":
    "نحن خبراء في عقارات جربة. من الفيلا المطلة على البحر إلى المنزل التقليدي المرمم، نختار لكم عقارات تعكس روح الجزيرة.",
  "home.about.cta": "اعرف المزيد",

  "list.sale.title": "منازل للبيع",
  "list.sale.sub": "فيلات ومنازل وشقق للبيع في جربة",
  "list.land.title": "أراضي للبيع",
  "list.land.sub": "قطع للبناء أو الفلاحة أو على البحر",
  "list.annual.title": "كراء سنوي",
  "list.annual.sub": "عقارات للكراء السنوي في جربة",
  "list.seasonal.title": "كراء موسمي",
  "list.seasonal.sub": "فيلات وشقق لقضاء العطلة",
  "list.empty": "لا توجد عقارات مطابقة.",
  "list.results": "نتائج",

  "detail.description": "الوصف",
  "detail.features": "المواصفات",
  "detail.amenities": "التجهيزات",
  "detail.location": "الموقع",
  "detail.gallery": "معرض الصور",
  "detail.availability": "التواريخ المتاحة",
  "detail.checkin": "الدخول",
  "detail.checkout": "الخروج",
  "detail.guests": "المسافرون",
  "detail.adults": "كبار",
  "detail.children": "أطفال",
  "detail.nights": "ليالي",
  "detail.total": "المجموع",
  "detail.bookCta": "احجز عبر واتساب",
  "detail.infoCta": "طلب معلومات",
  "detail.visitCta": "طلب موعد",
  "detail.shareWa": "تواصل عبر واتساب",
  "detail.selectDates": "اختر التواريخ",

  "inquiry.title": "طلبك",
  "inquiry.name": "الاسم الكامل",
  "inquiry.phone": "الهاتف",
  "inquiry.email": "البريد (اختياري)",
  "inquiry.adults": "كبار",
  "inquiry.children": "أطفال",
  "inquiry.message": "الرسالة (اختياري)",
  "inquiry.send": "أرسل عبر واتساب",
  "inquiry.note": "سيُرسل طلبك مباشرة عبر واتساب.",

  "contact.title": "اتصل بنا",
  "contact.sub": "لديك سؤال أو مشروع؟ نرد خلال 24 ساعة.",
  "contact.firstname": "الاسم",
  "contact.lastname": "اللقب",
  "contact.type": "نوع الطلب",
  "contact.type.sale": "بيع / شراء",
  "contact.type.rent": "كراء",
  "contact.type.other": "آخر",
  "contact.send": "أرسل عبر واتساب",
  "contact.info": "بيانات الاتصال",
  "contact.phone": "هاتف / واتساب",
  "contact.email": "البريد الإلكتروني",
  "contact.address": "العنوان",
  "contact.follow": "تابعنا",

  "footer.tag": "بيع · شراء · كراء",
  "footer.rights": "جميع الحقوق محفوظة.",
  "footer.nav": "روابط",
  "footer.contact": "اتصال",

  "about.title": "حول إيمو جربة",
  "about.lead": "وكالة عائلية شغوفة بجزيرة جربة وتراثها المعماري.",
  "about.mission": "مهمتنا",
  "about.missionBody":
    "نسهّل عمليات البيع والشراء والكراء في جربة بشفافية وخبرة محلية ومرافقة إنسانية.",
  "about.values": "التزاماتنا",
  "about.v1.t": "خبرة محلية",
  "about.v1.b": "معرفة عميقة بكل مناطق الجزيرة: ميدون، حومة السوق، عاغير، تزداين…",
  "about.v2.t": "شفافية",
  "about.v2.b": "أسعار عادلة ووصف دقيق ومتابعة واضحة.",
  "about.v3.t": "متوفرون",
  "about.v3.b": "فريق متاح 7 أيام / 7 على واتساب لأي طلب.",
};

const dicts: Record<Lang, Dict> = { fr, en, ar };

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
};

const I18nContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "immo-djerba-lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY)) as Lang | null;
    if (saved && (saved === "fr" || saved === "en" || saved === "ar")) {
      setLangState(saved);
    }
  }, []);

  const dir: "ltr" | "rtl" = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  }, []);

  const t = useCallback(
    (key: string) => dicts[lang][key] ?? dicts.fr[key] ?? key,
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t, dir }), [lang, setLang, t, dir]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
