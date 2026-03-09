---
sidebar_position: 1
---

# Gateway 与路由

**llm.port Gateway**（`llm_port_api`）提供单一 OpenAI 兼容 API 端点，将请求路由到本地运行时和远程提供商。

## OpenAI 兼容 API

Gateway 暴露标准 OpenAI 端点：

| 端点                        | 描述                     |
| --------------------------- | ------------------------ |
| `GET /v1/models`            | 列出可用模型             |
| `POST /v1/chat/completions` | 聊天补全（流式和非流式） |
| `POST /v1/embeddings`       | 生成嵌入向量             |

任何支持 OpenAI API 的 SDK 或工具均可开箱即用，无需修改代码。

## 提供商路由

请求通过**基于别名的模型解析**系统进行路由：

1. 客户端通过别名请求模型（例如 `my-gpt4`）
2. Gateway 将别名解析为一个或多个提供商实例
3. 请求被转发到所选提供商

支持的提供商：

| 提供商                               | 类型       | 协议        |
| ------------------------------------ | ---------- | ----------- |
| **vLLM**                             | 本地运行时 | OpenAI 兼容 |
| **llama.cpp**                        | 本地运行时 | OpenAI 兼容 |
| **Ollama**                           | 本地运行时 | OpenAI 兼容 |
| **TGI**（Text Generation Inference） | 本地运行时 | OpenAI 兼容 |
| **OpenAI**                           | 远程提供商 | 官方 API    |
| **Azure OpenAI**                     | 远程提供商 | Azure API   |
| _任何 OpenAI 兼容 API_               | 均可       | OpenAI 兼容 |

## 流式传输

Gateway 支持 **SSE（Server-Sent Events）流式传输**，具备：

- 完整透传上游 `chat.completion.chunk` 事件
- **首 Token 到达时间（TTFT）**提取，用于延迟监控
- 可配置的空闲超时处理
- 正确的 `data: [DONE]` 终止

## 代理与重试

- 支持带可配置超时的上游 HTTP 代理
- 上游失败时自动**首 Token 前重试**
- 错误响应遵循 OpenAI 错误信封格式

## 限流

- 每个租户固定窗口 RPM（每分钟请求数）和 TPM（每分钟 Token 数）
- 基于 Redis 的原子 Lua 脚本计数器
- 每个租户策略可配置限制

## 并发控制

- 通过 Redis + Lua 脚本实现分布式**每实例租约**
- 防止单个提供商实例过载
- 请求完成时（包括错误）自动释放租约

![Chat Console](/img/screenshots/chat.png)

![API Playground](/img/screenshots/api.png)
