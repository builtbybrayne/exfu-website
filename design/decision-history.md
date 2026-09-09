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
