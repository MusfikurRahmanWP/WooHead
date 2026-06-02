"use client";

import { useSearchParams } from "next/navigation";
import ProductGrid from "@/components/product/ProductGrid";
import Pagination from "@/components/layout/Pagination";
import { useProducts } from "@/hooks/useProducts";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const { products, totalPages, totalProducts, loading, error } =
    useProducts(currentPage);

  const productStart = (currentPage - 1) * 15 + 1;
  const productEnd = Math.min(currentPage * 15, totalProducts);

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-7xl">
        {loading ? (
          <div className="mt-8 text-center text-muted-foreground">Loading…</div>
        ) : error ? (
          <div className="mt-8 text-center text-destructive">{error}</div>
        ) : products.length === 0 ? (
          <div className="mt-8 text-center text-muted-foreground">
            No products found.
          </div>
        ) : (
          <div className="mt-8">
            <h1 className="text-3xl font-bold text-foreground">
              {totalProducts} Products
            </h1>
            <h2>
              {" "}
              Showing Products from {productStart} to {productEnd}
            </h2>
            <ProductGrid products={products} />
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        )}
      </div>
    </div>
  );
}
