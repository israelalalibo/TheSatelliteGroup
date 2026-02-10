"use client";

import Link from "next/link";
import { ProductCardImage } from "./ProductCardImage";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/data/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const images = product.images?.length ? product.images : [product.image];

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl"
    >
      <ProductCardImage
        name={product.name}
        images={images}
        aspectClass="aspect-square"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
      />
      <div className="p-4">
        <h2 className="font-semibold text-navy group-hover:text-red">{product.name}</h2>
        <p className="mt-1 line-clamp-2 text-sm text-charcoal/70">{product.shortDescription}</p>
        <p className="mt-2 font-bold text-navy">From {formatPrice(product.basePrice)}</p>
      </div>
    </Link>
  );
}
