# Information Architecture — LLM System Lab

## 1. 사이트 구조

```
LLM System Lab
├── Home (/)
│   ├── Hero Section
│   ├── Learning Journey (6 트랙)
│   ├── Featured Concepts
│   └── Interactive Labs Preview
│
├── Learn (/learn)
│   ├── Track Cards (6개 트랙)
│   ├── Recommended Paths (3개 경로)
│   └── [slug] (/learn/[slug])
│       ├── TopicHero (breadcrumb, 난이도, 읽기시간)
│       ├── MDX Content (본문)
│       ├── Next Topics (다음 학습 주제)
│       └── Related Labs (관련 실험)
│
├── System Map (/system-map)
│   ├── Interactive Graph (React Flow)
│   └── Node Detail Panel
│
├── Labs (/labs)
│   ├── Lab Cards (필터, 태그)
│   └── [slug] (/labs/[slug])
│       ├── LabShell (breadcrumb, 난이도, 소요시간)
│       ├── Parameter Panel
│       ├── Visualization Zone
│       └── Related Topics
│
├── Case Studies (/case-studies)
│   ├── Case Study Cards
│   └── [slug] (/case-studies/[slug])
│       ├── CaseStudyShell (메타, 기술스택)
│       └── MDX Content
│
├── Glossary (/glossary)
│   ├── Search
│   ├── Category Filter
│   └── Term List (관련 Topic 링크)
│
└── Utility Routes
    ├── /sitemap.xml
    └── /robots.txt
```

## 2. 네비게이션 구조

### Global Navigation (Header)

| 메뉴 | 경로 | 설명 |
|------|------|------|
| Learn | /learn | 트랙별 학습 랜딩 |
| System Map | /system-map | 인터랙티브 시스템 맵 |
| Labs | /labs | 실험 목록 |
| Case Studies | /case-studies | 사례 연구 |
| Glossary | /glossary | 용어 사전 |
| Search | ⌘K | 통합 검색 (커맨드 팔레트) |

### 콘텐츠 간 연결 구조

```
Topic ←→ Topic  (prerequisites, nextTopics)
Topic ←→ Lab    (relatedLabs / relatedTopics)
Topic ←→ Glossary (relatedTopics)
Topic ←→ System Map (topicSlug)
Lab   ←→ System Map (relatedLabs)
```

## 3. 학습 트랙 구조

| 순서 | 트랙 | 주요 Topic |
|------|------|-----------|
| 1 | Foundations | Transformer, Attention, KV Cache |
| 2 | Representation | Embedding, Similarity |
| 3 | Retrieval Systems | Dense Retrieval, Hybrid Search, HNSW |
| 4 | Generation Systems | RAG Pipeline, Prompt Engineering |
| 5 | Inference & Optimization | Quantization, Batching |
| 6 | Production & AI DevOps | Observability, Cost Monitoring |

## 4. 콘텐츠 유형별 URL 패턴

| 유형 | URL 패턴 | 예시 |
|------|---------|------|
| Topic | /learn/[slug] | /learn/transformer |
| Lab | /labs/[slug] | /labs/embedding-space |
| Case Study | /case-studies/[slug] | /case-studies/internal-knowledge-bot |
| Glossary | /glossary | (단일 페이지) |

## 5. 사용자 흐름

### 입문자 경로
Home → Learn Landing → Foundations Track → Transformer → Attention → Embedding Space Lab → RAG Pipeline

### 개발자 경로
Home → System Map → 노드 클릭 → Topic Detail → Related Lab → Case Study

### 운영자 경로
Home → System Map → Inference 노드 → KV Cache → Case Study (Production RAG)
