---
sidebar_position: 2
title: Platform Overview
---

# Platform Overview

llm.port is organized into a few product-level building blocks.

## Gateway

The **Gateway** exposes an OpenAI-compatible API so existing SDKs and clients can work with minimal changes.

## Control Plane

The **Control Plane** gives operators a central place to configure providers, manage modules, and monitor system health.

## Optional Modules

Modules let you enable only the capabilities you need (for example RAG, PII controls, and integration add-ons).

## Data and trust model

- Policies are enforced before requests leave the platform
- Audit and telemetry are available for operations and governance
- Privacy behavior is configurable by deployment requirements

## Deployment model

llm.port supports single-host and multi-node deployments, with a consistent admin experience in both modes.

## Public architecture principle

This documentation focuses on **capabilities and outcomes** rather than internal implementation topology.
For deeper implementation details, keep internal docs as the engineering source of truth.
