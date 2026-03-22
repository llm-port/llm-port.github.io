---
sidebar_position: 5
---

# RAG (Retrieval-Augmented Generation)

Das **RAG-Modul** (`llm_port_rag`) bietet eine vollständige Pipeline für Dokumentenerfassung und -abruf.

## Wissenssuche

Drei Suchstrategien mit automatischer Bewertung:

| Strategie         | Funktionsweise                                                   |
| ----------------- | ---------------------------------------------------------------- |
| **Vektor**        | Kosinus-Ähnlichkeit auf pgvector-Embeddings                      |
| **Schlüsselwort** | Volltextsuche mit ts_rank-Bewertung                              |
| **Hybrid**        | Gewichtete Kombination von Vektor + Schlüsselwort mit RRF-Fusion |

Alle Suchen erzwingen:

- **Tenant-Isolation** — Partitionierung nach Tenant + optionalem Workspace
- **ACL-Durchsetzung** — Chunk-Level-Zugriffssteuerung
- **Filter-Unterstützung** — Metadaten-Filter für Container, Asset und benutzerdefinierte Felder

## Dokumenten-Pipeline

Die Erfassungspipeline verarbeitet Uploads durch eine Reihe von Stufen:

```
Upload → MinIO → Extrahieren → Normalisieren → Chunking → Embedding → Indexierung (pgvector)
```

### Upload

- **Presigned URLs** — Browser-Uploads direkt zu MinIO via presigned PUT
- **SHA-256-Deduplizierung** — unveränderte Dateien beim Neu-Veröffentlichen überspringen

### Extraktion & Chunking

- Konfigurierbare Chunk-Größe und Überlappung
- Laufzeit-Embedding-Konfiguration vom Control Plane
- Unterstützung für gängige Dokumentformate (PDF, DOCX, TXT, HTML, Markdown)

### Embedding

- Anbieter und Modell pro Deployment konfigurierbar
- Embedding-Anfragen werden durch den eigenen Provider-Pool des Gateways geleitet
- Batch-Embedding für Effizienz

## Virtuelle Container

Ein N-Level-Container-Baum für die Wissensorganisation:

- **Container** enthalten Assets (Dokumente)
- **Assets** haben Versionen mit Entwurf/Veröffentlichungs-Workflow
- **Entwurf → Veröffentlichung**-Modell mit optionaler Zeitplanung

## Collector-Plugins

Pluggable Connectors für automatische Inhaltssynchronisierung:

| Connector            | Status                                |
| -------------------- | ------------------------------------- |
| Lokaler Ordner / SMB | Verfügbar                             |
| SharePoint           | Stub (erweiterbar)                    |
| _Benutzerdefiniert_  | Plugin-Registry für eigene Connectors |

Collectors laufen auf konfigurierbaren Zeitplänen über Taskiq + RabbitMQ.

## Asynchrone Verarbeitung

- **Taskiq** Task-Runner mit RabbitMQ als Message-Broker
- Background-Worker für Erfassung, Veröffentlichung und geplante Operationen
- Job-Tracking mit Status-Events und Fortschrittsberichten

## RAG Lite

Wenn das vollständige RAG-Modul nicht aktiviert ist, bietet das Gateway einen integrierten **RAG Lite**-Modus:

- **pgvector-basierter Abruf** direkt aus der Gateway-Datenbank
- Semantische Suche über Sitzungsanhänge und hochgeladene Dokumente
- Kein separater RAG-Service erforderlich — ideal für leichtgewichtige Deployments

Siehe auch: [Gateway — RAG Lite](/docs/features/gateway)

![RAG Knowledge Base](/img/screenshots/rag_kb.png)

![RAG Collectors](/img/screenshots/rag_collectors.png)

![Scheduled Publishing](/img/screenshots/scheduler.png)
