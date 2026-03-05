---
sidebar_position: 2
---

# Arquitectura

Esta página describe la arquitectura de alto nivel de **llm.Port** — los planos, servicios y flujos de datos que componen la plataforma.

## Visión General de la Plataforma

```mermaid
flowchart LR
    subgraph Users["Usuarios & Clientes"]
        U1["Admin (Navegador)"]
        U2["Clientes de Aplicación / SDKs"]
    end

    subgraph UI["Capa de Consola"]
        FE["llm_port_frontend (React)"]
    end

    subgraph Core["Plano de Control"]
        BE["llm_port_backend (FastAPI)"]
    end

    subgraph Gateway["Plano API Gateway"]
        API["llm_port_api (compatible OpenAI /v1/*)"]
    end

    subgraph RAG["Plano RAG (Interno)"]
        RAGAPI["llm_port_rag API (/api/internal/*)"]
        RAGW["Taskiq Worker"]
        RAGS["Scheduler"]
    end

    subgraph Runtime["Ejecución de Modelos"]
        LOCAL["Runtimes Locales (vLLM / llama.cpp / etc.)"]
        REMOTE["Proveedores Remotos (OpenAI / Azure / etc.)"]
    end

    subgraph Shared["Servicios Compartidos de Plataforma"]
        PGMAIN["Postgres (backend + metadatos rag)"]
        PGAPI["Postgres (metadatos/audit llm_api)"]
        REDIS["Redis (rate limit / leases / cache)"]
        RMQ["RabbitMQ (broker Taskiq)"]
        MINIO["MinIO (snapshots/uploads)"]
        LANGFUSE["Langfuse (trazas)"]
        LOKI["Loki + Promtail (logs)"]
        GRAF["Grafana (dashboards)"]
        DOCKER["Docker Engine / Compose"]
    end

    U1 --> FE
    FE -->|REST /api/*| BE
    U2 -->|OpenAI API /v1/*| API

    BE -->|Admin gateway/proxy| API
    BE -->|Proxy RAG interno /api/internal/*| RAGAPI
    BE -->|Acciones Ops| DOCKER
    BE --> PGMAIN
    BE --> LANGFUSE
    BE --> LOKI

    API -->|Enrutar chat/embeddings| LOCAL
    API -->|Enrutar chat/embeddings| REMOTE
    API --> PGAPI
    API --> REDIS
    API --> LANGFUSE
    API --> LOKI

    RAGAPI --> PGMAIN
    RAGAPI --> MINIO
    RAGAPI --> RMQ
    RAGW --> RMQ
    RAGW --> PGMAIN
    RAGW --> MINIO
    RAGS --> RMQ
    RAGS --> PGMAIN

    GRAF --> LOKI
    GRAF --> PGMAIN
    FE -->|Abrir dashboards| GRAF
```

## Planos

### Capa de Consola

El **frontend React** proporciona la consola de administración — una SPA para gestionar proveedores, modelos, contenedores, RAG, políticas PII y ajustes del sistema.

### Plano de Control

El **backend FastAPI** es el orquestador central. Gestiona:

- Gestión de usuarios, RBAC y autenticación
- Configuración de proveedores LLM y runtimes
- Gestión del ciclo de vida de contenedores vía Docker API
- Ajustes del sistema con criptografía y orquestación de aplicación
- Proxy de solicitudes internas a RAG y al gateway

### Plano API Gateway

El **gateway** expone una API compatible con OpenAI (`/v1/models`, `/v1/chat/completions`, `/v1/embeddings`). Gestiona:

- Resolución de modelos por alias y enrutamiento a proveedores
- Autenticación JWT con claims por tenant
- Rate limiting y concurrency leasing basados en Redis
- Streaming SSE con extracción de TTFT
- Trazado Langfuse y registro de auditoría

### Plano RAG

El **subsistema RAG** es un servicio interno accesible solo a través del backend. Gestiona:

- Ingesta de documentos: subir → extraer → trocear → embeber → indexar
- Búsqueda de conocimiento: scoring vectorial, por palabras clave e híbrido con ACL
- Contenedores virtuales con flujos de trabajo borrador/publicación
- Procesamiento asíncrono via Taskiq + RabbitMQ

### Servicios Compartidos de Plataforma

Contenedores de infraestructura gestionados vía Docker Compose:

| Servicio      | Propósito                                                |
| ------------- | -------------------------------------------------------- |
| PostgreSQL    | Metadatos del backend, vectores RAG (pgvector), audit GW |
| Redis         | Rate limiting, concurrency leases, caché                 |
| RabbitMQ      | Broker de tareas asíncronas (Taskiq)                     |
| MinIO         | Almacenamiento de objetos para uploads y snapshots       |
| Langfuse      | Almacenamiento de trazas LLM y eventos de generación     |
| Loki + Alloy  | Recopilación y consulta centralizada de logs             |
| Grafana       | Dashboard y visualización                                |
| Docker Engine | Orquestación de contenedores para runtimes               |

## Rutas de Llamada

1. **Operaciones de admin** — `Navegador → Frontend → Backend → Docker / Settings / Proxy targets`
2. **Inferencia de aplicaciones** — `App/SDK → Gateway → runtime local o proveedor remoto → respuesta`
3. **Consulta RAG** — `Frontend → Backend /api/admin/rag/* → RAG /api/internal/knowledge/search`
4. **Publicación RAG** — `Subida → MinIO → RabbitMQ → Worker → extraer/trocear/embeber/indexar`
5. **Observabilidad** — `Backend + Gateway + RAG → Loki / Langfuse → dashboards Grafana`

Para diagramas de secuencia detallados de cada flujo, consulta [Secuencias de Llamada](/docs/call-sequences).
