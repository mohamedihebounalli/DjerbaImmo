import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Handshake, MapPin } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/a-propos")({
  component: AboutPage,
});

function AboutPage() {
  const { t } = useI18n();
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-sea text-primary-foreground">
        <div className="container mx-auto grid items-center gap-10 px-4 py-20 md:grid-cols-2 md:px-6 md:py-28">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Immo Djerba
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
              {t("about.title")}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-primary-foreground/90">
              {t("about.lead")}
            </p>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-elegant">
              <img 
                src="/assets/about-menzel.webp" 
                alt="Patio djerbien" 
                className="h-full w-full object-cover" 
              />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute -bottom-32 -end-32 h-64 w-64 rounded-full bg-gold/30 blur-3xl" />
      </section>

      <section className="container mx-auto grid gap-12 px-4 py-20 md:grid-cols-2 md:px-6">
        <div>
          <h2 className="font-display text-3xl font-bold text-primary">{t("about.mission")}</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {t("about.missionBody")}
          </p>
          <Button asChild className="mt-6 bg-gold text-gold-foreground hover:bg-gold/90">
            <Link to="/contact">
              {t("nav.contact")} <ArrowRight className="ms-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4">
          <ValueCard icon={<MapPin />} title={t("about.v1.t")} body={t("about.v1.b")} />
          <ValueCard icon={<Handshake />} title={t("about.v2.t")} body={t("about.v2.b")} />
          <ValueCard icon={<Award />} title={t("about.v3.t")} body={t("about.v3.b")} />
        </div>
      </section>
    </>
  );
}

function ValueCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold/15 text-gold">
        {icon}
      </span>
      <div>
        <h3 className="font-display text-lg font-bold text-primary">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}