import type { Metadata } from "next";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Our 4-Step Growth Process",
  description:
    "Understand RecallX's growth framework: deep audit, custom strategy, execution, and continuous optimization to scale revenue.",
  path: "/process",
  keywords: ["marketing process", "growth framework", "campaign optimization process"],
});

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
