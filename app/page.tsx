import {
  HeroBanner,
  FeaturedProducts,
  PromotionBanner,
  NewsletterCTA,
  WhyChooseUs,
  CustomerTestimonials,
} from "./components/home";

export default function HomePage() {
  return (
    <main className="bg-background text-foreground">
      <HeroBanner />
      <FeaturedProducts />
      <WhyChooseUs />
      <PromotionBanner />
      <CustomerTestimonials />
      <NewsletterCTA />
    </main>
  );
}
