"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    quote:
      "Satelite Group delivered exceptional business cards for our company. The quality exceeded our expectations and the turnaround time was impressive.",
    name: "Adebayo Okonkwo",
    company: "Tech Solutions Ltd",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
  },
  {
    quote:
      "We've used Satelite Group for all our event materials for the past 2 years. Reliable, professional, and the best printing quality in Asaba.",
    name: "Chioma Nwosu",
    company: "Events Pro Nigeria",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 5,
  },
  {
    quote:
      "Their corporate branding package transformed our business presence. The logo design and stationery were exactly what we needed.",
    name: "Emeka Okorie",
    company: "Delta Agro Industries",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
  },
];

export function TestimonialsSection() {
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
            What Our Clients Say
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-charcoal/80">
            Join thousands of satisfied businesses across Nigeria
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl border border-soft-gray bg-white p-8 shadow-md"
            >
              <Quote className="h-10 w-10 text-red/30" />
              <p className="mt-4 text-charcoal/90">{testimonial.quote}</p>
              <div className="mt-6 flex items-center gap-2">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-red text-red" />
                ))}
              </div>
              <div className="mt-6 flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="font-semibold text-navy">{testimonial.name}</p>
                  <p className="text-sm text-charcoal/70">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
