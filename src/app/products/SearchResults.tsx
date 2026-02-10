"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowLeft } from "lucide-react";
import { PRODUCTS, type Product } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";

interface SearchResultsProps {
  query: string;
  initialResults: Product[];
}

export function SearchResults({ query, initialResults }: SearchResultsProps) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(query);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchInput.trim();
    if (q) {
      router.push(`/products?q=${encodeURIComponent(q)}`);
    } else {
      router.push("/products");
    }
  };

  return (
    <>
      <div className="mb-8">
        <Link
          href="/products"
          className="mb-4 inline-flex items-center gap-1 text-sm text-charcoal/70 hover:text-red"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all products
        </Link>
        <h1 className="font-heading text-section font-bold text-navy">
          Search Results
        </h1>
        <p className="mt-1 text-charcoal/80">
          {initialResults.length} result{initialResults.length !== 1 ? "s" : ""}{" "}
          for &ldquo;{query}&rdquo;
        </p>
      </div>

      {/* Inline search refinement */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex max-w-xl overflow-hidden rounded-lg border border-charcoal/20 bg-white shadow-sm focus-within:border-red focus-within:ring-1 focus-within:ring-red">
          <div className="flex flex-1 items-center gap-2 px-4 py-3">
            <Search className="h-5 w-5 text-charcoal/50" />
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-transparent text-navy placeholder:text-charcoal/50 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-navy px-5 py-3 font-semibold text-white transition-colors hover:bg-red hover:text-navy"
          >
            Search
          </button>
        </div>
      </form>

      {/* Results grid */}
      {initialResults.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {initialResults.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-navy group-hover:text-red">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-charcoal/70 line-clamp-2">
                  {product.shortDescription}
                </p>
                <p className="mt-2 font-bold text-navy">
                  {formatPrice(product.basePrice)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-lg text-charcoal/70">
            No products found for &ldquo;{query}&rdquo;
          </p>
          <p className="mt-2 text-charcoal/50">
            Try a different search term or browse our categories
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-lg bg-navy px-6 py-3 font-semibold text-white transition-colors hover:bg-red hover:text-navy"
          >
            Browse All Products
          </Link>
        </div>
      )}
    </>
  );
}
