---
sidebar_position: 4
---

# 模块

**llm.Port** 采用模块化架构——可选功能无需更改核心平台即可启用或禁用。模块作为独立的 Docker Compose 服务实现，拥有各自的数据库和 API。

## 可用模块

### 核心模块（Apache 2.0）

| 模块           | 描述                                          | 默认状态 |
| -------------- | --------------------------------------------- | -------- |
| **pii**        | PII 检测与脱敏（Presidio + spaCy）            | 启用     |
| **sessions**   | 聊天会话、记忆事实和文件附件                   | 启用     |
| **mcp**        | MCP 工具注册中心和受治理的工具调用代理         | 启用     |
| **skills**     | 集中式技能注册中心，用于推理 Playbooks          | 启用     |
| **node-agent** | 远程节点集群的主机端执行代理                   | 禁用     |

### 企业版模块（EE 许可证）

| 模块        | 描述                                  | 默认状态 |
| ----------- | ------------------------------------- | -------- |
| **rag**     | RAG Pro — 文档摄入、向量搜索、采集器插件 | 禁用     |
| **auth**    | 外部身份验证提供商（SSO / OIDC）       | 禁用     |
| **mailer**  | 邮件通知与告警                         | 禁用     |
| **docling** | 高级文档解析与转换（IBM Docling）      | 禁用     |

:::note
核心后端包含 **RAG Lite**（内嵌的基于 pgvector 的检索）和**轻量级文档解析器**作为后备方案。基础身份验证通过 FastAPI Users 始终可用。
:::

## 启用 / 禁用

### 通过 CLI

```bash
llmport module list           # 显示所有模块及其状态
llmport module enable rag     # 启用模块
llmport module disable pii    # 禁用模块
```

### 通过 Docker Compose Profiles

每个模块对应一个 Docker Compose profile。启用模块会激活其 profile，从而启动所需的容器。

```yaml
# 示例：RAG 模块容器
services:
  llm-port-rag:
    profiles: ["rag"]
    # ...
  llm-port-rag-worker:
    profiles: ["rag"]
    # ...
```

## 工作原理

### Backend 发现

Backend 提供模块发现端点：

```
GET /v1/services
```

Frontend 调用此端点以发现哪些模块已启用，然后动态显示或隐藏对应的 UI 部分。

### 添加新模块

添加模块只需约 **20 行配置**：

1. 将服务添加到 `docker-compose.yml` 并设置 profile
2. 在服务注册表中注册该模块
3. 添加检查发现端点的 UI 部分

### 模块隔离

每个模块：

- 运行在独立的容器中
- 拥有自己的数据库（如需要）
- 通过内部 API 与 Backend 通信
- 可以独立启动/停止

部分模块（RAG、网关、MCP、Skills）使用独立的数据库模式，其他模块（PII、邮件）为无状态或共享后端数据库。

### 模块同步回调

当模块启用或禁用时，模块注册表会运行**同步回调**进行清理或初始化。例如，禁用 PII 模块会清除缓存的 PII 策略，而启用 Auth 模块会触发提供商发现。

### MCP 工具服务器

**MCP 模块**作为 Model Context Protocol 工具服务器的中央代理。各个 MCP 服务器（Brave Search、SearXNG、Web Scrape 或自定义服务器）向 Hub 注册并暴露工具，网关可在聊天补全期间调用这些工具。所有工具调用都通过 **Privacy Proxy** 进行 PII 检测。

详见 [MCP 工具](/docs/features/mcp)。

### Skills 注册中心

**Skills 模块**管理可重用的推理 Playbook —— 带有 YAML Frontmatter 的 Markdown 文档，决定系统如何推理特定类别的请求。Skills 位于 RAG 上下文、MCP 工具和 Prompt 组合之间。

详见 [Skills](/docs/features/skills)。

### 节点代理

**节点代理**是一个轻量级主机端二进制文件，与后端注册、维持 WebSocket 连接，并在远程节点上执行 Docker 运行时生命周期命令，实现多节点集群部署。

详见[节点代理](/docs/features/node-agent)。

![Modules](/img/screenshots/modules.png)
