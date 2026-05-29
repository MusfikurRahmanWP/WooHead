import { getProducts, getProduct } from "@/services/woocommerce/products";
import { NextRequest, NextResponse } from "next/server";

// Disable caching - products can change frequently
export const revalidate = 0;
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // Get query parameters (e.g., ?slug=product-name)
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    let data;

    if (slug) {
      // Get single product by slug
      console.log(`[WooAPI] Fetching product details for slug: ${slug}`);
      data = await getProduct(slug);
    } else {
      // Get all products
      console.log("[WooAPI] Fetching all products");
      data = await getProducts();
    }

    return NextResponse.json(data, {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("[WooAPI] Error fetching products:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch products";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
