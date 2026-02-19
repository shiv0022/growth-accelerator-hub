import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const subtitleText = "Performance marketing strategies designed to maximize ROI and accelerate measurable growth.";
const words = subtitleText.split(" ");

const highlights = ["Google & Meta Ads", "SEO & Organic Growth", "Website Development"];

const HeroSection = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [visibleWords, setVisibleWords] = useState(0);

  useEffect(() => {
    // Small delay so browser paints first, then animations trigger
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mounted) {
      setVisibleWords(0);
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setVisibleWords(i);
        if (i >= words.length) clearInterval(interval);
      }, 60);
      return () => clearInterval(interval);
    }
  }, [mounted]);

  return (
    <section className="relative pt-28 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/10 blur-[150px]" />
      </div>

      <div className="container-main text-center max-w-5xl mx-auto relative z-10">
        <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight text-foreground transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          Scale Faster. Convert Better.{" "}
          <span className="text-primary">Dominate Digital.</span>
        </h1>

        <p className="mt-5 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto min-h-[3.5rem]">
          {words.map((word, i) => (
            <span
              key={i}
              className="inline-block mr-[0.3em] transition-all duration-300"
              style={{
                opacity: i < visibleWords ? 1 : 0,
                transform: i < visibleWords ? "translateY(0)" : "translateY(10px)",
                transitionDelay: `${i * 10}ms`,
              }}
            >
              {word}
            </span>
          ))}
        </p>

        <div className={`mt-6 flex flex-wrap items-center justify-center gap-4 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {highlights.map((h) => (
            <span key={h} className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <CheckCircle size={14} className="text-primary" /> {h}
            </span>
          ))}
        </div>

        <div className={`mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <Button size="lg" onClick={() => navigate("/contact")} className="gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow">
            Request Strategy Call <ArrowRight size={18} />
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/results")}>
            View Our Work
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

