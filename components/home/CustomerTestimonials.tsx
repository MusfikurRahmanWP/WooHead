export default function CustomerTestimonials() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Customer Testimonials
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Real feedback from customers who love our style and service.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              quote:
                "Amazing quality and such fast delivery. I’ll shop here again!",
              author: "Mina K.",
            },
            {
              quote:
                "The product photos were accurate and the fit was perfect.",
              author: "David P.",
            },
            {
              quote: "Great customer service and a smooth checkout experience.",
              author: "Aisha L.",
            },
          ].map((testimonial) => (
            <div
              key={testimonial.author}
              className="rounded-3xl border border-border bg-muted p-8 shadow-sm"
            >
              <p className="text-base leading-7 text-foreground">
                “{testimonial.quote}”
              </p>
              <p className="mt-6 font-semibold text-primary">
                {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
