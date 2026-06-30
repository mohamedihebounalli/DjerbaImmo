import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { openWhatsApp, propertyUrl, type InquiryPayload } from "@/lib/whatsapp";
import type { Property } from "@/lib/properties";

export function InquiryDialog({
  property,
  kind,
  trigger,
  defaultRequestType,
}: {
  property: Property;
  kind: "info" | "visit";
  trigger?: React.ReactNode;
  defaultRequestType?: string;
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [message, setMessage] = useState("");
  const [requestedDate, setRequestedDate] = useState("");

  const submit = () => {
    const priceLabel = property.salePrice
      ? `${property.salePrice.toLocaleString("fr-FR")} TND`
      : property.pricePerMonth
        ? `${property.pricePerMonth.toLocaleString("fr-FR")} TND / mois`
        : property.pricePerNight
          ? `${property.pricePerNight.toLocaleString("fr-FR")} TND / nuit`
          : undefined;

    const payload: InquiryPayload = {
      kind,
      property: {
        title: property.title,
        ref: property.ref,
        url: propertyUrl(property.slug),
        priceLabel,
      },
      customer: {
        name,
        phone,
        email,
        adults,
        children,
      },
      requestType:
        defaultRequestType ??
        (kind === "visit" ? "Demande de rendez-vous / visite" : "Demande d'informations"),
      message: [requestedDate ? `Date souhaitée : ${requestedDate}` : "", message]
        .filter(Boolean)
        .join("\n"),
    };
    openWhatsApp(payload);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className="bg-gold text-gold-foreground hover:bg-gold/90">
            <MessageCircle className="me-2 h-4 w-4" />
            {kind === "visit" ? t("detail.visitCta") : t("detail.infoCta")}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-primary">{t("inquiry.title")}</DialogTitle>
          <DialogDescription>{t("inquiry.note")}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="iq-name">{t("inquiry.name")}</Label>
            <Input id="iq-name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="iq-phone">{t("inquiry.phone")}</Label>
              <Input id="iq-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="iq-email">{t("inquiry.email")}</Label>
              <Input id="iq-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          {kind === "visit" && (
            <div className="grid gap-1.5">
              <Label htmlFor="iq-date">Date souhaitée</Label>
              <Input id="iq-date" type="date" value={requestedDate} onChange={(e) => setRequestedDate(e.target.value)} />
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="iq-ad">{t("inquiry.adults")}</Label>
              <Input id="iq-ad" type="number" min={0} value={adults} onChange={(e) => setAdults(Number(e.target.value))} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="iq-ch">{t("inquiry.children")}</Label>
              <Input id="iq-ch" type="number" min={0} value={children} onChange={(e) => setChildren(Number(e.target.value))} />
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="iq-msg">{t("inquiry.message")}</Label>
            <Textarea id="iq-msg" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={submit}
            disabled={!name || !phone}
            className="bg-[#25D366] text-white hover:bg-[#1ebe57]"
          >
            <MessageCircle className="me-2 h-4 w-4" />
            {t("inquiry.send")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
