---
sidebar_position: 2
---

# Sicherheit & Richtlinien

**llm.Port** bietet ein umfassendes Sicherheitsmodell, das Authentifizierung, Autorisierung, Verschlüsselung und Richtliniendurchsetzung abdeckt.

## Authentifizierung

### JWT-Tokens

- Bearer-Token-Authentifizierung für Gateway- und Admin-APIs
- Tenant-bewusste Claims: `sub`, `tenant_id`, `roles`, `groups`
- Konfigurierbare Token-Ablaufzeit und Erneuerung

### Cookie-Authentifizierung

- **Sichere httponly-Cookies** (`fapiauth`) für browser-basierte Sitzungen
- Cookie-zu-JWT-Konvertierung in der Backend-Proxy-Schicht
- Wird von der Admin-Konsole und der Chat-UI für nahtlose Browser-Authentifizierung verwendet

### OAuth / SSO

- **OIDC / OAuth2** Provider-Verwaltung
- Automatische Benutzerregistrierung beim ersten SSO-Login
- Gruppen-Mapping von Identity-Provider-Claims zu Plattformrollen
- Unterstützung mehrerer Anbieter

### Root-Modus / Break-Glass

- Zeitlich begrenzte erhöhte Sitzungen für Notfalloperationen
- Pflichtmäßiger Audit-Trail für alle Root-Modus-Aktionen
- Automatischer Ablauf nach konfiguriertem Timeout

## Autorisierung (RBAC)

Vollständiges **Ressource + Aktion**-Berechtigungsmodell:

- **Rollen**: benannte Berechtigungssätze (z. B. `admin`, `viewer`, `operator`)
- **Gruppen**: Benutzersammlungen mit gemeinsamen Rollenzuweisungen
- **Ressourcen**: `containers`, `providers`, `models`, `rag`, `pii`, `settings`, …
- **Aktionen**: `read`, `write`, `delete`, `execute`, `admin`

Berechtigungen werden pro Anfrage sowohl für die Admin-API als auch für das Gateway ausgewertet.

## Verschlüsselung

### In der DB gespeicherte Geheimnisse

- **Fernet-Verschlüsselung** mit einem einzigen Master-Schlüssel
- Alle Geheimnisse (API-Schlüssel, Token, Anmeldedaten) werden verschlüsselt in PostgreSQL gespeichert
- Keine Geheimnisse in Umgebungsvariablen oder Konfigurationsdateien
- Transparentes Verschlüsseln/Entschlüsseln über den Settings-Service

### Anfrage-Body-Limits

- Konfigurierbare Durchsetzung der maximalen Payload-Größe
- Verhindert, dass überdimensionierte Anfragen Upstream-Anbieter erreichen

## Rate Limiting

- **Redis-basierte Fixed-Window**-Zähler für RPM und TPM
- Per-Tenant-Richtlinienkonfiguration
- Atomare Operationen via Lua-Skripten für Konsistenz

## Concurrency Control

- Verteiltes **per-Instanz-Leasing** über Redis + Lua-Skripten
- Verhindert Überlastung einzelner Provider-Instanzen
- Automatische Lease-Freigabe beim Abschluss (auch bei Fehlern via `finally`-Blöcke)

![Security Overview](/img/screenshots/security_overview.png)

![User Profile](/img/screenshots/profile.png)
