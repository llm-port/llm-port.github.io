---
sidebar_position: 8
---

# CLI

Die **llmport CLI** (`llm_port_cli`) ist ein Click-basiertes Kommandozeilen-Tool zur Installation, Verwaltung und zum Betrieb der Plattform.

## Installation

```bash
pip install llmport-cli
```

## Befehle

### System-Management

```bash
llmport up        # llm.port Infrastruktur und Services starten
llmport down      # Container und Netzwerke stoppen und entfernen
llmport status    # Status aller Services anzeigen
llmport logs      # Logs von Services anzeigen (mit Follow-Modus)
```

### Konfiguration

```bash
llmport config show    # Aktuelle Konfiguration anzeigen
llmport config set     # Konfigurationswerte setzen
llmport config path    # Pfad zur Konfigurationsdatei anzeigen
```

### Module

```bash
llmport module list      # Alle verfügbaren Module auflisten
llmport module enable    # Ein Modul aktivieren (rag, pii, auth, usw.)
llmport module disable   # Ein Modul deaktivieren
```

### Health-Checks

```bash
llmport doctor    # Umfassende System-Health-Checks ausführen
```

Der `doctor`-Befehl validiert:

- Betriebssystem-Kompatibilität
- Docker Engine und Compose-Versionen
- GPU-Treiber-Verfügbarkeit (NVIDIA, AMD, Intel)
- RAM und Speicherplatz
- Port-Verfügbarkeit für alle Services

### Auto-Tune

```bash
llmport tune    # Host benchmarken und Ressourceneinstellungen auto-konfigurieren
```

Der `tune`-Befehl benchmarkt verfügbare CPU-, Speicher- und Festplattenressourcen und generiert optimale Konfiguration:

- **Worker-Anzahlen** für Backend, Gateway und RAG-Services
- **Datenbankpool-Größen** basierend auf verfügbarem Speicher
- **Ressourcenlimits** für Docker-Container
- Erzeugt einen Tuning-Bericht mit empfohlenen `.env`-Werten

### Entwickler-Workflow

```bash
llmport dev init ~/projects/llm-port    # Repos klonen + Abhängigkeiten installieren + Infra starten
llmport dev up                           # Entwicklungsumgebung starten
llmport dev status                       # Laufende Prozesse prüfen
```

### Produktions-Installer

Interaktiver Einrichtungsassistent mit:

- GPU-Auto-Erkennung
- TUI (Textual User Interface) für geführte Konfiguration
- `.env`-Dateigenerierung mit zufälliger Secret-Generierung
- Docker Compose Profil-Auswahl

### Umgebungs-Generierung

```bash
llmport config env    # .env-Dateien für Dev oder Produktion generieren
```

Erstellt `.env`-Dateien mit:

- Zufällig generierten Geheimnissen (JWT-Schlüssel, Fernet-Schlüssel, Datenbankpasswörter)
- Service-URLs und Ports aus der Registry
- Modulspezifischer Konfiguration
