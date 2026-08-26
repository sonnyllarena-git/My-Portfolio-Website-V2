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
- [2026-08-22] Tried to delete a media asset (`windows-startup.mp4`) right after making it unreferenced in code and got `Device or resource busy` (Windows file lock) — a running `npm run dev` process (and/or a browser tab that had it loaded) was still holding the file open, and killing that process wasn't safe since it looked like Sonny's own active dev session, not one this session started → before assuming a locked file is safe to force-remove, check `Get-CimInstance Win32_Process` for its command line first; if it looks like the user's own session, defer the deletion (leave the dead file, note it) rather than killing an unowned process.
- [2026-08-24] A background `npm run server` (the new `backend/server.js`, launched via the Bash tool's background mode to manually test the Vite proxy) was reported "completed (exit code 0)" almost immediately, yet the underlying `node.exe --env-file=backend/.env backend/server.js` process was still alive and listening on port 4000 minutes later (confirmed via `netstat`/`Get-CimInstance`) — on this setup, npm's process wrapper can be treated as finished by the task tracker while its spawned child keeps running detached. Explicitly stopping a background task (via TaskStop) has the same gap: stopping a background `npm run dev` reported success, but the underlying `vite.js` node process was still listening on port 5173 afterward → neither a "completed" status nor a successful TaskStop call proves an `npm run <script>`-launched process actually exited on this setup; always check the port (`netstat -ano | grep ":<port>"`) and kill the real PID (after confirming its command line via `Get-CimInstance`) if you need it stopped.
- [2026-08-24] Styled `AdminProductForm.jsx`'s file input by writing ``className={`... file:${ADMIN_ACCENT_BG} ...`}`` (composing a variant prefix onto an imported theme-token class at the call site) — the class rendered fine in the DOM (`file:bg-[var(--admin-accent,#008060)]` shows up in `element.className`) but `getComputedStyle(el, '::file-selector-button')` stayed transparent, because Tailwind's build-time scanner only matches literal class-name substrings in source text, and `` `file:${ADMIN_ACCENT_BG}` `` never appears as that literal string anywhere — it's assembled at runtime → when a variant needs to combine with an existing token (`file:`, `dark:`, `group-hover:`, etc.), define the _whole_ combined string as its own literal export (e.g. `ADMIN_ACCENT_FILE_BUTTON_BG = 'file:bg-[var(--admin-accent,#008060)]'`) rather than concatenating a variant onto a token reference; verify suspicious "the class is there but has no effect" cases by checking the compiled CSS (`curl` the dev server's stylesheet, or `getComputedStyle`) for the literal selector, not just the DOM's `className`.
- [2026-08-24] Adding a plain one-line `options: ['Adult', 'Teen', 'Big Kid', 'Little Kid', 'Toddler', 'Infant']` array to `DETAIL_SECTIONS` (`AdminProductForm.jsx`) tripped `format:check` even though it only had 6 short values — Prettier wraps any array literal that crosses its print-width, not just visually long ones → after adding/editing an inline array literal, always run `prettier --write` on the file before trusting `format:check`, regardless of how short the array looks.
- [2026-08-24] Hit the exact non-convergent-inline-code-span bug from 2026-08-20 (above) again in 2 new `TASKS.md` bullets, and briefly suspected a hook or a concurrent session editing the file instead — ruled both out (no hooks in either settings.json; piping prettier's own output back through prettier in complete isolation reproduces the same shrinking indent) before finding the real cause matched the existing entry → when `--write`/`--check` won't converge on a markdown file, check this file for a matching entry before assuming something new/external is interfering.

---

## Language & Type Errors

_Recurring compile, type, import, or module-resolution traps._

- [2026-08-24] `const { code, id, ...rest } = body; return rest` (destructure-to-omit fields, e.g. `backend/productCode.js`'s `stripImmutableFields`) fails `eslint`'s base `no-unused-vars` rule with "'code' is assigned a value but never used" — this project's config doesn't set `ignoreRestSiblings: true` → when the only purpose of a destructured name is to exclude it from a `...rest`, use `const rest = { ...body }; delete rest.code; delete rest.id; return rest` instead, not an eslint-disable comment.

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
- [2026-08-22] A full-bleed `bg-cover`/`background-position:center` background only keeps an overlay's percentage position pixel-exact on the axis where nothing gets cropped — any overlay target off-center on the _cropped_ axis drifts as viewport aspect ratio changes → for a full-viewport background image with a precisely-positioned overlay control (`SignInScreen.jsx`), size an inner box to `width: min(100vw, calc(100vh * <ratio>))` + `aspectRatio: '<ratio>'` (a CSS-only `object-fit: contain` box) instead, so percentage positions inside it are exact on every viewport with no JS measurement needed.
- [2026-08-22] Chromium (and every major browser) blocks unmuted `<video autoPlay>` with no prior user gesture on the page — confirmed live: with the default autoplay policy, `StartupLoadingScreen.jsx`'s boot video loads paused at `currentTime: 0`; only after a real click does `play()` succeed with sound → an unmuted autoplay video needs a `.play().catch()` on mount plus a click-to-continue fallback that retries `play()` inside a real user gesture, not just the `autoPlay` attribute alone.
- [2026-08-23] A `flex h-full flex-col overflow-auto` page wrapper (`StoreApp.jsx`) only scrolls
  when its children can't shrink — any child left at the default `flex-shrink: 1` with a non-zero
  basis (a plain header/nav/footer div) gets compressed by the flexbox algorithm instead, while a
  same-level `flex-1` (basis 0) sibling absorbs none of that compression → once the Store page's
  content grew taller than its 800px window (taller header + per-card descriptions), `StoreNav`
  shrank to invisible with `verify` fully green throughout, caught only by a live screenshot; every
  top-level child of a scrollable flex-column page needs `shrink-0` so the container overflows
  (and scrolls) instead of quietly crushing its own chrome.
- [2026-08-23] `Window.jsx`'s chrome wrapper sets `text-white` on the div containing every app's
  children, so any app content that sits on a light/white background (e.g. `StoreSidebar.jsx`'s
  white filter panel) needs an explicit text color on its own container — otherwise headings/
  labels with no color class silently inherit white-on-white and vanish, invisible to `verify`
  (build/lint/test all pass) and only caught by an actual screenshot → any new light-background
  panel inside a `Window` must set its own explicit text color at the container level, never rely
  on the inherited default.
- [2026-08-22] A `<video>` with no `loop` attribute needs no special handling to "pause at the end" — it fires `ended` and simply stays on its own last frame automatically, confirmed live (`currentTime === duration`, `paused: true` after `ended`) → when a video's final frame is itself the intended static screen (v2's boot video ends on the baked-in Guest/Sign-in art), just overlay the interactive control on `ended`; no extra pause-and-hold logic is needed.
- [2026-08-23] `chromium-cli` isn't installed in this environment; raw Playwright from the npx cache works (`npx playwright --version` warms it, then `require()` its absolute `node_modules/playwright` path), but `page.waitForSelector('text=Sign in')` after the boot video timed out unpredictably (worked once, then failed twice at 30s and 90s) even though a screenshot taken at the same instant showed the button rendered — likely sandbox/CPU contention from multiple concurrent `npm run dev` instances (each grabs the next free port, so it's easy to accidentally end up with 2-3 running) → for this project's boot sequence, use fixed `waitForTimeout` + coordinate clicks (click anywhere ~1s in, then the Sign-in button at ~15s after that) instead of text-selector waits, and check `Get-NetTCPConnection -State Listen` before starting another `npm run dev` to avoid stacking dev servers.
- [2026-08-24] On Windows Git Bash, `require()`-ing the npx-cached Playwright package by its `/c/Users/...` bash-style path fails with `MODULE_NOT_FOUND` even though the path is correct — `node.exe` is a native Windows binary and doesn't resolve POSIX-style drive paths → pass the Windows-style path (`C:\\Users\\...`) to `require()` instead. Separately, `getByText('Sign in', {exact:false})` with a 45s timeout twice raced the boot sequence and timed out even though the button was visible moments later in the failure screenshot, but `getByRole('button', { name: 'Sign in' })` with a 120s timeout succeeded reliably across two full boot cycles in the same run (initial load + a post-reload persistence check) — role-based locators with a generous timeout look more reliable here than text locators on a short one, though this is only 2/2 runs, not a large sample.
- [2026-08-25] `TerminalApp.jsx`'s "isMounted" guard ref (`useRef(true)`, set to `false` only in an
  unmount-cleanup `return () => {...}`, checked inside a `setTimeout` callback before finalizing a
  1s command animation) permanently bricked itself after the _first_ command ever run — because
  `main.jsx` wraps the app in `<StrictMode>`, React's dev-only mount→cleanup→remount cycle runs
  that cleanup once immediately, flipping the ref to `false`, and since the effect's setup phase
  never set it back to `true`, every real timer fired afterward saw `isMounted === false` and
  silently bailed — `npm run verify` stayed green throughout (no test exercises real timers), only
  caught by live `console.log`ging the ref's value inside the timeout callback → an
  unmount-tracking ref must be set `true` in the effect's setup body, not just `false` in its
  cleanup, whenever the app runs under `<StrictMode>`; don't trust "it never fires" from a
  ref/timer guard without checking for a StrictMode double-invoke first.
- [2026-08-25] `Taskbar.jsx`'s Start button was wrapped in its own small `relative` div so a flyout panel could `absolute`-position off of it — but that narrow div (only as wide as the button) becomes the CSS containing block for the flyout, so a mobile full-width variant using `inset-x-0` stretched to the button's ~36px width instead of the screen, rendering as a thin strip; only caught by an actual mobile-viewport screenshot, `verify` stayed green throughout → for a flyout anchored to one taskbar button, don't add `relative` to that button's own wrapper — leave it unpositioned so the flyout's `absolute` positioning falls through to the Taskbar root (already `absolute inset-x-0 bottom-0`, i.e. already the full-width containing block); a small offset-only wrapper (`relative`) is fine when the flyout only sets `left-0`/`right-0` (a position, not a stretch), but breaks the moment any variant also sets the opposite side (`inset-x-0`, or both `left-0` and `right-0`) to span the full width.
- [2026-08-25] Found `StartMenu.jsx`'s P514/P515 tasks marked `[x]` in TASKS.md, but the code on disk used a different, unspecced technique (button growing `w-9` → `hover:w-40` so the label was hidden until hover) than the plan's described `group`/sliding-`scale-x`-highlight with an always-visible label on desktop → rewrote to match the written spec — which was itself wrong: Sonny then supplied two real Windows 11 screenshots showing the rail stays icon-only at rest and only reveals the label when the button itself expands on hover, not a permanently-labeled row. Reverted to the original `w-9`→`hover:w-40` expanding-button code (which had been correct all along) → a `[x]` in TASKS.md, and even a freshly-written pass condition, only means someone believed it was correct — for a visual/UX task, a real reference screenshot from Sonny outranks the prose spec whenever they conflict; re-derive the task text from the screenshot instead of trusting the written description. Also: an expanding hover button (`z-20` here) can render on top of a click-triggered flyout that opens beneath it, since the click itself requires hovering — give the flyout a higher `z-index` than any hover-expanding trigger it can appear next to.
- [2026-08-25] `overflow-hidden` clips at an element's own border/padding edge, not its content-box edge — a flex child with `white-space:nowrap` text and default `min-width:auto` won't shrink below its intrinsic width, so it can overflow into the _parent's own padding_ and still render there (a couple of characters visibly "peeking") even though the parent has `overflow-hidden`; only clips fully once content crosses the parent's outer edge → for a hover-reveal label meant to be fully invisible at rest, don't rely on width/padding arithmetic to land the clip exactly at zero — use `opacity-0`/`opacity-100` instead (or give the label its own zero-size box), since opacity hides the pixels regardless of exactly where they'd geometrically render. Relatedly, animating two nested clip boundaries at once (e.g. a parent's `width` and a child's own `max-width`, both `group-hover`-driven) can drift out of sync mid-transition and show a visible seam between them — prefer one spatial clip (the outer container) plus opacity for the inner reveal, not two competing width transitions.
- [2026-08-25] `StartMenu.jsx`'s footer rail overlays the app-list column on hover (`position:absolute`, so it doesn't push the flex layout) — its expanded width must match a real layout boundary (here, `760px` panel − `420px` "Recently used" column = `340px`, the exact x where that column starts), not an arbitrary round Tailwind size (`w-40`/`w-48`); an arbitrary width that's narrower than the app-list's actual (variable, per-line) text width lets list entries bleed through past the overlay's edge, and reserving that width permanently in the layout to avoid it just forces the app-list's own text to wrap instead → for a hover overlay meant to fully cover a sibling's content, size it to that sibling's real boundary, computed from the actual layout constants, not guessed.
- [2026-08-26] `StartMenu.jsx`'s click-triggered `StartMenuPowerFlyout` was nested inside the hover-expanding footer rail (its `position:absolute` containing block) but sized with its own hardcoded `w-36 left-2` instead of tracking the rail's real (CSS-hover-animated, `w-14`↔`w-[340px]`) width — so it visibly misaligned with the rail's expanded edges, caught only by comparing a live screenshot against a real Windows 10 reference, not by `verify` → when a popup's containing block itself has an animated/variable size, size the popup relative to that ancestor (`inset-x-0`, stretching to 100% of its current width) instead of a fixed Tailwind width guessed to roughly match one state of it.

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
