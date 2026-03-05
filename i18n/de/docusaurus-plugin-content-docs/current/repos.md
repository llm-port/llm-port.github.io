---
sidebar_position: 5
---

# Repositories

Die **llm.port**-Plattform ist als Multi-Repo-Codebase organisiert. Jeder Service hat sein eigenes Repository.

## Core-Repositories (Apache 2.0)

| Repository                                                           | Beschreibung                                                                 | Stack                                 |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------- |
| [`llm-port-frontend`](https://github.com/llm-port/llm-port-frontend) | React Admin-Konsole UI                                                       | Vite + React Router + MUI + Tailwind  |
| [`llm-port-backend`](https://github.com/llm-port/llm-port-backend)   | FastAPI Control-Plane: Benutzer, RBAC, LLM-Verwaltung, Docker-Orchestrierung | Python + FastAPI + SQLAlchemy         |
| [`llm-port-api`](https://github.com/llm-port/llm-port-api)           | OpenAI-kompatibles `/v1/*` Gateway                                           | Python + FastAPI                      |
| [`llm-port-rag`](https://github.com/llm-port/llm-port-rag)           | RAG-Subsystem: Erfassung, Wissenssuche, Collector-Plugins                    | Python + FastAPI + pgvector           |
| [`llm-port-pii`](https://github.com/llm-port/llm-port-pii)           | PII-Erkennungs- und Anonymisierungsdienst                                    | Python + FastAPI + Presidio           |
| [`llm-port-cli`](https://github.com/llm-port/llm-port-cli)           | CLI Installer und Verwaltungstool                                            | Python + Click + Textual              |
| [`llm-port-shared`](https://github.com/llm-port/llm-port-shared)     | Docker Compose Stack für gemeinsame Services                                 | Postgres, Redis, Grafana, Loki, Alloy |
| [`llm-port-dev`](https://github.com/llm-port/llm-port-dev)           | Projektdokumentation, Feature-Spezifikationen, Dev-Skripte                   | Markdown                              |

## Modul-Repositories

| Repository                                                         | Modul     | Beschreibung                                    |
| ------------------------------------------------------------------ | --------- | ----------------------------------------------- |
| [`llm-port-auth`](https://github.com/llm-port/llm-port-auth)       | `auth`    | SSO / OIDC / OAuth2 Anbieter                    |
| [`llm-port-mailer`](https://github.com/llm-port/llm-port-mailer)   | `mailer`  | E-Mail-Benachrichtigungen und -Warnungen        |
| [`llm-port-docling`](https://github.com/llm-port/llm-port-docling) | `docling` | Dokument-Parsing & -Konvertierung (IBM Docling) |

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
