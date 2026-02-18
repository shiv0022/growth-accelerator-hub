import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ClipboardCheck, Lightbulb, Rocket, TrendingUp, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  },
];

const ProcessPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <div className="container-main text-center max-w-3xl mx-auto mb-16">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Our Process</p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            How We Deliver <span className="text-primary">Consistent Results</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            A proven 4-step framework that's helped 50+ businesses achieve predictable, scalable growth.
          </p>
        </div>

        {/* Timeline */}
        <div className="container-main max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border hidden sm:block" />

            <div className="space-y-10">
              {steps.map((s, i) => (
                <div key={s.title} className={`relative flex flex-col md:flex-row gap-6 md:gap-12 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                  {/* Step number bubble */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary text-primary-foreground font-extrabold text-sm items-center justify-center z-10 shadow-lg">
                    {s.number}
                  </div>

                  {/* Content card */}
                  <div className={`flex-1 ${i % 2 === 1 ? "md:text-right" : ""}`}>
                    <div className="bg-card rounded-2xl border border-border p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                      <div className={`flex items-center gap-3 mb-1 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <s.icon className="text-primary" size={20} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-bold text-primary">{s.duration}</span>
                      </div>
                      <p className="text-xs font-semibold text-primary uppercase tracking-wider mt-4 mb-1">{s.tagline}</p>
                      <h2 className="text-2xl font-bold mb-3">{s.title}</h2>
                      <p className="text-muted-foreground mb-5 leading-relaxed">{s.desc}</p>
                      <ul className={`space-y-2 mb-5 ${i % 2 === 1 ? "md:items-end" : ""}`}>
                        {s.activities.map((a) => (
                          <li key={a} className={`flex items-center gap-2 text-sm ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                            <CheckCircle size={13} className="text-primary flex-shrink-0" />
                            {a}
                          </li>
                        ))}
                      </ul>
                      <div className={`inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full`}>
                        📋 Output: {s.output}
                      </div>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="container-main text-center mt-16">
          <h3 className="text-2xl font-bold mb-3">Want to see this process in action?</h3>
          <p className="text-muted-foreground mb-6">Book a free strategy call and we'll walk you through exactly how we'd apply this to your business.</p>
          <Button size="lg" onClick={() => window.location.href = "/#contact"} className="gap-2 shadow-lg shadow-primary/20">
            Book Free Strategy Call <ArrowRight size={18} />
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProcessPage;
