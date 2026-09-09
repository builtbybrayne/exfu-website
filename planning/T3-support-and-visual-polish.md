---
id: T3-support-and-visual-polish
plan_kind: thematic
tier: 3
t2_parent: T2-implementation
milestone: M2-publish-ready
status: completed
---

# Support guidance and review polish

Alastair explicitly requested this follow-on review on 2026-09-09: one card per persona cycling through three portraits, red fan baseline and spacing, larger needs buttons, Marketplace destinations and copyable installation, stronger service benefits, non-link project delimiters, permanently open FAQs, a Tools navbar button and supportive first-install instructions.

Implement within the existing design. Use the original setup pages as reference, but verify the current public marketplace name and Claude installation routes. Keep command copy actions local and preserve manual selection fallback. Reduced motion and pause must stop automatic portrait changes. Do not deploy, install plugins on the user's machine or send enquiries.

Verify build/types, desktop/mobile layouts, accessibility, portrait cycling and pausing, copy commands and visible FAQs. Record the outcome before committing.

## Delivered

Implemented and visually reviewed. Types/build/format pass. 52 initial browser checks passed; two checks exposed duplicate copy-button labels, corrected with distinct labels. Both corrected checks and both affected service-page checks pass on rerun. Coverage includes 12 cards/36 image assets, timed portrait cycling and pause in Chromium/Firefox, responsive/accessibility checks, exact clipboard text and permanently visible FAQs. Commands were verified against current public documentation; no actual plugin install was performed.
