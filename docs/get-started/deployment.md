---
sidebar_position: 3
title: Deployment Guide
---

# Deployment Guide

This page covers public, production-focused deployment guidance.

## Deployment outcomes

A successful deployment gives you:

- A reachable Gateway endpoint for app traffic
- Access to the admin console
- Baseline policy and security controls enabled
- Operational visibility for logs and system health

## Recommended rollout path

1. Validate host readiness with `llmport doctor`
2. Deploy baseline services with `llmport deploy <path>`
3. Configure authentication and provider settings
4. Run smoke tests through the Gateway
5. Enable optional modules as needed

## Example deployment command

```bash
llmport deploy /opt/llm-port
```

## Post-deploy checklist

- Store bootstrap credentials securely
- Rotate default credentials and tokens
- Configure backup and restore strategy
- Enable observability and alerting workflows
- Document operational ownership and support runbook

## Scope of this public page

This page intentionally avoids internal orchestration mechanics and low-level implementation internals.
For deep operational internals, use internal documentation.
