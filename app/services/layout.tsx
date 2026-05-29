import type { Metadata } from "next";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Digital Marketing Services",
  description:
    "Explore RecallX services including paid ads, SEO, conversion optimization, web development, app development, and reputation management.",
  path: "/services",
  keywords: ["marketing services", "paid advertising agency", "SEO agency"],
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
