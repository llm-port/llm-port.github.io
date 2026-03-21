---
sidebar_position: 4
---

# Módulos

**llm.Port** utiliza una arquitectura modular — las capacidades opcionales pueden habilitarse o deshabilitarse sin cambiar la plataforma central. Los módulos se implementan como servicios Docker Compose independientes con sus propias bases de datos y APIs.

## Módulos Disponibles

### Módulos Core (Apache 2.0)

| Módulo         | Descripción                                                    | Por Defecto   |
| -------------- | -------------------------------------------------------------- | ------------- |
| **pii**        | Detección y redacción de PII (Presidio + spaCy)                | Habilitado    |
| **sessions**   | Sesiones de chat, hechos de memoria y archivos adjuntos        | Habilitado    |
| **mcp**        | Registro de herramientas MCP y broker de invocación gobernado  | Habilitado    |
| **skills**     | Registro centralizado de skills para playbooks de razonamiento | Habilitado    |
| **node-agent** | Agente de ejecución en host para clusters de nodos remotos     | Deshabilitado |

### Módulos Enterprise (Licencia EE)

| Módulo      | Descripción                                                                 | Por Defecto   |
| ----------- | --------------------------------------------------------------------------- | ------------- |
| **rag**     | RAG Pro — ingesta de documentos, búsqueda vectorial, plugins de recolección | Deshabilitado |
| **auth**    | Proveedor de autenticación externo (SSO / OIDC)                             | Deshabilitado |
| **mailer**  | Notificaciones y alertas por correo electrónico                             | Deshabilitado |
| **docling** | Análisis y conversión avanzada de documentos (IBM Docling)                  | Deshabilitado |

:::note
El backend core incluye **RAG Lite** (recuperación embebida basada en pgvector) y un **parser de documentos ligero** como respaldo cuando los módulos completos de RAG y Docling no están habilitados. La autenticación básica vía FastAPI Users siempre está disponible en el core.
:::

## Habilitar / Deshabilitar

### A través de la CLI

```bash
llmport module list           # Mostrar todos los módulos y su estado
llmport module enable rag     # Habilitar un módulo
llmport module disable pii    # Deshabilitar un módulo
```

### A través de Perfiles de Docker Compose

Cada módulo se asigna a un perfil de Docker Compose. Habilitar un módulo activa su perfil, que inicia los contenedores requeridos.

```yaml
# Ejemplo: contenedores del módulo RAG
services:
  llm-port-rag:
    profiles: ["rag"]
    # ...
  llm-port-rag-worker:
    profiles: ["rag"]
    # ...
```

## Cómo Funcionan los Módulos

### Descubrimiento por el Backend

El backend expone un endpoint de descubrimiento de módulos:

```
GET /v1/services
```

El frontend llama a este endpoint para descubrir qué módulos están habilitados y luego muestra u oculta dinámicamente las secciones de UI correspondientes.

### Añadir un Nuevo Módulo

Añadir un módulo requiere aproximadamente **20 líneas de configuración**:

1. Añadir el servicio a `docker-compose.yml` con un perfil
2. Registrar el módulo en el registro de servicios
3. Añadir una sección de UI que compruebe el endpoint de descubrimiento

### Aislamiento de Módulos

Cada módulo:

- Se ejecuta en su(s) propio(s) contenedor(es)
- Tiene su propia base de datos (si es necesario)
- Se comunica con el backend a través de APIs internas
- Puede iniciarse/detenerse de forma independiente

Algunos módulos (RAG, gateway, MCP, skills) usan sus propios esquemas de base de datos, mientras que otros (PII, mailer) son sin estado o comparten la base de datos del backend.

### Callbacks de Sincronización de Módulos

Cuando un módulo se habilita o deshabilita, el registro de módulos ejecuta **callbacks de sincronización** para tareas de limpieza o inicialización. Por ejemplo, deshabilitar el módulo PII limpia las políticas PII en caché, mientras que habilitar el módulo auth dispara el descubrimiento de proveedores.

### Servidores de Herramientas MCP

El **módulo MCP** actúa como broker central para servidores de herramientas del Model Context Protocol. Los servidores MCP individuales (Brave Search, SearXNG, Web Scrape o personalizados) se registran en el hub y exponen herramientas que el gateway puede invocar durante las completions de chat. Todas las invocaciones pasan por un **Privacy Proxy** para detección de PII.

Ver [Herramientas MCP](/docs/features/mcp) para más detalles.

### Registro de Skills

El **módulo Skills** gestiona playbooks de razonamiento reutilizables — documentos Markdown con frontmatter YAML que determinan cómo el sistema razona sobre clases de solicitudes. Los skills se sitúan entre el contexto RAG, las herramientas MCP y la composición de prompts.

Ver [Skills](/docs/features/skills) para más detalles.

### Agente de Nodo

El **Agente de Nodo** es un binario ligero del lado del host que se registra con el backend, mantiene una conexión WebSocket y ejecuta comandos del ciclo de vida de Docker en nodos remotos. Permite despliegues de clusters multi-nodo.

Ver [Agente de Nodo](/docs/features/node-agent) para más detalles.

![Modules](/img/screenshots/modules.png)
