import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { labs } from "@/lib/labs";

const difficultyColor: Record<string, string> = {
  beginner: "bg-beginner/10 text-beginner",
  intermediate: "bg-intermediate/10 text-intermediate",
  advanced: "bg-advanced/10 text-advanced",
};

export const metadata = {
  title: "Labs — LLM System Lab",
  description: "LLM 시스템의 핵심 개념을 직접 실험하며 학습합니다",
};

export default function LabsPage() {
  return (
    <main className="flex-1 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-content">
            Interactive Labs
          </h1>
          <p className="mt-2 text-content-muted">
            파라미터를 조절하며 LLM 시스템의 동작을 직접 실험해보세요
          </p>
        </div>

        {/* Lab Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {labs.map((lab) => (
            <Link key={lab.slug} href={`/labs/${lab.slug}`}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className={difficultyColor[lab.difficulty]}
                    >
                      {lab.difficulty}
                    </Badge>
                    <span className="text-xs text-content-muted">
                      {lab.estimatedTime}
                    </span>
                  </div>
                  <CardTitle className="mt-2">{lab.title}</CardTitle>
                  <CardDescription>{lab.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {lab.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-surface px-2.5 py-0.5 text-xs text-content-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {lab.relatedTopics.length > 0 && (
                    <div className="mt-3 text-xs text-content-muted">
                      관련 개념: {lab.relatedTopics.join(", ")}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
