"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { LabInfo } from "@/lib/labs";

const difficultyColor: Record<string, string> = {
  beginner: "bg-beginner/10 text-beginner",
  intermediate: "bg-intermediate/10 text-intermediate",
  advanced: "bg-advanced/10 text-advanced",
};

interface LabShellProps {
  lab: LabInfo;
  children?: React.ReactNode;
}

export default function LabShell({ lab, children }: LabShellProps) {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <nav className="mb-4 text-sm text-content-muted">
          <Link href="/labs" className="hover:text-brand">
            Labs
          </Link>
          <span className="mx-2">&rsaquo;</span>
          <span>{lab.title}</span>
        </nav>

        <h1 className="text-3xl font-bold text-content">{lab.title}</h1>
        <p className="mt-2 text-content-muted">{lab.description}</p>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Badge
            variant="secondary"
            className={difficultyColor[lab.difficulty]}
          >
            {lab.difficulty}
          </Badge>
          <span className="text-sm text-content-muted">
            {lab.estimatedTime}
          </span>
        </div>
      </div>

      {/* Parameter Panel + Visualization */}
      <div className="rounded-lg border border-divider bg-surface">
        {/* Parameter Zone */}
        <div className="border-b border-divider p-4">
          <h3 className="text-sm font-semibold uppercase text-content-muted">
            Parameters
          </h3>
          <p className="mt-2 text-sm text-content-muted">
            이 실험의 인터랙티브 파라미터는 콘텐츠 구현 시 추가됩니다
          </p>
        </div>

        {/* Visualization Zone */}
        <div className="flex min-h-[250px] items-center justify-center p-4 sm:min-h-[300px] sm:p-8">
          {children || (
            <div className="text-center text-content-muted">
              <div className="text-4xl">🔬</div>
              <p className="mt-2 text-sm">시각화 영역</p>
              <p className="text-xs">Lab 콘텐츠 구현 시 인터랙티브 시각화가 이곳에 표시됩니다</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Topics */}
      {lab.relatedTopics.length > 0 && (
        <div className="mt-8 rounded-lg border border-divider bg-surface p-6">
          <h3 className="text-lg font-semibold text-content">관련 개념</h3>
          <div className="mt-3 flex flex-wrap gap-3">
            {lab.relatedTopics.map((slug) => (
              <Link
                key={slug}
                href={`/learn/${slug}`}
                className="rounded-md bg-brand/10 px-4 py-2 text-sm font-medium text-brand transition-colors hover:bg-brand/20"
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
