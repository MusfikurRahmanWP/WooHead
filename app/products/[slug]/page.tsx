import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProduct } from "@/services/woocommerce/products";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";

interface ProductDetail extends Product {
  description?: string;
  short_description?: string;
}

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug?.toString().trim();
  // console.log("[ProductPage] resolved params:", resolvedParams);

  if (!slug) {
    // console.warn("[ProductPage] Missing or invalid slug param:", resolvedParams);
    notFound();
  }

  const product = (await getProduct(slug)) as ProductDetail | null;
  // console.log("[ProductPage] Fetched product for slug:", slug, "=>", product);

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to products
          </Link>
          <Button
            asChild
            size="sm"
            className="border border-primary/20 bg-transparent hover:bg-primary hover:text-primary-foreground"
          >
            <Link href="/products">Browse all products</Link>
          </Button>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] xl:grid-cols-[1.5fr_1fr]">
          <section className="rounded-3xl border border-border bg-card p-4 shadow-sm sm:p-6">
            {product.images && product.images[0]?.src ? (
              <div className="relative h-[800px] overflow-hidden rounded-3xl bg-muted">
                <Image
                  src={product.images[0].src}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className="flex h-96 items-center justify-center rounded-3xl bg-muted text-muted-foreground">
                No image available
              </div>
            )}
          </section>

          <section className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[.24em] text-muted-foreground">
                    Product details
                  </p>
                  <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">
                    {product.name}
                  </h1>
                </div>
                {product.on_sale ? (
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase text-accent-foreground">
                    On sale
                  </span>
                ) : null}
              </div>

              <div className="mb-6 flex items-center gap-4">
                <div className="text-3xl font-bold text-foreground">
                  {product.sale_price
                    ? `$${product.sale_price}`
                    : `$${product.price}`}
                </div>
                {product.sale_price ? (
                  <div className="text-sm text-muted-foreground line-through">
                    ${product.regular_price}
                  </div>
                ) : null}
              </div>

              <div className="space-y-4 text-sm leading-6 text-muted-foreground">
                <p>
                  {product.short_description ??
                    "No short description available."}
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded-2xl bg-muted p-4">
                    <p className="text-xs uppercase tracking-[.24em] text-muted-foreground">
                      SKU
                    </p>
                    <p className="mt-2 text-base text-foreground">
                      {product.id}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-muted p-4">
                    <p className="text-xs uppercase tracking-[.24em] text-muted-foreground">
                      Slug
                    </p>
                    <p className="mt-2 text-base text-foreground">
                      {product.slug}
                    </p>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Add to cart
              </Button>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-foreground">
                Description
              </h2>
              {product.description ? (
                <div
                  className="mt-4 prose prose-sm max-w-none text-muted-foreground prose-a:text-primary prose-a:no-underline prose-a:underline-offset-4"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              ) : (
                <p className="mt-4 text-sm text-muted-foreground">
                  Product description is not available for this item.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
