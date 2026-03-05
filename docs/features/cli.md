---
sidebar_position: 8
---

# CLI

The **llmport CLI** (`llm_port_cli`) is a Click-based command-line tool for installing, managing, and operating the platform.

## Installation

```bash
pip install llmport-cli
```

## Commands

### System Management

```bash
llmport up        # Start llm.Port infrastructure and services
llmport down      # Stop and remove containers and networks
llmport status    # Show the status of all services
llmport logs      # View logs from services (with follow mode)
```

### Configuration

```bash
llmport config show    # Display current configuration
llmport config set     # Set configuration values
llmport config path    # Show config file path
```

### Modules

```bash
llmport module list      # List all available modules
llmport module enable    # Enable a module (rag, pii, auth, etc.)
llmport module disable   # Disable a module
```

### Health Checks

```bash
llmport doctor    # Run comprehensive system health checks
```

The `doctor` command validates:

- Operating system compatibility
- Docker Engine and Compose versions
- GPU driver availability (NVIDIA, AMD, Intel)
- RAM and disk space
- Port availability for all services

### Developer Workflow

```bash
llmport dev init ~/projects/llm-port    # Clone repos + install deps + start infra
llmport dev up                           # Start dev environment
llmport dev status                       # Check running processes
```

### Production Installer

Interactive setup wizard with:

- GPU auto-detection
- TUI (Textual User Interface) for guided configuration
- `.env` file generation with random secret generation
- Docker Compose profile selection

### Environment Generation

```bash
llmport config env    # Generate .env files for dev or production
```

Creates `.env` files with:

- Randomly generated secrets (JWT keys, Fernet keys, database passwords)
- Service URLs and ports from the registry
- Module-specific configuration
