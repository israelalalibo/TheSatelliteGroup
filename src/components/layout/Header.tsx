"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Phone, Mail, MapPin, ShoppingCart, Search, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { SearchModal } from "@/components/ui/SearchModal";

const TOP_LINKS = [
  { href: "tel:+2348012345678", icon: Phone, text: "+234 801 234 5678" },
  { href: "mailto:info@satelitegroup.com", icon: Mail, text: "info@satelitegroup.com" },
  { href: "#", icon: MapPin, text: "Asaba, Delta State" },
];

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const router = useRouter();
  const { lineItemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<{ email?: string; fullName?: string } | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("satellite-user");
      setUser(stored ? (JSON.parse(stored) as { email?: string; fullName?: string }) : null);
    } catch {
      setUser(null);
    }
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("satellite-user");
    setUser(null);
    setProfileOpen(false);
    setMobileMenuOpen(false);
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    router.push("/");
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      )}
    >
      {/* Top Bar */}
      <div className="hidden bg-navy text-white lg:block">
        <div className="container-custom flex items-center justify-between py-2 text-sm">
          <div className="flex items-center gap-6">
            {TOP_LINKS.map((link) => (
              <a
                key={link.text}
                href={link.href}
                className="flex items-center gap-2 hover:text-red transition-colors"
              >
                <link.icon className="h-4 w-4" />
                <span>{link.text}</span>
              </a>
            ))}
          </div>
          <div className="text-sm opacity-90">Mon - Sat: 8AM - 6PM</div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="container-custom">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading text-xl font-bold text-navy md:text-2xl">
              Satelite<span className="text-red">Group</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium text-charcoal transition-colors hover:text-red"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Search"
              className="hidden p-2 text-charcoal hover:text-red md:block"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/cart"
              className="relative hidden p-2 text-charcoal hover:text-red md:block"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {lineItemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 min-w-[1rem] items-center justify-center rounded-full bg-red px-1 text-xs font-bold text-navy">
                  {lineItemCount > 99 ? "99+" : lineItemCount}
                </span>
              )}
            </Link>
            {user ? (
              <div className="relative hidden md:block">
                <button
                  type="button"
                  onClick={() => setProfileOpen((o) => !o)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-red/20 text-red hover:bg-red/30 transition-colors"
                  aria-label="Account menu"
                  aria-expanded={profileOpen}
                >
                  <User className="h-5 w-5" />
                </button>
                {profileOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      aria-hidden="true"
                      onClick={() => setProfileOpen(false)}
                    />
                    <div className="absolute right-0 top-full z-20 mt-2 w-48 rounded-lg border border-charcoal/10 bg-white py-1 shadow-lg">
                      <Link
                        href="/account"
                        className="block px-4 py-2 text-sm text-navy hover:bg-soft-gray"
                        onClick={() => setProfileOpen(false)}
                      >
                        My Account
                      </Link>
                      <Link
                        href="/account/orders"
                        className="block px-4 py-2 text-sm text-navy hover:bg-soft-gray"
                        onClick={() => setProfileOpen(false)}
                      >
                        Order History
                      </Link>
                      <Link
                        href="/account/wishlist"
                        className="block px-4 py-2 text-sm text-navy hover:bg-soft-gray"
                        onClick={() => setProfileOpen(false)}
                      >
                        Wishlist
                      </Link>
                      <Link
                        href="/account/profile"
                        className="block px-4 py-2 text-sm text-navy hover:bg-soft-gray"
                        onClick={() => setProfileOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-charcoal hover:bg-soft-gray"
                      >
                        <LogOut className="h-4 w-4" />
                        Log out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="hidden font-medium text-charcoal hover:text-red md:inline-flex"
              >
                Login
              </Link>
            )}
            <Link
              href="/contact"
              className="hidden rounded-lg bg-navy px-4 py-2 font-semibold text-white transition-colors hover:bg-red hover:text-navy md:inline-flex"
            >
              Get a Quote
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-soft-gray bg-white lg:hidden">
          <nav className="container-custom flex flex-col py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="border-b border-soft-gray py-3 font-medium text-charcoal hover:text-red"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/cart"
                className="flex items-center gap-2 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5" />
                Cart {lineItemCount > 0 && `(${lineItemCount})`}
              </Link>
              {user ? (
                <>
                  <Link
                    href="/account"
                    className="flex items-center gap-2 font-medium py-2 border-b border-soft-gray"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    Account
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-2 font-medium py-2 text-left text-charcoal hover:text-red"
                  >
                    <LogOut className="h-5 w-5" />
                    Log out
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="flex items-center gap-2 font-medium py-2 border-b border-soft-gray"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  Login
                </Link>
              )}
              <Link
                href="/contact"
                className="btn-primary mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get a Quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
