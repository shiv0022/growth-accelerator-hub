import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ClipboardCheck, Lightbulb, Rocket, TrendingUp } from "lucide-react";

const steps = [
  { icon: ClipboardCheck, title: "Audit", desc: "Deep-dive into your current marketing, data, and competitors." },
  { icon: Lightbulb, title: "Strategy", desc: "Custom growth roadmap aligned with your business goals." },
  { icon: Rocket, title: "Execute", desc: "Launch high-performance campaigns across all channels." },
  { icon: TrendingUp, title: "Scale", desc: "Optimize, iterate, and scale what's working." },
];

const ProcessSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="process" className="py-16 md:py-24">
      <div ref={ref} className="container-main">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Our Process</p>
          <h2 className="text-3xl md:text-4xl font-bold">How We Deliver Results</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className={`relative text-center bg-card rounded-xl border border-border p-6 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <s.icon className="text-primary" size={22} strokeWidth={1.5} />
              </div>
              <span className="text-xs font-bold text-primary mb-1 block">0{i + 1}</span>
              <h3 className="font-heading font-bold text-base mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
