"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { SystemNodeData } from "./SystemNode";

interface NodeDetailPanelProps {
  data: SystemNodeData | null;
}

export default function NodeDetailPanel({ data }: NodeDetailPanelProps) {
  if (!data) {
    return (
      <div className="rounded-lg border border-divider bg-surface p-6 text-center text-sm text-content-muted">
        노드를 클릭하면 상세 정보가 표시됩니다
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-divider bg-surface p-6">
      <h3 className="text-lg font-semibold text-content">{data.label}</h3>
      <Badge variant="secondary" className="mt-2 text-xs">
        {data.category}
      </Badge>
      <p className="mt-3 text-sm leading-relaxed text-content-muted">
        {data.description}
      </p>

      {data.topicSlug && (
        <Link
          href={`/learn/${data.topicSlug}`}
          className="mt-4 inline-block rounded-md bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand/90"
        >
          학습하기
        </Link>
      )}

      {data.relatedLabs.length > 0 && (
        <div className="mt-4">
          <span className="text-xs font-semibold uppercase text-content-muted">
            관련 실험
          </span>
          <div className="mt-1 flex flex-wrap gap-2">
            {data.relatedLabs.map((lab) => (
              <Link
                key={lab}
                href={`/labs/${lab}`}
                className="text-sm text-highlight hover:underline"
              >
                {lab}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
