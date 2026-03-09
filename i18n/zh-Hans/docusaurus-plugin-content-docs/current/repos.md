---
sidebar_position: 5
---

# 代码仓库

**llm.Port** 平台采用多仓库代码组织结构，每个服务都有独立的仓库。

## 核心仓库（Apache 2.0）

| 仓库                                                                 | 描述                                                | 技术栈                                |
| -------------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------- |
| [`llm-port-frontend`](https://github.com/llm-port/llm-port-frontend) | React 管理控制台 UI                                 | Vite + React Router + MUI + Tailwind  |
| [`llm-port-backend`](https://github.com/llm-port/llm-port-backend)   | FastAPI 控制平面：用户、RBAC、LLM 管理、Docker 编排 | Python + FastAPI + SQLAlchemy         |
| [`llm-port-api`](https://github.com/llm-port/llm-port-api)           | OpenAI 兼容的 `/v1/*` 网关，含会话、记忆和附件      | Python + FastAPI                      |
| [`llm-port-rag`](https://github.com/llm-port/llm-port-rag)           | RAG 子系统：摄入、知识搜索、采集器插件              | Python + FastAPI + pgvector           |
| [`llm-port-pii`](https://github.com/llm-port/llm-port-pii)           | PII 检测与脱敏服务                                  | Python + FastAPI + Presidio           |
| [`llm-port-cli`](https://github.com/llm-port/llm-port-cli)           | CLI 安装器与管理工具                                | Python + Click + Textual              |
| [`llm-port-shared`](https://github.com/llm-port/llm-port-shared)     | 共享服务的 Docker Compose 栈                        | Postgres, Redis, Grafana, Loki, Alloy |
| [`llm-port-dev`](https://github.com/llm-port/llm-port-dev)           | 项目文档、功能规格说明、开发脚本                    | Markdown                              |

## 模块仓库

| 仓库                                                               | 模块      | 描述                          |
| ------------------------------------------------------------------ | --------- | ----------------------------- |
| [`llm-port-auth`](https://github.com/llm-port/llm-port-auth)       | `auth`    | SSO / OIDC / OAuth2 提供商    |
| [`llm-port-mailer`](https://github.com/llm-port/llm-port-mailer)   | `mailer`  | 邮件通知与告警                |
| [`llm-port-docling`](https://github.com/llm-port/llm-port-docling) | `docling` | 文档解析与转换（IBM Docling） |

## 组织信息

| 项目             | 值                                        |
| ---------------- | ----------------------------------------- |
| GitHub 组织      | [`llm-port`](https://github.com/llm-port) |
| 许可证           | Apache 2.0                                |
| 语言（Backend）  | Python 3.12+                              |
| 语言（Frontend） | TypeScript                                |
| 数据库           | PostgreSQL 17+（RAG 使用 pgvector）       |
| 容器运行时       | Docker Engine 24+ with Compose V2         |

:::note
部分仓库在项目完成公开发布准备期间可能处于私有状态。
:::
