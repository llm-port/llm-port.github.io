---
sidebar_position: 2
title: Install the CLI
---

# Install the CLI

The llm.port CLI is the fastest way to install, operate, and troubleshoot your deployment.

## Option A: Install from PyPI

```bash
pip install llmport-cli
```

PyPI: https://pypi.org/project/llmport-cli/

## Option B: Install via uv

```bash
uv tool install llmport-cli
```

## Option C: Use a standalone binary

Download the latest binary release for your operating system from GitHub Releases.

## Verify installation

```bash
llmport --help
llmport doctor
```

## Core day-1 commands

```bash
llmport up
llmport status
llmport logs -f
llmport down
```

For full command coverage, see [CLI Reference](../reference/cli-reference.md).
