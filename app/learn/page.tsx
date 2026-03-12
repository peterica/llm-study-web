import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { tracks, learningPaths } from "@/lib/tracks";
import { labs } from "@/lib/labs";
import ProgressSummary from "@/components/navigation/ProgressSummary";
import BookmarkList from "@/components/navigation/BookmarkList";

const difficultyColor: Record<string, string> = {
  beginner: "bg-beginner/10 text-beginner",
  intermediate: "bg-intermediate/10 text-intermediate",
  advanced: "bg-advanced/10 text-advanced",
};

export default function LearnPage() {
  return (
    <main className="flex-1 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-content">
            LLM System Learning Path
          </h1>
          <p className="mt-2 text-content-muted">
            LLM 시스템의 핵심 개념을 트랙별로 체계적으로 학습합니다
          </p>
        </div>

        {/* Progress Summary + Bookmarks */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <ProgressSummary
            totalTopics={tracks.reduce((sum, t) => sum + t.topics.length, 0)}
            totalLabs={labs.length}
          />
          <BookmarkList />
        </div>

        {/* Track Cards */}
        <section className="mt-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tracks.map((track) => (
              <Card key={track.id} className="overflow-hidden">
                <div className={`h-1.5 ${track.color}`} />
                <CardHeader>
                  <CardTitle>{track.title}</CardTitle>
                  <CardDescription>{track.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {track.topics.map((topic) => (
                      <li key={topic.slug}>
                        <Link
                          href={`/learn/${topic.slug}`}
                          className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-surface"
                        >
                          <span className="text-content">{topic.title}</span>
                          <Badge
                            variant="secondary"
                            className={`text-xs ${difficultyColor[topic.difficulty]}`}
                          >
                            {topic.difficulty}
                          </Badge>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recommended Paths */}
        <section className="mt-16">
          <h2 className="text-center text-2xl font-bold text-content">
            추천 학습 경로
          </h2>
          <p className="mt-2 text-center text-content-muted">
            당신의 목표에 맞는 경로를 선택하세요
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {learningPaths.map((path) => (
              <Card key={path.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{path.title}</CardTitle>
                  <CardDescription>{path.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2">
                    {path.steps.map((step, idx) => (
                      <li
                        key={step}
                        className="flex items-center gap-3 text-sm text-content-muted"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-semibold text-brand">
                          {idx + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
