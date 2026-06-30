import { useI18n, type Lang } from "@/lib/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

const LABELS: Record<Lang, string> = { fr: "Français", en: "English", ar: "العربية" };
const CODES: Record<Lang, string> = { fr: "FR", en: "EN", ar: "AR" };

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex h-10 items-center gap-1.5 rounded-md border border-border px-2.5 text-sm font-medium text-primary hover:bg-secondary"
        aria-label="Language"
      >
        <Globe className="h-4 w-4" />
        <span>{CODES[lang]}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {(Object.keys(LABELS) as Lang[]).map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => setLang(l)}
            className={lang === l ? "font-semibold text-gold" : ""}
          >
            {LABELS[l]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
