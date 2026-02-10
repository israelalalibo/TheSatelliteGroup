"use client";

import { Package, Palette, CreditCard, Truck } from "lucide-react";
import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    icon: Package,
    title: "Choose Your Product",
    description: "Browse our catalog and select what you need. From business cards to large format printing.",
  },
  {
    number: "02",
    icon: Palette,
    title: "Customize Your Design",
    description: "Upload your artwork or use our templates. Our design guidelines ensure perfect results.",
  },
  {
    number: "03",
    icon: CreditCard,
    title: "Place Your Order",
    description: "Review, pay securely via Paystack or bank transfer, and confirm your order.",
  },
  {
    number: "04",
    icon: Truck,
    title: "We Deliver",
    description: "Receive your quality prints at your doorstep. Fast delivery across Nigeria.",
  },
];

export function HowItWorks() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-heading text-section font-bold text-navy">
            Getting Your Print is Easy
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-charcoal/80">
            Four simple steps from concept to delivery. We make premium printing
            accessible.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {index < STEPS.length - 1 && (
                <div className="absolute left-1/2 top-16 hidden h-0.5 w-full -translate-x-1/2 bg-navy/20 lg:block" />
              )}
              <div className="relative flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red/20 text-red">
                  <step.icon className="h-10 w-10" />
                </div>
                <span className="mt-4 font-heading text-4xl font-bold text-navy/20">
                  {step.number}
                </span>
                <h3 className="mt-2 font-heading text-xl font-semibold text-navy">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-charcoal/80">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
