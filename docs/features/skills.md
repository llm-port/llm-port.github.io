---
sidebar_position: 10
---

# Skills

The **Skills Registry** (`llm_port_skills`) manages reusable reasoning playbooks that shape how the system handles classes of requests. Skills sit between RAG context, MCP tools, and prompt composition.

## Concept

| Layer      | Role                                   |
| ---------- | -------------------------------------- |
| **RAG**    | What the system **knows** (context)    |
| **MCP**    | What the system **can do** (tools)     |
| **Skills** | **How** the system should solve a task |

Skills are Markdown documents with YAML frontmatter. They encode domain expertise, step-by-step workflows, and reasoning patterns that guide the LLM's behavior for specific types of requests.

## Skill Format

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

When reviewing code, follow these steps:

1. Check for security vulnerabilities (injection, auth bypass)
2. Verify error handling and edge cases
3. Assess performance implications
4. Review naming and readability
5. Suggest specific improvements with examples
```

## Features

- **Full CRUD** — Create, read, update, and delete skills via REST API
- **Versioning** — Skills are versioned; previous versions are retained
- **Publish/Archive lifecycle** — Draft → Published → Archived workflow
- **Import/Export** — Skills can be imported and exported as `.md` files
- **Runtime resolution** — The `/resolve` endpoint selects matching skills based on request context
- **Usage telemetry** — Track which skills are invoked and how often

## How It Works

1. During prompt composition, the gateway calls the Skills service `/resolve` endpoint
2. The resolver matches the user's request against skill triggers and tags
3. Matched skill content is injected into the system prompt
4. The LLM follows the skill's reasoning pattern when generating a response

## API Endpoints

| Endpoint                        | Description                           |
| ------------------------------- | ------------------------------------- |
| `GET /api/admin/skills`         | List all skills                       |
| `POST /api/admin/skills`        | Create a new skill                    |
| `PUT /api/admin/skills/{id}`    | Update a skill                        |
| `DELETE /api/admin/skills/{id}` | Delete a skill                        |
| `POST /api/internal/resolve`    | Resolve matching skills for a request |
| `GET /api/admin/skills/export`  | Export skills as `.md` files          |
| `POST /api/admin/skills/import` | Import skills from `.md` files        |

## CLI Management

```bash
llmport module enable skills     # Enable the Skills module
llmport module disable skills    # Disable the Skills module
```
