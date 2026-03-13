---
sidebar_position: 6
---

# Deployment

Guide for deploying **llm.Port** in production and development.

---

## Dev Environment Setup

### Prerequisites

| Requirement    | Version |
| -------------- | ------- |
| Python         | 3.12+   |
| Node.js        | 20+     |
| Docker Engine  | 24+     |
| Docker Compose | V2      |
| Git            | Any     |
| uv             | Latest  |

### Quick Start (4 commands)

```bash
# 1. Install the CLI
pip install llmport-cli          # or: uv tool install llmport-cli
#    Alternatively, download a standalone binary from:
#    https://github.com/llm-port/llm-port-cli/releases/latest

# 2. Check prerequisites
llmport doctor

# 3. Bootstrap the workspace (clones repos, installs deps, starts infra, runs migrations)
llmport dev init ~/projects/llm-port

# 4. Start development servers
llmport dev up
```

That's it. Open **http://localhost:5173** and log in with:

| Field    | Value             |
| -------- | ----------------- |
| Email    | `admin@localhost` |
| Password | `admin`           |

The dev admin user is created automatically when the backend starts.

### Useful Dev Commands

```bash
llmport dev status          # container + process status
llmport dev up              # start backend + worker + frontend
llmport dev down            # stop everything
llmport logs -f             # follow logs
llmport doctor              # check system health
```

### Dev Init Options

```bash
llmport dev init ~/projects/llm-port --ssh               # clone via SSH
llmport dev init ~/projects/llm-port --branch develop     # checkout a branch
llmport dev init ~/projects/llm-port --overwrite          # re-clone repos
llmport dev init ~/projects/llm-port --force-env          # regenerate .env files
llmport dev init ~/projects/llm-port --install-prereqs    # auto-install uv/git/node
llmport dev init ~/projects/llm-port --modules rag,pii    # enable modules
```

---

## Production Deployment

### Prerequisites

| Requirement    | Minimum       | Recommended          |
| -------------- | ------------- | -------------------- |
| Docker Engine  | 24+           | Latest stable        |
| Docker Compose | V2            | Latest stable        |
| RAM            | 8 GB          | 16 GB+               |
| Disk           | 20 GB         | 50 GB+               |
| GPU (optional) | Any supported | NVIDIA with CUDA 12+ |

### Quick Deploy (3 commands)

```bash
# 1. Install the CLI
pip install llmport-cli

# 2. Check prerequisites
llmport doctor

# 3. Deploy (builds images, generates secrets, starts services, creates admin)
llmport deploy /opt/llm-port
```

The CLI will:

1. Run pre-flight checks (Docker, Compose, disk, RAM)
2. Configure module profiles
3. Generate `.env` with cryptographically random secrets
4. Build all container images
5. Start all services
6. **Create the first admin user** — credentials are displayed once

```
┌──────────────────────────────────────────────────────────────┐
│  ⚠  SAVE THESE CREDENTIALS — THEY CANNOT BE RECOVERED  ⚠   │
│                                                              │
│  Admin email:     admin@example.com                          │
│  Admin password:  k8Fj$2mP!xNq9vR3                          │
│  API token:       eyJhbGciOiJIUzI1NiIs…                     │
│                                                              │
│  Store these in a password manager or secure vault.          │
│  The password is hashed and the token is stateless —         │
│  neither can be retrieved from the system after this point.  │
└──────────────────────────────────────────────────────────────┘
```

:::warning
The admin password and API token are shown **only once** during bootstrap. Store them immediately in a password manager or secure vault.
:::

### Deploy Options

```bash
llmport deploy /opt/llm-port -m rag,pii     # enable RAG + PII modules
llmport deploy /opt/llm-port --no-build      # skip image build (use existing)
llmport deploy /opt/llm-port --no-cache      # build without Docker cache
llmport deploy /opt/llm-port --force-env     # regenerate .env secrets
llmport deploy /opt/llm-port -y              # auto-confirm all prompts
llmport deploy /opt/llm-port --skip-doctor   # skip pre-flight checks
```

### Non-Interactive Deploy

For CI/CD or scripted deployments, use `--yes` to auto-confirm:

```bash
llmport deploy /opt/llm-port -m rag,pii -y
```

Credentials are auto-saved to `/opt/llm-port/.bootstrap-credentials` (chmod 600).

### Management Commands

```bash
llmport status              # container status
llmport logs -f             # follow logs
llmport module list         # show enabled modules
llmport module enable rag   # enable a module
llmport down                # stop all services
llmport deploy              # re-deploy (preserves secrets)
```

## GPU Configuration

The CLI auto-detects GPU hardware during setup:

```bash
llmport doctor
# Output includes:
# ✅ NVIDIA GPU detected (CUDA 12.4, CC 8.9)
# ✅ Docker GPU runtime available
```

For manual GPU configuration, see the [LLM Runtime Management](/docs/features/runtimes) docs.
