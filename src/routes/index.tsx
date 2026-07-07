import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, KeyRound, Sparkles, TreePalm } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { SearchBar, applyFilters, useDefaultFilters } from "@/components/SearchBar";
import { PROPERTIES } from "@/lib/properties";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { t } = useI18n();
  const [filters, setFilters] = useDefaultFilters();
  const featured = PROPERTIES.filter((p) => p.featured).slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative">
        <div className="relative h-[78vh] min-h-[560px] w-full overflow-hidden">
          <img
            src="/assets/hero-djerba.webp"
            alt="Villa traditionnelle à Djerba au coucher du soleil"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/45 to-primary/80" />
          <div className="container relative mx-auto flex h-full flex-col justify-end px-4 pb-28 md:px-6 md:pb-32">
            <div className="max-w-3xl text-primary-foreground">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-foreground">
                <Sparkles className="h-3 w-3" />
                {t("footer.tag")}
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
                {t("hero.title")}
              </h1>
              <p className="mt-5 max-w-xl text-lg text-primary-foreground/90">
                {t("hero.subtitle")}
              </p>
            </div>
          </div>
        </div>

        {/* Search overlay */}
        <div className="container mx-auto -mt-24 px-4 md:px-6">
          <SearchBar
            value={filters}
            onChange={setFilters}
            onSubmit={() => {
              document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
        <SectionHeader title={t("home.categories.title")} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Category
            to="/vente/maisons"
            label={t("home.categories.sale")}
            icon={<Building2 className="h-6 w-6" />}
          />
          <Category
            to="/location/saisonniere"
            label={t("home.categories.seasonal")}
            icon={<KeyRound className="h-6 w-6" />}
          />
          <Category
            to="/location/annuelle"
            label={t("home.categories.annual")}
            icon={<KeyRound className="h-6 w-6" />}
          />
          <Category
            to="/vente/terrains"
            label={t("home.categories.land")}
            icon={<TreePalm className="h-6 w-6" />}
          />
        </div>
      </section>

      {/* RESULTS / FEATURED */}
      <section id="results" className="bg-secondary/40 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader title={t("home.featured")} subtitle={t("home.featured.sub")} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(applyFilters(PROPERTIES, filters).length > 0 ? applyFilters(PROPERTIES, filters) : featured)
              .slice(0, 6)
              .map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/vente/maisons">
                Voir tous les biens <ArrowRight className="ms-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="container mx-auto grid items-center gap-10 px-4 py-20 md:grid-cols-2 md:px-6 md:py-28">
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-elegant">
            <img 
              src="/assets/about-menzel.webp" 
              alt="Patio traditionnel d'un menzel à Djerba" 
              className="h-full w-full object-cover" 
              loading="lazy" 
            />
          </div>
          <div className="absolute -bottom-6 -end-6 hidden h-32 w-32 rounded-full bg-gold/90 shadow-elegant md:block" />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
            {t("home.about.title")}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-primary md:text-4xl">
            {t("about.lead")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            {t("home.about.body")}
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {(["v1", "v2", "v3"] as const).map((k) => (
              <div key={k} className="rounded-xl border border-border bg-card p-4">
                <h3 className="font-display text-sm font-bold text-primary">{t(`about.${k}.t`)}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{t(`about.${k}.b`)}</p>
              </div>
            ))}
          </div>
          <Button asChild className="mt-8 bg-gold text-gold-foreground hover:bg-gold/90">
            <Link to="/a-propos">{t("home.about.cta")} <ArrowRight className="ms-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center">
      <h2 className="font-display text-3xl font-bold tracking-tight text-primary md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">{subtitle}</p>
      )}
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" />
    </div>
  );
}

function Category({ to, label, icon }: { to: string; label: string; icon: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="group relative flex flex-col items-start gap-4 overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-gold hover:shadow-elegant"
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-sea text-white">
        {icon}
      </span>
      <div>
        <h3 className="font-display text-lg font-bold text-primary">{label}</h3>
        <p className="mt-1 inline-flex items-center text-sm font-medium text-gold opacity-0 transition-opacity group-hover:opacity-100">
          Découvrir <ArrowRight className="ms-1 h-3.5 w-3.5" />
        </p>
      </div>
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold/10 transition-transform group-hover:scale-125" />
    </Link>
  );
}