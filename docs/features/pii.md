---
sidebar_position: 3
---

# PII Detection & Redaction

The **PII module** (`llm_port_pii`) provides Presidio-based PII scanning, redaction, and reversible tokenization integrated into the gateway pipeline.

## How It Works

PII detection runs as a standalone FastAPI service that the gateway calls during request processing. When enabled, outbound requests can be scanned for personally identifiable information before they reach upstream providers.

## Entity Types

Configurable detection for:

| Entity            | Example                               |
| ----------------- | ------------------------------------- |
| `PERSON`          | John Smith                            |
| `EMAIL_ADDRESS`   | user@example.com                      |
| `PHONE_NUMBER`    | +1-555-0100                           |
| `CREDIT_CARD`     | 4111-1111-1111-1111                   |
| `US_SSN`          | 123-45-6789                           |
| `IP_ADDRESS`      | 192.168.1.1                           |
| `LOCATION`        | San Francisco, CA                     |
| _Custom entities_ | Configurable via Presidio recognizers |

## Policies

PII policies follow a **precedence hierarchy**:

1. **Tenant policy** — per-tenant overrides
2. **System default** — global baseline policy
3. **None** — PII scanning disabled

Each policy configures:

- Which entity types to detect
- Redaction strategy (mask, replace, hash)
- Fail mode behavior

## Fail Modes

| Mode       | Behavior                                         |
| ---------- | ------------------------------------------------ |
| `block`    | Reject the request if PII service is unreachable |
| `allow`    | Pass through if PII service is unreachable       |
| `fallback` | Fall back to local pattern-based detection       |

## Gateway Integration

- **Telemetry sanitization**: PII entities are redacted from Langfuse traces based on privacy mode
- **Egress control**: outbound requests can be blocked or redacted before reaching remote providers
- **Module-aware UI**: PII settings are hidden in the admin console when the module is disabled
