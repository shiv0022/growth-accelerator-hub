import { db } from "@/app/lib/db";
import BlogListPageClient from "./BlogListPageClient";

export const dynamic = 'force-dynamic';

export default function BlogListPage() {
  const blogs = db.getBlogs();

  return <BlogListPageClient initialBlogs={blogs} />;
}
