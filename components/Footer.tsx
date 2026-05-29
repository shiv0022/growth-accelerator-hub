"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, MessageCircle } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { label: "Services", path: "/services" },
    { label: "Process", path: "/process" },
    { label: "Results", path: "/results" },
    { label: "About", path: "/why-us" },
    { label: "More", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-white py-10 sm:py-12 text-center text-xs text-gray-500 border-t border-gray-100 max-w-[1440px] mx-auto px-4 sm:px-5 w-full font-sans">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Left Branding */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
          <Image
            src="/logo-rx.png"
            alt="RecallX Marketing Logo"
            width={152}
            height={152}
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
          />
          <span className="font-bold text-gray-900 tracking-tight text-sm">RECALLX MARKETING</span>
          <span className="text-gray-300 hidden sm:inline">|</span>
          <span className="text-gray-500">Scale Faster. Convert Better. Dominate Digital.</span>
        </div>

        {/* Center Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] font-medium text-gray-600">
          {navLinks.map((l) => (
            <Link key={l.label} href={l.path} className="hover:text-gray-900 transition-colors">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right Details */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-gray-500 text-[13px]">
          <a href="mailto:hello@recallxmarketing.com" className="hover:text-gray-900 transition-colors" title="Email Us">
            <Mail size={16} />
          </a>
          <a href="https://wa.me/917982716224" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors" title="WhatsApp Us">
            <MessageCircle size={16} />
          </a>
          <span className="text-xs text-gray-400">
            © {new Date().getFullYear()} RecallX.
          </span>
        </div>

      </div>
    </footer>
  );
}
