# CareTech imagery brief

Status: all 14 slots filled in `public/img/photos/`. `hero`, `hero-card-a` and `hero-card-b` are Magnific (Seedream 5 Pro) generations; the other 11 are Shutterstock images licensed on the team plan, then resized and graded with ffmpeg to match. Intro, band, case1 and about needed a stronger night grade.

The current photos are generic Unsplash stock. This brief replaces them with one coherent series, in the spirit of cominvi.com.mx/technology: close, cinematic, people mid-task, real depth of field.

## The look

- **Cinematic stills, not stock.** 35mm or 50mm, wide open (f/1.4 to f/2). A shallow focal plane with something out of focus in the foreground: a rack edge, a glass partition, a shoulder, cable bundles.
- **One practical light per frame.** A monitor glow, a rack LED strip, corridor ceiling lights, a desk lamp. Everything else falls into shadow.
- **One grade across the whole set.** Deep blue-teal shadows close to the brand blue (#0367D7), neutral skin, cool-white highlights, fine film grain. The site adds a light blue color blend on top, so images should already lean blue.
- **Real people, unposed.** Faces partly turned or in profile, hands working, nobody smiling at the camera. Scrubs and badges are fine; lab coats used as costume are not.
- **Brazilian context.** Portuguese signage if any text is visible, no US hospital branding, no flags.
- **Avoid:** handshakes, pointing at screens, holographic UI, glowing brains, readable fake dashboards (keep screens blurred), stethoscopes on keyboards, white seamless backgrounds.

## Shot list

The ratio is the crop the layout uses. Deliver at least the listed width.

| Slot | Where it shows | Ratio / min width | Shot |
| --- | --- | --- | --- |
| `hero` | Home first viewport, full bleed, text on the left | 16:9 / 2560 | Hospital corridor at night, ceiling lights receding. In the right third, an IT technician seen from behind and slightly out of focus, carrying a laptop. Left half dark and calm for the headline. |
| `heroCardA` | Home hero card "Nossos serviços" | 3:2 / 800 | Macro of hands seating a fiber patch cable in a rack, green and blue LED bokeh. |
| `heroCardB` | Home hero card "Fale no WhatsApp" | 3:2 / 800 | Nurse station at night, monitor glow on a face in profile, foreground glass blur. |
| `intro` | Home "Quem somos" | 4:3 / 1600 | IT manager and a hospital administrator reviewing a tablet in a corridor; the tablet sharp, faces soft. |
| `band` | Home phrase band, full bleed | 16:9 / 2560 | Wide hospital server room or comms room, one figure in the aisle, cold blue light, deep perspective. |
| `ge` | Gestão Estratégica de Tecnologia | 16:9 / 2560 | Small meeting at a glass table at dusk, a chart reflected in the glass in the foreground, people out of focus behind. |
| `os` | Operações e Sustentação | 16:9 / 2560 | Technician kneeling at an open rack with a flashlight, cable bundles framing the shot. |
| `pe` | Especialistas Sob Demanda | 16:9 / 2560 | Over-the-shoulder of a data analyst at two monitors, face lit by the screens, room dark. |
| `id` | Dados e Analytics | 16:9 / 2560 | Close-up of glasses reflecting a chart, eyes in focus, everything else soft. Matches Cominvi's helmet close-up. |
| `in` | Integrações e Automações | 16:9 / 2560 | Macro of a patch panel with dozens of cables converging, extreme depth of field. |
| `ia` | Inteligência Artificial | 16:9 / 2560 | Dark room, a person's silhouette lit only by a large screen with an out-of-focus pattern of light. No robots, no brains. |
| `case1` | Case: gestão completa de TI hospitalar | 16:10 / 1800 | Hospital hallway, technician pushing a cart with networking gear past a nursing station. |
| `case2` | Case: migração de ERP | 16:10 / 1800 | Two people at a desk late at night, printed spreadsheets and a laptop, desk lamp as the only light. |
| `about` | Sobre page band | 16:7 / 2560 | Hospital building facade at blue hour, lit windows, shot from below. |

Fourteen images in all. If the budget only covers a few, do them in this order: `hero`, `heroCardA`, `heroCardB`, `intro`, `band`, then the six services.

## Prompt template (Magnific / Seedream / Nano Banana)

Fill in `{shot}` from the table.

> Cinematic film still, {shot}. Shot on 35mm, f/1.4, shallow depth of field, out-of-focus foreground element, single practical light source, deep blue-teal shadows, cool white highlights, natural skin tones, subtle film grain, Brazilian hospital setting, documentary realism, no text, no logos, no smiling at camera, no holograms.

Negative prompt, if the model takes one: `stock photo, posed, smiling, white background, hologram, glowing brain, readable text, watermark, cartoon, 3d render`.

## Shutterstock search terms

Filter to photos, horizontal, and the "shallow depth of field" or "selective focus" style where available.

- `hospital corridor night technician`
- `server rack hands fiber cable close up selective focus`
- `nurse station monitor night`
- `data center engineer flashlight rack`
- `glasses reflection data chart close up`
- `patch panel cables macro`
- `hospital building facade dusk`

## Delivery

Drop files into `public/img/photos/` named after the slot (`hero.jpg`, `ge.jpg`, ...). JPG, quality around 85, sRGB. The code change to switch from Unsplash to these files is one map in `src/content/site.ts`.
