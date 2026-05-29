"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <span className="text-sm font-bold text-primary uppercase tracking-widest mb-2">404 Error</span>
      <h1 className="text-4xl md:text-6xl font-black text-foreground mb-4">Page Not Found</h1>
      <p className="text-sm text-muted-foreground max-w-md mb-8 leading-relaxed">
        The route you are trying to access is unavailable or has been relocated to another parameter.
      </p>
      <Button onClick={() => router.push("/")} className="gap-2 shadow-lg shadow-primary/20 rounded-full font-bold px-8">
        <ArrowLeft size={16} /> Return to Homepage
      </Button>
    </div>
  );
}
