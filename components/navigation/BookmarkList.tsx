"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllBookmarks, type Bookmark } from "@/lib/bookmarks";

const typeConfig: Record<
  Bookmark["type"],
  { label: string; color: string; basePath: string }
> = {
  topic: { label: "Topic", color: "bg-brand/10 text-brand", basePath: "/learn" },
  lab: { label: "Lab", color: "bg-highlight/10 text-highlight", basePath: "/labs" },
  "case-study": {
    label: "Case Study",
    color: "bg-track-production/10 text-track-production",
    basePath: "/case-studies",
  },
};

export default function BookmarkList() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setBookmarks(getAllBookmarks());
  }, []);

  if (!mounted || bookmarks.length === 0) return null;

  return (
    <div className="rounded-lg border bg-surface p-4 dark:bg-gray-800/50">
      <h3 className="text-sm font-semibold text-content flex items-center gap-2">
        <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 2c-.386 0-.738.223-.896.553L7.382 6.07l-3.935.572a1 1 0 00-.554 1.706l2.847 2.774-.672 3.916a1 1 0 001.451 1.054L10 14.347l3.481 1.745a1 1 0 001.451-1.054l-.672-3.916 2.847-2.774a1 1 0 00-.554-1.706l-3.935-.572-1.722-3.517A1 1 0 0010 2z"
            clipRule="evenodd"
          />
        </svg>
        북마크
      </h3>
      <ul className="mt-3 space-y-2">
        {bookmarks.slice(0, 5).map((bm) => {
          const config = typeConfig[bm.type];
          return (
            <li key={`${bm.type}-${bm.slug}`}>
              <Link
                href={`${config.basePath}/${bm.slug}`}
                className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-surface-dark dark:hover:bg-gray-700"
              >
                <span className="text-content truncate">{bm.title}</span>
                <span
                  className={`ml-2 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium ${config.color}`}
                >
                  {config.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      {bookmarks.length > 5 && (
        <p className="mt-2 text-xs text-content-muted">
          +{bookmarks.length - 5}개 더
        </p>
      )}
    </div>
  );
}
