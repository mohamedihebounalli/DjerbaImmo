import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { cn } from "@/lib/utils";

export function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const link =
    "text-sm font-medium text-primary/85 hover:text-gold transition-colors";
  const activeProps = { className: "text-gold" };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto flex h-18 items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-3" aria-label="Immo Djerba">
          <Logo />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-bold tracking-tight text-primary">
              IMMO <span className="text-gold">DJERBA</span>
            </span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {t("footer.tag")}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          <Link to="/" className={link} activeProps={activeProps} activeOptions={{ exact: true }}>
            {t("nav.home")}
          </Link>

          <Dropdown
            label={t("nav.sale")}
            items={[
              { to: "/vente/maisons", label: t("nav.sale.houses") },
              { to: "/vente/terrains", label: t("nav.sale.land") },
            ]}
          />
          <Dropdown
            label={t("nav.rent")}
            items={[
              { to: "/location/saisonniere", label: t("nav.rent.seasonal") },
              { to: "/location/annuelle", label: t("nav.rent.annual") },
            ]}
          />
          <Link to="/a-propos" className={link} activeProps={activeProps}>
            {t("nav.about")}
          </Link>
          <Link to="/contact" className={link} activeProps={activeProps}>
            {t("nav.contact")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-3">
            <MobileLink to="/" onClick={() => setOpen(false)}>{t("nav.home")}</MobileLink>
            <div className="mt-2 px-3 text-[11px] uppercase tracking-wider text-muted-foreground">{t("nav.sale")}</div>
            <MobileLink to="/vente/maisons" onClick={() => setOpen(false)}>{t("nav.sale.houses")}</MobileLink>
            <MobileLink to="/vente/terrains" onClick={() => setOpen(false)}>{t("nav.sale.land")}</MobileLink>
            <div className="mt-2 px-3 text-[11px] uppercase tracking-wider text-muted-foreground">{t("nav.rent")}</div>
            <MobileLink to="/location/saisonniere" onClick={() => setOpen(false)}>{t("nav.rent.seasonal")}</MobileLink>
            <MobileLink to="/location/annuelle" onClick={() => setOpen(false)}>{t("nav.rent.annual")}</MobileLink>
            <div className="my-2 h-px bg-border" />
            <MobileLink to="/a-propos" onClick={() => setOpen(false)}>{t("nav.about")}</MobileLink>
            <MobileLink to="/contact" onClick={() => setOpen(false)}>{t("nav.contact")}</MobileLink>
          </nav>
        </div>
      )}
    </header>
  );
}

function MobileLink({ to, children, onClick }: { to: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="rounded-md px-3 py-2.5 text-base font-medium text-primary hover:bg-secondary"
      activeProps={{ className: "bg-secondary text-gold" }}
    >
      {children}
    </Link>
  );
}

function Dropdown({
  label,
  items,
}: {
  label: string;
  items: { to: string; label: string }[];
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="inline-flex items-center gap-1 text-sm font-medium text-primary/85 transition-colors group-hover:text-gold"
      >
        {label}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      <div
        className={cn(
          "invisible absolute start-0 top-full z-50 mt-1 min-w-[200px] rounded-md border border-border bg-popover p-1 opacity-0 shadow-elegant transition-all",
          "group-hover:visible group-hover:opacity-100",
        )}
      >
        {items.map((it) => (
          <Link
            key={it.to}
            to={it.to}
            className="block rounded px-3 py-2 text-sm text-popover-foreground hover:bg-secondary hover:text-gold"
          >
            {it.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function Logo() {
  return (
    <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-gradient-sea text-white shadow-card">
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 12a9 9 0 0 1 18 0" />
        <path d="M8 21V11l4-4 4 4v10" />
        <circle cx="12" cy="7.5" r="0.6" fill="currentColor" />
      </svg>
    </span>
  );
}
