---
sidebar_position: 10
---

# Skills

El **Registro de Skills** (`llm_port_skills`) gestiona playbooks de razonamiento reutilizables que determinan cómo el sistema maneja clases de solicitudes. Los skills se sitúan entre el contexto RAG, las herramientas MCP y la composición de prompts.

## Concepto

| Capa       | Rol                                             |
| ---------- | ------------------------------------------------ |
| **RAG**    | Lo que el sistema **sabe** (contexto)            |
| **MCP**    | Lo que el sistema **puede hacer** (herramientas) |
| **Skills** | **Cómo** el sistema debe resolver una tarea      |

Los skills son documentos Markdown con frontmatter YAML. Codifican experiencia de dominio, flujos de trabajo paso a paso y patrones de razonamiento que guían el comportamiento del LLM para tipos específicos de solicitudes.

## Formato de Skill

```markdown
---
name: code-review
version: 2
tags: [development, review]
triggers:
  - "review this code"
  - "check for bugs"
---

# Skill de Revisión de Código

Al revisar código, sigue estos pasos:

1. Buscar vulnerabilidades de seguridad (inyección, bypass de auth)
2. Verificar manejo de errores y casos límite
3. Evaluar implicaciones de rendimiento
4. Revisar nomenclatura y legibilidad
5. Sugerir mejoras específicas con ejemplos
```

## Características

- **CRUD completo** — Crear, leer, actualizar y eliminar skills vía API REST
- **Versionado** — Los skills se versionan; las versiones anteriores se conservan
- **Ciclo de vida de publicación** — Borrador → Publicado → Archivado
- **Importar/Exportar** — Los skills se pueden importar y exportar como archivos `.md`
- **Resolución en tiempo de ejecución** — El endpoint `/resolve` selecciona skills que coincidan con el contexto de la solicitud
- **Telemetría de uso** — Seguimiento de qué skills se invocan y con qué frecuencia

## Cómo Funciona

1. Durante la composición del prompt, el gateway llama al endpoint `/resolve` del servicio Skills
2. El resolvedor compara la solicitud del usuario con los triggers y tags de los skills
3. El contenido de los skills coincidentes se inyecta en el prompt del sistema
4. El LLM sigue el patrón de razonamiento del skill al generar la respuesta

## Endpoints de la API

| Endpoint                         | Descripción                                |
| -------------------------------- | ------------------------------------------ |
| `GET /api/admin/skills`          | Listar todos los skills                     |
| `POST /api/admin/skills`         | Crear un nuevo skill                        |
| `PUT /api/admin/skills/{id}`     | Actualizar un skill                         |
| `DELETE /api/admin/skills/{id}`  | Eliminar un skill                           |
| `POST /api/internal/resolve`     | Resolver skills coincidentes para una solicitud |
| `GET /api/admin/skills/export`   | Exportar skills como archivos `.md`         |
| `POST /api/admin/skills/import`  | Importar skills desde archivos `.md`        |

## Gestión por CLI

```bash
llmport module enable skills     # Habilitar el módulo Skills
llmport module disable skills    # Deshabilitar el módulo Skills
```
