# LLM 시스템 교육 사이트 UI 구조 및 페이지 설계

## 1. 설계 목표

이 사이트는 단순한 AI 개념 정리 블로그가 아니라, **LLM 시스템을 학습 경로에 따라 이해하도록 돕는 교육형 플랫폼**으로 설계한다.

핵심 목표는 다음과 같다.

* 초심자는 개념을 직관적으로 이해할 수 있어야 한다.
* 실무자는 시스템 연결 구조를 파악할 수 있어야 한다.
* 학습자는 읽기만 하는 것이 아니라 직접 실험할 수 있어야 한다.
* 각 페이지는 독립적으로 이해 가능해야 하지만, 전체적으로는 하나의 시스템 흐름으로 연결되어야 한다.

즉, 사이트 전체 UX는 다음 흐름을 기본 전제로 둔다.

**개념 이해 → 구조 이해 → 실험 → 시스템 관점 확장 → 운영 관점 연결**

---

## 2. 전체 UI 구조

최상위 UI는 5개 영역으로 나눈다.

### 2.1 Global Navigation

사이트 어디에서나 공통으로 보이는 상단 영역이다.

포함 항목:

* 로고 / 사이트명
* 학습 경로(Map)
* Topic 탐색 메뉴
* Lab 메뉴
* Case Study 메뉴
* Search
* 사용자 진행률 또는 즐겨찾기

권장 상단 메뉴 예시:

* Learn
* System Map
* Labs
* Case Studies
* Glossary
* About

이 메뉴는 단순 카테고리 목록이 아니라, 사용자가 현재 자신이 어느 학습 단계에 있는지 인지하도록 돕는 역할을 해야 한다.

---

### 2.2 Left Sidebar

학습용 문서 페이지에서 사용되는 보조 네비게이션이다.

역할:

* 현재 트랙의 세부 목차 제공
* 같은 주제 내 선후 관계 표시
* 현재 문서의 위치 표시

예시:

* Foundations

    * What is an LLM?
    * Tokenization
    * Transformer
    * Attention
    * KV Cache
* Representation

    * Embedding
    * Semantic Space
    * Similarity
* Retrieval

    * Dense Retrieval
    * Hybrid Search
    * HNSW

이 사이드바는 문서형 학습 경험을 안정적으로 만든다.

---

### 2.3 Main Learning Area

실제 콘텐츠가 노출되는 핵심 영역이다.

한 페이지의 기본 구조는 다음 순서를 따른다.

1. 페이지 제목
2. 한 줄 요약
3. 왜 중요한가
4. 핵심 다이어그램
5. 개념 설명
6. 시스템 연결
7. 실무 관점
8. 실험 또는 예시
9. 다음 학습 링크

이 구조는 사용자의 읽기 피로도를 낮추고, 페이지별 일관성을 유지한다.

---

### 2.4 Right Context Panel

심화 학습 보조 영역이다.

포함 가능 요소:

* 핵심 용어 요약
* 선행 개념 링크
* 관련 실험 링크
* 관련 글 / 사례
* 현재 페이지의 시스템 맵 위치

예를 들어 “HNSW” 페이지에서는 오른쪽 패널에 다음이 보일 수 있다.

* 선행 개념: Embedding, Similarity Metric
* 연결 개념: ANN, VectorDB, Retrieval
* 실험 바로가기: HNSW 파라미터 비교 Lab

---

### 2.5 Footer

하단은 단순한 저작권 영역이 아니라, 학습 흐름 재진입 장치로 사용한다.

구성 예시:

* 이전 / 다음 개념
* 추천 학습 경로
* 관련 시리즈
* 뉴스레터 / 업데이트 구독

---

## 3. 사이트 맵

사이트 구조는 다음처럼 설계한다.

## Home

* Hero
* Learning Tracks
* Featured Concepts
* Interactive Labs
* Latest Case Studies

## Learn

* Foundations
* Representation
* Retrieval Systems
* Generation Systems
* System Architecture
* Inference & Optimization
* Production & AI DevOps

## System Map

* LLM System Overview
* Data Flow Map
* Inference Flow Map
* RAG Flow Map
* Production Architecture Map

## Labs

* Tokenization Lab
* Attention Lab
* Embedding Space Lab
* Similarity Lab
* Chunking Lab
* Retrieval Lab
* Prompt Lab
* Temperature Lab
* Reranking Lab

## Case Studies

* Internal Knowledge Bot
* Customer Support AI
* Code Search Assistant
* Multi-Agent Workflow
* AI Platform Operations

## Glossary

* LLM 용어 사전

## About

* 사이트 목적
* 학습 철학
* 작성자 소개

---

## 4. 핵심 페이지 설계

## 4.1 Home

Home은 단순 소개 페이지가 아니라, 사이트의 학습 철학과 전체 구조를 한 번에 보여주는 시작점이어야 한다.

### 섹션 구성

#### A. Hero Section

메시지:

* LLM은 모델이 아니라 시스템이다.
* Transformer부터 RAG, Inference, 운영까지 하나의 흐름으로 배운다.

CTA:

* 학습 시작하기
* 시스템 맵 보기
* 실험실 들어가기

#### B. Learning Journey

카드형 구조로 전체 학습 경로를 보여준다.

예시 카드:

* 1. Foundations
* 2. Embedding
* 3. Retrieval
* 4. RAG
* 5. Inference
* 6. Production

#### C. Featured Concepts

대표 개념 글 노출:

* Attention
* Embedding
* HNSW
* RAG Pipeline
* KV Cache

#### D. Interactive Labs Preview

실험형 콘텐츠 미리보기

#### E. Case Studies Preview

실제 시스템 사례 소개

#### F. Author Perspective

작성자의 문제의식과 사이트 철학

이 부분은 사용자의 블로그 스타일과 연결된다.

---

## 4.2 Learn Landing Page

이 페이지는 전체 학습 주제를 구조적으로 탐색하는 허브다.

### UI 요소

* 상단: 전체 학습 지도
* 중단: 트랙별 카드 목록
* 하단: 추천 입문 경로 / 실무자 경로 / 운영자 경로

트랙 카드 예시:

* Foundations: LLM 기본 메커니즘 이해
* Representation: 의미를 벡터로 바꾸는 과정
* Retrieval: 검색 시스템 설계
* Generation: RAG와 응답 생성
* Production: 운영 가능한 AI 시스템

---

## 4.3 Topic Detail Page

이 사이트에서 가장 중요한 기본 페이지 유형이다.

예: “Embedding”, “KV Cache”, “HNSW”, “RAG Pipeline”

### 레이아웃

* 상단: Breadcrumb + 제목 + 난이도 + 예상 학습 시간
* 본문: 설명 콘텐츠
* 우측: 관련 개념, 실험, 시스템 맵 위치

### 본문 블록 설계

#### 1. Title

예: Embedding — 텍스트를 의미 공간으로 바꾸는 방법

#### 2. Summary

한 문단 요약

#### 3. Why It Matters

왜 이 개념이 중요한가

#### 4. Core Diagram

이 페이지의 대표 그림

#### 5. Concept Explanation

핵심 개념 설명

#### 6. System Perspective

시스템 전체에서 이 개념이 어디에 쓰이는가

#### 7. Practical Insight

실무에서 어떤 문제가 발생하는가

#### 8. Common Misunderstandings

자주 하는 오해

#### 9. Mini Example / Simulation

간단한 예시 또는 실험

#### 10. Connected Topics

다음으로 이어질 주제

이 구조는 사용자의 블로그 문단 구성과도 잘 맞는다.

---

## 4.4 System Map Page

이 사이트의 차별화 핵심 페이지다.

일반 교육 사이트는 개념 설명에서 끝나지만, 이 페이지는 각 개념이 시스템 안에서 어떻게 연결되는지 시각적으로 보여준다.

### 주요 구성

* 전체 LLM 서비스 아키텍처 다이어그램
* 클릭 가능한 노드
* 노드별 상세 설명
* 흐름별 보기 전환

### 보기 모드

* Concept View
* Data Flow View
* RAG View
* Inference View
* Production View

예시 흐름:

User Query
→ Query Understanding
→ Retrieval
→ Reranking
→ Prompt Composition
→ LLM Inference
→ Response
→ Logging / Evaluation

각 노드를 누르면 관련 학습 페이지로 이동한다.

---

## 4.5 Lab Index Page

실험형 학습의 진입점이다.

### 구성

* 난이도 필터
* 개념별 필터
* 실험 카드 리스트

실험 카드 예시:

* Attention Weight 시각화
* Embedding Distance 비교
* Chunk Size 변화 실험
* Temperature 결과 비교
* Dense vs Hybrid Search 비교

카드에는 다음 요소를 넣는다.

* 실험명
* 배울 개념
* 예상 소요 시간
* 난이도
* 실습 여부

---

## 4.6 Individual Lab Page

예: “Chunking Lab”

### 레이아웃

* 좌측: 입력 조건 / 파라미터
* 중앙: 결과 시각화
* 하단: 해설
* 우측: 핵심 포인트 / 연결 개념

### 예시 블록

* 실험 목표
* 조절 가능한 변수
* 결과 패널
* 해석 가이드
* 실무적 시사점

이 페이지는 교육 효과가 매우 크므로, 가능한 한 단순하고 빠르게 반응해야 한다.

---

## 4.7 Case Study Page

이 페이지는 “실제 시스템에서 어떻게 쓰이는가”를 설명한다.

예:

* 사내 문서 검색 봇
* 코드 검색 어시스턴트
* 고객 상담 AI
* Multi-Agent 업무 자동화

### 페이지 구조

1. 문제 정의
2. 왜 일반 검색으로 부족했는가
3. 시스템 구조
4. 핵심 기술 선택 이유
5. 운영 시 발생한 이슈
6. 개선 포인트
7. 확장 가능성

이 페이지는 실무자에게 매우 중요하다.

---

## 4.8 Glossary Page

LLM 교육에서는 용어 밀도가 높기 때문에 Glossary는 반드시 필요하다.

### UI 구성

* 알파벳 / 주제별 정렬
* 검색창
* 짧은 정의
* 관련 개념 링크

예:

* Attention
* Embedding
* Token
* Reranker
* Hallucination
* Quantization
* Throughput

---

## 5. 사용자 흐름 설계

## 5.1 입문자 흐름

Home
→ Foundations
→ Embedding
→ Retrieval
→ RAG
→ 기본 Lab
→ 간단한 Case Study

목표:

* 전체 구조를 잃지 않고 이해하도록 돕는다.

## 5.2 개발자 흐름

Home
→ System Map
→ Retrieval
→ Generation
→ Inference
→ Production
→ 실무형 Case Study

목표:

* 개념보다 시스템 연결을 빨리 이해하도록 돕는다.

## 5.3 운영자/SRE 흐름

Home
→ System Map
→ Inference
→ Production
→ Observability
→ AI DevOps Case Study

목표:

* 운영 가능한 AI 시스템 관점으로 빠르게 진입하게 한다.

---

## 6. 디자인 원칙

### 6.1 한 페이지, 한 핵심 메시지

한 페이지에서 너무 많은 것을 설명하지 않는다.

### 6.2 다이어그램 우선

텍스트보다 먼저 구조를 보여준다.

### 6.3 시스템 연결 강조

각 개념이 어디에 연결되는지 항상 표시한다.

### 6.4 읽기 + 실험 결합

개념 페이지와 실험 페이지를 분리하되 서로 강하게 연결한다.

### 6.5 난이도와 선행 개념 표시

학습자의 이탈을 줄이기 위해 난이도, 선행 개념, 다음 단계 정보를 제공한다.

---

## 7. MVP 페이지 우선순위

초기 MVP는 아래 구조로 시작하는 것이 적절하다.

### 1차 오픈 범위

* Home
* Learn Landing
* Topic Detail 6개

    * Transformer
    * Attention
    * Embedding
    * Similarity
    * RAG Pipeline
    * KV Cache
* System Map
* Lab 2개

    * Embedding Space Lab
    * Chunking Lab
* Case Study 2개

    * Internal Knowledge Bot
    * 운영 가능한 RAG 시스템

### 2차 확장 범위

* HNSW
* Reranker
* Quantization
* Tool Calling
* LLM Gateway
* OTEL / Tracing
* Cost Monitoring

---

## 8. 사용자 블로그 스타일과의 연결

사용자의 기존 글 스타일은 다음 강점이 있다.

* 문제의식으로 시작한다.
* 개념을 구조적으로 해석한다.
* 시스템 관점으로 확장한다.
* 운영 관점에서 마무리한다.

이 강점은 Topic Detail Page와 Case Study Page에서 매우 잘 살아난다.

즉, 기존 블로그 글을 다음 구조로 재편하면 사이트형 콘텐츠로 전환하기 쉽다.

* 들어가며
* 왜 중요한가
* 본질 설명
* 구조 해석
* 시스템 관점
* 운영 관점
* 다음 주제로 연결

---

## 9. 결론

이 사이트의 핵심은 “AI 개념 설명 사이트”가 아니라, **LLM 시스템 교육 플랫폼**이라는 점이다.

따라서 실제 UI 구조도 단순 블로그형 목록이 아니라 다음 세 축으로 설계해야 한다.

* Learn: 개념 학습
* Map: 시스템 구조 이해
* Lab: 실험 기반 체험

여기에 Case Study를 더하면, 학습자는 이론과 실무를 함께 연결할 수 있다.

이 구조는 특히 사용자가 지향하는 다음 흐름과 정확히 맞닿아 있다.

**Transformer → Embedding → VectorDB → RAG → Inference → AI DevOps**

즉, 이 사이트는 단순한 설명 모음이 아니라,
**모델을 시스템으로 이해하게 만드는 교육형 아키텍처**가 되어야 한다.

---

# 10. UI 디자인 가이드 (Design Guide)

이 섹션은 실제 구현 단계에서 사용할 수 있는 **UI 원칙과 화면 구성 규칙**을 정의한다.

목표는 다음과 같다.

* 교육 콘텐츠가 **쉽게 읽히는 구조**
* 다이어그램 중심 학습
* 인터랙티브 실험과 자연스러운 연결
* 시스템 관점 이해를 돕는 시각 구조

---

# 11. 전체 레이아웃 구조

기본 페이지 레이아웃은 다음 4단 구조를 사용한다.

Header
Left Navigation
Main Content
Right Context
Footer

와이어프레임 개념

```
---------------------------------------------------
Header (Global Navigation)
---------------------------------------------------
| Left Nav | Main Content Area | Context Panel |
|          |                   |               |
|          |                   |               |
|          |                   |               |
---------------------------------------------------
Footer
---------------------------------------------------
```

---

# 12. Header UI

Header는 사이트의 학습 방향을 보여주는 가장 중요한 요소다.

구성 요소

로고

LLM System Lab

메뉴

Learn
System Map
Labs
Case Studies
Glossary

우측 기능

Search
Bookmark
User Progress

디자인 원칙

* 높이 64px
* sticky header
* 검색은 항상 노출

---

# 13. Left Navigation

Left Sidebar는 학습 구조를 보여주는 핵심 UI다.

예시

```
Foundations
  What is LLM
  Tokenization
  Transformer
  Attention
  KV Cache

Representation
  Embedding
  Semantic Space
  Similarity

Retrieval
  Dense Retrieval
  Hybrid Search
  HNSW
```

UI 특징

* 현재 페이지 강조
* 선행 개념 표시
* 완료 체크

---

# 14. Topic Page UI

Topic Detail Page는 다음 레이아웃을 따른다.

```
Title
Summary

[ Core Diagram ]

Concept Explanation

System Perspective

Practical Insight

Common Misunderstandings

Mini Experiment

Next Topics
```

각 Topic 페이지에는 반드시 **핵심 다이어그램**이 하나 있어야 한다.

예

Embedding 페이지

```
Text
 ↓
Tokenizer
 ↓
Embedding Model
 ↓
Vector
```

---

# 15. System Map UI

이 페이지는 사이트의 핵심 차별화 기능이다.

인터랙티브 그래프 형태로 구현한다.

예시 구조

```
User Query
   ↓
Retriever
   ↓
VectorDB
   ↓
Reranker
   ↓
LLM
   ↓
Response
```

UI 특징

* 노드 클릭 가능
* 노드 설명 패널
* 흐름별 보기

보기 모드

Concept View
Data Flow View
RAG View
Production View

---

# 16. Lab UI

Lab은 실험 중심 화면이다.

레이아웃

```
------------------------------------
Parameter Panel
------------------------------------

Visualization

------------------------------------
Explanation
------------------------------------
```

예시

Chunk Size Lab

조절 가능한 값

Chunk Size
Overlap
Embedding Model

결과

검색 정확도
Context Length
Token Cost

---

# 17. Home UI

Home 화면은 다음 구조를 권장한다.

Hero Section

"LLM은 모델이 아니라 시스템이다"

버튼

Start Learning
Explore System Map
Open Labs

Learning Journey

카드형 UI

```
Foundations
Embedding
Retrieval
RAG
Inference
Production
```

Featured Topics

Attention
Embedding
RAG
HNSW

Interactive Labs

Chunking Lab
Embedding Space Lab
Prompt Lab

---

# 18. Case Study UI

Case Study는 실무 중심 페이지다.

구성

Problem

왜 기존 방식이 실패했는가

Architecture

시스템 구조

Implementation

기술 선택 이유

Operational Issues

운영 중 문제

Lessons Learned

개선 포인트

---

# 19. 색상 가이드

권장 색상 팔레트

Primary

Deep Blue

#1A73E8

Secondary

Teal

#00A7A0

Background

Light Gray

#F5F7FA

Highlight

Orange

#FF8A00

---

# 20. 타이포그래피

Heading

Inter / Pretendard

Body

16px

Line height

1.6

코드 블록

JetBrains Mono

---

# 21. MVP 화면 목록

1. Home

2. Learn

3. Topic Page

Transformer
Embedding
RAG

4. System Map

5. Lab

Embedding Lab
Chunking Lab

6. Case Study

Knowledge Bot

---

# 22. 구현 스택 추천

Frontend

Next.js
React

UI

Tailwind
shadcn/ui

Visualization

D3.js
React Flow

Lab

WebGL / Canvas

Hosting

Vercel

---

# 23. 주요 화면 와이어프레임

아래는 실제 서비스 화면을 설계하기 위한 **텍스트 기반 와이어프레임**이다. 디자인 시안이 아니라 **정보 구조와 컴포넌트 배치**를 정의하는 단계다.

---

## 23.1 Home 화면

```
--------------------------------------------------
Header
Logo | Learn | System Map | Labs | Case Studies | Search
--------------------------------------------------

Hero Section

LLM은 모델이 아니라 시스템이다

[ Start Learning ]   [ View System Map ]   [ Open Labs ]

--------------------------------------------------
Learning Journey

[ Foundations ] → [ Embedding ] → [ Retrieval ]
        → [ RAG ] → [ Inference ] → [ Production ]

--------------------------------------------------
Featured Concepts

[ Attention ]   [ Embedding ]   [ RAG Pipeline ]   [ HNSW ]

--------------------------------------------------
Interactive Labs

[ Embedding Lab ]  [ Chunking Lab ]  [ Prompt Lab ]

--------------------------------------------------
Case Studies

[ Knowledge Bot ]  [ AI Support System ]

--------------------------------------------------
Footer
--------------------------------------------------
```

---

## 23.2 Learn 페이지

학습 주제를 탐색하는 허브 페이지다.

```
--------------------------------------------------
Header
--------------------------------------------------

Title
LLM System Learning Path

--------------------------------------------------
Track Cards

[ Foundations ]
LLM 기본 메커니즘 이해

[ Representation ]
Embedding과 의미 공간

[ Retrieval Systems ]
검색 시스템 구조

[ Generation Systems ]
RAG와 응답 생성

[ System Architecture ]
LLM 서비스 구조

[ Production ]
운영 가능한 AI 시스템

--------------------------------------------------
Recommended Paths

Beginner Path
Developer Path
AI Ops Path

--------------------------------------------------
```

---

## 23.3 Topic Detail Page

예: Embedding / Attention / RAG

```
--------------------------------------------------
Header
--------------------------------------------------

Breadcrumb
Learn > Retrieval > Embedding

Title
Embedding — 텍스트를 의미 공간으로 변환

Summary
텍스트를 벡터 공간으로 매핑하는 기술

--------------------------------------------------

[ Core Diagram ]

Text
 ↓
Tokenizer
 ↓
Embedding Model
 ↓
Vector

--------------------------------------------------

Concept Explanation

--------------------------------------------------

System Perspective

Embedding → VectorDB → Retrieval

--------------------------------------------------

Practical Insight

Embedding 모델 선택 기준

--------------------------------------------------

Mini Experiment

[ Try Embedding Lab ]

--------------------------------------------------

Next Topics

Similarity → HNSW → VectorDB

--------------------------------------------------
```

좌우 레이아웃

```
--------------------------------------------------
| Left Nav | Main Content | Context Panel |
--------------------------------------------------
```

Context Panel 예시

```
Prerequisite
Transformer

Connected Topics
Similarity
VectorDB

Lab
Embedding Space Lab
```

---

## 23.4 System Map Page

사이트의 핵심 페이지다.

```
--------------------------------------------------
Header
--------------------------------------------------

Title
LLM System Architecture

--------------------------------------------------

        User Query
            │
            ▼
      Query Processing
            │
            ▼
         Retriever
            │
            ▼
         VectorDB
            │
            ▼
          Reranker
            │
            ▼
            LLM
            │
            ▼
         Response

--------------------------------------------------

Node Detail Panel

선택된 노드 설명
관련 문서 링크
관련 Lab

--------------------------------------------------
```

추가 기능

* 노드 클릭 → Topic Page 이동
* 흐름 모드 전환

Concept
RAG
Production

---

## 23.5 Lab Index Page

```
--------------------------------------------------
Header
--------------------------------------------------

Title
Interactive Labs

--------------------------------------------------
Filters

Difficulty
Concept
Time

--------------------------------------------------
Lab Cards

[ Embedding Space Lab ]
배울 개념: Embedding / Similarity

[ Chunking Lab ]
배울 개념: Context Window / RAG

[ Temperature Lab ]
배울 개념: Sampling

--------------------------------------------------
```

---

## 23.6 Individual Lab Page

예: Chunking Lab

```
--------------------------------------------------
Header
--------------------------------------------------

Title
Chunking Strategy Lab

--------------------------------------------------
| Parameter Panel | Visualization |

Parameter Panel

Chunk Size
Overlap
Embedding Model

Visualization

Retrieved Chunks
Similarity Score

--------------------------------------------------

Explanation

Chunk 크기가 Retrieval 품질에 미치는 영향 설명

--------------------------------------------------
```

---

## 23.7 Case Study Page

```
--------------------------------------------------
Header
--------------------------------------------------

Title
Internal Knowledge Bot

--------------------------------------------------
Problem

문서 검색 정확도가 낮음

--------------------------------------------------
Architecture

User → Retriever → VectorDB → LLM

--------------------------------------------------
Implementation

Embedding Model
Chunk Strategy
VectorDB 선택

--------------------------------------------------
Operational Issues

Latency
Token Cost
Hallucination

--------------------------------------------------
Lessons Learned

Reranking 중요
Chunk size 최적화 필요

--------------------------------------------------
```

---

# 24. 와이어프레임 핵심 원칙

이 사이트 UI는 다음 원칙을 따른다.

1. **한 화면 한 메시지**

페이지마다 핵심 개념 하나만 강조한다.

2. **다이어그램 중심 UI**

텍스트보다 구조 이해가 먼저 오도록 설계한다.

3. **System Map 중심 네비게이션**

모든 개념은 시스템 구조 안에서 위치를 갖는다.

4. **Learn ↔ Lab 연결**

개념 페이지에서 실험으로 바로 이동 가능해야 한다.

---


