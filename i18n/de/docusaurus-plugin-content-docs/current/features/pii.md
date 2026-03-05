---
sidebar_position: 3
---

# PII-Erkennung & -Anonymisierung

Das **PII-Modul** (`llm_port_pii`) bietet Presidio-basiertes PII-Scanning, Anonymisierung und reversible Tokenisierung, die in die Gateway-Pipeline integriert sind.

## Funktionsweise

Die PII-Erkennung läuft als eigenständiger FastAPI-Service, den das Gateway während der Anfrageverarbeitung aufruft. Wenn aktiviert, können ausgehende Anfragen auf personenbezogene Daten gescannt werden, bevor sie Upstream-Anbieter erreichen.

## Entity-Typen

Konfigurierbare Erkennung für:

| Entity              | Beispiel                                |
| ------------------- | --------------------------------------- |
| `PERSON`            | Max Mustermann                          |
| `EMAIL_ADDRESS`     | benutzer@beispiel.de                    |
| `PHONE_NUMBER`      | +49-555-0100                            |
| `CREDIT_CARD`       | 4111-1111-1111-1111                     |
| `US_SSN`            | 123-45-6789                             |
| `IP_ADDRESS`        | 192.168.1.1                             |
| `LOCATION`          | Berlin, Deutschland                     |
| _Benutzerdefiniert_ | Konfigurierbar über Presidio-Recognizer |

## Richtlinien

PII-Richtlinien folgen einer **Vorrangshierarchie**:

1. **Tenant-Richtlinie** — Tenant-spezifische Überschreibungen
2. **Systemstandard** — globale Basisrichtlinie
3. **Keine** — PII-Scanning deaktiviert

Jede Richtlinie konfiguriert:

- Welche Entity-Typen erkannt werden
- Anonymisierungsstrategie (Maskieren, Ersetzen, Hashen)
- Fail-Mode-Verhalten

## Fail-Modi

| Modus      | Verhalten                                               |
| ---------- | ------------------------------------------------------- |
| `block`    | Anfrage ablehnen, wenn PII-Service nicht erreichbar ist |
| `allow`    | Weiterleiten, wenn PII-Service nicht erreichbar ist     |
| `fallback` | Auf lokale musterbasierte Erkennung zurückgreifen       |

## Gateway-Integration

- **Telemetrie-Bereinigung**: PII-Entities werden basierend auf dem Datenschutzmodus aus Langfuse-Traces entfernt
- **Egress-Kontrolle**: Ausgehende Anfragen können blockiert oder anonymisiert werden, bevor sie Remote-Anbieter erreichen
- **Modulbewusste UI**: PII-Einstellungen werden in der Admin-Konsole ausgeblendet, wenn das Modul deaktiviert ist
