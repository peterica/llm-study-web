"use client";

import { useCallback, useState, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  type OnSelectionChangeParams,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import SystemNode, { type SystemNodeData } from "./SystemNode";
import NodeDetailPanel from "./NodeDetailPanel";

interface SystemMapCanvasProps {
  initialNodes: Node[];
  initialEdges: Edge[];
}

interface ViewMode {
  id: string;
  label: string;
  description: string;
  nodeIds: string[] | null; // null = show all
}

const viewModes: ViewMode[] = [
  {
    id: "all",
    label: "전체 보기",
    description: "모든 시스템 구성 요소",
    nodeIds: null,
  },
  {
    id: "rag",
    label: "RAG Flow",
    description: "검색 증강 생성 파이프라인",
    nodeIds: [
      "user-query",
      "tokenizer",
      "embedding",
      "similarity",
      "vector-db",
      "document-store",
      "chunking",
      "reranker",
      "rag-pipeline",
      "prompt-composition",
      "llm-inference",
      "response",
    ],
  },
  {
    id: "inference",
    label: "Inference Flow",
    description: "LLM 추론 과정",
    nodeIds: [
      "user-query",
      "tokenizer",
      "attention",
      "kv-cache",
      "transformer",
      "llm-inference",
      "response",
    ],
  },
  {
    id: "production",
    label: "Production View",
    description: "운영 관점 핵심 구성 요소",
    nodeIds: [
      "user-query",
      "rag-pipeline",
      "prompt-composition",
      "llm-inference",
      "response",
      "logging",
      "reranker",
      "vector-db",
    ],
  },
];

export default function SystemMapCanvas({
  initialNodes,
  initialEdges,
}: SystemMapCanvasProps) {
  const [selectedNodeData, setSelectedNodeData] =
    useState<SystemNodeData | null>(null);
  const [activeView, setActiveView] = useState("all");

  const nodeTypes = useMemo(() => ({ systemNode: SystemNode }), []);

  const currentView = viewModes.find((v) => v.id === activeView) || viewModes[0];

  const filteredNodes = useMemo(() => {
    if (!currentView.nodeIds) return initialNodes;
    const activeIds = new Set(currentView.nodeIds);
    return initialNodes.map((node) => ({
      ...node,
      style: activeIds.has(node.id)
        ? {}
        : { opacity: 0.15, pointerEvents: "none" as const },
    }));
  }, [initialNodes, currentView]);

  const filteredEdges = useMemo(() => {
    if (!currentView.nodeIds) return initialEdges;
    const activeIds = new Set(currentView.nodeIds);
    return initialEdges.map((edge) => ({
      ...edge,
      style:
        activeIds.has(edge.source) && activeIds.has(edge.target)
          ? { stroke: "var(--color-brand)", strokeWidth: 2 }
          : { stroke: "#ddd", strokeWidth: 1, opacity: 0.2 },
      animated:
        activeIds.has(edge.source) && activeIds.has(edge.target)
          ? edge.animated
          : false,
    }));
  }, [initialEdges, currentView]);

  const defaultEdgeOptions = useMemo(
    () => ({
      style: { stroke: "var(--color-brand)", strokeWidth: 2 },
      type: "smoothstep" as const,
    }),
    []
  );

  const onSelectionChange = useCallback(
    ({ nodes }: OnSelectionChangeParams) => {
      if (nodes.length > 0) {
        setSelectedNodeData(nodes[0].data as unknown as SystemNodeData);
      } else {
        setSelectedNodeData(null);
      }
    },
    []
  );

  return (
    <div className="space-y-4">
      {/* View Mode Selector */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-content-muted">보기 모드:</span>
        {viewModes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setActiveView(mode.id)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              activeView === mode.id
                ? "bg-brand text-white"
                : "bg-surface text-content-muted hover:bg-surface-dark hover:text-content"
            }`}
            title={mode.description}
          >
            {mode.label}
          </button>
        ))}
      </div>

      {/* View Description */}
      {activeView !== "all" && (
        <p className="text-xs text-content-muted">
          {currentView.description} — 관련 노드가 강조됩니다
        </p>
      )}

      {/* Canvas + Detail Panel */}
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="h-[400px] flex-1 rounded-lg border border-divider bg-white sm:h-[500px] lg:h-[600px] dark:bg-gray-900">
          <ReactFlow
            nodes={filteredNodes}
            edges={filteredEdges}
            nodeTypes={nodeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            onSelectionChange={onSelectionChange}
            fitView
            fitViewOptions={{ padding: 0.3 }}
            proOptions={{ hideAttribution: true }}
          >
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
            <Controls />
          </ReactFlow>
        </div>
        <div className="w-full lg:w-80">
          <NodeDetailPanel data={selectedNodeData} />
        </div>
      </div>
    </div>
  );
}
