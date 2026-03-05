---
sidebar_position: 2
---

# Architecture

This page describes the high-level architecture of **llm.Port** — the planes, services, and data flows that make up the platform.

## Platform Overview

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
        PGMAIN["Postgres (backend + rag metadata)"]
        PGAPI["Postgres (llm_api metadata/audit)"]
        REDIS["Redis (rate limit / leases / cache)"]
        RMQ["RabbitMQ (Taskiq broker)"]
        MINIO["MinIO (raw snapshots/uploads)"]
        LANGFUSE["Langfuse (traces)"]
        LOKI["Loki + Promtail (logs)"]
        GRAF["Grafana (dashboards)"]
        DOCKER["Docker Engine / Compose"]
    end

    U1 --> FE
    FE -->|REST /api/*| BE
    U2 -->|OpenAI API /v1/*| API

    BE -->|Gateway admin/proxy calls| API
    BE -->|Internal RAG proxy /api/internal/*| RAGAPI
    BE -->|Ops actions| DOCKER
    BE --> PGMAIN
    BE --> LANGFUSE
    BE --> LOKI

    API -->|Route chat/embeddings| LOCAL
    API -->|Route chat/embeddings| REMOTE
    API --> PGAPI
    API --> REDIS
    API --> LANGFUSE
    API --> LOKI

    RAGAPI --> PGMAIN
    RAGAPI --> MINIO
    RAGAPI --> RMQ
    RAGW --> RMQ
    RAGW --> PGMAIN
    RAGW --> MINIO
    RAGS --> RMQ
    RAGS --> PGMAIN

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

### RAG Plane

The **RAG subsystem** is an internal service accessed only through the backend. It manages:

- Document ingestion: upload → extract → chunk → embed → index
- Knowledge search: vector, keyword, and hybrid scoring with ACL enforcement
- Virtual containers with draft/publish workflows
- Async processing via Taskiq + RabbitMQ

### Shared Platform Services

Infrastructure containers managed via Docker Compose:

| Service       | Purpose                                                 |
| ------------- | ------------------------------------------------------- |
| PostgreSQL    | Backend metadata, RAG vectors (pgvector), gateway audit |
| Redis         | Rate limiting, concurrency leases, caching              |
| RabbitMQ      | Async task broker (Taskiq)                              |
| MinIO         | Object storage for uploads and snapshots                |
| Langfuse      | LLM trace and generation event storage                  |
| Loki + Alloy  | Centralized log collection and querying                 |
| Grafana       | Dashboard and visualization                             |
| Docker Engine | Container orchestration for runtimes                    |

## Calling Paths

1. **Admin operations** — `Browser → Frontend → Backend → Docker / Settings / Proxy targets`
2. **Application inference** — `App/SDK → Gateway → local runtime or remote provider → response`
3. **RAG query** — `Frontend → Backend /api/admin/rag/* → RAG /api/internal/knowledge/search`
4. **RAG publish** — `Upload → MinIO → RabbitMQ → Worker → extract/chunk/embed/index`
5. **Observability** — `Backend + Gateway + RAG → Loki / Langfuse → Grafana dashboards`

For detailed sequence diagrams of each flow, see [Call Sequences](/docs/call-sequences).
