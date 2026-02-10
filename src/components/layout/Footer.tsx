import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const FOOTER_LINKS = {
  products: [
    { label: "Business Cards", href: "/products/business-cards" },
    { label: "Flyers", href: "/products/flyers" },
    { label: "Banners", href: "/products/banners" },
    { label: "Corporate Gifts", href: "/products/corporate-gifts" },
    { label: "Awards", href: "/products/awards" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
    { label: "Track Order", href: "/track-order" },
    { label: "Login", href: "/auth/login" },
  ],
  support: [
    { label: "FAQs", href: "/faqs" },
    { label: "Request Quote", href: "/quote" },
    { label: "Shipping & Delivery", href: "/shipping" },
    { label: "Return Policy", href: "/returns" },
    { label: "Payment Options", href: "/payment" },
  ],
};

const SOCIAL_LINKS = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-custom section-padding">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block">
              <span className="font-heading text-xl font-bold">
                Satelite<span className="text-red">Group</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              Premium printing, custom branding, and corporate gifting solutions trusted by
              businesses across Nigeria. Transform your brand with us.
            </p>
            <div className="mt-4 flex gap-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  className="rounded-full p-2 text-white/80 transition-colors hover:bg-red hover:text-navy"
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-red">Quick Links</h4>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-red"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-red">Products</h4>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-red"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-red">Contact Us</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li>
                Opposite Tacjo Filling Station, by Asaba Modern Mechanic Village, along
                Asaba-Benin Express Way, Asaba, Delta State, Nigeria
              </li>
              <li>
                <a href="tel:+2348012345678" className="hover:text-red">
                  +234 801 234 5678
                </a>
              </li>
              <li>
                <a href="mailto:info@satelitegroup.com" className="hover:text-red">
                  info@satelitegroup.com
                </a>
              </li>
              <li>Mon - Sat: 8AM - 6PM</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Satelite Group. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/terms" className="text-white/60 hover:text-red">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="text-white/60 hover:text-red">
              Privacy Policy
            </Link>
            <Link href="/returns" className="text-white/60 hover:text-red">
              Return Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
