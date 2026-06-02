import { getProducts, getProduct } from "@/services/woocommerce/products";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    // 1. Single product by slug
    if (slug) {
      const product = await getProduct(slug);
      if (!product) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 },
        );
      }
      return NextResponse.json(product, {
        headers: { "Cache-Control": "no-store" },
      });
    }

    // 2. Paginated product list
    const page = parseInt(searchParams.get("page") || "1", 10);
    const perPage = parseInt(searchParams.get("per_page") || "15", 10);

    const { products, totalPages, totalProducts } = await getProducts(
      page,
      perPage,
    );

    return NextResponse.json(
      { products, totalPages, total: totalProducts },
      {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    );
  } catch (error) {
    console.error("[ProductsAPI] Error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch products";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
