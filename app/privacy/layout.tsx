import type { Metadata } from "next";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "Read the Privacy Policy of RecallX Marketing to understand how we collect, protect, and process your data.",
  path: "/privacy",
  keywords: ["privacy policy", "data safety", "user data policy"],
});

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
