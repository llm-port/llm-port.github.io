---
sidebar_position: 6
---

# Deployment

Leitfaden zur Bereitstellung von **llm.Port** in der Produktion.

## Voraussetzungen

| Anforderung    | Minimum  | Empfohlen           |
| -------------- | -------- | ------------------- |
| Docker Engine  | 24+      | Neueste stable      |
| Docker Compose | V2       | Neueste stable      |
| RAM            | 8 GB     | 16 GB+              |
| Speicherplatz  | 20 GB    | 50 GB+              |
| GPU (optional) | Beliebig | NVIDIA mit CUDA 12+ |

## Schnellstart

### 1. CLI installieren

```bash
pip install llmport-cli
```

### 2. Systemprüfung ausführen

```bash
llmport doctor
```

### 3. Umgebungsdateien generieren

```bash
llmport config env --mode production
```

Dies generiert `.env`-Dateien mit:

- Zufälligen JWT- und Fernet-Schlüsseln
- Datenbankpasswörtern
- Service-URLs und Ports
- Modulkonfiguration

### 4. Plattform starten

```bash
llmport up
```

Dies startet:

- PostgreSQL (Backend + Gateway + RAG)
- Redis (Rate Limiting, Caching)
- RabbitMQ (asynchroner Task-Broker)
- MinIO (Objektspeicher)
- Grafana + Loki + Alloy (Observability)
- Backend-, Gateway- und Frontend-Services

### 5. Init-Assistenten ausführen

Öffnen Sie die Admin-Konsole unter `http://localhost:3000` und schließen Sie den Einrichtungsassistenten ab.

## Modulprofile

Optionale Module zur Deployzeit aktivieren:

```bash
llmport module enable rag     # RAG-Pipeline
llmport module enable pii     # PII-Erkennung
llmport module enable auth    # SSO / OIDC
llmport module enable mailer  # E-Mail-Benachrichtigungen
llmport module enable docling # Dokumentenverarbeitung
```

## Docker Compose

Die Plattform verwendet Docker Compose-Profile für modulares Deployment:

```bash
# Nur Core
docker compose up -d

# Core + RAG + PII
docker compose --profile rag --profile pii up -d

# Alles
docker compose --profile rag --profile pii --profile auth --profile mailer --profile docling up -d
```

## Konfiguration

### Umgebungsvariablen

Die wichtigste Konfiguration wird über Umgebungsvariablen verwaltet:

| Variable                | Beschreibung                       | Standard                 |
| ----------------------- | ---------------------------------- | ------------------------ |
| `LLM_PORT_JWT_SECRET`   | JWT-Signierschlüssel               | Generiert                |
| `LLM_PORT_FERNET_KEY`   | Datenbankverschlüsselungsschlüssel | Generiert                |
| `LLM_PORT_DB_URL`       | PostgreSQL-Verbindungsstring       | `postgresql://...`       |
| `LLM_PORT_REDIS_URL`    | Redis-Verbindungsstring            | `redis://localhost:6379` |
| `LLM_PORT_GATEWAY_PORT` | Gateway-Lauschport                 | `4000`                   |
| `LLM_PORT_BACKEND_PORT` | Backend-Lauschport                 | `8000`                   |

### Systemeinstellungen

Laufzeitkonfigurierbare Einstellungen werden in der Datenbank gespeichert und über die Admin-Konsole oder API verwaltet. Änderungen können auslösen:

- **Live-Reload** — sofort angewendet ohne Neustart
- **Service-Neustart** — betroffener Service wird neu gestartet
- **Stack-Neuerstellen** — Docker Compose Services werden neuerstellt

## GPU-Konfiguration

Die CLI erkennt GPU-Hardware automatisch während der Einrichtung:

```bash
llmport doctor
# Ausgabe enthält:
# ✅ NVIDIA GPU erkannt (CUDA 12.4, CC 8.9)
# ✅ Docker GPU-Laufzeit verfügbar
```

Für manuelle GPU-Konfiguration, siehe die Dokumentation zur [LLM-Laufzeitverwaltung](/docs/features/runtimes).
