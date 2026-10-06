# CareTech IT

Institutional site for CareTech (caretechit.com.br). Next.js 15 (App Router), Tailwind CSS v4, Lenis smooth scroll, GSAP, and the View Transitions API for page transitions.

## Running

```bash
npm install
npm run dev
```

`npm run build` builds and generates the sitemap (`next-sitemap`).

## Environment

Copy `.env.example` to `.env.local`.

| Variable | Purpose |
| --- | --- |
| `SENDGRID_API_KEY` | Enables the contact form. Without it the form answers with a message pointing to WhatsApp and e-mail. |
| `CONTACT_TO_EMAIL` | Inbox that receives form messages (default `contato@caretechit.com.br`). |
| `CONTACT_FROM_EMAIL` | Verified SendGrid sender (default `site@caretechit.com.br`). |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID. GA only loads when this is set. |

## Where things live

- `src/content/site.ts`: every piece of copy, the six services, cases, values, contact data and image choices.
- `src/app/globals.css`: design tokens (colors, type, easing) and the view-transition / menu CSS.
- `src/components/motion/`: Lenis setup, the tile-board curtain, the transition router (`Link` and `useTransitionRouter`) and the shared page animations.
- `src/components/layout/`: header with menu, footer with the live operations board.

## Page transitions

Internal links use `Link` from `src/components/motion/Transition.tsx`.

- Default (`kind="tiles"`): a board of blue rounded squares (the logo module) closes from the click point, the route swaps inside `document.startViewTransition`, and the board opens on the new page.
- `kind="morph"`: used by service cards and rows. The clicked title morphs into the service page heading through a shared `view-transition-name`.
- Browsers without the View Transitions API get the tile board only; `prefers-reduced-motion` gets an instant swap.

Animation hooks in markup: `data-intro`, `data-intro-fade`, `data-intro-media`, `data-line`, `data-reveal`, `data-parallax` (see `PageAnimations.tsx`).

## Placeholders to replace

- Photography lives in `public/img/photos/`: Magnific generations and licensed Shutterstock images, graded as one series. Slots and art direction are in `docs/imagery-brief.md`; each file embeds its origin.
- The OG image in `public/img/og-image.png` is from the previous temporary site.
