"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { PRODUCTS } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof PRODUCTS>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q)
    );
    setResults(filtered.slice(0, 6));
  }, [query]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div
        className="mx-auto mt-20 max-w-2xl rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-charcoal/10 p-4">
          <Search className="h-5 w-5 text-charcoal/50" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What would you like to print today?"
            autoFocus
            className="flex-1 bg-transparent text-navy placeholder:text-charcoal/50 focus:outline-none"
          />
          <button type="button" onClick={onClose} className="p-2 hover:bg-soft-gray rounded">
            <X className="h-5 w-5" />
          </button>
        </div>
        {query && (
          <div className="max-h-80 overflow-y-auto p-4">
            {results.length > 0 ? (
              <ul className="space-y-2">
                {results.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/products/${p.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-4 rounded-lg p-2 hover:bg-soft-gray"
                    >
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-soft-gray">
                        <Image src={p.image} alt="" fill className="object-cover" sizes="48px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-navy truncate">{p.name}</p>
                        <p className="text-sm text-charcoal/70">{formatPrice(p.basePrice)}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-8 text-center text-charcoal/70">No products found</p>
            )}
            {query && (
              <Link
                href={`/products?q=${encodeURIComponent(query)}`}
                onClick={onClose}
                className="mt-4 block text-center font-medium text-red hover:underline"
              >
                View all results for &quot;{query}&quot;
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
