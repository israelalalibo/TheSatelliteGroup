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
                      Opposite Tac Joe filling station, Asaba Benin Express Way,
                      beside mechanic village
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Phone className="h-6 w-6 shrink-0 text-red" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <div className="mt-1 space-y-1 text-sm text-white/80">
                      <a href="tel:+2348102652650" className="block hover:text-red">+234 810 265 2650</a>
                      <a href="tel:+2348033250403" className="block hover:text-red">+234 803 325 0403</a>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Mail className="h-6 w-6 shrink-0 text-red" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:info@satelitechuksgroup.com" className="mt-1 block text-sm text-white/80 hover:text-red">
                      info@satelitechuksgroup.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-sm">Mon - Sat: 8AM - 6PM</span>
                </li>
              </ul>
            </div>

            <a
              href="https://wa.me/2348102652650"
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
