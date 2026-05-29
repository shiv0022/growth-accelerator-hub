"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db, Blog } from "@/app/lib/db";
import Card3DTilt from "@/components/Card3DTilt";
import { Sparkles, Calendar, User, ArrowRight } from "lucide-react";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setBlogs(db.getBlogs());

    const handleSync = () => {
      setBlogs(db.getBlogs());
    };
    window.addEventListener("storage", handleSync);
    const interval = setInterval(handleSync, 1000);
    return () => {
      window.removeEventListener("storage", handleSync);
      clearInterval(interval);
    };
  }, []);

  const categories = ["All", ...Array.from(new Set(blogs.map(b => b.category)))];

  const filteredBlogs = selectedCategory === "All"
    ? blogs
    : blogs.filter(b => b.category === selectedCategory);

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading Marketing Blogs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="py-16 md:py-24">
        {/* Header Hero */}
        <div className="container-main text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Growth Insights</p>
          <h1 className="text-4xl md:text-6xl font-sans font-medium tracking-tight text-foreground leading-tight mb-4">
            RecallX <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0066FF] to-[#06b6d4] font-medium">Knowledge Hub</span>
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Data insights, advertising hacks, optimization checklists, and development paradigms to scale your margins.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="container-main mb-12 flex flex-wrap justify-center gap-2 animate-fade-up">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                selectedCategory === cat
                  ? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-card/40 border-border/80 text-muted-foreground hover:text-foreground hover:bg-card/85"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blogs Grid */}
        <div className="container-main">
          {filteredBlogs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((b) => (
                <Link key={b.id} href={`/blog/${b.slug}`} className="block h-full group">
                  <Card3DTilt className="flex flex-col h-full bg-card/45 border-border/80 overflow-hidden p-0 relative">
                    {/* Cover image */}
                    <div className="aspect-video w-full overflow-hidden relative bg-neutral-900 border-b border-border/40">
                      {b.coverImage ? (
                        <img
                          src={b.coverImage}
                          alt={b.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <Sparkles size={24} className="text-primary/45" />
                        </div>
                      )}
                      <span className="absolute top-3 left-3 text-[9px] font-extrabold bg-primary/80 border border-white/20 text-white px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {b.category}
                      </span>
                    </div>

                    {/* Blog Info */}
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-semibold mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} /> {formatDate(b.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={11} /> {b.author}
                        </span>
                      </div>

                      <h3 className="font-sans font-semibold text-base mb-2 text-foreground group-hover:text-primary transition-colors leading-tight">
                        {b.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-6 flex-grow line-clamp-3">
                        {b.summary}
                      </p>

                      <div className="flex items-center gap-1 text-xs font-bold text-primary border-t border-border/20 pt-4 mt-auto">
                        Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card3DTilt>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-card/20 border border-border/40 rounded-2xl max-w-md mx-auto">
              <Sparkles size={32} className="mx-auto mb-3 text-primary/40" />
              <h4 className="font-bold text-foreground">No articles found</h4>
              <p className="text-xs text-muted-foreground mt-1">Try toggling another category filter or add a blog post in the admin panel.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
