import { createFileRoute } from "@tanstack/react-router";
import { ListingPage } from "@/components/ListingPage";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/vente/terrains")({
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
