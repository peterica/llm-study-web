# Architecture — LLM System Lab

## 1. 기술 스택

| 영역 | 기술 | 버전 |
|------|------|------|
| Framework | Next.js (App Router) | 15.5 |
| Language | TypeScript (strict) | 5.x |
| UI Library | React | 19 |
| Styling | Tailwind CSS | v4 |
| Components | shadcn/ui | v4 |
| Content | next-mdx-remote (RSC) | 6.0 |
| Frontmatter | gray-matter | - |
| Visualization | @xyflow/react (React Flow) | 12.x |
| Deployment | Vercel | - |

## 2. 디렉토리 구조

```
llm-study-web/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (Header + Footer)
│   ├── page.tsx            # Home
│   ├── learn/
│   │   ├── page.tsx        # Learn Landing
│   │   └── [slug]/page.tsx # Topic Detail (SSG)
│   ├── system-map/page.tsx # System Map (Static)
│   ├── labs/
│   │   ├── page.tsx        # Lab Index
│   │   └── [slug]/page.tsx # Lab Detail (SSG)
│   ├── case-studies/
│   │   ├── page.tsx        # Case Study Index
│   │   └── [slug]/page.tsx # Case Study Detail (SSG)
│   ├── glossary/page.tsx   # Glossary (Static)
│   ├── sitemap.ts          # Dynamic sitemap
│   └── robots.ts           # Robots.txt
├── components/
│   ├── layout/             # Header, Footer
│   ├── navigation/         # Sidebar, ContextPanel
│   ├── topic/              # TopicHero, MdxContent
│   ├── labs/               # LabShell, EmbeddingSpaceLab, ChunkingLab
│   ├── system-map/         # SystemMapCanvas, SystemNode, NodeDetailPanel
│   ├── case-study/         # CaseStudyShell
│   ├── glossary/           # GlossaryList
│   ├── search/             # SearchDialog
│   └── ui/                 # shadcn/ui (Button, Card, Badge, Separator)
├── lib/                    # 로직 & 데이터
│   ├── content.ts          # MDX 파서 (gray-matter + reading-time)
│   ├── tracks.ts           # 트랙/학습경로 데이터
│   ├── labs.ts             # Lab 정적 데이터
│   ├── case-studies.ts     # Case Study 데이터
│   ├── glossary.ts         # 용어 데이터
│   ├── search.ts           # 클라이언트 검색 엔진
│   └── utils.ts            # shadcn cn() 유틸리티
├── content/                # MDX 원본
│   ├── topics/             # Topic MDX (6개)
│   ├── labs/               # Lab MDX (2개)
│   └── case-studies/       # Case Study MDX (2개)
├── data/                   # JSON 데이터
│   ├── system-map.json     # 노드/엣지 (16 노드, 18 엣지)
│   └── learning-path.json  # 학습 경로 (3 경로, 6 트랙)
└── docs/                   # 설계 문서
```

## 3. 렌더링 전략

| 페이지 | 전략 | 이유 |
|--------|------|------|
| Home, Learn, Labs, Case Studies, Glossary | Static (○) | 정적 데이터, 빌드 시 생성 |
| /learn/[slug] | SSG (●) | generateStaticParams, 빌드 시 전체 생성 |
| /labs/[slug] | SSG (●) | generateStaticParams |
| /case-studies/[slug] | SSG (●) | generateStaticParams |
| System Map | Static (○) | JSON 데이터 빌드 시 임포트 |

모든 페이지가 빌드 시 정적 생성되어 CDN에서 직접 서빙됩니다.

## 4. 콘텐츠 파이프라인

```
content/topics/*.mdx
    → gray-matter (frontmatter 파싱)
    → reading-time (읽기 시간 계산)
    → next-mdx-remote/rsc (RSC에서 직접 렌더링)
    → HTML 출력
```

### Topic Frontmatter Schema

```yaml
id: string
title: string
slug: string
category: string        # Track 이름
difficulty: beginner | intermediate | advanced
readingTime: string
prerequisites: string[] # 선행 Topic slug
relatedLabs: string[]   # 연관 Lab slug
nextTopics: string[]    # 다음 Topic slug
```

## 5. 디자인 시스템

### 색상 토큰 (globals.css @theme)

- **Brand**: `--color-brand` (#1A73E8)
- **Track colors**: `--color-track-{name}` (7개 트랙)
- **Difficulty**: `--color-beginner/intermediate/advanced`
- **Surface**: `--color-surface`, `--color-surface-white`
- **Content**: `--color-content`, `--color-content-muted`

### 레이아웃 토큰

- Header: 64px (sticky)
- Sidebar: 256px (데스크톱)
- Context Panel: 280px (데스크톱)
- Max content width: 4xl (896px)

## 6. 검색 아키텍처

클라이언트 사이드 검색:
- 인덱스: Track Topics + Labs + Case Studies + Glossary 통합
- 매칭: title + description 부분 문자열 매칭
- UI: ⌘K 커맨드 팔레트 (SearchDialog)
- 결과 제한: 10개

## 7. 성능 고려사항

- 모든 페이지 정적 생성 (zero runtime server)
- React Flow는 /system-map에서만 로드 (56kB JS)
- Lab 인터랙티브 컴포넌트는 해당 slug에서만 로드
- 이미지 최적화: next/image (향후)
