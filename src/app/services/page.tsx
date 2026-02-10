import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowRight } from "lucide-react";

const SERVICES = [
  { name: "Printing Machines & Equipment", slug: "printing-machines", description: "Large format printers, heat press machines, mug presses, plotters, laminators, and all printing equipment for your business.", image: "/images/products/xp600-large-format.png" },
  { name: "Raw Materials & Substrates", slug: "raw-materials", description: "Flex banner rolls, self-adhesive vinyl, sublimation paper, ink, and all consumables for printing production.", image: "/images/products/flex-banner-rolls.png" },
  { name: "Flex Banner Printing", slug: "banner-printing", description: "Custom printed flex banners for outdoor and indoor signage. Frontlit, backlit, and blockout options with eyelet finishing.", image: "/images/products/flex-banner-warehouse.png" },
  { name: "Corporate Gifts & Branded Items", slug: "gifts-souvenirs", description: "Custom printed mugs, t-shirts, caps, and promotional merchandise using heat press and sublimation techniques.", image: "/images/products/heat-press-machine.png" },
  { name: "Vinyl Signage & Stickers", slug: "stickers-labels", description: "Self-adhesive vinyl for vehicle wraps, wall graphics, shop signage, and cut lettering in a wide range of colors and finishes.", image: "/images/products/vinyl-sticker-rolls.png" },
  { name: "Business Cards & Stationery", slug: "corporate-printing", description: "Premium business cards, letterheads, envelopes, and corporate stationery with silk, matte, and glossy finishes.", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80" },
  { name: "Supply & Logistics", slug: "supply-logistics", description: "Bulk supply and containerized shipping of printing materials across Nigeria and West Africa. Warehousing and distribution services.", image: "/images/products/flex-banner-shipping.png" },
];

export const metadata = {
  title: "Services | Satelite Group - Printing & Branding Nigeria",
  description: "Complete branding and printing solutions: custom branding, corporate printing, flyers, gifts, awards, stickers and more.",
};

export default function ServicesPage() {
  return (
    <div className="section-padding">
      <div className="container-custom">
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal/70">
          <Link href="/" className="hover:text-red">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy">Services</span>
        </nav>

        <div className="mb-12">
          <h1 className="font-heading text-section font-bold text-navy">
            Complete Printing Ecosystem
          </h1>
          <p className="mt-2 max-w-2xl text-charcoal/80">
            From printing machines and raw materials to finished products—we are involved in everything. One-stop shop for all your printing and branding needs.
          </p>
        </div>

        <div className="space-y-12">
          {SERVICES.map((service, index) => (
            <div
              key={service.slug}
              className={`flex flex-col gap-8 lg:flex-row lg:items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className="relative aspect-[16/10] flex-1 overflow-hidden rounded-xl lg:aspect-[4/3]">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="flex-1 lg:px-12">
                <h2 className="font-heading text-2xl font-bold text-navy md:text-3xl">
                  {service.name}
                </h2>
                <p className="mt-4 text-charcoal/80">{service.description}</p>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-red hover:gap-4"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
