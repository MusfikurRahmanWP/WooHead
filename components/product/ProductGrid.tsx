import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="mx-auto max-w-7xl">
      {products.length === 0 ? (
        <div className="mt-16 text-center text-muted-foreground">
          No products found.
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
