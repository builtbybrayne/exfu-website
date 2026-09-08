<!-- apv:orientation -->
## agent-plan-visualiser (APV) tracking

This repository is tracked by agent-plan-visualiser. The append-only event
log at `.apv/events.jsonl` is the source of truth for planning state;
plans and status prose are secondary. After each logical unit of work and
**before committing**, run /apv-capture to append a sealed event block —
the pre-commit guard rejects uncaptured commits (`git commit --no-verify`
is the sanctioned hatch for capture-free trivia). Land branches on main via
/apv-merge; the gate hooks refuse a main that fails the integrity check.
Sub-projects registered under `[projects]` in `.apv-config.toml` share
this one log — membership is derived from location at creation (or an
operator's `project.assigned`), never a fork of the record.

This project REQUIRES the agent-plan-visualiser plugin (the version floor is
pinned in `.apv-config.toml` `[requires]`). The **skill**
`exfu-agent-plan-visualiser:apv-capture` is the cross-client primitive;
`/apv-capture` is only its Claude-Code slash alias and may be absent in
Cowork/Desktop even when the skill is loaded. Before any work, confirm that
skill is available. If NEITHER the skill nor the command is present, this
session did not load the plugin (typical in worktree checkouts that lack a
committed `.claude/settings.json`, or in Cowork/Desktop before install) — do
NOT fabricate captures by hand. Load it:
`/plugin marketplace add https://github.com/ExFu/exfu-marketplace` then
`/plugin install exfu-agent-plan-visualiser@exfu`; or read the skill source and
follow it directly — the newest
`~/.claude/plugins/cache/*/*agent-plan-visualiser/*/skills/apv-capture/SKILL.md`
(same pattern for apv-merge and using-agent-plan-visualiser).

Fresh clone or new worktree? The git hooks live in `.git/` and are not
committed — run /apv-init once here to install the capture-guard and gate
adapters. It is idempotent: it repairs only what is missing.
<!-- /apv:orientation -->

<!-- exfu-agent-planning-and-delegating:orientation -->
## exfu-agent-planning-and-delegating (ExFu Agent Planning & Delegating)

This project depends on the **exfu-agent-planning-and-delegating** plugin: the ExFu Planning
Methodology and grounded multi-model delegation. Its skills — `exfu-delegate`
(hand well-specified work to a subscription-billed CLI delegate under enforced
contracts), `exfu-grounding` (compose handoff grounding from the tiered plan
corpus), and `exfu-planning-methodology` (the tiered-planning doctrine) — manage
planning and delegation here. Provider wiring lives in `.exfu/providers.toml`.

Confirm at session start that these skills are available (they may be
plugin-namespaced, e.g. `exfu-agent-planning-and-delegating:exfu-delegate`). If NONE are available,
this session did not load the plugin (typical in worktree checkouts lacking
`.claude/settings.json`, or a surface where the global enable did not
propagate) — resolve the skill source directly, in order:

1. Prefer the enabled install path reported by `claude plugin list --json`.
2. Else read the highest-version match under
   `${CLAUDE_CONFIG_DIR:-~/.claude}/plugins/cache/*/exfu-agent-planning-and-delegating/*/skills/<name>/SKILL.md`.
3. Else the plugin is not installed —
   `claude plugin marketplace add https://github.com/ExFu/exfu-marketplace.git`
   then `claude plugin install exfu-agent-planning-and-delegating@exfu-marketplace`.
<!-- /exfu-agent-planning-and-delegating:orientation -->

## Project orientation

Read `planning/readme.md` and `design/decision-history.md`. The new site is in design exploration; PNGs are mockups, not a running application. The older `/Users/al/Studio/projects/exfu_website` is read-only reference material. Its local restrictions and previous decisions do not silently become new-project rulings.

The user prefers the Working canvas design with warm neutral contrast, red accents, rich readable service prose, a lower-page illustrative avatar fan, and name definitions. Fractional/contract work is the commercial priority. Remote preferred; Bristol sessions by arrangement. No AI chat in the first release: capture email and a human enquiry. Read dated plan additions before proposing older approaches again.

Installed marketplace alias is `exfu-marketplace`; where bundled fallback instructions mention `@exfu`, resolve the actual installed plugin ID first. The project settings use the detected alias. Codex reads this document through AGENTS.md; the Claude SessionStart hook is a cross-client convenience, not a claim that Codex executes Claude hooks.
