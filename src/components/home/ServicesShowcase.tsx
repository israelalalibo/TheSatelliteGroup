"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  {
    title: "Printing Machines & Equipment",
    description: "Large format printers, heat press machines, mug presses, plotters, laminators—everything you need to set up or scale your print shop.",
    image: "/images/products/xp600-large-format.png",
    href: "/products/printing-machines",
  },
  {
    title: "Flex Banner & Raw Materials",
    description: "Premium PVC flex banner rolls, self-adhesive vinyl, sublimation paper, ink, and all printing substrates. Bulk supply with nationwide delivery.",
    image: "/images/products/flex-banner-rolls.png",
    href: "/products/raw-materials",
  },
  {
    title: "Large Format Banner Printing",
    description: "Custom eco-solvent flex banner printing for outdoor and indoor signage. High-resolution output with eyelet finishing included.",
    image: "/images/products/flex-banner-warehouse.png",
    href: "/products/banners",
  },
  {
    title: "Heat Press & Sublimation",
    description: "Heat press machines for t-shirts, mugs, caps, and more. We supply the machines and do the printing — everything for custom branded merchandise.",
    image: "/images/products/heat-press-machine.png",
    href: "/products/corporate-gifts",
  },
  {
    title: "Vinyl Signage & Vehicle Wraps",
    description: "Self-adhesive vinyl rolls in every color and finish for shop signage, vehicle wraps, wall graphics, and cut lettering.",
    image: "/images/products/vinyl-sticker-rolls.png",
    href: "/products/raw-materials",
  },
  {
    title: "Supply Chain & Logistics",
    description: "Containerized shipping and bulk distribution of flex banners, vinyl, and printing materials across Nigeria and West Africa.",
    image: "/images/products/flex-banner-shipping.png",
    href: "/contact",
  },
];

export function ServicesShowcase() {
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
            Complete Printing Ecosystem
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-charcoal/80">
            From machines and raw materials to finished products—we are involved in everything. One-stop shop for all your printing needs.
          </p>
        </motion.div>

        <div className="mt-16 space-y-16">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col gap-8 lg:flex-row lg:items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="relative aspect-[16/10] flex-1 overflow-hidden rounded-xl lg:aspect-[4/3]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="flex-1 lg:px-12">
                <h3 className="font-heading text-2xl font-bold text-navy md:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-4 text-charcoal/80">{service.description}</p>
                <Link
                  href={service.href}
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-red hover:gap-4 hover:text-red-dark"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
