import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const learningTracks = [
  { title: "Foundations", description: "LLM 기본 메커니즘 이해", color: "bg-track-foundations", step: 1 },
  { title: "Representation", description: "Embedding과 의미 공간", color: "bg-track-representation", step: 2 },
  { title: "Retrieval", description: "검색 시스템 구조", color: "bg-track-retrieval", step: 3 },
  { title: "Generation", description: "RAG와 응답 생성", color: "bg-track-generation", step: 4 },
  { title: "Inference", description: "추론 최적화", color: "bg-track-inference", step: 5 },
  { title: "Production", description: "운영 가능한 AI 시스템", color: "bg-track-production", step: 6 },
];

const featuredConcepts = [
  { title: "Transformer", slug: "transformer", difficulty: "beginner", category: "Foundations" },
  { title: "Attention", slug: "attention", difficulty: "beginner", category: "Foundations" },
  { title: "Embedding", slug: "embedding", difficulty: "beginner", category: "Representation" },
  { title: "RAG Pipeline", slug: "rag-pipeline", difficulty: "intermediate", category: "Generation" },
  { title: "HNSW", slug: "hnsw", difficulty: "intermediate", category: "Retrieval" },
  { title: "KV Cache", slug: "kv-cache", difficulty: "intermediate", category: "Foundations" },
];

const labPreviews = [
  { title: "Embedding Space Lab", slug: "embedding-space-lab", concept: "Embedding / Similarity" },
  { title: "Chunking Lab", slug: "chunking-lab", concept: "Context Window / RAG" },
  { title: "Temperature Lab", slug: "temperature-lab", concept: "Sampling / Generation" },
];

const difficultyColor: Record<string, string> = {
  beginner: "bg-beginner/10 text-beginner",
  intermediate: "bg-intermediate/10 text-intermediate",
  advanced: "bg-advanced/10 text-advanced",
};

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-surface-white px-4 py-12 text-center sm:py-20">
        <h1 className="text-3xl font-bold tracking-tight text-content sm:text-4xl lg:text-5xl">
          LLM은 모델이 아니라{" "}
          <span className="text-brand">시스템</span>이다
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-content-muted">
          Transformer부터 RAG, Inference, 운영까지 하나의 흐름으로 배운다.
          <br />
          개념 학습 · 시스템 맵 · 인터랙티브 실험을 결합한 LLM 교육 플랫폼.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/learn"
            className="rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            학습 시작하기
          </Link>
          <Link
            href="/system-map"
            className="rounded-lg border border-divider bg-surface-white px-6 py-3 text-sm font-semibold text-content transition-colors hover:bg-surface"
          >
            시스템 맵 보기
          </Link>
          <Link
            href="/labs"
            className="rounded-lg border border-divider bg-surface-white px-6 py-3 text-sm font-semibold text-content transition-colors hover:bg-surface"
          >
            실험실 들어가기
          </Link>
        </div>
      </section>

      {/* Learning Journey */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-content">
            Learning Journey
          </h2>
          <p className="mt-2 text-center text-content-muted">
            6단계 학습 경로로 LLM 시스템을 체계적으로 이해합니다
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {learningTracks.map((track) => (
              <div
                key={track.title}
                className="group relative rounded-xl border border-divider bg-surface-white p-4 text-center transition-shadow hover:shadow-md"
              >
                <div
                  className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${track.color}`}
                >
                  {track.step}
                </div>
                <h3 className="text-sm font-semibold text-content">
                  {track.title}
                </h3>
                <p className="mt-1 text-xs text-content-muted">
                  {track.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Concepts */}
      <section className="bg-surface-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-content">
            Featured Concepts
          </h2>
          <p className="mt-2 text-center text-content-muted">
            핵심 개념을 골라 학습을 시작하세요
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredConcepts.map((concept) => (
              <Link key={concept.slug} href={`/learn/${concept.slug}`}>
                <Card className="transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="secondary"
                        className={difficultyColor[concept.difficulty]}
                      >
                        {concept.difficulty}
                      </Badge>
                      <span className="text-xs text-content-muted">
                        {concept.category}
                      </span>
                    </div>
                    <CardTitle className="mt-2">{concept.title}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Labs */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-content">
            Interactive Labs
          </h2>
          <p className="mt-2 text-center text-content-muted">
            파라미터를 조절하며 직접 실험해 보세요
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {labPreviews.map((lab) => (
              <Link key={lab.slug} href={`/labs/${lab.slug}`}>
                <Card className="transition-shadow hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">{lab.title}</CardTitle>
                    <CardDescription>{lab.concept}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
