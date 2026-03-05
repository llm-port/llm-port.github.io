---
sidebar_position: 7
---

# LLM Runtime Management

**llm.Port** supports managing local LLM runtimes alongside remote providers from a single control plane.

## Provider Adapter Registry

Pluggable adapters for different runtimes:

| Runtime       | GPU Support                     | Protocol          |
| ------------- | ------------------------------- | ----------------- |
| **vLLM**      | NVIDIA (CUDA), AMD (ROCm)       | OpenAI-compatible |
| **llama.cpp** | NVIDIA, AMD, Intel, Apple Metal | OpenAI-compatible |
| **Ollama**    | NVIDIA, AMD, Apple Metal        | OpenAI-compatible |
| **TGI**       | NVIDIA (CUDA)                   | OpenAI-compatible |

## GPU Auto-Detection

The platform automatically detects available GPU hardware:

- **NVIDIA** — CUDA with compute capability detection
- **AMD** — ROCm support
- **Intel** — GPU acceleration
- **Apple Metal** — M-series chip support

### vLLM Image Presets

For vLLM deployments, automatic image selection based on GPU:

| GPU             | Image             |
| --------------- | ----------------- |
| NVIDIA CC ≥ 8.0 | Latest CUDA image |
| NVIDIA CC ≥ 7.0 | Legacy CUDA image |
| AMD             | ROCm image        |

## Model Scanner

Automatically analyzes model artifacts:

- **Format detection**: safetensors, GGUF, etc.
- **Runtime recommendation**: suggests compatible runtimes based on format
- **Size estimation**: disk and memory requirements

## Model Downloads

- Docker-orchestrated **HuggingFace model downloads**
- Pull tracking with progress reporting
- Artifact caching and deduplication

## LLM Topology Graph

Visual topology of the entire LLM infrastructure:

- Provider → Runtime → Model graph visualization
- Live trace browser with SSE streaming
- Real-time request flow overlay

![LLM Providers](/img/screenshots/llm_providers.png)
