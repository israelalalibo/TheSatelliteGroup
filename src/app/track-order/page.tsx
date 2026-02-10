"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Package, Search } from "lucide-react";

const MOCK_ORDER = {
  orderNumber: "SG-ABC123",
  status: "processing",
  estimatedDelivery: "Feb 10, 2026",
  timeline: [
    { status: "Order Placed", date: "Feb 3, 2026", description: "Your order has been received", completed: true },
    { status: "Processing", date: "Feb 4, 2026", description: "We're preparing your order", completed: true },
    { status: "Quality Check", date: "Feb 5, 2026", description: "Final quality inspection", completed: false },
    { status: "Shipped", date: "—", description: "Order dispatched for delivery", completed: false },
    { status: "Delivered", date: "—", description: "Order delivered", completed: false },
  ],
};

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [tracked, setTracked] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber.trim()) {
      setTracked(true);
      setNotFound(false);
    }
  };

  return (
    <div className="section-padding">
      <div className="container-custom">
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal/70">
          <Link href="/" className="hover:text-red">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy">Track Order</span>
        </nav>

        <h1 className="font-heading text-section font-bold text-navy mb-8">
          Track Your Order
        </h1>

        <form onSubmit={handleTrack} className="mx-auto max-w-lg rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <label htmlFor="order" className="mb-2 block font-medium text-navy">
                Order Number *
              </label>
              <input
                id="order"
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="e.g. SG-ABC123"
                className="w-full rounded-lg border border-charcoal/20 px-4 py-3"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block font-medium text-navy">
                Email *
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-lg border border-charcoal/20 px-4 py-3"
                required
              />
            </div>
            <button type="submit" className="btn-primary flex w-full items-center justify-center gap-2">
              <Search className="h-5 w-5" />
              Track Order
            </button>
          </div>
        </form>

        {tracked && !notFound && (
          <div className="mx-auto mt-12 max-w-2xl">
            <div className="rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-bold text-navy">
                  Order {MOCK_ORDER.orderNumber}
                </h2>
                <span className="rounded-full bg-red/20 px-4 py-1 font-semibold text-navy capitalize">
                  {MOCK_ORDER.status}
                </span>
              </div>
              <p className="mt-2 text-charcoal/70">
                Estimated delivery: {MOCK_ORDER.estimatedDelivery}
              </p>

              <div className="mt-8 space-y-6">
                {MOCK_ORDER.timeline.map((step, i) => (
                  <div key={step.status} className="flex gap-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        step.completed ? "bg-red text-navy" : "bg-soft-gray text-charcoal/60"
                      }`}
                    >
                      {("completed" in step ? step.completed : false) ? "✓" : i + 1}
                    </div>
                    <div className="flex-1 pb-6 border-b border-charcoal/10 last:border-0 last:pb-0">
                      <p className="font-semibold text-navy">{step.status}</p>
                      <p className="text-sm text-charcoal/70">{step.date}</p>
                      <p className="mt-1 text-sm text-charcoal/80">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link href="/contact" className="font-medium text-red hover:underline">
                Need help? Contact our support team
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
