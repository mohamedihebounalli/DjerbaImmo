import { createFileRoute } from "@tanstack/react-router";
import { ListingPage } from "@/components/ListingPage";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/vente/maisons")({
  head: () => ({
    meta: [
      { title: "Maisons à vendre à Djerba — Immo Djerba" },
      { name: "description", content: "Villas, menzels et appartements à acheter à Djerba." },
      { property: "og:title", content: "Maisons à vendre à Djerba" },
      { property: "og:description", content: "Sélection de biens à acheter à Djerba." },
    ],
  }),
  component: Page,
});

function Page() {
  const { t } = useI18n();
  return (
    <ListingPage
      title={t("list.sale.title")}
      subtitle={t("list.sale.sub")}
      transaction="sale"
      hideTransaction
    />
  );
}
