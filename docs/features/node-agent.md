---
sidebar_position: 11
---

# Node Agent

The **Node Agent** (`llm_port_node_agent`) is a lightweight host-side binary that enables multi-node cluster deployments. It runs on each remote host and executes Docker runtime lifecycle commands dispatched by the backend.

## How It Works

```
Backend ◄──WebSocket──► Node Agent ──► Docker Engine (on remote host)
```

1. The agent **enrolls** with the backend using a one-time token
2. It maintains an authenticated **outbound WebSocket** connection
3. The backend dispatches runtime commands (start, stop, pull, etc.)
4. The agent executes commands locally and reports status back
5. **Heartbeat + inventory** data flows continuously to the backend

The backend remains the single authority for scheduling and placement — the agent is purely an execution arm.

## Installation

### Option A — Standalone binary (recommended)

No Python required on the target node. Pre-built binaries are available for:

| Platform | Architecture    |
| -------- | --------------- |
| Linux    | x86-64          |
| Windows  | x86-64          |
| macOS    | Universal (M1+) |

Deploy via the CLI:

```bash
llmport node agent deploy <node-address>
```

The CLI auto-detects the best binary for the target platform.

### Option B — Python package

```bash
pip install llm-port-node-agent
```

### Option C — Systemd service

A systemd unit file is included for Linux deployments:

```bash
sudo cp deploy/systemd/llm-port-node-agent.service /etc/systemd/system/
sudo systemctl enable --now llm-port-node-agent
```

## Features

- **Zero-dependency deployment** — standalone binaries built with PyInstaller
- **Automatic enrollment** — one-time token handshake with the backend
- **Command verification** — validates dispatched commands against a policy before execution
- **Event buffering** — buffers events locally if the WebSocket connection drops
- **Health supervision** — monitors local Docker Engine health and reports status
- **Log shipping** — optional forwarding to Loki (journald on Linux, Event Log on Windows)

## CLI Commands

```bash
llmport node list              # List enrolled nodes
llmport node agent deploy      # Deploy agent binary to a remote node
llmport node agent status      # Check agent status on a node
```
