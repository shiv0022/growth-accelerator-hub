import { ClipboardCheck, Lightbulb, Rocket, TrendingUp, CheckCircle } from "lucide-react";
import Card3DTilt from "@/components/Card3DTilt";
import { BreadcrumbListSchema } from "@/components/JsonLd";

const steps = [
  {
    icon: ClipboardCheck,
    number: "01",
    title: "Deep Audit",
    tagline: "Understand before we act",
    desc: "We start by thoroughly understanding your business, current marketing, competitors, and target audience. No assumptions — pure data.",
    activities: [
      "Full marketing account audit (Google Ads, Meta, SEO)",
      "Competitor landscape mapping",
      "Target audience persona development",
      "Current funnel & conversion analysis",
      "Keyword & opportunity gap research",
      "Brand positioning review",
    ],
    duration: "Week 1",
    output: "Comprehensive Audit Report",
    image: "/process-audit.jpg",
    imageAlt: "Marketing analytics dashboard audit",
  },
  {
    icon: Lightbulb,
    number: "02",
    title: "Custom Strategy",
    tagline: "Your roadmap to growth",
    desc: "Based on the audit, we build a tailored growth strategy with clear goals, timelines, budgets, and expected outcomes.",
    activities: [
      "Channel selection & budget allocation",
      "Campaign architecture design",
      "Content & creative strategy",
      "KPI & milestone definition",
      "90-day growth roadmap",
      "Risk mitigation plan",
    ],
    duration: "Week 2",
    output: "90-Day Growth Roadmap",
    image: "/process-strategy.jpg",
    imageAlt: "Strategy planning session on whiteboard",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Execute",
    tagline: "Launch with precision",
    desc: "We implement the strategy with military precision — setting up campaigns, creatives, tracking, and automations.",
    activities: [
      "Campaign setup & pixel configuration",
      "Ad creative production & testing",
      "Landing page optimization",
      "Conversion tracking & attribution",
      "Email/SMS automation setup",
      "Baseline performance benchmarking",
    ],
    duration: "Weeks 3-4",
    output: "Live Campaigns + Tracking Dashboard",
    image: "/process-execute.jpg",
    imageAlt: "Campaign execution on laptop",
  },
  {
    icon: TrendingUp,
    number: "04",
    title: "Optimize & Scale",
    tagline: "Double down on what works",
    desc: "We continuously analyze performance, eliminate waste, and scale winning campaigns — turning good results into great ones.",
    activities: [
      "Weekly performance reviews",
      "A/B testing of ads & landing pages",
      "Budget reallocation to top performers",
      "Audience expansion & lookalikes",
      "Monthly strategy recalibration",
      "Quarterly business review (QBR)",
    ],
    duration: "Month 2 onwards",
    output: "Monthly Growth Reports + Scaling Plan",
    image: "/process-scale.jpg",
    imageAlt: "Business growth scaling chart",
  },
];

export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Breadcrumbs Schema */}
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://recallxmarketing.com" },
          { name: "Process", url: "https://recallxmarketing.com/process" }
        ]}
      />

      <main className="py-16 md:py-24">
        {/* Hero */}
        <div className="container-main text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Our Process</p>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-foreground leading-tight mb-4">
            How We Deliver <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0066FF] to-[#06b6d4]">Consistent Results</span>
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            A proven 4-step framework that's helped 50+ businesses achieve predictable, scalable growth.
          </p>
        </div>

        {/* Steps */}
        <div className="container-main space-y-16">
          {steps.map((s, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={s.title}
                className={`grid md:grid-cols-2 gap-10 items-stretch ${!isEven ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                {/* Content Card with 3D Tilt */}
                <Card3DTilt className="bg-card/45 border-border/80 p-8 md:p-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground font-black text-base flex items-center justify-center shadow-lg shadow-primary/20">
                        {s.number}
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
                        <s.icon size={20} strokeWidth={1.5} />
                      </div>
                      <span className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">{s.duration}</span>
                    </div>

                    <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">{s.tagline}</p>
                    <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">{s.title}</h2>
                    <p className="text-xs text-muted-foreground mb-6 leading-relaxed">{s.desc}</p>
                    
                    <ul className="space-y-2 mb-6">
                      {s.activities.map((a) => (
                        <li key={a} className="flex items-center gap-2.5 text-xs text-foreground/80 font-medium">
                          <CheckCircle size={13} className="text-primary flex-shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-bold px-3.5 py-1.5 rounded-full w-fit">
                    📋 Output: {s.output}
                  </div>
                </Card3DTilt>

                {/* Image */}
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-border/80 min-h-[300px] relative">
                  <img
                    src={s.image}
                    alt={s.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
