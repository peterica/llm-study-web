import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { CaseStudyInfo } from "@/lib/case-studies";

const difficultyColor: Record<string, string> = {
  intermediate: "bg-intermediate/10 text-intermediate",
  advanced: "bg-advanced/10 text-advanced",
};

interface CaseStudyShellProps {
  caseStudy: CaseStudyInfo;
  children: React.ReactNode;
}

export default function CaseStudyShell({
  caseStudy,
  children,
}: CaseStudyShellProps) {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <nav className="mb-4 text-sm text-content-muted">
          <Link href="/case-studies" className="hover:text-brand">
            Case Studies
          </Link>
          <span className="mx-2">&rsaquo;</span>
          <span>{caseStudy.title}</span>
        </nav>

        <h1 className="text-3xl font-bold text-content">{caseStudy.title}</h1>
        <p className="mt-2 text-content-muted">{caseStudy.description}</p>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Badge
            variant="secondary"
            className={difficultyColor[caseStudy.difficulty]}
          >
            {caseStudy.difficulty}
          </Badge>
          <span className="text-sm text-content-muted">
            {caseStudy.industry}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {caseStudy.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-surface px-2.5 py-0.5 text-xs text-content-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* MDX Content */}
      {children}
    </div>
  );
}
