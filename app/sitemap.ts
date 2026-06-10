import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/app/lib/seo";
import { db } from "@/app/lib/db";

const ROUTES = ["/", "/services", "/why-us", "/process", "/results", "/blog", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  
  const staticRoutes = ROUTES.map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1.0 : 0.8,
  }));

  const blogs = db.getBlogs();
  const blogRoutes = blogs.map((blog) => ({
    url: absoluteUrl(`/blog/${blog.slug}`),
    lastModified: new Date(blog.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
