# Pomichnyk

A Ukrainian-first marketing website and scripted product demo built with Next.js App Router, strict TypeScript, Tailwind CSS 4, Framer Motion, and Lucide. All illustrations use CSS or inline SVG; no external image hosts or paid APIs are used.

## Run locally

Use Node.js 22 or later:

```sh
npm install
npm run dev
```

Open http://localhost:3000. For a production check:

```sh
npm run lint
npm run build
npm start
```

Google fonts (Manrope and Nunito Sans, including Cyrillic) are downloaded by `next/font` during the build and self-hosted afterward. The first build requires network access.

## Configuration and content

- `src/config/site.ts`: product name, tagline, description, contact email, and canonical URL. Replace the placeholder contact email before launch.
- `src/content/uk.ts`: Ukrainian interface copy, FAQ, scenarios, and pricing. It references the configured product name. Add another dictionary and locale routing for a second language.
- `src/app/globals.css`: palette, layout, responsive rules, and system dark mode. Reduced motion is supported.
- `src/components/demo.tsx`: four local keyword-based flows and fallback. Chat messages stay in the browser; input is never sent to an API. The calendar card is a fixed example, not a date parser. Voice is a planned feature, not an active recorder.
- `src/lib/analytics.ts`: development console event abstraction. No email or prompt text is logged. Connect a consent-aware provider here.

Annual pricing charges ten monthly payments for twelve months and displays the equivalent monthly price. Prices are preliminary USD amounts; Business is a starting price. No payment is collected.

## Waitlist integration

`POST /api/waitlist` accepts JSON `{ "email": "name@example.com", "business": "salon", "website": "" }`. The optional business field accepts `salon`, `tutor`, `workshop`, `consultant`, or `other`; `website` is a honeypot.

The handler validates on the server, bounds request size, rejects cross-origin browser submissions, deduplicates normalized emails, and allows five attempts per IP per fifteen minutes. The form also validates on the client and displays pending, success, and failure states.

**Demo storage is intentionally process-local and temporary.** Entries disappear on restart and are not shared between instances. The website explicitly explains this. Rate limiting is also process-local; only trust IP headers set by your deployment proxy. This is not a production signup database.

Before a real launch:

1. Replace the `entries` map with a database or email-provider adapter with a unique email constraint.
2. Move rate limiting to Redis or an equivalent shared store; configure trusted proxy handling.
3. Keep provider credentials in server-only environment variables. Add double opt-in, unsubscribe, retention, and deletion workflows.
4. Replace the privacy/terms placeholders with reviewed policies and configure the real contact address.
5. Retain generic responses so duplicate addresses are not disclosed. Do not add a public route exposing signups.

## Deploy to Vercel

Import the repository as a Next.js project, select Node.js 22+, and set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin (without a trailing slash). Run the default `npm run build`. The sitemap, robots file, and Open Graph metadata use that URL. Preview deployments should be configured not to index. This task creates a local project and does not publish it.

## Verification and launch checks

Run build and lint before deploying. Check the four chat prompts, unknown prompts, reset, annual/monthly prices, keyboard tabs, accordion, mobile menu, and waitlist success/validation/rate-limit states. Test system dark mode and reduced motion. Lighthouse 95+ is a target, not a claimed score; run an audit against a production deployment on a representative mobile device before launch.

The application is a prelaunch prototype: messenger/calendar/bank integrations, voice capture, and tax-ready export are planned capabilities. No invented customers, testimonials, or business performance claims are used.
