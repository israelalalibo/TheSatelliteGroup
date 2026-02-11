"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Package, ShoppingCart, Users, BarChart3 } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface DashboardStats {
  orders: number;
  revenue: number;
  customers: number;
  products: number;
  recentOrders: {
    id: number;
    orderNumber: string;
    status: string;
    total: number;
    createdAt: string;
    customerEmail: string | null;
    customerName: string | null;
  }[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats", { credentials: "include" })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok && data.orders !== undefined) {
          setStats({
            orders: data.orders ?? 0,
            revenue: data.revenue ?? 0,
            customers: data.customers ?? 0,
            products: data.products ?? 0,
            recentOrders: data.recentOrders ?? [],
          });
        }
      })
      .catch(() => setStats({ orders: 0, revenue: 0, customers: 0, products: 0, recentOrders: [] }))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal/70">
          <Link href="/" className="hover:text-red">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy">Admin</span>
        </nav>

        <h1 className="font-heading text-section font-bold text-navy mb-8">
          Dashboard
        </h1>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm animate-pulse">
                <div className="h-12 w-12 rounded-full bg-charcoal/10" />
                <div className="mt-4 h-6 w-24 rounded bg-charcoal/10" />
                <div className="mt-2 h-8 w-16 rounded bg-charcoal/10" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red/20 text-red">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-charcoal/70">Orders</p>
                  <p className="text-2xl font-bold text-navy">{stats?.orders ?? 0}</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/20 text-success">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-charcoal/70">Revenue</p>
                  <p className="text-2xl font-bold text-navy">{stats ? formatPrice(stats.revenue) : "₦0"}</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange/20 text-orange">
                  <Package className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-charcoal/70">Products</p>
                  <p className="text-2xl font-bold text-navy">{stats?.products ?? 0}</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy/20 text-navy">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-charcoal/70">Customers</p>
                  <p className="text-2xl font-bold text-navy">{stats?.customers ?? 0}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-navy mb-4">Recent Orders</h2>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 rounded bg-charcoal/10 animate-pulse" />
              ))}
            </div>
          ) : stats?.recentOrders && stats.recentOrders.length > 0 ? (
            <div className="space-y-3">
              {stats.recentOrders.map((order) => (
                <Link
                  key={order.id}
                  href="/admin/orders"
                  className="flex items-center justify-between rounded-lg border border-charcoal/10 px-4 py-3 hover:bg-soft-gray/50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-navy">#{order.orderNumber}</p>
                    <p className="text-sm text-charcoal/70">
                      {order.customerName || order.customerEmail || "Guest"} · {formatPrice(order.total)}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      order.status === "confirmed" ? "bg-success/20 text-success" : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-charcoal/70">No orders yet</p>
          )}
          <Link href="/admin/orders" className="btn-primary mt-4 inline-flex">
            View All Orders
          </Link>
        </div>
    </>
  );
}
