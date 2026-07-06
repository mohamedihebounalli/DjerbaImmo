import { createFileRoute } from "@tanstack/react-router";
import { ListingPage } from "@/components/ListingPage";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/location/saisonniere")({
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
