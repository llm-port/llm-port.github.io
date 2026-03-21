---
sidebar_position: 5
---

# Repositorios

La plataforma **llm.Port** está organizada como una base de código multi-repositorio. Cada servicio tiene su propio repositorio.

## Repositorios Core (Apache 2.0)

| Repositorio                                                              | Descripción                                                             | Stack                                 |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------- | ------------------------------------- |
| [`llm-port-frontend`](https://github.com/llm-port/llm-port-frontend)     | UI de la consola de administración React                                | Vite + React Router + MUI + Tailwind  |
| [`llm-port-backend`](https://github.com/llm-port/llm-port-backend)       | Control-plane FastAPI: usuarios, RBAC, gestión LLM, orquestación Docker | Python + FastAPI + SQLAlchemy         |
| [`llm-port-api`](https://github.com/llm-port/llm-port-api)               | Gateway `/v1/*` compatible con OpenAI con sesiones, memoria y adjuntos  | Python + FastAPI                      |
| [`llm-port-pii`](https://github.com/llm-port/llm-port-pii)               | Servicio de detección y redacción de PII                                | Python + FastAPI + Presidio           |
| [`llm-port-mcp`](https://github.com/llm-port/llm-port-mcp)               | Registro de herramientas MCP y broker de invocación gobernado           | Python + FastAPI + MCP SDK            |
| [`llm-port-skills`](https://github.com/llm-port/llm-port-skills)         | Registro centralizado de skills para playbooks de razonamiento          | Python + FastAPI + SQLAlchemy         |
| [`llm-port-node-agent`](https://github.com/llm-port/llm-port-node-agent) | Agente de ejecución en host para clusters de nodos remotos              | Python + httpx + websockets           |
| [`llm-port-cli`](https://github.com/llm-port/llm-port-cli)               | Instalador CLI y herramienta de gestión                                 | Python + Click + Textual              |
| [`llm-port-shared`](https://github.com/llm-port/llm-port-shared)         | Stack Docker Compose para servicios compartidos                         | Postgres, Redis, Grafana, Loki, Alloy |

## Repositorios de Servidores MCP (Apache 2.0)

| Repositorio                                                                | Descripción                                                   | Stack                      |
| -------------------------------------------------------------------------- | ------------------------------------------------------------- | -------------------------- |
| [`mcp-server-brave`](https://github.com/llm-port/mcp-server-brave)         | Servidor MCP que expone Brave Search como herramientas        | Python + FastAPI + MCP SDK |
| [`mcp-server-searxng`](https://github.com/llm-port/mcp-server-searxng)     | Servidor MCP respaldado por SearXNG autoalojado (sin API key) | Python + FastAPI + MCP SDK |
| [`mcp-server-webscrape`](https://github.com/llm-port/mcp-server-webscrape) | Servidor MCP para extracción de contenido web vía Trafilatura | Python + FastAPI + MCP SDK |

## Repositorios Enterprise (Licencia EE)

| Repositorio                                                        | Módulo    | Descripción                                                          |
| ------------------------------------------------------------------ | --------- | -------------------------------------------------------------------- |
| [`llm-port-rag`](https://github.com/llm-port/llm-port-rag)         | `rag`     | RAG Pro — ingesta, búsqueda de conocimiento, plugins de recolección  |
| [`llm-port-auth`](https://github.com/llm-port/llm-port-auth)       | `auth`    | Proveedor SSO / OIDC / OAuth2                                        |
| [`llm-port-mailer`](https://github.com/llm-port/llm-port-mailer)   | `mailer`  | Notificaciones y alertas por correo                                  |
| [`llm-port-docling`](https://github.com/llm-port/llm-port-docling) | `docling` | Análisis y conversión de documentos (IBM Docling)                    |
| [`llm-port-ee`](https://github.com/llm-port/llm-port-ee)           | —         | Biblioteca EE compartida: licencias, hooks de ciclo de vida, esquema |
| [`llm-port-cli-ee`](https://github.com/llm-port/llm-port-cli-ee)   | —         | CLI Enterprise: auth GitHub, gestión de licencias, módulos Pro       |

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
