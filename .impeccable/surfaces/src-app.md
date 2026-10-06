---
version: 1
slug: "src-app"
primary_target: "src/app"
related_targets: []
---

# Surface brief: CareTech marketing site (all routes)

Scope: whole site, src/app (Home, Sobre, Serviços + 6 detail pages, Cases, Contato, LGPD & Compliance). Mode: Persuade.

Audience: healthcare IT decision makers first (CIOs, IT managers, hospital directors), other sectors second. Action: start a conversation (WhatsApp, e-mail, form). Proof: hospital full-IT-management case, ERP migration case, founder's 15+ years, six service lines. No invented clients, metrics, or testimonials.

User-pinned: layout language of cominvi.com.mx, same colors with CareTech blue replacing the orange. Stack pinned: Next.js + Tailwind, Lenis, View Transitions API + GSAP.

## Direction contract

THESIS: CareTech's IT, laid out like the operations board of a hospital that runs well: calm, exact, everything in view. Refuses the category's stock-photo hero with icon-card grid and counters.

OWN-WORLD: Cominvi grammar translated. Near-black #151515, pale mint-gray #EBF0ED, white, CareTech blue #0367D7 as the only accent (replaces Cominvi orange). Bold tight neo-grotesk display (Geist, standing in for Helvetica Now Display) with tiny light uppercase mono labels (Geist Mono); boxed section index tags "S.02" over a black pill label; 8px-radius cards; hairline-ruled stat grids with line icons; black pill buttons with a white square arrow chip; the logo's rounded-square module as the board's status magnet. Raises kept: four colors only, hover is inversion; board rows one type size, rank by weight/case/reversal; a chase marker sweeps a 24h shift strip; the page knows the real Brasília hour.

STORY: visitor learns CareTech runs critical IT with business vision (hospital proof), sees six service fronts on a board, believes it from the cases and the way it talks, and taps WhatsApp or the form.

FIRST VIEWPORT: full-bleed dark scene (#151515 with a slow, abstract blue-lit hospital-corridor/data image, darkened). Logo top-left, "Menu" + circle button top-right. Left-middle: "Tecnologia que cuida. Inteligência que transforma." at ~5.5vw bold, white. Center-right: a mono readout pinned to the image ("BRASÍLIA 14:32 / PLANTÃO DIURNO / ATENDIMENTO NACIONAL"). Bottom-right: two small image cards with mono pill labels ("NOSSOS SERVIÇOS", "FALE NO WHATSAPP"), the primary action.

FORM: Cominvi-layout persuade site fused with the Gestão à Vista operations board (grounded list position 4; seed key 4814bcab). Signature interaction: page transition where a grid of rounded-square magnets (logo module) fills the viewport in blue in a staggered sweep, then clears to the next page, run by GSAP inside document.startViewTransition; plus the services board on Home where a sticky list of six services drives a dial with tick ring (Cominvi's minerals section) showing each service's board panel.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Recorded adaptations
- Diagnóstico dial runs the five recurring challenges from the client doc ("Nossa História"), not the six services: the section answers "what problem do you have", and each challenge maps to the service (or the business-vision differentiator) that answers it. The dial centre changes per challenge.
- Hero readout says "Desde 2022 / + 15 anos em ambientes críticos / Brasília hh:mm" instead of "Plantão diurno": a shift label would imply a 24h on-call service the client never claimed.
- Label stacked above headings removed site-wide; the S.0x tag only appears floated inline at the start of a statement or heading.

## Unresolved
- Real photography: none supplied. Build uses verified stock imagery, marked for replacement.
- SendGrid credentials not configured; form route validates and returns a clear error until SENDGRID_API_KEY is set.
