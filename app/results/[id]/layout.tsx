import type { Metadata } from "next";
import { db } from "@/app/lib/db";
import { createPageMetadata } from "@/app/lib/seo";

type ResultDetailLayoutProps = {
  children: React.ReactNode;
  params: {
    id: string;
  };
};

export function generateMetadata({ params }: ResultDetailLayoutProps): Metadata {
  const project = db.getProjectById(params.id);

  if (!project) {
    return createPageMetadata({
      title: "Project Case Study",
      description: "Explore RecallX project case studies and execution details.",
      path: `/results/${params.id}`,
      keywords: ["project case study"],
    });
  }

  return createPageMetadata({
    title: project.title,
    description: project.description,
    path: `/results/${params.id}`,
    image: project.projectImage,
    keywords: [project.category, ...project.tags, "project results"],
  });
}

export default function ResultDetailLayout({ children }: ResultDetailLayoutProps) {
  return children;
}
