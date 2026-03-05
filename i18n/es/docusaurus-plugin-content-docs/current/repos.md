---
sidebar_position: 5
---

# Repositorios

La plataforma **llm.Port** está organizada como una base de código multi-repositorio. Cada servicio tiene su propio repositorio.

## Repositorios Core (Apache 2.0)

| Repositorio                                                          | Descripción                                                               | Stack                                 |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------- |
| [`llm-port-frontend`](https://github.com/llm-port/llm-port-frontend) | UI de la consola de administración React                                  | Vite + React Router + MUI + Tailwind  |
| [`llm-port-backend`](https://github.com/llm-port/llm-port-backend)   | Control-plane FastAPI: usuarios, RBAC, gestión LLM, orquestación Docker   | Python + FastAPI + SQLAlchemy         |
| [`llm-port-api`](https://github.com/llm-port/llm-port-api)           | Gateway `/v1/*` compatible con OpenAI                                     | Python + FastAPI                      |
| [`llm-port-rag`](https://github.com/llm-port/llm-port-rag)           | Subsistema RAG: ingesta, búsqueda de conocimiento, plugins de recolección | Python + FastAPI + pgvector           |
| [`llm-port-pii`](https://github.com/llm-port/llm-port-pii)           | Servicio de detección y redacción de PII                                  | Python + FastAPI + Presidio           |
| [`llm-port-cli`](https://github.com/llm-port/llm-port-cli)           | Instalador CLI y herramienta de gestión                                   | Python + Click + Textual              |
| [`llm-port-shared`](https://github.com/llm-port/llm-port-shared)     | Stack Docker Compose para servicios compartidos                           | Postgres, Redis, Grafana, Loki, Alloy |
| [`llm-port-dev`](https://github.com/llm-port/llm-port-dev)           | Documentación del proyecto, especificaciones de features, scripts de dev  | Markdown                              |

## Repositorios de Módulos

| Repositorio                                                        | Módulo    | Descripción                                       |
| ------------------------------------------------------------------ | --------- | ------------------------------------------------- |
| [`llm-port-auth`](https://github.com/llm-port/llm-port-auth)       | `auth`    | Proveedor SSO / OIDC / OAuth2                     |
| [`llm-port-mailer`](https://github.com/llm-port/llm-port-mailer)   | `mailer`  | Notificaciones y alertas por correo               |
| [`llm-port-docling`](https://github.com/llm-port/llm-port-docling) | `docling` | Análisis y conversión de documentos (IBM Docling) |

## Organización

| Elemento               | Valor                                     |
| ---------------------- | ----------------------------------------- |
| Org de GitHub          | [`llm-port`](https://github.com/llm-port) |
| Licencia               | Apache 2.0                                |
| Lenguaje (backend)     | Python 3.12+                              |
| Lenguaje (frontend)    | TypeScript                                |
| Base de datos          | PostgreSQL 17+ (con pgvector para RAG)    |
| Runtime de contendores | Docker Engine 24+ con Compose V2          |

:::note
Algunos repositorios pueden ser privados mientras el proyecto se finaliza y limpia para su lanzamiento público.
:::
