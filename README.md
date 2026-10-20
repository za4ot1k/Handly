# handly

Ukrainian landing page built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and Lucide. Exports plain HTML, CSS, JS, and local assets for GitHub Pages. No Node.js server is needed in production.

## Local development

Use Node.js 22 or later:

```sh
npm install
npm run dev
```

## GitHub Pages

The repository remote is `https://github.com/za4ot1k/Handly`.

1. In GitHub, open **Settings > Pages > Build and deployment > Source** and select **GitHub Actions**.
2. Push these changes to `main` or `master`, or manually run **Deploy handly to GitHub Pages** from Actions.
3. The workflow installs dependencies, runs lint, builds `out/`, and deploys only that directory.

The expected default address is `https://za4ot1k.github.io/Handly/`. The workflow obtains the real URL and base path from `actions/configure-pages`, so project paths, user sites, and configured custom domains are supported. Do not enable automatic Next.js configuration injection: the repository already configures static export.

The workflow needs Pages enabled and the `github-pages` environment to allow deployment from the selected branch. This code change does not itself push commits or change repository settings.

## Test the exported site

```sh
npm run lint
npm run build
npm start
```

`npm start` serves `out/` on localhost:3000 and automatically detects its compiled base path. For a Pages-like project build in PowerShell:

```powershell
$env:NEXT_PUBLIC_BASE_PATH='/Handly'
$env:NEXT_PUBLIC_SITE_URL='https://za4ot1k.github.io/Handly'
npm run build
npm start
```

Open `http://localhost:3000/Handly/`. Clear these environment variables before returning to root-path development. Base paths are compiled into the export; rebuild when changing the deployment URL. Fonts are downloaded during build and self-hosted afterward. Internet access is needed for the first build.

## Configuration

- `src/config/site.ts`: product identity, contact email, public asset helper, canonical URL, optional waitlist endpoint.
- `src/content/uk.ts`: copy, pricing, FAQ, and demo content.
- `src/app/handly.css`: permanent dark visual theme.
- `public/logo.svg`: supplied handly logo. Asset paths include the deployment prefix.
- `src/components/demo.tsx`: browser-only scripted demo. It does not create real appointments or send messages.
- `src/lib/analytics.ts`: development-only event logs without email or prompt contents.

`next/link` handles the configured base path for internal navigation. `trailingSlash` exports `/privacy/index.html` and `/terms/index.html` for direct visits and refreshes. Images are unoptimized static files; no `/_next/image` endpoint is needed. `public/.nojekyll` prevents underscore-prefixed assets from being filtered during manual branch-based hosting.

## Waitlist on static hosting

GitHub Pages cannot run the former POST API. Its sample implementation is retained in `examples/waitlist-route.ts` for a separately hosted backend; it is not deployed by this project.

Without `NEXT_PUBLIC_WAITLIST_ENDPOINT`, the form shows an unavailable message and disables submission. It does not claim to save emails. To enable real signups, implement an HTTPS endpoint and set the repository Actions variable `NEXT_PUBLIC_WAITLIST_ENDPOINT`, then rebuild.

Expected request: POST JSON `{ "email": "name@example.com", "business": "salon", "website": "" }`. The business field is optional; supported values are `salon`, `tutor`, `workshop`, `consultant`, and `other`. Return a successful 2xx response only after accepting the signup, or 429 for rate limits. The backend must allow CORS for the Pages origin and handle OPTIONS, validate input, enforce rate limiting, check the honeypot, deduplicate emails, and persist signups. Do not put secret API keys in NEXT_PUBLIC variables.

Before enabling collection, replace the placeholder email and privacy policy, document the actual provider and retention policy, and implement unsubscribe/deletion procedures. The example in-memory backend is not production storage.

## Deployment limits

The UI, pricing toggle, tabs, chat demo, FAQ, and static legal pages run entirely in the browser. Banks, messaging, voice, and calendar integrations remain planned features. The build output is `out/`; uploading the source tree itself to Pages will not build the application.
