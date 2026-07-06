import { createFileRoute } from "@tanstack/react-router";
import { ListingPage } from "@/components/ListingPage";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/vente/maisons")({
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
