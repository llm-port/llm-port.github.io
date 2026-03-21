---
sidebar_position: 9
---

# MCP Tools

**llm.Port** includes a governed **Model Context Protocol (MCP)** tool hub that lets the gateway invoke external tools during chat completions — with built-in PII protection on every call.

## Architecture

```
Gateway ──► MCP Hub ──► Privacy Proxy (PII) ──► MCP Server ──► Tool Result
                │
                ├── mcp_server_brave    (Brave Search)
                ├── mcp_server_searxng  (SearXNG — self-hosted)
                └── mcp_server_webscrape (Web Scrape — Trafilatura)
```

The **MCP Hub** (`llm_port_mcp`) is the central broker. It:

- Registers MCP-compliant tool servers (stdio, SSE, and Streamable HTTP transports)
- Auto-discovers tools from each server and converts them to **OpenAI-compatible tool definitions**
- Routes all tool invocations through a **Privacy Proxy** for PII detection and redaction
- Encrypts server credentials at rest with Fernet

## Built-in MCP Servers

### Brave Search

Web and local search powered by the Brave Search API.

| Tool                 | Description                     |
| -------------------- | ------------------------------- |
| `brave.web_search`   | Web search via Brave Search API |
| `brave.local_search` | Local/map search via Brave      |

Requires a `BRAVE_API_KEY`. Rate-limited via `RATE_LIMIT_RPS`.

### SearXNG (Self-hosted)

Privacy-friendly meta-search — no external API key required.

| Tool                    | Description              |
| ----------------------- | ------------------------ |
| `searxng.web_search`    | Web search via SearXNG   |
| `searxng.news_search`   | News search via SearXNG  |
| `searxng.images_search` | Image search via SearXNG |

Runs SearXNG and the MCP server in a single container via `supervisord`.

### Web Scrape

Extracts main content from web pages using Trafilatura — strips boilerplate for compact LLM context.

| Tool                   | Description                              |
| ---------------------- | ---------------------------------------- |
| `webscrape.scrape_url` | Fetch and extract content from a web URL |

Configurable output character cap (`DEFAULT_MAX_OUTPUT_CHARS`).

## Privacy Proxy

Every MCP tool invocation passes through the Privacy Proxy, which:

1. Scans **tool inputs** for PII before sending to the external tool
2. Scans **tool outputs** for PII before returning to the gateway
3. Applies the same Presidio-based policies as the main PII module

This ensures that sensitive data never leaks to third-party tool servers.

## Registering a Custom MCP Server

```bash
# Via the admin API
POST /api/admin/mcp/servers
{
  "name": "my-custom-server",
  "transport": "sse",
  "url": "http://my-server:8080/sse",
  "tool_prefix": "custom"
}
```

The hub will auto-discover all tools exposed by the server and make them available as OpenAI-compatible tool definitions.

## CLI Management

```bash
llmport module enable mcp       # Enable the MCP module
llmport module disable mcp      # Disable the MCP module
```
