import type { Metadata } from "next";
import { db } from "@/app/lib/db";
import { createPageMetadata } from "@/app/lib/seo";

type BlogDetailLayoutProps = {
  children: React.ReactNode;
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: BlogDetailLayoutProps): Metadata {
  const blog = db.getBlogBySlug(params.slug);

  if (!blog) {
    return createPageMetadata({
      title: "Article",
      description: "Read marketing insights from the RecallX knowledge hub.",
      path: `/blog/${params.slug}`,
      keywords: ["marketing article"],
    });
  }

  return createPageMetadata({
    title: blog.title,
    description: blog.summary,
    path: `/blog/${params.slug}`,
    image: blog.coverImage,
    keywords: [blog.category, blog.author, "growth marketing article"],
  });
}

export default function BlogDetailLayout({ children }: BlogDetailLayoutProps) {
  return children;
}
