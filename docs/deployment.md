---
sidebar_position: 6
---

# Deployment

Guide for deploying **llm.Port** in production.

## Prerequisites

| Requirement    | Minimum       | Recommended          |
| -------------- | ------------- | -------------------- |
| Docker Engine  | 24+           | Latest stable        |
| Docker Compose | V2            | Latest stable        |
| RAM            | 8 GB          | 16 GB+               |
| Disk           | 20 GB         | 50 GB+               |
| GPU (optional) | Any supported | NVIDIA with CUDA 12+ |

## Quick Deploy

### 1. Install the CLI

```bash
pip install llmport-cli
```

### 2. Run the health check

```bash
llmport doctor
```

### 3. Generate environment files

```bash
llmport config env --mode production
```

This generates `.env` files with:

- Random JWT and Fernet keys
- Database passwords
- Service URLs and ports
- Module configuration

### 4. Start the platform

```bash
llmport up
```

This launches:

- PostgreSQL (backend + gateway + RAG)
- Redis (rate limiting, caching)
- RabbitMQ (async task broker)
- MinIO (object storage)
- Grafana + Loki + Alloy (observability)
- Backend, Gateway, and Frontend services

### 5. Run the init wizard

Open the admin console at `http://localhost:3000` and complete the setup wizard.

## Module Profiles

Enable optional modules at deploy time:

```bash
llmport module enable rag     # RAG pipeline
llmport module enable pii     # PII detection
llmport module enable auth    # SSO / OIDC
llmport module enable mailer  # Email notifications
llmport module enable docling # Document processing
llmport module enable sessions # Chat sessions & memory
```
![Settings](/img/screenshots/settings.png)
## Docker Compose

The platform uses Docker Compose profiles for modular deployment:

```bash
# Core only
docker compose up -d

# Core + RAG + PII
docker compose --profile rag --profile pii up -d

# Everything
docker compose --profile rag --profile pii --profile auth --profile mailer --profile docling up -d
```

## Configuration

### Environment Variables

Key configuration is managed through environment variables:

| Variable                | Description                  | Default                  |
| ----------------------- | ---------------------------- | ------------------------ |
| `LLM_PORT_JWT_SECRET`   | JWT signing key              | Generated                |
| `LLM_PORT_FERNET_KEY`   | Database encryption key      | Generated                |
| `LLM_PORT_DB_URL`       | PostgreSQL connection string | `postgresql://...`       |
| `LLM_PORT_REDIS_URL`    | Redis connection string      | `redis://localhost:6379` |
| `LLM_PORT_GATEWAY_PORT` | Gateway listen port          | `4000`                   |
| `LLM_PORT_BACKEND_PORT` | Backend listen port          | `8000`                   |

### System Settings

Runtime-configurable settings are stored in the database and managed through the admin console or API. Changes can trigger:

- **Live reload** — applied immediately without restart
- **Service restart** — affected service is restarted
- **Stack recreate** — Docker Compose services are recreated

## GPU Configuration

The CLI auto-detects GPU hardware during setup:

```bash
llmport doctor
# Output includes:
# ✅ NVIDIA GPU detected (CUDA 12.4, CC 8.9)
# ✅ Docker GPU runtime available
```

For manual GPU configuration, see the [LLM Runtime Management](/docs/features/runtimes) docs.
