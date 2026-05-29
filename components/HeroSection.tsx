"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle, Sparkles, Layers, Image as ImageIcon, Video, TrendingUp, Clock } from "lucide-react";
import { db, HeroConfig } from "@/app/lib/db";
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from "shaders/react";

const highlights = ["Google & Meta Ads Partner", "Conversion Funnel CRO", "Next.js Web Platforms"];

// Premium light-glass animated KPI dashboard simulator
function DashboardPreviewSim() {
  return (
    <div className="w-full h-full p-5 bg-white/80 backdrop-blur-xl text-gray-900 flex flex-col justify-between font-sans select-none relative overflow-hidden rounded-2xl border border-gray-100/50 shadow-lg">
      
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
          <span className="text-[10px] font-bold text-gray-400 ml-2 uppercase tracking-widest">RecallX Console</span>
        </div>
        <span className="text-[9px] bg-[#0066FF]/10 border border-[#0066FF]/30 px-2 py-0.5 rounded-full font-bold text-[#0066FF] flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-ping" /> Real-time ROI
        </span>
      </div>

      {/* 3 KPI Cards */}
      <div className="grid grid-cols-3 gap-3 my-4">
        
        {/* KPI 1 */}
        <div className="bg-white border border-gray-100 rounded-xl p-3 text-center shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
          <span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider block">Ad Spend</span>
          <p className="text-sm font-black text-gray-900 mt-1">₹1.24L</p>
          <span className="text-[7px] text-emerald-500 font-extrabold mt-0.5 block">↑ 12% Month</span>
        </div>

        {/* KPI 2 */}
        <div className="bg-white border border-[#0066FF]/20 rounded-xl p-3 text-center shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
          <span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider block">ROAS Return</span>
          <p className="text-sm font-black text-[#0066FF] mt-1">3.82x</p>
          <span className="text-[7px] text-emerald-500 font-extrabold mt-0.5 block">Target: 3.5x</span>
        </div>

        {/* KPI 3 */}
        <div className="bg-white border border-gray-100 rounded-xl p-3 text-center shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
          <span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider block">Conversions</span>
          <p className="text-sm font-black text-gray-900 mt-1">1,480</p>
          <span className="text-[7px] text-emerald-500 font-extrabold mt-0.5 block">↑ 24% scale</span>
        </div>

      </div>

      {/* Chart visualization */}
      <div className="flex-grow bg-white border border-gray-100 rounded-2xl p-4 flex flex-col justify-between shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
        <div className="flex items-center justify-between text-[9px] text-gray-400 font-semibold mb-2">
          <span>Weekly Performance Trend</span>
          <span className="text-[#0066FF] font-bold">Meta + Google Ads</span>
        </div>

        {/* Bar chart graphics */}
        <div className="flex-grow flex items-end justify-between gap-3 h-[80px] px-2 py-1">
          {[
            { height: "40%", color: "from-[#0066FF] to-[#06b6d4]" },
            { height: "65%", color: "from-[#0066FF] to-[#06b6d4]" },
            { height: "55%", color: "from-[#06b6d4] to-[#0066FF]" },
            { height: "85%", color: "from-[#0066FF] to-[#06b6d4]" },
            { height: "70%", color: "from-[#0066FF] to-[#06b6d4]" },
            { height: "95%", color: "from-[#0066FF] to-blue-400" },
          ].map((bar, bIdx) => (
            <div 
              key={bIdx}
              style={{ height: bar.height }}
              className={`w-full rounded-t bg-gradient-to-t ${bar.color} transition-all duration-1000 shadow-sm`}
            />
          ))}
        </div>
      </div>

      {/* Status footer bar */}
      <div className="flex justify-between items-center text-[8px] text-gray-400 font-bold uppercase mt-3 border-t border-gray-100 pt-2">
        <span className="flex items-center gap-1"><TrendingUp size={10} className="text-[#0066FF]" /> Active Attribution Tracking</span>
        <span>Version 2.4.2</span>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [config, setConfig] = useState<HeroConfig>({
    type: "3d",
    videoUrl: "",
    imageUrl: ""
  });

  useEffect(() => {
    setMounted(true);
    const current = db.getHeroConfig();
    setConfig(current);

    const handleStorageChange = () => {
      setConfig(db.getHeroConfig());
    };
    window.addEventListener("storage", handleStorageChange);
    
    const checkInterval = setInterval(() => {
      const latest = db.getHeroConfig();
      if (latest.type !== config.type || latest.imageUrl !== config.imageUrl || latest.videoUrl !== config.videoUrl) {
        setConfig(latest);
      }
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(checkInterval);
    };
  }, [config.type, config.imageUrl, config.videoUrl]);

  if (!mounted) {
    return (
      <section className="relative min-h-[85vh] flex items-center justify-center bg-[#EFEFEF]" />
    );
  }

  return (
    <section className="relative min-h-screen flex items-center pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden bg-[#EFEFEF]">
      {/* Animated Shader Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Shader className="absolute inset-0 w-full h-full">
          <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
          <ChromaFlow 
            baseColor="#ffffff" 
            downColor="#0066FF" 
            leftColor="#0066FF" 
            rightColor="#0066FF" 
            upColor="#0066FF" 
            momentum={13} 
            radius={3.5} 
          />
          <FlutedGlass 
            aberration={0.61} 
            angle={31} 
            frequency={8} 
            highlight={0.12} 
            highlightSoftness={0} 
            lightAngle={-90} 
            refraction={4} 
            shape="rounded" 
            softness={1} 
            speed={0.15} 
          />
          <FilmGrain strength={0.05} />
        </Shader>
      </div>

      <div className="container-main max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-20 w-full h-full mt-4">
        
        {/* Hero Left Content */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          
          <p className="text-[13px] sm:text-[14px] font-medium tracking-wide text-gray-900 mb-5 sm:mb-8 font-sans">
            RecallX Marketing
          </p>

          {/* Headline H1 */}
          <h1 className="font-sans font-medium text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] leading-[1.08] tracking-[-0.03em] text-gray-900 max-w-5xl">
            Scale Faster. <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            Convert Better. <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0066FF] to-[#06b6d4]">
              Dominate Digital.
            </span>
          </h1>

          <p className="mt-5 sm:mt-6 text-sm sm:text-base text-gray-700 max-w-xl leading-relaxed font-sans font-medium">
            Performance marketing strategies custom calibrated to scale acquisition, streamline conversion pipelines, and deliver measurable revenue margins.
          </p>

          {/* CTA Buttons Row */}
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 w-full sm:w-auto">
            
            {/* Orange Button */}
            <button
              onClick={() => router.push("/contact")}
              className="group relative flex items-center justify-between sm:justify-start bg-[#0066FF] hover:bg-[#0052cc] text-white font-medium rounded-full pl-5 sm:pl-6 pr-2 py-2 text-[13px] sm:text-[14px] transition-colors duration-500 ease-axion-ease w-full sm:w-auto shadow-md"
            >
              <span className="relative overflow-hidden h-[20px] block w-[140px] sm:w-[145px]">
                <span className="flex flex-col transition-transform duration-500 ease-axion-ease group-hover:-translate-y-1/2">
                  <span className="h-[20px] flex items-center text-left">Request Strategy Call</span>
                  <span className="h-[20px] flex items-center text-left">Request Strategy Call</span>
                </span>
              </span>
              <span className="w-7 h-7 sm:w-8 sm:h-8 bg-white text-[#0066FF] rounded-full flex items-center justify-center ml-3 sm:ml-4 transition-transform duration-500 ease-axion-ease group-hover:rotate-[-45deg] flex-shrink-0">
                <ArrowRight size={14} className="sm:size-4" />
              </span>
            </button>

            {/* Partner Badge */}
            <div className="flex items-center justify-between sm:justify-start gap-3 bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] p-2 rounded-[4px] transition-shadow duration-500 ease-axion-ease">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-[#06b6d4] flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                  <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z"/>
                </svg>
                <span className="text-[13px] sm:text-[14px] font-medium text-gray-900 font-sans">Certified Partner</span>
              </div>
              <span className="text-[10px] sm:text-[11px] bg-gray-900 text-white px-1.5 sm:px-2 py-0.5 rounded font-medium flex-shrink-0">
                Featured
              </span>
            </div>

          </div>

          {/* Under-buttons details */}
          <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 border-t border-gray-200/60 pt-6 sm:pt-8 w-full">
            {highlights.map((h) => (
              <span key={h} className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                <CheckCircle size={14} className="text-[#0066FF] flex-shrink-0" /> {h}
              </span>
            ))}
          </div>

        </div>

        {/* Hero Right Visual Showcase */}
        <div className="lg:col-span-6 flex justify-center w-full relative z-20">
          <div className="w-full max-w-[520px] aspect-[4/3] sm:aspect-square rounded-3xl p-2 bg-white/40 border border-gray-200/50 backdrop-blur-md shadow-xl relative overflow-hidden flex flex-col justify-between">
            {/* Render dynamic active media */}
            <div className="flex-grow w-full h-full relative overflow-hidden rounded-2xl bg-white flex items-center justify-center">
              {config.type === "3d" && (
                <div className="w-full h-full absolute inset-0 flex items-center justify-center">
                  <DashboardPreviewSim />
                </div>
              )}

              {config.type === "video" && (
                <div className="w-full h-full absolute inset-0 bg-neutral-950 flex items-center justify-center">
                  {config.videoUrl ? (
                    <video
                      key={config.videoUrl}
                      src={config.videoUrl}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <div className="text-center p-6 text-gray-400">
                      <Video size={32} className="mx-auto mb-2 text-[#0066FF]/50" />
                      <p className="text-xs">No video URL configured. Edit it in the admin panel.</p>
                    </div>
                  )}
                </div>
              )}

              {config.type === "image" && (
                <div className="w-full h-full absolute inset-0 bg-neutral-900 flex items-center justify-center">
                  {config.imageUrl ? (
                    <img
                      src={config.imageUrl}
                      alt="Campaign Mockup Dashboard"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-6 text-gray-400">
                      <ImageIcon size={32} className="mx-auto mb-2 text-[#0066FF]/50" />
                      <p className="text-xs">No image URL configured. Edit it in the admin panel.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Media details overlay footer */}
            <div className="p-3 bg-white/90 border-t border-gray-100 backdrop-blur flex items-center justify-between text-xs rounded-b-2xl">
              <span className="font-bold flex items-center gap-1.5 text-gray-700">
                {config.type === "3d" && (
                  <>
                    <Layers size={14} className="text-[#0066FF]" /> Dynamic Analytics Dashboard
                  </>
                )}
                {config.type === "video" && (
                  <>
                    <Video size={14} className="text-[#0066FF]" /> Showcase Strategy Video
                  </>
                )}
                {config.type === "image" && (
                  <>
                    <ImageIcon size={14} className="text-[#0066FF]" /> Campaign Performance Mockup
                  </>
                )}
              </span>
              <span className="text-[10px] text-gray-500 font-semibold px-2 py-0.5 bg-gray-50 border border-gray-150 rounded">
                Type: {config.type.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
