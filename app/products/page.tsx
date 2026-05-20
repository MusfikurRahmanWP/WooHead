"use client";

import { useEffect, useState, useRef } from "react";
import { Product } from "@/types/product";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, RefreshCw } from "lucide-react";

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
              <Card
                key={product.id}
                className="group border-border bg-card text-card-foreground transition-all hover:shadow-lg hover:shadow-primary/10"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
                    {/* If product.images exists and has src, use next/image.
                        Otherwise show a fallback. */}
                    {product.images && product.images[0]?.src ? (
                      <img
                        src={product.images[0].src}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        No Image
                      </div>
                    )}
                    {product.on_sale && (
                      <span className="absolute left-2 top-2 rounded-full bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground">
                        Sale
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start p-4">
                  <h2 className="font-medium leading-tight">{product.name}</h2>
                  <div className="mt-1 flex items-baseline gap-2">
                    {product.sale_price ? (
                      <>
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.regular_price}
                        </span>
                        <span className="text-lg font-bold text-primary">
                          ${product.sale_price}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-foreground">
                        ${product.price}
                      </span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    className="mt-3 w-full border border-primary/20 bg-transparent hover:bg-primary hover:text-primary-foreground"
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
