"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle2 } from "lucide-react";

const SHEET_WEBHOOK = "https://script.google.com/macros/s/AKfycbxOSZr74hA1osy9_PcdFd2UQGeIMTRZoU8mCuYjNOcH8OmaNZepJa9_QdlRlkRuKjCt/exec";

export default function InquirySection() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", businessType: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
          company: formData.businessType,
          services: "",
          message: formData.message,
        }),
      });
    } catch (_) {
      // Silently fail
    }

    setLoading(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", businessType: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-20 bg-background relative overflow-hidden">
      <div className="container-main max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Get In Touch</p>
          <h2 className="text-3xl md:text-5xl font-sans font-semibold tracking-tight">Request a Growth Audit</h2>
          <p className="text-sm text-muted-foreground mt-3">
            Tell us about your business goals and marketing budget. We'll analyze your funnel and schedule a free strategy session.
          </p>
        </div>

        {submitted && (
          <div className="mb-6 flex items-center gap-3 bg-primary/10 border border-primary/30 rounded-xl px-5 py-4 animate-fade-up">
            <CheckCircle2 className="text-primary shrink-0" size={20} />
            <div>
              <p className="font-sans font-semibold text-sm text-foreground">Inquiry Successfully Submitted!</p>
              <p className="text-xs text-muted-foreground mt-0.5 font-medium">Our growth strategist will contact you within 24 hours.</p>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-card/45 backdrop-blur-md rounded-2xl border border-border/80 p-8 space-y-5 shadow-xl animate-fade-up"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Input name="name" placeholder="Your Name *" required value={formData.name} onChange={handleChange} className="bg-background/50 border-border/60" />
            <Input name="email" type="email" placeholder="Email Address *" required value={formData.email} onChange={handleChange} className="bg-background/50 border-border/60" />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="bg-background/50 border-border/60" />
            <Input name="businessType" placeholder="Business Type / Industry" value={formData.businessType} onChange={handleChange} className="bg-background/50 border-border/60" />
          </div>
          <Textarea name="message" placeholder="Tell us more about your project goals, current challenges, or monthly budget..." rows={4} value={formData.message} onChange={handleChange} className="bg-background/50 border-border/60" />
          <Button type="submit" size="lg" className="w-full gap-2 shadow-lg shadow-primary/20 rounded-full font-bold" disabled={loading}>
            {loading ? "Submitting Inquiry..." : "Get Custom Growth Plan"} <Send size={16} />
          </Button>
          <p className="text-[10px] text-center text-muted-foreground font-semibold">
            By submitting this form you consent to our team reviewing your publicly available assets for audit purposes.
          </p>
        </form>
      </div>
    </section>
  );
}
