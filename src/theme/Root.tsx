import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import type { Props } from "@theme/Root";
import Root from "@theme-original/Root";

const disclaimerByLocale: Record<string, string> = {
  en: "This documentation is generated with AI assistance and may contain inaccuracies. Please validate critical details before production use.",
  de: "Diese Dokumentation wurde mit KI-Unterstützung erstellt und kann Ungenauigkeiten enthalten. Bitte prüfen Sie kritische Details vor dem Produktionseinsatz.",
  "zh-Hans":
    "本文档由 AI 辅助生成，可能存在不准确之处。请在生产使用前核验关键细节。",
  es: "Esta documentación se genera con asistencia de IA y puede contener imprecisiones. Valide los detalles críticos antes de usarla en producción.",
};

export default function RootWrapper(props: Props): JSX.Element {
  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;
  const disclaimer = disclaimerByLocale[currentLocale] ?? disclaimerByLocale.en;

  return (
    <>
      <Root {...props} />
      <div className="llmport-ai-disclaimer" role="status" aria-live="polite">
        {disclaimer}
      </div>
    </>
  );
}
