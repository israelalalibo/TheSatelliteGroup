"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Upload, Send } from "lucide-react";

export default function QuoteRequestPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    quantity: "",
    deadline: "",
    designStatus: "have" as "have" | "need",
    message: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="font-heading text-section font-bold text-navy">
              Quote Request Received!
            </h1>
            <p className="mt-4 text-charcoal/80">
              Thank you for your interest. Our team will review your request and get back to you
              within 24 hours with a detailed quote.
            </p>
            <Link href="/products" className="btn-primary mt-8 inline-flex">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-custom">
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal/70">
          <Link href="/" className="hover:text-red">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy">Request Quote</span>
        </nav>

        <div className="mx-auto max-w-2xl">
          <h1 className="font-heading text-section font-bold text-navy">
            Request a Quote
          </h1>
          <p className="mt-2 text-charcoal/80">
            For custom/bulk orders, tell us about your project and we&apos;ll send a detailed quote.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6 rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm md:p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block font-medium text-navy">Full Name *</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                  required
                  className="w-full rounded-lg border border-charcoal/20 px-4 py-3"
                />
              </div>
              <div>
                <label className="mb-2 block font-medium text-navy">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  required
                  className="w-full rounded-lg border border-charcoal/20 px-4 py-3"
                />
              </div>
              <div>
                <label className="mb-2 block font-medium text-navy">Phone *</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  required
                  className="w-full rounded-lg border border-charcoal/20 px-4 py-3"
                  placeholder="+234"
                />
              </div>
              <div>
                <label className="mb-2 block font-medium text-navy">Company (optional)</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  className="w-full rounded-lg border border-charcoal/20 px-4 py-3"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block font-medium text-navy">Product/Service Interested In *</label>
              <select
                value={form.service}
                onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
                required
                className="w-full rounded-lg border border-charcoal/20 px-4 py-3"
              >
                <option value="">Select</option>
                <optgroup label="Printing & Branding">
                  <option value="flex-banner">Flex Banner Printing</option>
                  <option value="sav-stickers">SAV Sticker Printing</option>
                  <option value="posters-flyers">Posters & Flyers</option>
                  <option value="business-cards">Business Cards</option>
                  <option value="brochures-catalogs">Brochures & Catalogs</option>
                  <option value="invitations">Wedding & Event Invitations</option>
                  <option value="letterheads-notepads">Letterheads & Notepads</option>
                  <option value="rollup-banners">Roll-up & X-Banners</option>
                  <option value="calendars">Calendars</option>
                  <option value="billboards">Billboards & Outdoor Signage</option>
                  <option value="id-cards">PVC ID Cards</option>
                  <option value="banners">Banners (General)</option>
                  <option value="large-format">Large Format Printing</option>
                  <option value="engraving-etching">Engraving & Etching</option>
                </optgroup>
                <optgroup label="Apparel & Promotional">
                  <option value="corporate-gifts">Corporate Gifts</option>
                  <option value="t-shirts-polos-caps">T-Shirts, Polos & Caps</option>
                  <option value="towels">Towels</option>
                  <option value="bags">Customized & Ready-made Bags</option>
                  <option value="souvenirs">Souvenirs & Gift Items</option>
                </optgroup>
                <optgroup label="Awards & Recognition">
                  <option value="awards">Awards, Plaques & Trophies</option>
                  <option value="medals">Medals & Medallions</option>
                </optgroup>
                <optgroup label="Machines & Materials">
                  <option value="printing-machines">Printing Machines</option>
                  <option value="raw-materials">Raw Materials & Supplies</option>
                  <option value="signage-materials">Aluco, Foam Board, Dampa</option>
                </optgroup>
                <option value="branding">Branding Package</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block font-medium text-navy">Quantity Needed</label>
                <input
                  type="text"
                  value={form.quantity}
                  onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))}
                  placeholder="e.g. 500"
                  className="w-full rounded-lg border border-charcoal/20 px-4 py-3"
                />
              </div>
              <div>
                <label className="mb-2 block font-medium text-navy">Deadline</label>
                <input
                  type="date"
                  value={form.deadline}
                  onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))}
                  className="w-full rounded-lg border border-charcoal/20 px-4 py-3"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block font-medium text-navy">Design Status</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="designStatus"
                    checked={form.designStatus === "have"}
                    onChange={() => setForm((f) => ({ ...f, designStatus: "have" }))}
                  />
                  <span>I have my design</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="designStatus"
                    checked={form.designStatus === "need"}
                    onChange={() => setForm((f) => ({ ...f, designStatus: "need" }))}
                  />
                  <span>I need design help</span>
                </label>
              </div>
            </div>

            <div>
              <label className="mb-2 block font-medium text-navy">Reference File (optional)</label>
              <div
                onClick={() => document.getElementById("quote-file")?.click()}
                className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-dashed border-charcoal/20 px-4 py-3 hover:border-red/50"
              >
                <Upload className="h-5 w-5 text-charcoal/60" />
                <span className="text-charcoal/70">
                  {file ? file.name : "Click to upload design or reference file"}
                </span>
                <input
                  id="quote-file"
                  type="file"
                  accept=".pdf,.ai,.psd,.png,.jpg,.jpeg"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block font-medium text-navy">Additional Notes *</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                required
                rows={4}
                className="w-full rounded-lg border border-charcoal/20 px-4 py-3"
                placeholder="Describe your project, specifications, colors, etc."
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary flex items-center justify-center gap-2">
              <Send className="h-5 w-5" />
              {loading ? "Submitting..." : "Submit Quote Request"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
