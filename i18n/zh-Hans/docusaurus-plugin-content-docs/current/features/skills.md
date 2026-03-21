---
sidebar_position: 10
---

# Skills

**Skills 注册中心**（`llm_port_skills`）管理可重用的推理 Playbook，决定系统如何处理各类请求。Skills 位于 RAG 上下文、MCP 工具和 Prompt 组合之间。

## 概念

| 层         | 角色                       |
| ---------- | -------------------------- |
| **RAG**    | 系统**知道**什么（上下文） |
| **MCP**    | 系统**能做**什么（工具）   |
| **Skills** | 系统**如何**解决任务       |

Skills 是带有 YAML Frontmatter 的 Markdown 文档。它们编码领域专业知识、分步工作流和推理模式，指导 LLM 处理特定类型请求的行为。

## Skill 格式

```markdown
---
name: code-review
version: 2
tags: [development, review]
triggers:
  - "review this code"
  - "check for bugs"
---

# 代码审查 Skill

审查代码时，遵循以下步骤：

1. 检查安全漏洞（注入、认证绕过）
2. 验证错误处理和边界情况
3. 评估性能影响
4. 审查命名和可读性
5. 给出具体改进建议并附带示例
```

## 功能特性

- **完整 CRUD** — 通过 REST API 创建、读取、更新和删除 Skills
- **版本控制** — Skills 有版本管理；保留历史版本
- **发布生命周期** — 草稿 → 已发布 → 已归档
- **导入/导出** — Skills 可作为 `.md` 文件导入和导出
- **运行时解析** — `/resolve` 端点根据请求上下文选择匹配的 Skills
- **使用遥测** — 跟踪哪些 Skills 被调用及调用频率

## 工作原理

1. 在 Prompt 组合期间，网关调用 Skills 服务的 `/resolve` 端点
2. 解析器将用户请求与 Skill 触发器和标签进行匹配
3. 匹配的 Skill 内容被注入系统 Prompt
4. LLM 在生成响应时遵循 Skill 的推理模式

## API 端点

| 端点                            | 描述                        |
| ------------------------------- | --------------------------- |
| `GET /api/admin/skills`         | 列出所有 Skills             |
| `POST /api/admin/skills`        | 创建新 Skill                |
| `PUT /api/admin/skills/{id}`    | 更新 Skill                  |
| `DELETE /api/admin/skills/{id}` | 删除 Skill                  |
| `POST /api/internal/resolve`    | 为请求解析匹配的 Skills     |
| `GET /api/admin/skills/export`  | 将 Skills 导出为 `.md` 文件 |
| `POST /api/admin/skills/import` | 从 `.md` 文件导入 Skills    |

## CLI 管理

```bash
llmport module enable skills     # 启用 Skills 模块
llmport module disable skills    # 禁用 Skills 模块
```
