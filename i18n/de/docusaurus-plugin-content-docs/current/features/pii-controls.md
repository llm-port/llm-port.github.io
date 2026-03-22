---
sidebar_position: 2
title: PII Controls
---

# PII Controls

llm.port can apply configurable PII handling controls before external model calls.

## What this helps with

- Reducing sensitive data exposure risk
- Enforcing privacy behavior consistently across workloads
- Supporting regulated use cases

## Policy model (public view)

PII behavior can be configured at system and tenant scope, with tenant-specific policy taking precedence when needed.

## Common policy outcomes

- Redact sensitive values before outbound calls
- Allow or block requests based on policy
- Preserve operational observability for governance review

## Deployment guidance

- Start with conservative defaults
- Validate policy behavior in staging
- Document exceptions and approval workflows

This public page intentionally omits internal implementation, storage, and pipeline internals.

## Screenshots

![PII Detection](/img/screenshots/pii.png)

![PII Activity Log](/img/screenshots/pii_logs.png)
