"use client";

import { useState, useMemo } from "react";

const presetSentences = [
  {
    label: "기본 문장",
    tokens: ["나는", "오늘", "학교에", "갔다"],
    weights: [
      [0.4, 0.2, 0.3, 0.1],
      [0.1, 0.5, 0.2, 0.2],
      [0.15, 0.25, 0.4, 0.2],
      [0.1, 0.15, 0.25, 0.5],
    ],
  },
  {
    label: "대명사 참조",
    tokens: ["철수는", "밥을", "먹었다", "그는", "배가", "불렀다"],
    weights: [
      [0.6, 0.1, 0.1, 0.1, 0.05, 0.05],
      [0.15, 0.5, 0.15, 0.1, 0.05, 0.05],
      [0.2, 0.3, 0.4, 0.05, 0.03, 0.02],
      [0.45, 0.05, 0.1, 0.3, 0.05, 0.05],
      [0.1, 0.05, 0.05, 0.3, 0.4, 0.1],
      [0.05, 0.15, 0.2, 0.15, 0.2, 0.25],
    ],
  },
  {
    label: "부정 표현",
    tokens: ["이것은", "좋은", "결과가", "아니다"],
    weights: [
      [0.5, 0.2, 0.2, 0.1],
      [0.15, 0.4, 0.2, 0.25],
      [0.2, 0.25, 0.35, 0.2],
      [0.1, 0.35, 0.2, 0.35],
    ],
  },
];

function getHeatmapColor(value: number): string {
  // Blue (low) → Yellow (mid) → Red (high)
  if (value < 0.25) {
    const t = value / 0.25;
    const r = Math.round(50 + t * 200);
    const g = Math.round(50 + t * 200);
    const b = Math.round(200 - t * 100);
    return `rgb(${r}, ${g}, ${b})`;
  }
  const t = (value - 0.25) / 0.75;
  const r = Math.round(250);
  const g = Math.round(250 - t * 200);
  const b = Math.round(100 - t * 80);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function AttentionWeightsLab() {
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [showValues, setShowValues] = useState(true);

  const current = presetSentences[selectedPreset];
  const { tokens, weights } = current;

  const maxWeight = useMemo(
    () => Math.max(...weights.flat()),
    [weights]
  );

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm font-medium">문장 선택:</label>
        {presetSentences.map((preset, i) => (
          <button
            key={i}
            onClick={() => {
              setSelectedPreset(i);
              setSelectedRow(null);
            }}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              selectedPreset === i
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {preset.label}
          </button>
        ))}
        <label className="ml-auto flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={showValues}
            onChange={(e) => setShowValues(e.target.checked)}
            className="rounded"
          />
          수치 표시
        </label>
      </div>

      {/* Heatmap */}
      <div className="overflow-x-auto rounded-lg border bg-white p-4">
        <h4 className="mb-3 text-sm font-semibold">
          Self-Attention 히트맵 (Query → Key)
        </h4>
        <div className="inline-block min-w-full">
          {/* Column headers (Key) */}
          <div className="flex">
            <div className="w-20 shrink-0" />
            {tokens.map((token, i) => (
              <div
                key={i}
                className="flex w-16 shrink-0 items-center justify-center text-xs font-medium text-gray-600"
              >
                <span className="rotate-[-30deg] whitespace-nowrap">
                  {token}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-right text-xs text-gray-400 pr-2 mb-1">
            Key →
          </div>

          {/* Rows (Query) */}
          {tokens.map((rowToken, row) => (
            <div
              key={row}
              className={`flex items-center cursor-pointer transition-opacity ${
                selectedRow !== null && selectedRow !== row
                  ? "opacity-40"
                  : ""
              }`}
              onClick={() =>
                setSelectedRow(selectedRow === row ? null : row)
              }
            >
              <div className="w-20 shrink-0 pr-2 text-right text-xs font-medium text-gray-700">
                {rowToken}
              </div>
              {weights[row].map((w, col) => (
                <div
                  key={col}
                  className="flex h-14 w-16 shrink-0 items-center justify-center border border-white/50 text-xs font-mono transition-all duration-200"
                  style={{
                    backgroundColor: getHeatmapColor(w / maxWeight),
                    color: w / maxWeight > 0.5 ? "white" : "#333",
                  }}
                  title={`${rowToken} → ${tokens[col]}: ${(w * 100).toFixed(1)}%`}
                >
                  {showValues ? `${(w * 100).toFixed(0)}%` : ""}
                </div>
              ))}
            </div>
          ))}
          <div className="text-xs text-gray-400 mt-1">↑ Query</div>
        </div>
      </div>

      {/* Detail view for selected row */}
      {selectedRow !== null && (
        <div className="rounded-lg border bg-blue-50 p-4">
          <h4 className="mb-2 text-sm font-semibold">
            &quot;{tokens[selectedRow]}&quot;이 주목하는 토큰
          </h4>
          <div className="flex flex-wrap gap-2">
            {weights[selectedRow]
              .map((w, i) => ({ token: tokens[i], weight: w }))
              .sort((a, b) => b.weight - a.weight)
              .map(({ token, weight }, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm border"
                >
                  <span className="font-medium">{token}</span>
                  <span className="text-xs text-gray-500">
                    {(weight * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
          </div>
          <p className="mt-2 text-xs text-gray-600">
            &quot;{tokens[selectedRow]}&quot; 토큰은 &quot;
            {
              tokens[
                weights[selectedRow].indexOf(
                  Math.max(...weights[selectedRow])
                )
              ]
            }
            &quot;에 가장 높은 어텐션을 부여합니다.
          </p>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-gray-600">
        <span>어텐션 강도:</span>
        <div className="flex items-center gap-1">
          <div
            className="h-4 w-8 rounded"
            style={{ backgroundColor: getHeatmapColor(0) }}
          />
          <span>낮음</span>
        </div>
        <div className="flex items-center gap-1">
          <div
            className="h-4 w-8 rounded"
            style={{ backgroundColor: getHeatmapColor(0.5) }}
          />
          <span>중간</span>
        </div>
        <div className="flex items-center gap-1">
          <div
            className="h-4 w-8 rounded"
            style={{ backgroundColor: getHeatmapColor(1) }}
          />
          <span>높음</span>
        </div>
      </div>

      {/* Explanation */}
      <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
        <p className="font-medium mb-1">관찰 포인트</p>
        <ul className="list-disc pl-5 space-y-1 text-xs">
          <li>각 행은 해당 토큰이 다른 토큰에 얼마나 주목하는지를 나타냅니다</li>
          <li>대명사(&quot;그는&quot;)가 선행사(&quot;철수는&quot;)에 높은 어텐션을 부여하는 패턴을 관찰하세요</li>
          <li>부정 표현에서 &quot;아니다&quot;가 수식 대상에 주목하는 패턴을 확인하세요</li>
          <li>행을 클릭하면 해당 토큰의 어텐션 분포를 상세히 볼 수 있습니다</li>
        </ul>
      </div>
    </div>
  );
}
