# eternaltilidie.com

Marketing site for **ETERNAL** — a technology label building culture and products for the
next generation of storytelling.

Built with [Next.js](https://nextjs.org) (App Router) and deployed on Vercel.

## Structure

- `app/page.tsx` — the 12-section scroll deck (all page copy lives here)
- `app/proposals/jasmine-yen/` — Jasmine Yen partnership proposal web deck (`/proposals/jasmine-yen`, noindex)
- `app/proposals/max-brown/` — Max Brown internship proposal, written as a letter (`/proposals/max-brown`, noindex)
- `app/artistreview/ocean/` — Ocean artist review web deck (`/artistreview/ocean`, noindex)
- `app/dealreview/ocean/` — Ocean first-look deal review, long-form document (`/dealreview/ocean`, noindex)
- `app/portal/` — The Reflection Wizard, the artist intake (`/portal`, noindex); questions in `lib/intake.ts`, the flow in `components/Portal.tsx`, the API in `app/api/portal/route.ts`, the Reflection generator in `lib/reflection.ts`, email in `lib/email.ts`, the pipeline in `lib/pipeline.ts`
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

`/portal` is Eternal's version of "The Reflection Wizard", the intake behind
reflector.createsafe.io. It asks only for an email and a name, then walks through the
same ten steps. Nothing is stored: when the artist submits, the API route answers at
once and then, after the response, writes their **Reflection** with Claude and emails
it to them. The team inbox gets a copy with the Reflection and every answer attached
as JSON, which is the record.

The Reflection follows the ones the team has written by hand: a second-person
portrait, milestones from their goals, a daily schedule from their habits, a
learn-and-practice list, next steps, and daily affirmations. The voice and structure
are set in `lib/reflection.ts`; edit the system prompt there to tune it.

Set the variables in `.env.example` on Vercel. Without them the route accepts and logs
submissions so the form can be exercised. If Claude fails, the artist gets a short
"we have your answers" note and the team copy carries the error, so a human can write
that one.

## Deploy

Pushing to `main` deploys to production via Vercel. The Vercel project's
**Framework Preset must be set to Next.js** (Project Settings → Build & Development
Settings) — the project was previously deployed as a static single-file site.

## History

This site was originally a single-file Claude artifact export (one self-unpacking
2.2MB `index.html`). It was rebuilt as this Next.js project in August 2026; the
content and design are a 1:1 port. Brand source assets (vector logos, fonts, 3D
sources) live outside this repo in `../eternal-brand-assets`.
