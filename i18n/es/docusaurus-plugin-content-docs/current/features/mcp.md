---
sidebar_position: 9
---

# Herramientas MCP

**llm.Port** incluye un hub gobernado de herramientas **Model Context Protocol (MCP)** que permite al gateway invocar herramientas externas durante las completions de chat — con protección PII integrada en cada llamada.

## Arquitectura

```
Gateway ──► MCP Hub ──► Privacy Proxy (PII) ──► Servidor MCP ──► Resultado
                │
                ├── mcp_server_brave    (Brave Search)
                ├── mcp_server_searxng  (SearXNG — autoalojado)
                └── mcp_server_webscrape (Web Scrape — Trafilatura)
```

El **MCP Hub** (`llm_port_mcp`) es el broker central:

- Registra servidores de herramientas MCP-compatibles (transportes stdio, SSE y Streamable HTTP)
- Descubre automáticamente herramientas y las convierte en **definiciones de herramientas compatibles con OpenAI**
- Enruta todas las invocaciones a través de un **Privacy Proxy** para detección y redacción de PII
- Cifra credenciales de servidor en reposo con Fernet

## Servidores MCP Integrados

### Brave Search

Búsqueda web y local a través de la API de Brave Search.

| Herramienta          | Descripción                          |
| -------------------- | ------------------------------------ |
| `brave.web_search`   | Búsqueda web vía API de Brave Search |
| `brave.local_search` | Búsqueda local/mapas vía Brave       |

Requiere `BRAVE_API_KEY`. Limitado por `RATE_LIMIT_RPS`.

### SearXNG (Autoalojado)

Meta-búsqueda respetuosa con la privacidad — sin API key externo requerido.

| Herramienta             | Descripción                      |
| ----------------------- | -------------------------------- |
| `searxng.web_search`    | Búsqueda web vía SearXNG         |
| `searxng.news_search`   | Búsqueda de noticias vía SearXNG |
| `searxng.images_search` | Búsqueda de imágenes vía SearXNG |

Ejecuta SearXNG y el servidor MCP en un único contenedor vía `supervisord`.

### Web Scrape

Extrae el contenido principal de páginas web usando Trafilatura — elimina boilerplate para contexto LLM compacto.

| Herramienta            | Descripción                                |
| ---------------------- | ------------------------------------------ |
| `webscrape.scrape_url` | Obtener y extraer contenido de una URL web |

Límite de caracteres configurable (`DEFAULT_MAX_OUTPUT_CHARS`).

## Privacy Proxy

Cada invocación de herramienta MCP pasa por el Privacy Proxy, que:

1. Escanea las **entradas de la herramienta** en busca de PII antes de enviarlas al servidor externo
2. Escanea las **salidas de la herramienta** en busca de PII antes de devolverlas al gateway
3. Aplica las mismas políticas basadas en Presidio que el módulo PII principal

Esto garantiza que los datos sensibles nunca se filtren a servidores de herramientas de terceros.

## Registro de un Servidor MCP Personalizado

```bash
# Vía la API de administración
POST /api/admin/mcp/servers
{
  "name": "mi-servidor",
  "transport": "sse",
  "url": "http://mi-servidor:8080/sse",
  "tool_prefix": "custom"
}
```

El hub descubrirá automáticamente todas las herramientas expuestas por el servidor y las hará disponibles como definiciones compatibles con OpenAI.

## Gestión por CLI

```bash
llmport module enable mcp       # Habilitar el módulo MCP
llmport module disable mcp      # Deshabilitar el módulo MCP
```
