"use client";

import { useEffect, useState } from "react";
import { Users, Sparkles, Globe, Smartphone, BarChart3, Star, LucideIcon } from "lucide-react";
import { db, ServiceItem } from "@/app/lib/db";
import Card3DTilt from "./Card3DTilt";

// Map IDs to Lucide Icons
const iconMap: Record<string, LucideIcon> = {
  "service-1": Users,
  "service-2": Sparkles,
  "service-3": Globe,
  "service-4": Smartphone,
  "service-5": BarChart3,
  "service-6": Star,
};

export default function ServicesSection({ initialServices = [] }: { initialServices?: ServiceItem[] }) {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setServices(db.getServices());

    // Sync updates
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

  return (
    <section id="services" className="relative bg-white pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden font-sans">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Badge row */}
        <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 flex items-center justify-center text-white text-[11px] sm:text-[12px] font-semibold flex-shrink-0">
            1
          </div>
          <span className="text-[12px] sm:text-[13px] font-medium border border-gray-200 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-gray-900">
            Introducing RecallX
          </span>
        </div>

        {/* Heading H2 */}
        <div className="px-5 sm:px-8 lg:px-12 mb-12 sm:mb-16">
          <h2 className="font-sans font-medium text-[clamp(1.5rem,4vw,3.2rem)] leading-[1.12] tracking-[-0.02em] text-gray-900 max-w-5xl">
            Strategy-led creatives, delivering <br className="hidden sm:block" />
            results in digital and beyond.
          </h2>
          <p className="text-sm text-gray-600 max-w-xl mt-4 font-medium leading-relaxed">
            Every campaign we launch, interface we design, and line of code we write is custom calibrated to maximize performance metrics and pipeline ROI.
          </p>
        </div>

        {/* Services detailed grid */}
        <div className="px-5 sm:px-8 lg:px-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => {
            const IconComponent = iconMap[s.id] || Sparkles;
            return (
              <Card3DTilt
                key={s.id}
                className="flex flex-col h-full bg-white border border-gray-150 p-6 sm:p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-gray-200 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0066FF]/10 flex items-center justify-center mb-5 text-[#0066FF] border border-[#0066FF]/20">
                  <IconComponent size={22} strokeWidth={1.5} />
                </div>
                <h3 className="font-sans font-semibold text-lg mb-2 text-gray-900">
                  {s.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-6 flex-grow font-normal">
                  {s.desc}
                </p>
                <div className="text-[10px] font-bold text-[#0066FF] bg-[#0066FF]/10 border border-[#0066FF]/20 px-3.5 py-1.5 rounded-full w-fit">
                  📈 {s.results}
                </div>
              </Card3DTilt>
            );
          })}
        </div>

      </div>
    </section>
  );
}
