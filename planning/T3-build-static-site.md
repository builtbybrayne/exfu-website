---
id: T3-build-static-site
plan_kind: thematic
status: completed
tier: 3
t2_parent: T2-implementation
milestone: M2-publish-ready
---

# Implement the approved ExFu website

Grounding: T1-exfu-website and both content/visual T2s. Deliver Astro source, assets, Netlify form and configuration, meaningful automated checks and deployment notes. Acceptance: readable responsive pages, working navigation and quiz, editable enquiry with validation and failure recovery, static substantive service content, no invented client endorsements, and reproducible production build. Follow APV capture before commit. No deployment.

## Operator authorization

2026-09-08: the user instructed “Otherwise, proceed with the plan until the site is ready to publish.” These documents decompose that authorized work; technical choices are delegated to the implementing agent.

## Delivery, 2026-09-08

Implemented the four content pages and enquiry/privacy/success/404 routes as a static Astro 7.3.2 site. The working design, semantic content, actual assets, short optional quiz, Netlify form, metadata and legacy redirects are delivered. `README.md` documents the handoff; `design/build-decisions.md` records choices; `design/verification.md` records checks and limits.

Verification: build, type/diagnostic check and formatting pass. The full browser suite passes 44 checks in Chromium and Firefox. Final deployment artifact checks also pass in both projects. Desktop/mobile screenshots were inspected. WebKit was unavailable because of a runner protocol error before page creation. Real Netlify receipt is outside local verification and remains with the operator's deployment under M2-publish-ready.
