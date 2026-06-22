import { Database, Target, Zap, FileText, Users, Shield, CheckCircle } from "lucide-react";
import Card3DTilt from "@/components/Card3DTilt";
import { BreadcrumbListSchema } from "@/components/JsonLd";

const differentiators = [
  {
    icon: Database,
    title: "Data-Driven Execution",
    desc: "Every campaign decision is backed by hard analytics — not guesswork. We use advanced tracking, attribution models, and A/B testing to ensure every rupee works harder.",
    details: ["Advanced conversion tracking setup", "Multi-touch attribution modeling", "Custom analytics dashboards", "Weekly data-backed reports"],
  },
  {
    icon: Target,
    title: "ROI-Focused Strategy",
    desc: "We don't optimize for impressions or clicks — we optimize for revenue. Our KPIs are aligned with your business goals, whether that's leads, sales, or LTV.",
    details: ["Revenue-first campaign setup", "LTV & CAC optimization", "Profit margin tracking", "Scalable growth frameworks"],
  },
  {
    icon: Zap,
    title: "Fast Response Team",
    desc: "Marketing moves fast. We move faster. 24-hour turnaround on strategy updates, campaign changes, and client queries — always.",
    details: ["24hr strategy response SLA", "Real-time campaign monitoring", "Dedicated account manager", "WhatsApp & Slack availability"],
  },
  {
    icon: FileText,
    title: "Transparent Reporting",
    desc: "No black boxes. You get full visibility into where every rupee goes, what's performing, and what we're doing to improve results.",
    details: ["Live performance dashboards", "Weekly video call reports", "Spend & attribution breakdowns", "Competitor benchmarking"],
  },
  {
    icon: Users,
    title: "Senior-Only Execution",
    desc: "Your account is handled by senior strategists with 5+ years of experience — not interns or junior executives learning on your budget.",
    details: ["5+ years avg. team experience", "Industry-specific specialists", "Dedicated campaign manager", "Monthly strategy reviews"],
  },
  {
    icon: Shield,
    title: "No Long-Term Lock-ins",
    desc: "We earn your business every month. No forced 12-month contracts — just consistent results that make you want to stay.",
    details: ["Month-to-month engagements", "30-day exit notice only", "Clear deliverables per phase", "Performance-linked milestones"],
  },
];

const stats = [
  { value: "120%", label: "Average Client Growth" },
  { value: "3.8X", label: "Average ROAS Delivered" },
  { value: "24hr", label: "Strategy Response Time" },
  { value: "50+", label: "Brands Scaled" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Breadcrumbs Schema */}
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://recallxmarketing.com" },
          { name: "About Us", url: "https://recallxmarketing.com/about" }
        ]}
      />

      <main className="py-16 md:py-24">
        {/* Hero */}
        <div className="container-main text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Why Choose Us</p>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-foreground leading-tight mb-4">
            The RecallX <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0066FF] to-[#06b6d4]">Difference</span>
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            We're not another agency with flashy decks. We're a team obsessed with one thing — making your marketing campaigns yield real, measurable pipeline ROI.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="container-main mb-20 animate-fade-up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-card/45 backdrop-blur-md rounded-2xl border border-border p-6 text-center hover:border-primary/30 transition-all duration-300"
              >
                <p className="text-3xl md:text-5xl font-black text-primary bg-clip-text text-transparent bg-gradient-to-r from-[#0066FF] to-[#06b6d4] mb-2">
                  {s.value}
                </p>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Differentiators Grid in 3D tilt cards */}
        <div className="container-main grid md:grid-cols-2 gap-6 mb-20">
          {differentiators.map((d) => (
            <Card3DTilt key={d.title} className="bg-card/40 border-border/70 p-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 border border-primary/20">
                <d.icon size={22} strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-semibold mb-3 text-foreground">{d.title}</h2>
              <p className="text-xs text-muted-foreground leading-relaxed mb-5">{d.desc}</p>
              
              <div className="grid sm:grid-cols-2 gap-2 border-t border-border/40 pt-4 mt-auto">
                {d.details.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-[11px] text-foreground/80 font-medium">
                    <CheckCircle size={12} className="text-primary flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </Card3DTilt>
          ))}
        </div>
      </main>
    </div>
  );
}
