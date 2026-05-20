// components/home/newsletter-cta.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewsletterCTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Join the Inner Circle
        </h2>
        <p className="mt-4 text-muted-foreground">
          Early access to new drops, exclusive offers, and style inspiration.
        </p>
        <form className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Input
            type="email"
            placeholder="Your email address"
            className="w-full border-border bg-muted text-foreground placeholder:text-muted-foreground sm:max-w-sm"
            required
          />
          <Button
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Subscribe
          </Button>
        </form>
        <p className="mt-3 text-xs text-muted-foreground">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
