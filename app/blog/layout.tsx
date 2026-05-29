import type { Metadata } from "next";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Marketing Blog and Insights",
  description:
    "Read actionable growth marketing insights, ad optimization tactics, SEO strategies, and conversion playbooks from RecallX.",
  path: "/blog",
  keywords: ["marketing blog", "SEO tips", "paid ads insights", "CRO strategies"],
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
