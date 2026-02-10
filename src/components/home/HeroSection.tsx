"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, Truck, Shield, Users } from "lucide-react";
import { motion } from "framer-motion";

const TRUST_BADGES = [
  { icon: Truck, text: "Fast Delivery" },
  { icon: Shield, text: "Quality Guaranteed" },
  { icon: Users, text: "5,000+ Happy Customers" },
];

export function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      router.push(`/products?q=${encodeURIComponent(q)}`);
    }
  };

  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/products/flex-banner-warehouse.png"
          alt="Satelite Group — printing machines, raw materials, and branding"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative container-custom flex min-h-[90vh] flex-col items-center justify-center py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <h1 className="font-heading text-hero font-bold leading-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
            Transform Your Brand.
            <br />
            <span className="text-red">Elevate Your Business.</span>
          </h1>
          <p className="mt-6 text-lg text-white/90 md:text-xl">
            Printing machines, raw materials, and finished products—one-stop shop for
            everything printing and branding. Trusted by businesses across Nigeria.
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8"
          >
            <form
              onSubmit={handleSearch}
              className="mx-auto flex max-w-xl overflow-hidden rounded-full bg-white/95 shadow-xl backdrop-blur-sm"
            >
              <div className="flex flex-1 items-center gap-2 px-6 py-4">
                <Search className="h-5 w-5 text-charcoal/60" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What would you like to print today?"
                  className="flex-1 bg-transparent text-charcoal placeholder:text-charcoal/60 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-navy px-6 py-4 font-semibold text-white transition-colors hover:bg-red hover:text-navy"
              >
                Search
              </button>
            </form>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/products" className="btn-red w-full sm:w-auto">
              Explore Products
            </Link>
            <Link href="/contact" className="btn-secondary w-full border-white text-white hover:bg-white hover:text-navy sm:w-auto">
              Get a Quote
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-8"
          >
            {TRUST_BADGES.map((badge) => (
              <div
                key={badge.text}
                className="flex items-center gap-2 text-white/90"
              >
                <badge.icon className="h-5 w-5 text-red" />
                <span className="font-medium">✓ {badge.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
