---
sidebar_position: 5
---

# Repositories

Die **llm.port**-Plattform ist als Multi-Repo-Codebase organisiert. Jeder Service hat sein eigenes Repository.

## Core-Repositories (Apache 2.0)

| Repository                                                               | Beschreibung                                                                 | Stack                                 |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------------- | ------------------------------------- |
| [`llm-port-frontend`](https://github.com/llm-port/llm-port-frontend)     | React Admin-Konsole UI                                                       | Vite + React Router + MUI + Tailwind  |
| [`llm-port-backend`](https://github.com/llm-port/llm-port-backend)       | FastAPI Control-Plane: Benutzer, RBAC, LLM-Verwaltung, Docker-Orchestrierung | Python + FastAPI + SQLAlchemy         |
| [`llm-port-api`](https://github.com/llm-port/llm-port-api)               | OpenAI-kompatibles `/v1/*` Gateway mit Sitzungen, Gedächtnis und Anhängen    | Python + FastAPI                      |
| [`llm-port-pii`](https://github.com/llm-port/llm-port-pii)               | PII-Erkennungs- und Anonymisierungsdienst                                    | Python + FastAPI + Presidio           |
| [`llm-port-mcp`](https://github.com/llm-port/llm-port-mcp)               | MCP-Tool-Registry und gesteuerter Aufruf-Broker                              | Python + FastAPI + MCP SDK            |
| [`llm-port-skills`](https://github.com/llm-port/llm-port-skills)         | Zentrales Skills-Register für Reasoning-Playbooks                            | Python + FastAPI + SQLAlchemy         |
| [`llm-port-node-agent`](https://github.com/llm-port/llm-port-node-agent) | Host-seitiger Ausführungsagent für Remote-Node-Cluster                       | Python + httpx + websockets           |
| [`llm-port-cli`](https://github.com/llm-port/llm-port-cli)               | CLI Installer und Verwaltungstool                                            | Python + Click + Textual              |
| [`llm-port-shared`](https://github.com/llm-port/llm-port-shared)         | Docker Compose Stack für gemeinsame Services                                 | Postgres, Redis, Grafana, Loki, Alloy |

## MCP-Server-Repositories (Apache 2.0)

| Repository                                                                 | Beschreibung                                                 | Stack                      |
| -------------------------------------------------------------------------- | ------------------------------------------------------------ | -------------------------- |
| [`mcp-server-brave`](https://github.com/llm-port/mcp-server-brave)         | MCP-Server für Brave Search als Tools                        | Python + FastAPI + MCP SDK |
| [`mcp-server-searxng`](https://github.com/llm-port/mcp-server-searxng)     | MCP-Server mit selbstgehostetem SearXNG (kein API-Schlüssel) | Python + FastAPI + MCP SDK |
| [`mcp-server-webscrape`](https://github.com/llm-port/mcp-server-webscrape) | MCP-Server für Web-Content-Extraktion via Trafilatura        | Python + FastAPI + MCP SDK |

## Enterprise-Modul-Repositories (EE-Lizenz)

| Repository                                                         | Modul     | Beschreibung                                                    |
| ------------------------------------------------------------------ | --------- | --------------------------------------------------------------- |
| [`llm-port-rag`](https://github.com/llm-port/llm-port-rag)         | `rag`     | RAG Pro — Erfassung, Wissenssuche, Collector-Plugins            |
| [`llm-port-auth`](https://github.com/llm-port/llm-port-auth)       | `auth`    | SSO / OIDC / OAuth2 Anbieter                                    |
| [`llm-port-mailer`](https://github.com/llm-port/llm-port-mailer)   | `mailer`  | E-Mail-Benachrichtigungen und -Warnungen                        |
| [`llm-port-docling`](https://github.com/llm-port/llm-port-docling) | `docling` | Dokument-Parsing & -Konvertierung (IBM Docling)                 |
| [`llm-port-ee`](https://github.com/llm-port/llm-port-ee)           | —         | Gemeinsame EE-Bibliothek: Lizenzierung, Lifecycle-Hooks, Schema |
| [`llm-port-cli-ee`](https://github.com/llm-port/llm-port-cli-ee)   | —         | Enterprise-CLI: GitHub-Auth, Lizenzverwaltung, Pro-Module       |

## Organisation

| Element            | Wert                                      |
| ------------------ | ----------------------------------------- |
| GitHub Org         | [`llm-port`](https://github.com/llm-port) |
| Lizenz             | Apache 2.0                                |
| Sprache (Backend)  | Python 3.12+                              |
| Sprache (Frontend) | TypeScript                                |
| Datenbank          | PostgreSQL 17+ (mit pgvector für RAG)     |
| Container-Runtime  | Docker Engine 24+ mit Compose V2          |

:::note
Einige Repositories können privat sein, während das Projekt für die öffentliche Veröffentlichung fertiggestellt und bereinigt wird.
:::
