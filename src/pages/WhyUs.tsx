import { useNavigate } from "react-router-dom";
import { ArrowRight, Database, Target, Zap, FileText, Users, Award, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

const WhyUsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <div className="container-main text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Why Choose Us</p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            The RecallX <span className="text-primary">Difference</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            We're not another agency with flashy decks. We're a team obsessed with one thing — making your marketing generate real, measurable revenue.
          </p>
        </div>

        {/* Stats */}
        <div className="container-main mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="bg-card rounded-2xl border border-border p-6 text-center hover:border-primary/30 transition-all">
                <p className="text-4xl font-extrabold text-primary mb-2">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Differentiators */}
        <div className="container-main grid md:grid-cols-2 gap-8 mb-16">
          {differentiators.map((d) => (
            <div key={d.title} className="bg-card rounded-2xl border border-border p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <d.icon className="text-primary" size={24} strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-bold mb-3">{d.title}</h2>
              <p className="text-muted-foreground mb-5 leading-relaxed">{d.desc}</p>
              <ul className="space-y-2">
                {d.details.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="container-main max-w-2xl mx-auto">
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-10 text-center">
            <Award className="text-primary mx-auto mb-4" size={40} strokeWidth={1.5} />
            <h3 className="text-2xl font-bold mb-3">Ready to experience the difference?</h3>
            <p className="text-muted-foreground mb-6">Book a free 30-minute strategy call and see exactly how we'd grow your business.</p>
            <Button size="lg" onClick={() => navigate("/contact")} className="gap-2 shadow-lg shadow-primary/20">
              Book Free Strategy Call <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WhyUsPage;
