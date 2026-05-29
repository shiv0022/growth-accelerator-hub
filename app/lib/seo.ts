import type { Metadata } from "next";

export const SITE_NAME = "RecallX Marketing";
export const DEFAULT_OG_IMAGE = "/hero-bg.jpg";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
export const SITE_URL = rawSiteUrl.endsWith("/") ? rawSiteUrl.slice(0, -1) : rawSiteUrl;

const BASE_KEYWORDS = [
  "digital marketing agency",
  "performance marketing",
  "paid ads",
  "SEO",
  "conversion optimization",
  "growth marketing",
];

export const absoluteUrl = (path: string) => new URL(path, `${SITE_URL}/`).toString();

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
};

export const createPageMetadata = ({
  title,
  description,
  path,
  keywords = [],
  image = DEFAULT_OG_IMAGE,
}: PageMetadataInput): Metadata => {
  const canonical = absoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title,
    description,
    keywords: [...BASE_KEYWORDS, ...keywords],
    alternates: {
      canonical,
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
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
};
