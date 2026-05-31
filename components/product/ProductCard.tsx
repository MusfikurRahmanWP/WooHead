import Link from "next/link";
import { Product } from "@/types/product";
import Image from "next/image";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card
      key={product.id}
      className="group border-border bg-card text-card-foreground transition-all hover:shadow-lg hover:shadow-primary/10 py-0"
    >
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
          {/* If product.images exists and has src, use next/image.
                        Otherwise show a fallback. */}
          {product.images && product.images[0]?.src ? (
            <div className="relative aspect-9/16 overflow-hidden rounded-lg">
              <Image
                src={product.images?.[0]?.src || "/placeholder.png"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
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
          asChild
          size="sm"
          className="mt-3 w-full border border-primary/20 bg-transparent hover:bg-primary hover:text-primary-foreground"
        >
          <Link
            href={`/products/${product.slug}`}
            className="w-full text-center"
          >
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
