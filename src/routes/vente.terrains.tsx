import { createFileRoute } from "@tanstack/react-router";
import { ListingPage } from "@/components/ListingPage";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/vente/terrains")({
  head: () => ({
    meta: [
      { title: "Terrains à vendre à Djerba — Immo Djerba" },
      { name: "description", content: "Parcelles constructibles, agricoles et pieds dans l'eau à Djerba." },
      { property: "og:title", content: "Terrains à vendre à Djerba" },
      { property: "og:description", content: "Parcelles constructibles et agricoles à Djerba." },
    ],
  }),
  component: Page,
});

function Page() {
  const { t } = useI18n();
  return (
    <ListingPage
      title={t("list.land.title")}
      subtitle={t("list.land.sub")}
      transaction="sale"
      typeFilter="land"
      hideTransaction
    />
  );
}
