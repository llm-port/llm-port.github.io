---
sidebar_position: 11
---

# Agente de Nodo

El **Agente de Nodo** (`llm_port_node_agent`) es un binario ligero del lado del host que permite despliegues de clusters multi-nodo. Se ejecuta en cada host remoto y ejecuta comandos del ciclo de vida de Docker runtime despachados por el backend.

## Cómo Funciona

```
Backend ◄──WebSocket──► Agente de Nodo ──► Docker Engine (en host remoto)
```

1. El agente se **registra** con el backend usando un token de un solo uso
2. Mantiene una conexión **WebSocket saliente** autenticada
3. El backend despacha comandos de runtime (start, stop, pull, etc.)
4. El agente ejecuta comandos localmente e informa el estado
5. Los datos de **heartbeat + inventario** fluyen continuamente al backend

El backend sigue siendo la única autoridad para scheduling y placement — el agente es puramente un brazo de ejecución.

## Instalación

### Opción A — Binario independiente (recomendado)

No se requiere Python en el nodo destino. Binarios precompilados disponibles para:

| Plataforma | Arquitectura    |
| ---------- | --------------- |
| Linux      | x86-64          |
| Windows    | x86-64          |
| macOS      | Universal (M1+) |

Despliegue vía CLI:

```bash
llmport node agent deploy <dirección-del-nodo>
```

La CLI detecta automáticamente el mejor binario para la plataforma destino.

### Opción B — Paquete Python

```bash
pip install llm-port-node-agent
```

### Opción C — Servicio systemd

Se incluye un archivo de unidad systemd para despliegues en Linux:

```bash
sudo cp deploy/systemd/llm-port-node-agent.service /etc/systemd/system/
sudo systemctl enable --now llm-port-node-agent
```

## Características

- **Despliegue sin dependencias** — binarios independientes construidos con PyInstaller
- **Registro automático** — handshake con token de un solo uso con el backend
- **Verificación de comandos** — valida comandos despachados contra una política antes de ejecutar
- **Buffering de eventos** — almacena eventos localmente si la conexión WebSocket se cae
- **Supervisión de salud** — monitorea la salud del Docker Engine local e informa el estado
- **Envío de logs** — reenvío opcional a Loki (journald en Linux, Event Log en Windows)

## Comandos CLI

```bash
llmport node list              # Listar nodos registrados
llmport node agent deploy      # Desplegar binario del agente a un nodo remoto
llmport node agent status      # Verificar estado del agente en un nodo
```
