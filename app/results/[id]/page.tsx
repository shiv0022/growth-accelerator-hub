"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db, Project } from "@/app/lib/db";
import { ArrowLeft, ExternalLink, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = params.id as string;
    const found = db.getProjectById(id);
    if (found) {
      setProject(found);
    }
  }, [params.id]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-foreground">Project not found</h2>
        <Button variant="outline" onClick={() => router.push("/results")} className="rounded-full font-bold text-xs gap-1.5">
          <ArrowLeft size={14} /> Back to Results
        </Button>
      </div>
    );
  }

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Simple markdown-to-HTML renderer for detailed content
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];

    lines.forEach((line, i) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("## ")) {
        elements.push(
          <h2 key={i} className="text-xl md:text-2xl font-sans font-bold text-foreground mt-8 mb-4 pb-2 border-b border-border/30">
            {trimmed.replace("## ", "")}
          </h2>
        );
      } else if (trimmed.startsWith("### ")) {
        elements.push(
          <h3 key={i} className="text-lg font-sans font-semibold text-foreground mt-6 mb-3">
            {trimmed.replace("### ", "")}
          </h3>
        );
      } else if (trimmed.startsWith("- **")) {
        const match = trimmed.match(/^- \*\*(.+?)\*\*:?\s*(.*)$/);
        if (match) {
          elements.push(
            <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed ml-4 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span><strong className="text-foreground font-semibold">{match[1]}</strong>{match[2] ? `: ${match[2]}` : ""}</span>
            </li>
          );
        }
      } else if (trimmed.startsWith("- ")) {
        elements.push(
          <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed ml-4 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span>{trimmed.replace("- ", "")}</span>
          </li>
        );
      } else if (/^\d+\.\s\*\*/.test(trimmed)) {
        const match = trimmed.match(/^\d+\.\s\*\*(.+?)\*\*:?\s*(.*)$/);
        if (match) {
          elements.push(
            <div key={i} className="mb-4 ml-1">
              <p className="text-sm text-foreground font-semibold mb-1">{match[1]}</p>
              {match[2] && <p className="text-sm text-muted-foreground leading-relaxed">{match[2]}</p>}
            </div>
          );
        }
      } else if (trimmed === "") {
        elements.push(<div key={i} className="h-2" />);
      } else if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
        elements.push(
          <p key={i} className="text-sm font-semibold text-foreground mt-4 mb-2">
            {trimmed.replace(/\*\*/g, "")}
          </p>
        );
      } else {
        elements.push(
          <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-3">
            {trimmed}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative w-full h-[340px] md:h-[420px] overflow-hidden">
        <img
          src={project.projectImage}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        {/* Back button overlay */}
        <div className="absolute top-6 left-6">
          <Button 
            variant="outline" 
            onClick={() => router.push("/results")} 
            className="rounded-full font-bold text-xs gap-1.5 bg-white/90 backdrop-blur-sm border-white/50 hover:bg-white shadow-lg"
          >
            <ArrowLeft size={14} /> Back to Results
          </Button>
        </div>
      </div>

      {/* Content */}
      <main className="container-main max-w-4xl mx-auto -mt-20 relative z-10 pb-20">
        {/* Project Header Card */}
        <div className="bg-card/80 backdrop-blur-xl border border-border/60 rounded-2xl p-8 md:p-10 shadow-2xl mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-[10px] font-extrabold bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-full uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground flex items-center gap-1">
              <Calendar size={11} /> {formatDate(project.createdAt)}
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-sans font-bold text-foreground leading-tight mb-4">
            {project.title}
          </h1>

          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold bg-secondary/80 border border-border/60 text-muted-foreground px-3 py-1.5 rounded-full flex items-center gap-1"
              >
                <Tag size={10} /> {tag}
              </span>
            ))}
          </div>

          {/* Visit project link */}
          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-xs font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40"
            >
              <ExternalLink size={14} /> Visit Live Project
            </a>
          )}
        </div>

        {/* Detailed Content */}
        <div className="bg-card/40 backdrop-blur-md border border-border/40 rounded-2xl p-8 md:p-10">
          <div className="prose-custom">
            {renderContent(project.detailedContent)}
          </div>
        </div>
      </main>
    </div>
  );
}
