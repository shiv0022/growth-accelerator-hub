"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const links = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "Process", path: "/process" },
    { label: "Results", path: "/results" },
    { label: "About Us", path: "/about" },
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
      <div className="max-w-[660px] mx-auto">

        {/* Pill-shaped Navbar */}
        <div className="flex items-center justify-between bg-white rounded-full p-[5px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100/80">
          
          {/* LEFT Logo */}
          <Link
            href="/"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-gray-200 bg-white flex items-center justify-center shadow-sm hover:scale-105 transition-transform duration-300 flex-shrink-0 ml-1.5"
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
          
          {/* Centered Navigation Links */}
          <div className="flex-grow flex justify-center overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-2">
            <div className="flex items-center gap-3 sm:gap-4 md:gap-4 py-1">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.path}
                  className={`text-[12px] sm:text-[13px] md:text-[14px] font-medium whitespace-nowrap transition-colors duration-300 ${
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

          {/* RIGHT Contact Button */}
          <div className="flex-shrink-0 mr-1">
            {/* Desktop Contact Us Button */}
            <Link 
              href="/contact" 
              className="hidden sm:flex group relative items-center bg-gray-900 text-white text-[13px] font-medium rounded-full pl-5 pr-2 py-2 transition-shadow duration-300 hover:shadow-md"
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

            {/* Mobile Contact Button */}
            <Link 
              href="/contact" 
              className="sm:hidden flex items-center bg-gray-900 text-white text-[11px] font-medium rounded-full px-3 py-1.5 hover:bg-gray-800 transition-colors"
            >
              Contact
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}
