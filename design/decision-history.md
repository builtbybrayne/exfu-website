# Decision history

Captured 2026-09-08 from the current Codex task. This is a dated conversation summary, not reconstructed Git history. Entries distinguish explicit user decisions from agent proposals. Preserve earlier entries and append changes.

| Sequence | Source | Decision or observation | Reason / consequence |
|---|---|---|---|
| 1 | User | Set aside the copied instruction requiring six full-page images. | Reconsider positioning and deliverables from first principles. |
| 2 | User | ExFu has several audiences and no settled niche. | Speak to recognisable situations rather than inventing a narrow market. |
| 3 | User | Start with problems and value; use Why, How, What reasoning. | Visitor relevance precedes biography and a catalogue of tools. |
| 4 | User | Professional, warm, plain language, with no swearing. | Imported writing guidance supports the same voice. |
| 5 | User | A short needs quiz should create a conversation starter. | The end goal is an enquiry Alastair can follow up. Timing and budget mechanics remain proposals. |
| 6 | User | Most clients came from referrals; two company contracts share a trusted CTO sponsor. | Delivery examples are real evidence; cold-market positioning remains a hypothesis. |
| 7 | User | Contract/fractional only; remote preferred; Bristol possible by arrangement. | Avoid permanent-role positioning and fixed in-person availability. |
| 8 | User | Fractional work is the financial priority. | Give it the strongest route without removing personal support or projects. |
| 9 | User | Explore bold, novel design that evidences agent collaboration. | Produce substantive design artifacts and later useful interaction, without fabricating performance claims. |
| 10 | User | Prefer Working canvas (concept 3). | Continue paper forms, bold typography, and red accents. |
| 11 | User | Soften aggressive black-white backgrounds and add negative space. | First revision uses pale mineral surfaces and lighter paper forms. |
| 12 | User | Add a large logo and name definitions lower down. | Provide a moment of personality after the visitor understands the offer. |
| 13 | User | The softened version is too uniformly pale; restore some contrast. | Latest pair uses a mid-tone putty band and one warm dark mushroom band. |
| 14 | User | Add rich contextual text without overwhelming humans; show an interior page. | Create a substantive fractional-service page and enrich the homepage with explanatory prose. |
| 15 | User | Inspect the former quiz, avatar fan, and pricing meter. | Prior code is source material, not automatic scope approval. |
| 16 | Agent recommendation | Adapt the avatar fan below the main offer; simplify quiz to needs and enquiry; leave meter outside launch path. | The old seven-stage experience adds effort and its Send action starts AI chat instead of collecting a human enquiry. |
| 17 | User | Initialize ExFu planning and APV in the new project. | Preserve choices, dates, and rationale for later agents. Initialization starts now, without mining the prior repo history. |
| 18 | User | Explain the Fu in Execution Fu through the Kung Fu reference. | Latest definition heading: **Execution fu (as in Kung Fu)**. |
| 19 | User | Do not follow the old quiz exactly; no AI chat needed; capture email and start an enquiry. Launch soon. | AI chat is explicitly deferred. A direct enquiry route is release scope. |
| 20 | User | Likes the current design language and visual imagining. | Treat the direction as preferred. This is not acceptance of every new plan or all generated filler copy. |
| 21 | User | Include at least one white male avatar to reflect likely customers, while keeping inclusion. | Add the existing white male illustration to the fan alongside the other four portraits. |

## Setup record

- Local Git repository initialized after filesystem approval. No remote configured.
- ExFu planning 0.3.2 and APV 0.8.3 found installed and enabled under `exfu-marketplace`; their skills are loaded in this session.
- Used the bundled configuration updater and APV initializer. Corrected the older `@exfu` project enablement key to the detected `@exfu-marketplace` alias after the updater ran.
- Installed the project orientation hook, CLAUDE/AGENTS guidance, neutral provider manifest, APV launcher, and capture/gate hooks.
- APV initialization emitted two shell warnings caused by unescaped backticks in its config-comment template. It returned success and created the intended configuration and hooks. Repaired the affected generated comments only; no shared plugin code was modified.
- Initial plan corpus remains draft. User design and scope rulings are recorded as explicit decisions; agents have not self-issued a plan-acceptance ceremony.

## Latest review files

- `04-homepage-contrast-avatars-v3.png`: preferred homepage direction, Kung Fu clarification, five avatars.
- `05-fractional-service.png`: interior-page reading and service explanation.
- `legacy-review-and-content-depth.md`: legacy review and revised enquiry recommendation.
- `fractional-service-copy.md`: substantive prose reference.

## Still unresolved

Exact fractional offer terms, final approved case material, enquiry destination and delivery service, production stack/hosting, and final page selection. Pricing-meter deferral is currently an agent recommendation. Future deployment needs a concrete built and tested result.

## Development approval, 2026-09-08

The user approved proceeding until the site is ready to publish, supplied `al@exfu.ai` for enquiries, and will deploy to an existing Netlify site themselves. This supersedes earlier design-only limitations and unresolved launch-destination questions. Implement Home, Fractional support, Personal support and About, with a short needs quiz, direct enquiry and necessary utility pages. Omit AI chat and the pricing meter. Use the approved warm Working canvas design and existing illustrative portraits. Record work under T3-build-static-site and M2-publish-ready. No deployment or customer contact is authorized. Netlify form detection and notification delivery require a post-deployment check by the operator.

## Publish-ready implementation, 2026-09-08

The authorized implementation is delivered. See `build-decisions.md` for technical and content choices and `verification.md` for the local evidence. The user retains Netlify deployment. The launch is a static site with a three-question optional quiz, editable brief and Netlify human enquiry. No AI chat or pricing meter is included.

## Visitor review implemented, 2026-09-09

Alastair resumed and authorized the earlier feedback plus copy and interior-page refinements. The quiz now accepts multiple answers to each question and gives a useful starting plan before optional email capture: a reason, concrete steps, a question to consider and relevant support options. Mixed needs retain multiple offers. Copying needs no email; returning to the plan and changing answers preserves an edited enquiry. Recommendations use explicit local rules, with no LLM, pricing meter or diagnostic score.

The homepage invitation follows the avatar area. Tools has a navbar link, a homepage section above definitions and its own directory page pointing to source documentation. All 36 original portrait variants are included in the ring, adapted from the legacy interaction. It supports drag, horizontal wheel, arrow controls, pause and reduced motion; an ordinary list provides a second navigation route. Hero papers move subtly once, for less than five seconds. Footer is dark.

Interior pages retain their explanatory prose, broken up with practical checklist notes, a project sequence and a three-perspective block. Founder experience comes first; the degree wording, CEOs and revenue-channel additions follow the user's wording. Public case-study prose and anchor names no longer identify EV mapping. Original supplied CV PDFs are unchanged.

Local preview is http://127.0.0.1:4387/; automated tests use 4391 to avoid the legacy site's port. T3-refine-visitor-journeys records this follow-on work; the completed original implementation plan is not reopened. Deployment and actual Netlify delivery remain Alastair's responsibility.

## Second visitor review, 2026-09-09

User requested one card per persona with cycling portraits, a red fan baseline and spacing, much larger needs CTAs, stronger post-hero benefits, plain project delimiters, always-visible FAQs, a button-styled Tools navigation destination and more practical installation help. Implemented 12 cards with all 36 illustrations crossfading on staggered five-second cycles; pause/reduced motion stop both rotation and portrait changes. Service questions use ordinary headings and paragraphs, not disclosure elements.

Tool links now point to the Marketplace. Copyable commands use the verified current marketplace name `exfu-marketplace`, not the legacy site's `exfu`. Public manifest verified at https://raw.githubusercontent.com/ExFu/exfu-marketplace/main/.claude-plugin/marketplace.json on 2026-09-09. Cowork instructions were checked against https://support.claude.com/en/articles/13837440-use-plugins-in-claude and Claude Code syntax against https://code.claude.com/docs/en/plugins-reference. Old install/start/prepare pages supplied setup ideas but their stale aliases and UI assumptions were not copied. First-session folder/setup guidance and troubleshooting now live on Tools; legacy setup redirects lead there. No actual installation or enquiry was performed.

## Persona details and setup selection, 2026-09-09

User requested an opening spin, fixed fan anchoring, concise persona reassurance shared between full cards and popovers, known-needs quiz shortcuts and selectable Tools guidance. Reproduced the anchoring bug: overflow:hidden retained a native scrolling container with mandatory snap; setting scrollLeft to 150 snapped to 223. Animated mode now uses overflow:clip and no snapping. The no-JavaScript horizontal list retains its ordinary scrolling. Entry motion decays over 1.2 seconds to one card per eight seconds (previously fourteen), respects pause/reduced motion, and stops behind an open dialog.

Twelve persona details are initial HTML, visible without JavaScript, revealed with Show all roles when enhanced. A shared component supplies both the full-card list and native modal dialog; text is rewritten from legacy role concerns without fixed-result guarantees. Dialogs animate gently, close with Escape/backdrop/button and return focus without scrolling the fan.

Need-specific quiz links enter Q2 with Q1 selected; Back permits correction or additional selections. The smaller general-quiz CTA enters Q1. Tools has section links and a four-plugin selector which updates the Cowork identifier, terminal and slash commands, copy labels/text, and first-session instructions. The marketplace remains the full catalogue; listed plugins are examples rather than an exhaustive inventory. No-JavaScript setup defaults to the Agent Library with the catalogue available below.

## Agent handoff and Tools journey, 2026-09-09

User requested agent-led fit discovery, stronger emphasis on the general quiz, an And more tool card, removal of homepage installation code and a rethink of Tools layout. The agent prompt is immediately below the hero and asks for independent assessment after reading the site, discovery questions and an optional draft enquiry. It explicitly avoids invented prices, outcomes and booking capabilities. Added read-only agent-info.json and expanded llms.txt with the full page/resource map; the existing generated XML sitemap remains available. No booking API or MCP endpoint exists, so no such capability is advertised or fabricated.

The general quiz CTA now leads the needs block, with the three known-need routes secondary. Homepage tools include And more and a nontechnical Agent Library introduction. Fractional benefit now reads Make the case. Build the solution. Tools now has a newcomer-friendly hero, sticky desktop sidebar with current-section highlighting (compact sticky mobile navigation), an initial tool selection catalogue, one shared marketplace-add step, then a visibly bounded selected-plugin installation/first-session panel. Catalogue setup links choose the matching plugin. Per-plugin commands no longer repeat marketplace addition.

## Prompt panel refinement, 2026-09-09

User requested a darker, code-adjacent prompt treatment with contained scrolling. Added warm charcoal, light monospace text, a fixed 260px scroll area and a persistent copy button outside the scroller. Full prompt remains in HTML and copying remains unchanged. Build passes; focused Chromium accessibility scan has no violations; scrolling verified at 1200px and 390px without page overflow.

## CTA hierarchy and outgoing links, 2026-09-09

User clarified that the three specific-needs routes should remain most salient. Restored large filled red cards above a substantial outlined general quiz button. External websites, CV PDFs and non-page resources now use target=_blank with noopener noreferrer in static HTML; internal page navigation remains in-tab. Mail links retain the mailto handler with the same target attribute. Build passes; all nine pages audited for outgoing link attributes; a commercial CV click opened a new browser tab; focused CTA accessibility scan found no violations and screenshot inspected. Pages without explicit user feedback in the conversation are Privacy, Thanks and 404; standalone enquiry form merits final review separately from the reviewed quiz.
