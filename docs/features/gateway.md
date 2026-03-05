---
sidebar_position: 1
---

# Gateway & Routing

The **llm.Port gateway** (`llm_port_api`) provides a single OpenAI-compatible API endpoint that routes requests to local runtimes and remote providers.

## OpenAI-Compatible API

The gateway exposes standard OpenAI endpoints:

| Endpoint                    | Description                                    |
| --------------------------- | ---------------------------------------------- |
| `GET /v1/models`            | List available models                          |
| `POST /v1/chat/completions` | Chat completions (streaming and non-streaming) |
| `POST /v1/embeddings`       | Generate embeddings                            |

Any SDK or tool that speaks the OpenAI API works out of the box — no code changes required.

## Provider Routing

Requests are routed through an **alias-based model resolution** system:

1. The client requests a model by alias (e.g., `my-gpt4`)
2. The gateway resolves the alias to one or more provider instances
3. The request is forwarded to the selected provider

Supported providers:

| Provider                            | Type            | Protocol          |
| ----------------------------------- | --------------- | ----------------- |
| **vLLM**                            | Local runtime   | OpenAI-compatible |
| **llama.cpp**                       | Local runtime   | OpenAI-compatible |
| **Ollama**                          | Local runtime   | OpenAI-compatible |
| **TGI** (Text Generation Inference) | Local runtime   | OpenAI-compatible |
| **OpenAI**                          | Remote provider | Official API      |
| **Azure OpenAI**                    | Remote provider | Azure API         |
| _Any OpenAI-compatible API_         | Either          | OpenAI-compatible |

## Streaming

The gateway supports **SSE (Server-Sent Events) streaming** with:

- Full passthrough of upstream `chat.completion.chunk` events
- **Time-to-First-Token (TTFT)** extraction for latency monitoring
- Configurable idle timeout handling
- Proper `data: [DONE]` termination

## Proxy & Retry

- Upstream HTTP proxy support with configurable timeout
- Automatic **pre-first-token retry** on upstream failures
- Error responses follow the OpenAI error envelope format

## Rate Limiting

- **Fixed-window** RPM (requests per minute) and TPM (tokens per minute) per tenant
- Redis-based counters with atomic Lua scripts
- Configurable limits per tenant policy

## Concurrency Control

- Distributed **per-instance leasing** via Redis + Lua scripts
- Prevents overloading individual provider instances
- Leases are automatically released on request completion (including errors)
