import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays, differenceInCalendarDays, format } from "date-fns";
import { Calendar as CalendarIcon, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";
import { openWhatsApp, propertyUrl } from "@/lib/whatsapp";
import type { Property } from "@/lib/properties";
import { Calendar } from "@/components/ui/calendar";

export function SeasonalBookingPanel({ property }: { property: Property }) {
  const { t, lang } = useI18n();
  const [range, setRange] = useState<DateRange | undefined>();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const blockedSet = useMemo(
    () => new Set(property.blockedDates ?? []),
    [property.blockedDates],
  );

  const disabled = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return [
      { before: today },
      (date: Date) => blockedSet.has(date.toISOString().slice(0, 10)),
    ];
  }, [blockedSet]);

  const nights =
    range?.from && range?.to ? Math.max(0, differenceInCalendarDays(range.to, range.from)) : 0;

  const total = nights * (property.pricePerNight ?? 0);

  const fmtPrice = (n: number) =>
    new Intl.NumberFormat(lang === "ar" ? "ar-TN" : lang === "en" ? "en-US" : "fr-FR").format(n) + " TND";

  // ensure no blocked date sits inside range
  const rangeHasBlocked = useMemo(() => {
    if (!range?.from || !range?.to) return false;
    let d = range.from;
    while (d <= range.to) {
      if (blockedSet.has(d.toISOString().slice(0, 10))) return true;
      d = addDays(d, 1);
    }
    return false;
  }, [range, blockedSet]);

  const canSubmit = nights > 0 && !rangeHasBlocked && name && phone;

  const submit = () => {
    if (!canSubmit || !range?.from || !range?.to) return;
    openWhatsApp({
      kind: "booking",
      property: {
        title: property.title,
        ref: property.ref,
        url: propertyUrl(property.slug),
        priceLabel: `${fmtPrice(property.pricePerNight ?? 0)} / nuit`,
      },
      customer: { name, phone, email, adults, children },
      dates: {
        checkIn: format(range.from, "dd/MM/yyyy"),
        checkOut: format(range.to, "dd/MM/yyyy"),
        nights,
      },
      totalPrice: fmtPrice(total),
      requestType: "Demande de réservation séjour",
    });
  };

  return (
    <aside className="rounded-2xl border border-border bg-card p-5 shadow-elegant md:p-6">
      <div className="flex items-baseline justify-between gap-3 border-b border-border pb-4">
        <div>
          <div className="text-2xl font-bold text-primary">
            {fmtPrice(property.pricePerNight ?? 0)}
          </div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            {t("card.perNight")}
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-turquoise/15 px-2.5 py-1 text-[11px] font-semibold text-turquoise">
          <CalendarIcon className="h-3 w-3" />
          {t("detail.availability")}
        </span>
      </div>

      <div className="mt-4">
        <p className="mb-2 text-sm font-semibold text-primary">{t("detail.selectDates")}</p>
        <div className="overflow-x-auto rounded-lg border border-border bg-background p-2 pointer-events-auto">
          <Calendar
            mode="range"
            selected={range}
            onSelect={setRange}
            disabled={disabled}
            numberOfMonths={1}
            weekStartsOn={1}
            className="pointer-events-auto"
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Les dates grisées sont déjà réservées ou bloquées.
        </p>
      </div>

      {nights > 0 && (
        <div className="mt-4 space-y-1.5 rounded-lg bg-secondary p-3 text-sm">
          <Row label={t("detail.checkin")} value={range?.from ? format(range.from, "dd/MM/yyyy") : "—"} />
          <Row label={t("detail.checkout")} value={range?.to ? format(range.to, "dd/MM/yyyy") : "—"} />
          <Row label={t("detail.nights")} value={String(nights)} />
          <div className="mt-2 flex items-baseline justify-between border-t border-border pt-2">
            <span className="text-sm font-semibold text-primary">{t("detail.total")}</span>
            <span className="font-display text-xl font-bold text-gold">{fmtPrice(total)}</span>
          </div>
        </div>
      )}

      <div className="mt-4 grid gap-3">
        <div className="grid gap-1.5">
          <Label htmlFor="bk-name">{t("inquiry.name")}</Label>
          <Input id="bk-name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="bk-phone">{t("inquiry.phone")}</Label>
            <Input id="bk-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="bk-email">{t("inquiry.email")}</Label>
            <Input id="bk-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="bk-ad">{t("detail.adults")}</Label>
            <Input id="bk-ad" type="number" min={1} value={adults} onChange={(e) => setAdults(Number(e.target.value))} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="bk-ch">{t("detail.children")}</Label>
            <Input id="bk-ch" type="number" min={0} value={children} onChange={(e) => setChildren(Number(e.target.value))} />
          </div>
        </div>
      </div>

      <Button
        onClick={submit}
        disabled={!canSubmit}
        className="mt-5 w-full bg-[#25D366] text-white hover:bg-[#1ebe57]"
        size="lg"
      >
        <MessageCircle className="me-2 h-4 w-4" />
        {t("detail.bookCta")}
      </Button>
      <p className="mt-2 text-center text-[11px] text-muted-foreground">
        {t("inquiry.note")}
      </p>
    </aside>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <span>{label}</span>
      <span className="font-medium text-primary">{value}</span>
    </div>
  );
}
