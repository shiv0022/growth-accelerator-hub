"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function CaseStudiesSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="results" className="relative bg-[#F5F5F5] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28 font-sans">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Badge row */}
        <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 flex items-center justify-center text-white text-[11px] sm:text-[12px] font-semibold flex-shrink-0">
            2
          </div>
          <span className="text-[12px] sm:text-[13px] font-medium border border-gray-300 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-gray-900">
            Featured client work
          </span>
        </div>

        {/* Heading H2 */}
        <div className="px-5 sm:px-8 lg:px-12 mb-10 sm:mb-14 lg:mb-16">
          <h2 className="font-sans font-medium text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] leading-[1.08] tracking-[-0.03em] text-gray-900">
            Our projects
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7 px-5 sm:px-8 lg:px-12">
          
          {/* Card 1 (Narrativ) */}
          <div className="flex flex-col">
            <div className="aspect-[329/246] rounded-2xl overflow-hidden bg-[#1a1d2e] group cursor-pointer relative shadow-sm">
              <video
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_122702_390f5305-8719-41d5-ae80-d23ab3796c28.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-500 ease-axion-ease group-hover:scale-102"
              />
              
              {/* Expanding hover button (absolute bottom-4 left-4) */}
              <div className="absolute bottom-4 left-4 h-9 bg-white text-gray-900 rounded-full flex items-center justify-between overflow-hidden transition-all duration-300 ease-in-out w-[148px] sm:w-9 sm:group-hover:w-[148px] px-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                <span className="text-[13px] font-medium whitespace-nowrap opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 sm:group-hover:delay-100 pl-1">
                  Learn more
                </span>
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3.5 h-3.5 text-gray-900"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Description & Title under video container */}
            <div className="mt-4 flex flex-col">
              <p className="text-[13px] sm:text-[14px] text-gray-600 leading-relaxed font-sans font-normal">
                Winner of Site of the Month 2025 - an interactive 3D showcase driving record engagement
              </p>
              <h3 className="font-sans font-semibold text-gray-900 text-[14px] sm:text-[15px] mt-1">
                Narrativ
              </h3>
            </div>
          </div>

          {/* Card 2 (Luminar) */}
          <div className="flex flex-col">
            <div className="aspect-square rounded-2xl overflow-hidden bg-[#6b6b6b] group cursor-pointer relative shadow-sm">
              <video
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_123323_f909c2b8-ff6c-4edf-882b-8ebcdbe389b5.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-500 ease-axion-ease group-hover:scale-102"
              />
              
              {/* Expanding hover button (absolute bottom-4 left-4) */}
              <div className="absolute bottom-4 left-4 h-9 bg-gray-900 text-white rounded-full flex items-center justify-between overflow-hidden transition-all duration-300 ease-in-out w-[168px] sm:w-9 sm:group-hover:w-[168px] px-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-white/5">
                <span className="text-[13px] font-medium whitespace-nowrap opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 sm:group-hover:delay-100 pl-1">
                  View case study
                </span>
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                  <ArrowRight size={14} className="text-white" />
                </div>
              </div>
            </div>
            
            {/* Description & Title under video container */}
            <div className="mt-4 flex flex-col">
              <p className="text-[13px] sm:text-[14px] text-gray-600 leading-relaxed font-sans font-normal">
                Transforming a dated platform into a conversion-focused brand experience
              </p>
              <h3 className="font-sans font-semibold text-gray-900 text-[14px] sm:text-[15px] mt-1">
                Luminar
              </h3>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
