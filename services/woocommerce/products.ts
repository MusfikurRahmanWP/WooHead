import { makeWooRequest } from "./client";

export async function getAllProducts(currentPage = 1, perPage = 15) {
  return await makeWooRequest("products", {
    page: currentPage,
    per_page: perPage,
  });
}

export async function getSingleProduct(slug?: string | null) {
  const normalizedSlug = typeof slug === "string" ? slug.trim() : "";
  console.log("[WooCommerce] Fetching single product by slug:", normalizedSlug);

  if (!normalizedSlug) {
    // console.warn("[WooCommerce] getSingleProduct called without a valid slug.");
    return null;
  }

  const data = await makeWooRequest("products", { slug: normalizedSlug });
  const product = Array.isArray(data) ? data[0] || null : data;
  // console.log("[WooCommerce] Single product response:", product);
  return product;
}

export async function getProducts(currentPage = 1, perPage = 15) {
  return await getAllProducts(currentPage, perPage);
}

export async function getProduct(slug?: string | null) {
  return await getSingleProduct(slug);
}
