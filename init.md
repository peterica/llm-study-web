# LLM 시스템 교육 사이트용 harness 구성

## 목적

이 프로젝트의 목적은 단순 웹사이트 생성이 아니라, \
**교육 콘텐츠 구조 + 인터랙티브 실험 + 시스템 맵 + 운영 가능한 확장 구조**를 
Claude가 이해하고 지속적으로 작업할 수 있게 만드는 것이다. \
따라서 파일도 단순 소스코드보다 **문서 계층 + 실행 계층 + 설계 계층**으로 나누었다.


---

## 1. 최상위 필수 파일

### `CLAUDE.md`

Claude가 프로젝트를 이해하기 위한 핵심 진입 문서다.

포함 권장 항목

* 프로젝트 개요
* 목표 사용자
* 현재 범위(MVP)
* 폴더 구조
* 개발 원칙
* 작업 규칙
* 테스트 원칙
* 금지 사항
* 서브에이전트 사용 규칙
* Custom Skills / Agents 표

---

### `README.md`

사람이 보는 프로젝트 소개 문서다.

포함 권장 항목

* 프로젝트 소개
* 왜 만드는가
* 주요 기능
* 기술 스택
* 실행 방법
* 문서 링크
* 개발 로드맵

---

### `PLAN.md`

전체 구축 계획 문서다.

포함 권장 항목

* 단계별 구현 범위
* MVP 범위
* 우선순위
* 페이지별 구현 순서
* 기술적 리스크
* 이후 확장 계획

---

### `PROGRESS.md`

실행 이력과 현재 상태를 기록하는 문서다.

포함 권장 항목

* 완료 항목
* 진행 중 항목
* 다음 작업
* 이슈 / 결정 사항
* 변경 로그

---

## 2. 제품/설계 문서 계층

### `docs/PRD.md`

제품 요구사항 문서다.

포함 권장 항목

* 제품 목표
* 사용자 문제
* 핵심 가치
* 주요 사용자 시나리오
* MVP 범위
* 제외 범위
* 성공 지표

---

### `docs/IA.md`

Information Architecture 문서다.

포함 권장 항목

* 사이트맵
* 상위 메뉴 구조
* 페이지 계층
* 학습 흐름
* Learn / Map / Lab / Case Study 연결 구조

---

### `docs/UI_GUIDE.md`

UI 가이드 문서다.

포함 권장 항목

* 레이아웃 원칙
* 페이지 템플릿
* 색상
* 타이포그래피
* 카드 / 패널 / 네비게이션 규칙
* 반응형 기준

---

### `docs/WIREFRAMES.md`

텍스트 기반 와이어프레임 문서다.

포함 권장 항목

* Home
* Learn
* Topic Detail
* System Map
* Lab Index
* Lab Detail
* Case Study

---

### `docs/CONTENT_MODEL.md`

콘텐츠 데이터 구조 정의 문서다.

포함 권장 항목

* Topic 데이터 스키마
* Lab 데이터 스키마
* Case Study 스키마
* Glossary 스키마
* relation 구조
* prerequisite / nextTopic / relatedLab 정의

이 문서는 나중에 MDX, JSON, CMS로 확장할 때 매우 중요하다.

---

## 3. 개발 규칙 / 실행 규칙 문서

### `docs/ARCHITECTURE.md`

프론트엔드 및 앱 구조 문서다.

포함 권장 항목

* Next.js App Router 구조
* 페이지 라우팅
* 상태 관리 기준
* 데이터 로딩 방식
* 컴포넌트 계층
* 시각화 영역 구조

---

### `docs/TECH_STACK.md`

기술 선택 근거 문서다.

포함 권장 항목

* Next.js
* Tailwind
* shadcn/ui
* React Flow 또는 D3
* MDX 또는 Contentlayer 여부
* 배포 방식
* 향후 분석/로그 도입 방안

---

### `docs/CONTRIBUTING.md`

협업 규칙 문서다.

포함 권장 항목

* 브랜치 규칙
* 커밋 규칙
* PR 규칙
* 코드 스타일
* 리뷰 기준

Claude가 장기적으로 일관된 수정을 하도록 만드는 데 도움이 된다.

---

### `docs/DECISIONS.md`

아키텍처 결정 기록 문서다.

예시

* 왜 MDX를 쓰는가
* 왜 D3 대신 React Flow를 쓰는가
* 왜 Topic과 Lab를 분리하는가

작은 ADR 모음처럼 쓰면 좋다.

---

## 4. 콘텐츠 설계 파일

### `content/topics/`

개념 학습 콘텐츠 원본 저장소다.

예시 파일

* `transformer.md`
* `attention.md`
* `kv-cache.md`
* `embedding.md`
* `similarity.md`
* `hnsw.md`
* `rag-pipeline.md`

각 파일 권장 frontmatter

* id
* title
* slug
* category
* difficulty
* readingTime
* prerequisites
* relatedLabs
* nextTopics

---

### `content/labs/`

실험형 콘텐츠 정의 파일이다.

예시 파일

* `embedding-space-lab.md`
* `chunking-lab.md`
* `temperature-lab.md`

권장 항목

* 실험 목적
* 조절 변수
* 기대 학습 포인트
* 관련 개념
* 입력/출력 구조

---

### `content/case-studies/`

사례 분석 콘텐츠다.

예시 파일

* `internal-knowledge-bot.md`
* `rag-production-system.md`

---

### `content/glossary/`

용어 사전 데이터다.

예시 파일

* `attention.md`
* `embedding.md`
* `retriever.md`
* `hallucination.md`

---

## 5. 실제 구현용 소스 구조

### `app/`

Next.js App Router 기준 페이지 디렉터리다.

예시

* `app/page.tsx`
* `app/learn/page.tsx`
* `app/learn/[slug]/page.tsx`
* `app/system-map/page.tsx`
* `app/labs/page.tsx`
* `app/labs/[slug]/page.tsx`
* `app/case-studies/page.tsx`
* `app/case-studies/[slug]/page.tsx`
* `app/glossary/page.tsx`

---

### `components/`

재사용 UI 컴포넌트다.

권장 분리

* `layout/`
* `navigation/`
* `topic/`
* `labs/`
* `system-map/`
* `case-study/`
* `ui/`

예시 파일

* `Header.tsx`
* `Sidebar.tsx`
* `TopicHero.tsx`
* `CoreDiagram.tsx`
* `SystemMapCanvas.tsx`
* `LabParameterPanel.tsx`
* `LabResultPanel.tsx`

---

### `lib/`

로직 유틸리티 계층이다.

예시 파일

* `content.ts`
* `topics.ts`
* `labs.ts`
* `navigation.ts`
* `systemMap.ts`
* `utils.ts`

---

### `data/`

정적 데이터 또는 맵 구조를 저장한다.

예시 파일

* `learning-path.json`
* `system-map.json`
* `glossary.json`

---

### `styles/`

글로벌 스타일 및 토큰이다.

예시 파일

* `globals.css`
* `tokens.css`

---

## 6. Claude harness 관점에서 특히 중요한 파일

아래 파일은 Claude가 프로젝트를 잘 다루게 만드는 핵심 파일이다.

### `CLAUDE.md`

가장 중요

### `PLAN.md`

무엇을 만들지

### `PROGRESS.md`

지금 어디까지 왔는지

### `docs/PRD.md`

왜 만드는지

### `docs/IA.md`

무엇이 어디에 있는지

### `docs/UI_GUIDE.md`

어떻게 보여야 하는지

### `docs/WIREFRAMES.md`

화면이 어떻게 생겨야 하는지

### `docs/CONTENT_MODEL.md`

콘텐츠를 어떤 데이터로 다룰지

즉, Claude harness의 핵심은 사실 코드보다 **문서 기반 실행 환경**이다.

---

## 7. 초기 생성 권장 최소 세트

처음부터 너무 많으면 무거워질 수 있으므로, 1차로는 아래만 먼저 만들면 충분하다.

```text
/
├─ CLAUDE.md
├─ README.md
├─ PLAN.md
├─ PROGRESS.md
├─ docs/
│  ├─ PRD.md
│  ├─ IA.md
│  ├─ UI_GUIDE.md
│  ├─ WIREFRAMES.md
│  ├─ ARCHITECTURE.md
│  └─ CONTENT_MODEL.md
├─ content/
│  ├─ topics/
│  ├─ labs/
│  ├─ case-studies/
│  └─ glossary/
├─ app/
├─ components/
├─ lib/
├─ data/
└─ styles/
```

---

## 8. 추천 판단

이 프로젝트는 일반적인 “랜딩 페이지 개발”이 아니라,
당신이 구상한 **LLM System Learning Site**를 구현하는 구조이므로 파일 기준도 다음 3축으로 나누는 것이 적절하다.

* **운영 문서 축**: `CLAUDE.md`, `PLAN.md`, `PROGRESS.md`
* **제품 설계 축**: `PRD.md`, `IA.md`, `UI_GUIDE.md`, `WIREFRAMES.md`
* **실행 코드 축**: `app/`, `components/`, `content/`, `lib/`
