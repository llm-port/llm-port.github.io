---
sidebar_position: 6
---

# Ops Console

The **ops console** in the admin frontend provides full container and infrastructure management.

## Container Management

- **Lifecycle controls**: start, stop, restart, pause, unpause, remove
- **Exec**: run commands inside containers from the admin UI
- **Log streaming**: real-time container logs with follow mode
- **Health checks**: container health status with automatic monitoring

## Image Management

- **Pull with SSE progress**: image pulls with real-time progress streaming
- **List and inspect**: view all images with size, tags, and creation date
- **Prune**: remove unused images to reclaim disk space

## Compose Stack Management

- **Deploy / Update**: apply Compose configurations with validation
- **Rollback**: revert to previous revisions with diff view
- **Revision tracking**: every deploy creates a numbered revision with audit trail
- **Diff view**: compare configurations between revisions

## Container Classification

Containers are categorized for management and policy:

| Class         | Description                 | Examples                   |
| ------------- | --------------------------- | -------------------------- |
| `SYSTEM_CORE` | Essential platform services | Backend, Gateway, Frontend |
| `SYSTEM_AUX`  | Supporting infrastructure   | Grafana, Loki, Langfuse    |
| `LLM_ENGINE`  | Model runtimes              | vLLM, Ollama, llama.cpp    |
| `TENANT_APP`  | User applications           | Custom containers          |

Each class can have its own management policies (restart policy, resource limits, etc.).

## Network Visibility

- Docker network inspection
- System vs. user network classification
- Container-to-network mapping

![Container Management](/img/screenshots/containers.png)
