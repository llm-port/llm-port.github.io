---
sidebar_position: 6
---

# Ops-Konsole

Die **Ops-Konsole** im Admin-Frontend bietet vollständiges Container- und Infrastrukturmanagement.

## Container-Management

- **Lifecycle-Steuerung**: Starten, Stoppen, Neustarten, Pausieren, Fortsetzen, Entfernen
- **Exec**: Befehle in Containern über die Admin-UI ausführen
- **Log-Streaming**: Echtzeit-Container-Logs mit Follow-Modus
- **Health-Checks**: Container-Gesundheitsstatus mit automatischer Überwachung

## Image-Management

- **Pull mit SSE-Fortschritt**: Image-Pulls mit Echtzeit-Fortschrittsstreaming
- **Auflisten und Inspizieren**: Alle Images mit Größe, Tags und Erstellungsdatum anzeigen
- **Bereinigen**: Nicht verwendete Images entfernen, um Speicherplatz freizugeben

## Compose-Stack-Management

- **Bereitstellen / Aktualisieren**: Compose-Konfigurationen mit Validierung anwenden
- **Rollback**: Auf frühere Revisionen mit Diff-Ansicht zurücksetzen
- **Revisionsverfolgung**: Jedes Deployment erstellt eine nummerierte Revision mit Audit-Trail
- **Diff-Ansicht**: Konfigurationen zwischen Revisionen vergleichen

## Container-Klassifizierung

Container werden für Management und Richtlinien kategorisiert:

| Klasse        | Beschreibung                   | Beispiele                    |
| ------------- | ------------------------------ | ---------------------------- |
| `SYSTEM_CORE` | Essentielle Plattform-Services | Backend, Gateway, Frontend   |
| `SYSTEM_AUX`  | Unterstützende Infrastruktur   | Grafana, Loki, Langfuse      |
| `LLM_ENGINE`  | Modell-Runtimes                | vLLM, Ollama, llama.cpp      |
| `TENANT_APP`  | Benutzeranwendungen            | Benutzerdefinierte Container |

Jede Klasse kann eigene Management-Richtlinien haben (Neustart-Richtlinie, Ressourcenlimits usw.).

## Netzwerk-Sichtbarkeit

- Docker-Netzwerk-Inspektion
- System- vs. Benutzer-Netzwerk-Klassifizierung
- Container-zu-Netzwerk-Zuordnung

![Container Management](/img/screenshots/containers.png)
