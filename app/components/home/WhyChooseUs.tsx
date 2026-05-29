export default function WhyChooseUs() {
  return (
    <section className="bg-muted py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Why Shop With Us
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Discover premium style, fast shipping, and customer support that
            cares.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Quality First",
              description:
                "Curated pieces from trusted brands and exclusive collections.",
            },
            {
              title: "Fast Delivery",
              description:
                "Reliable shipping and easy tracking for every order.",
            },
            {
              title: "Care & Support",
              description:
                "Friendly customer service ready to help with every purchase.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-border bg-background p-8 shadow-sm"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
