import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Award, Target, Heart, Zap, Users } from "lucide-react";

const VALUES = [
  { icon: Award, title: "Quality", description: "We never compromise on the quality of our materials and output." },
  { icon: Heart, title: "Integrity", description: "Honest dealings and transparent pricing in every transaction." },
  { icon: Zap, title: "Innovation", description: "Embracing new technologies to serve you better." },
  { icon: Users, title: "Customer Focus", description: "Your success is our priority. We go the extra mile." },
];

export const metadata = {
  title: "About Us | Satelite Group - Premium Printing Nigeria",
  description: "Learn about Satelite Group - your trusted partner for premium printing and branding in Nigeria since our founding.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/products/large-format-plotter.png"
            alt="Satelite Group - Printing Machines & Branding"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
        <div className="relative container-custom flex min-h-[50vh] flex-col justify-center py-24">
          <nav className="absolute top-8 left-0 right-0 flex items-center gap-2 text-sm text-white/80 container-custom">
            <Link href="/" className="hover:text-red">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">About Us</span>
          </nav>
          <h1 className="font-heading text-hero font-bold text-white">
            Our Story
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            Building brands and creating impressions across Nigeria
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-heading text-section font-bold text-navy">
                Who We Are
              </h2>
              <div className="mt-6 space-y-4 text-charcoal/90 leading-relaxed">
                <p>
                  Satelite Group is a premier printing and branding company based in Asaba,
                  Delta State, Nigeria. Strategically located along the Asaba-Benin Express
                  Way, we serve businesses, corporations, event planners, individuals,
                  government agencies, NGOs, and institutions across Nigeria.
                </p>
                <p>
                  With a commitment to quality, innovation, and customer satisfaction, we
                  have become the go-to choice for premium printing solutions in the
                  South-South and South-East regions of Nigeria.
                </p>
                <p>
                  We are involved in everything—from selling printing machines and equipment
                  to supplying raw materials (paper, vinyl, ink, substrates) and delivering
                  finished products. Our range includes custom branding, corporate printing,
                  large format printing, promotional items, awards and recognition, stickers
                  and labels, plus equipment sales and consumables. Whatever your printing
                  needs, we have the expertise and resources to deliver exceptional results.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80"
                alt="Our workspace"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-soft-gray">
        <div className="container-custom">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="rounded-xl bg-white p-8 shadow-md">
              <Target className="h-12 w-12 text-red" />
              <h3 className="mt-6 font-heading text-xl font-bold text-navy">Our Mission</h3>
              <p className="mt-4 text-charcoal/80">
                To provide exceptional printing and branding solutions that help
                businesses and individuals make lasting impressions, through quality
                craftsmanship, innovative services, and unwavering customer commitment.
              </p>
            </div>
            <div className="rounded-xl bg-white p-8 shadow-md">
              <Award className="h-12 w-12 text-red" />
              <h3 className="mt-6 font-heading text-xl font-bold text-navy">Our Vision</h3>
              <p className="mt-4 text-charcoal/80">
                To be the leading printing and branding company in Nigeria, recognized for
                excellence, innovation, and our contribution to the success of businesses
                across the nation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="font-heading text-section font-bold text-navy">
              Our Core Values
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-charcoal/80">
              The principles that guide everything we do
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-soft-gray p-8 text-center transition-colors hover:border-red/50 hover:bg-soft-gray/50"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red/20 text-red">
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="mt-6 font-heading text-lg font-semibold text-navy">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm text-charcoal/80">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-navy">
        <div className="container-custom text-center">
          <h2 className="font-heading text-section font-bold text-white">
            Ready to Work With Us?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Let&apos;s bring your branding vision to life. Get in touch today for a quote
            or consultation.
          </p>
          <Link
            href="/contact"
            className="btn-red mt-8 inline-flex"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
