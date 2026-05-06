# Briefing für Claude Code — MPCL Website

## Was du tun sollst

Die Marketing-Website **mpcl.de** in produktionsreifen Zustand bringen. Design ist fertig — du machst Inhalt, Pflege, kleine Polish-Aufgaben. **Nicht das Design ändern.**

## Setup (einmalig)

```bash
# 1. Neuer lokaler Ordner
mkdir ~/Code/mpcl-website && cd ~/Code/mpcl-website
git init

# 2. Aus dem MPCL-Design-Projekt kopieren:
#    - index.html
#    - shared.css
#    - world-hybrid.css
#    - i18n.js
#    - app.js
#    - assets/mpcl-logo.svg
#    - DEPLOY_PLAN.md

# 3. .gitignore
echo "node_modules/\n.DS_Store\n*.log" > .gitignore

# 4. README schreiben (siehe unten)
# 5. Lokal testen
python3 -m http.server 8000
# → http://localhost:8000

# 6. GitHub
gh repo create marlonlutterloh/mpcl-website --private --source=. --push
```

## Was zu tun ist (Reihenfolge)

### 1. Lighthouse-Pass
Performance / Accessibility / SEO checken. Ziel: alle ≥ 95. Wahrscheinliche Fixes:
- `<meta name="description">` ist da, ergänze Open-Graph + Twitter-Card
- Logo `<img>` braucht `width`/`height`-Attribute
- `alt`-Texte auf jedem `<img>` prüfen

### 2. Echte Inhalte
- **Hero-Headline** ist Platzhalter — Marlon entscheidet final
- **Stundensatz** prüfen (aktuell 20 €/Std., Pauschale 60 €/Monat — stimmt das noch?)
- **Verfügbar-Status** im Header (`hb-status`) ist statisch — soll das dynamisch werden? Erstmal so lassen, später evtl. JSON-Datei
- **Case-Study Lutterloh** — echte Zahlen einsetzen wenn möglich

### 3. Pflichtseiten erstellen
- `impressum.html` — gleiches Layout-Skelett wie `index.html` (Header + Footer), aber simple Content-Section. **NICHT mit AI generieren** — Marlon nutzt sein bestehendes Impressum (rechtsverbindlich) wortwörtlich.
- `datenschutz.html` — dito. Vorlage: e-recht24.de oder Anwalt-Vorlage.
- `agb.html` — falls Marlon AGB hat, sonst weglassen und Footer-Link entfernen.

### 4. Footer-Links aktivieren
Aktuell zeigen alle Footer-Links auf `#`. Verlinke sie auf:
- `impressum.html`, `datenschutz.html`, `agb.html`
- Service-Anker im `index.html`: `index.html#hb-services` etc.

### 5. EN-Übersetzungen prüfen
`i18n.js` hat einen `en:`-Block. Lies ihn durch — es gibt evtl. Stellen wo DE-Text durchschlägt. Nicht raten — wenn unsicher, frag.

### 6. Kontaktformular
Aktuell `onsubmit="event.preventDefault();"` — also Dummy. Optionen:
- **Formspree** (easy, $0 für 50 Submissions/Monat): `<form action="https://formspree.io/f/XXXX" method="POST">`
- **Eigenes Endpoint** auf dem Hetzner-Server (später, mit Codex)

Erstmal Formspree empfehlen.

### 7. Deploy via Coolify
Siehe `DEPLOY_PLAN.md` — Phase 2.

## Coding-Regeln

- **Kein npm/build-step.** Plain HTML/CSS/JS. Nicht in Vite/Astro/Next migrieren.
- **CSS-Variablen** (`--hb-*`) nicht umbenennen — sind im Design-System verwendet.
- **Klassen-Präfixe** behalten: `.hb-` für Hybrid-Welt-Komponenten.
- **i18n**: Neue Texte immer in `i18n.js` (DE + EN), HTML bekommt `data-i18n="key"`.
- **Mobile-First** noch nicht — die Seite ist Desktop-optimiert. Wenn Marlon Mobile will: separater Task.

## Was du NICHT tun sollst

- Keine neuen Welten/Designs erfinden — Hybrid ist final.
- Keine Tracking-Skripte einbauen ohne Rückfrage (DSGVO).
- Keine Cookies setzen ohne Rückfrage.
- Keine externen Fonts laden außer den bereits in `shared.css` definierten.
- Keine eigenmächtigen Texte schreiben — frag Marlon, wenn Inhalt unklar.

## Branding & Tone

MPCL ist **ruhig, kompetent, einzelunternehmerisch**. Ziel-Persona: Hamburger KMU, Selbstständige, ältere Privatkunden. Nicht "tech-bro", nicht "agentur-marketing". Eher: handwerklich, ehrlich, leise.

Wenn du Texte schreiben musst und unsicher bist — schreib **kürzer und ruhiger** als dein Default. Keine Ausrufezeichen. Keine Buzzwords ("innovativ", "cutting-edge", "Lösungen"). Stattdessen konkrete Verben ("Ich repariere", "Ich komme vorbei", "Ich erkläre").
