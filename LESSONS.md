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

- [2026-08-17] `vitest run` intermittently failed with `TypeError: Cannot read properties of undefined (reading 'config')` when run immediately after `vite build` in the same `verify` chain, with no code change involved → treat a lone post-build `vitest` failure as a possible transient race and re-run once before assuming a real regression.

---

## Language & Type Errors

_Recurring compile, type, import, or module-resolution traps._

- _(none yet)_

---

## Framework & Runtime

_Framework-specific behaviour that bit us: lifecycle, state, rendering, routing, request handling._

- [2026-08-17] `react-rnd`'s 8 resize handles hang half-outside the component's box by design (e.g. `bottom: -10px`); putting `overflow-hidden` on the `<Rnd>` container itself (for rounded corners) silently clipped that half away and made resizing un-grabbable → apply `overflow-hidden`/rounded corners to an inner wrapper div, never to the `<Rnd>` element itself.
- [2026-08-17] The Desktop root's `onContextMenu` (for the wallpaper menu) was catching right-clicks that bubbled up from inside open windows too, hijacking the browser's native context menu (breaking right-click copy on selectable text) → any window content that needs native browser interactions (text selection copy, etc.) must `stopPropagation()` on its own `onContextMenu`.
- [2026-08-17] Building a shared per-window props object (`{key, isMinimized, onClose, ...}`) and spreading it with `{...shared}` onto each open-window component put `key` inside the spread, which React silently accepts at runtime but warns about in the console (keys must be passed directly, not via spread) → pass `key={w.id}` directly on the JSX element and keep it out of any spread props object.
- [2026-08-17] `document.execCommand` (used for the Gmail compose body's Bold/Italic/etc. toolbar) is a deprecated Web API with no fully-standardized replacement yet — still works in every current browser and needs zero new dependency, so it's the right call for v1, but revisit if a future task needs finer control (e.g. structured rich-text output) since it may eventually be removed.
- [2026-08-17] `framer-motion`'s `drag` gesture tracks `pointermove`/`pointerup` on `window`, not the dragged element, and largely ignores Playwright's synthetic `page.mouse` events entirely — to script/test a drag, dispatch a real `pointerdown` on the element but `pointermove`/`pointerup` on `window`, with small (a few px) steps; coarse steps can leave the element resting a hair inside a constraint instead of exactly at its edge. Reverting a drag from `onDragEnd` also races the library's own end-of-gesture position commit and can get silently overwritten → constrain live from `onDrag` (comparing against a remembered last-valid position) instead of correcting after the fact.
- [2026-08-17] `PaintToolbar.jsx` (menu bar + tool buttons + sliders + palette + save/undo/redo/clear/download) landed at ~160 lines as one component — splitting a single visual toolbar's controls across files to chase the §4.4 ≤50-line guideline would have hurt cohesion for no real benefit, since every control genuinely belongs in the same row set → for one cohesive, fully-controlled presentational component, prefer keeping it whole and noting the size call in TASKS.md/LESSONS.md over a forced split that fragments one visual unit.
- [2026-08-17] `VisitorArtsApp.jsx`'s card Download/Delete buttons are only rendered visible via `group-hover:flex` (hidden by default) — Playwright (and a keyboard/touch user) can't click a `display:none` element, so scripted tests must hover the card first, then click with `{ force: true }`. Real drag/canvas pointer events (`PaintCanvas.jsx`) worked fine under plain `page.mouse`, unlike `framer-motion`'s gesture recognizer — the `window`-listener quirk logged above is specific to that library, not pointer events in general.
- [2026-08-18] `src/assets/icons/index.js`'s `iconImages` map is one flat namespace shared across desktop icons, taskbar buttons, and `ThisPCWindow.jsx`'s folder/drive tiles — adding a `music` key for This PC's Music folder silently replaced the unrelated taskbar pinned-app icon of the same id, with no lint/build error → before adding a new `iconImages` key, grep the codebase for that exact id first; when two unrelated UI elements need the same real-world label, give them distinct keys (e.g. `music-folder` vs `music`).
- [2026-08-18] `Window.jsx`'s default position is centered purely from `window.innerWidth/innerHeight` — once P66 allowed multiple instances of the same app (This PC's "Open new window"), a second instance computed the exact same center and landed fully on top of the first, caught only by a real Playwright click ("intercepts pointer events") that `npm run test`/build could never catch → any feature that can produce >1 window instance needs a per-instance position offset (`cascadeOffset` prop, +28px per existing same-id instance) from the start; a passing `verify` proves the code compiles and unit logic works, not that overlapping UI is usable — that needs an actual browser pass.

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
