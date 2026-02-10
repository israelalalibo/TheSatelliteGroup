"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronRight, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";
import type { CartItemOption } from "@/lib/types/cart";

export default function WishlistPage() {
  const router = useRouter();
  const { productIds, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("satellite-user");
    if (!stored) router.push("/auth/login");
    setMounted(true);
  }, [router]);

  if (!mounted) {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <div className="animate-pulse rounded-xl bg-soft-gray h-64" />
        </div>
      </div>
    );
  }

  const wishlistProducts = PRODUCTS.filter((p) => productIds.includes(p.id));

  const handleAddToCart = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    const options: CartItemOption[] = (product.options ?? [])
      .filter((opt) => opt.values[0])
      .map((opt) => ({
        optionId: opt.id,
        valueId: opt.values[0].id,
        label: opt.values[0].label,
        priceModifier: opt.values[0].priceModifier,
      }));
    const quantity = product.quantityTiers?.[0]
      ? Math.min(product.quantityTiers[0].max, product.quantityTiers[0].min + 50)
      : 100;
    const unitPrice = product.basePrice;
    addItem(product, quantity, options, unitPrice);
  };

  return (
    <div className="section-padding">
      <div className="container-custom">
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal/70">
          <Link href="/" className="hover:text-red">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/account" className="hover:text-red">Account</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy">Wishlist</span>
        </nav>

        <h1 className="font-heading text-section font-bold text-navy mb-8">Wishlist</h1>

        {wishlistProducts.length === 0 ? (
          <div className="rounded-xl border border-charcoal/10 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red/20 text-red">
              <Heart className="h-8 w-8" />
            </div>
            <p className="mt-4 font-medium text-navy">Your wishlist is empty</p>
            <p className="mt-2 text-charcoal/70">Save products you like by clicking the heart on product pages.</p>
            <Link href="/products" className="btn-primary mt-6 inline-flex">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-xl border border-charcoal/10 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <Link href={`/products/${product.slug}`} className="block relative aspect-[4/3] bg-soft-gray">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </Link>
                <div className="p-4">
                  <Link href={`/products/${product.slug}`}>
                    <h2 className="font-heading font-semibold text-navy hover:text-red line-clamp-2">
                      {product.name}
                    </h2>
                  </Link>
                  <p className="mt-1 font-bold text-red">{formatPrice(product.basePrice)}</p>
                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product.id)}
                      className="btn-primary flex flex-1 items-center justify-center gap-2 text-sm"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFromWishlist(product.id)}
                      className="rounded-lg border border-charcoal/20 p-2 hover:bg-error/10 hover:border-error/50 text-charcoal/70 hover:text-error"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
