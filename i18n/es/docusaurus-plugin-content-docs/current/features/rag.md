---
sidebar_position: 5
---

# RAG (Generación Aumentada por Recuperación)

El **módulo RAG** (`llm_port_rag`) proporciona un pipeline completo de ingesta y recuperación de documentos.

## Búsqueda de Conocimiento

Tres estrategias de búsqueda con puntuación automática:

| Estrategia         | Cómo funciona                                                      |
| ------------------ | ------------------------------------------------------------------ |
| **Vectorial**      | Similitud coseno sobre embeddings de pgvector                      |
| **Palabras clave** | Búsqueda de texto completo con puntuación ts_rank                  |
| **Híbrida**        | Combinación ponderada de vectorial + palabras clave con fusión RRF |

Todas las búsquedas imponen:

- **Aislamiento de tenant** — partición por tenant + workspace opcional
- **Aplicación de ACL** — control de acceso a nivel de chunk
- **Soporte de filtros** — filtros de metadatos en contenedor, asset y campos personalizados

## Pipeline de Documentos

El pipeline de ingesta procesa los uploads a través de una serie de etapas:

```
Upload → MinIO → Extraer → Normalizar → Fragmentar → Embeber → Indexar (pgvector)
```

### Upload

- **URLs preñadas** — uploads desde el navegador directamente a MinIO vía PUT presignado
- **Deduplicación SHA-256** — omitir archivos sin cambios en re-publicación

### Extracción y Fragmentación

- Tamaño de fragmento y solapamiento configurables
- Configuración de embedding en tiempo de ejecución enviada desde el plano de control
- Soporte para formatos de documento principales (PDF, DOCX, TXT, HTML, Markdown)

### Embedding

- Proveedor y modelo configurables por despliegue
- Las solicitudes de embedding se enrutan a través del propio pool de proveedores del gateway
- Embedding en lote para mayor eficiencia

## Contenedores Virtuales

Un árbol de contenedores de N niveles para organizar el conocimiento:

- Los **contenedores** almacenan assets (documentos)
- Los **assets** tienen versiones con flujo de trabajo borrador/publicación
- Modelo **Borrador → Publicación** con programación opcional

## Plugins de Recolección

Conectores enchufables para sincronización automática de contenido:

| Conector            | Estado                                      |
| ------------------- | ------------------------------------------- |
| Carpeta local / SMB | Disponible                                  |
| SharePoint          | Stub (extensible)                           |
| _Personalizado_     | Registro de plugins para conectores propios |

Los recolectores se ejecutan en programas configurables vía Taskiq + RabbitMQ.

## Procesamiento Asíncrono

- Runner de tareas **Taskiq** con RabbitMQ como broker de mensajes
- Workers en segundo plano para ingesta, publicación y operaciones programadas
- Seguimiento de trabajos con eventos de estado e informes de progreso

## RAG Lite

Cuando el módulo RAG completo no está habilitado, el gateway proporciona un modo **RAG Lite** integrado:

- **Recuperación basada en pgvector** directamente desde la base de datos del gateway
- Búsqueda semántica sobre archivos adjuntos de sesión y documentos subidos
- No requiere un servicio RAG separado — ideal para despliegues ligeros

Ver también: [Gateway — RAG Lite](/docs/features/gateway#rag-lite)

![RAG Collectors](/img/screenshots/rag_collectors.png)
