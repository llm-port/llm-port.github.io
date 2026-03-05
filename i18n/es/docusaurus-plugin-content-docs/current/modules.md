---
sidebar_position: 4
---

# Módulos

**llm.Port** utiliza una arquitectura modular — las capacidades opcionales pueden habilitarse o deshabilitarse sin cambiar la plataforma central. Los módulos se implementan como servicios Docker Compose independientes con sus propias bases de datos y APIs.

## Módulos Disponibles

| Módulo      | Descripción                                                                | Por Defecto   |
| ----------- | -------------------------------------------------------------------------- | ------------- |
| **rag**     | Retrieval-Augmented Generation — ingesta de documentos, búsqueda vectorial | Habilitado    |
| **pii**     | Detección y redacción de PII (Presidio + spaCy)                            | Habilitado    |
| **auth**    | Proveedor de autenticación externo (SSO / OIDC)                            | Deshabilitado |
| **mailer**  | Notificaciones y alertas por correo electrónico                            | Deshabilitado |
| **docling** | Análisis y conversión avanzada de documentos (IBM Docling)                 | Deshabilitado |

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
