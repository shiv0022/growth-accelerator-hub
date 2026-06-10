"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db, Blog } from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Clock, ChevronRight, Tag } from "lucide-react";
import Link from "next/link";
import { BreadcrumbListSchema } from "@/components/JsonLd";

export default function BlogDetailPageClient({
  initialBlog,
  slug,
}: {
  initialBlog: Blog | null;
  slug: string;
}) {
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(initialBlog);

  useEffect(() => {
    // If not loaded on server (e.g. dynamic local storage blog created on client), try client-side fetch
    if (!blog && slug) {
      const match = db.getBlogBySlug(slug);
      if (match) {
        setBlog(match);
      }
    }
  }, [slug, blog]);

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!blog) {
    return (
      <div className="min-h-screen bg-background py-20 flex flex-col items-center justify-center text-center font-sans">
        <h2 className="text-3xl font-black text-foreground mb-2">Article Not Found</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm font-medium">The article you are trying to view does not exist or was deleted.</p>
        <Button onClick={() => router.push("/blog")} className="rounded-full font-bold">
          <ArrowLeft size={16} className="mr-2" /> Back to Blog Directory
        </Button>
      </div>
    );
  }

  const renderContent = (contentStr: string) => {
    return contentStr.split("\n\n").map((block, idx) => {
      if (block.startsWith("### ")) {
        return (
          <h3 key={idx} className="text-lg md:text-xl font-bold text-foreground mt-8 mb-4 border-b border-border/20 pb-2">
            {block.replace("### ", "")}
          </h3>
        );
      } else if (block.startsWith("## ")) {
        return (
          <h2 key={idx} className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-4 border-b border-border/20 pb-2">
            {block.replace("## ", "")}
          </h2>
        );
      } else if (block.startsWith("- ")) {
        return (
          <ul key={idx} className="list-disc pl-5 my-4 space-y-2 text-sm text-muted-foreground">
            {block.split("\n").map((li, lIdx) => (
              <li key={lIdx} className="leading-relaxed font-medium">
                {li.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "$1")}
              </li>
            ))}
          </ul>
        );
      } else if (block.startsWith("1. ")) {
        return (
          <ol key={idx} className="list-decimal pl-5 my-4 space-y-2 text-sm text-muted-foreground">
            {block.split("\n").map((li, lIdx) => (
              <li key={lIdx} className="leading-relaxed font-medium">
                {li.substring(3).replace(/\*\*(.*?)\*\*/g, "$1")}
              </li>
            ))}
          </ol>
        );
      } else {
        return (
          <p key={idx} className="text-sm text-muted-foreground leading-relaxed my-4 font-medium">
            {block}
          </p>
        );
      }
    });
  };

  // Generate BlogPosting JSON-LD schema
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "image": blog.coverImage ? [blog.coverImage] : ["https://recallxmarketing.com/hero-bg.jpg"],
    "datePublished": blog.createdAt,
    "dateModified": blog.createdAt,
    "author": [{
      "@type": "Person",
      "name": blog.author,
      "url": "https://recallxmarketing.com/why-us"
    }],
    "publisher": {
      "@type": "Organization",
      "name": "RecallX Marketing",
      "logo": {
        "@type": "ImageObject",
        "url": "https://recallxmarketing.com/logo-rx.png"
      }
    },
    "description": blog.summary
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Blog Posting Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      {/* Breadcrumbs Schema */}
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://recallxmarketing.com" },
          { name: "Blog", url: "https://recallxmarketing.com/blog" },
          { name: blog.title, url: `https://recallxmarketing.com/blog/${blog.slug}` }
        ]}
      />

      <main className="py-12 md:py-20">
        <div className="container-main max-w-4xl mx-auto">
          {/* Breadcrumb links in view */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold mb-8 border-b border-border/40 pb-4">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <ChevronRight size={12} />
            <span className="text-foreground truncate max-w-[200px] sm:max-w-xs">{blog.title}</span>
          </div>

          <Button variant="ghost" onClick={() => router.push("/blog")} className="mb-6 font-bold hover:text-primary text-xs">
            <ArrowLeft size={16} className="mr-1.5" /> Back to Articles
          </Button>

          {/* Title Header */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-full uppercase tracking-wider mb-4">
              <Tag size={10} /> {blog.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-sans font-bold leading-tight text-foreground mb-4">
              {blog.title}
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed border-l-2 border-primary/50 pl-4 italic mb-6">
              {blog.summary}
            </p>

            {/* Author info */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground font-semibold border-y border-border/40 py-3.5">
              <span className="flex items-center gap-1.5">
                <User size={13} className="text-primary" /> {blog.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} className="text-primary" /> {formatDate(blog.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} className="text-primary" /> 4 min read
              </span>
            </div>
          </div>

          {/* Banner cover image */}
          {blog.coverImage && (
            <div className="rounded-3xl overflow-hidden aspect-video w-full mb-10 shadow-2xl border border-border/80 relative">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article body */}
          <div className="prose prose-neutral dark:prose-invert max-w-none border-b border-border/40 pb-10">
            {renderContent(blog.content)}
          </div>

          {/* CTA footer box */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 mt-12 text-center backdrop-blur-sm shadow-md">
            <h3 className="text-xl font-extrabold text-foreground mb-2">Want to consult about these trends?</h3>
            <p className="text-xs text-muted-foreground mb-5 max-w-sm mx-auto font-medium">Discuss custom Google/Meta campaign architecture and website CRO layouts with our tech leads.</p>
            <Button onClick={() => router.push("/contact")} className="rounded-full font-bold">
              Schedule Growth Call <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
