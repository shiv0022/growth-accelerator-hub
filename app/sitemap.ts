import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/app/lib/seo";

const ROUTES = ["/", "/services", "/why-us", "/process", "/results", "/blog", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
