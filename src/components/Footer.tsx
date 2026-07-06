import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { Facebook, Instagram, Phone, MapPin, Mail } from "lucide-react";

const TIKTOK = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
    <path d="M21 8.5a7.5 7.5 0 0 1-5-1.9V15a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3V2h3a4.5 4.5 0 0 0 5 4.5V8.5z" />
  </svg>
);

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
      <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div>
          <div className="font-display text-2xl font-bold tracking-tight">
            IMMO <span className="text-gold">DJERBA</span>
          </div>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-primary-foreground/70">
            {t("footer.tag")}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80">
            {t("home.about.body")}
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-gold">
            {t("footer.nav")}
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/85">
            <li><Link to="/" className="hover:text-gold">{t("nav.home")}</Link></li>
            <li><Link to="/vente/maisons" className="hover:text-gold">{t("nav.sale.houses")}</Link></li>
            <li><Link to="/vente/terrains" className="hover:text-gold">{t("nav.sale.land")}</Link></li>
            <li><Link to="/location/saisonniere" className="hover:text-gold">{t("nav.rent.seasonal")}</Link></li>
            <li><Link to="/location/annuelle" className="hover:text-gold">{t("nav.rent.annual")}</Link></li>
            <li><Link to="/a-propos" className="hover:text-gold">{t("nav.about")}</Link></li>
            <li><Link to="/contact" className="hover:text-gold">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-gold">
            {t("footer.contact")}
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/85">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 text-gold" />
              <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-gold">
                {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 text-gold" />
              <a href="mailto:contact@immo-djerba.com" className="hover:text-gold">
                contact@immo-djerba.com
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-gold" />
              <span>Île de Djerba, Tunisie</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-gold">
            {t("contact.follow")}
          </h4>
          <div className="mt-4 flex gap-3">
            <SocialLink href="https://facebook.com" label="Facebook"><Facebook className="h-4 w-4" /></SocialLink>
            <SocialLink href="https://instagram.com" label="Instagram"><Instagram className="h-4 w-4" /></SocialLink>
            <SocialLink href="https://tiktok.com" label="TikTok">{TIKTOK}</SocialLink>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-primary-foreground/60 md:flex-row md:px-6">
          <p>© {year} Immo Djerba. {t("footer.rights")}</p>
          <p>Vente · Achat · Location à Djerba</p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-primary-foreground/20 transition-colors hover:border-gold hover:bg-gold hover:text-gold-foreground"
    >
      {children}
    </a>
  );
}
