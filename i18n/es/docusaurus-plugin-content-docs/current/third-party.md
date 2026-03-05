---
sidebar_position: 8
---

# Avisos de Terceros

Esta página lista el software clave de terceros que **llm.Port** despliega, integra o del que depende — tanto imágenes Docker como dependencias a nivel de biblioteca incluidas en las imágenes de servicios.

Cada componente de terceros está licenciado por sus respectivos autores bajo sus propios términos de licencia. llm.port no reemplaza ni modifica esas licencias.

:::tip
Por razones de cumplimiento y reproducibilidad, se recomienda fijar las imágenes Docker a versiones exactas y/o digests en lugar de usar etiquetas flotantes como `:latest`.
:::

## Stack Core (Imágenes Docker)

### PostgreSQL

- Imágenes: `postgres:18.1-bookworm`, `postgres:16.3-bullseye`
- Licencia: **PostgreSQL License** (permisiva)

### PostgreSQL + pgvector

- Imagen: `pgvector/pgvector:pg17`
- Licencia: **PostgreSQL License** (permisiva)

### Redis

- Imágenes: `redis:7`, `bitnami/redis:6.2.5`
- Licencia: Redis ≤ 7.2 es **BSD-3-Clause**; Redis 7.4+ tiene doble licencia **RSALv2 / SSPLv1**; Redis 8.0+ añade **AGPLv3**
- Nota: `bitnami/redis:6.2.5` incluye Redis 6.2 que es BSD-3-Clause

### ClickHouse

- Imagen: `clickhouse/clickhouse-server:latest`
- Licencia: **Apache 2.0**

### MinIO

- Imagen: `cgr.dev/chainguard/minio:latest`
- Licencia: Doble licencia **GNU AGPLv3** y comercial

### RabbitMQ

- Imágenes: `rabbitmq:4.2.1-management-alpine`, `rabbitmq:3.9.16-alpine`
- Licencia: **MPL 2.0**

## Observabilidad (Imágenes Docker)

| Componente     | Imagen                                        | Licencia                    |
| -------------- | --------------------------------------------- | --------------------------- |
| Grafana        | `grafana/grafana:11.5.2`                      | AGPLv3                      |
| Loki           | `grafana/loki:3.0.0`                          | AGPLv3                      |
| Alloy          | `grafana/alloy:latest`                        | Apache 2.0                  |
| OTel LGTM      | `grafana/otel-lgtm`                           | Apache 2.0 + AGPLv3 (mixto) |
| OTel Collector | `otel/opentelemetry-collector-contrib:0.53.0` | Apache 2.0                  |
| Jaeger         | `jaegertracing/all-in-one:1.35`               | Apache 2.0                  |

## Langfuse

- Imágenes: `langfuse/langfuse:3`, `langfuse/langfuse-worker:3`
- Licencia: **MIT** (core), Enterprise Edition bajo licencia separada
- Nota: Las funciones core están disponibles en OSS; algunas funciones enterprise requieren una clave de licencia

## Docling (Opcional)

- Imágenes: `ds4sd/docling-serve:latest`
- Licencia: **MIT**
- Nota: Verificar las licencias de modelos usados junto con Docling

## Dependencias Python

### PII / NLP

| Biblioteca          | Licencia | Servicio     |
| ------------------- | -------- | ------------ |
| presidio-analyzer   | MIT      | llm_port_pii |
| presidio-anonymizer | MIT      | llm_port_pii |
| spaCy               | MIT      | llm_port_pii |

### Ecosistema LLM

| Biblioteca      | Licencia   | Servicio         |
| --------------- | ---------- | ---------------- |
| langfuse (SDK)  | MIT        | llm_port_api     |
| huggingface-hub | Apache 2.0 | llm_port_backend |

### Procesamiento de Documentos

| Biblioteca  | Licencia | Servicio         |
| ----------- | -------- | ---------------- |
| docling     | MIT      | llm_port_docling |
| pdfplumber  | MIT      | llm_port_backend |
| python-docx | MIT      | llm_port_backend |
| python-pptx | MIT      | llm_port_backend |
| openpyxl    | MIT      | llm_port_backend |

### Frameworks Core

| Biblioteca   | Licencia         |
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

### Contenedores & Hardware

| Biblioteca | Licencia   |
| ---------- | ---------- |
| aiodocker  | Apache 2.0 |
| pynvml     | BSD        |
| psutil     | BSD        |

### Observabilidad (Python)

| Biblioteca                          | Licencia   |
| ----------------------------------- | ---------- |
| opentelemetry-sdk / api / exporters | Apache 2.0 |
| prometheus-client                   | Apache 2.0 |
| loguru                              | MIT        |
| sentry-sdk                          | MIT        |

### Autenticación

| Biblioteca    | Licencia |
| ------------- | -------- |
| fastapi-users | MIT      |
| httpx-oauth   | MIT      |
| PyJWT         | MIT      |

### CLI

| Biblioteca | Licencia |
| ---------- | -------- |
| Click      | BSD      |
| Rich       | MIT      |
| Textual    | MIT      |
| InquirerPy | MIT      |

## Dependencias Frontend (npm)

| Biblioteca           | Licencia |
| -------------------- | -------- |
| React / React DOM    | MIT      |
| React Router         | MIT      |
| MUI (Material UI)    | MIT      |
| Emotion              | MIT      |
| TanStack React Table | MIT      |
| React Flow           | MIT      |
| dnd-kit              | MIT      |
| i18next              | MIT      |
| Tailwind CSS         | MIT      |

---

:::note
No quedan dependencias de **biblioteca Python o npm** no permisivas (AGPL / GPL / SSPL) en la base de código. Todos los componentes AGPL/SSPL son imágenes Docker que pueden reemplazarse.
:::

Para los textos completos de las licencias, consulta el archivo LICENSE oficial de cada componente.
