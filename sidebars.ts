import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: "category",
      label: "Overview",
      items: [
        "overview/intro",
        "overview/platform-overview",
        "overview/modules-and-editions",
      ],
    },
    {
      type: "category",
      label: "Get Started",
      items: [
        "get-started/quickstart",
        "get-started/cli-install",
        "get-started/deployment",
      ],
    },
    {
      type: "category",
      label: "Integrate",
      items: [
        "integrate/api-gateway",
        "integrate/mcp-tools",
      ],
    },
    {
      type: "category",
      label: "Features",
      items: [
        "features/security-overview",
        "features/pii-controls",
        "features/observability",
        "features/rag",
        "features/runtime-management",
        "features/ops-console",
        "features/skills",
        "features/multi-node",
      ],
    },
    {
      type: "category",
      label: "Reference",
      items: [
        "reference/cli-reference",
        "reference/compliance-and-third-party",
      ],
    },
    {
      type: "category",
      label: "Community",
      items: [
        "community/contributing",
        "community/internal-only-handling",
        "community/migration-map",
      ],
    },
  ],
};

export default sidebars;
