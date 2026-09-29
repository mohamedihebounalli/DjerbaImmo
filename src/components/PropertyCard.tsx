import { Link } from "@tanstack/react-router";
import { BedDouble, Bath, Maximize, MapPin } from "lucide-react";
import type { Property } from "@/lib/properties";
import { useI18n } from "@/lib/i18n";
import { LoadingImage } from "@/components/ImageWithLoader";

export function PropertyCard({ property }: { property: Property }) {
  const { t, lang } = useI18n();

  const priceLabel = (() => {
    if (property.transaction === "sale") {
      if (!property.salePrice || property.salePrice === 0) {
        return t("card.contactForPrice");
      }
      return `${fmtPrice(property.salePrice, lang)}`;
    }
    if (property.transaction === "annual") {
      if (!property.pricePerMonth || property.pricePerMonth === 0) {
        return t("card.contactForPrice");
      }
      return `${fmtPrice(property.pricePerMonth, lang)} ${t("card.perMonth")}`;
    }
    if (!property.pricePerNight || property.pricePerNight === 0) {
      return t("card.contactForPrice");
    }
    return `${fmtPrice(property.pricePerNight, lang)} ${t("card.perNight")}`;
  })();

  const isSold = property.isSold || property.status === "sold";
  const isRented = property.isRented || property.status === "rented";
  const isUnavailable = isSold || isRented;

  const txLabel =
    property.transaction === "sale"
      ? t("tx.sale")
      : property.transaction === "annual"
        ? t("tx.annual")
        : t("tx.seasonal");

  return (
    <Link
      to={property.slug}
      className="group block overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <LoadingImage
          src={property.images[0]}
          alt={property.title}
          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            isUnavailable ? "brightness-95" : ""
          }`}
        />
        {/* Top Badges */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-2 p-3">
          {isRented ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-lg ring-2 ring-white/50 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              {t("card.rented")}
            </span>
          ) : isSold ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-lg ring-2 ring-white/50 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              {t("card.sold")}
            </span>
          ) : (
            <span className="rounded-full bg-primary/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground backdrop-blur">
              {txLabel}
            </span>
          )}
          {property.isNew && !isUnavailable && (
            <span className="rounded-full bg-turquoise px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-turquoise-foreground">
              {t("card.new")}
            </span>
          )}
        </div>

        {/* Center Sold / Rented Stamp Overlay */}
        {isUnavailable && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 pointer-events-none">
            <span className="rounded-lg bg-red-600/90 px-3.5 py-1.5 font-display text-xs md:text-sm font-black uppercase tracking-widest text-white shadow-2xl backdrop-blur-sm border border-white/20 -rotate-3">
              {isRented ? t("detail.rentedBadge") : t("detail.soldBadge")}
            </span>
          </div>
        )}

        {/* Bottom Price Bar */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-2 bg-gradient-to-t from-primary/85 via-primary/30 to-transparent p-3">
          <span
            className={`rounded-md px-3 py-1.5 text-sm font-bold shadow-card ${
              isUnavailable
                ? "bg-muted/95 text-muted-foreground line-through backdrop-blur"
                : "bg-gold text-gold-foreground"
            }`}
          >
            {priceLabel}
          </span>
          {isRented ? (
            <span className="rounded-md bg-red-600/95 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow backdrop-blur">
              {t("card.rented")}
            </span>
          ) : isSold ? (
            <span className="rounded-md bg-red-600/95 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow backdrop-blur">
              {t("card.sold")}
            </span>
          ) : null}
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-bold leading-tight text-primary">
            {property.title}
          </h3>
          <span className="shrink-0 text-[11px] font-mono font-semibold text-muted-foreground">
            {t("card.ref")} {property.ref}
          </span>
        </div>
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-gold" />
          {property.zone} · {t(`type.${property.type}`)}
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-border pt-3 text-xs text-muted-foreground">
          {property.rooms != null && property.rooms > 0 && (
            <Spec
              icon={<BedDouble className="h-3.5 w-3.5" />}
              value={`${property.rooms} ${t("card.rooms")}`}
            />
          )}
          {property.baths != null && property.baths > 0 && (
            <Spec
              icon={<Bath className="h-3.5 w-3.5" />}
              value={`${property.baths} ${t("card.baths")}`}
            />
          )}
          {property.type === "land" && property.landArea != null && property.landArea > 0 ? (
            <Spec
              icon={<Maximize className="h-3.5 w-3.5" />}
              value={`${property.landArea} ${t("card.area")}`}
            />
          ) : property.area != null && property.area > 0 ? (
            <Spec
              icon={<Maximize className="h-3.5 w-3.5" />}
              value={`${property.area} ${t("card.area")}`}
            />
          ) : null}
        </div>
      </div>
    </Link>
  );
}

function Spec({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-primary/80">
      {icon}
      {value}
    </span>
  );
}

function fmtPrice(n: number | undefined, lang: string): string {
  if (n == null) return "—";
  try {
    return (
      new Intl.NumberFormat(lang === "ar" ? "ar-TN" : lang === "en" ? "en-US" : "fr-FR").format(n) +
      " TND"
    );
  } catch {
    return n + " TND";
  }
}
