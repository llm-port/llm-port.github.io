import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

type FeatureItem = {
  title: string;
  description: string;
};

const features: FeatureItem[] = [
  {
    title: "OpenAI-Compatible Gateway",
    description:
      "Integrate existing SDKs and apps through one endpoint with model aliases and policy-aware routing.",
  },
  {
    title: "Security and Trust",
    description:
      "Apply role-based access, privacy controls, and auditable operations across your AI workloads.",
  },
  {
    title: "Modular Platform",
    description:
      "Enable capabilities like RAG, MCP tools, and multi-node operations as your requirements grow.",
  },
  {
    title: "Operational Visibility",
    description:
      "Monitor health, usage, and reliability from a single control plane built for platform teams.",
  },
];

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">
          Self-hosted LLM platform for governed AI operations
        </p>
        <p>
          Run local and remote LLM workloads through one OpenAI-compatible
          Gateway with policy control, observability, and modular deployment
          options.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/get-started/quickstart"
          >
            Get Started
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/docs/integrate/api-gateway"
          >
            Integration Guide
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeatureCard({ title, description }: FeatureItem) {
  return (
    <div className={clsx("col col--6")}>
      <div className={styles.featureCard}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function HomepageFeatures() {
  return (
    <main>
      <section className={styles.features}>
        <div className="container">
          <div className="row">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default function Home(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="Public documentation for llm.port"
    >
      <HomepageHeader />
      <HomepageFeatures />
    </Layout>
  );
}
