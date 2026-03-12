export interface CaseStudyInfo {
  slug: string;
  title: string;
  description: string;
  industry: string;
  techStack: string[];
  difficulty: "intermediate" | "advanced";
}

export const caseStudies: CaseStudyInfo[] = [
  {
    slug: "internal-knowledge-bot",
    title: "사내 지식 검색 봇",
    description:
      "사내 문서(Confluence, Notion)를 RAG 기반으로 검색하여 직원 질문에 답변하는 챗봇 구축 사례",
    industry: "Enterprise",
    techStack: ["RAG", "Embedding", "Vector DB", "Chunking"],
    difficulty: "intermediate",
  },
  {
    slug: "production-rag-system",
    title: "운영 가능한 RAG 시스템",
    description:
      "프로토타입에서 프로덕션까지, RAG 시스템의 안정적 운영을 위한 아키텍처와 모니터링 전략",
    industry: "Platform",
    techStack: ["RAG", "Observability", "Evaluation", "Cost Optimization"],
    difficulty: "advanced",
  },
  {
    slug: "code-search-assistant",
    title: "코드 검색 어시스턴트",
    description:
      "대규모 모노레포에서 의미 기반 코드 검색을 구현한 사례. AST 청킹, 코드 Embedding, Hybrid Search 적용",
    industry: "Developer Tools",
    techStack: ["Code Embedding", "AST Parser", "Hybrid Search", "Reranker"],
    difficulty: "advanced",
  },
  {
    slug: "multi-agent-system",
    title: "Multi-Agent 고객 지원 시스템",
    description:
      "복잡한 고객 요청을 전문화된 에이전트들이 분할 처리하는 Multi-Agent 아키텍처 구축 사례",
    industry: "Customer Service",
    techStack: ["Multi-Agent", "ReAct", "Tool Calling", "Orchestration"],
    difficulty: "advanced",
  },
];
