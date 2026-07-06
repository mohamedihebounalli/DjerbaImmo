import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/lib/i18n";
import { openWhatsApp, WHATSAPP_DISPLAY } from "@/lib/whatsapp";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const { t } = useI18n();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("sale");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsApp({
      kind: "contact",
      customer: { firstName, lastName, phone, email },
      requestType:
        type === "sale" ? "Vente / Achat" : type === "rent" ? "Location" : "Autre",
      message,
    });
  };

  return (
    <>
      <section className="bg-gradient-sea py-16 text-primary-foreground md:py-20">
        <div className="container mx-auto px-4 text-center md:px-6">
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            {t("contact.title")}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/85">
            {t("contact.sub")}
          </p>
        </div>
      </section>

      <section className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-3 md:px-6">
        {/* Form */}
        <form
          onSubmit={submit}
          className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-elegant md:col-span-2 md:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t("contact.firstname")}>
              <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </Field>
            <Field label={t("contact.lastname")}>
              <Input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t("inquiry.phone")}>
              <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </Field>
            <Field label={t("inquiry.email")}>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Field>
          </div>
          <Field label={t("contact.type")}>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="sale">{t("contact.type.sale")}</SelectItem>
                <SelectItem value="rent">{t("contact.type.rent")}</SelectItem>
                <SelectItem value="other">{t("contact.type.other")}</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label={t("inquiry.message")}>
            <Textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
          </Field>
          <Button
            type="submit"
            size="lg"
            className="w-full bg-[#25D366] text-white hover:bg-[#1ebe57]"
          >
            <MessageCircle className="me-2 h-4 w-4" />
            {t("contact.send")}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            {t("inquiry.note")}
          </p>
        </form>

        {/* Info */}
        <aside className="space-y-5">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="font-display text-lg font-bold text-primary">{t("contact.info")}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <InfoRow icon={<Phone className="h-4 w-4" />} label={t("contact.phone")}>
                <a href={`https://wa.me/21628171103`} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-gold">
                  {WHATSAPP_DISPLAY}
                </a>
              </InfoRow>
              <InfoRow icon={<Mail className="h-4 w-4" />} label={t("contact.email")}>
                contact@immo-djerba.com
              </InfoRow>
              <InfoRow icon={<MapPin className="h-4 w-4" />} label={t("contact.address")}>
                Houmt Souk, Djerba, Tunisie
              </InfoRow>
            </ul>
            <div className="mt-5 border-t border-border pt-4">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {t("contact.follow")}
              </div>
              <div className="mt-2 flex gap-2">
                <Social href="https://facebook.com" label="Facebook"><Facebook className="h-4 w-4" /></Social>
                <Social href="https://instagram.com" label="Instagram"><Instagram className="h-4 w-4" /></Social>
                <Social href="https://tiktok.com" label="TikTok">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M21 8.5a7.5 7.5 0 0 1-5-1.9V15a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3V2h3a4.5 4.5 0 0 0 5 4.5V8.5z" /></svg>
                </Social>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border shadow-card">
            <iframe
              title="Carte Djerba"
              src="https://www.google.com/maps?q=Houmt+Souk,+Djerba,+Tunisie&output=embed"
              width="100%"
              height="260"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
            />
          </div>
        </aside>
      </section>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label className="text-xs font-semibold uppercase tracking-wider text-primary/80">{label}</Label>
      {children}
    </div>
  );
}

function InfoRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md bg-gold/15 text-gold">
        {icon}
      </span>
      <div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="text-sm font-medium text-primary">{children}</div>
      </div>
    </li>
  );
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-border text-primary transition-colors hover:border-gold hover:bg-gold hover:text-gold-foreground"
    >
      {children}
    </a>
  );
}
