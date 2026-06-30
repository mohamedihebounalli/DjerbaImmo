export const WHATSAPP_NUMBER = "21628171103"; // +216 28 171 103
export const WHATSAPP_DISPLAY = "+216 28 171 103";

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function propertyUrl(slug: string): string {
  if (typeof window !== "undefined") {
    return `${window.location.origin}${slug}`;
  }
  return `https://immo-djerba.com${slug}`;
}

export type InquiryPayload = {
  kind: "info" | "visit" | "booking" | "contact";
  property?: {
    title: string;
    ref: string;
    url: string;
    priceLabel?: string;
  };
  customer: {
    name?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    adults?: number;
    children?: number;
  };
  dates?: { checkIn?: string; checkOut?: string; nights?: number };
  totalPrice?: string;
  requestType?: string;
  message?: string;
};

export function buildInquiryMessage(p: InquiryPayload): string {
  const lines: string[] = [];
  lines.push("🏠 *Immo Djerba — Nouvelle demande*", "");

  const kindLabel =
    p.kind === "booking"
      ? "Demande de réservation"
      : p.kind === "visit"
        ? "Demande de rendez-vous / visite"
        : p.kind === "contact"
          ? "Formulaire de contact"
          : "Demande d'informations";
  lines.push(`*Type :* ${kindLabel}`);
  if (p.requestType) lines.push(`*Sujet :* ${p.requestType}`);
  lines.push("");

  if (p.property) {
    lines.push("*— Bien concerné —*");
    lines.push(`Nom : ${p.property.title}`);
    lines.push(`Réf. : ${p.property.ref}`);
    if (p.property.priceLabel) lines.push(`Prix : ${p.property.priceLabel}`);
    lines.push(`Lien : ${p.property.url}`);
    lines.push("");
  }

  if (p.dates && (p.dates.checkIn || p.dates.checkOut)) {
    lines.push("*— Dates —*");
    if (p.dates.checkIn) lines.push(`Arrivée : ${p.dates.checkIn}`);
    if (p.dates.checkOut) lines.push(`Départ : ${p.dates.checkOut}`);
    if (p.dates.nights) lines.push(`Durée : ${p.dates.nights} nuit(s)`);
    if (p.totalPrice) lines.push(`Total estimé : ${p.totalPrice}`);
    lines.push("");
  }

  lines.push("*— Client —*");
  if (p.customer.firstName || p.customer.lastName) {
    lines.push(`Nom : ${[p.customer.firstName, p.customer.lastName].filter(Boolean).join(" ")}`);
  } else if (p.customer.name) {
    lines.push(`Nom : ${p.customer.name}`);
  }
  if (p.customer.phone) lines.push(`Téléphone : ${p.customer.phone}`);
  if (p.customer.email) lines.push(`Email : ${p.customer.email}`);
  if (typeof p.customer.adults === "number") lines.push(`Adultes : ${p.customer.adults}`);
  if (typeof p.customer.children === "number") lines.push(`Enfants : ${p.customer.children}`);

  if (p.message) {
    lines.push("", "*— Message —*", p.message);
  }

  return lines.join("\n");
}

export function openWhatsApp(payload: InquiryPayload) {
  const msg = buildInquiryMessage(payload);
  if (typeof window !== "undefined") {
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
  }
}
