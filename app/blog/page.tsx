import { db } from "@/app/lib/db";
import BlogListPageClient from "./BlogListPageClient";

export default function BlogListPage() {
  const blogs = db.getBlogs();

  return <BlogListPageClient initialBlogs={blogs} />;
}
