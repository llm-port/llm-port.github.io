---
sidebar_position: 1
slug: /intro
---

# Getting Started

**llm.Port** is a self-hosted all-in-one LLM platform that combines an OpenAI-compatible gateway, a built-in chat console with sessions and memory, a control-plane for model servers, an internal RAG subsystem, PII detection, and notification delivery — all behind a single operations console.

## Who is this for?

- **Platform / MLOps teams** who need a governed, self-hosted gateway in front of local and remote LLMs
- **Security-conscious organizations** that require on-prem inference with full audit logging and PII controls
- **Developers** who want an OpenAI-compatible API without vendor lock-in

## Quick Start

### Prerequisites

- Docker Engine 24+ with Compose V2
- Python 3.12+ (or [uv](https://docs.astral.sh/uv/))
- 8 GB RAM (16 GB recommended for local model runtimes)
- GPU (optional) — NVIDIA, AMD, or Intel for local inference

### 1. Install the CLI

```bash
pip install llmport-cli
```

Or download a standalone executable (no Python required) from the
[GitHub Releases page](https://github.com/llm-port/llm-port-cli/releases/latest).

### 2. Run the health check

```bash
llmport doctor
```

This validates Docker, Compose, GPU drivers, RAM, disk, and port availability.

### 3. Start shared services

```bash
llmport up
```

This brings up PostgreSQL, Redis, Grafana, Loki, and other infrastructure.

### 4. Run the init wizard

The backend includes a guided setup wizard that configures secrets, providers, and gateway settings on first run.

### 5. Add providers and runtimes

- **Remote providers**: OpenAI, Azure OpenAI, or any OpenAI-compatible API
- **Local runtimes**: vLLM, llama.cpp, Ollama, TGI — with automatic GPU detection

### 6. Point your apps at the gateway

```bash
curl http://localhost:4000/v1/chat/completions \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "my-alias",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

The gateway is fully OpenAI-compatible — any SDK or tool that speaks the OpenAI API works out of the box.

## Developer Setup

For contributing or running from source:

```bash
# Check and install dev prerequisites
llmport dev doctor --install

# Bootstrap a full development workspace
llmport dev init ~/projects/llm-port

# Launch backend + worker + frontend
llmport dev up
```

See [Contributing](/docs/contributing) for details.

## What's next?

- [Architecture](/docs/architecture) — how the platform is structured
- [Features](/docs/features/gateway) — detailed feature documentation
- [Modules](/docs/modules) — enable/disable optional capabilities
- [Repositories](/docs/repos) — the full codebase layout
- [Contributing](/docs/contributing) — development setup and guidelines
