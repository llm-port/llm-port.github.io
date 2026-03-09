---
sidebar_position: 4
---

# 模块

**llm.Port** 采用模块化架构——可选功能无需更改核心平台即可启用或禁用。模块作为独立的 Docker Compose 服务实现，拥有各自的数据库和 API。

## 可用模块

| 模块        | 描述                               | 默认状态 |
| ----------- | ---------------------------------- | -------- |
| **rag**     | 检索增强生成 — 文档摄入、向量搜索  | 启用     |
| **pii**     | PII 检测与脱敏（Presidio + spaCy） | 启用     |
| **auth**    | 外部身份验证提供商（SSO / OIDC）   | 禁用     |
| **mailer**  | 邮件通知与告警                     | 禁用     |
| **docling** | 高级文档解析与转换（IBM Docling）  | 禁用     |

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

![Modules](/img/screenshots/modules.png)
