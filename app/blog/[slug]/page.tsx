import { db } from "@/app/lib/db";
import BlogDetailPageClient from "./BlogDetailPageClient";

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = db.getBlogBySlug(params.slug) || null;

  return <BlogDetailPageClient initialBlog={blog} slug={params.slug} />;
}
