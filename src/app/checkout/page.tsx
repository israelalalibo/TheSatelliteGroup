"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import type { ShippingAddress, DeliveryOption, Order } from "@/lib/types/order";

async function saveOrderToApi(
  orderNumber: string,
  orderData: {
    items: Order["items"];
    subtotal: number;
    deliveryFee: number;
    total: number;
    address: ShippingAddress;
    deliveryOption: DeliveryOption;
    paymentMethod: "card" | "transfer" | "delivery";
  }
) {
  try {
    await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderNumber,
        items: orderData.items,
        subtotal: orderData.subtotal,
        deliveryFee: orderData.deliveryFee,
        total: orderData.total,
        shippingAddress: orderData.address,
        deliveryOption: orderData.deliveryOption,
        paymentMethod: orderData.paymentMethod,
      }),
    });
  } catch {
    // Silently fail — order confirmation page still shows
  }
}

const PaystackPayment = dynamic(
  () => import("@/components/checkout/PaystackPayment").then((m) => ({ default: m.PaystackPayment })),
  { ssr: false }
);

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo",
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa",
  "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
  "Yobe", "Zamfara",
];

const DELIVERY_OPTIONS: DeliveryOption[] = [
  { id: "standard", name: "Standard Delivery", price: 2500, estimatedDays: "3-5 business days" },
  { id: "express", name: "Express Delivery", price: 5000, estimatedDays: "24-48 hours" },
  { id: "pickup", name: "Pickup (Asaba Office)", price: 0, estimatedDays: "Same day" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(`/auth/login?redirect=${encodeURIComponent("/checkout")}`);
    }
  }, [isAuthenticated, isLoading, router]);
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
  });
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>(DELIVERY_OPTIONS[0]);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer" | "delivery">("transfer");
  const [orderNotes, setOrderNotes] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [processing, setProcessing] = useState(false);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="section-padding">
        <div className="container-custom text-center">
          <div className="mx-auto max-w-lg py-16 text-charcoal/70">Loading...</div>
        </div>
      </div>
    );
  }

  if (items.length === 0 && step < 4) {
    return (
      <div className="section-padding">
        <div className="container-custom text-center">
          <h1 className="font-heading text-section font-bold text-navy">Your cart is empty</h1>
          <Link href="/products" className="btn-primary mt-6 inline-flex">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const deliveryFee = deliveryOption.price;
  const total = subtotal + deliveryFee;

  const canProceed = () => {
    if (step === 1) {
      return address.fullName && address.email && address.phone && address.address && address.city && address.state;
    }
    if (step === 2) return true;
    if (step === 3) return true;
    if (step === 4) return acceptedTerms;
    return false;
  };

  const buildOrderItems = (): Order["items"] =>
    items.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      options: item.selectedOptions.map((o) => o.label),
    }));

  const handlePlaceOrder = async () => {
    setProcessing(true);
    try {
      const orderNumber = `SG-${Date.now().toString(36).toUpperCase()}`;
      await saveOrderToApi(orderNumber, {
        items: buildOrderItems(),
        subtotal,
        deliveryFee,
        total,
        address,
        deliveryOption,
        paymentMethod,
      });
      clearCart();
      router.push(`/order-confirmation?order=${orderNumber}&method=${paymentMethod}`);
    } catch {
      setProcessing(false);
    }
  };

  const handlePaystackSuccess = async (ref: string) => {
    await saveOrderToApi(ref, {
      items: buildOrderItems(),
      subtotal,
      deliveryFee,
      total,
      address,
      deliveryOption,
      paymentMethod,
    });
    setProcessing(true);
    clearCart();
    router.push(`/order-confirmation?order=${ref}&method=card`);
  };

  const stepLabels = [
    { num: 1, label: "Shipping" },
    { num: 2, label: "Delivery" },
    { num: 3, label: "Payment" },
    { num: 4, label: "Review" },
  ];

  return (
    <div className="section-padding">
      <div className="container-custom">
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal/70">
          <Link href="/" className="hover:text-red">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/cart" className="hover:text-red">Cart</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy">Checkout</span>
        </nav>

        <h1 className="font-heading text-section font-bold text-navy mb-8">
          Checkout
        </h1>

        {/* Step indicator */}
        <div className="mb-12 flex justify-between">
          {stepLabels.map((s) => (
            <div key={s.num} className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold ${
                  step >= s.num ? "bg-red text-navy" : "bg-soft-gray text-charcoal/60"
                }`}
              >
                {s.num}
              </div>
              <span className="ml-2 hidden text-sm font-medium sm:inline">{s.label}</span>
              {s.num < 4 && <ChevronRight className="mx-2 h-4 w-4 text-charcoal/40" />}
            </div>
          ))}
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2 space-y-8">
            {step === 1 && (
              <div className="rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
                <h2 className="font-heading text-xl font-bold text-navy">Shipping Information</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-medium text-navy">Full Name *</label>
                    <input
                      type="text"
                      value={address.fullName}
                      onChange={(e) => setAddress((a) => ({ ...a, fullName: e.target.value }))}
                      className="w-full rounded-lg border border-charcoal/20 px-4 py-3"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-medium text-navy">Email *</label>
                    <input
                      type="email"
                      value={address.email}
                      onChange={(e) => setAddress((a) => ({ ...a, email: e.target.value }))}
                      className="w-full rounded-lg border border-charcoal/20 px-4 py-3"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-medium text-navy">Phone *</label>
                    <input
                      type="tel"
                      value={address.phone}
                      onChange={(e) => setAddress((a) => ({ ...a, phone: e.target.value }))}
                      className="w-full rounded-lg border border-charcoal/20 px-4 py-3"
                      placeholder="+234"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-medium text-navy">Company (optional)</label>
                    <input
                      type="text"
                      value={address.company}
                      onChange={(e) => setAddress((a) => ({ ...a, company: e.target.value }))}
                      className="w-full rounded-lg border border-charcoal/20 px-4 py-3"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-2 block font-medium text-navy">Address *</label>
                    <input
                      type="text"
                      value={address.address}
                      onChange={(e) => setAddress((a) => ({ ...a, address: e.target.value }))}
                      className="w-full rounded-lg border border-charcoal/20 px-4 py-3"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-medium text-navy">City *</label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))}
                      className="w-full rounded-lg border border-charcoal/20 px-4 py-3"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-medium text-navy">State *</label>
                    <select
                      value={address.state}
                      onChange={(e) => setAddress((a) => ({ ...a, state: e.target.value }))}
                      className="w-full rounded-lg border border-charcoal/20 px-4 py-3"
                      required
                    >
                      <option value="">Select state</option>
                      {NIGERIAN_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-2 block font-medium text-navy">Landmark (optional)</label>
                    <input
                      type="text"
                      value={address.landmark}
                      onChange={(e) => setAddress((a) => ({ ...a, landmark: e.target.value }))}
                      className="w-full rounded-lg border border-charcoal/20 px-4 py-3"
                      placeholder="e.g. Near the main market"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
                <h2 className="font-heading text-xl font-bold text-navy">Delivery Option</h2>
                <div className="mt-6 space-y-4">
                  {DELIVERY_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setDeliveryOption(opt)}
                      className={`flex w-full items-center justify-between rounded-lg border-2 p-4 text-left ${
                        deliveryOption.id === opt.id
                          ? "border-red bg-red/10"
                          : "border-charcoal/20 hover:border-red/50"
                      }`}
                    >
                      <div>
                        <p className="font-semibold text-navy">{opt.name}</p>
                        <p className="text-sm text-charcoal/70">{opt.estimatedDays}</p>
                      </div>
                      <p className="font-bold text-navy">
                        {opt.price === 0 ? "Free" : formatPrice(opt.price)}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
                <h2 className="font-heading text-xl font-bold text-navy">Payment Method</h2>
                <div className="mt-6 space-y-4">
                  {[
                    { id: "transfer" as const, label: "Bank Transfer (Recommended)", desc: "Pay via bank transfer—most common in Nigeria. Upload receipt after payment." },
                    { id: "card" as const, label: "Pay with Card (Paystack)", desc: "Visa, Mastercard, Verve" },
                    { id: "delivery" as const, label: "Pay on Delivery", desc: "Asaba only" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPaymentMethod(opt.id)}
                      className={`flex w-full items-center gap-4 rounded-lg border-2 p-4 text-left ${
                        paymentMethod === opt.id
                          ? "border-red bg-red/10"
                          : "border-charcoal/20 hover:border-red/50"
                      }`}
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-navy">{opt.label}</p>
                        <p className="text-sm text-charcoal/70">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-6">
                  <label className="mb-2 block font-medium text-navy">Order Notes (optional)</label>
                  <textarea
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-charcoal/20 px-4 py-3"
                    placeholder="Special instructions..."
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
                <h2 className="font-heading text-xl font-bold text-navy">Order Review</h2>
                <div className="mt-6 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-charcoal/70">Shipping to</p>
                    <p className="font-medium text-navy">{address.fullName}</p>
                    <p className="text-sm text-charcoal/80">{address.address}, {address.city}, {address.state}</p>
                    <p className="text-sm text-charcoal/80">{address.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-charcoal/70">Delivery</p>
                    <p className="font-medium text-navy">{deliveryOption.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-charcoal/70">Payment</p>
                    <p className="font-medium text-navy">
                      {paymentMethod === "card" && "Pay with Card"}
                      {paymentMethod === "transfer" && "Bank Transfer"}
                      {paymentMethod === "delivery" && "Pay on Delivery"}
                    </p>
                  </div>
                </div>
                <label className="mt-6 flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm text-charcoal/80">
                    I agree to the <Link href="/terms" className="text-red hover:underline">Terms & Conditions</Link> and{" "}
                    <Link href="/privacy" className="text-red hover:underline">Privacy Policy</Link>
                  </span>
                </label>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <div className="sticky top-24 rounded-xl border border-charcoal/10 bg-soft-gray p-6">
              <h2 className="font-heading text-xl font-bold text-navy">Order Summary</h2>
              <div className="mt-6 max-h-64 space-y-3 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white">
                      <Image src={item.product.image} alt="" fill className="object-cover" sizes="64px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-medium text-navy">{item.product.name}</p>
                      <p className="text-sm text-charcoal/70">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-navy shrink-0">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-2 border-t border-charcoal/20 pt-4">
                <div className="flex justify-between text-charcoal/80">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-charcoal/80">
                  <span>Delivery</span>
                  <span>{formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between font-bold text-navy text-lg">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="btn-secondary flex-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </button>
                )}
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s + 1)}
                    disabled={!canProceed()}
                    className="btn-primary flex-1 disabled:opacity-50"
                  >
                    Continue
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ) : paymentMethod === "card" ? (
                  <div className="flex-1">
                    <PaystackPayment
                      config={{
                        email: address.email,
                        amount: Math.round(total * 100), // kobo
                        reference: `SG-${Date.now()}`,
                      }}
                      onSuccess={handlePaystackSuccess}
                      onClose={() => {}}
                      disabled={!canProceed() || processing}
                    >
                      {processing ? "Processing..." : "Pay Now (₦" + total.toLocaleString() + ")"}
                    </PaystackPayment>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={!canProceed() || processing}
                    className="btn-primary flex-1 disabled:opacity-50"
                  >
                    {processing ? "Processing..." : "Place Order"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
