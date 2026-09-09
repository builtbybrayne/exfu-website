---
id: T3-persona-details-and-setup-selection
plan_kind: thematic
tier: 3
t2_parent: T2-implementation
milestone: M2-publish-ready
status: completed
---

# Persona details and setup selection

User explicitly requested a fast opening fan spin decaying within 1.2 seconds, faster steady rotation, a fix for displaced fan anchoring, richer concise persona reassurance in an optional full-card list and animated popovers, quiz entry at Q2 for known needs plus a general quiz entry, Tools section navigation and plugin-specific setup selection with a full-marketplace pointer.

Implement within the existing design, adapting the old persona content without carrying forward its unsupported guarantees. Verify fan scroll anchoring, modal accessibility/focus, responsive card layout, multi-select quiz back navigation and dynamic installation/copy instructions. Keep reduced motion and no-JavaScript fallbacks. Do not deploy or install plugins.

## Delivered

31-file type check and nine-route build pass. All 60 browser checks pass in Chromium/Firefox. Native fan scrollLeft remains zero after attempted scrolling; before the fix, setting 150 produced a 223px snap. Timed motion samples settle from -0.1903 radians per 250ms to -0.0042 after 1.2 seconds. Persona dialog accessibility, Escape/focus return, full detail cards at 320px, quiz entry/back behaviour and all four plugin choices/copy text pass. Desktop dialog/grid and mobile selected-plugin layouts reviewed. No deployment or plugin installation performed.
