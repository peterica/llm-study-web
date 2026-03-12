import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { caseStudies } from "@/lib/case-studies";

const difficultyColor: Record<string, string> = {
  intermediate: "bg-intermediate/10 text-intermediate",
  advanced: "bg-advanced/10 text-advanced",
};

export const metadata = {
  title: "Case Studies — LLM System Lab",
  description: "실제 시스템에서 LLM 기술이 어떻게 활용되는지 사례를 통해 학습합니다",
};

export default function CaseStudiesPage() {
  return (
    <main className="flex-1 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-content">Case Studies</h1>
          <p className="mt-2 text-content-muted">
            실제 시스템에서 LLM 기술이 어떻게 활용되는지 사례를 통해 학습합니다
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {caseStudies.map((cs) => (
            <Link key={cs.slug} href={`/case-studies/${cs.slug}`}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className={difficultyColor[cs.difficulty]}
                    >
                      {cs.difficulty}
                    </Badge>
                    <span className="text-xs text-content-muted">
                      {cs.industry}
                    </span>
                  </div>
                  <CardTitle className="mt-2">{cs.title}</CardTitle>
                  <CardDescription>{cs.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {cs.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-surface px-2.5 py-0.5 text-xs text-content-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
