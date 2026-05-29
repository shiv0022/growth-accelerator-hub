"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, DollarSign, Award, Target, HelpCircle } from "lucide-react";

interface ChannelMetric {
  id: string;
  label: string;
  roas: number;
  spend: string;
  conversions: string;
  gradientClass: string;
  glowClass: string;
  desc: string;
}

const metrics: ChannelMetric[] = [
  { 
    id: "meta", 
    label: "Meta Ads", 
    roas: 3.8, 
    spend: "₹5,00,000", 
    conversions: "2,400 leads", 
    gradientClass: "from-cyan-500 to-blue-500", 
    glowClass: "shadow-cyan-500/20",
    desc: "Demand generation visual campaigns optimized via dynamic creative testing and lookalike scaling." 
  },
  { 
    id: "google", 
    label: "Google Search", 
    roas: 3.5, 
    spend: "₹3,50,000", 
    conversions: "1,200 leads", 
    gradientClass: "from-blue-600 to-indigo-500", 
    glowClass: "shadow-blue-500/20",
    desc: "High-intent keyword harvesting capturing searchers ready to convert immediately." 
  },
  { 
    id: "seo", 
    label: "SEO / GBP", 
    roas: 5.4, 
    spend: "₹1,20,000", 
    conversions: "850 leads", 
    gradientClass: "from-emerald-500 to-cyan-500", 
    glowClass: "shadow-emerald-500/20",
    desc: "Organic authority ranking and Google Business optimization delivering high conversion yields." 
  },
  { 
    id: "influencer", 
    label: "Influencers", 
    roas: 4.2, 
    spend: "₹2,50,000", 
    conversions: "1,650 sales", 
    gradientClass: "from-purple-500 to-pink-500", 
    glowClass: "shadow-purple-500/20",
    desc: "UGC placements and creator endorsements amplifying trust metrics and product checkouts." 
  }
];

export default function PerformanceChart() {
  const [activeId, setActiveId] = useState<string>("meta");
  const [animateHeights, setAnimateHeights] = useState(false);

  useEffect(() => {
    // Trigger entry transition
    const timer = setTimeout(() => setAnimateHeights(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const activeChannel = metrics.find(m => m.id === activeId) || metrics[0];

  return (
    <div className="w-full bg-secondary/15 border border-border/80 rounded-3xl p-5 md:p-6 flex flex-col md:flex-row items-stretch gap-6 shadow-lg min-h-[350px]">
      
      {/* Chart Canvas Area */}
      <div className="w-full md:w-[60%] flex flex-col justify-between min-h-[260px] relative">
        <div className="flex items-center justify-between mb-4 border-b border-border/20 pb-2">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
            <Target size={14} className="text-primary animate-pulse" /> Acquisition ROI Index
          </span>
          <span className="text-[9px] text-muted-foreground font-semibold flex items-center gap-1.5">
            <HelpCircle size={12} /> Hover bars for data
          </span>
        </div>

        {/* Graphical columns container */}
        <div className="flex-grow flex items-end justify-between gap-6 px-4 md:px-8 py-4 min-h-[180px]">
          {metrics.map((m) => {
            // Scale bar height dynamically (max 100% for 5.4 ROAS)
            const heightPercent = animateHeights ? (m.roas / 6.0) * 100 : 0;
            const isActive = m.id === activeId;

            return (
              <div 
                key={m.id}
                onMouseEnter={() => setActiveId(m.id)}
                className="flex-1 flex flex-col items-center group cursor-pointer"
              >
                {/* Bar column */}
                <div className="w-full relative h-[160px] flex items-end justify-center">
                  
                  {/* Tooltip value bubble on top */}
                  <span className={`absolute -top-6 text-[10px] font-black bg-background border px-2 py-0.5 rounded shadow-sm transition-all duration-300 ${
                    isActive ? "opacity-100 scale-100 -translate-y-1" : "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-1"
                  }`}>
                    {m.roas}x
                  </span>

                  {/* Visual column bar */}
                  <div 
                    style={{ height: `${heightPercent}%` }}
                    className={`w-10 sm:w-12 rounded-t-xl bg-gradient-to-t ${m.gradientClass} ${m.glowClass} shadow-lg transition-all duration-700 ease-out border-t border-white/20 ${
                      isActive ? "brightness-110 scale-x-105" : "opacity-60 group-hover:opacity-90 group-hover:brightness-105"
                    }`}
                  />

                </div>

                {/* Axis label */}
                <span className={`text-[10px] font-bold mt-3 transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}>
                  {m.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Grid Baseline */}
        <div className="w-full h-[1px] bg-border/80" />
      </div>

      {/* Side Metrics Description Card */}
      <div className="w-full md:w-[40%] bg-card/65 border border-border/80 p-5 rounded-2xl backdrop-blur-md flex flex-col justify-between shadow-sm min-h-[220px]">
        <div>
          <div className="flex items-center gap-2 mb-3.5 border-b border-border/20 pb-2.5">
            <span className={`w-3.5 h-3.5 rounded-lg bg-gradient-to-tr ${activeChannel.gradientClass} border border-white/20`} />
            <h4 className="font-sans font-semibold text-base text-foreground leading-none">{activeChannel.label}</h4>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-background/80 border border-border/60 p-2 rounded-xl text-center">
              <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">Average ROAS</span>
              <p className="text-lg font-sans font-semibold text-primary leading-none mt-1">{activeChannel.roas}x</p>
            </div>
            <div className="bg-background/80 border border-border/60 p-2 rounded-xl text-center">
              <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">Ad Budget Spent</span>
              <p className="text-xs font-sans font-semibold text-foreground mt-2 leading-none">{activeChannel.spend}</p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">{activeChannel.desc}</p>
        </div>

        <div className="mt-4 pt-3 border-t border-border/20 flex items-center justify-between text-xs font-bold text-foreground">
          <span>Acquisition Leads</span>
          <span className="bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded text-[10px] uppercase">
            🔥 {activeChannel.conversions}
          </span>
        </div>
      </div>

    </div>
  );
}
