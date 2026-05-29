"use client";

import { useEffect, useState } from "react";
import { Users, Sparkles, Globe, Smartphone, BarChart3, Star, CheckCircle, ArrowRight, LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { db, ServiceItem } from "@/app/lib/db";
import Card3DTilt from "@/components/Card3DTilt";

const iconMap: Record<string, LucideIcon> = {
  "service-1": Users,
  "service-2": Sparkles,
  "service-3": Globe,
  "service-4": Smartphone,
  "service-5": BarChart3,
  "service-6": Star,
};

export default function ServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setServices(db.getServices());
    
    const handleSync = () => {
      setServices(db.getServices());
    };
    window.addEventListener("storage", handleSync);
    const interval = setInterval(handleSync, 1000);
    return () => {
      window.removeEventListener("storage", handleSync);
      clearInterval(interval);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading Services...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="py-16 md:py-24">
        {/* Header Hero */}
        <div className="container-main text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">What We Do</p>
          <h1 className="text-4xl md:text-6xl font-sans font-medium tracking-tight text-foreground leading-tight mb-4">
            Services Built for <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0066FF] to-[#06b6d4]">Measurable Growth</span>
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Every service is calibrated to deliver high acquisition scaling, improve conversion funnel interfaces, and drive customer retention.
          </p>
        </div>

        {/* Services detailed list */}
        <div className="container-main grid gap-8 md:gap-12 max-w-5xl mx-auto">
          {services.map((s) => {
            const IconComponent = iconMap[s.id] || Sparkles;
            return (
              <Card3DTilt
                key={s.id}
                className="bg-card/40 backdrop-blur-md p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start border-border/70"
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
                    <IconComponent size={28} strokeWidth={1.5} />
                  </div>
                </div>
                
                <div className="flex-grow">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-1">
                    {s.tagline}
                  </span>
                  <h2 className="text-xl md:text-3xl font-sans font-semibold text-foreground mb-4">{s.title}</h2>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-2xl">{s.desc}</p>
                  
                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {s.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5 text-xs text-foreground/80">
                        <CheckCircle size={14} className="text-primary flex-shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-bold px-4 py-2 rounded-full shadow-sm">
                    📈 {s.results}
                  </div>
                </div>
              </Card3DTilt>
            );
          })}
        </div>
      </main>
    </div>
  );
}
