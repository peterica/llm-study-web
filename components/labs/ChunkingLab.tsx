"use client";

import { useState, useMemo } from "react";

const SAMPLE_TEXT = `Transformer는 2017년 "Attention Is All You Need" 논문에서 제안된 신경망 아키텍처입니다. 기존의 RNN이나 LSTM과 달리 시퀀스를 병렬로 처리할 수 있어 학습 속도가 크게 향상되었습니다. Self-Attention 메커니즘을 통해 입력 시퀀스의 모든 위치가 서로를 참조할 수 있습니다.

Transformer의 핵심 구성 요소는 Multi-Head Attention, Feed-Forward Network, Layer Normalization입니다. 각 레이어는 잔차 연결(Residual Connection)을 통해 그래디언트가 안정적으로 흐르도록 합니다.

현대의 대부분의 LLM은 Transformer 아키텍처를 기반으로 합니다. GPT 시리즈는 Decoder-only 구조를, BERT는 Encoder-only 구조를 사용합니다. 모델의 크기가 커질수록 성능이 향상되는 스케일링 법칙이 관찰되어, 수십억~수조 개의 파라미터를 가진 모델들이 개발되고 있습니다.

RAG(Retrieval-Augmented Generation)에서 Transformer 기반 LLM은 검색된 컨텍스트와 사용자 질문을 함께 처리하여 응답을 생성합니다. 이때 컨텍스트 윈도우 크기가 처리 가능한 토큰 수를 제한하므로, 효율적인 청킹 전략이 중요합니다.`;

interface Chunk {
  text: string;
  start: number;
  end: number;
}

function chunkText(
  text: string,
  chunkSize: number,
  overlap: number
): Chunk[] {
  const chunks: Chunk[] = [];
  const step = Math.max(1, chunkSize - overlap);
  let start = 0;

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    chunks.push({
      text: text.slice(start, end),
      start,
      end,
    });
    if (end >= text.length) break;
    start += step;
  }

  return chunks;
}

const CHUNK_COLORS = [
  "bg-blue-100 border-blue-300",
  "bg-green-100 border-green-300",
  "bg-yellow-100 border-yellow-300",
  "bg-purple-100 border-purple-300",
  "bg-pink-100 border-pink-300",
  "bg-cyan-100 border-cyan-300",
  "bg-orange-100 border-orange-300",
  "bg-red-100 border-red-300",
];

export default function ChunkingLab() {
  const [chunkSize, setChunkSize] = useState(200);
  const [overlapPercent, setOverlapPercent] = useState(10);

  const overlap = Math.round((chunkSize * overlapPercent) / 100);
  const chunks = useMemo(
    () => chunkText(SAMPLE_TEXT, chunkSize, overlap),
    [chunkSize, overlap]
  );

  const avgChunkLen = chunks.length
    ? Math.round(chunks.reduce((s, c) => s + c.text.length, 0) / chunks.length)
    : 0;

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold text-content-muted">
            Chunk Size: {chunkSize} 문자
          </label>
          <input
            type="range"
            min={50}
            max={500}
            step={10}
            value={chunkSize}
            onChange={(e) => setChunkSize(Number(e.target.value))}
            className="mt-1 w-full accent-brand"
          />
          <div className="flex justify-between text-[10px] text-content-muted">
            <span>50</span>
            <span>500</span>
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-content-muted">
            Overlap: {overlapPercent}% ({overlap} 문자)
          </label>
          <input
            type="range"
            min={0}
            max={50}
            step={5}
            value={overlapPercent}
            onChange={(e) => setOverlapPercent(Number(e.target.value))}
            className="mt-1 w-full accent-brand"
          />
          <div className="flex justify-between text-[10px] text-content-muted">
            <span>0%</span>
            <span>50%</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-white p-2">
          <div className="text-lg font-bold text-brand">{chunks.length}</div>
          <div className="text-[10px] text-content-muted">총 청크 수</div>
        </div>
        <div className="rounded-lg bg-white p-2">
          <div className="text-lg font-bold text-brand">{avgChunkLen}</div>
          <div className="text-[10px] text-content-muted">평균 길이</div>
        </div>
        <div className="rounded-lg bg-white p-2">
          <div className="text-lg font-bold text-brand">{overlap}</div>
          <div className="text-[10px] text-content-muted">겹침 문자</div>
        </div>
      </div>

      {/* Chunk visualization */}
      <div className="max-h-64 space-y-2 overflow-y-auto">
        {chunks.map((chunk, i) => (
          <div
            key={i}
            className={`rounded border p-2 text-xs ${CHUNK_COLORS[i % CHUNK_COLORS.length]}`}
          >
            <div className="mb-1 flex justify-between text-[10px] font-semibold opacity-70">
              <span>Chunk {i + 1}</span>
              <span>
                {chunk.start}~{chunk.end} ({chunk.text.length}자)
              </span>
            </div>
            <p className="leading-relaxed text-content">
              {chunk.text.slice(0, 120)}
              {chunk.text.length > 120 && "..."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
