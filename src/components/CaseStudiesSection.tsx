import { useScrollReveal } from "@/hooks/useScrollReveal";

const cases = [
  { label: "E-Commerce Brand", metrics: [{ before: "1.2X", after: "3.8X", unit: "ROAS" }] },
  { label: "SaaS Startup", metrics: [{ before: "—", after: "240%", unit: "Lead Growth" }] },
  { label: "Healthcare Clinic", metrics: [{ before: "—", after: "42%", unit: "Cost Reduction" }] },
];

const CaseStudiesSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="results" className="py-20 md:py-28 bg-card">
      <div ref={ref} className="container-main">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Results</p>
          <h2 className="text-3xl md:text-4xl font-bold">Proven Performance</h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {cases.map((c, i) => (
            <div
              key={c.label}
              className={`bg-background rounded-xl border border-border p-8 text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-6">{c.label}</p>
              {c.metrics.map((m) => (
                <div key={m.unit}>
                  {m.before !== "—" && (
                    <p className="text-sm text-muted-foreground line-through mb-1">{m.before} {m.unit}</p>
                  )}
                  <p className="text-4xl font-extrabold text-primary">{m.after}</p>
                  <p className="text-sm text-muted-foreground mt-1">{m.unit}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
