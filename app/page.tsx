import HeroBanner from "./components/home/HeroBanner";
import NewsletterCTA from "./components/home/NewsletterCTA";
import PromotionBanner from "./components/home/PromotionBanner";
import FeaturedProducts from "./components/product/FeaturedProducts";

export default function HomePage() {
  return (
    <main className="bg-background text-foreground">
      <HeroBanner />
      <FeaturedProducts />
      <PromotionBanner />
      <NewsletterCTA />
    </main>
  );
}
