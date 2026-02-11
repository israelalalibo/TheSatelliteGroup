"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Package, ShoppingCart, Users, BarChart3 } from "lucide-react";

// Demo admin - in production, protect with auth
const DEMO_STATS = {
  orders: 12,
  revenue: 245000,
  products: 24,
  customers: 89,
};

export default function AdminDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-soft-gray">
      <aside
        className={`fixed left-0 top-0 z-40 h-full w-64 bg-navy text-white transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          <span className="font-heading font-bold">Admin</span>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="p-2 hover:bg-white/10 rounded"
          >
            ←
          </button>
        </div>
        <nav className="p-4 space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-lg bg-red/20 px-4 py-3 font-medium text-red"
          >
            <BarChart3 className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-white/80 hover:bg-white/10"
          >
            <ShoppingCart className="h-5 w-5" />
            Orders
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-white/80 hover:bg-white/10"
          >
            <Package className="h-5 w-5" />
            Products
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-white/80 hover:bg-white/10"
          >
            <Users className="h-5 w-5" />
            Users & Roles
          </Link>
        </nav>
      </aside>

      {!sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="fixed left-4 top-4 z-30 rounded-lg bg-navy p-2 text-white"
        >
          ☰
        </button>
      )}

      <main className={`transition-all ${sidebarOpen ? "ml-64" : "ml-0"} p-8`}>
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal/70">
          <Link href="/" className="hover:text-red">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy">Admin</span>
        </nav>

        <h1 className="font-heading text-section font-bold text-navy mb-8">
          Dashboard
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red/20 text-red">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-charcoal/70">Orders</p>
                <p className="text-2xl font-bold text-navy">{DEMO_STATS.orders}</p>
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
                <p className="text-2xl font-bold text-navy">₦{DEMO_STATS.revenue.toLocaleString()}</p>
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
                <p className="text-2xl font-bold text-navy">{DEMO_STATS.products}</p>
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
                <p className="text-2xl font-bold text-navy">{DEMO_STATS.customers}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-navy mb-4">Recent Orders</h2>
          <p className="text-charcoal/70">Connect to backend API to display real orders.</p>
          <Link href="/admin/orders" className="btn-primary mt-4 inline-flex">
            View Orders
          </Link>
        </div>

        <p className="mt-8 text-sm text-charcoal/60">
          Admin dashboard foundation. Connect to your backend (e.g., Strapi, custom API) for full functionality.
        </p>
      </main>
    </div>
  );
}
