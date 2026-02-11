import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowRight } from "lucide-react";

const SERVICES = [
  // Printing & Branding Services
  { name: "Printing Machines & Equipment", slug: "printing-machines", description: "Large format printers, heat press machines, mug presses, plotters, laminators, embroidery machines, die cutting machines—everything you need for your print shop.", image: "/images/products/xp600-large-format.png", href: "/products/printing-machines" },
  { name: "Raw Materials & Substrates", slug: "raw-materials", description: "Flex banner rolls, self-adhesive vinyl (SAV), sublimation paper, printing inks, reflective flex, reflective SAV, and all consumables for printing production.", image: "/images/products/flex-banner-rolls.png", href: "/products/raw-materials" },
  { name: "Flex Banner Printing", slug: "banner-printing", description: "Custom printed flex banners for outdoor and indoor signage. Frontlit, backlit, mesh, and blockout options with eyelet finishing.", image: "/images/products/flex-banner-warehouse.png", href: "/products/banners" },
  { name: "SAV Sticker Printing", slug: "stickers-labels", description: "Self-adhesive vinyl for car branding, wall wraps, window graphics, shop signage, and cut lettering in a wide range of colors and finishes.", image: "/images/products/vinyl-sticker-rolls.png", href: "/products/stickers" },
  { name: "Posters & Flyers", slug: "posters-flyers", description: "High-quality posters and flyers for events, promotions, and marketing. Various sizes and finishes available.", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80", href: "/quote" },
  { name: "Business Cards & Stationery", slug: "corporate-printing", description: "Premium business cards, letterheads, branded notepads, envelopes, and corporate stationery with silk, matte, and glossy finishes.", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80", href: "/products/business-cards" },
  { name: "Brochures & Catalogs", slug: "brochures-catalogs", description: "Professional brochures and product catalogs for your business. Multiple formats and binding options available.", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80", href: "/quote" },
  { name: "Wedding & Event Invitations", slug: "invitations", description: "Elegant wedding invitations, event invites, and thank-you cards. Custom designs and premium finishes.", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80", href: "/quote" },
  { name: "Roll-up Banners & X-Banners", slug: "rollup-banners", description: "Portable roll-up banners and X-banners for exhibitions, trade shows, and indoor displays. Easy set-up and professional finish.", image: "/images/products/flex-banner-warehouse.png", href: "/products/banners" },
  { name: "Calendars", slug: "calendars", description: "Wall and desk calendars with custom branding. Great for corporate gifts and promotional giveaways.", image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&q=80", href: "/quote" },
  { name: "Billboards & Outdoor Signage", slug: "billboards-signage", description: "Large format billboards and outdoor signage. Durable, weather-resistant materials for high-impact advertising.", image: "/images/products/flex-banner-warehouse.png", href: "/products/banners" },
  { name: "PVC ID Cards", slug: "id-cards", description: "Professional PVC ID cards for staff, events, and membership. Durable and customizable.", image: "https://images.unsplash.com/photo-1611329854583-3758c8489909?w=600&q=80", href: "/quote" },
  { name: "Vinyl Cutting & Heat Transfer", slug: "vinyl-heat-transfer", description: "Vinyl cutting and heat transfer printing for apparel, mugs, and promotional items. Custom designs and branding.", image: "/images/products/heat-press-machine.png", href: "/products/corporate-gifts" },
  { name: "Large Format Printing", slug: "large-format", description: "Large format printing for banners, posters, signage, and point-of-sale displays. High-resolution eco-solvent output.", image: "/images/products/xp600-large-format.png", href: "/products/banners" },
  { name: "Engraving & Etching", slug: "engraving-etching", description: "Engraving and etching services for awards, plaques, signage, and custom metal or acrylic items.", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&q=80", href: "/products/awards" },
  // Apparel & Promotional Items
  { name: "Branded T-Shirts, Polos & Caps", slug: "apparel", description: "Custom branded t-shirts, polos, and caps for corporate events, uniforms, and promotional giveaways.", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80", href: "/products/corporate-gifts" },
  { name: "Towels (Plain & Branded)", slug: "towels", description: "Plain and branded towels for events, hotels, and promotional use. Sublimation and embroidery options.", image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80", href: "/quote" },
  { name: "Customized & Ready-made Bags", slug: "bags", description: "Customized bags (production and branding) and ready-made bags—paper, nylon, tote, and cotton bags for events and promotions.", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80", href: "/quote" },
  { name: "Souvenirs & Gift Items", slug: "gifts-souvenirs", description: "Custom printed mugs, flasks, plates, and promotional merchandise using heat press and sublimation techniques.", image: "/images/products/heat-press-machine.png", href: "/products/corporate-gifts" },
  // Awards & Recognition
  { name: "Awards, Plaques & Trophies", slug: "awards", description: "Awards, plaques, trophies, medals, and medallions for corporate recognition and events.", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&q=80", href: "/products/awards" },
  // Building & Signage Materials
  { name: "Aluco Boards", slug: "aluco-boards", description: "Aluco boards for signage, building facades, and architectural applications. Durable and weather-resistant.", image: "/images/products/flex-banner-warehouse.png", href: "/quote" },
  { name: "Dampa (Dampalon) Ceiling Materials", slug: "dampa-ceiling", description: "Dampa (Dampalon) ceiling materials for interior applications. Quality materials for construction and renovation.", image: "/images/products/flex-banner-warehouse.png", href: "/quote" },
  { name: "Foam Board", slug: "foam-board", description: "Foam board for signage, displays, and mounting. Lightweight and versatile for exhibitions and presentations.", image: "/images/products/flex-banner-warehouse.png", href: "/quote" },
  // Supply & Logistics
  { name: "Supply & Logistics", slug: "supply-logistics", description: "Bulk supply and containerized shipping of printing materials across Nigeria and West Africa. Warehousing and distribution services.", image: "/images/products/flex-banner-shipping.png", href: "/contact" },
];

export const metadata = {
  title: "Services | Satelite Group - Printing & Branding Nigeria",
  description: "Complete printing, branding, and promotional solutions: flex banners, SAV stickers, business cards, posters, flyers, apparel, awards, plaques, machines, raw materials, signage, and more.",
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
                  href={service.href}
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
