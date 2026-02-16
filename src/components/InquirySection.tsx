import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const InquirySection = () => {
  const { ref, isVisible } = useScrollReveal();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Request received!", description: "We'll get back to you within 24 hours." });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <section id="contact" className="py-16 md:py-24">
      <div ref={ref} className="container-main max-w-2xl mx-auto">
        <div className={`text-center mb-12 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl font-bold">Get Your Custom Growth Plan</h2>
          <p className="text-muted-foreground mt-3">Tell us about your business and goals. We'll craft a tailored strategy.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`bg-card rounded-xl border border-border p-8 space-y-5 ${isVisible ? "animate-fade-up [animation-delay:150ms]" : "opacity-0"}`}
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Input placeholder="Your Name" required />
            <Input placeholder="Business Type" required />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Input placeholder="Monthly Budget (e.g. $5K–$10K)" />
            <Input placeholder="Primary Goal" />
          </div>
          <Textarea placeholder="Tell us more about your project..." rows={4} />
          <Button type="submit" size="lg" className="w-full gap-2 shadow-lg shadow-primary/20" disabled={loading}>
            {loading ? "Sending..." : "Get Custom Growth Plan"} <Send size={16} />
          </Button>
        </form>
      </div>
    </section>
  );
};

export default InquirySection;
