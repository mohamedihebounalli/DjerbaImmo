import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { ImageWithLoader } from "@/components/ImageWithLoader";

export function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const total = images.length;

  const prev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActive((i) => (i - 1 + total) % total);
  };
  const next = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActive((i) => (i + 1) % total);
  };

  return (
    <div className="w-full w-full mx-auto p-0">
      {/* Strict 5-column layout without extra side space */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3">
        
        {/* Main Featured Image - Spans 3 columns and exactly 3 rows */}
        <div
          onClick={() => setLightboxOpen(true)}
          className="group relative aspect-[16/10] col-span-2 sm:col-span-3 md:col-span-3 md:row-span-3 w-full cursor-zoom-in overflow-hidden rounded-2xl bg-muted shadow-md"
        >
          <ImageWithLoader
            src={images[active]}
            alt={`${title} — photo ${active + 1}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

          {/* Hover Maximize Icon */}
          <div className="absolute end-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-background/80 text-primary opacity-0 shadow-sm backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
            <Maximize2 className="h-4 w-4" />
          </div>

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Précédent"
                className="absolute start-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-background/85 text-primary shadow-sm backdrop-blur hover:bg-background z-10"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Suivant"
                className="absolute end-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-background/85 text-primary shadow-sm backdrop-blur hover:bg-background z-10"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-3 end-3 rounded-full bg-black/70 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur z-10">
                {active + 1} / {total}
              </div>
            </>
          )}
        </div>

        {/* Thumbnails flow perfectly into the grid and wrap underneath */}
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={
              "relative aspect-[16/10] w-full overflow-hidden rounded-xl border-2 transition-all duration-200 " +
              (i === active
                ? "border-orange-400 shadow-sm scale-[0.98]"
                : "border-transparent opacity-90 hover:opacity-100")
            }
          >
            <ImageWithLoader src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            className="absolute end-4 top-4 z-[101] grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            onClick={() => setLightboxOpen(false)}
            aria-label="Fermer"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="relative flex h-full w-full max-w-5xl items-center justify-center">
            {total > 1 && (
              <button
                type="button"
                onClick={prev}
                className="absolute start-0 md:-start-12 z-[101] grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Précédent"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
            )}

            <ImageWithLoader
              wrapperClassName="max-h-[85vh] max-w-full rounded-lg overflow-hidden shadow-2xl"
              src={images[active]}
              alt={`${title} — plein écran`}
              className="max-h-[85vh] max-w-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {total > 1 && (
              <button
                type="button"
                onClick={next}
                className="absolute end-0 md:-end-12 z-[101] grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Suivant"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            )}
          </div>

          <div className="mt-4 text-center text-white/80">
            <p className="font-medium">{title}</p>
            <p className="text-sm mt-1">
              {active + 1} / {total}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}