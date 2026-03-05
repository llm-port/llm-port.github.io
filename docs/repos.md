---
sidebar_position: 5
---

# Repositories

The **llm.Port** platform is organized as a multi-repo codebase. Each service has its own repository.

## Core Repositories (Apache 2.0)

| Repository                                                           | Description                                                              | Stack                                 |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------- |
| [`llm-port-frontend`](https://github.com/llm-port/llm-port-frontend) | React admin console UI                                                   | Vite + React Router + MUI + Tailwind  |
| [`llm-port-backend`](https://github.com/llm-port/llm-port-backend)   | FastAPI control-plane: users, RBAC, LLM management, Docker orchestration | Python + FastAPI + SQLAlchemy         |
| [`llm-port-api`](https://github.com/llm-port/llm-port-api)           | OpenAI-compatible `/v1/*` gateway                                        | Python + FastAPI                      |
| [`llm-port-rag`](https://github.com/llm-port/llm-port-rag)           | RAG subsystem: ingestion, knowledge search, collector plugins            | Python + FastAPI + pgvector           |
| [`llm-port-pii`](https://github.com/llm-port/llm-port-pii)           | PII detection and redaction service                                      | Python + FastAPI + Presidio           |
| [`llm-port-cli`](https://github.com/llm-port/llm-port-cli)           | CLI installer and management tool                                        | Python + Click + Textual              |
| [`llm-port-shared`](https://github.com/llm-port/llm-port-shared)     | Docker Compose stack for shared services                                 | Postgres, Redis, Grafana, Loki, Alloy |
| [`llm-port-dev`](https://github.com/llm-port/llm-port-dev)           | Project docs, feature specs, dev scripts                                 | Markdown                              |

## Module Repositories

| Repository                                                         | Module    | Description                                 |
| ------------------------------------------------------------------ | --------- | ------------------------------------------- |
| [`llm-port-auth`](https://github.com/llm-port/llm-port-auth)       | `auth`    | SSO / OIDC / OAuth2 provider                |
| [`llm-port-mailer`](https://github.com/llm-port/llm-port-mailer)   | `mailer`  | Email notifications and alerts              |
| [`llm-port-docling`](https://github.com/llm-port/llm-port-docling) | `docling` | Document parsing & conversion (IBM Docling) |

## Organization

| Item                | Value                                     |
| ------------------- | ----------------------------------------- |
| GitHub org          | [`llm-port`](https://github.com/llm-port) |
| License             | Apache 2.0                                |
| Language (backend)  | Python 3.12+                              |
| Language (frontend) | TypeScript                                |
| Database            | PostgreSQL 17+ (with pgvector for RAG)    |
| Container runtime   | Docker Engine 24+ with Compose V2         |

:::note
Some repositories may be private while the project is being finalized and cleaned up for public release.
:::
