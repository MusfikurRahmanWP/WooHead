"use client";

import { useEffect, useState, useRef } from "react";
import { Product } from "@/types/product";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, RefreshCw } from "lucide-react";
import { ProductCard } from "../components/product/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMountedRef = useRef(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/products", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (isMountedRef.current) {
        setProducts(data);
        setError(null);
      }
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to fetch products";
      if (isMountedRef.current) {
        setError(errorMsg);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    isMountedRef.current = true;
    fetchProducts();

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // ---- Loading State (dark-friendly skeleton) ----
  if (loading) {
    return (
      <div className="min-h-screen bg-background px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="border-border bg-card">
                <Skeleton className="h-48 w-full rounded-t-lg" />
                <CardContent className="p-4">
                  <Skeleton className="mb-2 h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ---- Error State ----
  if (error) {
    return (
      <div className="min-h-screen bg-background px-4 py-10">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <div className="mt-6 rounded-lg border border-destructive/50 bg-destructive/10 p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 shrink-0 text-destructive" />
              <div>
                <p className="font-semibold text-destructive">
                  Error loading products
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{error}</p>
                <Button
                  onClick={fetchProducts}
                  variant="destructive"
                  className="mt-4"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Retry
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---- Products Grid ----
  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <Button
            onClick={fetchProducts}
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/10"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

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
    </div>
  );
}
