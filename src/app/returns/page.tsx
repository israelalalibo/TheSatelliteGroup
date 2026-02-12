import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Return & Refund Policy | Satelite Group",
  description: "Return and refund policy for Satelite Group printing services.",
};

export default function ReturnsPage() {
  return (
    <div className="section-padding">
      <div className="container-custom">
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal/70">
          <Link href="/" className="hover:text-red">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy">Return & Refund Policy</span>
        </nav>

        <h1 className="font-heading text-section font-bold text-navy mb-8">
          Return & Refund Policy
        </h1>

        <div className="prose prose-navy max-w-3xl space-y-6 text-charcoal/80">
          <p className="text-sm text-charcoal/60">Last updated: February 2026</p>
          <p>
            Due to the custom nature of our printing services, returns are generally not accepted
            except in cases of production errors or defects.
          </p>
          <h2 className="font-heading text-xl font-bold text-navy">Quality Issues</h2>
          <p>
            If you receive items with defects or errors on our part, contact us within 48 hours
            with photos. We will replace the order or offer a refund at our discretion.
          </p>
          <h2 className="font-heading text-xl font-bold text-navy">Refund Process</h2>
          <p>
            Approved refunds are processed within 5-10 business days to your original payment
            method.
          </p>
          <h2 className="font-heading text-xl font-bold text-navy">Contact</h2>
          <p>
            info@satelitechuksgroup.com, +234 810 265 2650.
          </p>
        </div>
      </div>
    </div>
  );
}
