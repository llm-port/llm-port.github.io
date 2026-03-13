---
sidebar_position: 6
---

# Despliegue

Guía para desplegar **llm.Port** en producción.

## Requisitos Previos

| Requisito      | Mínimo     | Recomendado         |
| -------------- | ---------- | ------------------- |
| Docker Engine  | 24+        | Última estable      |
| Docker Compose | V2         | Última estable      |
| RAM            | 8 GB       | 16 GB+              |
| Disco          | 20 GB      | 50 GB+              |
| GPU (opcional) | Cualquiera | NVIDIA con CUDA 12+ |

## Despliegue Rápido

### 1. Instalar la CLI

```bash
pip install llmport-cli
```

Alternativamente, puede descargar un ejecutable independiente desde la
[última versión de GitHub](https://github.com/llm-port/llm-port-cli/releases/latest) (no requiere Python).

### 2. Ejecutar la comprobación de salud

```bash
llmport doctor
```

### 3. Generar archivos de entorno

```bash
llmport config env --mode production
```

Esto genera archivos `.env` con:

- Claves JWT y Fernet aleatorias
- Contraseñas de base de datos
- URLs y puertos de servicios
- Configuración de módulos

### 4. Iniciar la plataforma

```bash
llmport up
```

Esto lanza:

- PostgreSQL (backend + gateway + RAG)
- Redis (limitación de velocidad, caché)
- RabbitMQ (broker de tareas asíncronas)
- MinIO (almacenamiento de objetos)
- Grafana + Loki + Alloy (observabilidad)
- Servicios de Backend, Gateway y Frontend

### 5. Ejecutar el asistente de inicio

Abre la consola de administración en `http://localhost:3000` y completa el asistente de configuración.

## Perfiles de Módulos

Habilita módulos opcionales en el momento del despliegue:

```bash
llmport module enable rag     # Pipeline RAG
llmport module enable pii     # Detección de PII
llmport module enable auth    # SSO / OIDC
llmport module enable mailer  # Notificaciones por correo
llmport module enable docling # Procesamiento de documentos
llmport module enable sessions # Sesiones de chat y memoria
```

## Docker Compose

La plataforma usa perfiles de Docker Compose para el despliegue modular:

```bash
# Solo core
docker compose up -d

# Core + RAG + PII
docker compose --profile rag --profile pii up -d

# Todo
docker compose --profile rag --profile pii --profile auth --profile mailer --profile docling up -d
```

## Configuración

### Variables de Entorno

La configuración clave se gestiona a través de variables de entorno:

| Variable                | Descripción                       | Por defecto              |
| ----------------------- | --------------------------------- | ------------------------ |
| `LLM_PORT_JWT_SECRET`   | Clave de firma JWT                | Generada                 |
| `LLM_PORT_FERNET_KEY`   | Clave de cifrado de base de datos | Generada                 |
| `LLM_PORT_DB_URL`       | Cadena de conexión PostgreSQL     | `postgresql://...`       |
| `LLM_PORT_REDIS_URL`    | Cadena de conexión Redis          | `redis://localhost:6379` |
| `LLM_PORT_GATEWAY_PORT` | Puerto de escucha del Gateway     | `4000`                   |
| `LLM_PORT_BACKEND_PORT` | Puerto de escucha del Backend     | `8000`                   |

### Ajustes del Sistema

Los ajustes configurables en tiempo de ejecución se almacenan en la base de datos y se gestionan a través de la consola de administración o la API. Los cambios pueden desencadenar:

- **Recarga en vivo** — aplicado inmediatamente sin reinicio
- **Reinicio de servicio** — el servicio afectado se reinicia
- **Recreación del stack** — los servicios de Docker Compose se recrean

## Configuración de GPU

La CLI detecta automáticamente el hardware GPU durante la configuración:

```bash
llmport doctor
# La salida incluye:
# ✅ GPU NVIDIA detectada (CUDA 12.4, CC 8.9)
# ✅ Runtime GPU de Docker disponible
```

Para configuración manual de GPU, consulta la documentación de [Gestión de Runtimes LLM](/docs/features/runtimes).

![Settings](/img/screenshots/settings.png)
