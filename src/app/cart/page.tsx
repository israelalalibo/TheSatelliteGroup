"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, subtotal, removeItem, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal/70">
            <Link href="/" className="hover:text-red">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-navy">Cart</span>
          </nav>

          <div className="mx-auto max-w-lg text-center">
            <h1 className="font-heading text-section font-bold text-navy">
              Your cart is empty
            </h1>
            <p className="mt-4 text-charcoal/80">
              Add some products to get started. Browse our catalog for premium printing
              solutions.
            </p>
            <Link href="/products" className="btn-primary mt-8 inline-flex">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-custom">
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal/70">
          <Link href="/" className="hover:text-red">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy">Cart</span>
        </nav>

        <h1 className="font-heading text-section font-bold text-navy mb-8">
          Shopping Cart
        </h1>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm sm:flex-row sm:items-center"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-soft-gray">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="flex-1">
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="font-semibold text-navy hover:text-red"
                  >
                    {item.product.name}
                  </Link>
                  {item.selectedOptions.length > 0 && (
                    <p className="mt-1 text-sm text-charcoal/70">
                      {item.selectedOptions.map((o) => o.label).join(", ")}
                    </p>
                  )}
                  {item.designFile && (
                    <p className="mt-1 text-sm text-charcoal/70">
                      Design: {item.designFile.name}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="flex items-center gap-2 rounded-lg border border-charcoal/20">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="p-2 hover:bg-soft-gray"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-[2rem] text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-soft-gray"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="font-bold text-navy min-w-[6rem] text-right">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-charcoal/60 hover:text-error"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div>
            <div className="sticky top-24 rounded-xl border border-charcoal/10 bg-soft-gray p-6">
              <h2 className="font-heading text-xl font-bold text-navy">Order Summary</h2>
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-charcoal/80">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-charcoal/80">
                  <span>Delivery</span>
                  <span className="text-sm">Calculated at checkout</span>
                </div>
              </div>
              <div className="mt-6 border-t border-charcoal/20 pt-4">
                <div className="flex justify-between font-bold text-navy">
                  <span>Total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <Link href="/checkout" className="btn-primary flex w-full justify-center">
                  Proceed to Checkout
                </Link>
                <Link
                  href="/products"
                  className="block text-center text-sm font-medium text-red hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
