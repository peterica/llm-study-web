import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const difficultyColor: Record<string, string> = {
  beginner: "bg-beginner/10 text-beginner",
  intermediate: "bg-intermediate/10 text-intermediate",
  advanced: "bg-advanced/10 text-advanced",
};

interface TopicHeroProps {
  title: string;
  category: string;
  difficulty: string;
  readingTime: string;
  prerequisites: string[];
}

export default function TopicHero({
  title,
  category,
  difficulty,
  readingTime,
  prerequisites,
}: TopicHeroProps) {
  return (
    <div className="mb-8">
      {/* Breadcrumb */}
      <nav className="mb-4 text-sm text-content-muted">
        <Link href="/learn" className="hover:text-brand">
          Learn
        </Link>
        <span className="mx-2">›</span>
        <span>{category}</span>
      </nav>

      {/* Title */}
      <h1 className="text-3xl font-bold text-content">{title}</h1>

      {/* Meta */}
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Badge variant="secondary" className={difficultyColor[difficulty]}>
          {difficulty}
        </Badge>
        {readingTime && (
          <span className="text-sm text-content-muted">{readingTime}</span>
        )}
      </div>

      {/* Prerequisites */}
      {prerequisites.length > 0 && (
        <div className="mt-4 rounded-lg bg-surface p-3">
          <span className="text-xs font-semibold uppercase text-content-muted">
            선행 개념
          </span>
          <div className="mt-1 flex flex-wrap gap-2">
            {prerequisites.map((slug) => (
              <Link
                key={slug}
                href={`/learn/${slug}`}
                className="text-sm text-brand hover:underline"
              >
                {slug}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
