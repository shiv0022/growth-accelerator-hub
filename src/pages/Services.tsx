import { Users, Sparkles, Globe, Smartphone, BarChart3, Star, CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const services = [
  {
    icon: Users,
    title: "Influencer Marketing",
    tagline: "Reach millions through trusted voices",
    desc: "We connect your brand with the right creators — micro to macro influencers — to drive authentic engagement, brand awareness, and conversions.",
    features: [
      "Influencer Discovery & Vetting",
      "Campaign Strategy & Brief Creation",
      "Instagram, YouTube & Reels Campaigns",
      "Performance Tracking & Analytics",
      "UGC (User-Generated Content) Management",
      "Long-Term Brand Ambassador Programs",
    ],
    results: "Avg. 4.2X reach vs traditional paid ads",
  },
  {
    icon: Sparkles,
    title: "Google Business Profile",
    tagline: "Dominate local search results.",
    desc: "Optimize and actively manage your Google Business Profile to attract nearby customers, improve trust, and boost local visibility.",
    features: [
      "GBP Setup & Verification",
      "Category & Service Optimization",
      "Regular Post & Update Management",
      "Q&A Management",
      "Photo & Video Uploads",
      "Local Ranking Monitoring",
    ],
    results: "3X more local discovery clicks on average",
  },
  {
    icon: Globe,
    title: "Website Development",
    tagline: "Fast. Beautiful. Built to convert.",
    desc: "We design and develop fast, responsive, conversion-focused websites that reflect your brand and drive measurable business results.",
    features: [
      "Custom Website Design & Development",
      "E-Commerce Store Setup",
      "Mobile-First & Responsive Design",
      "Performance Optimization (Core Web Vitals)",
      "CMS Integration (WordPress, Webflow)",
      "Ongoing Maintenance & Support",
    ],
    results: "Sub-2s load times across all builds",
  },
  {
    icon: Smartphone,
    title: "App Development",
    tagline: "Your business, in your users' pockets.",
    desc: "We build high-performance mobile and web applications tailored to your business needs — from concept to launch and beyond.",
    features: [
      "iOS & Android App Development",
      "Progressive Web Apps (PWA)",
      "UI/UX Design & Prototyping",
      "API Integration & Backend Setup",
      "App Store Submission & Optimization",
      "Post-Launch Support & Updates",
    ],
    results: "Delivered 20+ apps with 4.5★+ ratings",
  },
  {
    icon: BarChart3,
    title: "Paid Ads & Performance Marketing",
    tagline: "Turn every rupee into measurable revenue",
    desc: "Data-driven paid advertising campaigns across Google, Meta, Instagram & YouTube — engineered for maximum conversions and scale.",
    features: [
      "Google Search & Display Ads",
      "Meta (Facebook & Instagram) Ads",
      "YouTube Video Advertising",
      "Retargeting & Lookalike Audiences",
      "A/B Testing & Creative Optimization",
      "Detailed ROI & ROAS Reporting",
    ],
    results: "Average 3.5X ROAS for our clients",
  },
  {
    icon: Star,
    title: "Reputation & Review Management",
    tagline: "Your reputation is your biggest asset.",
    desc: "Proactively build, monitor, and protect your online reputation across all major review platforms.",
    features: [
      "Google & Trustpilot Review Campaigns",
      "Negative Review Suppression",
      "Brand Mention Monitoring",
      "Crisis Response Strategy",
      "Sentiment Analysis Reports",
      "Competitor Reputation Benchmarking",
    ],
    results: "Avg. 4.7★ rating achieved for managed brands",
  },
];

const ServiceCard = ({ s, i }: { s: typeof services[0]; i: number }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${i * 80}ms` }}
      className={`bg-card rounded-2xl border border-border p-8 md:p-10 flex flex-col md:flex-row gap-8 hover:shadow-lg hover:border-primary/30 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="flex-shrink-0">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
          <s.icon className="text-primary" size={28} strokeWidth={1.5} />
        </div>
      </div>
      <div className="flex-1">
        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">{s.tagline}</p>
        <h2 className="text-xl md:text-2xl font-bold mb-3">{s.title}</h2>
        <p className="text-muted-foreground mb-5 leading-relaxed">{s.desc}</p>
        <div className="grid sm:grid-cols-2 gap-2 mb-5">
          {s.features.map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm text-foreground">
              <CheckCircle size={14} className="text-primary flex-shrink-0" />
              {f}
            </div>
          ))}
        </div>
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-2 rounded-full">
          📈 {s.results}
        </div>
      </div>
    </div>
  );
};

const ServicesPage = () => {
  const navigate = useNavigate();
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.1);
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
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">What We Do</p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Services Built for <span className="text-primary">Measurable Growth</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Every service we offer is designed with one goal — deliver quantifiable results that grow your business.
          </p>
        </div>

        {/* Services */}
        <div className="container-main grid gap-10">
          {services.map((s, i) => (
            <ServiceCard key={s.title} s={s} i={i} />
          ))}
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          className={`container-main text-center mt-16 transition-all duration-700 ${
            ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="text-2xl font-bold mb-3">Ready to get started?</h3>
          <p className="text-muted-foreground mb-6">Let's build a custom strategy for your business.</p>
          <Button size="lg" onClick={() => navigate("/contact")} className="gap-2 shadow-lg shadow-primary/20">
            Request Free Strategy Call <ArrowRight size={18} />
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
