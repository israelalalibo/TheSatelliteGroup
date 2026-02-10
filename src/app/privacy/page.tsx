import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Satelite Group",
  description: "Privacy policy for Satelite Group.",
};

export default function PrivacyPage() {
  return (
    <div className="section-padding">
      <div className="container-custom">
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal/70">
          <Link href="/" className="hover:text-red">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy">Privacy Policy</span>
        </nav>

        <h1 className="font-heading text-section font-bold text-navy mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-navy max-w-3xl space-y-6 text-charcoal/80">
          <p className="text-sm text-charcoal/60">Last updated: February 2026</p>
          <p>
            Satelite Group respects your privacy. This policy describes how we collect, use, and
            protect your personal information.
          </p>
          <h2 className="font-heading text-xl font-bold text-navy">Information We Collect</h2>
          <p>
            We collect information you provide when ordering, contacting us, or creating an
            account: name, email, phone, address, and payment information (processed securely by
            Paystack).
          </p>
          <h2 className="font-heading text-xl font-bold text-navy">How We Use Your Information</h2>
          <p>
            We use your information to process orders, communicate with you, improve our services,
            and send relevant offers (with your consent).
          </p>
          <h2 className="font-heading text-xl font-bold text-navy">Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information.
            Payment data is handled by Paystack and we do not store card details.
          </p>
          <h2 className="font-heading text-xl font-bold text-navy">Contact</h2>
          <p>
            For privacy inquiries: info@satelitegroup.com, +234 801 234 5678.
          </p>
        </div>
      </div>
    </div>
  );
}
