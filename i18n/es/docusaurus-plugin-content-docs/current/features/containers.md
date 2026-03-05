---
sidebar_position: 6
---

# Consola de Operaciones

La **consola de operaciones** en el frontend de administración proporciona gestión completa de contenedores e infraestructura.

## Gestión de Contenedores

- **Controles de ciclo de vida**: iniciar, detener, reiniciar, pausar, reanudar, eliminar
- **Exec**: ejecutar comandos dentro de contenedores desde la UI de administración
- **Streaming de logs**: logs de contenedores en tiempo real con modo seguimiento
- **Health checks**: estado de salud del contenedor con monitoreo automático

## Gestión de Imágenes

- **Pull con progreso SSE**: descargas de imágenes con streaming de progreso en tiempo real
- **Listar e inspeccionar**: ver todas las imágenes con tamaño, etiquetas y fecha de creación
- **Purgar**: eliminar imágenes no utilizadas para recuperar espacio en disco

## Gestión de Compose Stack

- **Desplegar / Actualizar**: aplicar configuraciones de Compose con validación
- **Rollback**: revertir a revisiones anteriores con vista de diferencias
- **Seguimiento de revisiones**: cada despliegue crea una revisión numerada con rastro de auditoría
- **Vista de diferencias**: comparar configuraciones entre revisiones

## Clasificación de Contenedores

Los contenedores se categorizan para gestión y políticas:

| Clase         | Descripción                           | Ejemplos                    |
| ------------- | ------------------------------------- | --------------------------- |
| `SYSTEM_CORE` | Servicios esenciales de la plataforma | Backend, Gateway, Frontend  |
| `SYSTEM_AUX`  | Infraestructura de apoyo              | Grafana, Loki, Langfuse     |
| `LLM_ENGINE`  | Runtimes de modelos                   | vLLM, Ollama, llama.cpp     |
| `TENANT_APP`  | Aplicaciones de usuario               | Contenedores personalizados |

Cada clase puede tener sus propias políticas de gestión (política de reinicio, límites de recursos, etc.).

## Visibilidad de Red

- Inspección de redes Docker
- Clasificación de redes de sistema vs. usuario
- Mapeo contenedor-a-red

![Container Management](/img/screenshots/containers.png)
