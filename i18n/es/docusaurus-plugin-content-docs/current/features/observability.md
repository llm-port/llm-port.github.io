---
sidebar_position: 4
---

# Observabilidad

**llm.Port** provee observabilidad de pila completa para el gateway, backend y todos los módulos.

## Trazado con Langfuse

Trazado específico para LLM vía [Langfuse](https://langfuse.com):

- **Eventos de traza y generación** para cada solicitud del gateway
- Seguimiento del uso de tokens con recuentos de tokens de entrada/salida
- Métricas de latencia incluyendo TTFT (tiempo al primer token)
- Estado de errores y metadatos del proveedor upstream

### Modos de Privacidad

Tres niveles de privacidad configurables:

| Modo            | Qué se almacena                                       |
| --------------- | ----------------------------------------------------- |
| `full`          | Payloads completos de solicitud/respuesta             |
| `redacted`      | Payloads con entidades PII enmascaradas               |
| `metadata_only` | Recuentos de tokens, latencia, estado — sin contenido |

## Registro Centralizado

- Recolección de logs **Loki + Alloy** de todos los contenedores de servicio
- Flujos de logs estructurados con etiquetas (servicio, nivel, tenant)
- Consultable vía Grafana y la API de administración
- Políticas de retención de logs configurables por entorno

## Registro de Auditoría

Cada acción significativa se registra en auditoría:

- **Solicitudes del gateway**: modelo, tenant, tokens, latencia, estado, trace_id
- **Operaciones de administración**: acciones en contenedores, cambios de configuración, gestión de usuarios
- **Modo root**: inicio/fin de sesiones elevadas con rastro completo de acciones

## OpenTelemetry

- Integración con el colector de OpenTelemetry
- Soporte de Jaeger para trazado distribuido entre servicios
- IDs de correlación propagados a través de todas las llamadas de servicio

## Dashboard

La consola de administración incluye:

- Vista general del sistema con comprobaciones de salud y estadísticas de contenedores
- **Paneles de Grafana incrustados** para métricas en tiempo real y consultas de logs
- Grafo de topología LLM con streaming de trazas en vivo (SSE)
- Resúmenes de uso de tokens por tenant, modelo y ventana de tiempo

![Dashboard](/img/screenshots/dashboard.png)

![Trace Viewer](/img/screenshots/trace.png)

![Logging](/img/screenshots/logging.png)
