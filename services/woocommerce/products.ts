import { makeWooRequest } from "./client";
import { makeWooRequestWithMeta } from "./client";

export async function getProducts(page = 1, perPage = 15) {
  const { data: products, headers } = await makeWooRequestWithMeta("products", {
    page,
    per_page: perPage,
  });

  return {
    products,
    totalProducts: Number(headers.get("x-wp-total")),
    totalPages: Number(headers.get("x-wp-totalpages")),
    currentPage: page,
  };
}

export async function getProduct(slug?: string | null) {
  const normalizedSlug = typeof slug === "string" ? slug.trim() : "";

  if (!normalizedSlug) {
    return null;
  }

  const data = await makeWooRequest("products", {
    slug: normalizedSlug,
  });

  return Array.isArray(data) ? data[0] || null : data;
}
