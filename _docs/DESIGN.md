---
name: CareTech
description: IT, data and digital transformation consultancy, laid out like the operations board of a hospital that runs well.
colors:
  ink: "#151515"
  ink-2: "#262727"
  mist: "#ebf0ed"
  mist-2: "#dde4e0"
  paper: "#ffffff"
  blue: "#0367d7"
  blue-2: "#3885df"
  muted: "#5f6461"
  muted-dark: "#a3a8a5"
  line: "#d6ddd9"
typography:
  display-xl:
    fontFamily: "Geist, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.75rem, 6.2vw, 6rem)"
    fontWeight: 600
    lineHeight: 0.92
    letterSpacing: "-0.045em"
  display-l:
    fontFamily: "Geist, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 5rem)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  statement:
    fontFamily: "Geist, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.625rem, 3.05vw, 3.125rem)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.032em"
  title-m:
    fontFamily: "Geist, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.375rem, 1.9vw, 1.875rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  board-row:
    fontFamily: "Geist, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.125rem, 1.6vw, 1.5rem)"
    fontWeight: 500
    letterSpacing: "-0.02em"
  body-l:
    fontFamily: "Geist, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.0625rem, 1.25vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Geist, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "0.04em"
rounded:
  tag: "3px"
  chip: "5px"
  control: "0.375rem"
  card: "0.5rem"
  sheet: "0.75rem"
  magnet: "22%"
  round: "9999px"
spacing:
  hairline: "1px"
  gap-tight: "0.5rem"
  gap: "0.75rem"
  card-pad: "1.25rem"
  card-pad-md: "1.5rem"
  gutter: "clamp(1rem, 2.25vw, 2rem)"
  section: "7rem"
  section-md: "9rem"
  section-end-md: "10rem"
components:
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    height: "2.5rem"
    padding: "0 0.25rem 0 1rem"
  button-ink-hover:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.paper}"
  button-paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    height: "2.5rem"
    padding: "0 0.25rem 0 1rem"
  button-paper-hover:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.paper}"
  button-blue:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    height: "2.5rem"
    padding: "0 0.25rem 0 1rem"
  button-blue-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  arrow-chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.chip}"
    size: "2rem"
  section-tag-index:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.tag}"
    padding: "1px 4px"
  section-tag-label:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.tag}"
    padding: "3px 6px"
  service-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "1.5rem"
  service-card-hover:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.paper}"
  board-row:
    textColor: "{colors.ink}"
    typography: "{typography.board-row}"
    padding: "1.25rem 0.75rem"
  board-row-hover:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.paper}"
  board-row-dark-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  magnet:
    backgroundColor: "{colors.blue}"
    rounded: "{rounded.magnet}"
    size: "0.75rem"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "1.75rem 1rem 0.75rem"
  footer-board-cell:
    backgroundColor: "{colors.ink-2}"
    textColor: "{colors.paper}"
    padding: "1.5rem"
  footer-board-cell-hover:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.paper}"
  menu-toggle:
    rounded: "{rounded.round}"
    size: "2.75rem"
---

# Design System: CareTech

## Overview

**Creative North Star: "The Operations Board"**

CareTech's site reads like the status board of a hospital that runs well: calm, exact, everything in view. Information sits on ruled rows and flat tiles, set in one bold, tight neo-grotesk with tiny uppercase mono annotations, and the only thing that ever lights up is CareTech blue. The layout grammar is borrowed openly from cominvi.com.mx, a reference the user pinned, with CareTech blue taking the place of Cominvi's orange. Near-black, pale mint-gray and white do all the structural work.

The signature object is the logo's rounded-square module, used as the board's "magnet": a 22%-rounded square that marks list items, fills the 24-hour shift strip, and tiles the whole viewport in blue during page transitions. The page also knows the real Brasília hour, shown in the hero readout and the footer board. Depth is flat and tonal. Emphasis comes from inversion (a row or card flips to solid blue on hover), never from shadows or gradients on UI.

Density is generous between sections and tight inside them. Sections alternate paper and mist, with ink reserved for full-bleed photographic scenes, the phrase band and the footer. Photography is always darkened and tinted toward the blue with a color-blend overlay so it reads as one material.

**Key Characteristics:**
- Four colors carry the world: ink, mist, paper, and blue as the single accent.
- Bold Geist display at tight negative tracking against 11px Geist Mono uppercase labels.
- The 22% rounded-square magnet from the logo as the recurring status mark.
- Hover is inversion: light surfaces go blue, dark surfaces go white.
- Flat tonal depth, hairline rules, 8px card corners.
- Motion is orchestrated and sweeping: a blue tile-board curtain between pages, masked line rises, scroll-scrubbed statements.

## Colors

A cool, near-monochrome palette of ink, mint-tinted gray and white, punctuated by one saturated medical blue.

### Primary
- **CareTech Blue** (blue): the only accent. Hover plates on cards, rows and buttons; the magnet squares; the page-transition curtain; focus rings, selection and caret; the blue-tinted color-blend overlay on every photograph (opacity 0.2 to 0.35).
- **Signal Blue** (blue-2): the logo's lighter blue. Used on ink surfaces where blue would sink: the hero readout's clock square, magnets on dark board rows, and menu link hover. Never a second accent on light surfaces.

### Neutral
- **Board Ink** (ink): page canvas behind the site, hero and service scenes, footer, menu panel, primary buttons, body text on light.
- **Panel Ink** (ink-2): the cells of the footer operations board, laid on ink with 1px gaps so the ink shows through as rules.
- **Mist** (mist): alternating section ground (services grid, cases teaser, every other case on the Cases page) and the Diagnóstico dial centre.
- **Mist Deep** (mist-2): declared in the theme as the step below mist; no shipped surface uses it yet, so give it a role only when a nested mist surface needs one.
- **Paper** (paper): default section ground, service and form surfaces, text and chips on ink.
- **Slate Muted** (muted): secondary text and labels on paper and mist.
- **Fog Muted** (muted-dark): labels and secondary text on ink and panel ink.
- **Hairline** (line): 1px rules between board rows, stat grids and form field strokes on light surfaces. On ink, rules are white at 12 to 15% opacity instead.

### Named Rules
**The Single Light Rule.** Blue is the only hue that lights up. If something needs attention, it turns blue or carries a blue magnet; no other accent color is introduced.

**The Tinted Photograph Rule.** Every photograph sits on ink, is darkened (ink at 30 to 60%), and gets a blue color-blend overlay. Untreated stock color never reaches the page.

## Typography

**Display Font:** Geist (with Helvetica Neue, Arial)
**Body Font:** Geist (with Helvetica Neue, Arial)
**Label/Mono Font:** Geist Mono (with ui-monospace)

**Character:** Geist stands in for Helvetica Now Display: semibold, very tight, stacked in short lines like signage. Geist Mono labels are the board's annotation voice: tiny, uppercase, slightly tracked, always quieter than what they annotate.

### Hierarchy
- **Display XL** (600, clamp 2.75rem to 6rem, line-height 0.92, -0.045em): page hero titles and the cases teaser heading, set as masked lines.
- **Display L** (600, clamp 2.5rem to 5rem, 0.95): footer call, phrase band quotes, case headings.
- **Statement** (600, clamp 1.625rem to 3.125rem, 1.06): the opening paragraph of each section, scroll-scrubbed from grey to ink. Max width 30ch, 34ch from lg.
- **Title M** (600, clamp 1.375rem to 1.875rem, 1.08): card titles, menu links, footer board values, Diagnóstico answers.
- **Board Row** (500, clamp 1.125rem to 1.5rem, -0.02em): every row in a board list. One size for every row.
- **Body L** (400, clamp 1.0625rem to 1.25rem, 1.45): leads beside heroes and section closers, 34 to 42ch.
- **Body** (400, 0.9375rem, relaxed): card bullets, summaries, footer lists.
- **Label** (400, 0.6875rem, 0.04em, uppercase mono): annotations, codes, counters ("GE [#01]", "01"), button text, field labels. Tag variants drop to 0.625rem.

### Named Rules
**The One Size Board Rule.** Rows on a board share one type size. Rank is carried by weight, case, the mono counter and the reversed hover plate, never by making one row bigger.

**The Tabular Clock Rule.** Every live number (clocks, counters, codes) uses tabular figures so the board never jitters.

## Layout

Full-width shell with fluid side gutters (clamp 1rem to 2rem); no max-width container, content runs edge to edge like a wall display. From lg (1024px) compositions sit on a 12-column grid: heroes split 8/4 (title / lead), case pages 5/7 with the text column sticky at top 7rem, board sections 4/8 (label / list).

Section rhythm: 7rem top and bottom on mobile, 9rem top and 10rem bottom from md. Inside sections, gaps are tight: 0.5rem between cards on small screens, 0.75rem from lg. Card padding is 1.25rem, 1.5rem from md. The scrubbed statement opens most sections; the content block follows 5 to 8rem below it.

Responsive behavior: card grids go 1, 2, then 3 columns (sm, lg). The Diagnóstico pinned dial runs only at lg and above with motion allowed; below that it becomes a plain ruled list. Hero cards and the hero readout are absolutely placed from md; on mobile they stack under the title.

## Elevation & Depth

Flat. Depth comes from tonal steps (ink to ink-2, paper to mist), 1px hairlines, and the color-blend tint on photographs. Layering is spatial rather than shadowed: when the menu opens, the whole page lowers like a card (translateY of the menu height, 0.75rem top corners) to reveal the ink panel above it.

### Shadow Vocabulary
- **Floating preview** (`box-shadow: 0 24px 60px -20px rgba(0,0,0,0.5)`): only on the services index hover thumbnail, which floats over a row. Not a general card shadow.

### Named Rules
**The Flat Board Rule.** Surfaces sit flat at rest and on hover. A state change is a color inversion, not a lift.

## Shapes

Gentle, consistent corners scaled to object size: 3px on section tags and case labels, 5px on arrow chips, 6px (0.375rem) on buttons and inputs, 8px (0.5rem) on every card and media frame, 12px only on the lowered page sheet. The circle is reserved for the menu toggle and the Diagnóstico dial.

The magnet is the signature form: a square with corners at 22% of its side, matching the logo's four modules. It appears at 8 to 12px as a list bullet, 28px as a check holder on case results, as the 24 cells of the shift strip, and as viewport-sized tiles in the page curtain.

## Components

### Buttons
Soft-cornered pill with a square arrow chip on its right edge, the Cominvi control shape.
- **Shape:** 2.5rem tall, 0.375rem corners; chip 2rem square with 5px corners, inset 0.25rem from the right.
- **Primary (ink):** ink plate, white mono label, white chip with an ink line arrow (1.25 stroke).
- **Paper:** white plate, ink label, ink chip with white arrow. Used on ink grounds.
- **Blue:** blue plate, white chip. Used for the WhatsApp call on dark scenes.
- **Hover / Focus:** the plate inverts (ink and paper go blue, blue goes ink) over 300ms expo-out; the chip recolors to match and the arrow nudges 2px right. Focus is the global 2px blue outline at 3px offset.
- **Text link variant:** mono label with a 1px bottom rule ("Saiba mais"); hover turns rule and text blue.

### Chips
- **Section tag:** a stacked pair set inline, floated left into the first line of a statement or heading: a boxed index ("S.02", 1px ink border) above a solid ink label ("NOSSOS SERVIÇOS"). Inverts on dark ground. It is the section's index, not a heading. Below 768px the column is too narrow to float it, so on phones it sits above the statement with 1rem below it.
- **Media label:** white 3px-cornered mono label pinned top-left on case images ("C1 · SAÚDE"); hero cards carry a white bottom bar with an arrow that turns blue on hover.

### Cards / Containers
- **Corner Style:** 0.5rem.
- **Background:** paper on mist (service cards), ink (case result tiles), ink-2 cells (footer board).
- **Shadow Strategy:** none; see Elevation.
- **Border:** none on light cards; hero cards carry a 1px white 10% ring on the dark scene.
- **Internal Padding:** 1.25rem, 1.5rem from md.
- **Service card:** line icon and mono code on top, four magnet-bulleted items, then the title and a 2rem ink arrow chip. The whole card inverts to blue on hover (500ms). Its title carries a view-transition name and morphs into the detail page heading.
- **Case card:** 16:10 tinted image that scales 1.05 on hover, a large semibold title that turns blue, then ruled result rows with magnets.

### Inputs / Fields
- **Style:** paper field, 1px hairline stroke, 0.375rem corners, floating mono label inside the top-left; generous top padding.
- **Focus:** stroke turns blue with a 3px blue halo at 15%; the label turns blue. Hover darkens the stroke to ink at 40%.
- **Error:** stroke and message in a functional red; consent uses a native checkbox with blue accent.
- **Submit:** the ink button at 3rem with a 2.25rem chip.

### Navigation
Fixed header: logo left, "Menu" plus a 2.75rem outlined circle with two hairlines right. The header reads the section underneath (sections on ink declare themselves dark) and flips between white and ink text. It hides while scrolling down past 120px and returns on scroll up. Opening the menu lowers the page to reveal an ink panel with Title M links (hover to signal blue), a services column, and a mono contact strip; the circle fills blue and its lines cross. Escape or a click on the lowered page closes it.

### Board List
Ruled rows (hairline top and bottom), each with a magnet, the item in Board Row type, and a zero-padded mono counter. Hover reverses the whole row: blue plate on light, white plate on dark, with the magnet inverting too.

### Footer Operations Board
An ink footer with a Display L closing line and two buttons (blue WhatsApp, paper message), then a 12-column board of ink-2 cells separated by 1px gaps: a live Brasília clock with seconds, the 24-cell shift strip (past hours dimmed, current hour a blue magnet, a 1px white marker at the exact minute), coverage, and full-width WhatsApp and e-mail cells that turn blue on hover.

### Diagnóstico Dial
Desktop-only pinned scene: the recurring challenges listed left (active in ink, the rest at 15%), a 120-tick dial in the centre whose ink ring fills by scroll progress via a conic mask, a mist disc holding the matching service line icon in blue (or the logo mark for the business-vision answer), and the answer text right. Answers enter with a short rise and blur-out (0.8s expo-out).

### Page Hero and Phrase Band
Interior pages open on paper with a Display XL title in masked lines, a lead in the right four columns, and an optional 16:7 tinted image with parallax. The home and service detail heroes are full-bleed ink scenes instead. The phrase band is a full-bleed tinted photograph (80 to 90svh) holding one of the client's own phrases in Display L, bottom-left.

### Motion Grammar
- **Tile curtain:** internal navigation covers the viewport with magnet tiles in blue, staggered outward from the click point (0.42s, power3.in), shows the destination name in mono, swaps the route inside a view transition, then clears from the far corner. First load opens from a solid blue panel with the white logo mark.
- **Morph:** service cards and service index rows use a shared-element view transition; the clicked title flies into the detail heading while the old page scales and dims out.
- **Page intro hooks:** masked lines rise 105% (1.25s expo-out, 0.08s stagger); intro blocks fade up 16px; hero media settles from 1.14 scale over 2.2s.
- **Scroll hooks:** scroll lines rise in batches, blocks lift 36px and fade in, media drifts against scroll by a per-element percentage, and section statements scrub word opacity from 16% to full.
- **Scroll:** Lenis smooth scroll (lerp 0.095) driven by the GSAP ticker.
- **Reduced motion:** curtain, morph, scrubs, parallax and the pinned dial are all skipped; content renders in place.

## Do's and Don'ts

### Do:
- **Do** keep blue the only accent, and use signal blue only on ink.
- **Do** express hover as inversion: light surfaces go solid blue with white content, dark surfaces go white with ink content.
- **Do** mark list items, current states and statuses with the 22% rounded-square magnet.
- **Do** set every label, code and counter in uppercase Geist Mono at 0.6875rem with tabular figures where numeric.
- **Do** open sections with a scrubbed statement, with the S.0x section tag floated inline into its first line.
- **Do** darken and blue-tint every photograph with a color-blend overlay.
- **Do** keep cards at 0.5rem corners and rely on tonal grounds and hairlines for structure.
- **Do** honor reduced motion everywhere a curtain, scrub, pin or parallax runs.

### Don't:
- **Don't** stack a label or tag above a heading; the section tag lives inline at the start of the text it indexes. The one exception is phones (below 768px), where the section tag moves above the statement.
- **Don't** add drop shadows to cards, buttons or rows; the floating preview on the services index is the only shadow.
- **Don't** vary type size between rows of the same board.
- **Don't** introduce a second accent hue, gradients on UI, or untreated stock photography.
- **Don't** invent metrics, client names or testimonials to fill a stat grid; facts that are statements are set as text rows.
- **Don't** imply a 24h on-call service in labels or readouts; the clock shows the hour, not a shift.
