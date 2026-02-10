"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { PRODUCTS } from "@/lib/data/products";
import { ProductCardImage } from "@/components/product/ProductCardImage";

const FEATURED = PRODUCTS.slice(0, 4);

function FeaturedCard({
  product,
  index,
}: {
  product: (typeof PRODUCTS)[0];
  index: number;
}) {
  const images = product.images?.length ? product.images : [product.image];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="card-hover overflow-hidden rounded-xl bg-white shadow-md">
          <ProductCardImage
            name={product.name}
            images={images}
            aspectClass="aspect-square"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          <div className="p-4">
            <h3 className="font-semibold text-navy group-hover:text-red">
              {product.name}
            </h3>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex items-center gap-1 text-red">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
              <span className="text-sm text-charcoal/60">
                ({product.reviewCount} reviews)
              </span>
            </div>
            <p className="mt-2 font-bold text-navy">{formatPrice(product.basePrice)}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function FeaturedProducts() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-between gap-4 md:flex-row"
        >
          <div>
            <h2 className="font-heading text-section font-bold text-navy">
              Popular Products
            </h2>
            <p className="mt-2 text-charcoal/80">
              Best sellers trusted by Nigerian businesses
            </p>
          </div>
          <Link
            href="/products"
            className="font-semibold text-red hover:underline"
          >
            View All Products →
          </Link>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED.map((product, index) => (
            <FeaturedCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
