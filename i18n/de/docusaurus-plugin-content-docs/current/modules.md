---
sidebar_position: 4
---

# Module

**llm.Port** verwendet eine modulare Architektur — optionale Funktionen können ohne Änderung an der Kernplattform aktiviert oder deaktiviert werden. Module werden als separate Docker Compose Services mit eigenen Datenbanken und APIs implementiert.

## Verfügbare Module

| Modul       | Beschreibung                                                      | Standard    |
| ----------- | ----------------------------------------------------------------- | ----------- |
| **rag**     | Retrieval-Augmented Generation — Dokumentenerfassung, Vektorsuche | Aktiviert   |
| **pii**     | PII-Erkennung und -Anonymisierung (Presidio + spaCy)              | Aktiviert   |
| **auth**    | Externer Authentifizierungsanbieter (SSO / OIDC)                  | Deaktiviert |
| **mailer**  | E-Mail-Benachrichtigungen und -Warnungen                          | Deaktiviert |
| **docling** | Erweiterte Dokumentenverarbeitung & -konvertierung (IBM Docling)  | Deaktiviert |

## Aktivieren / Deaktivieren

### Über die CLI

```bash
llmport module list           # Alle Module und deren Status anzeigen
llmport module enable rag     # Ein Modul aktivieren
llmport module disable pii    # Ein Modul deaktivieren
```

### Über Docker Compose Profile

Jedes Modul entspricht einem Docker Compose-Profil. Das Aktivieren eines Moduls aktiviert sein Profil, das die erforderlichen Container startet.

```yaml
# Beispiel: RAG-Modul-Container
services:
  llm-port-rag:
    profiles: ["rag"]
    # ...
  llm-port-rag-worker:
    profiles: ["rag"]
    # ...
```

## Funktionsweise

### Backend-Erkennung

Das Backend stellt einen Modul-Erkennungsendpunkt bereit:

```
GET /v1/services
```

Das Frontend ruft diesen Endpunkt auf, um zu ermitteln, welche Module aktiviert sind, und zeigt oder verbirgt dann dynamisch die entsprechenden UI-Bereiche.

### Ein neues Modul hinzufügen

Das Hinzufügen eines Moduls erfordert ungefähr **20 Konfigurationszeilen**:

1. Den Service zu `docker-compose.yml` mit einem Profil hinzufügen
2. Das Modul in der Service-Registry registrieren
3. Einen UI-Bereich hinzufügen, der den Erkennungsendpunkt prüft

### Modul-Isolation

Jedes Modul:

- Läuft in eigenen Container(n)
- Hat eine eigene Datenbank (falls erforderlich)
- Kommuniziert mit dem Backend über interne APIs
- Kann unabhängig gestartet/gestoppt werden
