"use client";

import { useState } from "react";
import { Mail, MessageCircle, Clock, MapPin, Send, CheckCircle2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const faqs = [
  {
    q: "How quickly will you respond to my inquiry?",
    a: "We respond to all inquiries within 24 hours on business days. For urgent queries, reach us directly via WhatsApp.",
  },
  {
    q: "What's the minimum budget to work with RecallX?",
    a: "No fixed minimums — our pricing is based on the scope of work. We offer flexible, affordable packages designed to deliver real results without burning a hole in your pocket.",
  },
  {
    q: "Do you offer a free consultation?",
    a: "Yes! We offer a free 30-minute strategy call where we'll analyze your current marketing and share actionable recommendations.",
  },
  {
    q: "Which industries do you specialize in?",
    a: "We've worked across e-commerce, healthcare, real estate, SaaS, education, and local services. Our strategies are always customized.",
  },
  {
    q: "How long does it take to see results?",
    a: "Paid ads typically show results within 2–4 weeks. SEO and organic strategies take 3–6 months to show significant growth. We set realistic expectations from day one.",
  },
  {
    q: "Do you provide monthly reports?",
    a: "Absolutely. Every client gets a detailed monthly performance report with key metrics, insights, and recommendations for the next month.",
  },
];

const SHEET_WEBHOOK = "https://script.google.com/macros/s/AKfycbxOSZr74hA1osy9_PcdFd2UQGeIMTRZoU8mCuYjNOcH8OmaNZepJa9_QdlRlkRuKjCt/exec";

const contactInfo = [
  { icon: Mail, label: "Email Us", value: "hello@recallxmarketing.com", href: "mailto:hello@recallxmarketing.com" },
  { icon: MessageCircle, label: "WhatsApp", value: "+91 79827 16224", href: "https://wa.me/917982716224" },
  { icon: Clock, label: "Response Time", value: "Within 24 hours", href: null },
  { icon: MapPin, label: "Location", value: "India (Remote-First)", href: null },
];

const SERVICES = ["Influencer Marketing", "Google Business Profile", "Website Development", "App Development", "Paid Ads", "Reputation Management"];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", company: "", services: [] as string[], message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckbox = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      services: checked ? [...prev.services, service] : prev.services.filter(s => s !== service)
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(SHEET_WEBHOOK, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          services: formData.services.join(", "),
          message: formData.message,
        }),
      });
    } catch (_) {
      // Silently fail
    }

    setLoading(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", company: "", services: [], message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="py-16 md:py-24">
        {/* Hero */}
        <div className="container-main text-center max-w-2xl mx-auto mb-14 animate-fade-in">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Get In Touch</p>
          <h1 className="text-4xl md:text-6xl font-sans font-medium tracking-tight text-foreground leading-tight mb-4">
            Let's Grow Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0066FF] to-[#06b6d4]">Business Together</span>
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Tell us about your conversion goals and monthly ad spend. We'll design a customized 3D growth blueprint for your company.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="container-main mb-12 animate-fade-up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {contactInfo.map((c) => (
              <div key={c.label} className="flex items-center gap-3 bg-card/40 border border-border/80 rounded-xl p-4">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary border border-primary/20">
                  <c.icon size={16} strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                      className="text-xs font-semibold hover:text-primary transition-colors truncate block">
                      {c.value}
                    </a>
                  ) : (
                    <p className="text-xs font-semibold truncate text-foreground">{c.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Layout: Form + FAQ */}
        <div className="container-main grid lg:grid-cols-5 gap-10 items-start">
          {/* Form */}
          <div className="lg:col-span-3">
            <h2 className="text-xl font-sans font-semibold mb-5 text-foreground">Send Us a Message</h2>

            {submitted && (
              <div className="mb-5 flex items-center gap-3 bg-primary/10 border border-primary/30 rounded-xl px-5 py-4 animate-fade-in">
                <CheckCircle2 className="text-primary shrink-0" size={20} />
                <div>
                  <p className="font-sans font-semibold text-sm">Message Sent Successfully!</p>
                  <p className="text-xs text-muted-foreground mt-0.5 font-medium">We'll respond to your email address within 24 hours.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-card/45 border border-border/80 p-7 rounded-2xl space-y-5 shadow-lg">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Your Name *</label>
                  <Input name="name" placeholder="Rahul Sharma" required value={formData.name} onChange={handleChange} className="bg-background/50 border-border/60" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Email Address *</label>
                  <Input name="email" type="email" placeholder="rahul@company.com" required value={formData.email} onChange={handleChange} className="bg-background/50 border-border/60" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Phone Number</label>
                  <Input name="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} className="bg-background/50 border-border/60" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Business Name</label>
                  <Input name="company" placeholder="Your Business" value={formData.company} onChange={handleChange} className="bg-background/50 border-border/60" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Services Interested In</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SERVICES.map((s) => (
                    <label key={s} className="flex items-center gap-2 text-xs cursor-pointer py-1 text-foreground/80 font-medium hover:text-foreground">
                      <input
                        type="checkbox"
                        className="accent-primary w-3.5 h-3.5 rounded border-border"
                        checked={formData.services.includes(s)}
                        onChange={(e) => handleCheckbox(s, e.target.checked)}
                      />
                      {s}
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase">Tell us about your business & goals</label>
                <Textarea
                  name="message"
                  placeholder="Share details on current ad ROAS performance, website load speed concerns, or target demographics..."
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-background/50 border-border/60"
                />
              </div>

              <Button type="submit" size="lg" className="w-full gap-2 shadow-lg shadow-primary/20 rounded-full font-bold" disabled={loading}>
                {loading ? "Submitting Inquiry..." : "Send Message"} <Send size={16} />
              </Button>
              <p className="text-[10px] text-center text-muted-foreground font-semibold">
                Your parameters are encrypted. We do not sell user lead variables.
              </p>
            </form>
          </div>

          {/* FAQ Accordions */}
          <div className="lg:col-span-2 flex flex-col">
            <h2 className="text-xl font-sans font-semibold mb-5 text-foreground">Common Questions</h2>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <div key={f.q} className="bg-card/40 border border-border/80 rounded-xl overflow-hidden shadow-sm">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-secondary/40 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="text-xs font-bold leading-snug text-foreground/90">{f.q}</span>
                    <ChevronDown
                      size={14}
                      className={`text-muted-foreground shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 border-t border-border/20 pt-3 bg-secondary/10">
                      <p className="text-xs text-muted-foreground leading-relaxed">{f.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-6 bg-primary/5 border border-primary/20 rounded-xl p-5 text-center backdrop-blur-sm">
              <p className="text-xs font-extrabold mb-1">Prefer to talk directly?</p>
              <p className="text-[11px] text-muted-foreground mb-3 leading-relaxed">Chat with our growth acceleration lead on WhatsApp.</p>
              <a
                href="https://wa.me/917982716224"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
              >
                <MessageCircle size={14} /> Open WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
