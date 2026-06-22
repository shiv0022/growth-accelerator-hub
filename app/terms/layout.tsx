import type { Metadata } from "next";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service",
  description: "Read the Terms of Service of RecallX Marketing to understand our client agreements, liability boundaries, and legal frameworks.",
  path: "/terms",
  keywords: ["terms of service", "user agreements", "legal terms"],
});

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
