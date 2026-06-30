import { createFileRoute } from "@tanstack/react-router";
import { ListingPage } from "@/components/ListingPage";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/location/saisonniere")({
  head: () => ({
    meta: [
      { title: "Locations saisonnières à Djerba — Immo Djerba" },
      { name: "description", content: "Villas et appartements à louer pour vos vacances à Djerba." },
      { property: "og:title", content: "Locations saisonnières à Djerba" },
      { property: "og:description", content: "Locations vacances à Djerba avec calendrier en temps réel." },
    ],
  }),
  component: Page,
});

function Page() {
  const { t } = useI18n();
  return (
    <ListingPage
      title={t("list.seasonal.title")}
      subtitle={t("list.seasonal.sub")}
      transaction="seasonal"
      hideTransaction
    />
  );
}
