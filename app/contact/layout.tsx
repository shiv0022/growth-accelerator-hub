import type { Metadata } from "next";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact RecallX",
  description:
    "Contact RecallX for growth strategy, paid ads, SEO, and conversion optimization services. Share your goals and get a tailored plan.",
  path: "/contact",
  keywords: ["contact marketing agency", "growth consultation", "digital marketing inquiry"],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
