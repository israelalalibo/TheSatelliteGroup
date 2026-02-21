"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const PLACEHOLDER_IMAGE = "/images/products/flex-banner-warehouse.png";

interface ProductCardImageProps {
  name: string;
  images: string[];
  /** Aspect ratio class, e.g. aspect-square or aspect-[4/3] */
  aspectClass?: string;
  sizes?: string;
}

export function ProductCardImage({
  name,
  images,
  aspectClass = "aspect-square",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
}: ProductCardImageProps) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [failedSrcs, setFailedSrcs] = useState<Set<string>>(new Set());
  const list = images.length > 0 ? images : [PLACEHOLDER_IMAGE];

  const goTo = useCallback(
    (i: number) => setIndex((i + list.length) % list.length),
    [list.length]
  );

  const handleError = useCallback((src: string) => {
    setFailedSrcs((prev) => new Set(prev).add(src));
  }, []);

  const effectiveSrc = (src: string) =>
    !src || failedSrcs.has(src) ? PLACEHOLDER_IMAGE : src;

  useEffect(() => {
    if (list.length <= 1 || hovered) return;
    const t = setInterval(() => goTo(index + 1), 3000);
    return () => clearInterval(t);
  }, [index, hovered, list.length, goTo]);

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`relative overflow-hidden ${aspectClass}`}>
        {list.map((src, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-300 ${
              i === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={effectiveSrc(src)}
              alt={i === 0 ? name : `${name} view ${i + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes={sizes}
              onError={() => handleError(src)}
            />
          </div>
        ))}
        {list.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 z-20 flex justify-center gap-1.5">
            {list.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIndex(i);
                }}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === index ? "bg-red" : "bg-white/70 hover:bg-white"
                }`}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
