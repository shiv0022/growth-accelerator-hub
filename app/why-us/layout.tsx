import type { Metadata } from "next";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Why Choose RecallX",
  description:
    "See what makes RecallX different: data-driven execution, ROI-first planning, transparent reporting, and senior-led growth strategy.",
  path: "/why-us",
  keywords: ["marketing agency India", "ROI marketing partner", "growth strategy team"],
});

export default function WhyUsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
