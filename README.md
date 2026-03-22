# llm.port Public Docs Draft

This folder contains a **public-facing documentation set** designed for a separate Docusaurus repository.

## Goals

- Product-first onboarding and adoption
- Clear technical guidance for integration and operations
- Strong trust and security communication
- No deep internal architecture or sensitive implementation detail

## Included

- Proposed public docs folder structure (`docs/`)
- Rewritten public pages for all items previously classified `PUBLIC_REWRITE`
- Internal-only handling recommendations
- Public `sidebars.ts`

## Terminology (used consistently)

- **Gateway**: OpenAI-compatible API endpoint for apps
- **Control Plane**: Admin and configuration layer
- **Module**: Optional capability you can enable
- **Runtime**: Local model execution engine
- **Provider**: Remote or local model source
- **Workspace**: Logical organization scope for teams and data
