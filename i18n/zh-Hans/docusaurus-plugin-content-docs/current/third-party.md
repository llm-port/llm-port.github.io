---
sidebar_position: 8
---

# 第三方声明

本页列出了 **llm.Port** 所部署、集成或依赖的主要第三方软件——包括 Docker 镜像和打包在服务镜像中的库级依赖。

每个第三方组件由其各自的作者根据自己的许可条款授权。llm.port 不替换或修改这些许可。

:::tip
为了合规性和可重现性，建议将 Docker 镜像固定到精确的版本和/或摘要，而不是使用 `:latest` 等浮动标签。
:::

## 核心栈（Docker 镜像）

### PostgreSQL

- 镜像：`postgres:18.1-bookworm`、`postgres:16.3-bullseye`
- 许可证：**PostgreSQL License**（宽松）

### PostgreSQL + pgvector

- 镜像：`pgvector/pgvector:pg17`
- 许可证：**PostgreSQL License**（宽松）

### Redis

- 镜像：`redis:7`、`bitnami/redis:6.2.5`
- 许可证：Redis ≤ 7.2 为 **BSD-3-Clause**；Redis 7.4+ 为双重许可 **RSALv2 / SSPLv1**；Redis 8.0+ 增加 **AGPLv3**
- 注意：`bitnami/redis:6.2.5` 包含 Redis 6.2，采用 BSD-3-Clause

### ClickHouse

- 镜像：`clickhouse/clickhouse-server:latest`
- 许可证：**Apache 2.0**

### MinIO

- 镜像：`cgr.dev/chainguard/minio:latest`
- 许可证：双重许可 **GNU AGPLv3** 和商业版

### RabbitMQ

- 镜像：`rabbitmq:4.2.1-management-alpine`、`rabbitmq:3.9.16-alpine`
- 许可证：**MPL 2.0**

## 可观测性（Docker 镜像）

| 组件           | 镜像                                          | 许可证                      |
| -------------- | --------------------------------------------- | --------------------------- |
| Grafana        | `grafana/grafana:11.5.2`                      | AGPLv3                      |
| Loki           | `grafana/loki:3.0.0`                          | AGPLv3                      |
| Alloy          | `grafana/alloy:latest`                        | Apache 2.0                  |
| OTel LGTM      | `grafana/otel-lgtm`                           | Apache 2.0 + AGPLv3（混合） |
| OTel Collector | `otel/opentelemetry-collector-contrib:0.53.0` | Apache 2.0                  |
| Jaeger         | `jaegertracing/all-in-one:1.35`               | Apache 2.0                  |

## Langfuse

- 镜像：`langfuse/langfuse:3`、`langfuse/langfuse-worker:3`
- 许可证：**MIT**（核心版），企业版采用单独许可
- 注意：核心功能在 OSS 中可用；部分企业功能需要许可密钥

## Docling（可选）

- 镜像：`ds4sd/docling-serve:latest`
- 许可证：**MIT**
- 注意：请检查与 Docling 一起使用的模型许可证

## Python 依赖

### PII / NLP

| 库                  | 许可证 | 服务         |
| ------------------- | ------ | ------------ |
| presidio-analyzer   | MIT    | llm_port_pii |
| presidio-anonymizer | MIT    | llm_port_pii |
| spaCy               | MIT    | llm_port_pii |

### LLM 生态

| 库              | 许可证     | 服务             |
| --------------- | ---------- | ---------------- |
| langfuse (SDK)  | MIT        | llm_port_api     |
| huggingface-hub | Apache 2.0 | llm_port_backend |

### 文档处理

| 库          | 许可证 | 服务             |
| ----------- | ------ | ---------------- |
| docling     | MIT    | llm_port_docling |
| pdfplumber  | MIT    | llm_port_backend |
| python-docx | MIT    | llm_port_backend |
| python-pptx | MIT    | llm_port_backend |
| openpyxl    | MIT    | llm_port_backend |

### 核心框架

| 库           | 许可证           |
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

### 容器 & 硬件

| 库        | 许可证     |
| --------- | ---------- |
| aiodocker | Apache 2.0 |
| pynvml    | BSD        |
| psutil    | BSD        |

### 可观测性（Python）

| 库                                  | 许可证     |
| ----------------------------------- | ---------- |
| opentelemetry-sdk / api / exporters | Apache 2.0 |
| prometheus-client                   | Apache 2.0 |
| loguru                              | MIT        |
| sentry-sdk                          | MIT        |

### 身份验证

| 库            | 许可证 |
| ------------- | ------ |
| fastapi-users | MIT    |
| httpx-oauth   | MIT    |
| PyJWT         | MIT    |

### CLI

| 库         | 许可证 |
| ---------- | ------ |
| Click      | BSD    |
| Rich       | MIT    |
| Textual    | MIT    |
| InquirerPy | MIT    |

## Frontend（npm）依赖

| 库                   | 许可证 |
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
代码库中不再存在非宽松（AGPL / GPL / SSPL）**Python 或 npm 库**依赖。所有 AGPL/SSPL 组件均为 Docker 镜像，可以替换。
:::

完整许可证文本请参见各组件官方 LICENSE 文件。
