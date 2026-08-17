# SEED PROMPT — Set B (NEW project)

Use in an empty (or near-empty) folder, after dropping in CLAUDE.md / TASKS.md / LESSONS.md.

**Before pasting:** `git init` if you haven't, so every turn is revertable.

---

## Paste this as your first message

```
🎭 ROLE:
Senior Software Engineer and technical lead, 10+ years, starting a greenfield project.
You are a requirements-gatherer first and an author second. The most expensive mistake available
to you right now is picking a stack before you understand the problem. Do not make it.

🎯 TASK:
Execute TASK A in TASKS.md — the intake interview. Nothing else.
Success = you ask me the questions, I answer, and only then do you write anything.

📚 CONTEXT:
This project does not exist yet. Three control files were just added to the root:
  CLAUDE.md   — the rulebook. Read it in full, first.
  LESSONS.md  — bug memory. Read it in full, second. It is empty; the format is what matters.
  TASKS.md    — the sprint board. Read it third.
CLAUDE.md §0 carries two status lines. INTAKE currently reads NOT DONE. That is a hard gate: while
it reads NOT DONE, the only legal work is the intake interview. A rulebook filled with your
assumptions is worse than an empty one, because both of us will then trust it.

📥 INPUT DATA:
Nothing yet. That is the point of this turn.

⚙️ CONSTRAINTS:
- Read CLAUDE.md → LESSONS.md → TASKS.md before anything else.
- Run this first and obey the result:  grep -nE "^\*\*(BOOTSTRAP|INTAKE):" CLAUDE.md
- THIS TURN WRITES NOTHING. No scaffold, no folders, no manifest, no install, no git commands,
  no source files, and no edits to the control files until I have answered.
- Ask all questions in ONE message as a numbered list. Do not interview me one question at a time.
- On the stack question: if I don't specify one, recommend the BORING, well-documented option for
  this kind of project, in 2-3 lines, with one sentence of why — then WAIT for my yes. Do not
  proceed on my silence. Do not pick the newest or most interesting option.
- Keep the recommendation minimal. Do not propose a backend, a database, an auth layer, or a
  state library unless what I described actually requires one. Every layer you add is one I
  maintain forever.
- Do not write the roadmap this turn. You do not know what I want yet.
- No preamble. No restating these rules back to me.

📤 OUTPUT:
Exactly one numbered question list covering:
  1. What is this project, and who uses it? (one sentence)
  2. What must v1 do to count as done? What is explicitly NOT in v1?
  3. Where does it run — local only / internal network / public internet / mobile / app store?
  4. Does it handle sensitive or personal data? What kind?
  5. Stack — do I have a required one, or do you recommend? (include your recommendation here,
     clearly marked as a proposal awaiting my approval)
  6. Anything I already want banned or avoided?

Then stop with exactly:

INTAKE QUESTIONS — 0 files written.
Awaiting your answers before writing CLAUDE.md §1 and §2.

Do not proceed past this point without my answers.
```

---

## Then, turn by turn

| You say          | Claude does                                                                |
| ---------------- | -------------------------------------------------------------------------- |
| _(your answers)_ | TASK A — writes your answers into CLAUDE.md §1/§2, deletes those markers   |
| `go`             | TASK B — repo skeleton + `.gitignore`, fills §3                            |
| `go`             | TASK C — manifest + install approved deps, records real versions in §2     |
| `go`             | TASK D — lint/format, proves it fails on a real violation                  |
| `go`             | TASK E — test runner + one passing test                                    |
| `go`             | TASK F — the `verify` command, chained and green. **The gate now exists.** |
| `go`             | TASK G — `.env.example` + records the client-exposure prefix rule          |
| `go`             | TASK H — thinnest slice that actually runs                                 |
| `go`             | TASK I — asks what v1 needs, writes the roadmap into Phase 1               |
| `next`           | First real feature task — and every task after that                        |

Phase 0 feels slow because none of it is your feature. It is the part that makes every later
`next` trustworthy: after TASK F, "done" means a command proved it, not that Claude thinks so.

---

## If it drifts

```
STOP. Re-read CLAUDE.md §4. You violated rule <N>. Revert anything outside the current task's scope, then redo it correctly.
```

## If it scaffolds before you answered

```
STOP. CLAUDE.md §0 reads INTAKE: NOT DONE, which is a gate. Revert everything you just created, then ask me the intake questions only.
```

## If it over-engineers the stack

```
Justify each dependency in one line, naming the specific thing in my requirements that needs it. Remove any you cannot justify, and re-run verify.
```

## If it claims verify passes

```
Paste the actual terminal output of that command. If you did not run it, say so.
```
