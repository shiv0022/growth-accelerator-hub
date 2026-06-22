import type { Metadata } from "next";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Us",
  description:
    "Discover the RecallX team and our core marketing philosophy: data-driven execution, transparent reporting, and senior-led scaling strategies.",
  path: "/about",
  keywords: ["about RecallX", "marketing team India", "growth marketing strategists"],
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
