# Secondary-page readability revision

2026-09-09. Implemented at the user's request after they approved the recommendations in this task. The user also requested consideration of narrative imagery and then specifically suggested shallow full-width panoramas between sections.

## Content and composition

Fractional support now has a descriptive introduction, early anonymous project accounts structured as Situation / Work / Outcome, separated service rows with outcome summaries, and a compact three-step engagement sequence. Existing project anchors and practical questions remain accessible. Repeated positioning prose and the duplicate benefit strip/working note were removed.

Personal support follows what to bring, what we do together, what can be reused and who it is for. A clearly labelled illustrative meeting-preparation workflow replaces the abstract context equation. The neurodivergence context and distinction from clinical care remain visible.

About brings the three perspectives forward and groups their supporting experience below, with CV links before the detailed account. The user has requested their sketch profile picture. The image file has not yet been located; the existing photograph remains until it is supplied. Credentials and client outcomes are derived from existing approved page copy, without adding quantitative results or testimonials.

Tools uses a native, keyboard-operable Cowork / Claude Code radio group. One choice filters both marketplace addition and plugin installation. The chosen plugin and first-session guidance survive app switches. A Change app link returns focus to the selected radio. Nothing is stored or installed. Without JavaScript, both app paths remain visible; printing also exposes both paths.

## Imagery

Three illustrations were generated with the built-in image_gen tool. Initial prompts are in `narrative-image-prompts.json`; final transparent replacements are in `transparent-panorama-prompts.json`. They use graphite, warm watercolour and restrained red to complement the existing portraits. They depict illustrative scenes, not actual client work.

- `public/images/narrative/working-together-{600,1200}.webp`: a shared paper prototype, in the Fractional introduction; transparent 3:1 source displayed in a shallow 4:1 area on desktop / 3:1 on phones.
- `public/images/narrative/a-place-to-return-{600,1200}.webp`: a loose note finding a home, in the Personal introduction; transparent 3:1 source displayed in a shallow 4:1 area on desktop / 3:1 on phones.
- `public/images/narrative/workbench-panorama-{900,1800}.webp`: a shallow full-width pause before Fractional practical questions; approximately 5:1 on desktop with height capped at 320px, 3:1 on phones.

The generated originals remain in the task's Codex generated_images directory. All assets consumed by the website are in this repository. WebP files use responsive source sets, explicit dimensions and lazy loading. The two narrative figures have descriptive alt text and illustration captions. The panoramic atmosphere image carries no unique information and has an empty alt attribute.

## Verification

Astro check: 33 files, no errors, warnings or hints. Production build: nine pages. All 68 Playwright checks passed in Chromium and Firefox, including accessibility, 320–1440px widths, navigation, app selection, plugin selection, copying, no-JavaScript fallback and existing enquiry protections. No real enquiry or deployment occurred. Manual browser review covered service rows, project accounts, mobile Personal workflow, mobile Tools selector, About hierarchy and the shallow panorama. Formatting and whitespace checks are recorded with the APV capture.

## Subsequent image direction

The user found the initial 3:2 figures too imposing and requested all illustrations as panoramas with transparent backgrounds. Replaced all three assets with genuine alpha-channel WebP panoramas. Verified source and output alpha rather than relying on a checkerboard preview: two intermediate collaborative-image outputs had painted checkerboards and were rejected. The final files use real transparency. Existing opaque source renders remain outside public assets in the Codex generation folder; the site consumes only the transparent replacements. Removed the panorama container background. The inline vignettes now occupy about half the previous height.

The requested profile-sketch replacement is pending the user's file path or attachment. The project images and recent Downloads were checked; no matching sketch was found. Do not generate a substitute portrait or imply the swap is complete.

## Art direction review status

The user subsequently liked the visual-break structure but questioned the content/style and suggested fewer hands. All current narrative illustrations are provisional. A preference question is pending between abstract editorial, landscape-like and simplified recognisable-work directions. Do not treat the currently displayed imagery as final approval. Functional/readability changes remain delivered; final artwork and the supplied profile-sketch swap remain under review.

## Three art directions for visual selection, 2026-09-09

The user asked to generate all three proposed alternatives and flip between them visually. Generated hand-free transparent panoramas for A: abstract editorial fragments and threads; B: landscape with a path, bridge and clearing; C: recognisable documents becoming a usable briefing. No direction has been selected or approved for the website.

`design/imagery-review.html` is a standalone comparison with identical placement and surrounding text, A/B/C buttons, previous/next controls, arrow-key navigation and paper/putty/dark background selection. Assets and exact prompts are in `design/imagery-options/`. Serve with `python3 -m http.server 4393 --bind 127.0.0.1 --directory design`, then open `http://127.0.0.1:4393/imagery-review.html`. The review server was left running for the user. Browser inspection verified switching A/B/C, next, dark background compositing and return to paper. The website's current provisional illustrations remain separate from this exploration. The requested About sketch still awaits its file.
