"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Package, Heart, User, LogOut } from "lucide-react";

interface UserData {
  email: string;
  fullName?: string;
  phone?: string;
  accountType?: string;
}

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("satellite-user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        router.push("/auth/login");
      }
    } else {
      router.push("/auth/login");
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("satellite-user");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <div className="animate-pulse rounded-xl bg-soft-gray h-64" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="section-padding">
      <div className="container-custom">
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal/70">
          <Link href="/" className="hover:text-red">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy">My Account</span>
        </nav>

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-section font-bold text-navy">
              Welcome back{user.fullName ? `, ${user.fullName}` : ""}
            </h1>
            <p className="mt-1 text-charcoal/80">{user.email}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-charcoal/20 px-4 py-2 text-sm font-medium hover:bg-soft-gray"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/account/orders"
            className="flex items-center gap-4 rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red/20 text-red">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-navy">Order History</h2>
              <p className="text-sm text-charcoal/70">View and track your orders</p>
            </div>
            <ChevronRight className="h-4 w-4 text-charcoal/40 ml-auto" />
          </Link>

          <Link
            href="/account/wishlist"
            className="flex items-center gap-4 rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red/20 text-red">
              <Heart className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-navy">Wishlist</h2>
              <p className="text-sm text-charcoal/70">Your saved products</p>
            </div>
            <ChevronRight className="h-4 w-4 text-charcoal/40 ml-auto" />
          </Link>

          <Link
            href="/account/profile"
            className="flex items-center gap-4 rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red/20 text-red">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-navy">Profile</h2>
              <p className="text-sm text-charcoal/70">Manage your account</p>
            </div>
            <ChevronRight className="h-4 w-4 text-charcoal/40 ml-auto" />
          </Link>
        </div>

        <div className="mt-12 rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-navy">Recent Orders</h2>
          <p className="mt-4 text-charcoal/70">No orders yet. Start shopping!</p>
          <Link href="/products" className="btn-primary mt-4 inline-flex">
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
