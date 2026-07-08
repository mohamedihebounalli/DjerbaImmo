import { useState } from "react";
import { Calendar, Clock, Mail, MessageCircle, Phone, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/lib/i18n";
import { openWhatsApp, propertyUrl } from "@/lib/whatsapp";
import type { Property } from "@/lib/properties";

// Fonction utilitaire pour bloquer les dates passées
const getTodayDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export function AnnualRentalPanel({ property }: { property: Property }) {
  const { t, lang } = useI18n();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");

  const fmtPrice = (n: number) =>
    new Intl.NumberFormat(lang === "ar" ? "ar-TN" : lang === "en" ? "en-US" : "fr-FR").format(n) + " TND";

  const priceLabel = property.pricePerMonth ? `${fmtPrice(property.pricePerMonth)} ${t("card.perMonth")}` : "—";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsApp({
      kind: "visit",
      property: {
        title: property.title,
        ref: property.ref,
        url: propertyUrl(property.slug),
        priceLabel: priceLabel,
      },
      customer: { name: fullName, phone, email: email || undefined },
      message: `Je souhaite planifier une visite pour cette location le ${visitDate} vers ${visitTime}.`,
      requestType: "Demande de visite (Location annuelle)",
    });
  };

  return (
    <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-5 shadow-elegant space-y-6">
      <div className="border-b border-border pb-4">
        <h3 className="font-display text-lg font-bold text-primary">Planifier une visite</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Intéressé par ce bien ? Demandez une visite à nos agents.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="a-name" className="text-xs flex items-center gap-1 font-semibold text-primary/80">
            <User className="h-3 w-3 text-muted-foreground" /> Nom Complet *
          </Label>
          <Input
            id="a-name"
            placeholder="Ex: Mohamed Ben Ali"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="h-10 text-xs invalid:touched:border-destructive"
            required
            minLength={3}
            maxLength={60}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="a-phone" className="text-xs flex items-center gap-1 font-semibold text-primary/80">
            <Phone className="h-3 w-3 text-muted-foreground" /> Téléphone *
          </Label>
          <Input
            id="a-phone"
            type="tel"
            placeholder="Ex: +216 ..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-10 text-xs invalid:touched:border-destructive"
            required
            pattern="^[+]?[0-9\s\-]{8,20}$"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="a-email" className="text-xs flex items-center gap-1 font-semibold text-primary/80">
            <Mail className="h-3 w-3 text-muted-foreground" /> Email (optionnel)
          </Label>
          <Input
            id="a-email"
            type="email"
            placeholder="client@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 text-xs invalid:touched:border-destructive"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor="a-date" className="text-xs flex items-center gap-1 font-semibold text-primary/80">
              <Calendar className="h-3 w-3 text-muted-foreground" /> Date Visite *
            </Label>
            <Input
              id="a-date"
              type="date"
              value={visitDate}
              min={getTodayDate()}
              onChange={(e) => setVisitDate(e.target.value)}
              className="h-10 text-xs invalid:touched:border-destructive"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="a-time" className="text-xs flex items-center gap-1 font-semibold text-primary/80">
              <Clock className="h-3 w-3 text-muted-foreground" /> Heure *
            </Label>
            <Input
              id="a-time"
              type="time"
              value={visitTime}
              onChange={(e) => setVisitTime(e.target.value)}
              className="h-10 text-xs invalid:touched:border-destructive"
              required
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#25D366] text-white hover:bg-[#1ebe57] font-bold h-12 shadow-card"
        size="lg"
      >
        <MessageCircle className="me-2 h-5 w-5" />
        Demander une visite via WhatsApp
      </Button>
    </form>
  );
}

export function HouseSalePanel({ property }: { property: Property }) {
  const { t, lang } = useI18n();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [message, setMessage] = useState("");

  const fmtPrice = (n: number) =>
    new Intl.NumberFormat(lang === "ar" ? "ar-TN" : lang === "en" ? "en-US" : "fr-FR").format(n) + " TND";

  const priceLabel = property.salePrice ? fmtPrice(property.salePrice) : "—";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsApp({
      kind: "visit",
      property: {
        title: property.title,
        ref: property.ref,
        url: propertyUrl(property.slug),
        priceLabel: priceLabel,
      },
      customer: { name: fullName, phone, email: email || undefined },
      message: `Je souhaite prendre rendez-vous pour visiter cette maison en vue d'un achat le ${appointmentDate}.${message.trim() ? ` Message additionnel : ${message}` : ""}`,
      requestType: "Demande de rendez-vous (Achat Maison)",
    });
  };

  return (
    <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-5 shadow-elegant space-y-6">
      <div className="border-b border-border pb-4">
        <h3 className="font-display text-lg font-bold text-primary">Prendre Rendez-vous</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Planifier une visite sur place avec notre conseiller immobilier.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="m-name" className="text-xs flex items-center gap-1 font-semibold text-primary/80">
            <User className="h-3 w-3 text-muted-foreground" /> Nom Complet *
          </Label>
          <Input
            id="m-name"
            placeholder="Ex: Yassine Ben Amor"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="h-10 text-xs invalid:touched:border-destructive"
            required
            minLength={3}
            maxLength={60}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="m-phone" className="text-xs flex items-center gap-1 font-semibold text-primary/80">
            <Phone className="h-3 w-3 text-muted-foreground" /> Téléphone *
          </Label>
          <Input
            id="m-phone"
            type="tel"
            placeholder="Ex: +216 ..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-10 text-xs invalid:touched:border-destructive"
            required
            pattern="^[+]?[0-9\s\-]{8,20}$"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="m-email" className="text-xs flex items-center gap-1 font-semibold text-primary/80">
            <Mail className="h-3 w-3 text-muted-foreground" /> Email (optionnel)
          </Label>
          <Input
            id="m-email"
            type="email"
            placeholder="client@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 text-xs invalid:touched:border-destructive"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="m-date" className="text-xs flex items-center gap-1 font-semibold text-primary/80">
            <Calendar className="h-3 w-3 text-muted-foreground" /> Date souhaitée *
          </Label>
          <Input
            id="m-date"
            type="date"
            value={appointmentDate}
            min={getTodayDate()}
            onChange={(e) => setAppointmentDate(e.target.value)}
            className="h-10 text-xs invalid:touched:border-destructive"
            required
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="m-msg" className="text-xs flex items-center gap-1 font-semibold text-primary/80">
            <MessageSquare className="h-3 w-3 text-muted-foreground" /> Message (optionnel)
          </Label>
          <Textarea
            id="m-msg"
            placeholder="Message additionnel..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="text-xs min-h-[80px]"
            maxLength={500}
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#25D366] text-white hover:bg-[#1ebe57] font-bold h-12 shadow-card"
        size="lg"
      >
        <MessageCircle className="me-2 h-5 w-5" />
        Prendre Rendez-vous via WhatsApp
      </Button>
    </form>
  );
}

export function LandSalePanel({ property }: { property: Property }) {
  const { t, lang } = useI18n();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [prefDate, setPrefDate] = useState("");
  const [prefTime, setPrefTime] = useState("");

  const fmtPrice = (n: number) =>
    new Intl.NumberFormat(lang === "ar" ? "ar-TN" : lang === "en" ? "en-US" : "fr-FR").format(n) + " TND";

  const priceLabel = property.salePrice ? fmtPrice(property.salePrice) : "—";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsApp({
      kind: "visit",
      property: {
        title: property.title,
        ref: property.ref,
        url: propertyUrl(property.slug),
        priceLabel: priceLabel,
      },
      customer: { name: fullName, phone, email: email || undefined },
      message: `Je souhaite demander un rendez-vous pour visiter ce terrain en vue d'un achat le ${prefDate} vers ${prefTime}.`,
      requestType: "Demande de rendez-vous (Achat Terrain)",
    });
  };

  return (
    <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-5 shadow-elegant space-y-6">
      <div className="border-b border-border pb-4">
        <h3 className="font-display text-lg font-bold text-primary">Prendre Rendez-vous</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Planifier une visite terrain avec nos experts.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="t-name" className="text-xs flex items-center gap-1 font-semibold text-primary/80">
            <User className="h-3 w-3 text-muted-foreground" /> Nom Complet *
          </Label>
          <Input
            id="t-name"
            placeholder="Ex: Yassine Ben Amor"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="h-10 text-xs invalid:touched:border-destructive"
            required
            minLength={3}
            maxLength={60}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="t-phone" className="text-xs flex items-center gap-1 font-semibold text-primary/80">
            <Phone className="h-3 w-3 text-muted-foreground" /> Téléphone *
          </Label>
          <Input
            id="t-phone"
            type="tel"
            placeholder="Ex: +216 ..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-10 text-xs invalid:touched:border-destructive"
            required
            pattern="^[+]?[0-9\s\-]{8,20}$"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="t-email" className="text-xs flex items-center gap-1 font-semibold text-primary/80">
            <Mail className="h-3 w-3 text-muted-foreground" /> Email (optionnel)
          </Label>
          <Input
            id="t-email"
            type="email"
            placeholder="client@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 text-xs invalid:touched:border-destructive"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor="t-date" className="text-xs flex items-center gap-1 font-semibold text-primary/80">
              <Calendar className="h-3 w-3 text-muted-foreground" /> Date Souhaitée *
            </Label>
            <Input
              id="t-date"
              type="date"
              value={prefDate}
              min={getTodayDate()}
              onChange={(e) => setPrefDate(e.target.value)}
              className="h-10 text-xs invalid:touched:border-destructive"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="t-time" className="text-xs flex items-center gap-1 font-semibold text-primary/80">
              <Clock className="h-3 w-3 text-muted-foreground" /> Heure *
            </Label>
            <Input
              id="t-time"
              type="time"
              value={prefTime}
              onChange={(e) => setPrefTime(e.target.value)}
              className="h-10 text-xs invalid:touched:border-destructive"
              required
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#25D366] text-white hover:bg-[#1ebe57] font-bold h-12 shadow-card"
        size="lg"
      >
        <MessageCircle className="me-2 h-5 w-5" />
        Demander un Rendez-vous via WhatsApp
      </Button>
    </form>
  );
}