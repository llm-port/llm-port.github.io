import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import type { Props } from "@theme/Root";
import Root from "@theme-original/Root";

const disclaimerByLocale: Record<string, string> = {
  en: "AI-generated documentation. Might not be 100% accurate.",
  de: "KI-generierte Dokumentation. Möglicherweise nicht zu 100 % korrekt.",
  "zh-Hans": "本文档由 AI 生成，可能无法保证 100% 准确。",
  es: "Documentación generada por IA. Puede que no sea 100% precisa.",
};

export default function RootWrapper(props: Props): JSX.Element {
  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;
  const disclaimer = disclaimerByLocale[currentLocale] ?? disclaimerByLocale.en;

  return (
    <>
      <div
        className="alert alert--warning"
        style={{
          height: 25,
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          margin: 0,
          zIndex: 1000,
          borderRadius: 0,
          backgroundColor: "#2b0a3d",
          color: "#ffffff",
        }}
      >
        {disclaimer}
      </div>
      <Root {...props} />
    </>
  );
}
