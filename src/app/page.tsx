import { HeroSection } from "@/components/home/HeroSection";
import { CategorySection } from "@/components/home/CategorySection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PortfolioSection } from "@/components/home/PortfolioSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <WhyChooseUs />
      <ServicesShowcase />
      <HowItWorks />
      <PortfolioSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
