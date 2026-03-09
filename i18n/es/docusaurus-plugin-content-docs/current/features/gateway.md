---
sidebar_position: 1
---

# Gateway y Enrutamiento

El **gateway de llm.port** (`llm_port_api`) proporciona un único endpoint de API compatible con OpenAI que enruta las solicitudes a runtimes locales y proveedores remotos.

## API Compatible con OpenAI

El gateway expone los endpoints estándar de OpenAI:

| Endpoint                    | Descripción                                 |
| --------------------------- | ------------------------------------------- |
| `GET /v1/models`            | Listar modelos disponibles                  |
| `POST /v1/chat/completions` | Chat completions (streaming y no streaming) |
| `POST /v1/embeddings`       | Generar embeddings                          |

Cualquier SDK o herramienta que use la API de OpenAI funciona de inmediato, sin cambios de código.

## Enrutamiento de Proveedores

Las solicitudes se enrutan a través de un sistema de **resolución de modelos basado en alias**:

1. El cliente solicita un modelo por alias (p.ej., `my-gpt4`)
2. El gateway resuelve el alias a una o más instancias de proveedor
3. La solicitud se reenvía al proveedor seleccionado

Proveedores soportados:

| Proveedor                             | Tipo             | Protocolo         |
| ------------------------------------- | ---------------- | ----------------- |
| **vLLM**                              | Runtime local    | Compatible OpenAI |
| **llama.cpp**                         | Runtime local    | Compatible OpenAI |
| **Ollama**                            | Runtime local    | Compatible OpenAI |
| **TGI** (Text Generation Inference)   | Runtime local    | Compatible OpenAI |
| **OpenAI**                            | Proveedor remoto | API oficial       |
| **Azure OpenAI**                      | Proveedor remoto | API Azure         |
| _Cualquier API compatible con OpenAI_ | Ambos            | Compatible OpenAI |

## Streaming

El gateway soporta **streaming SSE (Server-Sent Events)** con:

- Transmisión completa de eventos `chat.completion.chunk` del upstream
- Extracción de **Time-to-First-Token (TTFT)** para monitoreo de latencia
- Manejo configurable de timeout por inactividad
- Terminación correcta con `data: [DONE]`

## Proxy y Reintento

- Soporte de proxy HTTP upstream con timeout configurable
- **Reintento pre-primer-token** automático en fallos upstream
- Las respuestas de error siguen el formato de envolvente de error de OpenAI

## Limitación de Velocidad

- Contadores de RPM (solicitudes por minuto) y TPM (tokens por minuto) de **ventana fija** por tenant
- Contadores basados en Redis con scripts Lua atómicos
- Límites configurables por política de tenant

## Control de Concurrencia

- **Arrendamiento por instancia** distribuido vía Redis + scripts Lua
- Previene la sobrecarga de instancias individuales de proveedores
- Los arrendamientos se liberan automáticamente al completar la solicitud (incluidos errores)

![Chat Console](/img/screenshots/chat.png)

![API Playground](/img/screenshots/api.png)
