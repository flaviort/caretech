# Post-launch checklist

Work through it top to bottom. The first two sections block the contact form and indexing, so do them on launch day.

## 1. Deploy and domain

- [x] Merge `stage` into `main` and confirm the production deploy on Vercel is green.
- [ ] Point `caretechit.com.br` at the Vercel project and set `www.caretechit.com.br` to redirect to it (or the other way round, but pick one; the canonical tags use the bare domain).
- [ ] Open `https://caretechit.com.br/robots.txt` and `/sitemap.xml` and confirm both mention `caretechit.com.br` (the old files pointed to another site).
- [ ] Set the production env vars on Vercel (see `.env.example`), then redeploy:
  - [ ] `RESEND_API_KEY`
  - [ ] `CONTACT_TO_EMAIL` (defaults to `contato@caretechit.com.br`)
  - [ ] `CONTACT_FROM_EMAIL` (defaults to `Site CareTech <site@caretechit.com.br>`)
  - [ ] `GOOGLE_SITE_VERIFICATION` (only if Search Console is verified by meta tag, see section 3)

## 2. Contact form (Resend)

Until `RESEND_API_KEY` is set, the form answers with a message pointing visitors to WhatsApp and e-mail. Nothing breaks, but no message reaches the inbox.

- [ ] Create the Resend account under the client (or add the Resend integration from the Vercel Marketplace, `resend/resend-email`, which sets `RESEND_API_KEY` on the project by itself).
- [ ] In Resend, add the domain `caretechit.com.br` and copy the DNS records it gives you (SPF, DKIM, and the MX for the bounce subdomain).
- [ ] Add those records at the domain's DNS provider and wait until Resend shows the domain as verified.
- [ ] Add a DMARC record if the domain has none (`_dmarc.caretechit.com.br`, start with `v=DMARC1; p=none; rua=mailto:contato@caretechit.com.br`).
- [ ] Create an API key with sending access only, restricted to `caretechit.com.br`, and set it as `RESEND_API_KEY`.
- [ ] Send a test from the live form and check:
  - [ ] it arrives at `contato@caretechit.com.br` and not in spam
  - [ ] hitting Reply goes to the visitor's address, not to `site@`
  - [ ] accents and line breaks in the message come through intact
- [ ] Check the Vercel function logs for `contact form: send failed` after the test.

## 3. Search engines

- [ ] Google Search Console: add a Domain property for `caretechit.com.br` (DNS TXT record, covers www and http). If DNS access is a problem, use a URL-prefix property and set `GOOGLE_SITE_VERIFICATION` instead.
- [ ] Submit `https://caretechit.com.br/sitemap.xml` in Search Console.
- [ ] Use URL Inspection to request indexing for Home, `/servicos`, the six service pages and the two case pages.
- [ ] Bing Webmaster Tools: import the site from Search Console.
- [ ] Run Home and one service page through Google's Rich Results Test and validator.schema.org. Expect Organization, WebSite, Service and BreadcrumbList with no errors.
- [ ] After two to four weeks, check the Pages report in Search Console for anything excluded or flagged.

## 4. Analytics and LGPD

- [x] Cookie banner shipped. GTM (`GTM-PMP4P8FM`) loads only after consent and only on production.
- [ ] In GTM, add the GA4 Google tag (Initialization - All Pages trigger) and publish the container. Don't also add GA directly to the site.
- [ ] Accept the banner on the live site and confirm page views show up in GA4 Realtime. Then reject and confirm they stop.
- [ ] Decide whether to track the contact actions (form sent, WhatsApp click, e-mail click) as events. None are wired yet.
- [ ] Optional: turn on Vercel Web Analytics and Speed Insights, which are cookieless.

## 5. Social previews

- [ ] Paste the Home URL and one service URL into LinkedIn Post Inspector and the Facebook Sharing Debugger; confirm the right title, description and image.
- [ ] Send the Home link in a WhatsApp chat and check the preview card.
- [ ] Ask the client for the LinkedIn and Instagram URLs. Once we have them, add them to the footer (icons already exist in `src/assets/svg/social/`) and to `sameAs` in the Organization JSON-LD (`src/lib/seo.ts`).

## 6. Quality pass on the live site

- [ ] PageSpeed Insights on mobile for Home and a service page. Look at LCP (the hero photo) and CLS.
- [ ] Test on a real iPhone and Android: menu, page transitions, the form, the WhatsApp button.
- [ ] Turn on "reduce motion" on one device and confirm the curtain and scroll effects step aside.
- [ ] Visit a made-up URL and confirm the 404 page shows.

## 7. Content and housekeeping

- [ ] Send `_docs/briefing-conteudo-cliente.md` to the client: approval of the new service copy and FAQs, plus the questions that let us deepen services and cases.
- [ ] Keep the Shutterstock license records for the 11 licensed photos somewhere the client can find them.
- [x] Delete `src/assets/img/og-image.png`; it's the old temporary-site image and nothing uses it.
- [ ] When page content changes, bump the `updated` date in `src/app/sitemap.ts`.
