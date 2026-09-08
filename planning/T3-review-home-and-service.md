---
id: T3-review-home-and-service
plan_kind: thematic
tier: 3
t2_parent: T2-visual-language
milestone: M1-reviewable-design
status: draft
---

# Homepage and service review artifacts

## Grounding

Why: T1-exfu-website sections 1-2. How: T2-visual-language section 2 and T2-content-and-enquiries section 2. Position in delivery: M1-reviewable-design. This is a draft authoring/review brief, not production implementation authorization.

## Inputs

- New project: `/Users/al/Studio/projects/exfu-website-2`.
- Read-only reference: `/Users/al/Studio/projects/exfu_website`.
- Visual anchor: `design/03-working-canvas-soft-definitions-v2.png`.
- Avatar references: prior project's `public/images/avatars/charcoal/`.
- Built-in image generation and ExFu APV 0.8.3 are available in this session.

## Outputs

- `design/04-homepage-contrast-avatars.png`.
- `design/05-fractional-service.png`.
- `design/round-4-prompts.json`, preserving exact prompts and reference paths.
- `design/legacy-review-and-content-depth.md` and `design/fractional-service-copy.md`.
- Initial project orientation, planning corpus, and validated APV capture.

## Verification

Inspect both generated images. Verify a perceptible contrasting band, stable branding, readable primary copy, and homepage avatar placement after the main offer. Verify the service image includes actual explanatory paragraphs and a different page hierarchy. Report any image-generation omissions honestly.

Run the installed APV `scripts/repack-validate.sh`, inspect the touched entity states, seal the block, and commit with the seal's exact first line. Run `scripts/gate-composite.py` after the commit. Expected plan state: draft. No acceptance or completion events on those draft plans.

## Out of scope

Do not edit the reference project, contact customers, implement production forms, activate an agent endpoint, migrate hosting, or claim an image is a functional website. Do not rewrite prior plans or mark a new proposal accepted on the agent's authority.

Draft recorded 2026-09-08 for the explicitly requested concept review.
