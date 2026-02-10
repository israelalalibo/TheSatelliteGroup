"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Package, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface ApiOrder {
  id: number;
  orderNumber: string;
  status: string;
  items: Array<{ productName: string; quantity: number; unitPrice: number; options: string[] }>;
  subtotal: number;
  deliveryFee: number;
  total: number;
  shippingAddress: { fullName: string; city: string; state: string };
  paymentMethod: string;
  receiptUrl: string | null;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-success/20 text-success",
  cancelled: "bg-charcoal/20 text-charcoal/70",
};

export default function OrderHistoryPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("satellite-user");
    if (!stored) {
      router.push("/auth/login");
      return;
    }

    fetch("/api/orders")
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data) => setOrders(data.orders ?? []))
      .catch(() => router.push("/auth/login"))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <div className="animate-pulse rounded-xl bg-soft-gray h-64" />
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
          <Link href="/account" className="hover:text-red">Account</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy">Order History</span>
        </nav>

        <h1 className="font-heading text-section font-bold text-navy mb-8">Order History</h1>

        {orders.length === 0 ? (
          <div className="rounded-xl border border-charcoal/10 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-soft-gray text-charcoal/60">
              <Package className="h-8 w-8" />
            </div>
            <p className="mt-4 font-medium text-navy">No orders yet</p>
            <p className="mt-2 text-charcoal/70">Your orders will appear here after you place one.</p>
            <Link href="/products" className="btn-primary mt-6 inline-flex">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-heading text-lg font-bold text-red">{order.orderNumber}</p>
                    <p className="text-sm text-charcoal/70">
                      {new Date(order.createdAt).toLocaleDateString("en-NG", {
                        dateStyle: "medium",
                      })}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium capitalize ${statusColors[order.status] ?? "bg-soft-gray text-charcoal"}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="mt-4 border-t border-charcoal/10 pt-4">
                  <p className="text-sm text-charcoal/70">
                    {order.items.length} item(s) · {formatPrice(order.total)} total
                  </p>
                  <p className="mt-1 text-sm text-charcoal/60">
                    {order.shippingAddress.fullName} · {order.shippingAddress.city}, {order.shippingAddress.state}
                  </p>
                  {order.paymentMethod === "transfer" && order.receiptUrl && (
                    <p className="mt-2 text-sm text-success">✓ Receipt uploaded — pending confirmation</p>
                  )}
                </div>
                <Link
                  href={`/track-order?order=${encodeURIComponent(order.orderNumber)}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-red hover:underline"
                >
                  Track order
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
