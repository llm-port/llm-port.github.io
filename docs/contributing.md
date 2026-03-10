---
sidebar_position: 7
---

# Contributing

Contributions to **llm.Port** are welcome! Here's how to get started.

## Development Setup

### Prerequisites

- Python 3.12+
- Node.js 20+
- Docker Engine 24+ with Compose V2
- Git
- [uv](https://docs.astral.sh/uv/) (recommended Python package manager)

### Automated setup via CLI

```bash
pip install llmport-cli

# Check and optionally install missing prerequisites
llmport doctor

# Bootstrap the full workspace
llmport dev init ~/projects/llm-port

# Start development servers
llmport dev up
```

Open **http://localhost:5173** — log in with `admin@localhost` / `admin`.

See the [Deployment guide](/docs/deployment) for all available flags and options.

### Manual setup

```bash
# Clone repos
git clone https://github.com/llm-port/llm-port-backend.git
git clone https://github.com/llm-port/llm-port-frontend.git
git clone https://github.com/llm-port/llm-port-api.git
# ... (see Repositories page for full list)

# Start shared services
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

## Code Style

### Python

- Formatter: `ruff format`
- Linter: `ruff check`
- Type checking: `pyright` (strict mode)
- Tests: `pytest`

### TypeScript / React

- Formatter: Prettier
- Linter: ESLint
- Framework: React 19 + React Router + MUI + Tailwind

## Submitting Changes

1. Fork the relevant repository
2. Create a feature branch from `main`
3. Make your changes with tests
4. Run the test suite: `pytest` (Python) or `npm test` (frontend)
5. Open a pull request with a clear description

## Reporting Issues

Open an issue in the relevant repository, or use the [main org discussions](https://github.com/orgs/llm-port/discussions) for cross-cutting topics.

## Contributor License Agreement (CLA)

All contributors must sign a **Contributor License Agreement (CLA)** before their pull request can be merged. The CLA ensures that contributions are properly licensed and that the project can continue to be distributed under its open-source license.

- A CLA bot will automatically comment on your first pull request with signing instructions
- Signing is a one-time process — once signed, it applies to all future contributions
- The CLA covers both individual and corporate contributions

## License

By contributing, you agree that your contributions will be licensed under **Apache 2.0**.
