# Previous site review and content-depth proposal

Read-only review, 2026-09-08. This is a design and source review, not a live end-to-end verification of the former site's backend. The older project's instructions and plans remain specific to that reference project.

## Quiz: keep the useful questions, simplify the outcome

Source: `/Users/al/Studio/projects/exfu_website/src/components/QuizPopover.astro` and `agent/src/quiz.ts`.

The current source presents five multi-select questions about the visitor's workload, hoped-for AI help, obstacles, intended users, and working style. It then offers a price-calibration stage and a results/conversation stage: seven stages in total. Answer weights map to twelve roles. A result contains a primary role, two wings, a destination page, an anchor, and a service.

Useful starting material includes asking what the visitor wants to change, what has stopped them, and who would use the result. The persona scoring adds little to the proposed enquiry outcome. In particular, role inference from general preferences is unnecessary, and ADHD should not be inferred from ordinary workload answers. A business owner is routed toward personal setup in the old model, which may miss a fractional company need. The configured role routes never recommend the retained service as the initial service, despite fractional work now being the priority.

Source: `src/lib/quiz-popover.js`, especially quiz submission and conversation sending, and `agent/src/handlers/converse.ts`.

After quiz submission, the recommended pricing service is automatically selected. The final Send action posts a `converse` turn and displays an AI reply. The inspected flow contains no email field or lead-delivery step. It is not the human enquiry capture required for this project.

### User ruling after review

The user explicitly said the old quiz need not be followed, AI chat is unnecessary for the first release, and the goal is to capture email and start an enquiry. Getting the update public soon is the priority. AI chat can be revisited later.

### Proposed launch flow

1. **What would you like help with?** AI across my business / A specific project / My own workload / I'm not sure yet.
2. **What's holding it up?** Choosing a worthwhile starting point / Making the case internally / Time or skills to build / Getting people comfortable and someone to own it. Adapt the wording for personal work.
3. **What would you like to change?** Optional short text. Name and email follow on the same final screen, with an editable summary of their answers.

Button: **Send my enquiry**. Explain that Alastair will receive the answers and use the email to follow up. Confirmation should say the enquiry was sent only after the delivery service accepts it. Preserve entries and show a retry route on failure. Provide direct contact for existing briefs.

No AI chat, account, personality scoring, price calibration, or invented turnaround promise in the launch path. An optional budget field with **Not sure yet** can be considered only if it earns its place. Do not advertise 20 seconds without measuring the complete route, including email capture.

## Pricing meter: defer from the launch path

Sources: `src/components/Meter.astro`, `src/lib/vwpm/meter.js`, `src/lib/vwpm/services.js`, `src/lib/vwpm/server/projection.js`, and the quiz's pricing stage.

The control collects four values: Too cheap / A bargain / Getting expensive / Too much. It supports six service categories, including retained support. Visitors submit their values and receive a fit result against private comparison values. It does not behave like a straightforward displayed quote.

The idea may work as a separately explained calibration experiment once the visitor understands a specific engagement. In the initial journey, the work and unit of comparison are not clear enough: a production build or retained engagement can vary considerably in scope. Four thresholds per selected service add effort and can appear to ask a visitor to negotiate against information they cannot see.

Recommendation: omit it from this release's main journey. Keep its source and the idea available for later assessment. This recommendation is not a claim that the tool has been conversion-tested, nor a decision to discard the user's separate pricing product. Do not copy old private price assumptions into new public copy.

## Avatar fan: reuse lower down, with appropriate context

Sources: `src/components/Hand.astro`, `src/components/icps.ts`, and `public/images/avatars/charcoal/`.

The existing fan includes draggable cards, arrow controls, keyboard handling, and a roles-list alternative. That is more useful than a pointer-only visual trick. Preserve equivalent alternatives in a later build. The portraits fit the paper/charcoal visual direction.

The new mockup places the fan after the fractional offer and contextual paragraph. Five illustrative portraits include a white male, as explicitly requested by the user to reflect likely customers, alongside the other selected portraits. Need-based captions avoid implying a person's needs can be inferred from their face. These are illustrations of possible visitors, not named clients, endorsements, or a diagnostic tool.

Potential concise prompts for a later interaction: **I need to make the case**, **We need help getting it built**, **I want AI working around my day**. Keep all options readable in a list and let the visitor choose.

## Enrichment: one body of useful public information

Source: `src/components/LongForm.astro`, `src/pages/for-agents.astro`, `public/about.md`, `public/llms.txt`, and `planning/T2-discoverability.md`.

The old site already separates a scannable summary from a sustained reading area. Its LongForm component keeps prose visible, with a signpost on one side and paragraphs on the other. That is worth adapting.

For this site:

- Add a concise, substantive description of who ExFu is, who the work is for, and what engagements can include on the homepage.
- Give the fractional page actual explanatory paragraphs, a contents rail, concrete examples, practical questions, and a clear contact route.
- Keep core answers visible. Secondary details may expand, but should exist in delivered HTML and have direct anchors; do not make retrieval depend on clicking, personalisation, or client-side fetches.
- Use an About/experience page and case studies to supply factual depth. Publish actual source-backed evidence, with dates or status where necessary.
- If a machine-friendly text export is useful, derive it from the same content rather than maintaining a second, divergent sales narrative.
- Avoid hidden keyword dumps, tiny low-contrast prose, or calling the ordinary reading section “for agents”.

[Google's current AI search guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) prioritises useful, crawlable content and says Google Search does not use llms.txt or special AI text files. Other retrieval clients may benefit from a plain-text companion; that is a convenience, not a search-ranking promise. [Nielsen Norman Group's progressive-disclosure guidance](https://www.nngroup.com/articles/progressive-disclosure/) supports moving secondary detail out of the initial view when appropriate. Neither source establishes that these ExFu mockups will convert better; that remains to be tested.

## Image review

The new homepage visibly restores a warm dark definition band and a mid-tone avatar band. The service page carries substantial prose and a local navigation rail. The latest homepage corrects the Kung Fu wording and includes the requested white male illustration.

Generation added small handwritten filler and decorative stock-style case imagery. Those are visual placeholders, not approved copy or project evidence. In a build, remove filler and replace case images with approved assets or typographic previews. Red text on the dark band and small secondary type require measured contrast checks in implementation. Images establish direction, not accessibility or lead-delivery verification.
