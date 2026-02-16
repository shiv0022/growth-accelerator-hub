const brands = ["Google Partner", "Meta Business", "HubSpot", "Shopify Plus", "AWS"];

const TrustedBySection = () => {
  return (
    <section className="py-8 bg-background">
      <div className="container-main">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
          <span className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-widest">
            Trusted by
          </span>
          {brands.map((brand) => (
            <span
              key={brand}
              className="text-sm font-heading font-bold text-muted-foreground/40 tracking-wide"
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
