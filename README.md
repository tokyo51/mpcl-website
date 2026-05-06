# mpcl-website

Marketing-Website für MPCL IT & Web Solutions, Hamburg.

## Stack
Plain HTML/CSS/JS — kein Build-Step. Wird mit Coolify auf Hetzner deployed.

## Lokal starten
```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Dateien
- `index.html` — Hauptseite
- `shared.css` — Design-Tokens (Farben, Type)
- `world-hybrid.css` — Komponenten-Styles
- `i18n.js` — DE/EN Übersetzungen
- `app.js` — Sprach-Toggle + Scroll-Reveal
- `assets/` — Logo, Bilder

## Deploy
Siehe `DEPLOY_PLAN.md`.

## Arbeitsanweisung für Claude Code
Siehe `CLAUDE_CODE_BRIEFING.md`.
