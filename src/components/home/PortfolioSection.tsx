"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PORTFOLIO_ITEMS } from "@/lib/data/portfolio";

export function PortfolioSection() {
  return (
    <section className="section-padding bg-soft-gray">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-between gap-4 md:flex-row"
        >
          <div>
            <h2 className="font-heading text-section font-bold text-navy">
              Our Work Speaks for Itself
            </h2>
            <p className="mt-2 text-charcoal/80">
              Explore our portfolio of completed projects
            </p>
          </div>
          <Link
            href="/portfolio"
            className="btn-primary"
          >
            View Full Portfolio
          </Link>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO_ITEMS.map((item, index) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/portfolio/${item.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy/80 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="text-sm font-medium text-red">{item.category}</span>
                    <h3 className="mt-2 text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
