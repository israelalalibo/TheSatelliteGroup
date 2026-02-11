import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { PORTFOLIO_ITEMS } from "@/lib/data/portfolio";

export const metadata = {
  title: "Portfolio | Satelitechuks Group - Our Work",
  description: "Explore our portfolio of completed printing and branding projects.",
};

export default function PortfolioPage() {
  return (
    <div className="section-padding">
      <div className="container-custom">
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal/70">
          <Link href="/" className="hover:text-red">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy">Portfolio</span>
        </nav>

        <div className="mb-12">
          <h1 className="font-heading text-section font-bold text-navy">
            Our Work Speaks for Itself
          </h1>
          <p className="mt-2 max-w-2xl text-charcoal/80">
            Browse our portfolio of completed projects across various industries
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO_ITEMS.map((item) => (
            <Link
              key={item.slug}
              href={`/portfolio/${item.slug}`}
              className="group block overflow-hidden rounded-xl shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy/80 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-sm font-medium text-red">{item.category}</span>
                  <h2 className="mt-2 text-lg font-semibold text-white">{item.title}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
