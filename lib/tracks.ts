export interface Track {
  id: string;
  title: string;
  description: string;
  color: string;
  topics: { title: string; slug: string; difficulty: string }[];
}

export const tracks: Track[] = [
  {
    id: "foundations",
    title: "Foundations",
    description: "LLM의 기본 메커니즘을 이해합니다. Transformer 아키텍처부터 핵심 개념까지.",
    color: "bg-track-foundations",
    topics: [
      { title: "Transformer", slug: "transformer", difficulty: "beginner" },
      { title: "Attention", slug: "attention", difficulty: "beginner" },
      { title: "KV Cache", slug: "kv-cache", difficulty: "intermediate" },
    ],
  },
  {
    id: "representation",
    title: "Representation",
    description: "텍스트를 벡터 공간으로 변환하는 과정을 학습합니다.",
    color: "bg-track-representation",
    topics: [
      { title: "Embedding", slug: "embedding", difficulty: "beginner" },
      { title: "Similarity", slug: "similarity", difficulty: "beginner" },
    ],
  },
  {
    id: "retrieval",
    title: "Retrieval Systems",
    description: "의미 기반 검색 시스템의 구조와 알고리즘을 학습합니다.",
    color: "bg-track-retrieval",
    topics: [
      { title: "Dense Retrieval", slug: "dense-retrieval", difficulty: "intermediate" },
      { title: "Hybrid Search", slug: "hybrid-search", difficulty: "intermediate" },
      { title: "HNSW", slug: "hnsw", difficulty: "advanced" },
    ],
  },
  {
    id: "generation",
    title: "Generation Systems",
    description: "RAG 파이프라인과 응답 생성 과정을 학습합니다.",
    color: "bg-track-generation",
    topics: [
      { title: "RAG Pipeline", slug: "rag-pipeline", difficulty: "intermediate" },
      { title: "Prompt Engineering", slug: "prompt-engineering", difficulty: "beginner" },
    ],
  },
  {
    id: "inference",
    title: "Inference & Optimization",
    description: "LLM 추론 최적화 기법을 학습합니다.",
    color: "bg-track-inference",
    topics: [
      { title: "Quantization", slug: "quantization", difficulty: "advanced" },
      { title: "Batching", slug: "batching", difficulty: "intermediate" },
    ],
  },
  {
    id: "production",
    title: "Production & AI DevOps",
    description: "운영 가능한 AI 시스템을 구축하는 방법을 학습합니다.",
    color: "bg-track-production",
    topics: [
      { title: "Observability", slug: "observability", difficulty: "intermediate" },
      { title: "Cost Monitoring", slug: "cost-monitoring", difficulty: "intermediate" },
    ],
  },
];

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  steps: string[];
}

export const learningPaths: LearningPath[] = [
  {
    id: "beginner",
    title: "입문자 경로",
    description: "LLM의 기본 개념부터 차근차근 시작합니다.",
    steps: ["Foundations", "Representation", "Retrieval", "RAG", "기본 Lab"],
  },
  {
    id: "developer",
    title: "개발자 경로",
    description: "시스템 구조를 빠르게 파악하고 구현합니다.",
    steps: ["System Map", "Retrieval", "Generation", "Inference", "Production"],
  },
  {
    id: "ops",
    title: "운영자/SRE 경로",
    description: "운영 관점에서 AI 시스템을 이해합니다.",
    steps: ["System Map", "Inference", "Production", "Observability"],
  },
];
