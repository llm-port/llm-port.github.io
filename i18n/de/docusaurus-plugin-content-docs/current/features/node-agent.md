---
sidebar_position: 11
---

# Node-Agent

Der **Node-Agent** (`llm_port_node_agent`) ist ein leichtgewichtiges Host-seitiges Binary, das Multi-Node-Cluster-Deployments ermöglicht. Er läuft auf jedem Remote-Host und führt Docker-Runtime-Lifecycle-Befehle aus, die vom Backend dispatcht werden.

## Funktionsweise

```
Backend ◄──WebSocket──► Node-Agent ──► Docker Engine (auf Remote-Host)
```

1. Der Agent **registriert** sich beim Backend mit einem Einmal-Token
2. Er hält eine authentifizierte **ausgehende WebSocket**-Verbindung aufrecht
3. Das Backend dispatcht Runtime-Befehle (Start, Stop, Pull usw.)
4. Der Agent führt Befehle lokal aus und meldet den Status zurück
5. **Heartbeat + Inventar**-Daten fließen kontinuierlich zum Backend

Das Backend bleibt die einzige Autorität für Scheduling und Platzierung — der Agent ist rein ein Ausführungsarm.

## Installation

### Option A — Standalone-Binary (empfohlen)

Kein Python auf dem Zielknoten erforderlich. Vorgefertigte Binaries sind verfügbar für:

| Plattform | Architektur     |
| --------- | --------------- |
| Linux     | x86-64          |
| Windows   | x86-64          |
| macOS     | Universal (M1+) |

Deployment über die CLI:

```bash
llmport node agent deploy <node-adresse>
```

Die CLI erkennt automatisch das beste Binary für die Zielplattform.

### Option B — Python-Paket

```bash
pip install llm-port-node-agent
```

### Option C — Systemd-Service

Eine systemd-Unit-Datei ist für Linux-Deployments enthalten:

```bash
sudo cp deploy/systemd/llm-port-node-agent.service /etc/systemd/system/
sudo systemctl enable --now llm-port-node-agent
```

## Funktionen

- **Abhängigkeitsfreies Deployment** — Standalone-Binaries mit PyInstaller erstellt
- **Automatische Registrierung** — Einmal-Token-Handshake mit dem Backend
- **Befehlsverifizierung** — Validiert dispatchte Befehle gegen eine Richtlinie vor der Ausführung
- **Ereignis-Pufferung** — Puffert Ereignisse lokal bei WebSocket-Verbindungsabbruch
- **Gesundheitsüberwachung** — Überwacht den lokalen Docker-Engine-Status und meldet ihn
- **Log-Weiterleitung** — Optionale Weiterleitung an Loki (journald unter Linux, Event Log unter Windows)

## CLI-Befehle

```bash
llmport node list              # Registrierte Nodes auflisten
llmport node agent deploy      # Agent-Binary auf einen Remote-Node deployen
llmport node agent status      # Agent-Status auf einem Node prüfen
```
