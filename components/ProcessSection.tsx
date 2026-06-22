"use client";

import { ClipboardCheck, Lightbulb, Rocket, TrendingUp } from "lucide-react";
import Card3DTilt from "./Card3DTilt";

const steps = [
  { icon: ClipboardCheck, title: "Audit", desc: "Deep-dive analysis of your current marketing channels, website conversion friction points, and competitor metrics." },
  { icon: Lightbulb, title: "Strategy", desc: "Formulate a personalized high-growth marketing and tech execution roadmap, custom aligned with your revenue goals." },
  { icon: Rocket, title: "Execute", desc: "Deploy hyper-targeted performance marketing campaigns, optimized user interfaces, and custom lead generation funnels." },
  { icon: TrendingUp, title: "Scale", desc: "Analyze campaign data real-time, execute A/B conversions testing, and allocate budgets to maximize client ROAS." },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-20 bg-white relative overflow-hidden font-sans border-t border-gray-100">
      <div className="container-main max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-[#0066FF] uppercase tracking-widest mb-3">
            Our Method
          </p>
          <h2 className="text-3xl md:text-5xl font-sans font-medium tracking-tight text-gray-900 leading-tight">
            How We Deliver Scaling
          </h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto mt-3 font-normal">
            We follow a structured 4-stage marketing growth process designed to minimize acquisition costs and expand pipeline margins.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-gray-200 via-[#0066FF]/30 to-gray-200 -z-10" />

          {steps.map((s, i) => (
            <Card3DTilt
              key={s.title}
              className="text-center bg-white border border-gray-150 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col items-center h-full relative transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0066FF]/10 flex items-center justify-center mb-4 text-[#0066FF] border border-[#0066FF]/20 shadow-sm shadow-blue-500/5 flex-shrink-0">
                <s.icon size={22} strokeWidth={1.5} />
              </div>
              <span className="text-[10px] font-black text-[#0066FF] bg-[#0066FF]/10 border border-[#0066FF]/20 px-2.5 py-0.5 rounded-full mb-3">
                STEP 0{i + 1}
              </span>
              <h3 className="font-sans font-semibold text-base mb-2 text-gray-900">
                {s.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed font-normal">
                {s.desc}
              </p>
            </Card3DTilt>
          ))}
        </div>

      </div>
    </section>
  );
}
