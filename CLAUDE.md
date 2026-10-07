# CareTech IT site

Institutional site for CareTech IT (caretechit.com.br), a Brazilian IT, data intelligence and digital transformation consultancy founded in 2022 and focused on healthcare. The site is in Brazilian Portuguese only. Its job is to make a healthcare IT decision maker (CIO, IT manager, hospital director) trust CareTech with critical IT and start a conversation through WhatsApp, e-mail or the contact form.

Slogan, binding: "Tecnologia que Cuida. Inteligência que Transforma."

## Docs

Project docs live in `_docs/`. Keep only `README.md` and this file at the root; put any new doc in `_docs/`.

- `_docs/PRODUCT.md`: audience, positioning, the six service lines, brand commitments, what evidence exists.
- `_docs/DESIGN.md`: the design system (tokens in front matter, then colors, type, components, motion, do's and don'ts). Read it before touching UI.
- `_docs/imagery-brief.md`: photo slots, art direction and where each image came from.
- `_docs/briefing-conteudo-cliente.md`: content brief for the client (pt-BR): copy to approve and questions to deepen services and cases.
- `_docs/post-launch-checklist.md`: launch-day and follow-up tasks (domain, Resend, Search Console, analytics consent).
- `README.md`: setup, env vars, where things live, how page transitions work.

## How it was built

- Feb 2025: a temporary one-page site went up (commits `temp website`, `update title`).
- Feb 2026: Vercel opened a PR patching the React Server Components CVE; merged.
- Oct 2026: full rebuild (`full website pt1`) using the Impeccable design workflow. Content came from the client's document (CARETECH-Site.docx). The visual direction was pinned by the user: the layout language of cominvi.com.mx, with CareTech blue replacing Cominvi's orange. The concept is "the operations board of a hospital that runs well": calm, exact, everything in view.
- Impeccable keeps its working state in `.impeccable/` (direction contract in `.impeccable/surfaces/src-app.md`, reviews, decisions). Leave that folder where it is; the tool reads it.
- Photography: 3 Magnific (Seedream 5 Pro) generations and 11 licensed Shutterstock images, resized and graded with ffmpeg as one blue-teal night series. Every shipping image embeds its origin.

## Stack

- Next.js 16 App Router (Turbopack for dev and build), React 19, TypeScript 7.
- Tailwind CSS v4 via `@tailwindcss/postcss`. Tokens are in `src/app/globals.css`, not a Tailwind config file.
- Lenis smooth scroll, GSAP (+ `@gsap/react`) and the View Transitions API for page transitions. Three.js for the logo mark on Home (`MarkThree.tsx`).
- Geist and Geist Mono via `next/font/google`.
- Analytics: Google Tag Manager (`GTM-PMP4P8FM`, in `cookieConsent` in `site.ts`) loads only after the visitor accepts the cookie banner (`src/components/consent/CookieConsent.tsx`), and only on the production deploy (`VERCEL_ENV=production`). GA4 is configured inside GTM, never as a separate tag. The choice lives in `localStorage` for 12 months; the footer "Cookies" link and the LGPD page reopen it. A new tracking category (ads, pixels) needs its own toggle in the banner first.
- Contact form: `react-hook-form` posting to `src/app/api/contact/route.ts`, which sends through Resend. Without `RESEND_API_KEY` it answers with a message pointing to WhatsApp and e-mail.
- Sitemap, robots and manifest are Next metadata routes (`src/app/sitemap.ts`, `robots.ts`, `manifest.ts`). `GOOGLE_SITE_VERIFICATION` adds the Search Console meta tag.
- Deployed on Vercel. Work happens on `stage`; PRs go to `main`.

## Commands

```bash
npm run dev
npm run build
npm run typecheck
```

No ESLint: `typescript-eslint` (and so `eslint-config-next`) doesn't support TypeScript 7 yet, and `eslint-config-next` pulled in an unfixed `braces` advisory. Re-add it once both are resolved. Keep `npm audit` at 0.

The preview config in `.claude/launch.json` runs the dev server on port 3100 (`caretech-dev`).

## Layout of the code

- `src/content/site.ts`: all copy, services, cases, values, contact data and image choices. Change text here, not in components.
- `src/app/`: routes. Home, `sobre`, `servicos` (index plus `[slug]` for the six services), `cases` (index plus `[slug]` for each case), `contato`, `lgpd-compliance`, `api/contact`.
- `src/components/motion/`: Lenis setup, the tile-board curtain, the transition router and shared page animations.
- `src/components/layout/`: header with menu, footer with the live operations board.
- `src/components/home/`: Home sections (hero, intro, services grid, diagnóstico dial, diferencial, cases teaser).
- `src/components/ui/`: shared pieces (buttons, section tags, board list, page hero, phrase band, scrub text, clock).
- `src/assets/svg/`: logo and social icons. `public/img/photos/`: the photo series.

## Conventions

- Code style: tabs, single quotes, no semicolons, `@/` import alias.
- Internal links use `Link` from `src/components/motion/Transition.tsx`, not `next/link`, so the tile transition runs. Service cards use `kind="morph"`.
- Animation hooks are data attributes (`data-intro`, `data-intro-fade`, `data-intro-media`, `data-line`, `data-reveal`, `data-parallax`) handled in `PageAnimations.tsx`.
- Every curtain, scrub, pin and parallax must respect `prefers-reduced-motion`.
- Blue (#0367d7) is the only accent. Hover is inversion. No drop shadows except the floating preview on the services index. No labels stacked above headings; the `S.0x` tag sits inline in the first line (on phones, below 768px, it moves above the statement).

## SEO

- Every page builds its metadata with `pageMetadata()` from `src/lib/seo.ts` (title, description, canonical, Open Graph, Twitter). Don't hand-write `openGraph` on a page: Next replaces it wholesale, so a partial one drops fields.
- JSON-LD: the root layout emits Organization + WebSite; each page adds its own `@graph` (WebPage type, BreadcrumbList, Service on service pages) through `<JsonLd>` and the builders in `src/lib/seo.ts`.
- One `h1` per page. Section statements render as `h2` (`ScrubText as='h2'`). Keep decorative text (the `S.0x` section tags) outside headings; `ScrubText` floats the tag beside the heading for that reason.
- OG images are generated per route by `opengraph-image.tsx` files using `renderOg()` in `src/lib/og.tsx`. The fonts in `src/assets/fonts/` are kerning-free Latin subsets made for Satori; don't swap them for the full Google files.
- Service pages carry `approach` paragraphs and a `faq` list in `site.ts`; the general FAQ (`faq`) sits on Contato. Every FAQ needs FAQPage JSON-LD: always build FAQs with `<Faq>` (`src/components/ui/Faq.tsx`), which renders the schema itself; never hand-roll an FAQ list without it. Answers must restate facts the client gave; open questions go to the content brief, not the site.
- New page: add it to `src/app/sitemap.ts`, give it `pageMetadata()`, JSON-LD with a breadcrumb, and an `opengraph-image.tsx`.

## Content rules

- Say only what is true. Cases are anonymized: no client names, logos, metrics or testimonials, and none may be invented. The only numbers on hand are "founded 2022" and "15+ years".
- Don't imply a 24h on-call service. The clock shows the Brasília hour, not a shift.
- Contact: WhatsApp +55 (41) 9822-2437, contato@caretechit.com.br.

## Open items

- `src/assets/img/og-image.png` is the old OG image from the temporary site and is no longer used.
- Submit `https://caretechit.com.br/sitemap.xml` in Google Search Console once the site is live.
- Resend is not set up yet: the API key and domain verification come from the client. Steps are in `_docs/post-launch-checklist.md`.
