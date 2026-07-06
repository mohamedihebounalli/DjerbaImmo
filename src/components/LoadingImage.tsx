import { useState, useEffect, useRef } from "react";

interface LoadingImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function LoadingImage({ src, alt, className = "" }: LoadingImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // If the browser already cached and completed loading the image before React mounts
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true);
    }
  }, [src]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#f3f4f6]">
      {/* Light-grey skeleton placeholder with looping shimmer/pulse animation */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#f3f4f6] animate-pulse">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer"
            style={{ animation: "shimmer 2s infinite linear" }}
          />
        </div>
      )}

      {/* Smoothly fade-in image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`${className} ${
          isLoaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500`}
      />
    </div>
  );
}
