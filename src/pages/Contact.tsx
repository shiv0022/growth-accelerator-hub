import { useState } from "react";
import { Mail, MessageCircle, Clock, MapPin, Send } from "lucide-react";
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
];

const SHEET_WEBHOOK = "https://script.google.com/macros/s/AKfycbxOSZr74hA1osy9_PcdFd2UQGeIMTRZoU8mCuYjNOcH8OmaNZepJa9_QdlRlkRuKjCt/exec";

const contactInfo = [
  { icon: Mail, label: "Email Us", value: "hello@recallxmarketing.com", href: "mailto:hello@recallxmarketing.com" },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with us directly", href: `https://wa.me/917982716224` },
  { icon: Clock, label: "Response Time", value: "Within 24 hours", href: null },
  { icon: MapPin, label: "Location", value: "India (Remote-First Agency)", href: null },
];

const SERVICES = ["Paid Ads", "SEO", "Funnel Optimization", "Website Development", "Google Business Profile", "Reputation Management"];

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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

    // Save to Google Sheets
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
        <div className="container-main text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Get In Touch</p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Let's Grow Your <span className="text-primary">Business Together</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Tell us about your goals and we'll craft a custom growth strategy built specifically for your business.
          </p>
        </div>

        <div className="container-main grid lg:grid-cols-3 gap-10 mb-16">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4">
                {contactInfo.map((c) => (
                  <div key={c.label} className="flex items-start gap-4 bg-card rounded-xl border border-border p-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <c.icon className="text-primary" size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                          className="text-sm font-medium hover:text-primary transition-colors">
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-xl font-bold mb-4">Common Questions</h2>
              <div className="space-y-4">
                {faqs.map((f) => (
                  <div key={f.q} className="bg-card rounded-xl border border-border p-5">
                    <p className="text-sm font-semibold mb-2">{f.q}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-6">Send Us a Message</h2>
            {submitted && (
              <div className="mb-6 flex items-center gap-3 bg-primary/10 border border-primary/30 rounded-xl px-5 py-4">
                <svg className="text-primary shrink-0" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <div>
                  <p className="font-semibold text-sm text-foreground">Message Sent Successfully!</p>
                  <p className="text-xs text-muted-foreground mt-0.5">We'll get back to you within 24 hours.</p>
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Your Name *</label>
                  <Input name="name" placeholder="Rahul Sharma" required value={formData.name} onChange={handleChange} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Email Address *</label>
                  <Input name="email" type="email" placeholder="rahul@company.com" required value={formData.email} onChange={handleChange} />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input name="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Company / Business Name</label>
                  <Input name="company" placeholder="Your Business" value={formData.company} onChange={handleChange} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">What services are you interested in?</label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {SERVICES.map((s) => (
                    <label key={s} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        className="accent-primary"
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
                  placeholder="Share anything that would help us understand your business better — current challenges, past marketing efforts, target audience, etc."
                  rows={5}
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
