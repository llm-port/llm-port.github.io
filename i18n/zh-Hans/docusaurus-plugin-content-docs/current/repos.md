---
sidebar_position: 5
---

# 代码仓库

**llm.Port** 平台采用多仓库代码组织结构，每个服务都有独立的仓库。

## 核心仓库（Apache 2.0）

| 仓库                                                                     | 描述                                                | 技术栈                                |
| ------------------------------------------------------------------------ | --------------------------------------------------- | ------------------------------------- |
| [`llm-port-frontend`](https://github.com/llm-port/llm-port-frontend)     | React 管理控制台 UI                                 | Vite + React Router + MUI + Tailwind  |
| [`llm-port-backend`](https://github.com/llm-port/llm-port-backend)       | FastAPI 控制平面：用户、RBAC、LLM 管理、Docker 编排 | Python + FastAPI + SQLAlchemy         |
| [`llm-port-api`](https://github.com/llm-port/llm-port-api)               | OpenAI 兼容的 `/v1/*` 网关，含会话、记忆和附件      | Python + FastAPI                      |
| [`llm-port-pii`](https://github.com/llm-port/llm-port-pii)               | PII 检测与脱敏服务                                  | Python + FastAPI + Presidio           |
| [`llm-port-mcp`](https://github.com/llm-port/llm-port-mcp)               | MCP 工具注册中心和受治理的调用代理                  | Python + FastAPI + MCP SDK            |
| [`llm-port-skills`](https://github.com/llm-port/llm-port-skills)         | 集中式技能注册中心，用于推理 Playbooks              | Python + FastAPI + SQLAlchemy         |
| [`llm-port-node-agent`](https://github.com/llm-port/llm-port-node-agent) | 远程节点集群的主机端执行代理                        | Python + httpx + websockets           |
| [`llm-port-cli`](https://github.com/llm-port/llm-port-cli)               | CLI 安装器与管理工具                                | Python + Click + Textual              |
| [`llm-port-shared`](https://github.com/llm-port/llm-port-shared)         | 共享服务的 Docker Compose 栈                        | Postgres, Redis, Grafana, Loki, Alloy |

## MCP 服务器仓库（Apache 2.0）

| 仓库                                                                       | 描述                                              | 技术栈                     |
| -------------------------------------------------------------------------- | ------------------------------------------------- | -------------------------- |
| [`mcp-server-brave`](https://github.com/llm-port/mcp-server-brave)         | 将 Brave Search 作为工具暴露的 MCP 服务器         | Python + FastAPI + MCP SDK |
| [`mcp-server-searxng`](https://github.com/llm-port/mcp-server-searxng)     | 基于自托管 SearXNG 的 MCP 服务器（无需 API 密钥） | Python + FastAPI + MCP SDK |
| [`mcp-server-webscrape`](https://github.com/llm-port/mcp-server-webscrape) | 通过 Trafilatura 提取网页内容的 MCP 服务器        | Python + FastAPI + MCP SDK |

## 企业版仓库（EE 许可证）

| 仓库                                                               | 模块      | 描述                                             |
| ------------------------------------------------------------------ | --------- | ------------------------------------------------ |
| [`llm-port-rag`](https://github.com/llm-port/llm-port-rag)         | `rag`     | RAG Pro — 摄入、知识搜索、采集器插件             |
| [`llm-port-auth`](https://github.com/llm-port/llm-port-auth)       | `auth`    | SSO / OIDC / OAuth2 提供商                       |
| [`llm-port-mailer`](https://github.com/llm-port/llm-port-mailer)   | `mailer`  | 邮件通知与告警                                   |
| [`llm-port-docling`](https://github.com/llm-port/llm-port-docling) | `docling` | 文档解析与转换（IBM Docling）                    |
| [`llm-port-ee`](https://github.com/llm-port/llm-port-ee)           | —         | 共享 EE 库：许可证管理、生命周期钩子、数据库模式 |
| [`llm-port-cli-ee`](https://github.com/llm-port/llm-port-cli-ee)   | —         | 企业版 CLI：GitHub 认证、许可证管理、Pro 模块    |

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
