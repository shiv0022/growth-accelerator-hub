import { db } from "@/app/lib/db";
import ResultsPageClient from "./ResultsPageClient";

export default function ResultsPage() {
  const caseStudies = db.getCaseStudies();
  const projects = db.getProjects();

  return (
    <ResultsPageClient
      initialCaseStudies={caseStudies}
      initialProjects={projects}
    />
  );
}
