"use client";

import { useEffect, useState, useRef } from "react";
import { Database, Target, Zap, FileText, LucideIcon } from "lucide-react";
import Card3DTilt from "./Card3DTilt";
import AnimatedPopAd from "./AnimatedPopAd";

interface Differentiator {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const differentiators: Differentiator[] = [
  { icon: Database, title: "Data-Driven Execution", desc: "Every action, keyword bid, and layout optimization is backed by clean performance analytics." },
  { icon: Target, title: "ROI-Focused Strategy", desc: "We optimize purely for direct revenue and customer lifetime value, ignoring vanity traffic metrics." },
  { icon: Zap, title: "Fast Optimization Cycles", desc: "Rapid campaign testing and bid modifications, ensuring ad spend wastage is mitigated instantly." },
  { icon: FileText, title: "Transparent Real-Time Reports", desc: "Access clean, updated dashboards tracking conversion values and actual campaign ROAS." },
];

function StatItem({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!triggered) return;

    let start = 0;
    const duration = 1500; // ms
    const stepTime = 30; // ms
    const steps = duration / stepTime;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [triggered, end]);

  return (
    <div ref={elementRef} className="text-center p-5 bg-white border border-gray-150 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex flex-col justify-center items-center">
      <p className="text-3xl md:text-5xl font-black text-[#0066FF] bg-clip-text text-transparent bg-gradient-to-r from-[#0066FF] to-[#06b6d4]">
        {count}
        {suffix}
      </p>
      <p className="text-[10px] text-gray-500 mt-2 font-bold uppercase tracking-wider">{label}</p>
    </div>
  );
}

export default function WhyChooseSection() {
  return (
    <section id="why-us" className="py-20 bg-white border-y border-gray-100 relative font-sans">
      <AnimatedPopAd
        badge="Trusted"
        title="50+ Brands Scaled"
        subtext="Senior team handling strategy and execution end to end."
        ctaText="See Results"
        ctaHref="/results"
        className="top-8 right-4 sm:right-8 lg:right-12"
      />
      <div className="container-main max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-[#0066FF] uppercase tracking-widest mb-3">
            Why RecallX
          </p>
          <h2 className="text-3xl md:text-5xl font-sans font-medium tracking-tight text-gray-900 leading-tight">
            Designed for Performance
          </h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto mt-3 font-normal">
            We partner with businesses to scale demand, build premium web interfaces, and capture maximum market share.
          </p>
        </div>

        {/* Visual Showcase + Differentiators */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          
          {/* Image visual wrapper */}
          <div className="relative rounded-3xl overflow-hidden aspect-video shadow-lg border border-gray-150 group">
            <img
              src="/about-team.jpg"
              alt="RecallX Marketing team analyzing analytics data"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 text-white">
              <p className="text-xs font-bold uppercase tracking-widest text-[#06b6d4]">Collaborative Optimization</p>
              <h4 className="font-heading font-black text-lg">Continuous Strategy Calibration</h4>
            </div>
          </div>

          {/* Differentiators grid in 3D Cards */}
          <div className="grid sm:grid-cols-2 gap-5">
            {differentiators.map((d) => (
              <Card3DTilt
                key={d.title}
                className="p-6 bg-white border border-gray-150 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-shadow duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0066FF]/10 flex items-center justify-center text-[#0066FF] mb-4 border border-[#0066FF]/20">
                  <d.icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="font-sans font-semibold text-sm mb-1.5 text-gray-900">
                  {d.title}
                </h3>
                <p className="text-[11px] text-gray-500 leading-relaxed font-normal">
                  {d.desc}
                </p>
              </Card3DTilt>
            ))}
          </div>

        </div>

        {/* Counters grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto">
          <StatItem end={120} suffix="%" label="Average Scaling" />
          <StatItem end={3} suffix="X" label="ROAS Expansion" />
          <StatItem end={24} suffix="hr" label="Strategy Response" />
        </div>

      </div>
    </section>
  );
}
