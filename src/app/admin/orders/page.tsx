"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, ExternalLink, Receipt, FileImage, CheckCircle } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface Order {
  id: number;
  orderNumber: string;
  status: string;
  items: { productName: string; quantity: number; price: number }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  shippingAddress: { name?: string; email?: string; phone?: string };
  paymentMethod: string;
  receiptUrl: string | null;
  receiptUploadedAt: string | null;
  createdAt: string;
  customerEmail: string | null;
  customerName: string | null;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmingId, setConfirmingId] = useState<number | null>(null);

  const fetchOrders = () => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    fetch("/api/admin/orders", { credentials: "include", signal: controller.signal })
      .then(async (res) => {
        const text = await res.text();
        let data: { orders?: unknown[]; error?: string } = {};
        try {
          data = text ? JSON.parse(text) : {};
        } catch {
          throw new Error(res.ok ? "Invalid response" : `Server error (${res.status})`);
        }
        if (!res.ok) {
          throw new Error(data.error || `Failed to fetch orders (${res.status})`);
        }
        setOrders(Array.isArray(data.orders) ? (data.orders as Order[]) : []);
      })
      .catch((e) => setError(e.name === "AbortError" ? "Request timed out. Please try again." : e.message))
      .finally(() => {
        clearTimeout(timeout);
        setLoading(false);
      });
  };

  useEffect(() => fetchOrders, []);

  const confirmOrder = (orderId: number) => {
    setConfirmingId(orderId);
    setError(null);
    fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "confirmed" }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to confirm");
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: "confirmed" } : o))
        );
      })
      .catch((e) => setError(e.message))
      .finally(() => setConfirmingId(null));
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleString("en-NG", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return dateStr;
    }
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
            className="flex items-center gap-3 rounded-lg bg-red/20 px-4 py-3 font-medium text-red"
          >
            Orders
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-white/80 hover:bg-white/10"
          >
            Products
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-white/80 hover:bg-white/10"
          >
            Users & Roles
          </Link>
        </nav>
      </aside>

      <main className="ml-64 p-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal/70">
          <Link href="/" className="hover:text-red">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/admin" className="hover:text-red">Admin</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy">Orders</span>
        </nav>

        <h1 className="font-heading text-section font-bold text-navy mb-2">
          Orders
        </h1>
        <p className="text-charcoal/70 mb-8">
          View all orders and payment receipts uploaded by customers
        </p>

        {loading && <p className="text-charcoal/70">Loading orders...</p>}
        {error && (
          <div className="rounded-lg border border-red/30 bg-red/10 p-4">
            <p className="font-medium text-red">{error}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => fetchOrders()}
                className="rounded-lg bg-red px-4 py-2 text-sm font-medium text-white hover:bg-red-dark"
              >
                Try again
              </button>
              {error.toLowerCase().includes("access denied") && (
                <Link
                  href="/auth/login?redirect=/admin/orders"
                  className="rounded-lg border border-red px-4 py-2 text-sm font-medium text-red hover:bg-red/10"
                >
                  Log in again
                </Link>
              )}
            </div>
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="rounded-xl border border-charcoal/10 bg-white p-12 text-center">
            <p className="text-charcoal/70">No orders yet</p>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="font-semibold text-navy">
                        Order #{order.orderNumber}
                      </h2>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                          order.status === "confirmed"
                            ? "bg-success/20 text-success"
                            : order.status === "cancelled"
                            ? "bg-red/20 text-red"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {order.status}
                      </span>
                      <span className="text-sm text-charcoal/70 capitalize">
                        {order.paymentMethod}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-charcoal/70">
                      {formatDate(order.createdAt)}
                    </p>
                    {order.customerName && (
                      <p className="mt-1 text-sm text-charcoal/80">
                        {order.customerName}
                        {order.customerEmail && (
                          <span className="text-charcoal/60">
                            {" "}· {order.customerEmail}
                          </span>
                        )}
                      </p>
                    )}
                    <p className="mt-2 font-bold text-navy">
                      {formatPrice(order.total)}
                    </p>
                    <div className="mt-2 text-sm text-charcoal/70">
                      {Array.isArray(order.items) &&
                        order.items.slice(0, 3).map((item, i) => (
                          <span key={i}>
                            {item.productName} × {item.quantity}
                            {i < Math.min(order.items.length, 3) - 1 ? ", " : ""}
                          </span>
                        ))}
                      {Array.isArray(order.items) && order.items.length > 3 && (
                        <span> +{order.items.length - 3} more</span>
                      )}
                    </div>
                  </div>

                  {/* Receipt section & actions */}
                  <div className="flex flex-col gap-2 shrink-0">
                    {order.status === "pending" && (
                      <button
                        type="button"
                        onClick={() => confirmOrder(order.id)}
                        disabled={confirmingId === order.id}
                        className="inline-flex items-center gap-2 rounded-lg bg-success/20 px-4 py-2 font-medium text-success hover:bg-success/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <CheckCircle className="h-4 w-4" />
                        {confirmingId === order.id ? "Confirming..." : "Confirm Order"}
                      </button>
                    )}
                    {order.receiptUrl ? (
                      <>
                        <a
                          href={order.receiptUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg bg-red/20 px-4 py-2 font-medium text-red hover:bg-red/30 transition-colors"
                        >
                          <Receipt className="h-4 w-4" />
                          View Receipt
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                        {order.receiptUploadedAt && (
                          <p className="text-xs text-charcoal/60">
                            Uploaded {formatDate(order.receiptUploadedAt)}
                          </p>
                        )}
                        {/* Thumbnail preview */}
                        <div className="relative mt-2 h-20 w-24 overflow-hidden rounded border border-charcoal/10">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={order.receiptUrl}
                            alt={`Receipt for order ${order.orderNumber}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-2 text-charcoal/50 text-sm">
                        <FileImage className="h-4 w-4" />
                        No receipt uploaded
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
