import Link from "next/link";
import { ChevronRight, Truck, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Shipping & Delivery | Satelitechuks Group",
  description: "Shipping and delivery information for Satelitechuks Group.",
};

export default function ShippingPage() {
  return (
    <div className="section-padding">
      <div className="container-custom">
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal/70">
          <Link href="/" className="hover:text-red">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy">Shipping & Delivery</span>
        </nav>

        <h1 className="font-heading text-section font-bold text-navy mb-8">
          Shipping & Delivery
        </h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
            <Truck className="h-12 w-12 text-red" />
            <h2 className="mt-4 font-heading text-lg font-bold text-navy">Standard Delivery</h2>
            <p className="mt-2 text-charcoal/80">3-5 business days across Nigeria. Delivery fee applies.</p>
          </div>
          <div className="rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
            <Clock className="h-12 w-12 text-red" />
            <h2 className="mt-4 font-heading text-lg font-bold text-navy">Express Delivery</h2>
            <p className="mt-2 text-charcoal/80">24-48 hours. Available in major cities. Higher fee applies.</p>
          </div>
          <div className="rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm">
            <MapPin className="h-12 w-12 text-red" />
            <h2 className="mt-4 font-heading text-lg font-bold text-navy">Pickup (Free)</h2>
            <p className="mt-2 text-charcoal/80">Pick up from our Asaba office. Opposite Tac Joe filling station, Asaba Benin Express Way, beside mechanic village.</p>
          </div>
        </div>

        <div className="mt-12 max-w-3xl space-y-6 text-charcoal/80">
          <h2 className="font-heading text-xl font-bold text-navy">Delivery Areas</h2>
          <p>We deliver nationwide across Nigeria. Delivery fees are calculated at checkout based on your location.</p>
          <h2 className="font-heading text-xl font-bold text-navy">Tracking</h2>
          <p>Track your order using your order number and email on our <Link href="/track-order" className="text-red hover:underline">Track Order</Link> page.</p>
        </div>
      </div>
    </div>
  );
}
