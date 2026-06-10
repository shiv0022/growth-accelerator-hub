"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ShoppingCart, Users, Heart, TrendingUp, DollarSign, Award, Percent, LucideIcon, ExternalLink, Tag } from "lucide-react";
import Link from "next/link";
import { db, CaseStudy, Project } from "@/app/lib/db";
import Card3DTilt from "@/components/Card3DTilt";
import PerformanceChart from "@/components/PerformanceChart";
import { BreadcrumbListSchema } from "@/components/JsonLd";

const iconMap: Record<string, LucideIcon> = {
  "ShoppingCart": ShoppingCart,
  "Users": Users,
  "Heart": Heart,
  "TrendingUp": TrendingUp,
};

const overallStats = [
  { value: "₹2Cr+", label: "Ad Spend Managed", icon: DollarSign },
  { value: "50+", label: "Brands Scaled", icon: Award },
  { value: "3.5X", label: "Avg. ROAS Delivered", icon: TrendingUp },
  { value: "240%", label: "Avg. Lead Growth", icon: Percent },
];

export default function ResultsPageClient({
  initialCaseStudies = [],
  initialProjects = [],
}: {
  initialCaseStudies: CaseStudy[];
  initialProjects: Project[];
}) {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(initialCaseStudies);
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  useEffect(() => {
    setCaseStudies(db.getCaseStudies());
    setProjects(db.getProjects());

    const handleSync = () => {
      setCaseStudies(db.getCaseStudies());
      setProjects(db.getProjects());
    };
    window.addEventListener("storage", handleSync);
    const interval = setInterval(handleSync, 1000);
    return () => {
      window.removeEventListener("storage", handleSync);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Breadcrumbs Schema */}
      <BreadcrumbListSchema
        items={[
          { name: "Home", url: "https://recallxmarketing.com" },
          { name: "Results", url: "https://recallxmarketing.com/results" }
        ]}
      />

      <main className="py-16 md:py-24">
        {/* Hero */}
        <div className="container-main text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Case Studies & Portfolio</p>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-foreground leading-tight mb-4">
            Real Results for <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0066FF] to-[#06b6d4]">Real Businesses</span>
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Data transparency is our baseline. Explore performance breakdowns, real scaling yields, and projects we&apos;ve built across industries.
          </p>
        </div>

        {/* Overall Stats Cards */}
        <div className="container-main mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {overallStats.map((s) => (
              <div
                key={s.label}
                className="bg-card/45 backdrop-blur-md rounded-2xl border border-border p-6 text-center hover:border-primary/30 transition-all duration-300 flex flex-col items-center"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3.5 border border-primary/20">
                  <s.icon size={18} strokeWidth={2} />
                </div>
                <p className="text-2xl md:text-3xl font-semibold text-foreground mb-1">
                  {s.value}
                </p>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Channel ROI Performance Chart */}
        <div className="container-main mb-20">
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground">Channel ROI Performance Dashboard</h3>
            <p className="text-xs text-muted-foreground mt-1 font-medium">
              Select or hover on the digital channel bars to analyze ad spends and conversions.
            </p>
          </div>
          <PerformanceChart />
        </div>

        {/* Case Studies Detailed List */}
        <div className="container-main grid gap-8 max-w-4xl mx-auto">
          <div className="border-b border-border/40 pb-4 mb-2">
            <h3 className="text-2xl font-semibold text-foreground animate-fade-in">Detailed Performance Records</h3>
          </div>

          {caseStudies.map((c) => {
            let IconComponent = TrendingUp;
            if (c.category.toLowerCase().includes("commerce") || c.category.toLowerCase().includes("d2c")) {
              IconComponent = ShoppingCart;
            } else if (c.category.toLowerCase().includes("health")) {
              IconComponent = Heart;
            } else if (c.category.toLowerCase().includes("saas") || c.category.toLowerCase().includes("b2b")) {
              IconComponent = Users;
            }

            return (
              <Card3DTilt
                key={c.id}
                className="bg-card/40 backdrop-blur-md p-8 border-border/70 flex flex-col gap-6"
              >
                <div className="flex flex-wrap items-center gap-3.5 border-b border-border/20 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                    <IconComponent size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground leading-tight">{c.client}</h2>
                    <span className="text-[10px] font-bold text-muted-foreground/80 uppercase">
                      ⏱ {c.duration} Duration • {c.channel}
                    </span>
                  </div>
                  <span className="ml-auto text-[10px] font-extrabold bg-primary/10 border border-primary/20 text-primary px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                    {c.category}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6 text-xs leading-relaxed font-medium">
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">The Challenge</p>
                    <p className="text-muted-foreground font-normal">{c.challenge}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">Our Solution</p>
                    <p className="text-muted-foreground font-normal">{c.solution}</p>
                  </div>
                </div>

                <div className="border-t border-border/20 pt-5">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Key Results Metrics</p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {c.results.map((r) => (
                      <div key={r.metric} className="bg-background/80 border border-border/60 p-4 rounded-xl text-center hover:border-primary/30 transition-all">
                        <span className="text-[10px] text-muted-foreground uppercase font-semibold">{r.metric}</span>
                        <div className="flex items-baseline justify-center gap-2 mt-1">
                          <p className="text-xl font-semibold text-primary">{r.after}</p>
                          {r.before && r.before !== "—" && (
                            <p className="text-xs text-muted-foreground line-through font-semibold">{r.before}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card3DTilt>
            );
          })}
        </div>

        {/* ===== OUR PROJECTS SECTION ===== */}
        <div className="container-main mt-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Our Portfolio</p>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground leading-tight mb-4">
              Projects We&apos;ve <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0066FF] to-[#06b6d4]">Built & Shipped</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              From e-commerce platforms to mobile apps and SaaS dashboards — explore the products we&apos;ve designed, developed, and launched for our clients.
            </p>
          </div>

          {projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto animate-fade-up">
              {projects.map((p) => (
                <Link key={p.id} href={`/results/${p.id}`} className="block h-full group">
                  <Card3DTilt className="flex flex-col h-full bg-card/45 border-border/80 overflow-hidden p-0 relative">
                    {/* Project Image */}
                    <div className="aspect-video w-full overflow-hidden relative bg-neutral-900 border-b border-border/40">
                      {p.projectImage ? (
                        <img
                          src={p.projectImage}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-gradient-to-br from-primary/5 to-primary/10">
                          <ExternalLink size={32} className="text-primary/30" />
                        </div>
                      )}
                      <span className="absolute top-3 left-3 text-[9px] font-extrabold bg-primary/80 border border-white/20 text-white px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {p.category}
                      </span>
                    </div>

                    {/* Project Info */}
                    <div className="p-5 flex flex-col flex-grow font-medium">
                      <h3 className="font-semibold text-base mb-2 text-foreground group-hover:text-primary transition-colors leading-tight">
                        {p.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-grow line-clamp-3 font-normal">
                        {p.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {p.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] font-bold bg-secondary/80 border border-border/60 text-muted-foreground px-2 py-1 rounded-full flex items-center gap-0.5"
                          >
                            <Tag size={8} /> {tag}
                          </span>
                        ))}
                        {p.tags.length > 3 && (
                          <span className="text-[9px] font-bold text-muted-foreground px-2 py-1">
                            +{p.tags.length - 3} more
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-xs font-bold text-primary border-t border-border/20 pt-4 mt-auto">
                        View Project Details <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card3DTilt>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-card/20 border border-border/40 rounded-2xl max-w-md mx-auto">
              <ExternalLink size={32} className="mx-auto mb-3 text-primary/40" />
              <h4 className="font-bold text-foreground">No projects yet</h4>
              <p className="text-xs text-muted-foreground mt-1">Add your first project from the admin panel.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
