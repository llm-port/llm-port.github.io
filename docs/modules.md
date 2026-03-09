---
sidebar_position: 4
---

# Modules

**llm.Port** uses a modular architecture — optional capabilities can be enabled or disabled without changing the core platform. Modules are implemented as separate Docker Compose services with their own APIs.

## Available Modules

| Module       | Description                                                        | Default  |
| ------------ | ------------------------------------------------------------------ | -------- |
| **rag**      | Retrieval-Augmented Generation — document ingestion, vector search | Enabled  |
| **pii**      | PII detection and redaction (Presidio + spaCy)                     | Enabled  |
| **sessions** | Chat sessions, memory facts, and file attachments                  | Enabled  |
| **auth**     | External authentication provider (SSO / OIDC)                      | Disabled |
| **mailer**   | Email notifications and alerts                                     | Disabled |
| **docling**  | Advanced document parsing & conversion (IBM Docling)               | Disabled |

## Enabling / Disabling

### Via CLI

```bash
llmport module list           # Show all modules and their status
llmport module enable rag     # Enable a module
llmport module disable pii    # Disable a module
```

### Via Docker Compose Profiles

Each module maps to a Docker Compose profile. Enabling a module activates its profile, which starts the required containers.

```yaml
# Example: RAG module containers
services:
  llm-port-rag:
    profiles: ["rag"]
    # ...
  llm-port-rag-worker:
    profiles: ["rag"]
    # ...
```

## How Modules Work

### Backend Discovery

The backend exposes a module discovery endpoint:

```
GET /v1/services
```

The frontend calls this endpoint to discover which modules are enabled, then dynamically shows or hides the corresponding UI sections.

### Adding a New Module

Adding a module requires approximately **20 lines of configuration**:

1. Add the service to `docker-compose.yml` with a profile
2. Register the module in the service registry
3. Add a UI section that checks the discovery endpoint

### Module Isolation

Each module:

- Runs in its own container(s)
- Communicates with the backend via internal APIs
- Can be started/stopped independently

Some modules (RAG, gateway) use their own database schemas, while others (PII, mailer) are stateless or share the backend database.

### Module Sync Callbacks

When a module is enabled or disabled, the module registry runs **sync callbacks** to perform cleanup or initialization tasks. For example, disabling the PII module clears cached PII policies, while enabling the auth module triggers provider discovery.

![Modules](/img/screenshots/modules.png)
