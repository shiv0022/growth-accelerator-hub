import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import heroBg from "@/assets/hero-bg.jpg";

const subtitleText = "Performance marketing strategies designed to maximize ROI and accelerate measurable growth.";

const HeroSection = () => {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const { ref, isVisible } = useScrollReveal();
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    if (isVisible) {
      let i = 0;
      setDisplayedText("");
      setIsTypingDone(false);
      const interval = setInterval(() => {
        i++;
        setDisplayedText(subtitleText.slice(0, i));
        if (i >= subtitleText.length) {
          clearInterval(interval);
          setIsTypingDone(true);
        }
      }, 30);
      return () => clearInterval(interval);
    } else {
      setDisplayedText("");
      setIsTypingDone(false);
    }
  }, [isVisible]);

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div ref={ref} className="container-main text-center max-w-3xl mx-auto relative z-10">
        <div className={`inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="text-xs font-semibold text-primary-foreground uppercase tracking-widest">Data-Driven Growth Agency</span>
        </div>
        <h1 className={`text-4xl md:text-6xl font-extrabold leading-tight tracking-tight text-white ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          Scale Faster. Convert Better.{" "}
          <span className="text-blue-400">Dominate Digital.</span>
        </h1>
        <p className={`mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto ${isVisible ? "animate-fade-up [animation-delay:200ms]" : "opacity-0"}`}>
          {displayedText}
          {!isTypingDone && isVisible && <span className="inline-block w-0.5 h-5 bg-blue-400 animate-pulse ml-0.5 align-middle" />}
        </p>
        <div className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 ${isVisible ? "animate-fade-up [animation-delay:400ms]" : "opacity-0"}`}>
          <Button size="lg" onClick={() => scrollTo("contact")} className="gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow">
            Request Strategy Call <ArrowRight size={18} />
          </Button>
          <Button size="lg" variant="outline" onClick={() => scrollTo("results")}>
            View Our Work
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
