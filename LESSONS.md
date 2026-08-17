# LESSONS.md — Bug Memory (Dynamic)

> **Claude: read this file BEFORE writing any code, every session.**
> Purpose: never make the same mistake twice.
>
> **Format — one line, no paragraphs:**
> `- [YYYY-MM-DD] <what happened / what I assumed> → <rule to follow from now on>`
>
> **Append an entry when:** a verify run failed · a fix took more than one attempt · a tool or
> library behaved differently than expected · an environment or version quirk cost time · you
> were about to repeat something already logged here · a setup step had a non-obvious prerequisite.
>
> **Do NOT log:** task completions · routine successes · anything already stated in CLAUDE.md ·
> anything longer than one line (if it needs a paragraph, it belongs in `/docs`).

This file starts empty. That is correct — a new project has no scars yet. It will fill up fast
during Phase 0, because scaffolding is where most version and config surprises live. Log them
there and you stop paying for them twice.

---

## Open Blockers

_Unresolved after 3 self-correction attempts (CLAUDE.md §4.7). Claude STOPS here and asks Sonny._
_Paste the verbatim error, not a summary of it._

- _(none)_

---

## Setup & Versions

_Install failures, peer-dependency conflicts, version mismatches, config-file format changes,
package-manager quirks. Phase 0 lives here._

- [2026-08-17] `npm install tailwindcss` pulled v4 by default, which dropped `tailwind.config.js` + PostCSS/autoprefixer in favor of a native `@tailwindcss/vite` plugin and a single `@import "tailwindcss";` in CSS → check the installed major version's own setup docs before wiring config, don't assume v3's PostCSS pattern still applies.

<!-- SHAPE REFERENCE — delete this comment block once real entries exist:
- [YYYY-MM-DD] Tool's docs showed the old config filename; the installed major version had replaced it → check the installed version's own docs, not the first search result.
- [YYYY-MM-DD] Linter passed because its config silently ignored the source folder → always prove a linter fails on a deliberate violation before trusting it.
-->

---

## Build & Tooling

_Build tool, bundler, dev server, lint, format, test runner, env vars, scripts._

- _(none yet)_

---

## Language & Type Errors

_Recurring compile, type, import, or module-resolution traps._

- _(none yet)_

---

## Framework & Runtime

_Framework-specific behaviour that bit us: lifecycle, state, rendering, routing, request handling._

- _(none yet)_

---

## Data & Persistence

_Queries, migrations, transactions, caching, serialisation. Delete this section if there is no data layer._

- _(none yet)_

---

## Security & Secrets

_Env-var exposure rules, key handling, anything that could have leaked. Log the rule the moment
you learn it, not after it bites._

- [2026-08-17] Vite only inlines env vars prefixed `VITE_` into the client bundle; anything else is invisible to `import.meta.env` in the browser → never prefix a real secret with `VITE_`, and any future backend secret (e.g. for the Contact app) must live outside this repo entirely, never in `.env`.

---

## Rules Derived From Lessons

_Promote an entry here once the same class of mistake has happened twice._
_Entries here are as binding as CLAUDE.md._

- _(none yet)_
