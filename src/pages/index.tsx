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
    title: translate({ id: "feature.cli.title", message: "CLI & Automation" }),
    icon: "⌨️",
    description: (
      <Translate id="feature.cli.description">
        {
          "llmport up/down/status/logs, interactive production installer with GPU auto-detection and TUI, dev init for full developer workspace setup, doctor health checks, and .env generation."
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
/*  Screenshot gallery                                                 */
/* ------------------------------------------------------------------ */

type Screenshot = { src: string; alt: string };

const screenshots: Screenshot[] = [
  { src: "/img/screenshots/dashboard.png", alt: "Dashboard" },
  { src: "/img/screenshots/containers.png", alt: "Container Management" },
  { src: "/img/screenshots/llm_providers.png", alt: "LLM Providers" },
  {
    src: "/img/screenshots/llm_provider_details.png",
    alt: "Provider Details",
  },
  { src: "/img/screenshots/models.png", alt: "Models" },
  { src: "/img/screenshots/logging.png", alt: "Logging" },
  { src: "/img/screenshots/trace.png", alt: "Trace Viewer" },
  {
    src: "/img/screenshots/security_overview.png",
    alt: "Security Overview",
  },
  { src: "/img/screenshots/pii.png", alt: "PII Detection" },
  { src: "/img/screenshots/rag_collectors.png", alt: "RAG Collectors" },
  { src: "/img/screenshots/modules.png", alt: "Modules" },
  { src: "/img/screenshots/settings.png", alt: "Settings" },
  { src: "/img/screenshots/api.png", alt: "API Playground" },
];

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  const { siteConfig } = useDocusaurusContext();
  const showHeroControls = false;

  // Transparency controls – tune these defaults or drag the sliders
  const [bgOpacity, setBgOpacity] = React.useState(0.18);
  const [overlayOpacity, setOverlayOpacity] = React.useState(0.72);
  const [blur, setBlur] = React.useState(2);
  const [showControls, setShowControls] = React.useState(true);

  const heroStyle = {
    "--hero-bg-opacity": bgOpacity,
    "--hero-overlay-opacity": overlayOpacity,
    "--hero-blur": `${blur}px`,
  } as React.CSSProperties;

  return (
    <header className={clsx("hero", styles.hero)} style={heroStyle}>
      {/* Transparency control panel — toggle with the ⚙ button */}
      {showHeroControls && showControls && (
        <div className={styles.heroControls}>
          <div className={styles.controlRow}>
            <label>bg opacity</label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={bgOpacity}
              onChange={(e) => setBgOpacity(Number(e.target.value))}
            />
            <span>{bgOpacity.toFixed(2)}</span>
          </div>
          <div className={styles.controlRow}>
            <label>overlay</label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={overlayOpacity}
              onChange={(e) => setOverlayOpacity(Number(e.target.value))}
            />
            <span>{overlayOpacity.toFixed(2)}</span>
          </div>
          <div className={styles.controlRow}>
            <label>blur (px)</label>
            <input
              type="range"
              min={0}
              max={20}
              step={0.5}
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
            />
            <span>{blur.toFixed(1)}</span>
          </div>
        </div>
      )}

      {showHeroControls && (
        <button
          onClick={() => setShowControls((v) => !v)}
          aria-label="Toggle transparency controls"
          style={{
            position: "absolute",
            top: "0.75rem",
            right: showControls ? "0.75rem" : "0.75rem",
            zIndex: 20,
            background: "rgba(0,0,0,0.4)",
            border: "none",
            color: "#fff",
            borderRadius: "50%",
            width: 28,
            height: 28,
            cursor: "pointer",
            fontSize: "0.85rem",
            display: showControls ? "none" : "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          title="Show transparency controls"
        >
          ⚙
        </button>
      )}

      <div className="container">
        <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <p className={styles.heroDescription}>
          <Translate id="hero.description">
            {
              "Routes, secures, and observes traffic across local LLM runtimes and remote providers — giving teams a single place to manage LLM services end-to-end."
            }
          </Translate>
        </p>
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
        </div>
      </div>
    </header>
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
