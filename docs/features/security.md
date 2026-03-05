---
sidebar_position: 2
---

# Security & Policy

**llm.Port** provides a comprehensive security model covering authentication, authorization, encryption, and policy enforcement.

## Authentication

### JWT Tokens

- Bearer token authentication across gateway and admin APIs
- Tenant-aware claims: `sub`, `tenant_id`, `roles`, `groups`
- Configurable token expiration and refresh

### OAuth / SSO

- **OIDC / OAuth2** provider management
- Auto-registration of users on first SSO login
- Group mapping from identity provider claims to platform roles
- Multiple provider support

### Root Mode / Break-Glass

- Time-limited elevated sessions for emergency operations
- Mandatory audit trail for all root-mode actions
- Automatic expiration after configured timeout

## Authorization (RBAC)

Full **resource + action** permission model:

- **Roles**: named sets of permissions (e.g., `admin`, `viewer`, `operator`)
- **Groups**: collections of users with shared role assignments
- **Resources**: `containers`, `providers`, `models`, `rag`, `pii`, `settings`, …
- **Actions**: `read`, `write`, `delete`, `execute`, `admin`

Permissions are evaluated per-request across both the admin API and the gateway.

## Encryption

### DB-Stored Secrets

- **Fernet encryption** with a single master key
- All secrets (API keys, tokens, credentials) encrypted at rest in PostgreSQL
- No secrets stored in environment variables or config files
- Transparent encrypt/decrypt via the settings service

### Request Body Limits

- Configurable maximum payload size enforcement
- Prevents oversized requests from reaching upstream providers

## Rate Limiting

- **Redis-based fixed-window** counters for RPM and TPM
- Per-tenant policy configuration
- Atomic operations via Lua scripts for consistency

## Concurrency Control

- Distributed **per-instance leasing** via Redis + Lua scripts
- Prevents overloading individual provider instances
- Automatic lease release on completion (including errors via `finally` blocks)
