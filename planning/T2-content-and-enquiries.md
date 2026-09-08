---
id: T2-content-and-enquiries
plan_kind: thematic
tier: 2
status: active
---

# Content and enquiries

Parent: T1-exfu-website, theme 1.

## 1. Why

Per T1 sections 1-2, help visitors assess practical fit and begin a useful conversation. Richer context should earn its place by answering actual questions.

## 2. How

### Page architecture

Use a succinct homepage with one substantive paragraph explaining ExFu and its work. Link to a dedicated fractional-support page, project accounts, personal support, and an About/experience page. Each interior page begins with an answer, then develops its reasoning with readable prose and clear local navigation.

Avoid reducing long-form pages to repeated sales cards. Core answers stay visible. Use optional expansion for secondary examples or practical FAQs, with meaningful anchor links and a no-JavaScript reading fallback during implementation. Text intended for retrieval must be present in initial HTML or otherwise reliably crawlable; do not rely on an agent clicking every expansion.

### Discoverability

Use consistent entity descriptions, service terms, evidence, and internal links. Derive any plain-text companion from the same public content to prevent drift. Structured data describes visible information; it does not replace that information. An agent endpoint or llms.txt may be a secondary convenience, not the foundation or a guaranteed discovery mechanism. Google's current guidance explicitly says it does not use llms.txt for Search visibility.

### Enquiry flow

Retain useful questions from the old quiz: desired change, current obstacle, and who will use the work. Ask directly what support is needed instead of scoring visitors into a profession or inferred neurotype. Show an editable summary and a tentative suggested starting point. Offer name/email collection and an explicit **Send this brief to Alastair** action with clear follow-up expectations. Keep direct contact alongside the quiz.

The old final Send action initiates an AI conversation. It is not sufficient evidence that a human enquiry has been delivered. Later implementation must verify actual delivery and failure recovery.

Do not publish a completion-time promise before testing. Treat any budget question as optional and include **Not sure yet**. The four-point pricing meter is a deferred candidate outside the first enquiry path; user has not yet accepted that recommendation.

### Avatars

Use the legacy illustrations as optional recognition content after the main offer. Mark them as illustrations, never clients or testimonials. Visitors choose a need; faces do not determine role, personality, or diagnosis. Provide a readable list alternative to the fan and keyboard/touch access in implementation.

## 3. What

- `design/legacy-review-and-content-depth.md`: evidence and proposed adaptation.
- `design/fractional-service-copy.md`: substantive interior-page copy.
- Homepage and service mockup pair under `design/`.
- Later build briefs must specify content source, form destination, server behavior, retrieval tests, and accessibility verification.

## 4. Open questions (HITL)

- **Q1:** What enquiry destination and follow-up workflow should be implemented?
- **Q2:** Is a simple optional budget range enough, or should a clearly scoped price experiment be offered later?
- **Q3:** Which case-study details are approved and current?

## 5. Provenance

Draft authored 2026-09-08 following read-only inspection of the prior Astro implementation. Existing source and planning documents are evidence of past work, not automatic approval for this new site's architecture or copy.

## 6. User rulings (2026-09-08, later in the same task)

- No AI chat in the first release. The enquiry flow must capture email and initiate human follow-up. The old quiz need not be copied. This overrides the earlier tentative suggestion to return an AI-authored starting recommendation.
- Getting the update public soon is a priority. Keep launch dependencies limited to what the enquiry and public pages need.
- Include at least one white male among the illustrated avatars, reflecting the likely audience, while retaining the other selected portraits. Images do not define eligibility or infer the visitor's identity.
- **Q1** remains open: actual delivery destination and mechanism have not been chosen.
- **Q2** remains open for a future experiment; omitting the meter from launch is the current recommendation, not yet an explicit user acceptance.

## Development approval, 2026-09-08

The user approved proceeding until the site is ready to publish, supplied `al@exfu.ai` for enquiries, and will deploy to an existing Netlify site themselves. This supersedes earlier design-only limitations and unresolved launch-destination questions. Implement Home, Fractional support, Personal support and About, with a short needs quiz, direct enquiry and necessary utility pages. Omit AI chat and the pricing meter. Use the approved warm Working canvas design and existing illustrative portraits. Record work under T3-build-static-site and M2-publish-ready. No deployment or customer contact is authorized. Netlify form detection and notification delivery require a post-deployment check by the operator.
