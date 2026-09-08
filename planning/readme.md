# Start here

This is the new ExFu website exploration. The older implementation at `/Users/al/Studio/projects/exfu_website` is a read-only reference for selected ideas, not an approved implementation to copy wholesale.

Read in this order:

1. `T1-exfu-website.md`: project intent and known user decisions.
2. `T2-content-and-enquiries.md`: content, discoverability, quiz, and lead capture.
3. `T2-visual-language.md`: design direction and review criteria.
4. `M1-reviewable-design.md`: current design-review milestone.
5. `T3-review-home-and-service.md`: the current review-artifact brief.

All initial plans are drafts. They record a conversation and proposals; they have not undergone a formal plan-acceptance ceremony. This turn's expressly requested visual exploration and initialization are authorized by the user. These draft documents do not authorize a production build, migration, or deployment.

`design/decision-history.md` records the conversation's choices and their reasons, with user statements distinguished from agent recommendations. Dates record when context was captured; no old Git history has been backfilled.

`design/legacy-review-and-content-depth.md` reviews the old quiz, meter, avatar fan, and reading structure. `design/fractional-service-copy.md` contains the proposed service-page prose. `design/round-4-prompts.json` records the exact built-in image-generation prompts.

APV: run `./apv refresh` to rebuild projections and `./apv` to serve its view. Resolve the installed plugin before using capture scripts. Capture before each commit. The current local toolchain is ExFu APV 0.8.3; no remote repository or site deployment is configured here.

## Development approval, 2026-09-08

The user approved proceeding until the site is ready to publish, supplied `al@exfu.ai` for enquiries, and will deploy to an existing Netlify site themselves. This supersedes earlier design-only limitations and unresolved launch-destination questions. Implement Home, Fractional support, Personal support and About, with a short needs quiz, direct enquiry and necessary utility pages. Omit AI chat and the pricing meter. Use the approved warm Working canvas design and existing illustrative portraits. Record work under T3-build-static-site and M2-publish-ready. No deployment or customer contact is authorized. Netlify form detection and notification delivery require a post-deployment check by the operator.

## Current handoff

The implementation is now under `src/`, with a production build in ignored `dist/`. Read `README.md` for running, testing and the operator's Netlify deployment steps. `design/build-decisions.md` explains the translation from mockups to code and the launch trade-offs. The initial design-only draft paragraphs above are preserved history; they are superseded by the explicit development approval. M2-publish-ready tracks the handoff and final operator-owned delivery check. No new confirmation is needed to perform routine local checks or fixes within the accepted build scope.
