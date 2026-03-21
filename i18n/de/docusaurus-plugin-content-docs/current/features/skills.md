---
sidebar_position: 10
---

# Skills

Die **Skills-Registry** (`llm_port_skills`) verwaltet wiederverwendbare Reasoning-Playbooks, die bestimmen, wie das System bestimmte Anfrageklassen bearbeitet. Skills stehen zwischen RAG-Kontext, MCP-Tools und Prompt-Komposition.

## Konzept

| Ebene      | Rolle                                      |
| ---------- | ------------------------------------------ |
| **RAG**    | Was das System **weiß** (Kontext)          |
| **MCP**    | Was das System **tun kann** (Tools)        |
| **Skills** | **Wie** das System eine Aufgabe lösen soll |

Skills sind Markdown-Dokumente mit YAML-Frontmatter. Sie kodieren Domänenexpertise, schrittweise Workflows und Reasoning-Muster, die das Verhalten des LLMs bei bestimmten Anfragen steuern.

## Skill-Format

```markdown
---
name: code-review
version: 2
tags: [development, review]
triggers:
  - "review this code"
  - "check for bugs"
---

# Code Review Skill

Beim Code-Review folge diesen Schritten:

1. Auf Sicherheitslücken prüfen (Injection, Auth-Bypass)
2. Fehlerbehandlung und Randfälle verifizieren
3. Performance-Auswirkungen bewerten
4. Benennung und Lesbarkeit prüfen
5. Konkrete Verbesserungen mit Beispielen vorschlagen
```

## Funktionen

- **Vollständiges CRUD** — Skills über REST-API erstellen, lesen, aktualisieren und löschen
- **Versionierung** — Skills werden versioniert; frühere Versionen bleiben erhalten
- **Veröffentlichungs-Lifecycle** — Entwurf → Veröffentlicht → Archiviert
- **Import/Export** — Skills können als `.md`-Dateien importiert und exportiert werden
- **Laufzeit-Auflösung** — Der `/resolve`-Endpunkt wählt passende Skills basierend auf dem Anfrage-Kontext
- **Nutzungs-Telemetrie** — Erfassung, welche Skills aufgerufen werden und wie oft

## Funktionsweise

1. Während der Prompt-Komposition ruft das Gateway den Skills-Service `/resolve`-Endpunkt auf
2. Der Resolver gleicht die Benutzeranfrage mit Skill-Triggern und Tags ab
3. Passende Skill-Inhalte werden in den System-Prompt eingefügt
4. Das LLM folgt dem Reasoning-Muster des Skills bei der Antwortgenerierung

## API-Endpunkte

| Endpunkt                        | Beschreibung                            |
| ------------------------------- | --------------------------------------- |
| `GET /api/admin/skills`         | Alle Skills auflisten                   |
| `POST /api/admin/skills`        | Neuen Skill erstellen                   |
| `PUT /api/admin/skills/{id}`    | Skill aktualisieren                     |
| `DELETE /api/admin/skills/{id}` | Skill löschen                           |
| `POST /api/internal/resolve`    | Passende Skills für eine Anfrage finden |
| `GET /api/admin/skills/export`  | Skills als `.md`-Dateien exportieren    |
| `POST /api/admin/skills/import` | Skills aus `.md`-Dateien importieren    |

## CLI-Verwaltung

```bash
llmport module enable skills     # Skills-Modul aktivieren
llmport module disable skills    # Skills-Modul deaktivieren
```
