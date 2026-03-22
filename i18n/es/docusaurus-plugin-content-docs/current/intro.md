---
sidebar_position: 1
slug: /intro
---

# Primeros Pasos

**llm.Port** es una plataforma LLM todo-en-uno autoalojada que combina un gateway compatible con OpenAI, una consola de chat integrada con sesiones y memoria, un plano de control para servidores de modelos, un subsistema RAG interno, detección de PII y entrega de notificaciones — todo detrás de una única consola de operaciones.

## ¿Para quién es?

- **Equipos de Plataforma / MLOps** que necesitan un gateway autoalojado y gobernado frente a LLMs locales y remotos
- **Organizaciones con requisitos de seguridad** que necesitan inferencia on-prem con registro de auditoría completo y controles de PII
- **Desarrolladores** que quieren una API compatible con OpenAI sin dependencia de proveedor

## Inicio Rápido

### Requisitos previos

- Docker Engine 24+ con Compose V2
- 8 GB RAM (16 GB recomendado para runtimes de modelos locales)
- GPU (opcional) — NVIDIA, AMD o Intel para inferencia local

### 1. Instalar la CLI

```bash
pip install llmport-cli
```

O descargue un ejecutable independiente (no requiere Python) desde la
[página de GitHub Releases](https://github.com/llm-port/llm-port-cli/releases/latest).

### 2. Ejecutar la verificación de salud

```bash
llmport doctor
```

Valida el sistema operativo, Docker, Compose, drivers de GPU, RAM, disco y disponibilidad de puertos.

### 3. Iniciar los servicios compartidos

```bash
llmport up
```

Inicia PostgreSQL, Redis, Grafana, Loki y otra infraestructura.

### 4. Ejecutar el asistente de configuración

El backend incluye un asistente de configuración guiado que configura secretos, proveedores y ajustes del gateway en el primer arranque.

### 5. Añadir proveedores y runtimes

- **Proveedores remotos**: OpenAI, Azure OpenAI o cualquier API compatible con OpenAI
- **Runtimes locales**: vLLM, llama.cpp, Ollama, TGI — con detección automática de GPU

### 6. Apuntar las aplicaciones al gateway

```bash
curl http://localhost:4000/v1/chat/completions \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "my-alias",
    "messages": [{"role": "user", "content": "¡Hola!"}]
  }'
```

El gateway es totalmente compatible con OpenAI — cualquier SDK o herramienta que hable la API de OpenAI funciona sin cambios.

## ¿Qué sigue?

- [Arquitectura](/docs/architecture) — cómo está estructurada la plataforma
- [Funcionalidades](/docs/features/gateway) — documentación detallada de funcionalidades
- [Módulos](/docs/modules) — activar/desactivar capacidades opcionales
- [Repositorios](/docs/repos) — la estructura completa del código
