import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | Satelite Group",
  description: "Terms and conditions for Satelite Group printing and branding services.",
};

export default function TermsPage() {
  return (
    <div className="section-padding">
      <div className="container-custom">
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal/70">
          <Link href="/" className="hover:text-red">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy">Terms & Conditions</span>
        </nav>

        <h1 className="font-heading text-section font-bold text-navy mb-8">
          Terms & Conditions
        </h1>

        <div className="prose prose-navy max-w-3xl space-y-6 text-charcoal/80">
          <p className="text-sm text-charcoal/60">Last updated: February 2026</p>
          <p>
            Welcome to Satelite Group. By using our website and services, you agree to these Terms
            and Conditions. Please read them carefully.
          </p>
          <h2 className="font-heading text-xl font-bold text-navy">1. Services</h2>
          <p>
            Satelite Group provides premium printing, branding, and corporate gifting services. Our
            services are subject to availability and we reserve the right to refuse orders at our
            discretion.
          </p>
          <h2 className="font-heading text-xl font-bold text-navy">2. Orders & Payment</h2>
          <p>
            All orders are subject to acceptance and availability. Payment is required before
            production begins unless otherwise agreed. We accept payment via Paystack (cards, bank
            transfer, USSD) and pay on delivery for eligible orders.
          </p>
          <h2 className="font-heading text-xl font-bold text-navy">3. Design & Artwork</h2>
          <p>
            You are responsible for ensuring your artwork meets our design guidelines. We are not
            liable for errors resulting from incorrect file formats, resolution, or bleed
            specifications.
          </p>
          <h2 className="font-heading text-xl font-bold text-navy">4. Delivery</h2>
          <p>
            Delivery times are estimates. We are not liable for delays caused by circumstances
            beyond our control. Risk of loss passes to you upon delivery.
          </p>
          <h2 className="font-heading text-xl font-bold text-navy">5. Contact</h2>
          <p>
            For questions about these terms, contact us at info@satelitegroup.com or +234 801 234
            5678.
          </p>
        </div>
      </div>
    </div>
  );
}
