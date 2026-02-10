import Link from "next/link";
import { ChevronRight, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact Us | Satelite Group - Premium Printing Nigeria",
  description: "Get in touch with Satelite Group for printing and branding services. Located in Asaba, Delta State, Nigeria.",
};

export default function ContactPage() {
  return (
    <div className="section-padding">
      <div className="container-custom">
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal/70">
          <Link href="/" className="hover:text-red">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy">Contact</span>
        </nav>

        <div className="mb-12">
          <h1 className="font-heading text-section font-bold text-navy">
            Get in Touch
          </h1>
          <p className="mt-2 max-w-2xl text-charcoal/80">
            Have a question or need a quote? We&apos;re here to help. Reach out through any
            of the channels below.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl bg-navy p-8 text-white">
              <h3 className="font-heading text-xl font-bold text-red">
                Contact Information
              </h3>
              <ul className="mt-6 space-y-6">
                <li className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 shrink-0 text-red" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="mt-1 text-sm text-white/80">
                      Opposite Tacjo Filling Station, by Asaba Modern Mechanic Village,
                      along Asaba-Benin Express Way, Asaba, Delta State, Nigeria
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Phone className="h-6 w-6 shrink-0 text-red" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href="tel:+2348012345678" className="mt-1 block text-sm text-white/80 hover:text-red">
                      +234 801 234 5678
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Mail className="h-6 w-6 shrink-0 text-red" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:info@satelitegroup.com" className="mt-1 block text-sm text-white/80 hover:text-red">
                      info@satelitegroup.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-sm">Mon - Sat: 8AM - 6PM</span>
                </li>
              </ul>
            </div>

            <a
              href="https://wa.me/2348012345678"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 font-semibold text-white transition-colors hover:bg-[#20BD5A]"
            >
              <MessageCircle className="h-6 w-6" />
              Chat on WhatsApp
            </a>

            <Link href="/quote" className="btn-secondary flex w-full justify-center">
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
