import type { Metadata } from "next";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Get In Touch | Contact RecallX Marketing",
  description:
    "Get a free 30-minute growth strategy consultation. Tell us about your marketing and development goals and get a custom execution roadmap.",
  path: "/contact",
  keywords: ["contact marketing agency", "free marketing consultation", "growth blueprint"],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
