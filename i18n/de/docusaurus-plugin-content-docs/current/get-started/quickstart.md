---
sidebar_position: 1
title: Quickstart
---

# Quickstart

This guide helps you get llm.port running quickly and validate your first request.

## Prerequisites

- Docker Engine 24+ with Compose V2
- 8 GB RAM minimum (16 GB recommended)
- Python 3.12+ (if using pip-based CLI install)

## 1) Install the CLI

```bash
pip install llmport-cli
```

You can also use the standalone binary if you prefer not to install Python tooling.

## 2) Validate your host

```bash
llmport doctor
```

## 3) Start the platform

```bash
llmport up
```

## 4) Complete initial setup

Use the admin console setup flow to configure your first provider and access policy.

## 5) Send a test request

```bash
curl http://localhost:4000/v1/chat/completions \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<model-alias>",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

## What to do next

- Configure providers and model aliases
- Enable required modules (for example PII or RAG)
- Review [Security Overview](../features/security-overview.md)
