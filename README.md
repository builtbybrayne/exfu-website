# ExFu website

The new ExFu site: Home, Fractional support, Personal support, About and Tools, with an optional three-question quiz and direct human enquiry. Built as static Astro pages for the existing Netlify site. There is no AI chat, pricing meter or application backend.

## Run locally

Use Node 22.12 or newer (Netlify is configured for Node 22).

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 4387
```

For the production output:

```sh
npm run check
npm run build
npm run preview
```

`dist/` is the publish directory. `netlify.toml` contains the build settings. `public/_headers` and `public/_redirects` ship in `dist/`, so security headers and old-route redirects also work with a manual upload. No environment variables or service credentials are required.

The local preview intentionally refuses to report a successful enquiry submission. Netlify removes the form-detection marker during deployment; until that has happened, visitors get an email alternative and their text stays in the form.

## Deploy to the existing Netlify site

Alastair owns deployment. Nothing in this project deploys automatically or changes the existing site.

1. In the existing Netlify site's **Forms** area, enable form detection before deploying. If it was disabled, enable it and redeploy.
2. Deploy this project with `npm run build` and publish `dist/`. For a manual deploy, build locally and upload the **contents of `dist/`**, not the source folder. If using Git integration, point the site's repository/base directory at this project and use the settings in `netlify.toml`.
3. Confirm the new form named **`enquiry`** appears in Netlify. This differs from the older site's `contact` form.
4. Add an **email form-submission notification** for `enquiry` addressed to **al@exfu.ai**. Existing notifications tied to `contact` do not automatically apply to the new form.
5. Send one clearly marked test enquiry on the deployed site. Confirm it appears under verified submissions, the notification reaches `al@exfu.ai`, Reply-To uses the visitor's email, and the thank-you page appears. Check spam/quarantine if needed. Repeat with JavaScript disabled to verify the native POST route.

The code and mock-response tests cannot verify account-level form detection, email delivery or spam classification. Those are the remaining deployment checks, not simulated successes claimed as real delivery. See [Netlify form setup](https://docs.netlify.com/manage/forms/setup/) and [form notifications](https://docs.netlify.com/manage/forms/notifications/).

The canonical public origin is `https://exfu.ai`. If publishing to a different permanent domain, update `astro.config.mjs`, `src/layouts/Layout.astro`, `public/robots.txt` and `public/llms.txt` together.

## Verify

```sh
npx playwright install chromium firefox
npm run check
npm run build
npm test
npm run format:check
```

The Playwright suite runs in Chromium and Firefox. It starts or reuses a local production preview on port 4391, separate from the visitor preview on 4387. It checks the nine routes, accessibility rules, links, widths from 320 to 1440 pixels, mobile keyboard navigation, quiz state and editing, local submission protection, mocked Netlify success/failure, no-JavaScript fallback, and generated form/metadata assets. It never sends a real external enquiry. `https://exfu.test` is a reserved test hostname; every request to it is intercepted and fulfilled locally.

With a preview running at port 4387, `npm run test:visual` writes desktop/mobile screenshots under the ignored `artifacts/visual/` directory. `npm run social-card` regenerates the committed sharing image from the actual logo and font. Run `npm run build` afterwards to include a regenerated image in `dist/`.

## Where things live

- `src/pages/`: page copy and semantic markup; `/enquire/` contains the static Netlify form.
- `src/layouts/Layout.astro`: navigation, footer, metadata and Organization/Person/Service structured data.
- `src/styles/global.css`: responsive Working canvas design system.
- `src/scripts/enquiry.ts`: optional quiz and progressive form enhancement. It preserves an edited brief, reports failures, prevents duplicate in-flight submissions, and times out after 15 seconds.
- `public/`: self-hosted fonts, original logo/illustrations, actual headshot, CV downloads, crawler guidance and sharing image.
- `design/`: approved mockups, source review, copy drafts and decision history. These are review artifacts and do not ship in the built site.
- `planning/` and `.apv/`: plan documents and append-only decision/work record. Read `CLAUDE.md` and `planning/readme.md` before changing direction. The event log is authoritative; old draft prose is preserved as history.

## Content and launch choices

Fractional/contract work has the principal commercial route. Personal support remains easy to find. Remote work is preferred; Bristol sessions are by arrangement. Anonymous project accounts are grounded in the supplied CVs and conversation, without client logos, endorsements or invented revenue results. The avatar portraits are labelled illustrations: 12 persona cards each crossfade through three variants. Pause and reduced motion stop the cycling. Service FAQs are permanently visible. The Tools page includes a four-plugin selector, section navigation, Cowork and Claude Code setup paths, copyable commands and plugin-specific first-session guidance. Persona details appear in an optional full-card list and an accessible modal from each fan card.

The quiz asks about need, obstacle and stage. Need-specific links start at question two; Back can change the preselected answer. The general quiz link starts at question one. All three questions accept multiple selections. It provides a practical starting plan, explains the fit and suggests relevant support before asking for contact details. Visitors can copy the plan without sharing an email. It creates an editable brief in the browser and sends nothing until the visitor submits. There is no newsletter opt-in, marketing tracking or cookie banner because this implementation adds no marketing analytics or cookies.

Search context lives in visible service prose, FAQs, the About page and CVs, with matching structured data. `llms.txt` is a short directory to that public content, not a promise of search visibility. No agent API is required.

Old `/you`, `/business`, `/teams`, `/therapists` and `/contact` links lead to the corresponding new pages. `/tools/` is the new tool directory; `/install`, `/start` and `/prepare` lead to the guided setup on `/tools/#setup`. `/for-agents` leads to the public content directory. The old agent backend is not modified by this project; any separately hosted `agent.exfu.ai` service remains outside this release.

The original `/Users/al/Studio/projects/exfu_website` project is read-only reference material and has not been edited.
