---
sidebar_position: 2
---

# Architektur

Diese Seite beschreibt die übergeordnete Architektur von **llm.Port** — die Ebenen, Dienste und Datenflüsse der Plattform.

## Plattformüberblick

```mermaid
flowchart LR
    subgraph Users["Benutzer & Clients"]
        U1["Admin (Browser)"]
        U2["Anwendungs-Clients / SDKs"]
    end

    subgraph UI["Konsolen-Ebene"]
        FE["llm_port_frontend (React)"]
    end

    subgraph Core["Steuerungsebene"]
        BE["llm_port_backend (FastAPI)"]
    end

    subgraph Gateway["API-Gateway-Ebene"]
        API["llm_port_api (OpenAI-kompatibel /v1/*)"]
    end

    subgraph Modules["Optionale Module"]
        AUTH["llm_port_auth (SSO / OIDC)"]
        PII["llm_port_pii (Presidio)"]
        MAILER["llm_port_mailer (SMTP)"]
        DOCLING["llm_port_docling (IBM Docling)"]
    end

    subgraph RAG["RAG-Ebene (Intern)"]
        RAGAPI["llm_port_rag API (/api/internal/*)"]
        RAGW["Taskiq Worker"]
        RAGS["Scheduler"]
    end

    subgraph Runtime["Modell-Ausführung"]
        LOCAL["Lokale Runtimes (vLLM / llama.cpp / etc.)"]
        REMOTE["Remote-Anbieter (OpenAI / Azure / etc.)"]
    end

    subgraph Shared["Gemeinsame Plattformdienste"]
        PGMAIN["Postgres (Backend + Auth + PII-Ereignisse)"]
        PGAPI["Postgres (Gateway / Sitzungen / Gedächtnis)"]
        PGRAG["Postgres + pgvector (RAG)"]
        REDIS["Redis (Rate-Limit / Leases / Cache)"]
        RMQ["RabbitMQ (Taskiq Broker)"]
        MINIO["MinIO (Snapshots/Uploads)"]
        LANGFUSE["Langfuse (Traces)"]
        LOKI["Loki + Alloy (Logs)"]
        GRAF["Grafana (Dashboards)"]
        DOCKER["Docker Engine / Compose"]
    end

    U1 --> FE
    FE -->|REST /api/*| BE
    FE -->|/chat UI| API
    U2 -->|OpenAI API /v1/*| API

    BE -->|Gateway Admin/Proxy| API
    BE -->|Interner RAG-Proxy /api/internal/*| RAGAPI
    BE -->|Auth-Provider-Proxy| AUTH
    BE -->|PII-Konfig/Stats-Proxy| PII
    BE -->|Benachrichtigungszustellung| MAILER
    BE -->|Dokumentkonvertierung| DOCLING
    BE -->|Ops-Aktionen| DOCKER
    BE --> PGMAIN
    BE --> PGAPI
    BE --> LANGFUSE
    BE --> LOKI

    API -->|Chat/Embeddings weiterleiten| LOCAL
    API -->|Chat/Embeddings weiterleiten| REMOTE
    API -->|PII-Screening| PII
    API -->|Anhang-Extraktion| DOCLING
    API --> PGAPI
    API --> REDIS
    API --> LANGFUSE

    AUTH -->|OAuth Callback → JWT Cookie| BE
    AUTH --> PGMAIN

    PII -->|Ereignis-Weiterleitung| BE
    MAILER --> PGMAIN

    RAGAPI --> PGRAG
    RAGAPI --> MINIO
    RAGAPI --> DOCLING
    RAGAPI --> RMQ
    RAGW --> RMQ
    RAGW --> PGRAG
    RAGW --> MINIO
    RAGW --> DOCLING
    RAGS --> RMQ
    RAGS --> PGRAG

    GRAF --> LOKI
    GRAF --> PGMAIN
    FE -->|Dashboards öffnen| GRAF
```

## Ebenen

### Konsolen-Ebene

Das **React-Frontend** stellt die Admin-Konsole bereit — eine Single-Page-App zur Verwaltung von Anbietern, Modellen, Containern, RAG, PII-Richtlinien und Systemeinstellungen.

### Steuerungsebene

Das **FastAPI-Backend** ist der zentrale Orchestrator. Es verwaltet:

- Benutzerverwaltung, RBAC und Authentifizierung
- LLM-Anbieter- und Runtime-Konfiguration
- Container-Lifecycle-Management über die Docker-API
- Systemeinstellungen mit Krypto- und Apply-Orchestrierung
- Proxying interner Anfragen an RAG und das Gateway

### API-Gateway-Ebene

Das **Gateway** stellt eine OpenAI-kompatible API bereit (`/v1/models`, `/v1/chat/completions`, `/v1/embeddings`). Es verarbeitet:

- Alias-basierte Modellauflösung und Anbieter-Routing
- JWT-Authentifizierung mit mandantenspezifischen Claims
- Redis-basiertes Rate-Limiting und Concurrency-Leasing
- SSE-Streaming mit TTFT-Extraktion
- Langfuse-Tracing und Audit-Logging
- Chat-Sitzungen, Gedächtnis-Fakten und Dateianhänge
- PII-Screening über das PII-Modul

### Optionale Module

Separate Dienste, die über Docker Compose Profile aktiviert oder deaktiviert werden können:

- **Auth** — SSO / OIDC-Authentifizierung mit OAuth-Provider-Adaptern
- **PII** — Presidio-basiertes PII-Scanning, Anonymisierung und Tokenisierung
- **Mailer** — E-Mail-Benachrichtigungen mit Jinja2-Vorlagen
- **Docling** — IBM Docling-basierte Dokumentverarbeitung für Textextraktion

### RAG-Ebene

Das **RAG-Subsystem** ist ein interner Dienst, der nur über das Backend zugänglich ist. Es verwaltet:

- Dokumentenaufnahme: Hochladen → Extrahieren → Aufteilen → Einbetten → Indexieren
- Wissenssuche: Vektor-, Stichwort- und Hybridscoring mit ACL-Durchsetzung
- Virtuelle Container mit Entwurf-/Veröffentlichungs-Workflows
- Asynchrone Verarbeitung via Taskiq + RabbitMQ

### Gemeinsame Plattformdienste

Infrastruktur-Container, die über Docker Compose verwaltet werden:

| Dienst        | Zweck                                                                         |
| ------------- | ----------------------------------------------------------------------------- |
| PostgreSQL    | Backend + Auth-Metadaten + PII-Ereignisse, Gateway-Sitzungen/Gedächtnis, RAG-Vektoren |
| Redis         | Rate-Limiting, Concurrency-Leases, Caching                                   |
| RabbitMQ      | Asynchroner Task-Broker (Taskiq)                                              |
| MinIO         | Objektspeicher für Uploads und Snapshots                                      |
| Langfuse      | LLM-Trace- und Generation-Ereignisspeicher                                    |
| Loki + Alloy  | Zentrale Log-Sammlung und -Abfrage                                            |
| Grafana       | Dashboard und Visualisierung                                                  |
| Docker Engine | Container-Orchestrierung für Runtimes                                         |

## Aufrufpfade

1. **Admin-Operationen** — `Browser → Frontend → Backend → Docker / Settings / Proxy-Ziele`
2. **Anwendungs-Inferenz** — `App/SDK → Gateway → lokale Runtime oder Remote-Anbieter → Antwort`
3. **Chat Completions (Konsole)** — `Browser → Frontend → Backend (Cookie→JWT-Proxy) → Gateway /v1/chat/completions → Anbieter → SSE-Antwort`
4. **RAG-Abfrage** — `Frontend → Backend /api/admin/rag/* → RAG /api/internal/knowledge/search`
5. **RAG-Veröffentlichung** — `Upload → MinIO → RabbitMQ → Worker → Docling-Extraktion → Aufteilen → Einbetten → pgvector-Index`
6. **PII-Screening** — `Gateway (Pre-Forward-Middleware) → PII /analyze → Anonymisieren/Flaggen → Fortfahren oder Ablehnen`
7. **SSO-Authentifizierung** — `Browser → Auth /login/<provider> → IdP → Auth /callback → signiertes JWT → Backend (Cookie setzen)`
8. **Benachrichtigungszustellung** — `Backend (Outbox-Schreiben) → Dispatcher → Mailer /send → SMTP-Anbieter`
9. **Dokumentverarbeitung** — `Datei-Upload → Docling /convert → IBM Docling Pipeline → strukturierter Text → Aufrufer (RAG-Worker / Gateway)`
10. **Observability** — `Backend + Gateway + RAG → Loki / Langfuse → Grafana-Dashboards`

Detaillierte Sequenzdiagramme für jeden Fluss finden Sie unter [Aufrufsequenzen](/docs/call-sequences).
