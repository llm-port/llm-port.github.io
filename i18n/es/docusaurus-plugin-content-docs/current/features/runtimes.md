---
sidebar_position: 7
---

# Gestión de Runtimes LLM

**llm.Port** soporta la gestión de runtimes LLM locales junto a proveedores remotos desde un único plano de control.

## Registro de Adaptadores de Proveedor

Adaptadores enchufables para diferentes runtimes:

| Runtime       | Soporte GPU                     | Protocolo         |
| ------------- | ------------------------------- | ----------------- |
| **vLLM**      | NVIDIA (CUDA), AMD (ROCm)       | Compatible OpenAI |
| **llama.cpp** | NVIDIA, AMD, Intel, Apple Metal | Compatible OpenAI |
| **Ollama**    | NVIDIA, AMD, Apple Metal        | Compatible OpenAI |
| **TGI**       | NVIDIA (CUDA)                   | Compatible OpenAI |

## Autodetección de GPU

La plataforma detecta automáticamente el hardware GPU disponible:

- **NVIDIA** — CUDA con detección de capacidad de cómputo
- **AMD** — soporte ROCm
- **Intel** — aceleración GPU
- **Apple Metal** — soporte de chips M-series

### Presets de Imagen vLLM

Para despliegues vLLM, selección automática de imagen según GPU:

| GPU             | Imagen             |
| --------------- | ------------------ |
| NVIDIA CC ≥ 8.0 | Imagen CUDA latest |
| NVIDIA CC ≥ 7.0 | Imagen CUDA legacy |
| AMD             | Imagen ROCm        |

## Escáner de Modelos

Analiza automáticamente los artefactos del modelo:

- **Detección de formato**: safetensors, GGUF, etc.
- **Recomendación de runtime**: sugiere runtimes compatibles según el formato
- **Estimación de tamaño**: requisitos de disco y memoria

## Descarga de Modelos

- **Descargas de modelos de HuggingFace** orquestadas con Docker
- Seguimiento de la descarga con informes de progreso
- Caché de artefactos y deduplicación

## Grafo de Topología LLM

Topología visual de toda la infraestructura LLM:

- Visualización en grafo Proveedor → Runtime → Modelo
- Navegador de trazas en vivo con streaming SSE
- Superposición del flujo de solicitudes en tiempo real

![LLM Providers](/img/screenshots/llm_providers.png)
