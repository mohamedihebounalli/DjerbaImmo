import { Link } from "@tanstack/react-router";
import { BedDouble, Bath, Maximize, MapPin, CheckCircle2, ChevronRight, MessageCircle } from "lucide-react";

import type { Property } from "@/lib/properties";
import { useI18n } from "@/lib/i18n";
import { ImageGallery } from "@/components/ImageGallery";
import { InquiryDialog } from "@/components/InquiryDialog";
import { SeasonalBookingPanel } from "@/components/SeasonalBookingPanel";
import { Button } from "@/components/ui/button";
import { openWhatsApp, propertyUrl, WHATSAPP_DISPLAY } from "@/lib/whatsapp";

export function PropertyDetail({ property }: { property: Property }) {
  const { t, lang } = useI18n();

  const priceLabel = (() => {
    const fmt = (n: number) =>
      new Intl.NumberFormat(lang === "ar" ? "ar-TN" : lang === "en" ? "en-US" : "fr-FR").format(n) + " TND";
    if (property.transaction === "sale" && property.salePrice) return fmt(property.salePrice);
    if (property.transaction === "annual" && property.pricePerMonth)
      return `${fmt(property.pricePerMonth)} ${t("card.perMonth")}`;
    if (property.transaction === "seasonal" && property.pricePerNight)
      return `${fmt(property.pricePerNight)} ${t("card.perNight")}`;
    return "—";
  })();

  const breadcrumbParent =
    property.transaction === "sale"
      ? property.type === "land"
        ? { to: "/vente/terrains", label: t("nav.sale.land") }
        : { to: "/vente/maisons", label: t("nav.sale.houses") }
      : property.transaction === "annual"
        ? { to: "/location/annuelle", label: t("nav.rent.annual") }
        : { to: "/location/saisonniere", label: t("nav.rent.seasonal") };

  const isSeasonal = property.transaction === "seasonal";

  const directWhatsApp = () =>
    openWhatsApp({
      kind: isSeasonal ? "booking" : property.transaction === "sale" ? "visit" : "info",
      property: {
        title: property.title,
        ref: property.ref,
        url: propertyUrl(property.slug),
        priceLabel,
      },
      customer: {},
      requestType: "Contact direct",
    });

  return (
    <article className="pb-16">
      {/* breadcrumb */}
      <nav className="container mx-auto flex items-center gap-2 px-4 pt-6 text-xs text-muted-foreground md:px-6">
        <Link to="/" className="hover:text-gold">{t("nav.home")}</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={breadcrumbParent.to} className="hover:text-gold">{breadcrumbParent.label}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="truncate text-primary">{property.title}</span>
      </nav>

      {/* header */}
      <header className="container mx-auto flex flex-col gap-4 px-4 pb-6 pt-4 md:flex-row md:items-end md:justify-between md:px-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground">
              {property.transaction === "sale"
                ? t("tx.sale")
                : property.transaction === "annual"
                  ? t("tx.annual")
                  : t("tx.seasonal")}
            </span>
            <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-secondary-foreground">
              {t(`type.${property.type}`)}
            </span>
            {property.isNew && (
              <span className="rounded-full bg-turquoise px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-turquoise-foreground">
                {t("card.new")}
              </span>
            )}
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-primary md:text-4xl">
            {property.title}
          </h1>
          <p className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-gold" />
              {property.zone}, Djerba
            </span>
            <span className="font-mono text-xs">{t("card.ref")} {property.ref}</span>
          </p>
        </div>
        <div className="text-end">
          <div className="font-display text-3xl font-bold text-gold md:text-4xl">{priceLabel}</div>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6">
        <ImageGallery images={property.images} title={property.title} />
      </div>

      <div className="container mx-auto mt-10 grid gap-10 px-4 md:px-6 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          {/* Key facts */}
          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-border bg-secondary/40 p-4 md:grid-cols-4">
            {property.rooms != null && (
              <Stat icon={<BedDouble className="h-5 w-5" />} label={t("search.rooms")} value={String(property.rooms)} />
            )}
            {property.baths != null && (
              <Stat icon={<Bath className="h-5 w-5" />} label="Sdb." value={String(property.baths)} />
            )}
            <Stat icon={<Maximize className="h-5 w-5" />} label="Surface" value={`${property.area} m²`} />
            {property.landArea != null && (
              <Stat icon={<MapPin className="h-5 w-5" />} label="Terrain" value={`${property.landArea} m²`} />
            )}
            {property.type === "land" && property.constructible != null && (
              <Stat
                icon={<CheckCircle2 className="h-5 w-5" />}
                label="Zonage"
                value={property.zoning ?? (property.constructible ? "Constructible" : "Non constructible")}
              />
            )}
          </div>

          {/* Description */}
          <section>
            <h2 className="font-display text-2xl font-bold text-primary">{t("detail.description")}</h2>
            <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-muted-foreground">
              {property.description}
            </p>
          </section>

          {/* Features */}
          <section>
            <h2 className="font-display text-2xl font-bold text-primary">{t("detail.features")}</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {property.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-gold" />
                  {f}
                </li>
              ))}
            </ul>
          </section>

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-bold text-primary">{t("detail.amenities")}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {property.amenities.map((a) => (
                  <span key={a} className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-primary">
                    {a}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Location map */}
          <section>
            <h2 className="font-display text-2xl font-bold text-primary">{t("detail.location")}</h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-border shadow-card">
              <iframe
                title={`Carte ${property.zone}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(property.zone + ", Djerba, Tunisie")}&output=embed`}
                width="100%"
                height="360"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
              />
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {isSeasonal ? (
            <SeasonalBookingPanel property={property} />
          ) : (
            <aside className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-elegant md:p-6">
              <div>
                <div className="text-3xl font-bold text-primary">{priceLabel}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {property.transaction === "sale" ? t("tx.sale") : t("tx.annual")}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {property.shortDescription}
              </p>
              <InquiryDialog
                property={property}
                kind={property.transaction === "sale" ? "visit" : "info"}
                trigger={
                  <Button className="w-full bg-gold text-gold-foreground hover:bg-gold/90" size="lg">
                    {property.transaction === "sale" ? t("detail.visitCta") : t("detail.infoCta")}
                  </Button>
                }
              />
              <Button
                onClick={directWhatsApp}
                variant="outline"
                className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
                size="lg"
              >
                <MessageCircle className="me-2 h-4 w-4" />
                {WHATSAPP_DISPLAY}
              </Button>
            </aside>
          )}
        </div>
      </div>
    </article>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-background p-3">
      <span className="grid h-9 w-9 place-items-center rounded-md bg-gold/15 text-gold">{icon}</span>
      <div>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="text-sm font-semibold text-primary">{value}</div>
      </div>
    </div>
  );
}
