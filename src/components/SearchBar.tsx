import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n";
import { PROPERTIES, ZONES, type Property, type PropertyType, type Transaction } from "@/lib/properties";

export type Filters = {
  type?: PropertyType | "all";
  transaction?: Transaction | "all";
  zone?: string | "all";
  rooms?: number | 0; // 0 = any
  priceMin?: number | "";
  priceMax?: number | "";
};

const ALL: Filters = {
  type: "all",
  transaction: "all",
  zone: "all",
  rooms: 0,
  priceMin: "",
  priceMax: "",
};

export function applyFilters(list: Property[], f: Filters): Property[] {
  return list.filter((p) => {
    if (f.type && f.type !== "all" && p.type !== f.type) return false;
    if (f.transaction && f.transaction !== "all" && p.transaction !== f.transaction) return false;
    if (f.zone && f.zone !== "all" && p.zone !== f.zone) return false;
    if (f.rooms && f.rooms > 0 && (p.rooms ?? 0) < f.rooms) return false;
    const price =
      p.transaction === "sale"
        ? p.salePrice
        : p.transaction === "annual"
          ? p.pricePerMonth
          : p.pricePerNight;
    if (price != null) {
      if (f.priceMin !== "" && f.priceMin != null && price < Number(f.priceMin)) return false;
      if (f.priceMax !== "" && f.priceMax != null && price > Number(f.priceMax)) return false;
    }
    return true;
  });
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  defaultTransaction,
  hideTransaction,
  compact,
}: {
  value: Filters;
  onChange: (next: Filters) => void;
  onSubmit?: () => void;
  defaultTransaction?: Transaction;
  hideTransaction?: boolean;
  compact?: boolean;
}) {
  const { t } = useI18n();

  const update = (patch: Partial<Filters>) => onChange({ ...value, ...patch });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className={
        "grid gap-3 rounded-2xl border border-border bg-card/95 p-4 shadow-elegant backdrop-blur md:p-5 " +
        (compact
          ? "grid-cols-2 md:grid-cols-4"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4")
      }
    >
      {!hideTransaction && (
        <Field label={t("search.transaction")}>
          <Select
            value={value.transaction ?? defaultTransaction ?? "all"}
            onValueChange={(v) => update({ transaction: v as Filters["transaction"] })}
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("search.all")}</SelectItem>
              <SelectItem value="sale">{t("tx.sale")}</SelectItem>
              <SelectItem value="annual">{t("tx.annual")}</SelectItem>
              <SelectItem value="seasonal">{t("tx.seasonal")}</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      )}

      <Field label={t("search.location")}>
        <Select value={value.zone ?? "all"} onValueChange={(v) => update({ zone: v })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("search.all")}</SelectItem>
            {ZONES.map((z) => (
              <SelectItem key={z} value={z}>{z}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label={t("search.rooms")}>
        <Select
          value={String(value.rooms ?? 0)}
          onValueChange={(v) => update({ rooms: Number(v) })}
        >
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="0">{t("search.anyRooms")}</SelectItem>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <SelectItem key={n} value={String(n)}>{n}+</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label={t("search.priceMax")}>
        <Input
          type="number"
          inputMode="numeric"
          min={0}
          value={value.priceMax ?? ""}
          onChange={(e) => update({ priceMax: e.target.value === "" ? "" : Number(e.target.value) })}
          placeholder="∞"
        />
      </Field>

      <div className="col-span-full flex flex-wrap items-center justify-end gap-2 pt-1">
        <Button
          type="button"
          variant="ghost"
          onClick={() => onChange({ ...ALL, transaction: defaultTransaction ?? "all" })}
        >
          {t("search.reset")}
        </Button>
        <Button type="submit" className="bg-gold text-gold-foreground hover:bg-gold/90">
          <Search className="me-2 h-4 w-4" />
          {t("search.submit")}
        </Button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-primary/80">{label}</span>
      {children}
    </label>
  );
}

export function useDefaultFilters(defaultTransaction?: Transaction): [Filters, (next: Filters) => void] {
  const [filters, setFilters] = useState<Filters>({ ...ALL, transaction: defaultTransaction ?? "all" });
  return [filters, setFilters];
}

export { PROPERTIES };
