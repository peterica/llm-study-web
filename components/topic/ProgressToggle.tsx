"use client";

import { useState, useEffect } from "react";
import {
  isTopicComplete,
  markTopicComplete,
  markTopicIncomplete,
} from "@/lib/progress";

export default function ProgressToggle({ slug }: { slug: string }) {
  const [completed, setCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCompleted(isTopicComplete(slug));
  }, [slug]);

  if (!mounted) return null;

  const toggle = () => {
    if (completed) {
      markTopicIncomplete(slug);
      setCompleted(false);
    } else {
      markTopicComplete(slug);
      setCompleted(true);
    }
  };

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
        completed
          ? "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
      }`}
    >
      {completed ? (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )}
      {completed ? "학습 완료" : "완료로 표시"}
    </button>
  );
}
