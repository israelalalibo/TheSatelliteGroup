"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronRight, ChevronLeft, BarChart3, ShoppingCart, Package, Users, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/users", label: "Users & Roles", icon: Users },
  { href: "/admin/quotes", label: "Quote Requests", icon: FileText },
] as const;

interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Open sidebar by default on desktop, closed on mobile
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      setSidebarOpen(true);
    }
  }, []);

  // Close sidebar on route change (mobile only - so overlay doesn't stay open)
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [pathname]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-soft-gray">
      {/* Menu toggle - visible when sidebar closed (mobile + desktop) */}
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className={cn(
          "fixed top-4 left-4 z-40 flex h-10 w-10 items-center justify-center rounded-lg bg-navy text-white shadow-lg transition-all",
          "hover:bg-navy/90 active:scale-95",
          sidebarOpen ? "pointer-events-none opacity-0" : "opacity-100"
        )}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Backdrop - mobile only, when sidebar overlay is open */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Close menu"
        onClick={() => setSidebarOpen(false)}
        onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden",
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      {/* Sidebar - overlay on mobile, collapsible on desktop */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 max-w-[85vw] bg-navy text-white shadow-xl transition-transform duration-300 ease-out",
          "lg:max-w-none lg:shadow-none",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          <span className="font-heading font-bold">Admin</span>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || (href !== "/admin" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-lg px-4 py-3 transition-colors",
                  isActive
                    ? "bg-red/20 font-medium text-red"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                )}
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-5 w-5 shrink-0" />
                  {label}
                </span>
                <ChevronRight className={cn("h-5 w-5 shrink-0 -rotate-90", isActive ? "text-red" : "text-white/50")} />
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content - full width on mobile, offset when sidebar open on desktop */}
      <main
        className={cn(
          "min-h-screen p-6 pt-16 transition-all duration-300",
          "lg:pt-6 lg:pl-8",
          sidebarOpen ? "lg:ml-64" : "lg:ml-0"
        )}
      >
        {children}
      </main>
    </div>
  );
}
