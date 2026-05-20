import { makeWooRequest } from "./client";

export async function getProducts() {
  const data = await makeWooRequest("products");
  return data;
}

export async function getProduct(slug: string) {
  const data = await makeWooRequest("products", { slug });
  return data[0] || null;
}
