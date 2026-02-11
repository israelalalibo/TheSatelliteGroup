import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import { getProductBySlug, getProductsByCategory, getRelatedProducts } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";
import { ProductConfig } from "@/components/product/ProductConfig";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGallery } from "@/components/product/ProductGallery";

const CATEGORY_NAMES: Record<string, string> = {
  "business-cards": "Business Cards",
  flyers: "Flyers",
  "posters-flyers": "Posters & Flyers",
  banners: "Banners",
  "corporate-gifts": "Corporate Gifts",
  awards: "Awards & Recognition",
  stickers: "Vinyl & Stickers",
  "printing-machines": "Printing Machines",
  "raw-materials": "Raw Materials",
  "brochures-catalogs": "Brochures & Catalogs",
  invitations: "Wedding & Event Invitations",
  calendars: "Calendars",
  "signage-materials": "Signage Materials",
};

const CATEGORIES = Object.keys(CATEGORY_NAMES);

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  const categoryName = CATEGORY_NAMES[slug];
  if (product) {
    return {
      title: `${product.name} | Satelite Group - Premium Printing Nigeria`,
      description: product.shortDescription,
    };
  }
  if (categoryName) {
    return {
      title: `${categoryName} | Satelite Group - Premium Printing Nigeria`,
      description: `Shop ${categoryName} - premium printing at Satelite Group.`,
    };
  }
  return { title: "Product Not Found" };
}

export default async function ProductOrCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  const isCategory = CATEGORIES.includes(slug);

  // Category listing page
  if (isCategory && !product) {
    const products = getProductsByCategory(slug);
    const categoryName = CATEGORY_NAMES[slug];

    return (
      <div className="section-padding">
        <div className="container-custom">
          <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal/70">
            <Link href="/" className="hover:text-red">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/products" className="hover:text-red">Products</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-navy">{categoryName}</span>
          </nav>

          <div className="mb-8">
            <h1 className="font-heading text-section font-bold text-navy">{categoryName}</h1>
            <p className="mt-2 text-charcoal/80">
              {products.length > 0 ? `${products.length} products available` : "No products in this category yet."}
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <Link href="/products" className="btn-primary mt-6 inline-flex">
              View All Products
            </Link>
          )}
        </div>
      </div>
    );
  }

  // Product detail page
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <div className="section-padding">
      <div className="container-custom">
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal/70">
          <Link href="/" className="hover:text-red">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/products" className="hover:text-red">Products</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <ProductGallery
              name={product.name}
              images={product.images?.length ? product.images : [product.image]}
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="font-heading text-2xl font-bold text-navy md:text-3xl">
              {product.name}
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center gap-1 text-red">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-medium">{product.rating}</span>
              </div>
              <span className="text-sm text-charcoal/60">
                ({product.reviewCount} reviews)
              </span>
            </div>
            <p className="mt-4 text-charcoal/80">{product.shortDescription}</p>

            <ul className="mt-4 space-y-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-charcoal/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-red" />
                  {f}
                </li>
              ))}
            </ul>

            <ProductConfig product={product} />
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <div className="border-b border-charcoal/20">
            <h2 className="font-heading text-xl font-semibold text-navy">Description</h2>
          </div>
          <div className="mt-6 text-charcoal/80">
            <p>{product.description}</p>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-navy">You May Also Like</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
