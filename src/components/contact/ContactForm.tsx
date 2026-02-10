"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("success");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl bg-white p-8 shadow-md"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block font-medium text-navy">
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-lg border border-charcoal/20 px-4 py-3 focus:border-red focus:outline-none focus:ring-2 focus:ring-red/20"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block font-medium text-navy">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-charcoal/20 px-4 py-3 focus:border-red focus:outline-none focus:ring-2 focus:ring-red/20"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-2 block font-medium text-navy">
            Phone *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="w-full rounded-lg border border-charcoal/20 px-4 py-3 focus:border-red focus:outline-none focus:ring-2 focus:ring-red/20"
            placeholder="+234 801 234 5678"
          />
        </div>
        <div>
          <label htmlFor="service" className="mb-2 block font-medium text-navy">
            Service Interested In
          </label>
          <select
            id="service"
            name="service"
            className="w-full rounded-lg border border-charcoal/20 px-4 py-3 focus:border-red focus:outline-none focus:ring-2 focus:ring-red/20"
          >
            <option value="">Select a service</option>
            <option value="branding">Custom Branding</option>
            <option value="printing">Corporate Printing</option>
            <option value="flyers">Flyers & Marketing Materials</option>
            <option value="gifts">Gifts & Souvenirs</option>
            <option value="monogramming">Monogramming</option>
            <option value="awards">Awards & Recognition</option>
            <option value="stickers">Stickers & Labels</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="message" className="mb-2 block font-medium text-navy">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-lg border border-charcoal/20 px-4 py-3 focus:border-red focus:outline-none focus:ring-2 focus:ring-red/20"
          placeholder="Tell us about your project..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary mt-6 inline-flex items-center gap-2"
      >
        {status === "loading" ? (
          "Sending..."
        ) : status === "success" ? (
          "Message Sent!"
        ) : (
          <>
            Send Message
            <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
