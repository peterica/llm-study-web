"use client";

import { useState, useMemo } from "react";

interface TextPoint {
  text: string;
  x: number;
  y: number;
  category: string;
}

const PRESET_TEXTS: TextPoint[] = [
  { text: "고양이가 낮잠을 자고 있다", x: 0.2, y: 0.8, category: "동물" },
  { text: "강아지가 공원에서 뛰어논다", x: 0.25, y: 0.7, category: "동물" },
  { text: "새가 나무 위에서 노래한다", x: 0.3, y: 0.85, category: "동물" },
  { text: "자동차가 고속도로를 달린다", x: 0.7, y: 0.3, category: "교통" },
  { text: "버스가 정류장에 멈췄다", x: 0.75, y: 0.25, category: "교통" },
  { text: "비행기가 하늘을 날고 있다", x: 0.65, y: 0.4, category: "교통" },
  { text: "파이썬으로 프로그래밍하기", x: 0.5, y: 0.15, category: "기술" },
  { text: "딥러닝 모델을 학습시키다", x: 0.45, y: 0.1, category: "기술" },
  { text: "데이터베이스에 쿼리하기", x: 0.55, y: 0.2, category: "기술" },
];

const categoryColors: Record<string, string> = {
  동물: "#22c55e",
  교통: "#3b82f6",
  기술: "#f59e0b",
};

function cosineSimilarity(a: TextPoint, b: TextPoint): number {
  const dot = a.x * b.x + a.y * b.y;
  const magA = Math.sqrt(a.x * a.x + a.y * a.y);
  const magB = Math.sqrt(b.x * b.x + b.y * b.y);
  return magA && magB ? dot / (magA * magB) : 0;
}

export default function EmbeddingSpaceLab() {
  const [selected, setSelected] = useState<number | null>(null);

  const similarities = useMemo(() => {
    if (selected === null) return [];
    const ref = PRESET_TEXTS[selected];
    return PRESET_TEXTS.map((p, i) => ({
      index: i,
      text: p.text,
      similarity: cosineSimilarity(ref, p),
    }))
      .filter((_, i) => i !== selected)
      .sort((a, b) => b.similarity - a.similarity);
  }, [selected]);

  const WIDTH = 400;
  const HEIGHT = 300;
  const PADDING = 30;

  return (
    <div className="space-y-4">
      {/* Scatter Plot */}
      <div className="flex justify-center">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="w-full max-w-lg rounded-lg border border-divider bg-white"
        >
          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map((v) => (
            <g key={v} opacity={0.15}>
              <line
                x1={PADDING}
                y1={PADDING + (HEIGHT - 2 * PADDING) * (1 - v)}
                x2={WIDTH - PADDING}
                y2={PADDING + (HEIGHT - 2 * PADDING) * (1 - v)}
                stroke="currentColor"
              />
              <line
                x1={PADDING + (WIDTH - 2 * PADDING) * v}
                y1={PADDING}
                x2={PADDING + (WIDTH - 2 * PADDING) * v}
                y2={HEIGHT - PADDING}
                stroke="currentColor"
              />
            </g>
          ))}

          {/* Points */}
          {PRESET_TEXTS.map((point, i) => {
            const cx = PADDING + point.x * (WIDTH - 2 * PADDING);
            const cy = PADDING + (1 - point.y) * (HEIGHT - 2 * PADDING);
            const isSelected = selected === i;

            return (
              <g
                key={i}
                onClick={() => setSelected(isSelected ? null : i)}
                className="cursor-pointer"
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? 8 : 6}
                  fill={categoryColors[point.category]}
                  opacity={
                    selected === null || isSelected ? 1 : 0.4
                  }
                  stroke={isSelected ? "#000" : "none"}
                  strokeWidth={2}
                />
                <text
                  x={cx}
                  y={cy - 10}
                  textAnchor="middle"
                  className="text-[8px] fill-current"
                  opacity={isSelected ? 1 : 0}
                >
                  {point.text.slice(0, 10)}...
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4">
        {Object.entries(categoryColors).map(([cat, color]) => (
          <div key={cat} className="flex items-center gap-1.5 text-xs">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            {cat}
          </div>
        ))}
      </div>

      {/* Selected text info */}
      {selected !== null && (
        <div className="rounded-lg border border-divider bg-white p-4">
          <p className="text-sm font-medium text-content">
            &ldquo;{PRESET_TEXTS[selected].text}&rdquo;
          </p>
          <p className="mt-2 text-xs font-semibold uppercase text-content-muted">
            유사도 순위
          </p>
          <div className="mt-1 space-y-1">
            {similarities.slice(0, 5).map((s) => (
              <div
                key={s.index}
                className="flex items-center justify-between text-xs"
              >
                <span className="text-content-muted">{s.text}</span>
                <span className="font-mono font-medium text-brand">
                  {s.similarity.toFixed(3)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {selected === null && (
        <p className="text-center text-xs text-content-muted">
          점을 클릭하여 유사도를 확인하세요
        </p>
      )}
    </div>
  );
}
