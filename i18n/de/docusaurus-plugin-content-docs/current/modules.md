---
sidebar_position: 4
---

# Module

**llm.Port** verwendet eine modulare Architektur — optionale Funktionen können ohne Änderung an der Kernplattform aktiviert oder deaktiviert werden. Module werden als separate Docker Compose Services mit eigenen Datenbanken und APIs implementiert.

## Verfügbare Module

### Core-Module (Apache 2.0)

| Modul          | Beschreibung                                                      | Standard    |
| -------------- | ----------------------------------------------------------------- | ----------- |
| **pii**        | PII-Erkennung und -Anonymisierung (Presidio + spaCy)              | Aktiviert   |
| **sessions**   | Chat-Sitzungen, Gedächtnis-Fakten und Dateianhänge               | Aktiviert   |
| **mcp**        | MCP-Tool-Registry und gesteuerter Tool-Aufruf-Broker              | Aktiviert   |
| **skills**     | Zentrales Skills-Register für Reasoning-Playbooks                 | Aktiviert   |
| **node-agent** | Host-seitiger Ausführungsagent für Remote-Node-Cluster            | Deaktiviert |

### Enterprise-Module (EE-Lizenz)

| Modul       | Beschreibung                                                      | Standard    |
| ----------- | ----------------------------------------------------------------- | ----------- |
| **rag**     | RAG Pro — Dokumentenerfassung, Vektorsuche, Collector-Plugins     | Deaktiviert |
| **auth**    | Externer Authentifizierungsanbieter (SSO / OIDC)                  | Deaktiviert |
| **mailer**  | E-Mail-Benachrichtigungen und -Warnungen                          | Deaktiviert |
| **docling** | Erweiterte Dokumentenverarbeitung & -konvertierung (IBM Docling)  | Deaktiviert |

:::note
Das Core-Backend enthält **RAG Lite** (eingebettete pgvector-basierte Suche) und einen **leichtgewichtigen Dokumentenparser** als Fallback, wenn die vollständigen RAG- und Docling-Module nicht aktiviert sind. Basis-Authentifizierung über FastAPI Users ist immer im Core verfügbar.
:::

## Aktivieren / Deaktivieren

### Über die CLI

```bash
llmport module list           # Alle Module und deren Status anzeigen
llmport module enable rag     # Ein Modul aktivieren
llmport module disable pii    # Ein Modul deaktivieren
```

### Über Docker Compose Profile

Jedes Modul entspricht einem Docker Compose-Profil. Das Aktivieren eines Moduls aktiviert sein Profil, das die erforderlichen Container startet.

```yaml
# Beispiel: RAG-Modul-Container
services:
  llm-port-rag:
    profiles: ["rag"]
    # ...
  llm-port-rag-worker:
    profiles: ["rag"]
    # ...
```

## Funktionsweise

### Backend-Erkennung

Das Backend stellt einen Modul-Erkennungsendpunkt bereit:

```
GET /v1/services
```

Das Frontend ruft diesen Endpunkt auf, um zu ermitteln, welche Module aktiviert sind, und zeigt oder verbirgt dann dynamisch die entsprechenden UI-Bereiche.

### Ein neues Modul hinzufügen

Das Hinzufügen eines Moduls erfordert ungefähr **20 Konfigurationszeilen**:

1. Den Service zu `docker-compose.yml` mit einem Profil hinzufügen
2. Das Modul in der Service-Registry registrieren
3. Einen UI-Bereich hinzufügen, der den Erkennungsendpunkt prüft

### Modul-Isolation

Jedes Modul:

- Läuft in eigenen Container(n)
- Hat eine eigene Datenbank (falls erforderlich)
- Kommuniziert mit dem Backend über interne APIs
- Kann unabhängig gestartet/gestoppt werden

Einige Module (RAG, Gateway, MCP, Skills) verwenden eigene Datenbank-Schemata, während andere (PII, Mailer) zustandslos sind oder die Backend-Datenbank teilen.

### Modul-Sync-Callbacks

Wenn ein Modul aktiviert oder deaktiviert wird, führt die Modul-Registry **Sync-Callbacks** für Bereinigung oder Initialisierung aus. Beispielsweise löscht das Deaktivieren des PII-Moduls zwischengespeicherte PII-Richtlinien, während das Aktivieren des Auth-Moduls die Anbieter-Erkennung auslöst.

### MCP-Tool-Server

Das **MCP-Modul** fungiert als zentraler Broker für Model-Context-Protocol-Tool-Server. Einzelne MCP-Server (Brave Search, SearXNG, Web Scrape oder benutzerdefinierte) registrieren sich beim Hub und stellen Tools bereit, die das Gateway während Chat-Completions aufrufen kann. Alle Tool-Aufrufe durchlaufen einen **Privacy Proxy** zur PII-Erkennung.

Siehe [MCP-Tools](/docs/features/mcp) für Details.

### Skills-Registry

Das **Skills-Modul** verwaltet wiederverwendbare Reasoning-Playbooks — Markdown-Dokumente mit YAML-Frontmatter, die bestimmen, wie das System über bestimmte Anfrageklassen nachdenkt. Skills stehen zwischen RAG-Kontext, MCP-Tools und Prompt-Komposition.

Siehe [Skills](/docs/features/skills) für Details.

### Node-Agent

Der **Node-Agent** ist ein leichtgewichtiges Host-seitiges Binary, das sich beim Backend registriert, eine WebSocket-Verbindung aufrechterhält und Docker-Runtime-Lifecycle-Befehle auf Remote-Nodes ausführt. Er ermöglicht Multi-Node-Cluster-Deployments.

Siehe [Node-Agent](/docs/features/node-agent) für Details.

![Modules](/img/screenshots/modules.png)
