import { ProductCard } from "./ProductCard";
import { Product } from "@/types/product";
import { getProducts } from "@/services/woocommerce/products";

function shuffleArray<T>(array: T[]) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default async function FeaturedProducts() {
  const { products } = await getProducts();
  const product = Array.isArray(products) ? products : [];
  const featuredProducts = shuffleArray(product).slice(0, 4);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Curated Picks
          </h2>
          <p className="mt-4 text-muted-foreground">
            Hand‑selected essentials for the modern connoisseur.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
