"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate API call - replace with actual newsletter subscription
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="section-padding bg-gradient-navy">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-heading text-section font-bold text-white">
            Get Exclusive Offers & Design Tips
          </h2>
          <p className="mt-4 text-white/80">
            Subscribe and get 10% off your first order. Plus, receive branding tips and
            exclusive offers directly in your inbox.
          </p>

          <form onSubmit={handleSubmit} className="mt-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 rounded-lg border-0 px-6 py-4 text-charcoal focus:ring-2 focus:ring-red"
                disabled={status === "loading"}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-red inline-flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === "loading" ? (
                  "Subscribing..."
                ) : status === "success" ? (
                  "Subscribed!"
                ) : (
                  <>
                    Subscribe
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
