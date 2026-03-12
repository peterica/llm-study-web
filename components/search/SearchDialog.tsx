"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { search, type SearchResult } from "@/lib/search";

const typeLabel: Record<string, string> = {
  topic: "Topic",
  lab: "Lab",
  "case-study": "Case Study",
  glossary: "Glossary",
};

const typeColor: Record<string, string> = {
  topic: "bg-brand/10 text-brand",
  lab: "bg-highlight/10 text-highlight",
  "case-study": "bg-intermediate/10 text-intermediate",
  glossary: "bg-content-muted/10 text-content-muted",
};

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    setResults(search(query));
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setQuery("");
    }
  }, [open]);

  const navigate = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      navigate(results[selectedIndex].href);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-lg border border-divider bg-surface px-3 py-1.5 text-sm text-content-muted transition-colors hover:border-brand md:flex"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <span>검색</span>
        <kbd className="rounded bg-surface-white px-1.5 py-0.5 text-[10px] font-medium text-content-muted">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/50"
        onClick={() => setOpen(false)}
      />

      {/* Dialog */}
      <div className="fixed inset-x-4 top-[15%] z-[101] mx-auto max-w-lg rounded-xl border border-divider bg-surface-white shadow-2xl">
        {/* Input */}
        <div className="flex items-center gap-3 border-b border-divider px-4 py-3">
          <svg className="h-5 w-5 shrink-0 text-content-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Topic, Lab, 용어 검색..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-sm text-content outline-none placeholder:text-content-muted"
          />
          <kbd
            className="cursor-pointer rounded bg-surface px-1.5 py-0.5 text-[10px] text-content-muted"
            onClick={() => setOpen(false)}
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2">
          {query && results.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-content-muted">
              검색 결과가 없습니다
            </p>
          )}
          {results.map((result, i) => (
            <button
              key={`${result.type}-${result.title}-${i}`}
              onClick={() => navigate(result.href)}
              className={`flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                i === selectedIndex ? "bg-surface" : "hover:bg-surface"
              }`}
            >
              <span
                className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium ${typeColor[result.type]}`}
              >
                {typeLabel[result.type]}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-content">
                  {result.title}
                </div>
                <div className="truncate text-xs text-content-muted">
                  {result.description}
                </div>
              </div>
            </button>
          ))}
          {!query && (
            <p className="px-3 py-6 text-center text-sm text-content-muted">
              키워드를 입력하세요
            </p>
          )}
        </div>
      </div>
    </>
  );
}
