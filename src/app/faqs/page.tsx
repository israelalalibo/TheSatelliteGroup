"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown, Search } from "lucide-react";

const FAQ_CATEGORIES = [
  {
    name: "Ordering & Pricing",
    questions: [
      {
        q: "How do I place an order?",
        a: "Browse our products, select your options (quantity, paper type, etc.), upload your design, and add to cart. Proceed to checkout to complete your order. You can also order via WhatsApp for personal assistance.",
      },
      {
        q: "Are prices in Nigerian Naira?",
        a: "Yes, all our prices are displayed in Nigerian Naira (₦). We accept payment via Paystack (cards, bank transfer, USSD) and pay on delivery for Asaba orders.",
      },
      {
        q: "Do you offer bulk discounts?",
        a: "Yes! Our quantity-based pricing automatically applies discounts for larger orders. The more you order, the lower the per-unit price. Contact us for custom bulk quotes.",
      },
    ],
  },
  {
    name: "Design & Artwork",
    questions: [
      {
        q: "What file formats do you accept?",
        a: "We accept PDF, AI, PSD, PNG, JPG, and TIFF. PDF is preferred for print-ready files. Maximum file size is 50MB per file.",
      },
      {
        q: "What are your design guidelines?",
        a: "Include 3mm bleed for full-bleed designs. Keep important content within the safe zone (5mm from trim). Use CMYK color mode for best print results. 300 DPI minimum for images.",
      },
      {
        q: "Can you design for me?",
        a: "Yes! We offer professional design services. Select the design service option during checkout or contact us for a custom quote. Our design team will create print-ready artwork for you.",
      },
    ],
  },
  {
    name: "Delivery & Shipping",
    questions: [
      {
        q: "How long does delivery take?",
        a: "Standard delivery: 3-5 business days across Nigeria. Express delivery: 24-48 hours. Pickup from our Asaba office: Same day for ready orders.",
      },
      {
        q: "Do you deliver outside Asaba?",
        a: "Yes! We deliver nationwide across Nigeria. Delivery fees vary by location and are calculated at checkout.",
      },
      {
        q: "Can I pick up my order?",
        a: "Yes, pickup is free from our Asaba office: Opposite Tac Joe filling station, Asaba Benin Express Way, beside mechanic village.",
      },
    ],
  },
  {
    name: "Payment",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept card payments (Visa, Mastercard, Verve) via Paystack, bank transfer, USSD, and pay on delivery for orders within Asaba.",
      },
      {
        q: "Is my payment secure?",
        a: "Yes. We use Paystack for secure payment processing. We never store your card details. All transactions are encrypted.",
      },
    ],
  },
  {
    name: "Returns & Refunds",
    questions: [
      {
        q: "What if I'm not satisfied with my order?",
        a: "Contact us within 48 hours of delivery with photos. We'll work to resolve any quality issues. Custom-printed items may have limited return options.",
      },
      {
        q: "Can I cancel my order?",
        a: "Orders can be cancelled if they haven't entered production. Contact us immediately. Once production has started, cancellation may not be possible.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-charcoal/10">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left font-medium text-navy hover:text-red"
      >
        <span>{q}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="pb-4 text-charcoal/80">{a}</p>}
    </div>
  );
}

export default function FAQsPage() {
  const [search, setSearch] = useState("");

  const filteredCategories = FAQ_CATEGORIES.map((cat) => ({
    ...cat,
    questions: cat.questions.filter(
      (q) =>
        q.q.toLowerCase().includes(search.toLowerCase()) ||
        q.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.questions.length > 0);

  return (
    <div className="section-padding">
      <div className="container-custom">
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal/70">
          <Link href="/" className="hover:text-red">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy">FAQs</span>
        </nav>

        <h1 className="font-heading text-section font-bold text-navy mb-8">
          Frequently Asked Questions
        </h1>

        <div className="relative mb-12 max-w-xl">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal/50" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs..."
            className="w-full rounded-lg border border-charcoal/20 py-3 pl-12 pr-4 focus:border-red focus:outline-none focus:ring-2 focus:ring-red/20"
          />
        </div>

        <div className="space-y-12">
          {filteredCategories.map((cat) => (
            <div key={cat.name}>
              <h2 className="font-heading text-xl font-bold text-navy mb-6">{cat.name}</h2>
              <div className="rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
                {cat.questions.map((item, i) => (
                  <FAQItem key={i} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-xl bg-soft-gray p-8 text-center">
          <h2 className="font-heading text-xl font-bold text-navy">Still have questions?</h2>
          <p className="mt-2 text-charcoal/80">Our team is here to help.</p>
          <Link href="/contact" className="btn-primary mt-6 inline-flex">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
