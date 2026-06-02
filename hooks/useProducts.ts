"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";

interface UseProductsReturn {
  products: Product[];
  totalPages: number;
  totalProducts: number;
  loading: boolean;
  error: string | null;
}

export function useProducts(page: number, perPage = 15): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `/api/products?page=${page}&per_page=${perPage}`,
        );
        if (!res.ok) throw new Error(`Error ${res.status}`);

        const data = await res.json();
        if (data.error) throw new Error(data.error);

        if (!cancelled) {
          setProducts(data.products);
          setTotalPages(data.totalPages);
          setTotalProducts(data.total);
        }
      } catch (err: any) {
        if (!cancelled) setError(err.message || "Failed to load products");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      cancelled = true;
    };
  }, [page, perPage]);

  return { products, totalPages, totalProducts, loading, error };
}
