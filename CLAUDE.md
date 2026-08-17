# CLAUDE.md — Project Rulebook (Static)

> Read order every session: **CLAUDE.md → LESSONS.md → TASKS.md**.
> CLAUDE.md = the law. LESSONS.md = mistakes already paid for. TASKS.md = what to do right now.

---

## §0 SETUP GATE — READ THIS FIRST

**BOOTSTRAP: COMPLETE**
**INTAKE: DONE**

Those two status lines are the gate. Check them before anything else:

```bash
grep -nE "^\*\*(BOOTSTRAP|INTAKE):" CLAUDE.md
```

- `INTAKE: NOT DONE` → the project is undefined. The ONLY permitted work is **TASK A** (the
  intake interview). You may NOT scaffold, create files, or install anything. You may NOT pick a
  stack for me — recommend one and wait for my answer. Only TASK A may flip this to `DONE`, and
  only after I have answered in writing.
- `INTAKE: DONE` + `BOOTSTRAP: INCOMPLETE` → you may work **Phase 0** in TASKS.md (tasks B–I), in
  order, one at a time. No feature work.
- `BOOTSTRAP: COMPLETE` → normal execution rules (§4) apply. Only TASK I may flip this, and only
  once the verify command in §4.6 has actually been run green.

Sections below carry `SETUP:FILL` markers. Each is owned by a specific Phase 0 task, so markers
surviving into TASK B–F is expected and does **not** re-block you — the two status lines above
are the only gate.

**A rulebook filled with your assumptions is worse than an empty one**, because I will trust it
and so will you. Every line below must come from something I explicitly told you, or from a
command you actually ran.

---

## §1 PROJECT

- **Name:** My Portfolio Website V2
- **What it is:** A Windows-11-inspired "Web-Desktop OS" personal portfolio — a full-screen simulated desktop (wallpaper, draggable icons, taskbar, system tray) where each icon opens an app-like window (Resume, Blog, Games, Contact, etc.) showcasing Sonny's work.
- **Who uses it:** Public visitors (recruiters, clients, etc.) browsing Sonny's portfolio.
- **Where it runs:** Local only for now; public internet once deployed later.
- **Handles sensitive data?** Yes, eventually — a Contact app (Phase 1, not v1) will collect visitor name, email, and possibly social handles for booking/messaging. Not present in the v1 shell.
- **Definition of done for v1:** The desktop shell works end-to-end — wallpaper renders, all 13 icons are visible/draggable/right-clickable, double-click opens a placeholder window (Resume opens a PDF-styled window instead), taskbar + system tray render with a live clock, and the desktop right-click context menu works — with no real app content behind the other 12 icons yet.
- **Explicitly NOT in v1:** Real functional content behind any icon except Resume (Blog, Games, Paint, Music Lab, Store, Memory Wall, Visitor Arts, etc. stay empty placeholders), the Contact app's booking/send functionality and any backend/email integration it needs, deployment/hosting, auth, and any real photo of a person in the wallpaper. Resume gets a PDF-styled icon/window in v1, but with placeholder page content — the real resume PDF is swapped in once Sonny provides the file.

---

## §2 STACK (chosen once, then locked)

| Layer              | Choice                             | Version                     | Why (one line)                                                                                                |
| ------------------ | ---------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Runtime / language | JavaScript (ES2022)                | Node v24.18.0 (dev machine) | No TypeScript requested; keeps Phase 0 minimal.                                                               |
| Framework          | React                              | 19.2.8                      | Explicitly required in Sonny's spec.                                                                          |
| Build tool         | Vite (+ @vitejs/plugin-react)      | 8.2.1 / 6.0.5               | Boring, well-documented standard for React SPAs.                                                              |
| Styling            | Tailwind CSS (+ @tailwindcss/vite) | 4.3.3 / 4.3.3               | Explicitly required in Sonny's spec. v4 uses a native Vite plugin, not PostCSS/autoprefixer — see LESSONS.md. |
| Animation          | Framer Motion                      | 13.1.0                      | Explicitly required for drag/drop and icon animation.                                                         |
| State / data       | React local state + Context API    | n/a                         | Explicitly requested; no external state library needed for a desktop-shell UI.                                |
| Backend            | none                               | n/a                         | Static/client-only for v1; Contact app's backend need is deferred to Phase 1.                                 |
| Database           | none                               | n/a                         | No persistent data needed for the v1 shell.                                                                   |
| Auth               | none                               | n/a                         | Single-owner portfolio, no user accounts in v1.                                                               |
| Tests              | Vitest + React Testing Library     | 4.1.10 / 16.3.2             | Pairs natively with Vite; boring standard for React.                                                          |
| Lint / format      | ESLint + Prettier                  | 10.8.1 / 3.9.6              | Standard, boring choice for JS/React.                                                                         |

**Record real installed versions, not the versions you intended.** After install, read them back
from the lockfile or manifest. "latest" is not a version — pin what actually landed.

**Banned without Sonny's explicit approval:**

- Any dependency not listed above.
- Any additional architectural layer (a backend, a DB, an ORM, a state library, a UI kit).
- Swapping a locked choice for one you prefer.
- Upgrading anything mid-sprint.

If a task appears to require one of the above → **stop and ask.**
Prefer the boring, well-documented option over the clever one. You will be debugging it later.

---

## §3 DIRECTORY & NAMING CONVENTIONS

```
.
├── .gitignore
├── .prettierrc
├── .prettierignore
├── CLAUDE.md
├── LESSONS.md
├── SEED_PROMPT.md
├── TASKS.md
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
├── index.html
├── .env.example
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   └── Desktop.jsx   (thinnest slice — full-viewport shell, no icons/taskbar yet)
    └── utils/
        ├── sum.js       (placeholder pure helper, proves the test runner)
        └── sum.test.js
```

`src/hooks/` doesn't exist yet — it lands in Phase 1 once there is a real hook to put in it.

- **File naming:** React components use `PascalCase.jsx` (e.g. `Desktop.jsx`); everything else
  (hooks, config, helpers) uses `camelCase.js` (e.g. `useClock.js`).
- **Where each kind of code goes:** `src/components/` for presentation (Desktop, Taskbar, icons,
  windows), `src/hooks/` for logic (clock, drag state, context-menu state), `src/utils/` for pure
  helpers. No data-access layer — v1 has no backend.
- **Import style:** relative imports. No path alias — the project is small enough that an alias
  would be a config layer with no real payoff yet.
- **Test file location:** beside the source file it tests (e.g. `Desktop.test.jsx` next to
  `Desktop.jsx`).

---

## §4 EXECUTION RULES (non-negotiable)

1. **One task at a time.** Work only the first unchecked `[ ]` in TASKS.md. Never look ahead, never batch, never "while I'm here" refactor.
2. **Read LESSONS.md before writing code, every session.** If an entry applies, name it in one line, then comply.
3. **Announce in one line before editing:** `TASK <id> → <files I will touch>`. No essays.
4. **≤50 lines of new/changed code per task.** If it needs more, split it into `<id>.a`, `<id>.b` in TASKS.md first, then do only `.a`.
5. **Build the smallest thing that runs, then grow it.** A working vertical slice beats a complete layer that has never executed. Never write the second file of a pattern before the first one runs.
6. **Verify after every task.** Run:
   ```bash
   npm run verify
   ```
   Chains, shortest-feedback-first: `format:check` → `lint` → `build` → `test`.
7. **Self-correct loop.** On failure:
   - Read the actual error text. Do not guess from the symptom.
   - Fix the root cause. Never silence an error by suppressing it (ignore-comments, disabled lint rules, loosened types, deleted assertions, skipped tests).
   - Re-run the verify command.
   - **After 3 failed attempts: STOP.** Append the verbatim error to LESSONS.md under `## Open Blockers` and ask Sonny. Do not keep trying variations.
8. **Then and only then:** flip `[ ]` → `[x]` in TASKS.md, update the pointer lines, and append a one-line LESSONS.md entry if anything surprised you.
9. **Never touch:** `.env` or any real secret, CI/CD config, or anything outside the current task's stated scope. `.env.example` with placeholders only.
10. **Closing report — exactly this, nothing after it:**
    ```
    TASK <id> ✅
    Files: <paths>
    Verify: <command> → PASS
    Lesson: <one line, or "none">
    Next: TASK <id+1> — <title>
    ```

---

## §5 ENGINEERING PRINCIPLES

Apply every principle that is meaningful for the stack in §2. Skip what doesn't apply — a static
site has no SQL rules. Never invent a requirement the stack cannot support.

### Security

- No secret, token, key, or connection string in the repo. Ever. Read from environment, validate at startup, fail loudly if absent.
- **Know which env vars ship to the client.** Most frontend build tools inline prefixed vars into the public bundle — a "secret" there is readable by anyone. Confirm the prefix rule for your build tool in TASK C and record it in LESSONS.md immediately.
- Validate all external input at the boundary it enters. Reject unknown fields.
- Parameterise every database query. String-concatenated queries are a defect, always.
- Authorise on the server for every protected action. A hidden UI control is not a permission check.
- Never log credentials, tokens, or personal data.
- Errors shown to users are generic; detail goes to logs.
- Get this right on day one. Retrofitting security into a working app is how leaks happen.

### Performance

- Correct first, then measured, then fast. Do not optimise on a hunch.
- No N+1 access patterns. Batch or join instead of looping.
- Paginate or virtualise anything unbounded from the very first list you build.
- Index what you filter and join on, in the same task that adds the query.
- Don't allocate inside a hot path (render loop, request handler, tight iteration).
- Release what you acquire: connections, listeners, timers, subscriptions, GPU resources.

### Architecture

- Separate presentation, logic, and data access from the first file. Retrofitting this is expensive.
- Dependencies point one way only. If A imports B, B never imports A.
- Business logic must be testable without its transport layer.
- One source of truth per concept. Duplicated shapes that can disagree are bugs waiting.
- Small units: functions under ~40 lines, files under ~250. Over that, split.
- Delete dead code immediately. No commented-out blocks left behind.
- Don't build for a scale or a feature you don't have yet.

### QA / Testing

- The verify command must be genuinely green before any feature work begins (TASK F). A gate that has never passed is not a gate.
- Every unit of logic gets one happy-path and one failure-path test.
- Bug fixed = failing test written first, then the fix. The test is the proof.
- Never mark a task complete with a failing or skipped check.
- No debug logging left in committed code.

---

## §6 STYLE

- **Formatter:** Prettier — decides all formatting (`.prettierrc`). Do not hand-format.
- **Quotes / semicolons / line width:** single quotes, no semicolons, formatter decides line width (`.prettierrc`).
- **Export style:** default export for React components (one per file, e.g. `export default function Desktop()`); named exports for everything else (hooks, utils, constants).
- **Async style:** async/await preferred.

Universal regardless of stack:

- Comment **why**, never **what**.
- Name things for what they mean, not what they are (`retryCount`, not `num`).
- No clever one-liners that need a comment to explain.

---

## §7 TOKEN DISCIPLINE

- Read only files the current task needs. Never scan the tree "for context".
- Prefer targeted edits over rewriting whole files.
- Don't paste file contents back to Sonny — he can open them.
- No preamble, no announcing intentions, no recapping these rules. Use the report format in §4.10.
