---
sidebar_position: 7
---

# LLM-Laufzeitverwaltung

**llm.Port** unterstützt die Verwaltung lokaler LLM-Runtimes neben Remote-Anbietern über eine einzige Control Plane.

## Provider-Adapter-Registry

Pluggable Adapter für verschiedene Runtimes:

| Runtime       | GPU-Unterstützung               | Protokoll         |
| ------------- | ------------------------------- | ----------------- |
| **vLLM**      | NVIDIA (CUDA), AMD (ROCm)       | OpenAI-kompatibel |
| **llama.cpp** | NVIDIA, AMD, Intel, Apple Metal | OpenAI-kompatibel |
| **Ollama**    | NVIDIA, AMD, Apple Metal        | OpenAI-kompatibel |
| **TGI**       | NVIDIA (CUDA)                   | OpenAI-kompatibel |

## GPU-Auto-Erkennung

Die Plattform erkennt verfügbare GPU-Hardware automatisch:

- **NVIDIA** — CUDA mit Compute-Capability-Erkennung
- **AMD** — ROCm-Unterstützung
- **Intel** — GPU-Beschleunigung
- **Apple Metal** — M-Series Chip-Unterstützung

### vLLM Image-Presets

Für vLLM-Deployments automatische Image-Auswahl basierend auf GPU:

| GPU             | Image               |
| --------------- | ------------------- |
| NVIDIA CC ≥ 8.0 | Neuestes CUDA-Image |
| NVIDIA CC ≥ 7.0 | Legacy CUDA-Image   |
| AMD             | ROCm-Image          |

## Modell-Scanner

Analysiert Modell-Artefakte automatisch:

- **Format-Erkennung**: safetensors, GGUF usw.
- **Runtime-Empfehlung**: schlägt kompatible Runtimes basierend auf dem Format vor
- **Größenschätzung**: Disk- und Speicheranforderungen

## Modell-Downloads

- Docker-orchestrierte **HuggingFace-Modell-Downloads**
- Pull-Tracking mit Fortschrittsberichten
- Artefakt-Caching und Deduplizierung
- **HuggingFace-Suche**: Modelle direkt aus der Admin-Konsole durchsuchen

## Runtime-Abgleich

- Automatische Synchronisierung zwischen der Modell-Registry der Plattform und laufenden Runtimes
- **Gateway-Sync**: stellt sicher, dass Alias-zu-Anbieter-Mappings aktuell bleiben, wenn sich Runtimes ändern
- Einheitlicher Scheduler für Health-Checks und Status-Polling über alle registrierten Runtimes

## LLM-Topologie-Graph

Visuelle Topologie der gesamten LLM-Infrastruktur:

- Anbieter → Runtime → Modell Graph-Visualisierung
- Live-Trace-Browser mit SSE-Streaming
- Echtzeit-Anfrage-Flow-Overlay

![LLM Providers](/img/screenshots/llm_providers.png)
