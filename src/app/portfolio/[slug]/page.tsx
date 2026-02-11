import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { getPortfolioItemBySlug } from "@/lib/data/portfolio";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const item = getPortfolioItemBySlug(slug);
  if (!item) return { title: "Portfolio | Satelitechuks Group" };
  return {
    title: `${item.title} | Portfolio | Satelitechuks Group`,
    description: item.description,
  };
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getPortfolioItemBySlug(slug);

  if (!item) notFound();

  return (
    <div className="section-padding">
      <div className="container-custom">
        <nav className="mb-8 flex items-center gap-2 text-sm text-charcoal/70">
          <Link href="/" className="hover:text-red">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/portfolio" className="hover:text-red">Portfolio</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-navy">{item.title}</span>
        </nav>

        <Link
          href="/portfolio"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-charcoal hover:text-red"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>

        <article className="mx-auto max-w-4xl">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-soft-gray">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy/90 to-transparent p-6">
              <span className="text-sm font-medium text-red">{item.category}</span>
              <h1 className="font-heading text-2xl font-bold text-white md:text-3xl">
                {item.title}
              </h1>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-charcoal/10 bg-white p-6 shadow-sm md:p-8">
            <h2 className="font-heading text-lg font-semibold text-navy">Project Overview</h2>
            <p className="mt-4 text-charcoal/80 leading-relaxed">
              {item.description}
            </p>
            <p className="mt-6 text-sm text-charcoal/70">
              Interested in a similar project?{" "}
              <Link href="/contact" className="font-medium text-red hover:underline">
                Get in touch
              </Link>{" "}
              for a quote.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
