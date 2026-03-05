import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "llm.Port",
  tagline: "Self-hosted all-in-one LLM platform",
  favicon: "img/favicon.ico",

  future: {
    v4: true,
  },

  url: "https://llm-port.github.io",
  baseUrl: "/",

  organizationName: "llm-port",
  projectName: "llm-port.github.io",
  trailingSlash: false,

  onBrokenLinks: "throw",

  markdown: {
    mermaid: true,
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en", "de", "zh-Hans", "es"],
    localeConfigs: {
      en: { label: "English", htmlLang: "en-US" },
      de: { label: "Deutsch", htmlLang: "de-DE" },
      "zh-Hans": { label: "简体中文", htmlLang: "zh-Hans" },
      es: { label: "Español", htmlLang: "es-ES" },
    },
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/llm-port/llm-port.github.io/tree/main/",
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
          to: "/docs/architecture",
          label: "Architecture",
          position: "left",
        },
        {
          type: "localeDropdown",
          position: "right",
        },
        {
          href: "https://github.com/llm-port",
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
            { label: "Getting Started", to: "/docs/intro" },
            { label: "Architecture", to: "/docs/architecture" },
            { label: "Features", to: "/docs/features/gateway" },
          ],
        },
        {
          title: "Platform",
          items: [
            { label: "Modules", to: "/docs/modules" },
            { label: "Repositories", to: "/docs/repos" },
            { label: "Third-Party Notices", to: "/docs/third-party" },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/llm-port",
            },
            {
              label: "Contributing",
              to: "/docs/contributing",
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
