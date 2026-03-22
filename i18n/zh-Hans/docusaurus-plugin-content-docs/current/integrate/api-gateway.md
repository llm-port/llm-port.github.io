---
sidebar_position: 1
title: API Gateway
---

# API Gateway

The llm.port Gateway provides an OpenAI-compatible interface for chat and embedding workloads.

## Supported endpoint patterns

- `GET /v1/models`
- `POST /v1/chat/completions`
- `POST /v1/embeddings`

## Integration model

1. Point your SDK or app to the Gateway base URL
2. Authenticate with your API token
3. Send requests using model aliases
4. Monitor usage and policy outcomes in the admin console

## Why model aliases matter

Aliases let you decouple application code from provider-specific model names, so you can change providers or runtime placement without app changes.

## Streaming support

The Gateway supports SSE streaming for low-latency response delivery.

## Production guidance

- Use per-environment API tokens
- Enforce least-privilege access
- Validate model and policy configuration before rollout

## Example request

```bash
curl http://localhost:4000/v1/chat/completions \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "assistant-default",
    "messages": [{"role": "user", "content": "Summarize this ticket"}],
    "stream": false
  }'
```
