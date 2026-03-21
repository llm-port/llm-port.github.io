---
sidebar_position: 9
---

# MCP 工具

**llm.Port** 包含一个受治理的 **Model Context Protocol (MCP)** 工具中心，让网关在聊天补全期间调用外部工具——每次调用都内置 PII 保护。

## 架构

```
网关 ──► MCP Hub ──► Privacy Proxy (PII) ──► MCP 服务器 ──► 工具结果
              │
              ├── mcp_server_brave    (Brave Search)
              ├── mcp_server_searxng  (SearXNG — 自托管)
              └── mcp_server_webscrape (Web Scrape — Trafilatura)
```

**MCP Hub**（`llm_port_mcp`）是中央代理：

- 注册 MCP 兼容的工具服务器（stdio、SSE 和 Streamable HTTP 传输）
- 自动发现工具并转换为 **OpenAI 兼容的工具定义**
- 所有工具调用通过 **Privacy Proxy** 进行 PII 检测和脱敏
- 使用 Fernet 加密静态服务器凭据

## 内置 MCP 服务器

### Brave Search

通过 Brave Search API 进行网页和本地搜索。

| 工具                  | 描述                          |
| --------------------- | ----------------------------- |
| `brave.web_search`    | 通过 Brave Search API 网页搜索 |
| `brave.local_search`  | 通过 Brave 本地/地图搜索      |

需要 `BRAVE_API_KEY`。通过 `RATE_LIMIT_RPS` 进行速率限制。

### SearXNG（自托管）

隐私友好的元搜索引擎——无需外部 API 密钥。

| 工具                    | 描述                  |
| ----------------------- | --------------------- |
| `searxng.web_search`    | 通过 SearXNG 网页搜索 |
| `searxng.news_search`   | 通过 SearXNG 新闻搜索 |
| `searxng.images_search` | 通过 SearXNG 图片搜索 |

通过 `supervisord` 在单个容器中运行 SearXNG 和 MCP 服务器。

### Web Scrape

使用 Trafilatura 从网页中提取主要内容——去除样板以获得紧凑的 LLM 上下文。

| 工具                    | 描述                              |
| ----------------------- | --------------------------------- |
| `webscrape.scrape_url`  | 从 Web URL 获取并提取内容          |

可配置输出字符上限（`DEFAULT_MAX_OUTPUT_CHARS`）。

## Privacy Proxy

每次 MCP 工具调用都通过 Privacy Proxy：

1. 在发送到外部工具之前扫描**工具输入**中的 PII
2. 在返回网关之前扫描**工具输出**中的 PII
3. 应用与主 PII 模块相同的基于 Presidio 的策略

确保敏感数据永远不会泄露到第三方工具服务器。

## 注册自定义 MCP 服务器

```bash
# 通过管理 API
POST /api/admin/mcp/servers
{
  "name": "我的服务器",
  "transport": "sse",
  "url": "http://my-server:8080/sse",
  "tool_prefix": "custom"
}
```

Hub 将自动发现服务器暴露的所有工具，并将其作为 OpenAI 兼容的工具定义提供。

## CLI 管理

```bash
llmport module enable mcp       # 启用 MCP 模块
llmport module disable mcp      # 禁用 MCP 模块
```
