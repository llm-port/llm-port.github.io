---
sidebar_position: 2
title: MCP Tools
---

# MCP Tools

llm.port supports governed use of Model Context Protocol (MCP) tools so assistants can safely call external capabilities.

## What MCP gives you

- Tool discovery and registration
- Controlled tool invocation
- Consistent governance behavior across tool calls

## Typical tool categories

- Web search
- Content retrieval and extraction
- Domain-specific internal tools

## Trust and control expectations

- Apply access policies before enabling tools in production
- Review tool outputs in observability workflows
- Restrict tool access by environment and role

## Rollout recommendations

1. Start with a small trusted tool set
2. Validate behavior in staging
3. Expand tool scope gradually with audit review

This page focuses on public integration patterns and excludes internal broker implementation details.
