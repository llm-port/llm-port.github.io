---
sidebar_position: 2
---

# Architecture

This page describes the high-level architecture of **llm.Port** — the planes, services, and data flows that make up the platform.

## Platform Overview

<img src="/img/architecture.svg" alt="llm.Port architecture diagram" />

```mermaid
flowchart LR
    subgraph Users["Users & Clients"]
        U1["Admin User (Browser)"]
        U2["Application Clients / SDKs"]
    end

    subgraph UI["Console Layer"]
        FE["llm_port_frontend (React)"]
    end

    subgraph Core["Control Plane"]
        BE["llm_port_backend (FastAPI)"]
    end

    subgraph Gateway["API Gateway Plane"]
        API["llm_port_api (OpenAI-compatible /v1/*)"]
    end

    subgraph Modules["Optional Modules"]
        AUTH["llm_port_auth (SSO / OIDC)"]
        PII["llm_port_pii (Presidio)"]
        MAILER["llm_port_mailer (SMTP)"]
        DOCLING["llm_port_docling (IBM Docling)"]
    end

    subgraph RAG["RAG Plane (Internal)"]
        RAGAPI["llm_port_rag API (/api/internal/*)"]
        RAGW["Taskiq Worker"]
        RAGS["Scheduler"]
    end

    subgraph Runtime["Model Execution"]
        LOCAL["Local Runtimes (vLLM / llama.cpp / etc.)"]
        REMOTE["Remote Providers (OpenAI / Azure / etc.)"]
    end

    subgraph Shared["Shared Platform Services"]
        PGMAIN["Postgres (backend + auth + PII events)"]
        PGAPI["Postgres (gateway / sessions / memory)"]
        PGRAG["Postgres + pgvector (RAG)"]
        REDIS["Redis (rate limit / leases / cache)"]
        RMQ["RabbitMQ (Taskiq broker)"]
        MINIO["MinIO (raw snapshots/uploads)"]
        LANGFUSE["Langfuse (traces)"]
        LOKI["Loki + Alloy (logs)"]
        GRAF["Grafana (dashboards)"]
        DOCKER["Docker Engine / Compose"]
    end

    U1 --> FE
    FE -->|REST /api/*| BE
    FE -->|/chat UI| API
    U2 -->|OpenAI API /v1/*| API

    BE -->|Gateway admin/proxy calls| API
    BE -->|Internal RAG proxy /api/internal/*| RAGAPI
    BE -->|Auth provider proxy| AUTH
    BE -->|PII config/stats proxy| PII
    BE -->|Notification delivery| MAILER
    BE -->|Document conversion| DOCLING
    BE -->|Ops actions| DOCKER
    BE --> PGMAIN
    BE --> PGAPI
    BE --> LANGFUSE
    BE --> LOKI

    API -->|Route chat/embeddings| LOCAL
    API -->|Route chat/embeddings| REMOTE
    API -->|PII screening| PII
    API -->|Attachment extraction| DOCLING
    API --> PGAPI
    API --> REDIS
    API --> LANGFUSE

    AUTH -->|OAuth callback → JWT cookie| BE
    AUTH --> PGMAIN

    PII -->|Event forwarding| BE
    MAILER --> PGMAIN

    RAGAPI --> PGRAG
    RAGAPI --> MINIO
    RAGAPI --> DOCLING
    RAGAPI --> RMQ
    RAGW --> RMQ
    RAGW --> PGRAG
    RAGW --> MINIO
    RAGW --> DOCLING
    RAGS --> RMQ
    RAGS --> PGRAG

    GRAF --> LOKI
    GRAF --> PGMAIN
    FE -->|Open dashboards| GRAF
```

## Planes

### Console Layer

The **React frontend** provides the admin console — a single-page app for managing providers, models, containers, RAG, PII policies, and system settings.

### Control Plane

The **FastAPI backend** is the central orchestrator. It handles:

- User management, RBAC, and authentication
- LLM provider and runtime configuration
- Container lifecycle management via the Docker API
- System settings with crypto and apply orchestration
- Proxying internal requests to RAG and the gateway

### API Gateway Plane

The **gateway** exposes an OpenAI-compatible API (`/v1/models`, `/v1/chat/completions`, `/v1/embeddings`). It handles:

- Alias-based model resolution and provider routing
- JWT authentication with tenant-aware claims
- Redis-based rate limiting and concurrency leasing
- SSE streaming with TTFT extraction
- Langfuse tracing and audit logging
- Chat sessions, memory facts, and file attachments
- PII screening via the PII module

### Optional Modules

Separate services that can be enabled or disabled via Docker Compose profiles:

- **Auth** — SSO / OIDC authentication with OAuth provider adapters
- **PII** — Presidio-based PII scanning, redaction, and tokenization
- **Mailer** — Email notifications with Jinja2-templated messages
- **Docling** — IBM Docling-based document processing for text extraction

### RAG Plane

The **RAG subsystem** is an internal service accessed only through the backend. It manages:

- Document ingestion: upload → extract → chunk → embed → index
- Knowledge search: vector, keyword, and hybrid scoring with ACL enforcement
- Virtual containers with draft/publish workflows
- Async processing via Taskiq + RabbitMQ

### Shared Platform Services

Infrastructure containers managed via Docker Compose:

| Service       | Purpose                                                           |
| ------------- | ----------------------------------------------------------------- |
| PostgreSQL    | Backend + auth metadata + PII events, gateway sessions/memory, RAG vectors |
| Redis         | Rate limiting, concurrency leases, caching                        |
| RabbitMQ      | Async task broker (Taskiq)                                        |
| MinIO         | Object storage for uploads and snapshots                          |
| Langfuse      | LLM trace and generation event storage                            |
| Loki + Alloy  | Centralized log collection and querying                           |
| Grafana       | Dashboard and visualization                                       |
| Docker Engine | Container orchestration for runtimes                              |

## Calling Paths

1. **Admin operations** — `Browser → Frontend → Backend → Docker / Settings / Proxy targets`
2. **Application inference** — `App/SDK → Gateway → local runtime or remote provider → response`
3. **Chat completions (console)** — `Browser → Frontend → Backend (cookie→JWT proxy) → Gateway /v1/chat/completions → provider → SSE response`
4. **RAG query** — `Frontend → Backend /api/admin/rag/* → RAG /api/internal/knowledge/search`
5. **RAG publish** — `Upload → MinIO → RabbitMQ → Worker → Docling extract → chunk → embed → pgvector index`
6. **PII screening** — `Gateway (pre-forward middleware) → PII /analyze → redact/flag → continue or reject`
7. **SSO authentication** — `Browser → Auth /login/\<provider\> → IdP → Auth /callback → signed JWT → Backend (set cookie)`
8. **Notification delivery** — `Backend (outbox write) → dispatcher → Mailer /send → SMTP provider`
9. **Document processing** — `File upload → Docling /convert → IBM Docling pipeline → structured text → caller (RAG worker / gateway)`
10. **Observability** — `Backend + Gateway + RAG → Loki / Langfuse → Grafana dashboards`

For detailed sequence diagrams of each flow, see [Call Sequences](/docs/call-sequences).
