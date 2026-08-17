# eternaltilidie.com

Marketing site for **ETERNAL** — a technology label building culture and products for the
next generation of storytelling.

Built with [Next.js](https://nextjs.org) (App Router) and deployed on Vercel.

## Structure

- `app/page.tsx` — the 12-section scroll deck (all page copy lives here)
- `app/layout.tsx` — metadata (OG/Twitter cards), fonts, global shell
- `app/globals.css` — all styling
- `components/Deck.tsx` — scroll-snap deck: keyboard nav, pager, grain overlay
- `components/Logo3D.tsx` — draggable three.js render of the Eternal logo
- `public/images/` — page imagery (served optimized via `next/image`)
- `public/models/eternal-logo-3d.obj` — self-hosted 3D logo model

## Develop

```bash
npm install
npm run dev
```

## Deploy

Pushing to `main` deploys to production via Vercel. The Vercel project's
**Framework Preset must be set to Next.js** (Project Settings → Build & Development
Settings) — the project was previously deployed as a static single-file site.

## History

This site was originally a single-file Claude artifact export (one self-unpacking
2.2MB `index.html`). It was rebuilt as this Next.js project in August 2026; the
content and design are a 1:1 port. Brand source assets (vector logos, fonts, 3D
sources) live outside this repo in `../eternal-brand-assets`.
