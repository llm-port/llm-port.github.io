import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const organizationName = process.env.GITHUB_ORG ?? "llm-port";
const projectName = process.env.GITHUB_PROJECT ?? "github.io";
const isUserSite = projectName === `${organizationName}.github.io`;
const docsUrl = process.env.DOCS_URL ?? `https://${organizationName}.github.io`;
const docsBaseUrl =
  process.env.DOCS_BASE_URL ?? (isUserSite ? "/" : `/${projectName}/`);

const config: Config = {
  title: "llm.Port",
  tagline: "Self-hosted all-in-one LLM platform",
  favicon: "img/favicon.ico",

  future: {
    v4: true,
  },

  url: docsUrl,
  baseUrl: docsBaseUrl,

  organizationName,
  projectName,
  trailingSlash: false,

  onBrokenLinks: "throw",

  markdown: {
    mermaid: true,
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
    localeConfigs: {
      en: { label: "English", htmlLang: "en-US" },
    },
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: `https://github.com/${organizationName}/${projectName}/tree/main/`,
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ["@docusaurus/theme-mermaid"],

  themeConfig: {
    image: "img/social-card.png",
    colorMode: {
      defaultMode: "dark",
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "llm.Port",
      logo: { alt: "llm.Port", src: "img/logo.png" },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "Docs",
        },
        {
          to: "/docs/get-started/quickstart",
          label: "Get Started",
          position: "left",
        },
        {
          href: `https://github.com/${organizationName}`,
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Documentation",
          items: [
            { label: "What is llm.port", to: "/docs/overview/intro" },
            { label: "Quickstart", to: "/docs/get-started/quickstart" },
            { label: "API Gateway", to: "/docs/integrate/api-gateway" },
          ],
        },
        {
          title: "Trust",
          items: [
            {
              label: "Security Overview",
              to: "/docs/features/security-overview",
            },
            { label: "PII Controls", to: "/docs/features/pii-controls" },
            {
              label: "Compliance",
              to: "/docs/reference/compliance-and-third-party",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "GitHub",
              href: `https://github.com/${organizationName}`,
            },
            {
              label: "Contributing",
              to: "/docs/community/contributing",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Emagin8 UG i.G. Licensed under Apache 2.0.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "python", "yaml", "json", "docker"],
    },
    mermaid: {
      theme: { light: "neutral", dark: "dark" },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
