import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BarChart3, Search, GitBranch, Globe, Sparkles, Star } from "lucide-react";

const services = [
  { icon: BarChart3, title: "Paid Ads & Performance Marketing", desc: "Data-driven campaigns across Google, Meta & more — optimized for conversions and scale." },
  { icon: Search, title: "SEO & Organic Growth", desc: "Rank higher, drive organic traffic, and build lasting search authority." },
  { icon: GitBranch, title: "Funnel & Conversion Optimization", desc: "Turn traffic into revenue with high-converting funnels and landing pages." },
  { icon: Globe, title: "Website & App Development", desc: "Fast, responsive, conversion-focused websites and web applications." },
  { icon: Sparkles, title: "AI Content & Script Strategy", desc: "AI-powered content creation for ads, emails, and social that converts." },
  { icon: Star, title: "Reputation & Review Management", desc: "Build trust with proactive review management and brand monitoring." },
];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="services" className="py-16 md:py-24">
      <div ref={ref} className="container-main">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">What We Do</p>
          <h2 className="text-3xl md:text-4xl font-bold">Services Built for Growth</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`group bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <s.icon className="text-primary" size={20} strokeWidth={1.5} />
              </div>
              <h3 className="font-heading font-bold text-base mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
