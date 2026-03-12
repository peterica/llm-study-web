"use client";

import dynamic from "next/dynamic";

const labComponents: Record<string, React.ComponentType> = {
  "embedding-space": dynamic(() => import("@/components/labs/EmbeddingSpaceLab")),
  chunking: dynamic(() => import("@/components/labs/ChunkingLab")),
  temperature: dynamic(() => import("@/components/labs/TemperatureLab")),
  "attention-weights": dynamic(() => import("@/components/labs/AttentionWeightsLab")),
  "retrieval-comparison": dynamic(() => import("@/components/labs/RetrievalComparisonLab")),
};

export default function LabComponentLoader({ slug }: { slug: string }) {
  const Component = labComponents[slug];
  if (!Component) return null;
  return <Component />;
}
