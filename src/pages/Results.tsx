import { ArrowRight, TrendingUp, Users, ShoppingCart, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import resultsDashboard from "@/assets/results-dashboard.jpg";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const caseStudies = [
  {
    icon: ShoppingCart,
    category: "E-Commerce",
    client: "Fashion Brand (D2C)",
    challenge: "Low ROAS on Meta Ads, high CAC, and poor product page conversions.",
    solution: "Rebuilt the entire ad funnel — from cold audience prospecting to retargeting. Redesigned landing pages and implemented dynamic product ads.",
    results: [
      { metric: "ROAS", before: "1.2X", after: "3.8X" },
      { metric: "CAC", before: "₹850", after: "₹310" },
      { metric: "Revenue", before: "₹4L/mo", after: "₹14L/mo" },
    ],
    duration: "90 Days",
    channel: "Meta Ads + Landing Page CRO",
  },
  {
    icon: Users,
    category: "SaaS / B2B",
    client: "HR Tech Startup",
    challenge: "No inbound pipeline. Over-reliance on cold outreach with low conversion rates.",
    solution: "Launched Google Search campaigns targeting high-intent keywords, built a dedicated lead capture funnel, and set up email nurture sequences.",
    results: [
      { metric: "Lead Volume", before: "12/mo", after: "41/mo" },
      { metric: "Lead Quality Score", before: "4.2/10", after: "7.8/10" },
      { metric: "Pipeline Value", before: "₹8L", after: "₹31L" },
    ],
    duration: "120 Days",
    channel: "Google Ads + Email Marketing",
  },
  {
    icon: Heart,
    category: "Healthcare",
    client: "Multi-Specialty Clinic",
    challenge: "High ad spend with poor targeting and 68% of budget wasted on irrelevant clicks.",
    solution: "Restructured Google Ads with hyper-local targeting, optimized GBP, and built service-specific landing pages.",
    results: [
      { metric: "Cost Per Lead", before: "₹680", after: "₹390" },
      { metric: "Monthly Appointments", before: "140", after: "310" },
      { metric: "Ad Spend Waste", before: "68%", after: "12%" },
    ],
    duration: "60 Days",
    channel: "Google Ads + GBP Optimization",
  },
  {
    icon: TrendingUp,
    category: "Real Estate",
    client: "Residential Developer",
    challenge: "Extremely high cost per site visit and low quality leads from generic portals.",
    solution: "Built a full-funnel strategy with video ads, lead capture forms, and a WhatsApp follow-up automation.",
    results: [
      { metric: "Cost Per Site Visit", before: "₹4,200", after: "₹1,100" },
      { metric: "Monthly Qualified Leads", before: "8", after: "34" },
      { metric: "Closure Rate", before: "4%", after: "11%" },
    ],
    duration: "75 Days",
    channel: "Meta Ads + WhatsApp Automation",
  },
];

const overallStats = [
  { value: "₹2Cr+", label: "Ad Spend Managed" },
  { value: "50+", label: "Brands Scaled" },
  { value: "3.5X", label: "Avg. ROAS Delivered" },
  { value: "240%", label: "Avg. Lead Growth" },
];

const CaseStudyCard = ({ c, i }: { c: typeof caseStudies[0]; i: number }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${i * 80}ms` }}
      className={`bg-card rounded-2xl border border-border p-8 md:p-10 hover:shadow-lg hover:border-primary/30 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <c.icon className="text-primary" size={20} strokeWidth={1.5} />
        </div>
        <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider">{c.category}</span>
        <span className="text-xs text-muted-foreground border border-border px-3 py-1 rounded-full">{c.channel}</span>
        <span className="text-xs text-muted-foreground border border-border px-3 py-1 rounded-full">⏱ {c.duration}</span>
      </div>

      <h2 className="text-xl font-bold mb-4">{c.client}</h2>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">The Challenge</p>
          <p className="text-sm leading-relaxed">{c.challenge}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Our Solution</p>
          <p className="text-sm leading-relaxed">{c.solution}</p>
        </div>
      </div>

      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Results</p>
      <div className="grid sm:grid-cols-3 gap-4">
        {c.results.map((r) => (
          <div key={r.metric} className="bg-background rounded-xl border border-border p-4 text-center">
            <p className="text-xs text-muted-foreground mb-2">{r.metric}</p>
            <div className="flex items-baseline justify-center gap-2">
              <p className="text-2xl font-extrabold text-primary">{r.after}</p>
              <p className="text-xs text-muted-foreground line-through">{r.before}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ResultsPage = () => {
  const navigate = useNavigate();
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1);
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal();
  const { ref: imgRef, isVisible: imgVisible } = useScrollReveal();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <div
          ref={heroRef}
          className={`container-main text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Case Studies</p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Real Results for <span className="text-primary">Real Businesses</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Numbers don't lie. Here's a look at what we've delivered for businesses across industries.
          </p>
        </div>

        {/* Overall Stats */}
        <div ref={statsRef} className="container-main mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {overallStats.map((s, i) => (
              <div
                key={s.label}
                style={{ transitionDelay: `${i * 100}ms` }}
                className={`bg-card rounded-2xl border border-border p-6 text-center hover:border-primary/30 transition-all duration-500 ${
                  statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <p className="text-4xl font-extrabold text-primary mb-2">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Image */}
        <div
          ref={imgRef}
          className={`container-main mb-16 transition-all duration-700 ${
            imgVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="rounded-2xl overflow-hidden shadow-xl border border-border">
            <img src={resultsDashboard} alt="Performance dashboard" className="w-full h-auto object-cover" />
          </div>
        </div>

        {/* Case Studies */}
        <div className="container-main grid gap-10">
          {caseStudies.map((c, i) => (
            <CaseStudyCard key={c.client} c={c} i={i} />
          ))}
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          className={`container-main text-center mt-16 transition-all duration-700 ${
            ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="text-2xl font-bold mb-3">Want results like these?</h3>
          <p className="text-muted-foreground mb-6">Let's talk about your business and how we can deliver similar outcomes.</p>
          <Button size="lg" onClick={() => navigate("/contact")} className="gap-2 shadow-lg shadow-primary/20">
            Get a Free Strategy Call <ArrowRight size={18} />
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResultsPage;
