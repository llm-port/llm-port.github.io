---
sidebar_position: 4
---

# Observability

**llm.Port** provides full-stack observability across the gateway, backend, and all modules.

## Langfuse Tracing

LLM-specific tracing via [Langfuse](https://langfuse.com):

- **Trace and generation events** for every gateway request
- Token usage tracking with input/output token counts
- Latency metrics including TTFT (time-to-first-token)
- Error status and upstream provider metadata

### Privacy Modes

Three configurable privacy levels:

| Mode            | What's stored                              |
| --------------- | ------------------------------------------ |
| `full`          | Complete request/response payloads         |
| `redacted`      | Payloads with PII entities masked          |
| `metadata_only` | Token counts, latency, status — no content |

## Centralized Logging

- **Loki + Alloy** log collection from all service containers
- Structured log streams with labels (service, level, tenant)
- Queryable via Grafana and the admin API
- Log retention policies configurable per environment

## Audit Logging

Every significant action is audit-logged:

- **Gateway requests**: model, tenant, tokens, latency, status, trace_id
- **Admin operations**: container actions, setting changes, user management
- **Root mode**: elevated session start/end with full action trail

## OpenTelemetry

- OpenTelemetry collector integration
- Jaeger support for distributed tracing across services
- Correlation IDs propagated through all service calls

## Dashboard

The admin console includes:

- System overview with health checks and container stats
- **Grafana panel embeds** for real-time metrics and log queries
- LLM topology graph with live trace streaming (SSE)
- Token usage summaries per tenant, model, and time window

![Dashboard](/img/screenshots/dashboard.png)

![Trace Viewer](/img/screenshots/trace.png)

![Logging](/img/screenshots/logging.png)

## Notifications & Alerts

Event-driven notification pipeline for system alerts and user workflows:

- **Outbox pattern**: persistent outbox with background dispatcher
- **Email delivery**: dedicated mailer service with Jinja2-templated messages (password reset, admin alerts, invites)
- **Alert deduplication**: fingerprint-based suppression with configurable cooldown window (30 min default)
- **Retry with backoff**: exponential retry for transient delivery failures
- **Grafana webhook integration**: system health alerts routed through the notification pipeline
