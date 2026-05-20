// components/home/promotion-banner.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PromotionBanner() {
  return (
    <section className="relative py-16">
      {/* Subtle diagonal lines pattern (optional) */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="rounded-2xl border border-border bg-linear-to-br from-secondary/30 to-background p-8 sm:p-12">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div className="max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                Limited Time Offer
              </span>
              <h2 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                Up to 30% off Premium Collection
              </h2>
              <p className="mt-4 text-muted-foreground">
                Use code{" "}
                <span className="font-bold text-primary">GOLDEN30</span> at
                checkout. Free shipping on orders over $500.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="shrink-0 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/sale">Shop the Sale</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
