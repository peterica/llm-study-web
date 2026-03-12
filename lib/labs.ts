export interface LabInfo {
  slug: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  relatedTopics: string[];
  tags: string[];
}

export const labs: LabInfo[] = [
  {
    slug: "embedding-space",
    title: "Embedding Space Explorer",
    description:
      "다양한 텍스트의 임베딩 벡터를 2D/3D 공간에 시각화하고 의미적 거리를 탐색합니다",
    difficulty: "beginner",
    estimatedTime: "15분",
    relatedTopics: ["embedding", "similarity"],
    tags: ["embedding", "visualization"],
  },
  {
    slug: "chunking",
    title: "Chunking Strategy Lab",
    description:
      "Chunk 크기와 Overlap 비율을 조절하며 검색 정확도와 비용의 트레이드오프를 실험합니다",
    difficulty: "intermediate",
    estimatedTime: "20분",
    relatedTopics: ["rag-pipeline"],
    tags: ["rag", "chunking"],
  },
  {
    slug: "attention-weights",
    title: "Attention Weight 시각화",
    description:
      "Self-Attention이 입력 토큰 간 관계를 어떻게 학습하는지 히트맵으로 확인합니다",
    difficulty: "intermediate",
    estimatedTime: "15분",
    relatedTopics: ["attention", "transformer"],
    tags: ["attention", "visualization"],
  },
  {
    slug: "temperature",
    title: "Temperature & Sampling",
    description:
      "Temperature, Top-k, Top-p 파라미터를 조절하며 LLM 출력의 다양성을 비교합니다",
    difficulty: "beginner",
    estimatedTime: "10분",
    relatedTopics: ["transformer"],
    tags: ["inference", "sampling"],
  },
  {
    slug: "retrieval-comparison",
    title: "Dense vs Hybrid Search",
    description:
      "Dense Retrieval과 Hybrid Search의 검색 결과를 비교하며 각 방법의 장단점을 이해합니다",
    difficulty: "advanced",
    estimatedTime: "25분",
    relatedTopics: ["similarity"],
    tags: ["retrieval", "search"],
  },
];

export const labTags = Array.from(
  new Set(labs.flatMap((lab) => lab.tags))
).sort();
