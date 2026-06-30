import { useMemo } from "react";
import { useI18n } from "@/lib/i18n";
import { SearchBar, applyFilters, useDefaultFilters } from "@/components/SearchBar";
import { PROPERTIES } from "@/lib/properties";
import { PropertyCard } from "@/components/PropertyCard";
import type { Transaction, PropertyType } from "@/lib/properties";

export function ListingPage({
  title,
  subtitle,
  transaction,
  typeFilter,
  hideTransaction,
}: {
  title: string;
  subtitle: string;
  transaction?: Transaction;
  typeFilter?: PropertyType;
  hideTransaction?: boolean;
}) {
  const { t } = useI18n();
  const [filters, setFilters] = useDefaultFilters(transaction);

  const baseList = useMemo(() => {
    let list = PROPERTIES;
    if (transaction) list = list.filter((p) => p.transaction === transaction);
    if (typeFilter) list = list.filter((p) => p.type === typeFilter);
    return list;
  }, [transaction, typeFilter]);

  const results = useMemo(
    () => applyFilters(baseList, { ...filters, transaction: transaction ?? filters.transaction }),
    [baseList, filters, transaction],
  );

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-gradient-sea text-primary-foreground">
        <div className="container mx-auto px-4 py-16 md:px-6 md:py-20">
          <h1 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/85">{subtitle}</p>
        </div>
        <div className="pointer-events-none absolute -bottom-32 -end-32 h-64 w-64 rounded-full bg-gold/30 blur-3xl" />
      </section>

      <section className="container mx-auto px-4 md:px-6">
        <div className="-mt-10 md:-mt-12">
          <SearchBar
            value={filters}
            onChange={setFilters}
            defaultTransaction={transaction}
            hideTransaction={hideTransaction}
          />
        </div>

        <div className="mt-8 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {results.length} {t("list.results")}
          </span>
        </div>

        {results.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
            {t("list.empty")}
          </div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
