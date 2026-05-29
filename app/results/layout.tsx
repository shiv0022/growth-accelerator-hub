import type { Metadata } from "next";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Case Studies and Results",
  description:
    "Review RecallX case studies, performance dashboards, and client project outcomes across e-commerce, SaaS, healthcare, and real estate.",
  path: "/results",
  keywords: ["marketing case studies", "ROAS results", "client growth results"],
});

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
