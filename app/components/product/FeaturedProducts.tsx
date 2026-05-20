import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const featuredProducts = [
  {
    id: 1,
    name: "Golden Chronograph",
    price: "$2,499",
    image: "/placeholder-watch.jpg",
    isNew: true,
  },
  {
    id: 2,
    name: "Ebony Desk Lamp",
    price: "$899",
    image: "/placeholder-lamp.jpg",
    isNew: false,
  },
  {
    id: 3,
    name: "Leather Weekender",
    price: "$1,299",
    image: "/placeholder-bag.jpg",
    isNew: true,
  },
  {
    id: 4,
    name: "Marble Coasters (Set of 4)",
    price: "$149",
    image: "/placeholder-coasters.jpg",
    isNew: false,
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Curated Picks
          </h2>
          <p className="mt-4 text-muted-foreground">
            Hand‑selected essentials for the modern connoisseur.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group border-border bg-card text-card-foreground transition-all hover:shadow-lg hover:shadow-primary/10"
            >
              <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  {product.isNew && (
                    <Badge className="absolute left-2 top-2 bg-accent text-accent-foreground">
                      New
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start p-4">
                <h3 className="font-medium">{product.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {product.price}
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-3 w-full border border-primary/20 bg-transparent hover:bg-primary hover:text-primary-foreground"
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
