import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  docsSidebar: [
    "intro",
    {
      type: "category",
      label: "Architecture",
      items: ["architecture", "call-sequences"],
    },
    {
      type: "category",
      label: "Features",
      items: [
        "features/gateway",
        "features/security",
        "features/pii",
        "features/observability",
        "features/rag",
        "features/containers",
        "features/runtimes",
        "features/cli",
      ],
    },
    "deployment",
    {
      type: "category",
      label: "Platform",
      items: ["modules", "repos"],
    },
    {
      type: "category",
      label: "Community",
      items: ["contributing", "third-party"],
    },
  ],
};

export default sidebars;
