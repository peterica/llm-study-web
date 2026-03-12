export interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
  relatedTopics: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Attention",
    definition:
      "입력 시퀀스의 각 토큰이 다른 모든 토큰과의 관계를 계산하여 문맥을 파악하는 메커니즘",
    category: "Foundations",
    relatedTopics: ["attention", "transformer"],
  },
  {
    term: "Autoregressive",
    definition:
      "이전에 생성된 토큰을 기반으로 다음 토큰을 순차적으로 생성하는 방식. GPT 계열 모델의 기본 생성 방식",
    category: "Foundations",
    relatedTopics: ["transformer"],
  },
  {
    term: "BM25",
    definition:
      "문서와 쿼리 간의 키워드 매칭 기반 점수를 계산하는 전통적 정보 검색 알고리즘. Sparse Retrieval의 대표 방법",
    category: "Retrieval",
    relatedTopics: ["similarity"],
  },
  {
    term: "Chunk / Chunking",
    definition:
      "문서를 검색 가능한 작은 단위로 분할하는 과정. RAG에서 Chunk 크기와 Overlap 설정이 검색 품질에 큰 영향",
    category: "RAG",
    relatedTopics: ["rag-pipeline"],
  },
  {
    term: "Cosine Similarity",
    definition:
      "두 벡터 사이의 코사인 각도를 기반으로 유사도를 측정. -1~1 범위로, 1에 가까울수록 유사",
    category: "Representation",
    relatedTopics: ["similarity", "embedding"],
  },
  {
    term: "Cross-Encoder",
    definition:
      "쿼리와 문서 쌍을 하나의 입력으로 결합하여 관련도를 직접 계산하는 모델. Reranker에 주로 사용",
    category: "Retrieval",
    relatedTopics: ["similarity"],
  },
  {
    term: "Dense Retrieval",
    definition:
      "텍스트를 밀집 벡터(Embedding)로 변환하여 의미 기반 검색을 수행하는 방법",
    category: "Retrieval",
    relatedTopics: ["embedding", "similarity"],
  },
  {
    term: "Embedding",
    definition:
      "텍스트를 고차원 벡터 공간의 수치 표현으로 변환하는 과정. 의미적으로 유사한 텍스트는 벡터 공간에서 가까이 위치",
    category: "Representation",
    relatedTopics: ["embedding"],
  },
  {
    term: "Fine-tuning",
    definition:
      "사전 학습된 모델을 특정 도메인이나 태스크에 맞게 추가 학습하는 과정",
    category: "Foundations",
    relatedTopics: ["transformer"],
  },
  {
    term: "Hallucination",
    definition:
      "LLM이 사실이 아닌 내용을 마치 사실인 것처럼 생성하는 현상. RAG으로 완화 가능하지만 완전히 해결은 안 됨",
    category: "Generation",
    relatedTopics: ["rag-pipeline"],
  },
  {
    term: "HNSW",
    definition:
      "Hierarchical Navigable Small World. 대규모 벡터 검색을 위한 ANN(근사 최근접 이웃) 알고리즘",
    category: "Retrieval",
    relatedTopics: ["similarity"],
  },
  {
    term: "Hybrid Search",
    definition:
      "Dense Retrieval(벡터)과 Sparse Retrieval(키워드)을 결합하여 검색 품질을 향상시키는 방법",
    category: "Retrieval",
    relatedTopics: ["similarity"],
  },
  {
    term: "KV Cache",
    definition:
      "Transformer 추론 시 이전 토큰의 Key-Value 벡터를 캐싱하여 중복 연산을 제거하는 최적화 기법",
    category: "Inference",
    relatedTopics: ["kv-cache", "attention"],
  },
  {
    term: "Multi-Head Attention",
    definition:
      "여러 Attention 헤드를 병렬로 실행하여 다양한 관점에서 문맥을 포착하는 메커니즘",
    category: "Foundations",
    relatedTopics: ["attention"],
  },
  {
    term: "Prompt Engineering",
    definition:
      "LLM에게 원하는 출력을 얻기 위해 입력 프롬프트를 설계하고 최적화하는 기법",
    category: "Generation",
    relatedTopics: ["rag-pipeline"],
  },
  {
    term: "Quantization",
    definition:
      "모델 가중치의 수치 정밀도를 낮춰(FP32→INT8 등) 추론 속도 향상과 메모리 절감을 달성하는 기법",
    category: "Inference",
    relatedTopics: ["kv-cache"],
  },
  {
    term: "RAG",
    definition:
      "Retrieval-Augmented Generation. 외부 지식을 검색하여 LLM 응답에 활용하는 아키텍처 패턴",
    category: "RAG",
    relatedTopics: ["rag-pipeline"],
  },
  {
    term: "Reranker",
    definition:
      "초기 검색 결과를 Cross-Encoder 등으로 재순위화하여 정밀도를 높이는 컴포넌트",
    category: "Retrieval",
    relatedTopics: ["similarity"],
  },
  {
    term: "Self-Attention",
    definition:
      "같은 시퀀스 내 토큰들이 서로를 참조하는 Attention 메커니즘. Transformer의 핵심",
    category: "Foundations",
    relatedTopics: ["attention", "transformer"],
  },
  {
    term: "Temperature",
    definition:
      "LLM 생성 시 출력 분포의 무작위성을 제어하는 파라미터. 높을수록 다양한 출력, 낮을수록 결정적 출력",
    category: "Inference",
    relatedTopics: ["transformer"],
  },
  {
    term: "Token",
    definition:
      "텍스트를 처리하는 기본 단위. 단어, 서브워드, 또는 문자 수준으로 분할. BPE, WordPiece 등의 알고리즘 사용",
    category: "Foundations",
    relatedTopics: ["transformer"],
  },
  {
    term: "Transformer",
    definition:
      "Self-Attention 기반의 병렬 처리 가능한 신경망 아키텍처. 현대 LLM의 핵심 구조",
    category: "Foundations",
    relatedTopics: ["transformer"],
  },
  {
    term: "Vector DB",
    definition:
      "고차원 벡터를 저장하고 유사도 기반 검색을 제공하는 데이터베이스. Pinecone, Milvus, Qdrant 등",
    category: "Retrieval",
    relatedTopics: ["embedding", "similarity"],
  },
];

export const glossaryCategories = Array.from(
  new Set(glossaryTerms.map((t) => t.category))
).sort();
