# Content Model — LLM System Lab

## 1. 콘텐츠 유형

### Topic (학습 개념)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | string | Y | 고유 식별자 |
| title | string | Y | 표시 제목 |
| slug | string | Y | URL 경로 |
| category | string | Y | 트랙 이름 |
| difficulty | enum | Y | beginner, intermediate, advanced |
| readingTime | string | N | 예상 읽기 시간 |
| prerequisites | string[] | Y | 선행 Topic slug 목록 |
| relatedLabs | string[] | Y | 연관 Lab slug 목록 |
| nextTopics | string[] | Y | 다음 Topic slug 목록 |
| draft | boolean | N | true이면 빌드에서 제외 |

**본문 섹션 구조:**
1. Summary — 한 줄 요약
2. Why It Matters — 왜 중요한가
3. Core Diagram — 핵심 다이어그램
4. Concept Explanation — 개념 설명
5. System Perspective — 시스템 관점
6. Practical Insight — 실무 관점
7. Common Misunderstandings — 흔한 오해
8. Connected Topics — 연결된 주제

### Lab (인터랙티브 실험)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | string | Y | 고유 식별자 |
| title | string | Y | 표시 제목 |
| slug | string | Y | URL 경로 |
| relatedTopics | string[] | Y | 연관 Topic slug 목록 |
| difficulty | string | N | 난이도 |
| estimatedTime | string | N | 예상 소요 시간 |
| draft | boolean | N | true이면 빌드에서 제외 |

**MDX 본문 섹션:**
1. 실험 목표
2. 조절 가능한 변수
3. 핵심 관찰 포인트
4. 실무적 시사점

**인터랙티브 컴포넌트:**
- `components/labs/{LabName}Lab.tsx` 에 React 컴포넌트로 구현
- `app/labs/[slug]/page.tsx`의 `labComponents` 맵에 등록

### Case Study (사례 연구)

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | string | Y | 고유 식별자 |
| title | string | Y | 표시 제목 |
| slug | string | Y | URL 경로 |
| draft | boolean | N | true이면 빌드에서 제외 |

**본문 섹션 구조:**
1. 문제 정의
2. 왜 기존 방법으로 부족했는가
3. 시스템 구조
4. 핵심 기술 선택 이유
5. 운영 시 발생한 이슈
6. 개선 포인트
7. 확장 가능성
8. 핵심 교훈

### Glossary Term (용어)

| 필드 | 타입 | 설명 |
|------|------|------|
| term | string | 용어 |
| definition | string | 정의 |
| category | string | 분류 (Foundations, Retrieval 등) |
| relatedTopics | string[] | 연관 Topic slug 목록 |

## 2. 데이터 소스

| 콘텐츠 | 저장소 | 형식 |
|--------|--------|------|
| Topic | content/topics/*.mdx | MDX + Frontmatter |
| Lab (설명) | content/labs/*.mdx | MDX + Frontmatter |
| Lab (데이터) | lib/labs.ts | TypeScript 객체 |
| Case Study | content/case-studies/*.mdx | MDX + Frontmatter |
| Case Study (데이터) | lib/case-studies.ts | TypeScript 객체 |
| Glossary | lib/glossary.ts | TypeScript 객체 |
| Track / Path | lib/tracks.ts | TypeScript 객체 |
| System Map | data/system-map.json | JSON |
| Learning Path | data/learning-path.json | JSON |

## 3. 콘텐츠 관계

```
Track (1) ─── (N) Topic
Topic (N) ─── (N) Topic (prerequisites / nextTopics)
Topic (N) ─── (N) Lab (relatedLabs / relatedTopics)
Topic (N) ─── (N) Glossary Term (relatedTopics)
Topic (1) ─── (N) System Map Node (topicSlug)
Lab (N) ─── (N) System Map Node (relatedLabs)
```

## 4. 콘텐츠 현황

| 유형 | 수량 | 목록 |
|------|------|------|
| Topic | 6 | transformer, attention, embedding, similarity, rag-pipeline, kv-cache |
| Lab | 5 (데이터), 2 (인터랙티브) | embedding-space*, chunking*, attention-weights, temperature, retrieval-comparison |
| Case Study | 2 | internal-knowledge-bot, production-rag-system |
| Glossary | 23 | Attention, Autoregressive, BM25, ... |
| System Map Node | 16 | user-query, tokenizer, embedding, ... |

(*) = 인터랙티브 컴포넌트 구현 완료

## 5. 콘텐츠 추가 절차

### 새 Topic 추가
1. `content/topics/{slug}.mdx` 생성 (Frontmatter + 8개 섹션)
2. `lib/tracks.ts`에 해당 트랙의 topics 배열에 추가
3. `data/system-map.json`에 노드 추가 (선택)
4. `lib/glossary.ts`에 관련 용어 추가 (선택)

### 새 Lab 추가
1. `content/labs/{slug}.mdx` 생성 (Frontmatter + 4개 섹션)
2. `lib/labs.ts`의 labs 배열에 추가
3. `components/labs/{Name}Lab.tsx` 인터랙티브 컴포넌트 구현
4. `app/labs/[slug]/page.tsx`의 labComponents 맵에 등록

### 새 Case Study 추가
1. `content/case-studies/{slug}.mdx` 생성 (Frontmatter + 8개 섹션)
2. `lib/case-studies.ts`의 caseStudies 배열에 추가
