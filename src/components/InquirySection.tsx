import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle2 } from "lucide-react";

const WHATSAPP_NUMBER = "917982716224";
const SHEET_WEBHOOK = "https://script.google.com/macros/s/AKfycbxOSZr74hA1osy9_PcdFd2UQGeIMTRZoU8mCuYjNOcH8OmaNZepJa9_QdlRlkRuKjCt/exec";

const InquirySection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", businessType: "", budget: "", goal: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const msg = [
      `👋 *New Inquiry from RecallX Website*`,
      ``,
      `*Name:* ${formData.name}`,
      `*Business Type:* ${formData.businessType}`,
      formData.budget ? `*Monthly Budget:* ${formData.budget}` : "",
      formData.goal ? `*Primary Goal:* ${formData.goal}` : "",
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
          email: "",
          phone: "",
          company: "",
          budget: formData.budget,
          goal: formData.goal,
          services: formData.businessType,
          message: formData.message,
        }),
      });
    } catch (_) {
      // Silently fail — WhatsApp will still open
    }

    setLoading(false);
    setSubmitted(true);
    window.open(waUrl, "_blank");
    setFormData({ name: "", businessType: "", budget: "", goal: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-16 md:py-24">
      <div ref={ref} className="container-main max-w-2xl mx-auto">
        <div className={`text-center mb-12 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl font-bold">Get Your Custom Growth Plan</h2>
          <p className="text-muted-foreground mt-3">Tell us about your business and goals. We'll craft a tailored strategy.</p>
        </div>

        {submitted && (
          <div className="mb-6 flex items-center gap-3 bg-primary/10 border border-primary/30 rounded-xl px-5 py-4 animate-fade-up">
            <CheckCircle2 className="text-primary shrink-0" size={20} />
            <div>
              <p className="font-semibold text-sm text-foreground">WhatsApp खुल रहा है!</p>
              <p className="text-xs text-muted-foreground mt-0.5">आपकी details pre-filled हैं — बस Send करें।</p>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className={`bg-card rounded-xl border border-border p-8 space-y-5 ${isVisible ? "animate-fade-up [animation-delay:150ms]" : "opacity-0"}`}
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Input name="name" placeholder="Your Name" required value={formData.name} onChange={handleChange} />
            <Input name="businessType" placeholder="Business Type" required value={formData.businessType} onChange={handleChange} />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Input name="budget" placeholder="Monthly Budget (e.g. ₹1L–₹3L)" value={formData.budget} onChange={handleChange} />
            <Input name="goal" placeholder="Primary Goal" value={formData.goal} onChange={handleChange} />
          </div>
          <Textarea name="message" placeholder="Tell us more about your project..." rows={4} value={formData.message} onChange={handleChange} />
          <Button type="submit" size="lg" className="w-full gap-2 shadow-lg shadow-primary/20" disabled={loading}>
            {loading ? "Opening WhatsApp..." : "Get Custom Growth Plan"} <Send size={16} />
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Submit करने पर WhatsApp open होगा with your details pre-filled.
          </p>
        </form>
      </div>
    </section>
  );
};

export default InquirySection;
