# PRD — LLM System Learning Site

## 1. 제품 개요

LLM 시스템 교육 사이트는 단순한 AI 개념 설명 블로그가 아니라 **LLM을 시스템 관점에서 이해하도록 돕는 교육 플랫폼**이다.

현재 많은 AI 교육 콘텐츠는 다음과 같은 한계를 가진다.

* 모델 구조 설명에 집중
* 프롬프트 기법 중심 학습
* 실제 서비스 시스템 구조 부재

그러나 실제 AI 서비스는 다음과 같은 요소들이 결합된 시스템이다.

Model + Data + Retrieval + Infrastructure + Operations

따라서 본 프로젝트의 목표는 **LLM을 모델이 아닌 시스템으로 이해하도록 돕는 학습 플랫폼을 구축하는 것**이다.

---

## 2. 제품 목표

### 핵심 목표

LLM 시스템의 전체 흐름을 이해할 수 있도록 **개념 학습 + 시스템 맵 + 인터랙티브 실험**을 결합한 교육 플랫폼을 구축한다.

### 학습 목표

사용자는 다음 질문에 답할 수 있어야 한다.

* LLM은 어떻게 문맥을 이해하는가
* 텍스트는 어떻게 벡터로 변환되는가
* RAG는 어떻게 동작하는가
* 검색 품질은 무엇이 결정하는가
* LLM 서비스는 어떻게 운영되는가

---

## 3. 타겟 사용자

### 1) 개발자

* LLM 시스템을 이해하고 싶은 백엔드 개발자
* RAG 시스템을 구축하려는 엔지니어

### 2) AI 엔지니어

* LLM 아키텍처 이해
* Retrieval 시스템 설계

### 3) DevOps / SRE

* AI 시스템 운영
* LLM Observability

---

## 4. 제품 핵심 가치

### 1. System-first Learning

LLM을 모델이 아닌 **시스템 흐름으로 학습**한다.

Transformer → Embedding → Retrieval → RAG → Inference → Production

---

### 2. Visual Understanding

텍스트 설명보다 **구조와 다이어그램 중심 학습**을 제공한다.

---

### 3. Interactive Learning

실험을 통해 개념을 이해한다.

예시

* Chunk size 변화
* Temperature 변화
* Similarity metric 비교

---

### 4. Practical Perspective

이론이 아니라 **실제 서비스 구축 관점**에서 설명한다.

---

## 5. Information Architecture

교육 콘텐츠는 **LLM System Lifecycle** 구조로 구성한다.

### 1. Foundations

LLM의 기본 메커니즘

구성

* Language Model
* Tokenization
* Transformer
* Self Attention
* Multi Head Attention
* KV Cache

---

### 2. Representation

텍스트를 의미 공간으로 변환

구성

* Embedding
* Semantic Space
* Similarity Metric
* Cosine Similarity
* Dot Product
* L2 Distance

---

### 3. Retrieval Systems

검색 시스템 구조

구성

* Dense Retrieval
* Sparse Retrieval
* Hybrid Search
* Vector Database
* ANN Search
* HNSW

---

### 4. Generation Systems

LLM 응답 생성 구조

구성

* RAG Architecture
* Retriever
* Reranker
* Prompt Engineering
* Context Window
* Hallucination

---

### 5. AI System Architecture

LLM 서비스 구조

구성

* LLM Application Architecture
* API Gateway
* Retrieval Layer
* Tool Calling
* Agent Architecture
* Memory System

---

### 6. Inference & Optimization

모델 실행 및 성능 최적화

구성

* LLM Inference
* GPU Memory
* KV Cache Optimization
* Quantization
* Batch Inference

---

### 7. Production & AI DevOps

AI 시스템 운영

구성

* LLM Gateway
* Model Routing
* Observability
* LLM Tracing
* Token Cost Monitoring
* Guardrails
* SLO Design

---

### 8. Interactive Lab

개념 실험 환경

예시

* Embedding Lab
* Similarity Lab
* Chunking Lab
* Retrieval Lab
* Prompt Lab

---

### 9. Case Studies

실제 시스템 사례

예시

* Internal Knowledge Bot
* AI Support System
* Code Search System
* Multi Agent Workflow

---

## 6. 핵심 기능

### 1. Concept Learning

개념 중심 학습 페이지

특징

* 핵심 다이어그램
* 시스템 연결 설명
* 실무 관점 설명

---

### 2. System Map

LLM 시스템 구조를 시각적으로 탐색

예

User Query

→ Retriever

→ VectorDB

→ Reranker

→ LLM

→ Response

각 노드를 클릭하면 관련 학습 페이지로 이동한다.

---

### 3. Interactive Lab

사용자가 직접 실험 가능

예

* Chunk size
* Embedding model
* Temperature

---

### 4. Case Studies

실제 시스템 설계 사례 분석

구성

* Problem
* Architecture
* Implementation
* Operational Issues

---

## 7. 기술 스택

Frontend

Next.js
React
Tailwind

Content

MDX

Visualization

React Flow
D3

Hosting

Vercel

---

## 8. MVP 범위

초기 버전에서는 다음 기능을 포함한다.

### Pages

Home
Learn
System Map
Labs
Case Studies
Glossary

### Topics

Transformer
Attention
Embedding
Similarity
RAG Pipeline
KV Cache

### Labs

Embedding Space Lab
Chunking Lab

### Case Studies

Internal Knowledge Bot
RAG Production System

---

## 9. 성공 지표

### Learning Metrics

* 학습 완료율
* Lab 실행 횟수

### Engagement Metrics

* 평균 페이지 체류 시간
* System Map interaction

### Community Metrics

* GitHub Star
* 블로그 유입

---

## 10. 제품 비전

이 프로젝트의 궁극적인 목표는 **AI 개념 사이트가 아니라 LLM 시스템 아키텍처 교육 플랫폼을 만드는 것**이다.

즉

Model Understanding → System Understanding → Production Engineering

이 흐름을 학습자가 자연스럽게 이해하도록 만드는 것이 핵심이다.
