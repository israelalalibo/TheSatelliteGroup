import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { PRODUCTS } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";
import { SearchResults } from "./SearchResults";

const CATEGORIES = [
  { name: "Printing Machines & Equipment", slug: "printing-machines", count: PRODUCTS.filter((p) => p.category === "printing-machines").length, image: "/images/products/xp600-large-format.png" },
  { name: "Raw Materials & Substrates", slug: "raw-materials", count: PRODUCTS.filter((p) => p.category === "raw-materials").length, image: "/images/products/flex-banner-rolls.png" },
  { name: "Banners & Signage", slug: "banners", count: PRODUCTS.filter((p) => p.category === "banners").length, image: "/images/products/flex-banner-warehouse.png" },
  { name: "Corporate Gifts & Branded Items", slug: "corporate-gifts", count: PRODUCTS.filter((p) => p.category === "corporate-gifts").length, image: "/images/products/heat-press-machine.png" },
  { name: "Business Cards", slug: "business-cards", count: PRODUCTS.filter((p) => p.category === "business-cards").length, image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80" },
  { name: "Posters & Flyers", slug: "posters-flyers", count: PRODUCTS.filter((p) => p.category === "posters-flyers").length, image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80" },
  { name: "Brochures & Catalogs", slug: "brochures-catalogs", count: PRODUCTS.filter((p) => p.category === "brochures-catalogs").length, image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80" },
  { name: "Wedding & Event Invitations", slug: "invitations", count: PRODUCTS.filter((p) => p.category === "invitations").length, image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80" },
  { name: "Calendars", slug: "calendars", count: PRODUCTS.filter((p) => p.category === "calendars").length, image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&q=80" },
  { name: "Vinyl & Stickers", slug: "stickers", count: PRODUCTS.filter((p) => p.category === "stickers").length, image: "/images/products/vinyl-sticker-rolls.png" },
  { name: "Awards & Recognition", slug: "awards", count: PRODUCTS.filter((p) => p.category === "awards").length, image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80" },
  { name: "Signage Materials", slug: "signage-materials", count: PRODUCTS.filter((p) => p.category === "signage-materials").length, image: "/images/products/flex-banner-warehouse.png" },
];

export const metadata = {
  title: "Products | Satelitechuks Group - Premium Printing Nigeria",
  description: "Browse our range of premium printing products: business cards, flyers, banners, corporate gifts, awards, and more.",
};

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q?.trim() || "";

  // If there's a search query, filter products and show results
  if (query) {
    const q = query.toLowerCase();
    const results = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().replace("-", " ").includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );

    return (
      <div className="section-padding">
        <div className="container-custom">
          <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal/70">
            <Link href="/" className="hover:text-red">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/products" className="hover:text-red">Products</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-navy">Search</span>
          </nav>

          <SearchResults query={query} initialResults={results} />
        </div>
      </div>
    );
  }

  // Default: show category grid
  return (
    <div className="section-padding">
      <div className="container-custom">
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal/70">
          <Link href="/" className="hover:text-red">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy">Products</span>
        </nav>

        <div className="mb-12">
          <h1 className="font-heading text-section font-bold text-navy">Our Products</h1>
          <p className="mt-2 text-charcoal/80">
            Machines, raw materials, and finished products—everything for printing and branding
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/products/${category.slug}`}
              className="group overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-navy/50 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                  <span className="rounded-full bg-red px-4 py-2 font-semibold text-navy">
                    View {category.count} Products
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h2 className="font-heading text-xl font-semibold text-navy group-hover:text-red">
                  {category.name}
                </h2>
                <p className="mt-1 text-sm text-charcoal/70">
                  {category.count} products available
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
