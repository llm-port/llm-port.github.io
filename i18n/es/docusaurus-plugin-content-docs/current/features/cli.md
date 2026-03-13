---
sidebar_position: 8
---

# CLI

La **CLI de llmport** (`llm_port_cli`) es una herramienta de línea de comandos basada en Click para instalar, gestionar y operar la plataforma.

## Instalación

### Opción A — Paquete Python (PyPI)

Requiere Python 3.12+.

```bash
pip install llmport-cli
```

O con [uv](https://docs.astral.sh/uv/):

```bash
uv tool install llmport-cli
```

### Opción B — Ejecutable independiente

No requiere Python. Descargue el binario para su plataforma desde la
[última versión de GitHub](https://github.com/llm-port/llm-port-cli/releases/latest):

| Plataforma | Archivo | Arquitectura |
|---|---|---|
| Linux | `llmport-linux-amd64` | x86-64 |
| Windows | `llmport-windows-amd64.exe` | x86-64 |
| macOS | `llmport-macos-arm64` | Apple Silicon (M1+) |

#### Linux / macOS

```bash
# Descargar (ejemplo para Linux)
curl -LO https://github.com/llm-port/llm-port-cli/releases/latest/download/llmport-linux-amd64

# Hacer ejecutable y mover al PATH
chmod +x llmport-linux-amd64
sudo mv llmport-linux-amd64 /usr/local/bin/llmport
```

#### Windows

Descargue `llmport-windows-amd64.exe` desde la página de releases y colóquelo en
un directorio de su `PATH`, o ejecútelo directamente:

```powershell
.\llmport-windows-amd64.exe doctor
```

:::tip
Los ejecutables independientes se generan automáticamente en cada release usando
PyInstaller y se adjuntan al
[GitHub Release](https://github.com/llm-port/llm-port-cli/releases) correspondiente.
:::

## Comandos

### Gestión del Sistema

```bash
llmport up        # Iniciar la infraestructura y servicios de llm.port
llmport down      # Detener y eliminar contenedores y redes
llmport status    # Mostrar el estado de todos los servicios
llmport logs      # Ver logs de los servicios (con modo seguimiento)
```

### Configuración

```bash
llmport config show    # Mostrar la configuración actual
llmport config set     # Establecer valores de configuración
llmport config path    # Mostrar la ruta del archivo de configuración
```

### Módulos

```bash
llmport module list      # Listar todos los módulos disponibles
llmport module enable    # Habilitar un módulo (rag, pii, auth, etc.)
llmport module disable   # Deshabilitar un módulo
```

### Comprobaciones de Salud

```bash
llmport doctor    # Ejecutar comprobaciones de salud del sistema
```

El comando `doctor` valida:

- Compatibilidad del sistema operativo
- Versiones de Docker Engine y Compose
- Disponibilidad del driver de GPU (NVIDIA, AMD, Intel)
- RAM y espacio en disco
- Disponibilidad de puertos para todos los servicios

### Auto-Tune

```bash
llmport tune    # Benchmark del host y auto-configuración de recursos
```

El comando `tune` analiza los recursos de CPU, memoria y disco disponibles y genera una configuración óptima:

- **Cantidad de workers** para servicios de backend, gateway y RAG
- **Tamaños de pool de base de datos** según la memoria disponible
- **Límites de recursos** para contenedores Docker
- Produce un informe de tuning con valores `.env` recomendados

### Flujo de Trabajo del Desarrollador

```bash
llmport dev init ~/projects/llm-port    # Clonar repos + instalar deps + iniciar infra
llmport dev up                           # Iniciar entorno de desarrollo
llmport dev status                       # Comprobar procesos en ejecución
```

### Instalador de Producción

Asistente de configuración interactivo con:

- Autodetección de GPU
- TUI (Interfaz de Usuario Textual) para configuración guiada
- Generación de archivos `.env` con generación aleatoria de secretos
- Selección de perfiles de Docker Compose

### Generación de Entorno

```bash
llmport config env    # Generar archivos .env para dev o producción
```

Crea archivos `.env` con:

- Secretos generados aleatoriamente (claves JWT, claves Fernet, contraseñas de base de datos)
- URLs y puertos de servicios del registro
- Configuración específica de módulos
