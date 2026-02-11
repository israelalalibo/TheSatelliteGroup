"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Package, ExternalLink } from "lucide-react";
import { PRODUCTS } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";

export default function AdminProductsPage() {
  const categoryLabels: Record<string, string> = {
    "printing-machines": "Printing Machines",
    "raw-materials": "Raw Materials",
    "banners": "Banners",
    "corporate-gifts": "Corporate Gifts",
    "business-cards": "Business Cards",
  };

  return (
    <div className="min-h-screen bg-soft-gray">
      <aside className="fixed left-0 top-0 z-40 h-full w-64 bg-navy text-white">
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          <span className="font-heading font-bold">Admin</span>
        </div>
        <nav className="p-4 space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-white/80 hover:bg-white/10"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-white/80 hover:bg-white/10"
          >
            Orders
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center gap-3 rounded-lg bg-red/20 px-4 py-3 font-medium text-red"
          >
            <Package className="h-5 w-5" />
            Products
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-white/80 hover:bg-white/10"
          >
            Users & Roles
          </Link>
          <Link
            href="/admin/quotes"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-white/80 hover:bg-white/10"
          >
            Quote Requests
          </Link>
        </nav>
      </aside>

      <main className="ml-64 p-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal/70">
          <Link href="/" className="hover:text-red">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/admin" className="hover:text-red">Admin</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy">Products</span>
        </nav>

        <h1 className="font-heading text-section font-bold text-navy mb-2">
          Products
        </h1>
        <p className="text-charcoal/70 mb-8">
          {PRODUCTS.length} products in catalog. Products are managed in the codebase (src/lib/data/products.ts).
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="rounded-xl border border-charcoal/10 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-soft-gray">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-navy truncate">{product.name}</h3>
                  <p className="text-sm text-charcoal/70">
                    {categoryLabels[product.category] || product.category}
                  </p>
                  <p className="mt-1 font-bold text-navy">{formatPrice(product.basePrice)}</p>
                  <Link
                    href={`/products/${product.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-red hover:underline"
                  >
                    View on site
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
