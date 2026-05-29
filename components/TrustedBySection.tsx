export default function TrustedBySection() {
  const brands = ["Google Partner", "Meta Business Partner", "HubSpot Agency", "Shopify Plus Partner", "AWS Certified"];

  return (
    <section className="py-8 bg-background border-y border-border/40 select-none">
      <div className="container-main">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          <span className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-widest">
            Expertise & Credentials
          </span>
          {brands.map((brand) => (
            <span
              key={brand}
              className="text-sm font-sans font-semibold text-muted-foreground/35 tracking-wide hover:text-primary transition-colors cursor-default"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
