import { createFileRoute } from "@tanstack/react-router";
import { ListingPage } from "@/components/ListingPage";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/location/annuelle")({
  head: () => ({
    meta: [
      { title: "Locations annuelles à Djerba — Immo Djerba" },
      { name: "description", content: "Biens à louer à l'année à Djerba." },
      { property: "og:title", content: "Locations annuelles à Djerba" },
      { property: "og:description", content: "Maisons et appartements en location longue durée à Djerba." },
    ],
  }),
  component: Page,
});

function Page() {
  const { t } = useI18n();
  return (
    <ListingPage
      title={t("list.annual.title")}
      subtitle={t("list.annual.sub")}
      transaction="annual"
      hideTransaction
    />
  );
}
