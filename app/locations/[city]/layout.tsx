import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/app/lib/seo";

type LocationLayoutProps = {
  children: React.ReactNode;
  params: {
    city: string;
  };
};

const CITY_NAMES: Record<string, string> = {
  india: "India",
  delhi: "Delhi",
  noida: "Noida",
  gurgaon: "Gurgaon",
  mumbai: "Mumbai",
  bangalore: "Bangalore",
};

export function generateMetadata({ params }: LocationLayoutProps): Metadata {
  const cityKey = params.city.toLowerCase();
  const cityName = CITY_NAMES[cityKey];

  if (!cityName) {
    notFound();
  }

  const isNational = cityKey === "india";
  const title = isNational
    ? "Performance Marketing & Digital Agency India | RecallX"
    : `Performance Marketing Agency in ${cityName} | RecallX`;
  const description = isNational
    ? "RecallX is India's leading performance-driven digital marketing agency. We specialize in Meta Ads, Google Ads, SEO, and conversion funnel optimization."
    : `Looking for a results-driven performance marketing, PPC ads, and SEO agency in ${cityName}? RecallX helps businesses in ${cityName} scale ROAS and grow revenue.`;

  return createPageMetadata({
    title,
    description,
    path: `/locations/${cityKey}`,
    keywords: [
      `marketing agency ${cityName}`,
      `digital agency ${cityName}`,
      `performance marketing ${cityName}`,
      `SEO agency ${cityName}`,
      `Google ads partner ${cityName}`,
      `advertising agency ${cityName}`
    ],
  });
}

export default function LocationLayout({ children }: LocationLayoutProps) {
  return children;
}
