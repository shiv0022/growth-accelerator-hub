const brands = ["Google Partner", "Meta Business", "HubSpot", "Shopify Plus", "AWS"];

const TrustedBySection = () => {
  return (
    <section className="py-10 bg-background">
      <div className="container-main">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest text-center mb-6">
          Trusted By Industry Leaders
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          {brands.map((brand) => (
            <span
              key={brand}
              className="text-sm md:text-base font-heading font-bold text-muted-foreground/50 tracking-wide"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
