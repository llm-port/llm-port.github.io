---
sidebar_position: 4
---

# Observability

**llm.Port** bietet Full-Stack-Observability für Gateway, Backend und alle Module.

## Langfuse Tracing

LLM-spezifisches Tracing über [Langfuse](https://langfuse.com):

- **Trace- und Generations-Events** für jede Gateway-Anfrage
- Token-Usage-Tracking mit Eingabe-/Ausgabe-Token-Anzahl
- Latenzmetriken einschließlich TTFT (Time-to-First-Token)
- Fehlerstatus und Upstream-Provider-Metadaten

### Datenschutzmodi

Drei konfigurierbare Datenschutzstufen:

| Modus           | Was gespeichert wird                       |
| --------------- | ------------------------------------------ |
| `full`          | Vollständige Request/Response-Payloads     |
| `redacted`      | Payloads mit maskierten PII-Entities       |
| `metadata_only` | Token-Anzahl, Latenz, Status — kein Inhalt |

## Zentralisiertes Logging

- **Loki + Alloy** Log-Erfassung aller Service-Container
- Strukturierte Log-Streams mit Labels (Service, Level, Tenant)
- Abfragbar über Grafana und die Admin-API
- Konfigurierbare Log-Retention-Richtlinien pro Umgebung

## Audit-Logging

Jede wichtige Aktion wird auditgeloggt:

- **Gateway-Anfragen**: Modell, Tenant, Tokens, Latenz, Status, trace_id
- **Admin-Operationen**: Container-Aktionen, Einstellungsänderungen, Benutzerverwaltung
- **Root-Modus**: Start/Ende erhöhter Sitzungen mit vollständigem Aktionspfad

## OpenTelemetry

- OpenTelemetry Collector Integration
- Jaeger-Unterstützung für verteiltes Tracing über Services hinweg
- Korrelations-IDs, die durch alle Service-Aufrufe propagiert werden

## Dashboard

Die Admin-Konsole enthält:

- Systemübersicht mit Health-Checks und Container-Statistiken
- **Grafana-Panel-Einbettungen** für Echtzeit-Metriken und Log-Abfragen
- LLM-Topologie-Graph mit Live-Trace-Streaming (SSE)
- Token-Nutzungszusammenfassungen pro Tenant, Modell und Zeitfenster

![Dashboard](/img/screenshots/dashboard.png)
