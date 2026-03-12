"use client";

import { useState, useMemo } from "react";

// Simulated vocabulary with logits
const vocabulary = [
  { token: "좋은", logit: 5.2 },
  { token: "훌륭한", logit: 4.8 },
  { token: "멋진", logit: 4.1 },
  { token: "아름다운", logit: 3.5 },
  { token: "괜찮은", logit: 2.9 },
  { token: "적절한", logit: 2.3 },
  { token: "나쁜", logit: 1.1 },
  { token: "이상한", logit: 0.5 },
];

function softmax(logits: number[], temperature: number): number[] {
  const t = Math.max(temperature, 0.01);
  const scaled = logits.map((l) => l / t);
  const maxVal = Math.max(...scaled);
  const exps = scaled.map((s) => Math.exp(s - maxVal));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((e) => e / sum);
}

function applyTopK(probs: number[], topK: number): number[] {
  if (topK >= probs.length) return probs;
  const indexed = probs.map((p, i) => ({ p, i })).sort((a, b) => b.p - a.p);
  const result = new Array(probs.length).fill(0);
  const topItems = indexed.slice(0, topK);
  const sum = topItems.reduce((a, b) => a + b.p, 0);
  topItems.forEach(({ p, i }) => {
    result[i] = p / sum;
  });
  return result;
}

function applyTopP(probs: number[], topP: number): number[] {
  if (topP >= 1.0) return probs;
  const indexed = probs.map((p, i) => ({ p, i })).sort((a, b) => b.p - a.p);
  const result = new Array(probs.length).fill(0);
  let cumSum = 0;
  const selected: { p: number; i: number }[] = [];
  for (const item of indexed) {
    if (cumSum >= topP && selected.length > 0) break;
    selected.push(item);
    cumSum += item.p;
  }
  const sum = selected.reduce((a, b) => a + b.p, 0);
  selected.forEach(({ p, i }) => {
    result[i] = p / sum;
  });
  return result;
}

function sampleToken(probs: number[]): number {
  const r = Math.random();
  let cumSum = 0;
  for (let i = 0; i < probs.length; i++) {
    cumSum += probs[i];
    if (r < cumSum) return i;
  }
  return probs.length - 1;
}

export default function TemperatureLab() {
  const [temperature, setTemperature] = useState(1.0);
  const [topK, setTopK] = useState(8);
  const [topP, setTopP] = useState(1.0);
  const [samples, setSamples] = useState<string[]>([]);

  const probs = useMemo(() => {
    let p = softmax(
      vocabulary.map((v) => v.logit),
      temperature
    );
    p = applyTopK(p, topK);
    p = applyTopP(p, topP);
    return p;
  }, [temperature, topK, topP]);

  const maxProb = Math.max(...probs);

  const generateSamples = () => {
    const newSamples: string[] = [];
    for (let i = 0; i < 10; i++) {
      let p = softmax(
        vocabulary.map((v) => v.logit),
        temperature
      );
      p = applyTopK(p, topK);
      p = applyTopP(p, topP);
      const idx = sampleToken(p);
      newSamples.push(vocabulary[idx].token);
    }
    setSamples(newSamples);
  };

  const entropy = -probs.reduce((sum, p) => {
    if (p > 0) return sum + p * Math.log2(p);
    return sum;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Temperature: {temperature.toFixed(2)}
          </label>
          <input
            type="range"
            min="0.01"
            max="3"
            step="0.01"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>결정적 (0.01)</span>
            <span>창의적 (3.0)</span>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">
            Top-K: {topK}
          </label>
          <input
            type="range"
            min="1"
            max="8"
            step="1"
            value={topK}
            onChange={(e) => setTopK(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>상위 1개만</span>
            <span>전체 (8)</span>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">
            Top-P: {topP.toFixed(2)}
          </label>
          <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.05"
            value={topP}
            onChange={(e) => setTopP(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-500">
            <span>핵심만 (0.1)</span>
            <span>전체 (1.0)</span>
          </div>
        </div>
      </div>

      {/* Probability Distribution */}
      <div className="rounded-lg border bg-white p-4">
        <h4 className="mb-3 text-sm font-semibold">
          확률 분포 (프롬프트: &quot;오늘 날씨가 정말 ___&quot;)
        </h4>
        <div className="space-y-2">
          {vocabulary.map((v, i) => (
            <div key={v.token} className="flex items-center gap-3">
              <span className="w-16 text-right text-sm font-mono">
                {v.token}
              </span>
              <div className="flex-1 h-6 bg-gray-100 rounded overflow-hidden">
                <div
                  className="h-full rounded transition-all duration-300"
                  style={{
                    width: `${(probs[i] / maxProb) * 100}%`,
                    backgroundColor:
                      probs[i] > 0
                        ? `hsl(${210 - probs[i] * 150}, 70%, 50%)`
                        : "#e5e7eb",
                    opacity: probs[i] > 0 ? 1 : 0.3,
                  }}
                />
              </div>
              <span className="w-16 text-right text-xs font-mono text-gray-600">
                {(probs[i] * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border bg-blue-50 p-3 text-center">
          <div className="text-xs text-gray-600">엔트로피</div>
          <div className="text-lg font-bold text-blue-700">
            {entropy.toFixed(2)} bits
          </div>
          <div className="text-xs text-gray-500">
            {entropy < 1 ? "매우 결정적" : entropy < 2 ? "적당한 다양성" : "높은 무작위성"}
          </div>
        </div>
        <div className="rounded-lg border bg-green-50 p-3 text-center">
          <div className="text-xs text-gray-600">활성 토큰 수</div>
          <div className="text-lg font-bold text-green-700">
            {probs.filter((p) => p > 0.001).length}개
          </div>
          <div className="text-xs text-gray-500">
            / {vocabulary.length}개 전체
          </div>
        </div>
        <div className="rounded-lg border bg-orange-50 p-3 text-center">
          <div className="text-xs text-gray-600">최대 확률</div>
          <div className="text-lg font-bold text-orange-700">
            {(maxProb * 100).toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500">
            {vocabulary[probs.indexOf(maxProb)]?.token}
          </div>
        </div>
      </div>

      {/* Sampling */}
      <div className="rounded-lg border bg-gray-50 p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold">샘플링 결과 (10회)</h4>
          <button
            onClick={generateSamples}
            className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            샘플링 실행
          </button>
        </div>
        {samples.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {samples.map((s, i) => (
              <span
                key={i}
                className="rounded-full bg-white px-3 py-1 text-sm border"
              >
                {s}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            버튼을 눌러 현재 설정으로 토큰을 샘플링해보세요
          </p>
        )}
      </div>
    </div>
  );
}
