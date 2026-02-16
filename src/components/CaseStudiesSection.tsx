import { useScrollReveal } from "@/hooks/useScrollReveal";
import resultsDashboard from "@/assets/results-dashboard.jpg";

const cases = [
  { label: "E-Commerce Brand", metrics: [{ before: "1.2X", after: "3.8X", unit: "ROAS" }] },
  { label: "SaaS Startup", metrics: [{ before: "—", after: "240%", unit: "Lead Growth" }] },
  { label: "Healthcare Clinic", metrics: [{ before: "—", after: "42%", unit: "Cost Reduction" }] },
];

const CaseStudiesSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="results" className="py-16 md:py-24 bg-card">
      <div ref={ref} className="container-main">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Results</p>
          <h2 className="text-3xl md:text-4xl font-bold">Proven Performance</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="grid gap-6">
            {cases.map((c, i) => (
              <div
                key={c.label}
                className={`bg-background rounded-xl border border-border p-6 flex items-center gap-6 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <div className="flex-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{c.label}</p>
                  {c.metrics.map((m) => (
                    <div key={m.unit} className="flex items-baseline gap-3">
                      <p className="text-3xl font-extrabold text-primary">{m.after}</p>
                      {m.before !== "—" && (
                        <p className="text-sm text-muted-foreground line-through">{m.before}</p>
                      )}
                      <p className="text-sm text-muted-foreground">{m.unit}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className={`rounded-2xl overflow-hidden shadow-xl ${isVisible ? "animate-fade-up [animation-delay:200ms]" : "opacity-0"}`}>
            <img src={resultsDashboard} alt="Performance dashboard showing growth metrics" className="w-full h-auto object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
