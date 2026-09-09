# Build decisions, 8 September 2026

This record follows the user's approval to proceed until the site is ready to publish. It documents implementation choices, not new requirements imposed on the user.

## Visual translation

The chosen Working canvas mockups are the design reference. The build uses self-hosted Work Sans for the main type, Source Serif for small reflective notes, the original ExFu wordmark, matte paper cards and the five approved charcoal portraits. The principal surfaces are warm paper `#f5f3ee`, white `#fcfbf8`, putty `#dfd8ce` and dark mushroom `#4b463e`. The red UI accent is `#af3323`: it was darkened slightly during accessibility testing to meet contrast requirements on the putty backgrounds. The source logo retains its own original red.

The paper cards are semantic HTML, so their words stay readable and accessible at any screen size. Decorative geometry uses CSS. The avatar fan is followed by three explicit needs links; no visitor's profession, ethnicity or neurotype is inferred from their choice of face. Avatars are illustrations and are not client endorsements. The definitions band contains the actual wordmark and the explicit Kung Fu reference.

Interior pages use a shorter hero, a local contents rail and a sustained reading column. Background contrast marks meaningful sections. FAQs are native `details` elements. Reduced-motion preferences and keyboard focus are supported. Mobile navigation has a no-JavaScript list fallback.

## Delivery and enquiry

A static Astro build fits the operator's existing Netlify hosting and avoids a runtime backend. The initial reference-compatible Astro 6 dependency was upgraded to the current Astro 7.3.2 release after npm reported advisories; the resulting install reported zero vulnerabilities. Dependencies are locked for reproducible installs.

The public form is present in generated HTML with Netlify form detection and a honeypot. It posts natively without JavaScript. The enhanced flow checks HTTP errors, times out after 15 seconds, prevents duplicate in-flight submissions and keeps the visitor's text when receipt is uncertain. A preview still carrying Netlify's unprocessed form marker cannot report a false submission success.

The optional quiz asks about need, obstacle and stage. Results are rules-based starting suggestions. They create an editable message; changing quiz answers will not overwrite a visitor's own edited brief. Nothing is transmitted until the visitor submits. The quiz gets a compact mobile introduction so its first question is visible on arrival. The full direct-contact introduction returns when the visitor skips or finishes it.

Alastair specified `al@exfu.ai` and will deploy to the existing Netlify site. The code cannot configure or prove email notification delivery in that account. `README.md` gives the exact form name and setup steps. Browser submission tests use intercepted responses and make no external enquiry.

## Content and discovery

The main routes are Home, Fractional support, Personal support and About. Fractional support is the principal business offer; defined projects are discussed within it. The About page uses the actual supplied headshot and links to the supplied CVs. Recent project accounts stay anonymous and make no numerical revenue or productivity claims.

Substantive service and experience copy is present in initial HTML. Metadata, sitemap and Organization/Person/Service structured data describe that visible content. `llms.txt` links to the primary pages rather than maintaining a competing, hidden version of the pitch.

The old quiz, pricing meter, AI chat and agent API are not launch dependencies. No separately hosted old backend has been edited or decommissioned. Legacy website routes get explicit redirects rather than being silently left as dead ends. Setup/install links lead to current marketplace documentation; the old product-specific setup instructions have not been copied into the new consultancy site.

## Operational boundaries

The source project at `/Users/al/Studio/projects/exfu_website` was read only. Selected brand assets, portraits, fonts and the headshot were copied into this project; the supplied CVs were copied for download. The user remains responsible for Netlify deployment, form detection, notification configuration and the final real-delivery smoke test. There is no automated publishing step or external communication in this work.

## Visitor review implemented, 2026-09-09

Alastair resumed and authorized the earlier feedback plus copy and interior-page refinements. The quiz now accepts multiple answers to each question and gives a useful starting plan before optional email capture: a reason, concrete steps, a question to consider and relevant support options. Mixed needs retain multiple offers. Copying needs no email; returning to the plan and changing answers preserves an edited enquiry. Recommendations use explicit local rules, with no LLM, pricing meter or diagnostic score.

The homepage invitation follows the avatar area. Tools has a navbar link, a homepage section above definitions and its own directory page pointing to source documentation. All 36 original portrait variants are included in the ring, adapted from the legacy interaction. It supports drag, horizontal wheel, arrow controls, pause and reduced motion; an ordinary list provides a second navigation route. Hero papers move subtly once, for less than five seconds. Footer is dark.

Interior pages retain their explanatory prose, broken up with practical checklist notes, a project sequence and a three-perspective block. Founder experience comes first; the degree wording, CEOs and revenue-channel additions follow the user's wording. Public case-study prose and anchor names no longer identify EV mapping. Original supplied CV PDFs are unchanged.

Local preview is http://127.0.0.1:4387/; automated tests use 4391 to avoid the legacy site's port. T3-refine-visitor-journeys records this follow-on work; the completed original implementation plan is not reopened. Deployment and actual Netlify delivery remain Alastair's responsibility.

## Second visitor review, 2026-09-09

User requested one card per persona with cycling portraits, a red fan baseline and spacing, much larger needs CTAs, stronger post-hero benefits, plain project delimiters, always-visible FAQs, a button-styled Tools navigation destination and more practical installation help. Implemented 12 cards with all 36 illustrations crossfading on staggered five-second cycles; pause/reduced motion stop both rotation and portrait changes. Service questions use ordinary headings and paragraphs, not disclosure elements.

Tool links now point to the Marketplace. Copyable commands use the verified current marketplace name `exfu-marketplace`, not the legacy site's `exfu`. Public manifest verified at https://raw.githubusercontent.com/ExFu/exfu-marketplace/main/.claude-plugin/marketplace.json on 2026-09-09. Cowork instructions were checked against https://support.claude.com/en/articles/13837440-use-plugins-in-claude and Claude Code syntax against https://code.claude.com/docs/en/plugins-reference. Old install/start/prepare pages supplied setup ideas but their stale aliases and UI assumptions were not copied. First-session folder/setup guidance and troubleshooting now live on Tools; legacy setup redirects lead there. No actual installation or enquiry was performed.
