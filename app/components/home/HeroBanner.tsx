import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroBanner() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
      {/* Background image (replace with your own) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: "url('/hero-bg.webp')" }}
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
          Luxury Redefined
        </h1>
        <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
          Discover our exclusive collection of hand‑crafted pieces, delivered
          worldwide.
        </p>
        <div className="mt-10">
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/products">Explore Collection</Link>
          </Button>
        </div>
        {/* Subtle animated scroll indicator (optional) */}
        <div className="mt-16 animate-bounce text-muted-foreground">
          <span className="text-2xl">⌄</span>
        </div>
      </div>
    </section>
  );
}
