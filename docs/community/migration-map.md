---
sidebar_position: 3
title: Source-to-Public Migration Map
---

# Source-to-Public Migration Map

This map shows where each previously `PUBLIC_REWRITE` page landed in the new public IA.

| Internal source page | Public destination |
|---|---|
| `docs/intro.md` | `docs/get-started/quickstart.md` + `docs/overview/intro.md` |
| `docs/architecture.md` | `docs/overview/platform-overview.md` |
| `docs/deployment.md` | `docs/get-started/deployment.md` |
| `docs/modules.md` | `docs/overview/modules-and-editions.md` |
| `docs/contributing.md` | `docs/community/contributing.md` |
| `docs/third-party.md` | `docs/reference/compliance-and-third-party.md` |
| `docs/features/gateway.md` | `docs/integrate/api-gateway.md` |
| `docs/features/security.md` | `docs/features/security-overview.md` |
| `docs/features/pii.md` | `docs/features/pii-controls.md` |
| `docs/features/observability.md` | `docs/features/observability.md` |
| `docs/features/rag.md` | `docs/features/rag.md` |
| `docs/features/containers.md` | `docs/features/ops-console.md` |
| `docs/features/runtimes.md` | `docs/features/runtime-management.md` |
| `docs/features/cli.md` | `docs/get-started/cli-install.md` + `docs/reference/cli-reference.md` |
| `docs/features/mcp.md` | `docs/integrate/mcp-tools.md` |
| `docs/features/skills.md` | `docs/features/skills.md` |
| `docs/features/node-agent.md` | `docs/features/multi-node.md` |

## Intent preservation approach

- Keep original product intent and user value
- Remove implementation-sensitive internals
- Maintain enough technical clarity for onboarding, trust, and integration
