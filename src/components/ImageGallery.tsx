import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const total = images.length;
  const prev = () => setActive((i) => (i - 1 + total) % total);
  const next = () => setActive((i) => (i + 1) % total);

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted shadow-elegant">
        <img
          src={images[active]}
          alt={`${title} — photo ${active + 1}`}
          className="h-full w-full object-cover"
        />
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Précédent"
              className="absolute start-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-background/85 text-primary shadow-card backdrop-blur hover:bg-background"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Suivant"
              className="absolute end-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-background/85 text-primary shadow-card backdrop-blur hover:bg-background"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-3 end-3 rounded-full bg-primary/85 px-3 py-1 text-xs font-medium text-primary-foreground backdrop-blur">
              {active + 1} / {total}
            </div>
          </>
        )}
      </div>
      {total > 1 && (
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-8">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={
                "aspect-square overflow-hidden rounded-md border-2 transition " +
                (i === active ? "border-gold" : "border-transparent opacity-70 hover:opacity-100")
              }
            >
              <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
