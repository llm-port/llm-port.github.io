---
sidebar_position: 8
---

# Third-Party Notices

This page lists key third-party software that **llm.Port** deploys, integrates, or depends on — both Docker images and library-level dependencies bundled into service images.

Each third-party component is licensed by its respective authors under its own license terms. llm.Port does not replace or modify those licenses.

:::tip
For compliance and reproducibility, prefer pinning Docker images to exact versions and/or digests instead of floating tags like `:latest`.
:::

## Core Stack (Docker Images)

### PostgreSQL

- Images: `postgres:18.1-bookworm`, `postgres:16.3-bullseye`
- License: **PostgreSQL License** (permissive)

### PostgreSQL + pgvector

- Image: `pgvector/pgvector:pg17`
- License: **PostgreSQL License** (permissive)

### Redis

- Images: `redis:7`, `bitnami/redis:6.2.5`
- License: Redis ≤ 7.2 is **BSD-3-Clause**; Redis 7.4+ is dual-licensed **RSALv2 / SSPLv1**; Redis 8.0+ adds **AGPLv3**
- Note: `bitnami/redis:6.2.5` packages Redis 6.2 which is BSD-3-Clause

### ClickHouse

- Image: `clickhouse/clickhouse-server:latest`
- License: **Apache 2.0**

### MinIO

- Image: `cgr.dev/chainguard/minio:latest`
- License: Dual-licensed **GNU AGPLv3** and commercial

### RabbitMQ

- Images: `rabbitmq:4.2.1-management-alpine`, `rabbitmq:3.9.16-alpine`
- License: **MPL 2.0**

## Observability (Docker Images)

| Component      | Image                                         | License                     |
| -------------- | --------------------------------------------- | --------------------------- |
| Grafana        | `grafana/grafana:11.5.2`                      | AGPLv3                      |
| Loki           | `grafana/loki:3.0.0`                          | AGPLv3                      |
| Alloy          | `grafana/alloy:latest`                        | Apache 2.0                  |
| OTel LGTM      | `grafana/otel-lgtm`                           | Apache 2.0 + AGPLv3 (mixed) |
| OTel Collector | `otel/opentelemetry-collector-contrib:0.53.0` | Apache 2.0                  |
| Jaeger         | `jaegertracing/all-in-one:1.35`               | Apache 2.0                  |

## Langfuse

- Images: `langfuse/langfuse:3`, `langfuse/langfuse-worker:3`
- License: **MIT** (core), Enterprise Edition under separate license
- Note: Core features are available in OSS; some enterprise features require a license key

## Docling (Optional)

- Images: `ds4sd/docling-serve:latest`
- License: **MIT**
- Note: Check model licenses for any models used alongside Docling

## Python Dependencies

### PII / NLP

| Library             | License | Service      |
| ------------------- | ------- | ------------ |
| presidio-analyzer   | MIT     | llm_port_pii |
| presidio-anonymizer | MIT     | llm_port_pii |
| spaCy               | MIT     | llm_port_pii |

### LLM Ecosystem

| Library         | License    | Service          |
| --------------- | ---------- | ---------------- |
| langfuse (SDK)  | MIT        | llm_port_api     |
| huggingface-hub | Apache 2.0 | llm_port_backend |

### Document Processing

| Library     | License | Service          |
| ----------- | ------- | ---------------- |
| docling     | MIT     | llm_port_docling |
| pdfplumber  | MIT     | llm_port_backend |
| python-docx | MIT     | llm_port_backend |
| python-pptx | MIT     | llm_port_backend |
| openpyxl    | MIT     | llm_port_backend |

### Core Frameworks

| Library      | License          |
| ------------ | ---------------- |
| FastAPI      | MIT              |
| Uvicorn      | BSD              |
| Pydantic     | MIT              |
| SQLAlchemy   | MIT              |
| asyncpg      | Apache 2.0       |
| Alembic      | MIT              |
| httpx        | BSD              |
| TaskIQ       | MIT              |
| aio-pika     | Apache 2.0       |
| cryptography | Apache 2.0 / BSD |

### Container & Hardware

| Library   | License    |
| --------- | ---------- |
| aiodocker | Apache 2.0 |
| pynvml    | BSD        |
| psutil    | BSD        |

### Observability (Python)

| Library                             | License    |
| ----------------------------------- | ---------- |
| opentelemetry-sdk / api / exporters | Apache 2.0 |
| prometheus-client                   | Apache 2.0 |
| loguru                              | MIT        |
| sentry-sdk                          | MIT        |

### Authentication

| Library       | License |
| ------------- | ------- |
| fastapi-users | MIT     |
| httpx-oauth   | MIT     |
| PyJWT         | MIT     |

### CLI

| Library    | License |
| ---------- | ------- |
| Click      | BSD     |
| Rich       | MIT     |
| Textual    | MIT     |
| InquirerPy | MIT     |

## Frontend (npm) Dependencies

| Library              | License |
| -------------------- | ------- |
| React / React DOM    | MIT     |
| React Router         | MIT     |
| MUI (Material UI)    | MIT     |
| Emotion              | MIT     |
| TanStack React Table | MIT     |
| React Flow           | MIT     |
| dnd-kit              | MIT     |
| i18next              | MIT     |
| Tailwind CSS         | MIT     |

---

:::note
No non-permissive (AGPL / GPL / SSPL) **Python or npm library** dependencies remain in the codebase. All AGPL/SSPL components are Docker images that can be swapped out.
:::

For full license texts, see each component's official LICENSE file.
