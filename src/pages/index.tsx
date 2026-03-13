import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

/* ------------------------------------------------------------------ */
/*  Feature cards                                                      */
/* ------------------------------------------------------------------ */

type FeatureItem = {
  title: string;
  icon: string;
  description: JSX.Element;
};

const features: FeatureItem[] = [
  {
    title: translate({
      id: "feature.gateway.title",
      message: "Gateway & Routing",
    }),
    icon: "🔀",
    description: (
      <Translate id="feature.gateway.description">
        {
          "OpenAI-compatible API endpoint (/v1/*) that routes to local runtimes (vLLM, llama.cpp, Ollama, TGI) and remote providers (OpenAI, Azure, …). Alias-based model resolution, SSE streaming with TTFT extraction, and automatic retry."
        }
      </Translate>
    ),
  },
  {
    title: translate({
      id: "feature.security.title",
      message: "Security & PII",
    }),
    icon: "🛡️",
    description: (
      <Translate id="feature.security.description">
        {
          "Full RBAC with JWT authentication, OAuth / SSO / OIDC, Redis rate limiting, concurrency leasing, and Fernet-encrypted DB secrets. Presidio-based PII detection with per-tenant policies, configurable entity types, and fail-safe modes."
        }
      </Translate>
    ),
  },
  {
    title: translate({
      id: "feature.observability.title",
      message: "Observability",
    }),
    icon: "📊",
    description: (
      <Translate id="feature.observability.description">
        {
          "Langfuse tracing with privacy modes, Loki + Alloy centralized logging, OpenTelemetry + Jaeger distributed tracing, and a dashboard with Grafana panel embeds. Every gateway request and admin action is audit-logged."
        }
      </Translate>
    ),
  },
  {
    title: translate({ id: "feature.rag.title", message: "RAG Pipeline" }),
    icon: "📚",
    description: (
      <Translate id="feature.rag.description">
        {
          "Multi-tenant retrieval with vector, keyword, and hybrid search. Virtual container tree with draft/publish workflows, presigned MinIO uploads, collector plugins, and async processing via Taskiq + RabbitMQ."
        }
      </Translate>
    ),
  },
  {
    title: translate({ id: "feature.ops.title", message: "Ops Console" }),
    icon: "🖥️",
    description: (
      <Translate id="feature.ops.description">
        {
          "Full container lifecycle management, image pulls with SSE progress, Compose stack deploy/rollback with revisions and audit trail. Multi-vendor GPU auto-detection (NVIDIA, AMD, Intel, Apple Metal)."
        }
      </Translate>
    ),
  },
  {
    title: translate({ id: "feature.chat.title", message: "Chat Console" }),
    icon: "💬",
    description: (
      <Translate id="feature.chat.description">
        {
          "Built-in chat with project-scoped sessions, persistent memory, file attachments, drag-and-drop session management, streaming with token usage tracking, and RAG Lite (embedded pgvector retrieval)."
        }
      </Translate>
    ),
  },
];

function Feature({ title, icon, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Comparison table                                                   */
/* ------------------------------------------------------------------ */

type ComparisonRow = {
  feature: string;
  llmport: string;
  litellm: string;
  ollama: string;
};

const comparisonData: ComparisonRow[] = [
  {
    feature: translate({ id: "comparison.gateway", message: "OpenAI-compatible Gateway" }),
    llmport: "✅",
    litellm: "✅",
    ollama: "✅",
  },
  {
    feature: translate({ id: "comparison.adminUi", message: "Admin UI & Ops Console" }),
    llmport: translate({ id: "comparison.adminUi.llmport", message: "✅ Built-in" }),
    litellm: translate({ id: "comparison.adminUi.litellm", message: "💰 Paid" }),
    ollama: "❌",
  },
  {
    feature: translate({ id: "comparison.pii", message: "PII Redaction (Presidio)" }),
    llmport: translate({ id: "comparison.pii.llmport", message: "✅ Native" }),
    litellm: "❌",
    ollama: "❌",
  },
  {
    feature: translate({ id: "comparison.rag", message: "RAG Subsystem (pgvector)" }),
    llmport: translate({ id: "comparison.rag.llmport", message: "✅ Built-in" }),
    litellm: "❌",
    ollama: "❌",
  },
  {
    feature: translate({ id: "comparison.chat", message: "Chat Console with Memory" }),
    llmport: "✅",
    litellm: "❌",
    ollama: "❌",
  },
  {
    feature: translate({ id: "comparison.gpu", message: "Multi-vendor GPU (NVIDIA, AMD, Intel)" }),
    llmport: translate({ id: "comparison.gpu.llmport", message: "✅ Auto-detect" }),
    litellm: "❌",
    ollama: "✅",
  },
  {
    feature: translate({ id: "comparison.langfuse", message: "Langfuse Tracing" }),
    llmport: translate({ id: "comparison.langfuse.llmport", message: "✅ Embedded" }),
    litellm: translate({ id: "comparison.langfuse.litellm", message: "🔌 Plugin" }),
    ollama: "❌",
  },
  {
    feature: translate({ id: "comparison.grafana", message: "Grafana + Loki Logging" }),
    llmport: translate({ id: "comparison.grafana.llmport", message: "✅ Pre-configured" }),
    litellm: "❌",
    ollama: "❌",
  },
  {
    feature: translate({ id: "comparison.rbac", message: "RBAC / JWT / OAuth SSO" }),
    llmport: "✅",
    litellm: translate({ id: "comparison.rbac.litellm", message: "💰 Partial" }),
    ollama: "❌",
  },
  {
    feature: translate({ id: "comparison.i18n", message: "i18n (EN, DE, ES, ZH)" }),
    llmport: "✅",
    litellm: "❌",
    ollama: "❌",
  },
  {
    feature: translate({ id: "comparison.cli", message: "One-command Deploy (CLI)" }),
    llmport: "✅ llmport deploy",
    litellm: "❌",
    ollama: "❌",
  },
  {
    feature: translate({ id: "comparison.license", message: "License" }),
    llmport: "Apache 2.0",
    litellm: "MIT + Paid",
    ollama: "MIT",
  },
];

/* ------------------------------------------------------------------ */
/*  Screenshot gallery                                                 */
/* ------------------------------------------------------------------ */

type Screenshot = { src: string; alt: string };

const screenshots: Screenshot[] = [
  { src: "/img/screenshots/dashboard.png", alt: "Dashboard" },
  { src: "/img/screenshots/chat.png", alt: "Chat Console" },
  { src: "/img/screenshots/containers.png", alt: "Container Management" },
  { src: "/img/screenshots/llm_providers.png", alt: "LLM Providers" },
  {
    src: "/img/screenshots/llm_provider_details.png",
    alt: "Provider Details",
  },
  {
    src: "/img/screenshots/llm_provider_local.png",
    alt: "Local Runtime",
  },
  { src: "/img/screenshots/models.png", alt: "Models" },
  { src: "/img/screenshots/logging.png", alt: "Logging" },
  { src: "/img/screenshots/trace.png", alt: "Trace Viewer" },
  {
    src: "/img/screenshots/security_overview.png",
    alt: "Security Overview",
  },
  { src: "/img/screenshots/profile.png", alt: "User Profile" },
  { src: "/img/screenshots/pii.png", alt: "PII Detection" },
  { src: "/img/screenshots/rag_kb.png", alt: "Knowledge Base" },
  { src: "/img/screenshots/rag_collectors.png", alt: "RAG Collectors" },
  { src: "/img/screenshots/scheduler.png", alt: "Scheduled Publishing" },
  { src: "/img/screenshots/modules.png", alt: "Modules" },
  { src: "/img/screenshots/settings.png", alt: "Settings" },
  { src: "/img/screenshots/api.png", alt: "API Playground" },
];

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  const { siteConfig } = useDocusaurusContext();

  // Transparency controls
  const [bgOpacity] = React.useState(0.18);
  const [blur] = React.useState(2);

  const heroStyle = {
    "--hero-bg-opacity": bgOpacity,
    "--hero-overlay-opacity": 0.72,
    "--hero-blur": `${blur}px`,
  } as React.CSSProperties;

  return (
    <header className={clsx("hero", styles.hero)} style={heroStyle}>
      <div className="container">
        {/* GTC 2026 badge */}
        <div className={styles.gtcBadge}>
          <span className={styles.gtcBadgeIcon}>🟢</span>
          <span>
            <Translate id="hero.gtcBadge">
              GTC 2026 — Inference Infrastructure for the Enterprise
            </Translate>
          </span>
        </div>

        <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <p className={styles.heroDescription}>
          <Translate id="hero.description">
            {
              "Routes, secures, and observes traffic across local LLM runtimes and remote providers — giving teams a single place to manage LLM services end-to-end."
            }
          </Translate>
        </p>

        {/* Zero-to-Inference terminal */}
        <div className={styles.terminalBlock}>
          <div className={styles.terminalTitle}>
            <span className={styles.terminalDot} style={{ background: "#ff5f57" }} />
            <span className={styles.terminalDot} style={{ background: "#febc2e" }} />
            <span className={styles.terminalDot} style={{ background: "#28c840" }} />
            <span className={styles.terminalTitleText}>Zero-to-Inference</span>
          </div>
          <pre className={styles.terminalBody}>
            <code>
              <span className={styles.terminalComment}># Install the CLI</span>
              {"\n"}
              <span className={styles.terminalPrompt}>$</span> pip install llmport-cli
              {"\n\n"}
              <span className={styles.terminalComment}># Check prerequisites &amp; deploy</span>
              {"\n"}
              <span className={styles.terminalPrompt}>$</span> llmport doctor
              {"\n"}
              <span className={styles.terminalPrompt}>$</span> llmport deploy
              {"\n\n"}
              <span className={styles.terminalComment}># Enable optional modules</span>
              {"\n"}
              <span className={styles.terminalPrompt}>$</span> llmport module enable pii
              {"\n"}
              <span className={styles.terminalPrompt}>$</span> llmport module enable rag
            </code>
          </pre>
        </div>

        <div className={styles.heroButtons}>
          <Link className="button button--primary button--lg" to="/docs/intro">
            <Translate id="hero.getStarted">Get Started</Translate>
          </Link>
          <Link
            className="button button--outline button--lg"
            href="https://github.com/llm-port"
          >
            GitHub
          </Link>
          {/* GitHub Star button */}
          <iframe
            src="https://ghbtns.com/github-btn.html?user=llm-port&repo=.github&type=star&count=true&size=large"
            width="170"
            height="30"
            title="GitHub Stars"
            className={styles.starButton}
          />
        </div>

        <p className={styles.heroLangs}>
          <Translate id="hero.languages">
            Available in English, Deutsch, Español, 中文
          </Translate>
        </p>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Architecture section                                               */
/* ------------------------------------------------------------------ */

function Architecture() {
  return (
    <section className={styles.architecture}>
      <div className="container">
        <h2 className={styles.sectionTitle}>
          <Translate id="section.architecture.title">How it Works</Translate>
        </h2>
        <div className={styles.archGrid}>
          <ArchCard
            title={translate({ id: "arch.gateway.title", message: "API Gateway" })}
            icon="🔀"
            desc={translate({
              id: "arch.gateway.desc",
              message: "OpenAI-compatible /v1/* endpoint. Routes to vLLM, llama.cpp, Ollama, TGI and remote providers (OpenAI, Azure, …). SSE streaming, alias-based model resolution, retry, and rate limiting.",
            })}
          />
          <ArchCard
            title={translate({ id: "arch.pii.title", message: "PII Layer" })}
            icon="🛡️"
            desc={translate({
              id: "arch.pii.desc",
              message: "Microsoft Presidio integration for real-time detection and redaction. Per-tenant policies with configurable entity types and fail-safe modes.",
            })}
          />
          <ArchCard
            title={translate({ id: "arch.gpu.title", message: "GPU Orchestration" })}
            icon="⚡"
            desc={translate({
              id: "arch.gpu.desc",
              message: "Auto-detects NVIDIA (CUDA), AMD (ROCm), and Intel GPUs. Spawns vLLM containers with the correct image (CUDA / ROCm / Legacy). HuggingFace cache mounting for fast model loading.",
            })}
          />
          <ArchCard
            title={translate({ id: "arch.storage.title", message: "Storage" })}
            icon="🗄️"
            desc={translate({
              id: "arch.storage.desc",
              message: "PostgreSQL with pgvector for vector search (RAG). Redis for rate limiting, session cache, and distributed leasing. MinIO for S3-compatible document storage.",
            })}
          />
          <ArchCard
            title={translate({ id: "arch.observability.title", message: "Observability" })}
            icon="📊"
            desc={translate({
              id: "arch.observability.desc",
              message: "Langfuse for LLM tracing with privacy modes. Grafana + Loki + Alloy for centralized logging. OpenTelemetry + Jaeger for distributed tracing. Prometheus metrics.",
            })}
          />
          <ArchCard
            title={translate({ id: "arch.controlplane.title", message: "Control Plane" })}
            icon="⚙️"
            desc={translate({
              id: "arch.controlplane.desc",
              message: "FastAPI backend for RBAC, settings, Docker orchestration, module lifecycle, agent infra, and Compose stack management with revision tracking.",
            })}
          />
        </div>
      </div>
    </section>
  );
}

function ArchCard({
  title,
  icon,
  desc,
}: {
  title: string;
  icon: string;
  desc: string;
}) {
  return (
    <div className={styles.archCard}>
      <div className={styles.archCardIcon}>{icon}</div>
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  GTC 2026 section                                                   */
/* ------------------------------------------------------------------ */

function GTC2026() {
  return (
    <section className={styles.gtcSection}>
      <div className="container">
        <div className={styles.gtcContent}>
          <div className={styles.gtcText}>
            <h2>
              <span className={styles.gtcLabel}>
                <Translate id="gtc.label">GTC 2026</Translate>
              </span>{" "}
              <Translate id="gtc.heading">
                Inference Infrastructure for the Enterprise
              </Translate>
            </h2>
            <p>
              <Translate id="gtc.body">
                Teams deploying the models and accelerator architectures showcased at GTC 2026 need more than a runtime — they need a secure gateway. llm.port provides the missing production layer: an OpenAI-compatible API gateway with built-in PII redaction, RBAC, and full observability — all running inside your private VPC. No data leaves your perimeter.
              </Translate>
            </p>
            <ul className={styles.gtcFeatures}>
              <li>
                <Translate id="gtc.feature.gateway">
                  Secure API gateway with rate limiting, retry, and alias-based model routing
                </Translate>
              </li>
              <li>
                <Translate id="gtc.feature.pii">
                  PII redaction before ingress and egress — Microsoft Presidio-powered
                </Translate>
              </li>
              <li>
                <Translate id="gtc.feature.gpu">
                  Multi-vendor GPU auto-detection (NVIDIA CUDA, AMD ROCm, Intel) with automatic vLLM image selection
                </Translate>
              </li>
              <li>
                <Translate id="gtc.feature.observability">
                  Enterprise observability: Langfuse LLM tracing, Grafana dashboards, and OpenTelemetry
                </Translate>
              </li>
              <li>
                <Translate id="gtc.feature.sovereign">
                  Air-gapped, sovereign deployment — no external cloud dependency
                </Translate>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Comparison table section                                           */
/* ------------------------------------------------------------------ */

function ComparisonTable() {
  return (
    <section className={styles.comparison}>
      <div className="container">
        <h2 className={styles.sectionTitle}>
          <Translate id="section.comparison.title">
            How llm.port Compares
          </Translate>
        </h2>
        <div className={styles.tableWrapper}>
          <table className={styles.comparisonTable}>
            <thead>
              <tr>
                <th>{translate({ id: "comparison.header.feature", message: "Feature" })}</th>
                <th className={styles.highlight}>llm.port</th>
                <th>LiteLLM</th>
                <th>Ollama</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.feature}</td>
                  <td className={styles.highlight}>{row.llmport}</td>
                  <td>{row.litellm}</td>
                  <td>{row.ollama}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Roadmap section                                                    */
/* ------------------------------------------------------------------ */

function Roadmap() {
  return (
    <section className={styles.roadmap}>
      <div className="container">
        <h2 className={styles.sectionTitle}>
          <Translate id="section.roadmap.title">Roadmap</Translate>
        </h2>
        <div className={styles.roadmapGrid}>
          <RoadmapItem
            title={translate({ id: "roadmap.docling.title", message: "Advanced OCR (Docling)" })}
            desc={translate({ id: "roadmap.docling.desc", message: "IBM Docling for rich document extraction — tables, images, pages. Service scaffold exists; integration with RAG pipeline in progress." })}
            status={translate({ id: "roadmap.status.inProgress", message: "In Progress" })}
          />
          <RoadmapItem
            title={translate({ id: "roadmap.auth.title", message: "Auth Service (SSO / OIDC)" })}
            desc={translate({ id: "roadmap.auth.desc", message: "Dedicated auth service for external identity provider management. Framework and compose profile defined." })}
            status={translate({ id: "roadmap.status.planned", message: "Planned" })}
          />
          <RoadmapItem
            title={translate({ id: "roadmap.mailer.title", message: "Mailer Service" })}
            desc={translate({ id: "roadmap.mailer.desc", message: "Dedicated email delivery service for password resets, admin alerts, and system invites." })}
            status={translate({ id: "roadmap.status.planned", message: "Planned" })}
          />
          <RoadmapItem
            title={translate({ id: "roadmap.ee.title", message: "Enterprise Pro Modules" })}
            desc={translate({ id: "roadmap.ee.desc", message: "License framework ready (Ed25519 JWT). Pro implementations for PII, RAG, and Gateway coming soon." })}
            status={translate({ id: "roadmap.status.planned", message: "Planned" })}
          />
          <RoadmapItem
            title={translate({ id: "roadmap.runtimes.title", message: "More Runtimes" })}
            desc={translate({ id: "roadmap.runtimes.desc", message: "TensorRT-LLM, SGLang, and additional managed API providers." })}
            status={translate({ id: "roadmap.status.planned", message: "Planned" })}
          />
          <RoadmapItem
            title={translate({ id: "roadmap.costs.title", message: "Fine-grained Cost Controls" })}
            desc={translate({ id: "roadmap.costs.desc", message: "Usage analytics per tenant, model, and user with budget limits and chargeback support." })}
            status={translate({ id: "roadmap.status.planned", message: "Planned" })}
          />
        </div>
      </div>
    </section>
  );
}

function RoadmapItem({
  title,
  desc,
  status,
}: {
  title: string;
  desc: string;
  status: string;
}) {
  return (
    <div className={styles.roadmapCard}>
      <span
        className={clsx(
          styles.roadmapBadge,
          status === "In Progress" && styles.roadmapInProgress,
        )}
      >
        {status}
      </span>
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Home" description={siteConfig.tagline}>
      <Hero />

      {/* Architecture — How it Works */}
      <Architecture />

      {/* Features */}
      <section className={styles.features}>
        <div className="container">
          <h2 className={styles.sectionTitle}>
            <Translate id="section.features.title">What it does</Translate>
          </h2>
          <div className="row">
            {features.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <ComparisonTable />

      {/* Why llm.port */}
      <section className={styles.whySection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>
            <Translate id="section.why.title">Why llm.port</Translate>
          </h2>
          <p className={styles.whyText}>
            <strong>
              <Translate id="section.why.bold">
                Sovereign-by-default AI
              </Translate>
            </strong>
            {" — "}
            <Translate id="section.why.text">
              {
                "keep data on-prem when needed, use remote providers when allowed, without changing your apps or losing governance and observability. One platform replaces a patchwork of proxies, dashboards, and scripts."
              }
            </Translate>
          </p>
        </div>
      </section>

      {/* GTC 2026 */}
      <GTC2026 />

      {/* Roadmap */}
      <Roadmap />

      {/* Screenshots */}
      <section className={styles.screenshots}>
        <div className="container">
          <h2 className={styles.sectionTitle}>
            <Translate id="section.screenshots.title">Screenshots</Translate>
          </h2>
          <div className={styles.screenshotGrid}>
            {screenshots.map((s, idx) => (
              <div key={idx} className={styles.screenshotCard}>
                <img src={s.src} alt={s.alt} loading="lazy" />
                <span className={styles.screenshotLabel}>{s.alt}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise call-out */}
      <section className={styles.enterprise}>
        <div className="container">
          <p className={styles.enterpriseText}>
            <strong>
              <Translate id="section.enterprise.bold">
                Enterprise features available
              </Translate>
            </strong>{" "}
            <Translate id="section.enterprise.text">
              {
                "for teams that need SSO, advanced PII tokenization, and governance."
              }
            </Translate>{" "}
            <Link href="https://emagin8.de/contact?subject=llm.Port">
              <Translate id="section.enterprise.cta">Get in touch →</Translate>
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
