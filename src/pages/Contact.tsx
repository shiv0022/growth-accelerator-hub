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

const WHATSAPP_NUMBER = "917982716224";
const SHEET_WEBHOOK = "https://script.google.com/macros/s/AKfycbxOSZr74hA1osy9_PcdFd2UQGeIMTRZoU8mCuYjNOcH8OmaNZepJa9_QdlRlkRuKjCt/exec";

const contactInfo = [
  { icon: Mail, label: "Email Us", value: "hello@recallxmarketing.com", href: "mailto:hello@recallxmarketing.com" },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with us directly", href: `https://wa.me/${WHATSAPP_NUMBER}` },
  { icon: Clock, label: "Response Time", value: "Within 24 hours", href: null },
  { icon: MapPin, label: "Location", value: "India (Remote-First Agency)", href: null },
];

const SERVICES = ["Paid Ads", "SEO", "Funnel Optimization", "Website Development", "Google Business Profile", "Reputation Management"];

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", company: "", budget: "", goal: "", services: [] as string[], message: ""
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

    const msg = [
      `👋 *New Inquiry from RecallX Website*`,
      ``,
      `*Name:* ${formData.name}`,
      `*Email:* ${formData.email}`,
      formData.phone ? `*Phone:* ${formData.phone}` : "",
      formData.company ? `*Company:* ${formData.company}` : "",
      formData.budget ? `*Monthly Budget:* ${formData.budget}` : "",
      formData.goal ? `*Primary Goal:* ${formData.goal}` : "",
      formData.services.length ? `*Services Interested:* ${formData.services.join(", ")}` : "",
      formData.message ? `*Message:* ${formData.message}` : "",
    ].filter(Boolean).join("\n");

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

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
          budget: formData.budget,
          goal: formData.goal,
          services: formData.services.join(", "),
          message: formData.message,
        }),
      });
    } catch (_) {
      // Silently fail — WhatsApp will still open
    }

    setLoading(false);
    window.open(waUrl, "_blank");
    (e.target as HTMLFormElement).reset();
    setFormData({ name: "", email: "", phone: "", company: "", budget: "", goal: "", services: [], message: "" });
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
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Monthly Ad Budget</label>
                  <Input name="budget" placeholder="e.g. ₹1L – ₹3L" value={formData.budget} onChange={handleChange} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Primary Goal</label>
                  <Input name="goal" placeholder="e.g. More leads, Better ROAS" value={formData.goal} onChange={handleChange} />
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
                {loading ? "Opening WhatsApp..." : "Send Message via WhatsApp"} <Send size={16} />
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Form submit hone par WhatsApp open hoga with your details pre-filled.
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
