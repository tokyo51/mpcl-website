# MPCL Website — Deploy-Plan & Tooling

## Stack-Überblick

```
mpcl.de
   │
   ├── Hetzner Cloud Server (CX22 reicht — ~5 €/Monat)
   │      │
   │      └── Coolify (self-hosted PaaS)
   │             │
   │             └── Static-Site App: "mpcl-website"
   │                    └── pulled von GitHub: marlonlutterloh/mpcl-website
   │
   └── DNS: A-Record auf Server-IP (bei deinem Domain-Registrar)
```

## Phase 1 — Lokal mit Claude Code (jetzt)

**Ziel:** Die Hybrid-Website fertig polieren, Inhalte real machen, Impressum/Datenschutz schreiben.

**Was Claude Code gut kann:**
- Code-Refactoring, Komponenten extrahieren
- Echte Inhalte einsetzen (Texte, Bilder)
- Lokales Setup (Vite, Tailwind, oder einfach so lassen)
- Git-Commits
- README schreiben

**Was Claude Code NICHT machen sollte:**
- Visuelle Erkundung (das machst du hier mit mir)
- "Wie soll das aussehen" — das ist schon entschieden

**Workflow:**
1. Du legst Repo `mpcl-website` an (lokal, dann GitHub).
2. Du kopierst den `website/`-Ordner aus diesem Projekt rein (siehe `CLAUDE_CODE_BRIEFING.md`).
3. `npx serve` oder `python -m http.server` zum lokalen Test.
4. Claude Code für Inhalts-Updates und kleine Refactors.

## Phase 2 — Coolify-Deployment (wenn Inhalte stehen)

**Schritte auf dem Hetzner-Server:**
1. Coolify installiert (du hast das schon — sonst: `curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash`)
2. In Coolify: **+ New → Public Repository → Static**
3. Repo-URL eintragen: `https://github.com/marlonlutterloh/mpcl-website`
4. Build-Pack: **Static** (kein Build-Step nötig — es sind plain HTML/CSS/JS)
5. Publish Directory: `./` (oder `website/` falls du den Ordner nicht ins Repo-Root verschiebst)
6. Domain: `mpcl.de` + `www.mpcl.de`
7. SSL: Coolify holt automatisch Let's Encrypt
8. Deploy → fertig

**DNS:**
- A-Record `mpcl.de` → Hetzner-Server-IP
- A-Record `www.mpcl.de` → Hetzner-Server-IP (oder CNAME auf `mpcl.de`)

**Auto-Deploy:** Coolify lauscht auf GitHub-Webhooks. Push auf `main` → automatischer Re-Deploy in ~30 Sekunden.

## Phase 3 — Wann Codex einsetzen

**Codex** (das was du an deiner Invoice-Manager-Plattform nutzt) ist für **größere strukturelle Aufgaben** mit klarem Briefing besser geeignet als Claude Code. Für die Marketing-Website brauchst du Codex eigentlich nicht — sie ist klein genug.

**Sinnvolle Codex-Tasks später:**
- Blog-System ergänzen (Markdown → statische HTML-Seiten)
- Kontaktformular mit echtem Backend (Resend/Postmark via Coolify-Service)
- Kunden-Login-Bereich (eigene App in Coolify)

## Tool-Aufteilung Empfehlung

| Aufgabe | Tool |
|---|---|
| Visuelle Exploration, Welten, Mockups | **Claude (hier, dieser Chat)** |
| Inhalts-Polishing, Texte, kleine Refactors | **Claude Code** (lokal) |
| Größere Features (Blog, Auth, Backend) | **Codex** mit Briefing |
| Deploy/Server/Coolify-Config | **Du selbst** in Coolify-UI |
| Daily Edits am Live-Content | **Claude Code** + git push |

## Datei-Struktur fürs Repo

```
mpcl-website/
├── README.md
├── .gitignore
├── index.html
├── shared.css
├── world-hybrid.css
├── i18n.js
├── app.js
├── assets/
│   └── mpcl-logo.svg
├── impressum.html        ← noch zu erstellen
├── datenschutz.html      ← noch zu erstellen
└── agb.html              ← noch zu erstellen
```

Die alte `_index_3welten.html` und die `world-werkstatt.css` / `world-terminal.css` / `world-concierge.css` brauchst du im Live-Repo **nicht** — die bleiben hier im Design-Projekt als Archiv.
