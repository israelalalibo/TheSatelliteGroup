"use client";

import { Award, Zap, Wallet, Headphones } from "lucide-react";
import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "Only the finest materials and equipment for exceptional results that impress.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description:
      "Express delivery within 24-48 hours for urgent orders. We understand time matters.",
  },
  {
    icon: Wallet,
    title: "Competitive Pricing",
    description:
      "Affordable rates without compromising on quality. Best value in the region.",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description:
      "Dedicated team to guide you from design to delivery. We're here to help.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-navy text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-heading text-section font-bold">
            Why Businesses Trust Satelitechuks Group
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            We combine quality, speed, and expertise to deliver printing solutions that
            help your business stand out.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-xl border border-white/10 p-8 transition-all duration-300 hover:border-red/50 hover:bg-white/5"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red/20 text-red transition-colors group-hover:bg-red group-hover:text-navy">
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 font-heading text-xl font-semibold">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/80">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
