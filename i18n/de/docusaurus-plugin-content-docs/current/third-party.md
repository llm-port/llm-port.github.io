---
sidebar_position: 8
---

# Drittanbieter-Hinweise

Diese Seite listet wichtige Drittanbieter-Software auf, die **llm.Port** bereitstellt, integriert oder von der es abhängt — sowohl Docker-Images als auch Bibliotheken, die in Service-Images gebündelt sind.

Jede Drittanbieter-Komponente wird von ihren jeweiligen Autoren unter den eigenen Lizenzbedingungen lizenziert. llm.port ersetzt oder ändert diese Lizenzen nicht.

:::tip
Zur Compliance und Reproduzierbarkeit ist es ratsam, Docker-Images an genaue Versionen und/oder Digests zu pinnen, anstatt schwebende Tags wie `:latest` zu verwenden.
:::

## Core-Stack (Docker-Images)

### PostgreSQL

- Images: `postgres:18.1-bookworm`, `postgres:16.3-bullseye`
- Lizenz: **PostgreSQL License** (permissiv)

### PostgreSQL + pgvector

- Image: `pgvector/pgvector:pg17`
- Lizenz: **PostgreSQL License** (permissiv)

### Redis

- Images: `redis:7`, `bitnami/redis:6.2.5`
- Lizenz: Redis ≤ 7.2 ist **BSD-3-Clause**; Redis 7.4+ ist dual-lizenziert **RSALv2 / SSPLv1**; Redis 8.0+ fügt **AGPLv3** hinzu
- Hinweis: `bitnami/redis:6.2.5` enthält Redis 6.2, das BSD-3-Clause ist

### ClickHouse

- Image: `clickhouse/clickhouse-server:latest`
- Lizenz: **Apache 2.0**

### MinIO

- Image: `cgr.dev/chainguard/minio:latest`
- Lizenz: Dual-lizenziert **GNU AGPLv3** und kommerziell

### RabbitMQ

- Images: `rabbitmq:4.2.1-management-alpine`, `rabbitmq:3.9.16-alpine`
- Lizenz: **MPL 2.0**

## Observability (Docker-Images)

| Komponente     | Image                                         | Lizenz                         |
| -------------- | --------------------------------------------- | ------------------------------ |
| Grafana        | `grafana/grafana:11.5.2`                      | AGPLv3                         |
| Loki           | `grafana/loki:3.0.0`                          | AGPLv3                         |
| Alloy          | `grafana/alloy:latest`                        | Apache 2.0                     |
| OTel LGTM      | `grafana/otel-lgtm`                           | Apache 2.0 + AGPLv3 (gemischt) |
| OTel Collector | `otel/opentelemetry-collector-contrib:0.53.0` | Apache 2.0                     |
| Jaeger         | `jaegertracing/all-in-one:1.35`               | Apache 2.0                     |

## Langfuse

- Images: `langfuse/langfuse:3`, `langfuse/langfuse-worker:3`
- Lizenz: **MIT** (Core), Enterprise Edition unter separater Lizenz
- Hinweis: Core-Funktionen sind in OSS verfügbar; einige Enterprise-Funktionen erfordern einen Lizenzschlüssel

## Docling (Optional)

- Images: `ds4sd/docling-serve:latest`
- Lizenz: **MIT**
- Hinweis: Modellizenzen für zusammen mit Docling verwendete Modelle prüfen

## Python-Abhängigkeiten

### PII / NLP

| Bibliothek          | Lizenz | Service      |
| ------------------- | ------ | ------------ |
| presidio-analyzer   | MIT    | llm_port_pii |
| presidio-anonymizer | MIT    | llm_port_pii |
| spaCy               | MIT    | llm_port_pii |

### LLM-Ökosystem

| Bibliothek      | Lizenz     | Service          |
| --------------- | ---------- | ---------------- |
| langfuse (SDK)  | MIT        | llm_port_api     |
| huggingface-hub | Apache 2.0 | llm_port_backend |

### Dokumentenverarbeitung

| Bibliothek  | Lizenz | Service          |
| ----------- | ------ | ---------------- |
| docling     | MIT    | llm_port_docling |
| pdfplumber  | MIT    | llm_port_backend |
| python-docx | MIT    | llm_port_backend |
| python-pptx | MIT    | llm_port_backend |
| openpyxl    | MIT    | llm_port_backend |

### Core-Frameworks

| Bibliothek   | Lizenz           |
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

| Bibliothek | Lizenz     |
| ---------- | ---------- |
| aiodocker  | Apache 2.0 |
| pynvml     | BSD        |
| psutil     | BSD        |

### Observability (Python)

| Bibliothek                          | Lizenz     |
| ----------------------------------- | ---------- |
| opentelemetry-sdk / api / exporters | Apache 2.0 |
| prometheus-client                   | Apache 2.0 |
| loguru                              | MIT        |
| sentry-sdk                          | MIT        |

### Authentifizierung

| Bibliothek    | Lizenz |
| ------------- | ------ |
| fastapi-users | MIT    |
| httpx-oauth   | MIT    |
| PyJWT         | MIT    |

### CLI

| Bibliothek | Lizenz |
| ---------- | ------ |
| Click      | BSD    |
| Rich       | MIT    |
| Textual    | MIT    |
| InquirerPy | MIT    |

## Frontend (npm)-Abhängigkeiten

| Bibliothek           | Lizenz |
| -------------------- | ------ |
| React / React DOM    | MIT    |
| React Router         | MIT    |
| MUI (Material UI)    | MIT    |
| Emotion              | MIT    |
| TanStack React Table | MIT    |
| React Flow           | MIT    |
| dnd-kit              | MIT    |
| i18next              | MIT    |
| Tailwind CSS         | MIT    |

---

:::note
Es verbleiben keine nicht-permissiven (AGPL / GPL / SSPL) **Python- oder npm-Bibliotheks**-Abhängigkeiten in der Codebasis. Alle AGPL/SSPL-Komponenten sind Docker-Images, die ausgetauscht werden können.
:::

Für vollständige Lizenztexte, siehe die offizielle LICENSE-Datei jeder Komponente.
