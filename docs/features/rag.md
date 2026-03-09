---
sidebar_position: 5
---

# RAG (Retrieval-Augmented Generation)

The **RAG module** (`llm_port_rag`) provides a complete document ingestion and retrieval pipeline.

## Knowledge Search

Three search strategies with automatic scoring:

| Strategy    | How it works                                             |
| ----------- | -------------------------------------------------------- |
| **Vector**  | Cosine similarity on pgvector embeddings                 |
| **Keyword** | Full-text search with ts_rank scoring                    |
| **Hybrid**  | Weighted combination of vector + keyword with RRF fusion |

All searches enforce:

- **Tenant isolation** — partitioning by tenant + optional workspace
- **ACL enforcement** — chunk-level access control principals
- **Filter support** — metadata filters on container, asset, and custom fields

## Document Pipeline

The ingestion pipeline processes uploads through a series of stages:

```
Upload → MinIO → Extract → Normalize → Chunk → Embed → Index (pgvector)
```

### Upload

- **Presigned URLs** — browser uploads directly to MinIO via presigned PUT
- **SHA-256 deduplication** — skip unchanged files on re-publish

### Extraction & Chunking

- Configurable chunk size and overlap
- Runtime embedding configuration pushed from the control plane
- Support for major document formats (PDF, DOCX, TXT, HTML, Markdown)

### Embedding

- Provider and model configurable per-deployment
- Embedding requests routed through the gateway's own provider pool
- Batch embedding for efficiency

## Virtual Containers

An N-level container tree for organizing knowledge:

- **Containers** hold assets (documents)
- **Assets** have versions with draft/publish workflow
- **Draft → Publish** model with optional scheduling

## Collector Plugins

Pluggable connectors for automatic content syncing:

| Connector          | Status                                |
| ------------------ | ------------------------------------- |
| Local folder / SMB | Available                             |
| SharePoint         | Stub (extensible)                     |
| _Custom_           | Plugin registry for custom connectors |

Collectors run on configurable schedules via Taskiq + RabbitMQ.

## Async Processing

- **Taskiq** task runner with RabbitMQ as the message broker
- Background workers for ingestion, publishing, and scheduled operations
- Job tracking with status events and progress reporting

## RAG Lite

When the full RAG module is not enabled, the gateway provides an embedded **RAG Lite** mode:

- **pgvector-based retrieval** directly from the gateway database
- Semantic search over session attachments and uploaded documents
- No separate RAG service required — ideal for lightweight deployments

See also: [Gateway — RAG Lite](/docs/features/gateway#rag-lite)

![RAG Collectors](/img/screenshots/rag_collectors.png)
