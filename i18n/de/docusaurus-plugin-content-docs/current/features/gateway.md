---
sidebar_position: 1
---

# Gateway & Routing

Das **llm.port Gateway** (`llm_port_api`) stellt einen einzigen OpenAI-kompatiblen API-Endpunkt bereit, der Anfragen an lokale Runtimes und Remote-Anbieter weiterleitet.

## OpenAI-kompatible API

Das Gateway stellt Standard-OpenAI-Endpunkte bereit:

| Endpunkt                    | Beschreibung                                     |
| --------------------------- | ------------------------------------------------ |
| `GET /v1/models`            | Verfügbare Modelle auflisten                     |
| `POST /v1/chat/completions` | Chat Completions (Streaming und Nicht-Streaming) |
| `POST /v1/embeddings`       | Embeddings generieren                            |

Jedes SDK oder Tool, das die OpenAI-API unterstützt, funktioniert ohne Code-Änderungen direkt.

## Provider-Routing

Anfragen werden über ein **alias-basiertes Modell-Auflösungssystem** weitergeleitet:

1. Der Client fordert ein Modell per Alias an (z. B. `my-gpt4`)
2. Das Gateway löst den Alias zu einer oder mehreren Provider-Instanzen auf
3. Die Anfrage wird an den ausgewählten Provider weitergeleitet

Unterstützte Anbieter:

| Anbieter                            | Typ             | Protokoll         |
| ----------------------------------- | --------------- | ----------------- |
| **vLLM**                            | Lokale Runtime  | OpenAI-kompatibel |
| **llama.cpp**                       | Lokale Runtime  | OpenAI-kompatibel |
| **Ollama**                          | Lokale Runtime  | OpenAI-kompatibel |
| **TGI** (Text Generation Inference) | Lokale Runtime  | OpenAI-kompatibel |
| **OpenAI**                          | Remote-Anbieter | Offizielle API    |
| **Azure OpenAI**                    | Remote-Anbieter | Azure API         |
| _Beliebige OpenAI-kompatible API_   | Beides          | OpenAI-kompatibel |

## Streaming

Das Gateway unterstützt **SSE (Server-Sent Events) Streaming** mit:

- Vollständiger Weiterleitung von Upstream-`chat.completion.chunk`-Events
- **Time-to-First-Token (TTFT)**-Extraktion zur Latenzüberwachung
- Konfigurierbares Idle-Timeout-Handling
- Korrekte `data: [DONE]`-Terminierung

## Proxy & Retry

- Upstream-HTTP-Proxy-Unterstützung mit konfigurierbarem Timeout
- Automatischer **Pre-First-Token-Retry** bei Upstream-Fehlern
- Fehlerantworten folgen dem OpenAI-Fehlerumschlags-Format

## Rate Limiting

- **Fixed-Window** RPM (Requests pro Minute) und TPM (Token pro Minute) pro Tenant
- Redis-basierte Zähler mit atomaren Lua-Skripten
- Konfigurierbare Limits pro Tenant-Policy

## Concurrency Control

- Verteiltes **per-Instanz-Leasing** über Redis + Lua-Skripten
- Verhindert Überlastung einzelner Provider-Instanzen
- Leases werden automatisch beim Abschluss der Anfrage freigegeben (auch bei Fehlern)

![Chat Console](/img/screenshots/chat.png)

![API Playground](/img/screenshots/api.png)
