"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";

const categoryColors: Record<string, string> = {
  input: "border-content-muted bg-content-muted/5",
  output: "border-content-muted bg-content-muted/5",
  foundations: "border-track-foundations bg-track-foundations/10",
  representation: "border-track-representation bg-track-representation/10",
  retrieval: "border-track-retrieval bg-track-retrieval/10",
  generation: "border-track-generation bg-track-generation/10",
  inference: "border-track-inference bg-track-inference/10",
  production: "border-track-production bg-track-production/10",
};

export interface SystemNodeData {
  label: string;
  description: string;
  category: string;
  topicSlug: string | null;
  relatedLabs: string[];
  [key: string]: unknown;
}

function SystemNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as SystemNodeData;
  const colorClass = categoryColors[nodeData.category] || "border-divider bg-surface";

  return (
    <>
      <Handle type="target" position={Position.Top} className="!bg-brand" />
      <div
        className={`rounded-lg border-2 px-4 py-3 text-center shadow-sm transition-shadow ${colorClass} ${
          selected ? "ring-2 ring-brand shadow-md" : ""
        }`}
        style={{ minWidth: 140 }}
      >
        <div className="text-sm font-semibold text-content">{nodeData.label}</div>
        {nodeData.topicSlug && (
          <div className="mt-1 text-[10px] text-brand">Topic</div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-brand" />
    </>
  );
}

export default memo(SystemNode);
