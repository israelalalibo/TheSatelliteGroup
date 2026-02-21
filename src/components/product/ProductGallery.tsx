"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

const PLACEHOLDER_IMAGE = "/images/products/flex-banner-warehouse.png";

interface ProductGalleryProps {
  name: string;
  images: string[];
}

export function ProductGallery({ name, images }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [failedSrcs, setFailedSrcs] = useState<Set<string>>(new Set());
  const list = images.length > 0 ? images : [PLACEHOLDER_IMAGE];

  const effectiveSrc = (src: string) =>
    !src || failedSrcs.has(src) ? PLACEHOLDER_IMAGE : src;

  const handleError = useCallback((src: string) => {
    setFailedSrcs((prev) => new Set(prev).add(src));
  }, []);

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-soft-gray">
        {list.map((src, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-200 ${
              i === selectedIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={effectiveSrc(src)}
              alt={i === 0 ? name : `${name} view ${i + 1}`}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
              onError={() => handleError(src)}
            />
          </div>
        ))}
      </div>
      {list.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {list.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedIndex(i)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                i === selectedIndex
                  ? "border-red ring-2 ring-red/30"
                  : "border-charcoal/20 hover:border-red/50"
              }`}
            >
              <Image
                src={effectiveSrc(img)}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
                onError={() => handleError(img)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
