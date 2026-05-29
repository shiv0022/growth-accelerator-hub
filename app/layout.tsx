import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { SITE_NAME, SITE_URL, absoluteUrl, DEFAULT_OG_IMAGE } from "@/app/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Scale Faster. Convert Better. Dominate Digital.",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "RecallX is a performance-driven digital marketing agency focused on paid ads, SEO, funnel optimization, and measurable growth.",
  keywords: [
    "digital marketing agency",
    "performance marketing",
    "paid ads",
    "SEO services",
    "conversion optimization",
    "marketing funnel",
    "growth marketing",
  ],
  authors: [{ name: "RecallX Marketing" }],
  icons: {
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", rel: "shortcut icon" },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: `${SITE_NAME} | Performance Marketing Agency`,
    description:
      "Performance marketing strategies designed to maximize ROI and accelerate measurable growth.",
    type: "website",
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE),
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Performance Marketing Agency`,
    description:
      "Performance marketing strategies designed to maximize ROI and accelerate measurable growth.",
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-background text-foreground antialiased font-sans overflow-x-hidden">
        <TooltipProvider>
          <Navbar />
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </body>
    </html>
  );
}
