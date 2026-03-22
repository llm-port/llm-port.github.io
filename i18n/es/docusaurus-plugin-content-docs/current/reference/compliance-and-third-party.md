---
sidebar_position: 2
title: Compliance and Third-Party Notices
---

# Compliance and Third-Party Notices

This page lists key third-party software that llm.port deploys, integrates, or depends on.

Each third-party component remains licensed by its original authors under its own terms.

:::tip
For compliance and reproducibility, pin Docker images to exact versions and/or digests rather than floating tags.
:::

## Core stack (container images)

| Component | Example image(s) | Typical license |
| --- | --- | --- |
| PostgreSQL | `postgres:*` | PostgreSQL License |
| pgvector | `pgvector/pgvector:*` | PostgreSQL License |
| Redis | `redis:*` | BSD-3-Clause / newer dual-licensed variants |
| RabbitMQ | `rabbitmq:*` | MPL 2.0 |
| MinIO | `minio:*` / hardened variants | AGPLv3 + commercial options |

## Observability stack

| Component | Example image(s) | Typical license |
| --- | --- | --- |
| Grafana | `grafana/grafana:*` | AGPLv3 |
| Loki | `grafana/loki:*` | AGPLv3 |
| Alloy | `grafana/alloy:*` | Apache 2.0 |
| OTel Collector | `otel/opentelemetry-collector-contrib:*` | Apache 2.0 |
| Jaeger | `jaegertracing/all-in-one:*` | Apache 2.0 |

## Langfuse

- Typical images: `langfuse/langfuse:*`, `langfuse/langfuse-worker:*`
- Core licensing: MIT for OSS core (enterprise terms can differ)

## Document processing (optional)

- Typical image: `ds4sd/docling-serve:*`
- Typical license: MIT
- Note: model licenses used alongside document tooling may have additional terms

## Python dependency highlights

| Area | Example packages |
| --- | --- |
| API and services | FastAPI, SQLAlchemy, Alembic, httpx |
| Privacy/NLP | presidio-analyzer, presidio-anonymizer, spaCy |
| Observability | opentelemetry-sdk, prometheus-client, sentry-sdk |
| CLI | Click, Rich, Textual |

## Frontend dependency highlights

| Area | Example packages |
| --- | --- |
| UI framework | React, React DOM |
| UI toolkit | MUI, Emotion |
| Routing and state | React Router |
| Table/interaction | TanStack Table, dnd-kit |
| Styling | Tailwind CSS |

## Public compliance commitments

- Maintain attribution and third-party notice accuracy
- Track dependency and license posture as part of release governance
- Keep internal SBOM and legal review workflows current

## Recommended operational controls

- Generate and retain SBOM per release
- Pin image versions and maintain changelogs for upgrades
- Review license posture in security/compliance checkpoints

:::note
This page provides a practical public summary. Internal compliance operations should retain the full component-level and version-level license inventory.
:::
