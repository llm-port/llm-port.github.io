---
sidebar_position: 1
title: CLI Reference
---

# CLI Reference

This page summarizes commonly used public CLI commands.

## Platform lifecycle

```bash
llmport up
llmport down
llmport status
llmport logs -f
```

## Health and diagnostics

```bash
llmport doctor
```

## Deployment

```bash
llmport deploy <install-path>
```

## Module operations

```bash
llmport module list
llmport module enable <module>
llmport module disable <module>
```

## Notes

- Use environment-specific credentials and tokens
- Keep production command execution restricted to approved operators
- Advanced and internal-only operational flags should remain in internal runbooks
