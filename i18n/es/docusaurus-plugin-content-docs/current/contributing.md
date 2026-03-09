---
sidebar_position: 7
---

# Contribuir

¡Las contribuciones a **llm.Port** son bienvenidas! Aquí te explicamos cómo empezar.

## Configuración del Entorno de Desarrollo

### Requisitos Previos

- Python 3.12+
- Node.js 20+
- Docker Engine 24+ con Compose V2
- Git

### Clonar y Configurar

La CLI provee una configuración de desarrollador con un solo comando:

```bash
pip install llmport-cli
llmport dev init ~/projects/llm-port
```

Esto:

1. Clonará todos los repositorios
2. Instalará las dependencias de Python y Node.js
3. Iniciará la infraestructura compartida (Postgres, Redis, etc.)
4. Ejecutará las migraciones de base de datos

### Configuración Manual

```bash
# Clonar repos
git clone https://github.com/llm-port/llm-port-backend.git
git clone https://github.com/llm-port/llm-port-frontend.git
git clone https://github.com/llm-port/llm-port-api.git
# ... (lista completa en la página de Repositorios)

# Iniciar servicios compartidos
cd llm-port-shared
docker compose up -d

# Backend
cd ../llm-port-backend
uv sync
uv run alembic upgrade head
uv run uvicorn llm_port_backend.main:app --reload

# Frontend
cd ../llm-port-frontend
npm install
npm run dev

# Gateway
cd ../llm-port-api
uv sync
uv run alembic upgrade head
uv run uvicorn llm_port_api.main:app --reload --port 4000
```

## Estilo de Código

### Python

- Formateador: `ruff format`
- Linter: `ruff check`
- Verificación de tipos: `pyright` (modo estricto)
- Tests: `pytest`

### TypeScript / React

- Formateador: Prettier
- Linter: ESLint
- Framework: React 19 + React Router + MUI + Tailwind

## Enviar Cambios

1. Crea un fork del repositorio correspondiente
2. Crea una rama de feature desde `main`
3. Realiza los cambios con tests
4. Ejecuta la suite de tests: `pytest` (Python) o `npm test` (frontend)
5. Abre un pull request con una descripción clara

## Reportar Problemas

Abre un issue en el repositorio correspondiente, o usa las [discusiones de la organización principal](https://github.com/orgs/llm-port/discussions) para temas transversales.

## Acuerdo de Licencia de Contribuidor (CLA)

Todos los contribuidores deben firmar un **Acuerdo de Licencia de Contribuidor (CLA)** antes de que su pull request pueda ser fusionado. El CLA asegura que las contribuciones estén correctamente licenciadas y que el proyecto pueda seguir distribuyéndose bajo su licencia de código abierto.

- Un bot de CLA comentará automáticamente en tu primer pull request con instrucciones de firma
- La firma es un proceso único — una vez firmado, aplica a todas las contribuciones futuras
- El CLA cubre tanto contribuciones individuales como corporativas

## Licencia

Al contribuir, aceptas que tus contribuciones serán licenciadas bajo **Apache 2.0**.
