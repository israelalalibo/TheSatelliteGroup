"use client";

import { useState, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, MessageCircle, Heart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { DesignUpload } from "./DesignUpload";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/data/products";
import type { CartItemOption } from "@/lib/types/cart";

interface ProductConfigProps {
  product: Product;
}

function getUnitPrice(
  product: Product,
  quantity: number,
  selectedOptions: Record<string, string>
): number {
  let base = 0;
  if (product.quantityTiers && product.quantityTiers.length > 0) {
    const tier = product.quantityTiers.find(
      (t) => quantity >= t.min && quantity <= t.max
    );
    base = tier ? tier.pricePerUnit * quantity : product.basePrice;
  } else {
    base = product.basePrice * quantity;
  }

  let optionModifier = 0;
  product.options?.forEach((opt) => {
    const valId = selectedOptions[opt.id];
    if (valId) {
      const val = opt.values.find((v) => v.id === valId);
      if (val?.priceModifier) optionModifier += val.priceModifier;
    }
  });

  return base + optionModifier;
}

const QUANTITY_OPTIONS = [50, 100, 250, 500, 1000, 2500, 5000];

export function ProductConfig({ product }: ProductConfigProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  const [quantity, setQuantity] = useState(100);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.options?.forEach((opt) => {
      if (opt.values[0]) initial[opt.id] = opt.values[0].id;
    });
    return initial;
  });
  const [designFile, setDesignFile] = useState<{ name: string; url: string; size: number } | null>(null);
  const [added, setAdded] = useState(false);

  const unitPrice = useMemo(
    () => getUnitPrice(product, quantity, selectedOptions),
    [product, quantity, selectedOptions]
  );

  const cartOptions: CartItemOption[] = useMemo(() => {
    return (product.options ?? [])
      .filter((opt) => selectedOptions[opt.id])
      .map((opt) => {
        const val = opt.values.find((v) => v.id === selectedOptions[opt.id]);
        return {
          optionId: opt.id,
          valueId: val!.id,
          label: val!.label,
          priceModifier: val?.priceModifier,
        };
      });
  }, [product.options, selectedOptions]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      router.push(`/auth/login?redirect=${encodeURIComponent(pathname || `/products/${product.slug}`)}`);
      return;
    }
    addItem(product, quantity, cartOptions, Math.round(unitPrice / quantity), designFile ?? undefined);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      router.push(`/auth/login?redirect=${encodeURIComponent(pathname || `/products/${product.slug}`)}`);
      return;
    }
    toggleWishlist(product.id);
  };

  const whatsappMessage = product.basePrice > 0
    ? `Hi! I'd like to order: ${product.name}, Quantity: ${quantity}, Price: ${formatPrice(unitPrice)}`
    : `Hi! I'm interested in: ${product.name}. Please send me a quote.`;

  return (
    <div className="mt-8 space-y-6">
      {/* Price */}
      <div className="rounded-xl bg-soft-gray p-6">
        {product.basePrice > 0 ? (
          <>
            <p className="text-sm text-charcoal/70">Starting from</p>
            <p className="text-2xl font-bold text-navy">{formatPrice(unitPrice)}</p>
            <p className="mt-1 text-sm text-charcoal/60">
              {formatPrice(unitPrice / quantity)} per unit
            </p>
          </>
        ) : (
          <p className="text-xl font-bold text-navy">Contact for price</p>
        )}
      </div>

      {/* Quantity */}
      {product.quantityTiers && (
        <div>
          <label className="block font-medium text-navy">Quantity</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {QUANTITY_OPTIONS.filter((q) =>
              product.quantityTiers!.some((t) => q >= t.min && q <= t.max)
            ).map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setQuantity(q)}
                className={`rounded-lg border-2 px-4 py-2 font-medium transition-colors ${
                  quantity === q
                    ? "border-red bg-red/10 text-navy"
                    : "border-charcoal/20 hover:border-red/50"
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Options */}
      {product.options?.map((opt) => (
        <div key={opt.id}>
          <label className="block font-medium text-navy">{opt.name}</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {opt.values.map((val) => (
              <button
                key={val.id}
                type="button"
                onClick={() =>
                  setSelectedOptions((s) => ({ ...s, [opt.id]: val.id }))
                }
                className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-colors ${
                  selectedOptions[opt.id] === val.id
                    ? "border-red bg-red/10 text-navy"
                    : "border-charcoal/20 hover:border-red/50"
                }`}
              >
                {val.label}
                {val.priceModifier ? ` (+${formatPrice(val.priceModifier)})` : ""}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Design Upload */}
      <DesignUpload
        onFileChange={(f) =>
          setDesignFile(f ? { name: f.name, url: f.url, size: f.size } : null)
        }
      />

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        {product.basePrice > 0 && (
          <button
            type="button"
            onClick={handleAddToCart}
            className="btn-primary flex flex-1 items-center justify-center gap-2"
          >
            <ShoppingCart className="h-5 w-5" />
            {added ? "Added to Cart!" : "Add to Cart"}
          </button>
        )}
        <a
          href={`https://wa.me/2348102652650?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex items-center justify-center gap-2"
        >
          <MessageCircle className="h-5 w-5" />
          Order via WhatsApp
        </a>
        <button
          type="button"
          onClick={handleWishlistToggle}
          className={`rounded-lg border-2 p-3 transition-colors ${
            inWishlist
              ? "border-red bg-red/10 text-red"
              : "border-charcoal/20 hover:border-red/50"
          }`}
          aria-label={inWishlist ? "Remove from wishlist" : "Save to wishlist"}
        >
          <Heart className={`h-5 w-5 ${inWishlist ? "fill-current" : ""}`} />
        </button>
      </div>
    </div>
  );
}
