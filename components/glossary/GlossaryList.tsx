"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { glossaryTerms, glossaryCategories } from "@/lib/glossary";

export default function GlossaryList() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let terms = glossaryTerms;
    if (activeCategory) {
      terms = terms.filter((t) => t.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      terms = terms.filter(
        (t) =>
          t.term.toLowerCase().includes(q) ||
          t.definition.toLowerCase().includes(q)
      );
    }
    return terms.sort((a, b) => a.term.localeCompare(b.term));
  }, [search, activeCategory]);

  return (
    <div>
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="용어 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-divider bg-surface px-4 py-3 text-sm text-content placeholder:text-content-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted hover:text-content"
          >
            &times;
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            activeCategory === null
              ? "bg-brand text-white"
              : "bg-surface text-content-muted hover:text-content"
          }`}
        >
          전체
        </button>
        {glossaryCategories.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              setActiveCategory(activeCategory === cat ? null : cat)
            }
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              activeCategory === cat
                ? "bg-brand text-white"
                : "bg-surface text-content-muted hover:text-content"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="mt-4 text-xs text-content-muted">
        {filtered.length}개 용어
      </p>

      {/* Term list */}
      <div className="mt-4 space-y-3">
        {filtered.map((term) => (
          <div
            key={term.term}
            className="rounded-lg border border-divider bg-surface p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-content">{term.term}</h3>
              <span className="shrink-0 rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-medium text-brand">
                {term.category}
              </span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-content-muted">
              {term.definition}
            </p>
            {term.relatedTopics.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {term.relatedTopics.map((slug) => (
                  <Link
                    key={slug}
                    href={`/learn/${slug}`}
                    className="text-xs text-brand hover:underline"
                  >
                    {slug}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-content-muted">
            검색 결과가 없습니다
          </p>
        )}
      </div>
    </div>
  );
}
