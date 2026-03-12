# LLM System Lab

LLM 시스템의 전체 흐름(Transformer → Embedding → Retrieval → RAG → Inference → Production)을 **개념 학습, 시스템 맵, 인터랙티브 실험**으로 배우는 교육 플랫폼입니다.

## 주요 기능

- **Learn** — 14개 토픽의 개념 학습 (MDX 기반)
- **System Map** — React Flow 기반 인터랙티브 시스템 구조 시각화
- **Labs** — 파라미터를 조절하며 실험하는 인터랙티브 실험실
  - Embedding Space, Chunking, Temperature, Attention Weights, Retrieval Comparison
- **Case Studies** — 실무 사례 분석
- **Glossary** — LLM 관련 용어 사전

## 학습 트랙

| 트랙 | 주요 토픽 |
|------|----------|
| Foundations | Transformer, Attention, KV Cache |
| Representation | Embedding, Similarity |
| Retrieval Systems | Dense Retrieval, HNSW, Hybrid Search |
| Generation Systems | RAG Pipeline, Prompt Engineering |
| Inference & Optimization | Quantization, Batching |
| Production & AI DevOps | Observability, Cost Monitoring |

## 기술 스택

- **Framework**: Next.js 15 (App Router, SSG)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Content**: MDX (next-mdx-remote)
- **Visualization**: React Flow, D3.js
- **Deployment**: Docker (multi-stage build)

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버
npm run dev

# 프로덕션 빌드
npm run build
npm start
```

## Docker 배포

```bash
docker compose up -d --build
```

기본 포트: `3100` (docker-compose.yml에서 변경 가능)

## 프로젝트 구조

```
app/               # Next.js App Router 페이지
components/        # React 컴포넌트
  ├── layout/      # Header, Footer, ThemeToggle
  ├── topic/       # Topic 관련 컴포넌트
  ├── labs/        # Lab 인터랙티브 컴포넌트
  ├── system-map/  # System Map 컴포넌트
  └── ui/          # shadcn/ui 기본 컴포넌트
content/           # MDX 콘텐츠
  ├── topics/      # 학습 토픽
  ├── labs/        # 실험 설명
  └── case-studies/# 사례 분석
lib/               # 유틸리티 함수
data/              # 정적 데이터 (JSON)
```

## License

[MIT](./LICENSE)
