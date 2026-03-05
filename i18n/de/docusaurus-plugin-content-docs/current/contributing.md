---
sidebar_position: 7
---

# Beitragen

Beiträge zu **llm.Port** sind willkommen! Hier erfahren Sie, wie Sie beginnen können.

## Entwicklungsumgebung einrichten

### Voraussetzungen

- Python 3.12+
- Node.js 20+
- Docker Engine 24+ mit Compose V2
- Git

### Klonen und Initialisieren

Die CLI bietet ein Einzel-Befehl-Entwickler-Setup:

```bash
pip install llmport-cli
llmport dev init ~/projects/llm-port
```

Dies wird:

1. Alle Repositories klonen
2. Python- und Node.js-Abhängigkeiten installieren
3. Gemeinsame Infrastruktur starten (Postgres, Redis usw.)
4. Datenbankmigrationen ausführen

### Manuelle Einrichtung

```bash
# Repos klonen
git clone https://github.com/llm-port/llm-port-backend.git
git clone https://github.com/llm-port/llm-port-frontend.git
git clone https://github.com/llm-port/llm-port-api.git
# ... (vollständige Liste auf der Repositories-Seite)

# Gemeinsame Services starten
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

## Code-Stil

### Python

- Formatter: `ruff format`
- Linter: `ruff check`
- Typprüfung: `pyright` (strikter Modus)
- Tests: `pytest`

### TypeScript / React

- Formatter: Prettier
- Linter: ESLint
- Framework: React 19 + React Router + MUI + Tailwind

## Änderungen einreichen

1. Das betreffende Repository forken
2. Einen Feature-Branch von `main` erstellen
3. Änderungen mit Tests vornehmen
4. Die Testsuite ausführen: `pytest` (Python) oder `npm test` (Frontend)
5. Einen Pull Request mit einer klaren Beschreibung öffnen

## Probleme melden

Ein Issue im betreffenden Repository eröffnen oder die [Hauptdiskussionen der Organisation](https://github.com/orgs/llm-port/discussions) für übergreifende Themen nutzen.

## Lizenz

Mit einem Beitrag stimmen Sie zu, dass Ihre Beiträge unter **Apache 2.0** lizenziert werden.
