"use client";

import { useState, useEffect } from "react";
import { getProgress } from "@/lib/progress";

interface ProgressSummaryProps {
  totalTopics: number;
  totalLabs: number;
}

export default function ProgressSummary({
  totalTopics,
  totalLabs,
}: ProgressSummaryProps) {
  const [completedTopics, setCompletedTopics] = useState(0);
  const [completedLabs, setCompletedLabs] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const progress = getProgress();
    setCompletedTopics(progress.completedTopics.length);
    setCompletedLabs(progress.completedLabs.length);
  }, []);

  if (!mounted) return null;

  const total = totalTopics + totalLabs;
  const completed = completedTopics + completedLabs;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  if (completed === 0) return null;

  return (
    <div className="rounded-lg border bg-surface p-4 dark:bg-gray-800/50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-content">학습 진행률</h3>
        <span className="text-sm font-bold text-brand">{percentage}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full rounded-full bg-brand transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="mt-2 flex gap-4 text-xs text-content-muted">
        <span>
          Topic: {completedTopics}/{totalTopics}
        </span>
        <span>
          Lab: {completedLabs}/{totalLabs}
        </span>
      </div>
    </div>
  );
}
