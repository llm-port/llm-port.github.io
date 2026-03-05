---
sidebar_position: 8
---

# CLI

La **CLI de llmport** (`llm_port_cli`) es una herramienta de línea de comandos basada en Click para instalar, gestionar y operar la plataforma.

## Instalación

```bash
pip install llmport-cli
```

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
