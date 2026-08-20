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
- [2026-08-18] The `reading 'config'` `vitest` failure above can also be a stale `node_modules/.vite` cache, not just a transient race — confirmed by reproducing it on `git stash`ed (pre-change) code too, then fixing it with `rm -rf node_modules/.vite` → if re-running `vitest` once doesn't clear it, delete `node_modules/.vite` before assuming a real regression.
- [2026-08-18] `git stash`/`git stash pop` on this Windows checkout (`core.autocrlf=true`) round-tripped several unrelated files through CRLF, making `prettier --check` fail on files no one touched → after any `git stash`/`pop`, run `npx prettier --write <affected files>` to renormalize line endings before trusting `format:check`; avoid `git stash` for read-only diagnostics on this repo if avoidable.
- [2026-08-18] After several sequential Edit-tool calls added ~110 lines to `TASKS.md` on this CRLF checkout, one `prettier --write TASKS.md` reported success but `prettier --check` still failed right after → run `prettier --write` a second time (or re-run `--check`) after a batch of edits to a long markdown file before trusting `format:check` green.
- [2026-08-20] Same `write reports success, immediate --check still fails` symptom recurred on a large batch of Edit-tool calls to `TASKS.md` (adding Phase 51's ~25 tasks) even with no CRLF involved (confirmed all-LF) — a second `prettier --write` followed by a fresh `--check` passed clean → treat this as a general "re-run --check once after --write on a long markdown file that just took many edits" rule, not CRLF-specific.
- [2026-08-20] `prettier --check TASKS.md` kept failing after repeated `--write` (3+ passes, never converging) while every other markdown-batch-edit entry above resolved after one or two — root cause was different: one bullet's inline code span (single backticks) had a raw line-wrap inside it with inconsistent indentation on the continuation line, which prettier's markdown formatter can't stably round-trip → if `--write`/`--check` don't converge after 2 tries (unlike the usual one-more-pass fix), diff the before/after (`cp file /tmp/before && prettier --write file && diff /tmp/before file`) to find the exact line, not just re-run write blindly; the fix is rewording the sentence so the line wrap falls outside the backticks.
- [2026-08-20] The `reading 'config'` `vitest` failure survived both known fixes (re-run once, delete `node_modules/.vite`) three times in a row during a session that had also launched `npm run dev` in the background for manual Playwright-driven UI verification — root cause was 5 leftover `npm run dev`/`vite` processes still running from that manual testing (an earlier `taskkill` had only killed the one process bound to the port, not the whole tree), holding file watchers that corrupted vitest's own Vite config resolution → before assuming this is the already-logged transient race/stale-cache issue, check for and kill any stray `node.exe` processes running `npm run dev`/`vite.js` (`Get-CimInstance Win32_Process -Filter "Name='node.exe'"`, match the command line) left over from earlier manual dev-server verification in the same session.

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
- [2026-08-19] This project's `eslint-plugin-react-hooks` config also bans seeding `useRef(performance.now())` (or any impure call) as the initial ref value during render — errors as "Cannot call impure function during render" → seed the ref with `useRef(null)` and assign the real value inside a `useEffect` instead.
- [2026-08-18] This project's `eslint-plugin-react-hooks` config bans two patterns that plain React docs otherwise allow: (1) calling `setState` synchronously in a `useEffect` body (only a `setState` inside an async callback like `setTimeout` is accepted), and (2) reading/writing a ref's `.current` during render at all — even the official "compare-to-previous-prop via ref" pattern trips `react-hooks/refs` here → for delayed-unmount/fade-out effects driven by a prop, route every `setState` call through one `setTimeout` (0ms delay for the immediate branch, real delay for the deferred branch) instead of a ref comparison or a bare synchronous call.
- [2026-08-20] `react-rnd`'s `minWidth`/`minHeight` props silently clamp the rendered size back up even when the `size` prop is set smaller — forcing `Window.jsx` windows to fill a 390px mobile viewport via `size={{width: window.innerWidth, ...}}` still rendered at the desktop `MIN_WIDTH` (480px), clipping the title-bar buttons and toolbar off-screen, with `npm run verify` fully green throughout since nothing about it is unit-testable → whenever a `Rnd`'s intended size can go below its own `minWidth`/`minHeight` (e.g. a mobile full-screen mode), pass `0` for those props in that mode instead of assuming the `size` prop wins; this class of bug only surfaces by actually loading the page at the target viewport, never from `verify`.

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
