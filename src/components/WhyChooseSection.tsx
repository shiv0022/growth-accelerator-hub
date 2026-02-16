import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import { Database, Target, Zap, FileText } from "lucide-react";
import aboutTeam from "@/assets/about-team.jpg";

const differentiators = [
  { icon: Database, title: "Data-Driven Execution", desc: "Every decision backed by analytics and performance data." },
  { icon: Target, title: "ROI-Focused Strategy", desc: "We optimize for revenue, not vanity metrics." },
  { icon: Zap, title: "Fast Response Team", desc: "24-hour turnaround on strategy and optimizations." },
  { icon: FileText, title: "Transparent Reporting", desc: "Clear dashboards and weekly performance reports." },
];

const StatCounter = ({ end, suffix, label, started }: { end: number; suffix: string; label: string; started: boolean }) => {
  const value = useCountUp(end, 2000, started);
  return (
    <div className="text-center">
      <p className="text-4xl md:text-5xl font-extrabold text-primary">{value}{suffix}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
};

const WhyChooseSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="why-us" className="py-20 md:py-28 bg-card">
      <div ref={ref} className="container-main">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Why Us</p>
          <h2 className="text-3xl md:text-4xl font-bold">Why Choose RecallX Marketing</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className={`rounded-2xl overflow-hidden shadow-xl ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
            <img src={aboutTeam} alt="RecallX Marketing team analyzing data" className="w-full h-auto object-cover" />
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {differentiators.map((d, i) => (
              <div
                key={d.title}
                className={`p-6 rounded-xl bg-background border border-border ${isVisible ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <d.icon className="text-primary mb-3" size={28} strokeWidth={1.5} />
                <h3 className="font-heading font-bold mb-1.5 text-sm">{d.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <StatCounter end={120} suffix="%" label="Average Growth" started={isVisible} />
          <StatCounter end={3} suffix="X" label="ROAS Scaling" started={isVisible} />
          <StatCounter end={24} suffix="hr" label="Strategy Response" started={isVisible} />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
