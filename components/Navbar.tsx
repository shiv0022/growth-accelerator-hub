"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "Process", path: "/process" },
    { label: "Results", path: "/results" },
    { label: "About", path: "/why-us" },
    { label: "More", path: "/blog" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-2 sm:p-3 w-full transition-transform duration-300">
      <div className="max-w-[920px] mx-auto">

        {/* Pill-shaped Navbar */}
        <div className="flex items-center justify-between bg-white rounded-full p-[5px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100/80">
          
          {/* Logo & Desktop Nav Links */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* LEFT Logo */}
            <Link
              href="/"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-gray-200 bg-white flex items-center justify-center shadow-sm flex-shrink-0 hover:scale-105 transition-transform duration-300"
            >
              <Image
                src="/logo-rx.png"
                alt="RecallX Marketing Logo"
                width={72}
                height={72}
                className="w-full h-full object-contain p-1"
                priority
              />
            </Link>
            
            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-6">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.path}
                  className={`text-[14px] font-medium transition-colors duration-300 ${
                    pathname === link.path 
                      ? "text-[#0066FF] font-semibold" 
                      : "text-gray-900 hover:text-gray-500"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT (hidden on mobile, shown md+) */}
          <div className="hidden md:flex items-center gap-6">

            <Link 
              href="/contact" 
              className="group relative flex items-center bg-gray-900 text-white text-[13px] font-medium rounded-full pl-5 pr-2 py-2 transition-shadow duration-300 hover:shadow-md"
            >
              <span className="relative overflow-hidden h-[20px] block w-[88px]">
                <span className="flex flex-col transition-transform duration-500 ease-axion-ease group-hover:-translate-y-1/2">
                  <span className="h-[20px] flex items-center">Contact Us</span>
                  <span className="h-[20px] flex items-center">Contact Us</span>
                </span>
              </span>
              <span className="w-6 h-6 bg-white text-gray-900 rounded-full flex items-center justify-center ml-2 transition-transform duration-500 ease-axion-ease group-hover:rotate-[-45deg] flex-shrink-0">
                <ArrowRight size={13} />
              </span>
            </Link>
          </div>

          {/* MOBILE: Menu toggle button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-9 h-9 sm:w-10 sm:h-10 bg-gray-900 text-white rounded-full flex items-center justify-center transition-transform hover:scale-105"
          >
            {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-black/60 transition-opacity duration-500 ease-axion-spring ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-white rounded-2xl mx-3 mb-3 p-6 flex flex-col justify-between min-h-[60vh] shadow-2xl transition-transform duration-500 ease-axion-spring ${
            isMobileMenuOpen ? "translate-y-0" : "translate-y-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          
          {/* Header inside bottom sheet */}
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
              <Image
                src="/logo-rx.png"
                alt="RecallX Marketing Logo"
                width={40}
                height={40}
                className="w-9 h-9 rounded-full object-contain border border-gray-200 p-1"
              />
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-md"
            >
              <X size={15} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-4 py-6">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-[22px] sm:text-[26px] font-medium tracking-tight transition-colors ${
                  pathname === link.path 
                    ? "text-[#0066FF]" 
                    : "text-gray-900 hover:text-gray-500"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Start a project button */}
          <Link 
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="group w-full flex items-center justify-between bg-gray-900 text-white font-medium p-4 rounded-xl shadow-lg"
          >
            <span className="text-sm font-medium">Start a project</span>
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center transition-transform duration-500 ease-axion-ease group-hover:rotate-[-45deg]">
              <ArrowRight size={16} />
            </div>
          </Link>

        </div>
      </div>
    </nav>
  );
}
