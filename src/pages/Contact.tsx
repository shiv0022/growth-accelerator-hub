import { useState } from "react";
import { Mail, MessageCircle, Clock, MapPin, Send, CheckCircle2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const faqs = [
  {
    q: "How quickly will you respond to my inquiry?",
    a: "We respond to all inquiries within 24 hours on business days. For urgent queries, reach us directly via WhatsApp.",
  },
  {
    q: "What's the minimum budget to work with RecallX?",
    a: "We work with businesses with ad budgets starting from ₹50,000/month. We also offer consulting-only packages for smaller budgets.",
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

const SERVICES = ["Paid Ads", "SEO", "Funnel Optimization", "Website Development", "Google Business Profile", "Reputation Management"];

const ContactPage = () => {
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
    (e.target as HTMLFormElement).reset();
    setFormData({ name: "", email: "", phone: "", company: "", services: [], message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">

        {/* Hero */}
        <div className="container-main text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Get In Touch</p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Let's Grow Your <span className="text-primary">Business Together</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Tell us about your goals and we'll craft a custom growth strategy for your business.
          </p>
        </div>

        {/* Contact Info Cards — horizontal strip */}
        <div className="container-main mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {contactInfo.map((c) => (
              <div key={c.label} className="flex items-center gap-3 bg-card border border-border rounded-xl p-4">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <c.icon className="text-primary" size={16} strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                      className="text-xs font-semibold hover:text-primary transition-colors truncate block">
                      {c.value}
                    </a>
                  ) : (
                    <p className="text-xs font-semibold truncate">{c.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main: Form + FAQ side by side */}
        <div className="container-main grid lg:grid-cols-5 gap-10 items-start">

          {/* Form — wider */}
          <div className="lg:col-span-3">
            <h2 className="text-xl font-bold mb-5">Send Us a Message</h2>

            {submitted && (
              <div className="mb-5 flex items-center gap-3 bg-primary/10 border border-primary/30 rounded-xl px-5 py-4 animate-fade-in">
                <CheckCircle2 className="text-primary shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-sm">Message Sent Successfully!</p>
                  <p className="text-xs text-muted-foreground mt-0.5">We'll get back to you within 24 hours.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-7 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Your Name *</label>
                  <Input name="name" placeholder="Rahul Sharma" required value={formData.name} onChange={handleChange} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Email Address *</label>
                  <Input name="email" type="email" placeholder="rahul@company.com" required value={formData.email} onChange={handleChange} />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input name="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Business Name</label>
                  <Input name="company" placeholder="Your Business" value={formData.company} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Services Interested In</label>
                <div className="grid grid-cols-2 gap-2">
                  {SERVICES.map((s) => (
                    <label key={s} className="flex items-center gap-2 text-sm cursor-pointer py-1">
                      <input
                        type="checkbox"
                        className="accent-primary w-3.5 h-3.5"
                        checked={formData.services.includes(s)}
                        onChange={(e) => handleCheckbox(s, e.target.checked)}
                      />
                      {s}
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Tell us about your business & goals</label>
                <Textarea
                  name="message"
                  placeholder="Current challenges, target audience, past marketing efforts..."
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <Button type="submit" size="lg" className="w-full gap-2 shadow-lg shadow-primary/20" disabled={loading}>
                {loading ? "Submitting..." : "Send Message"} <Send size={16} />
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Your details are saved securely. We'll reach out within 24 hours.
              </p>
            </form>
          </div>

          {/* FAQ — narrower */}
          <div className="lg:col-span-2 flex flex-col">
            <h2 className="text-xl font-bold mb-5">Common Questions</h2>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <div key={f.q} className="bg-card border border-border rounded-xl overflow-hidden">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="text-sm font-semibold leading-snug">{f.q}</span>
                    <ChevronDown
                      size={16}
                      className={`text-muted-foreground shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 animate-fade-in">
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA nudge */}
            <div className="mt-6 bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
              <p className="text-sm font-semibold mb-1">Prefer to talk directly?</p>
              <p className="text-xs text-muted-foreground mb-3">Chat with us on WhatsApp for a faster response.</p>
              <a
                href="https://wa.me/917982716224"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                <MessageCircle size={15} /> Open WhatsApp Chat
              </a>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
