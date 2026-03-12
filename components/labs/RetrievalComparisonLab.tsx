"use client";

import { useState, useMemo } from "react";

interface Document {
  id: number;
  title: string;
  content: string;
  keywords: string[];
  semanticVector: number[]; // simplified 3D vector for demo
}

const documents: Document[] = [
  {
    id: 1,
    title: "서버 비용 최적화 가이드",
    content: "클라우드 인프라 비용을 줄이는 10가지 전략...",
    keywords: ["서버", "비용", "최적화", "클라우드", "인프라"],
    semanticVector: [0.9, 0.3, 0.7],
  },
  {
    id: 2,
    title: "GPU 가속 추론 설정",
    content: "NVIDIA GPU를 활용한 모델 추론 최적화 방법...",
    keywords: ["GPU", "추론", "최적화", "NVIDIA", "가속"],
    semanticVector: [0.4, 0.9, 0.6],
  },
  {
    id: 3,
    title: "데이터베이스 성능 튜닝",
    content: "PostgreSQL 쿼리 최적화와 인덱싱 전략...",
    keywords: ["데이터베이스", "성능", "튜닝", "PostgreSQL", "쿼리"],
    semanticVector: [0.6, 0.2, 0.8],
  },
  {
    id: 4,
    title: "마이크로서비스 비용 관리",
    content: "분산 시스템에서 리소스 사용량 모니터링과 비용 절감...",
    keywords: ["마이크로서비스", "비용", "관리", "분산", "모니터링"],
    semanticVector: [0.85, 0.35, 0.5],
  },
  {
    id: 5,
    title: "모델 경량화 기법",
    content: "Quantization, Pruning, Distillation으로 모델 크기 줄이기...",
    keywords: ["모델", "경량화", "Quantization", "Pruning", "Distillation"],
    semanticVector: [0.5, 0.85, 0.4],
  },
  {
    id: 6,
    title: "클라우드 요금 절약 팁",
    content: "AWS, GCP, Azure에서 비용을 효과적으로 관리하는 방법...",
    keywords: ["클라우드", "요금", "절약", "AWS", "GCP"],
    semanticVector: [0.88, 0.25, 0.65],
  },
];

interface QueryPreset {
  label: string;
  query: string;
  keywords: string[];
  semanticVector: number[];
}

const queries: QueryPreset[] = [
  {
    label: "비용 절감",
    query: "서버 운영 비용을 줄이려면?",
    keywords: ["서버", "운영", "비용", "줄이"],
    semanticVector: [0.92, 0.28, 0.68],
  },
  {
    label: "모델 최적화",
    query: "AI 모델 추론 속도를 높이는 방법",
    keywords: ["AI", "모델", "추론", "속도"],
    semanticVector: [0.45, 0.88, 0.55],
  },
  {
    label: "DB 성능",
    query: "데이터베이스가 느려졌을 때 해결 방법",
    keywords: ["데이터베이스", "느려", "해결"],
    semanticVector: [0.58, 0.2, 0.82],
  },
];

function bm25Score(queryKeywords: string[], docKeywords: string[]): number {
  let score = 0;
  for (const qk of queryKeywords) {
    for (const dk of docKeywords) {
      if (dk.includes(qk) || qk.includes(dk)) {
        score += 1;
      }
    }
  }
  return score / Math.max(queryKeywords.length, 1);
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0,
    magA = 0,
    magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

function hybridScore(
  bm25: number,
  dense: number,
  alpha: number
): number {
  return alpha * dense + (1 - alpha) * bm25;
}

export default function RetrievalComparisonLab() {
  const [selectedQuery, setSelectedQuery] = useState(0);
  const [alpha, setAlpha] = useState(0.5);
  const [topK, setTopK] = useState(3);

  const query = queries[selectedQuery];

  const results = useMemo(() => {
    return documents
      .map((doc) => {
        const bm25 = bm25Score(query.keywords, doc.keywords);
        const dense = cosineSimilarity(
          query.semanticVector,
          doc.semanticVector
        );
        const hybrid = hybridScore(bm25, dense, alpha);
        return { doc, bm25, dense, hybrid };
      })
      .sort((a, b) => b.hybrid - a.hybrid);
  }, [selectedQuery, alpha, query]);

  const bm25Ranked = [...results].sort((a, b) => b.bm25 - a.bm25);
  const denseRanked = [...results].sort((a, b) => b.dense - a.dense);
  const hybridRanked = [...results].sort((a, b) => b.hybrid - a.hybrid);

  return (
    <div className="space-y-6">
      {/* Query Selection */}
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm font-medium">검색 쿼리:</label>
        {queries.map((q, i) => (
          <button
            key={i}
            onClick={() => setSelectedQuery(i)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              selectedQuery === i
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {q.label}
          </button>
        ))}
      </div>

      <div className="rounded-lg border bg-blue-50 p-3">
        <span className="text-sm text-gray-600">쿼리: </span>
        <span className="text-sm font-medium">&quot;{query.query}&quot;</span>
      </div>

      {/* Controls */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Hybrid 가중치 (α = {alpha.toFixed(2)}): Dense {(alpha * 100).toFixed(0)}% / BM25{" "}
            {((1 - alpha) * 100).toFixed(0)}%
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={alpha}
            onChange={(e) => setAlpha(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>BM25 only</span>
            <span>Dense only</span>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">
            Top-K: {topK}
          </label>
          <input
            type="range"
            min="1"
            max="6"
            step="1"
            value={topK}
            onChange={(e) => setTopK(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Results Comparison */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* BM25 */}
        <div className="rounded-lg border p-4">
          <h4 className="mb-3 text-sm font-semibold text-orange-700">
            BM25 (키워드)
          </h4>
          <div className="space-y-2">
            {bm25Ranked.slice(0, topK).map((r, i) => (
              <div
                key={r.doc.id}
                className="rounded border bg-orange-50 p-2 text-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    #{i + 1} {r.doc.title}
                  </span>
                  <span className="text-xs font-mono text-orange-600">
                    {r.bm25.toFixed(2)}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap gap-1">
                  {r.doc.keywords.slice(0, 3).map((k) => (
                    <span
                      key={k}
                      className={`rounded px-1.5 py-0.5 text-xs ${
                        query.keywords.some(
                          (qk) => k.includes(qk) || qk.includes(k)
                        )
                          ? "bg-orange-200 font-medium"
                          : "bg-gray-100"
                      }`}
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dense */}
        <div className="rounded-lg border p-4">
          <h4 className="mb-3 text-sm font-semibold text-purple-700">
            Dense (의미)
          </h4>
          <div className="space-y-2">
            {denseRanked.slice(0, topK).map((r, i) => (
              <div
                key={r.doc.id}
                className="rounded border bg-purple-50 p-2 text-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    #{i + 1} {r.doc.title}
                  </span>
                  <span className="text-xs font-mono text-purple-600">
                    {r.dense.toFixed(3)}
                  </span>
                </div>
                <div className="mt-1">
                  <div className="h-1.5 w-full rounded bg-gray-200">
                    <div
                      className="h-full rounded bg-purple-500 transition-all"
                      style={{ width: `${r.dense * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hybrid */}
        <div className="rounded-lg border-2 border-blue-300 p-4">
          <h4 className="mb-3 text-sm font-semibold text-blue-700">
            Hybrid (결합)
          </h4>
          <div className="space-y-2">
            {hybridRanked.slice(0, topK).map((r, i) => (
              <div
                key={r.doc.id}
                className="rounded border bg-blue-50 p-2 text-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    #{i + 1} {r.doc.title}
                  </span>
                  <span className="text-xs font-mono text-blue-600">
                    {r.hybrid.toFixed(3)}
                  </span>
                </div>
                <div className="mt-1 flex gap-1 text-xs">
                  <span className="text-orange-600">
                    BM25: {r.bm25.toFixed(2)}
                  </span>
                  <span className="text-gray-400">|</span>
                  <span className="text-purple-600">
                    Dense: {r.dense.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Observations */}
      <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
        <p className="font-medium mb-1">관찰 포인트</p>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li>α를 0으로 설정하면 BM25 결과만 사용합니다 (키워드 매칭)</li>
          <li>α를 1로 설정하면 Dense 결과만 사용합니다 (의미 검색)</li>
          <li>Hybrid Search는 두 방식의 장점을 결합합니다 — α=0.5~0.7이 일반적</li>
          <li>&quot;비용 절감&quot; 쿼리에서 BM25는 &quot;비용&quot;이 포함된 문서를 잘 찾지만, Dense는 &quot;요금 절약&quot;도 찾아냅니다</li>
        </ul>
      </div>
    </div>
  );
}
