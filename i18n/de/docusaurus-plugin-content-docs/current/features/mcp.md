---
sidebar_position: 9
---

# MCP-Tools

**llm.Port** enthält einen gesteuerten **Model Context Protocol (MCP)** Tool-Hub, der es dem Gateway ermöglicht, externe Tools während Chat-Completions aufzurufen — mit integriertem PII-Schutz bei jedem Aufruf.

## Architektur

```
Gateway ──► MCP Hub ──► Privacy Proxy (PII) ──► MCP Server ──► Tool-Ergebnis
                │
                ├── mcp_server_brave    (Brave Search)
                ├── mcp_server_searxng  (SearXNG — selbstgehostet)
                └── mcp_server_webscrape (Web Scrape — Trafilatura)
```

Der **MCP Hub** (`llm_port_mcp`) ist der zentrale Broker:

- Registriert MCP-kompatible Tool-Server (stdio, SSE und Streamable HTTP-Transporte)
- Ermittelt automatisch Tools und konvertiert sie in **OpenAI-kompatible Tool-Definitionen**
- Leitet alle Tool-Aufrufe durch einen **Privacy Proxy** für PII-Erkennung und -Anonymisierung
- Verschlüsselt Server-Anmeldedaten im Ruhezustand mit Fernet

## Integrierte MCP-Server

### Brave Search

Web- und lokale Suche über die Brave Search API.

| Tool                  | Beschreibung                          |
| --------------------- | ------------------------------------- |
| `brave.web_search`    | Websuche über die Brave Search API    |
| `brave.local_search`  | Lokale/Kartensuche über Brave         |

Erfordert einen `BRAVE_API_KEY`. Rate-limitiert über `RATE_LIMIT_RPS`.

### SearXNG (Selbstgehostet)

Datenschutzfreundliche Meta-Suche — kein externer API-Schlüssel erforderlich.

| Tool                    | Beschreibung                |
| ----------------------- | --------------------------- |
| `searxng.web_search`    | Websuche über SearXNG       |
| `searxng.news_search`   | Nachrichtensuche über SearXNG |
| `searxng.images_search` | Bildersuche über SearXNG    |

Führt SearXNG und den MCP-Server in einem einzigen Container via `supervisord` aus.

### Web Scrape

Extrahiert Hauptinhalte aus Webseiten mit Trafilatura — entfernt Boilerplate für kompakten LLM-Kontext.

| Tool                    | Beschreibung                                    |
| ----------------------- | ----------------------------------------------- |
| `webscrape.scrape_url`  | Inhalt von einer Web-URL abrufen und extrahieren |

Konfigurierbares Ausgabezeichenlimit (`DEFAULT_MAX_OUTPUT_CHARS`).

## Privacy Proxy

Jeder MCP-Tool-Aufruf durchläuft den Privacy Proxy, der:

1. **Tool-Eingaben** vor dem Senden an das externe Tool auf PII untersucht
2. **Tool-Ausgaben** vor der Rückgabe an das Gateway auf PII untersucht
3. Dieselben Presidio-basierten Richtlinien wie das Haupt-PII-Modul anwendet

Dies stellt sicher, dass sensible Daten niemals an Drittanbieter-Tool-Server gelangen.

## Registrierung eines benutzerdefinierten MCP-Servers

```bash
# Über die Admin-API
POST /api/admin/mcp/servers
{
  "name": "mein-server",
  "transport": "sse",
  "url": "http://mein-server:8080/sse",
  "tool_prefix": "custom"
}
```

Der Hub ermittelt automatisch alle vom Server bereitgestellten Tools und stellt sie als OpenAI-kompatible Tool-Definitionen zur Verfügung.

## CLI-Verwaltung

```bash
llmport module enable mcp       # MCP-Modul aktivieren
llmport module disable mcp      # MCP-Modul deaktivieren
```
