import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BedDouble,
  Bath,
  Maximize,
  MapPin,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

import type { Property } from "@/lib/properties";
import { useI18n } from "@/lib/i18n";
import { ImageGallery } from "@/components/ImageGallery";
import { SeasonalBookingPanel } from "@/components/SeasonalBookingPanel";
import {
  AnnualRentalPanel,
  HouseSalePanel,
  LandSalePanel,
} from "@/components/PropertyInquiryPanels";

export function PropertyDetail({ property }: { property: Property }) {
  const { t, lang } = useI18n();

  const priceLabel = (() => {
    const fmt = (n: number) =>
      new Intl.NumberFormat(lang === "ar" ? "ar-TN" : lang === "en" ? "en-US" : "fr-FR").format(n) +
      " TND";
    if (property.transaction === "sale") {
      if (!property.salePrice || property.salePrice === 0) return t("card.contactForPrice");
      return fmt(property.salePrice);
    }
    if (property.transaction === "annual") {
      if (!property.pricePerMonth || property.pricePerMonth === 0) return t("card.contactForPrice");
      return `${fmt(property.pricePerMonth)} ${t("card.perMonth")}`;
    }
    if (property.transaction === "seasonal") {
      if (!property.pricePerNight || property.pricePerNight === 0) return t("card.contactForPrice");
      return `${fmt(property.pricePerNight)} ${t("card.perNight")}`;
    }
    return t("card.contactForPrice");
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
  const isSold = property.isSold || property.status === "sold";
  const isRented = property.isRented || property.status === "rented";
  const isUnavailable = isSold || isRented;

  return (
    <article className="pb-16">
      {/* Back button & breadcrumb */}
      <div className="container mx-auto px-4 pt-6 md:px-6 flex flex-col gap-4">
        <div>
          <Link
            to={breadcrumbParent.to}
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-gold transition-colors duration-200 border border-border rounded-lg px-3 py-1.5 bg-card/50 shadow-card"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Retour aux annonces
          </Link>
        </div>
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-gold">
            {t("nav.home")}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={breadcrumbParent.to} className="hover:text-gold">
            {breadcrumbParent.label}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="truncate text-primary">{property.title}</span>
        </nav>
      </div>

      {/* header */}
      <header className="container mx-auto flex flex-col gap-4 px-4 pb-6 pt-4 md:flex-row md:items-end md:justify-between md:px-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {isRented ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-md ring-2 ring-red-400/40">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                {t("detail.rentedBadge")}
              </span>
            ) : isSold ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-md ring-2 ring-red-400/40">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                {t("detail.soldBadge")}
              </span>
            ) : null}
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
            {property.isNew && !isUnavailable && (
              <span className="rounded-full bg-turquoise px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-turquoise-foreground">
                {t("card.new")}
              </span>
            )}
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-primary md:text-4xl break-words">
            {property.title}
          </h1>
          <p className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground break-words">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-gold shrink-0" />
              {property.zone}, Djerba
            </span>
            <span className="font-mono text-xs">
              {t("card.ref")} {property.ref}
            </span>
          </p>
        </div>
        <div className="text-end">
          <div
            className={`font-display text-3xl font-bold md:text-4xl break-words ${
              isUnavailable ? "text-muted-foreground line-through text-2xl md:text-3xl" : "text-gold"
            }`}
          >
            {priceLabel}
          </div>
          {isUnavailable && (
            <div className="mt-1 font-display text-base font-black uppercase tracking-wider text-red-600">
              {isRented ? t("detail.rentedBadge") : t("detail.soldBadge")}
            </div>
          )}
        </div>
      </header>

      {/* Sold announcement banner */}
      {isSold && (
        <div className="container mx-auto mb-6 px-4 md:px-6">
          <div className="flex flex-col justify-between gap-4 rounded-2xl border-2 border-red-500/30 bg-red-50/80 p-4 shadow-sm backdrop-blur-sm dark:bg-red-950/30 sm:flex-row sm:items-center md:p-5">
            <div className="flex items-center gap-3.5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-red-600 text-base font-black text-white shadow-sm">
                ✓
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black uppercase tracking-wider text-red-600 dark:text-red-400">
                    {t("detail.soldBannerTitle")}
                  </span>
                  <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                    {t("card.sold")}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {t("detail.soldBannerSub")}
                </p>
              </div>
            </div>
            <Link
              to="/vente/maisons"
              className="inline-flex shrink-0 items-center justify-center rounded-lg border border-red-600 bg-white/80 px-4 py-2 text-xs font-bold text-red-600 shadow-sm transition hover:bg-red-600 hover:text-white dark:bg-card"
            >
              {lang === "ar"
                ? "تصفح الفيلات المتاحة"
                : lang === "en"
                  ? "Browse available houses"
                  : "Voir nos autres maisons à vendre"}
            </Link>
          </div>
        </div>
      )}

      {/* Rented announcement banner */}
      {isRented && (
        <div className="container mx-auto mb-6 px-4 md:px-6">
          <div className="flex flex-col justify-between gap-4 rounded-2xl border-2 border-red-500/30 bg-red-50/80 p-4 shadow-sm backdrop-blur-sm dark:bg-red-950/30 sm:flex-row sm:items-center md:p-5">
            <div className="flex items-center gap-3.5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-red-600 text-base font-black text-white shadow-sm">
                ✓
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black uppercase tracking-wider text-red-600 dark:text-red-400">
                    {t("detail.rentedBannerTitle")}
                  </span>
                  <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                    {t("card.rented")}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {t("detail.rentedBannerSub")}
                </p>
              </div>
            </div>
            <Link
              to="/location/annuelle"
              className="inline-flex shrink-0 items-center justify-center rounded-lg border border-red-600 bg-white/80 px-4 py-2 text-xs font-bold text-red-600 shadow-sm transition hover:bg-red-600 hover:text-white dark:bg-card"
            >
              {lang === "ar"
                ? "تصفح الإيجارات المتاحة"
                : lang === "en"
                  ? "Browse available rentals"
                  : "Voir nos autres locations annuelles"}
            </Link>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-6">
        <ImageGallery
          images={property.images}
          title={property.title}
          isSold={isSold}
          isRented={isRented}
        />
      </div>

      <div className="container mx-auto mt-10 grid gap-10 px-4 md:px-6 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          {/* Key facts */}
          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-border bg-secondary/40 p-4 md:grid-cols-4">
            <Stat
              icon={<BedDouble className="h-5 w-5" />}
              label={t("search.rooms")}
              value={property.rooms && property.rooms > 0 ? String(property.rooms) : "—"}
            />
            <Stat
              icon={<Bath className="h-5 w-5" />}
              label="Sdb."
              value={property.baths && property.baths > 0 ? String(property.baths) : "—"}
            />
            <Stat
              icon={<Maximize className="h-5 w-5" />}
              label="Surface"
              value={property.area && property.area > 0 ? `${property.area} m²` : "—"}
            />
            <Stat
              icon={<MapPin className="h-5 w-5" />}
              label="Terrain"
              value={property.landArea && property.landArea > 0 ? `${property.landArea} m²` : "—"}
            />
            {property.type === "land" && property.constructible != null && (
              <Stat
                icon={<CheckCircle2 className="h-5 w-5" />}
                label="Zonage"
                value={
                  property.zoning ??
                  (property.constructible ? "Constructible" : "Non constructible")
                }
              />
            )}
          </div>

          {/* Description */}
          <section className="max-w-full overflow-hidden">
            <h2 className="font-display text-2xl font-bold text-primary break-words">
              {t("detail.description")}
            </h2>
            <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-muted-foreground break-words">
              {property.description}
            </p>
          </section>

          {/* Features */}
          <section className="max-w-full overflow-hidden">
            <h2 className="font-display text-2xl font-bold text-primary break-words">{t("detail.features")}</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {property.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground break-words">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-gold shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-bold text-primary">
                {t("detail.amenities")}
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {property.amenities.map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-primary"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Location map */}
          <section>
            <h2 className="font-display text-2xl font-bold text-primary">{t("detail.location")}</h2>
            <div className="mt-4 w-full max-w-full aspect-video overflow-hidden rounded-2xl border border-border shadow-card box-border">
              <iframe
                title={`Carte ${property.zone}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(property.zone + ", Djerba, Tunisie")}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full max-w-full h-full aspect-video border-0"
                style={{ border: 0 }}
              />
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {isSeasonal ? (
            <SeasonalBookingPanel property={property} />
          ) : property.transaction === "annual" ? (
            <AnnualRentalPanel property={property} />
          ) : property.type === "land" ? (
            <LandSalePanel property={property} />
          ) : (
            <HouseSalePanel property={property} />
          )}
        </div>
      </div>
    </article>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-background p-3">
      <span className="grid h-9 w-9 place-items-center rounded-md bg-gold/15 text-gold">
        {icon}
      </span>
      <div>
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="text-sm font-semibold text-primary">{value}</div>
      </div>
    </div>
  );
}
