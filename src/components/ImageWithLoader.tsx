import { useState, useEffect, useRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/**
 * ImageWithLoader
 * ───────────────
 * Drop-in `<img>` replacement that shows a clearly visible skeleton shimmer
 * while the image is loading, then smoothly fades it in.
 *
 * ▸ Prevents layout shift via a `relative` wrapper that matches the image size.
 * ▸ Accepts **all** native `<img>` attributes (src, alt, className, …).
 * ▸ Skeleton uses a visible mid-grey tone so it's clearly distinguishable.
 * ▸ The skeleton overlay fades *out* (instead of unmounting) to avoid a flash.
 */

type ImageWithLoaderProps = ComponentPropsWithoutRef<"img"> & {
  /** Extra classes applied to the outer wrapper `<div>`. */
  wrapperClassName?: string;
};

export function ImageWithLoader({
  wrapperClassName,
  className,
  onLoad,
  ...imgProps
}: ImageWithLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Reset loading state when `src` changes (e.g. gallery slide).
  useEffect(() => {
    setIsLoaded(false);

    // Handle images that were already cached by the browser before React mounts.
    const el = imgRef.current;
    if (el?.complete && el.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [imgProps.src]);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true);
    // Forward the original onLoad handler if the consumer provided one.
    onLoad?.(e);
  };

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden",
        wrapperClassName,
      )}
    >
      {/* ── Skeleton overlay ─────────────────────────────────────── */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 z-10 transition-opacity duration-700 ease-out",
          isLoaded ? "opacity-0 pointer-events-none" : "opacity-100",
        )}
        style={{ backgroundColor: "#d4d4d8" }}
      >
        {/* Pulsing base */}
        <div className="absolute inset-0 animate-pulse" style={{ backgroundColor: "#d4d4d8" }} />

        {/* Shimmer sweep — bright highlight gliding across */}
        <div
          className="absolute inset-0 animate-shimmer"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 40%, rgba(255,255,255,0.65) 50%, rgba(255,255,255,0.45) 60%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Actual image ─────────────────────────────────────────── */}
      <img
        ref={imgRef}
        loading="lazy"
        {...imgProps}
        onLoad={handleLoad}
        className={cn(
          "transition-opacity duration-700 ease-out",
          isLoaded ? "opacity-100" : "opacity-0",
          className,
        )}
      />
    </div>
  );
}

/** @deprecated Use `ImageWithLoader` instead. Kept for backward compatibility. */
export const LoadingImage = ImageWithLoader;
