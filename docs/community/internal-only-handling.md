---
sidebar_position: 2
title: Internal-Only Content Handling
---

# Internal-Only Content Handling

This page defines what happens to pages previously classified as `INTERNAL_ONLY`.

## `docs/call-sequences.md`

- **Public action**: Omit from public docs
- **Replacement**: Optional short summary in `overview/platform-overview.md`
- **Public reference style**: Conceptual request lifecycle only, no deep sequence internals

## `docs/repos.md`

- **Public action**: Omit from public docs
- **Replacement**: Keep high-level capabilities in `overview/modules-and-editions.md`
- **Public reference style**: Avoid repository-level decomposition details

## `.github/profile/architecture.md`

- **Public action**: Omit from public docs
- **Replacement**: Covered conceptually by `overview/platform-overview.md`
- **Public reference style**: Product-level component roles only

## `.github/profile/call-sequence.md`

- **Public action**: Omit from public docs
- **Replacement**: None required beyond high-level flow narrative
- **Public reference style**: No protocol-by-protocol sequence details

## `.github/profile/README.md`

- **Public action**: Omit from public docs
- **Replacement**: Public homepage and `overview/intro.md`
- **Public reference style**: Outcomes and capabilities, not internal inventory
