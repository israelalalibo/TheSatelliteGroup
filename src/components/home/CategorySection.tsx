"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";

const CATEGORIES = [
  { name: "Printing Machines", slug: "printing-machines", image: "/images/products/xp600-large-format.png", startingPrice: 45000 },
  { name: "Flex Banner Material", slug: "raw-materials", image: "/images/products/flex-banner-rolls.png", startingPrice: 18000 },
  { name: "Vinyl & Stickers", slug: "stickers", image: "/images/products/vinyl-sticker-rolls.png", startingPrice: 2000 },
  { name: "Banner Printing", slug: "banners", image: "/images/products/flex-banner-warehouse.png", startingPrice: 1500 },
  { name: "Heat Press Machines", slug: "printing-machines", image: "/images/products/heat-press-machine.png", startingPrice: 45000 },
  { name: "Corporate Gifts", slug: "corporate-gifts", image: "/images/products/mug-cup-heat-press.png", startingPrice: 2500 },
  { name: "Business Cards", slug: "business-cards", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80", startingPrice: 8500 },
  { name: "Awards & Plaques", slug: "awards", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80", startingPrice: 8500 },
  { name: "Posters & Flyers", slug: "posters-flyers", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80", startingPrice: 150 },
];

export function CategorySection() {
  return (
    <section className="section-padding bg-soft-gray">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-heading text-section font-bold text-navy">
            Shop by Category
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-charcoal/80">
            Machines, raw materials, and printing services — everything you need under one roof.
          </p>
        </motion.div>

        <div className="mt-12 flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={`/products/${category.slug}`}
                className="card-hover group flex min-w-[280px] flex-col overflow-hidden rounded-xl bg-white shadow-md md:min-w-0"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 280px, 400px"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-navy group-hover:text-red">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-sm text-charcoal/70">
                    Starting from {formatPrice(category.startingPrice)}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
