# eternaltilidie.com

Marketing site for **ETERNAL** — a technology label building culture and products for the
next generation of storytelling.

Built with [Next.js](https://nextjs.org) (App Router) and deployed on Vercel.

## Structure

- `app/page.tsx` — the 12-section scroll deck (all page copy lives here)
- `app/proposals/jasmine-yen/` — Jasmine Yen partnership proposal web deck (`/proposals/jasmine-yen`, noindex)
- `app/artistreview/ocean/` — Ocean artist review web deck (`/artistreview/ocean`, noindex)
- `app/dealreview/ocean/` — Ocean first-look deal review, long-form document (`/dealreview/ocean`, noindex)
- `app/portal/` — sign-up / sign-in portal with the artist intake (`/portal`, noindex); questions live in `lib/intake.ts`, the flow in `components/Portal.tsx`, submissions go to `app/api/portal/route.ts`
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

## Portal

`/portal` mirrors "The Reflection Wizard", the Airtable intake form behind
reflector.createsafe.io, restyled in the Eternal look. Field keys and option lists
match that table (`reflector` in base `app5WG0xIVwBPorx9`), so submissions land in
the same place. Set `AIRTABLE_TOKEN` (see `.env.example`) on Vercel to store
submissions; without it the API route accepts and logs them, and the form still
saves drafts in the browser. Sign-in currently only checks that an intake exists
for the email — there is no password store yet, so plug in an auth provider
before treating accounts as secure.

## Deploy

Pushing to `main` deploys to production via Vercel. The Vercel project's
**Framework Preset must be set to Next.js** (Project Settings → Build & Development
Settings) — the project was previously deployed as a static single-file site.

## History

This site was originally a single-file Claude artifact export (one self-unpacking
2.2MB `index.html`). It was rebuilt as this Next.js project in August 2026; the
content and design are a 1:1 port. Brand source assets (vector logos, fonts, 3D
sources) live outside this repo in `../eternal-brand-assets`.
