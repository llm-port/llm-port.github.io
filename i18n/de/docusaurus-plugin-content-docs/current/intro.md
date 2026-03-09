---
sidebar_position: 1
slug: /intro
---

# Erste Schritte

**llm.Port** ist eine selbst-gehostete All-in-One-LLM-Plattform, die ein OpenAI-kompatibles Gateway, eine integrierte Chat-Konsole mit Sitzungen und Gedächtnis, eine Steuerungsebene für Modell-Server, ein internes RAG-Subsystem, PII-Erkennung und Benachrichtigungszustellung vereint — alles hinter einer einzigen Betriebskonsole.

## Für wen ist das?

- **Plattform- / MLOps-Teams**, die ein verwaltetes, selbst-gehostetes Gateway vor lokalen und Remote-LLMs benötigen
- **Sicherheitsbewusste Organisationen**, die On-Prem-Inferenz mit vollständigen Audit-Logs und PII-Kontrollen erfordern
- **Entwickler**, die eine OpenAI-kompatible API ohne Anbieterabhängigkeit wollen

## Schnellstart

### Voraussetzungen

- Docker Engine 24+ mit Compose V2
- 8 GB RAM (16 GB empfohlen für lokale Modell-Runtimes)
- GPU (optional) — NVIDIA, AMD oder Intel für lokale Inferenz

### 1. CLI installieren

```bash
pip install llmport-cli
```

### 2. Systemprüfung ausführen

```bash
llmport doctor
```

Prüft Betriebssystem, Docker, Compose, GPU-Treiber, RAM, Festplatte und Portverfügbarkeit.

### 3. Gemeinsame Dienste starten

```bash
llmport up
```

Startet PostgreSQL, Redis, Grafana, Loki und andere Infrastruktur.

### 4. Einrichtungsassistent ausführen

Das Backend enthält einen geführten Setup-Assistenten, der beim ersten Start Geheimnisse, Anbieter und Gateway-Einstellungen konfiguriert.

### 5. Anbieter und Runtimes hinzufügen

- **Remote-Anbieter**: OpenAI, Azure OpenAI oder jede OpenAI-kompatible API
- **Lokale Runtimes**: vLLM, llama.cpp, Ollama, TGI — mit automatischer GPU-Erkennung

### 6. Apps auf das Gateway zeigen

```bash
curl http://localhost:4000/v1/chat/completions \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "my-alias",
    "messages": [{"role": "user", "content": "Hallo!"}]
  }'
```

Das Gateway ist vollständig OpenAI-kompatibel — jedes SDK oder Tool, das die OpenAI-API spricht, funktioniert sofort.

## Was kommt als Nächstes?

- [Architektur](/docs/architecture) — wie die Plattform aufgebaut ist
- [Funktionen](/docs/features/gateway) — detaillierte Funktionsdokumentation
- [Module](/docs/modules) — optionale Fähigkeiten aktivieren/deaktivieren
- [Repositories](/docs/repos) — die vollständige Code-Struktur
