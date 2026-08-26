# TASKS.md — Live Sprint Board (Dynamic)

> **Claude:** work ONLY the first unchecked `[ ]`. Verify. Then flip to `[x]`.
> ≤50 lines of change per task. If it won't fit, split into `.a` / `.b` here FIRST, then do `.a`.
> Never work ahead. Never batch. Never soften a task's wording to make it pass.

**Current task pointer:** `_(Phase 81 + addendum — desktop icon grid + snap-to-grid dragging —
complete (P489-P493, P507; P493 folded into P491): icons render in one aligned absolute grid sized
to the Large preset, drag-and-drop snaps to the nearest empty cell, Sort discards manual dragging
in favor of fresh sorted grid order, and shrinking the browser window reflows the grid so nothing
hides behind the taskbar; this thread's work is done as of 2026-08-25 — other phases/tasks on this
board (82 onward) belong to concurrent sessions, not this one)_`
**Also this thread:** Phase 87 (P526) — a direct Sonny bug-report fix for the Start Menu Power
flyout's width alignment — complete as of 2026-08-26. Phase 88 (P527) — seeded the Start Menu's
"Recently used" grid with 6 default apps instead of starting empty — complete as of 2026-08-26.
Phase 91 (P530-P532) — gave every window's minimize/maximize/close buttons the same flush,
square-cornered "seamless" chrome Command Prompt already had — complete as of 2026-08-26. (Phases
89-90 in between belong to a concurrent session, not this thread.)
**Last verified:** 2026-08-26 — `npm run verify` → PASS (0 errors, 11 pre-existing-pattern
warnings, 62 tests)
**Verify command:** `npm run verify`

---

## PHASE 0 — DEFINE & PROVE THE GATE (blocking)

_Nothing here is feature work. The point of Phase 0 is that by the end of it, one command tells
the truth about whether the project is healthy. Until that command exists AND passes, every
"done" claim afterwards is unverifiable._

- [x] **TASK A** — Intake interview. **No writes to any file except CLAUDE.md §1/§2.** Ask Sonny, in one message, as a numbered list:
  1. What is this project and who uses it? (one sentence)
  2. What must v1 do to count as done? What is explicitly NOT in v1?
  3. Where does it run — local / internal network / public internet / mobile?
  4. Does it handle sensitive or personal data? What kind?
  5. Stack: does he have a required stack, or should you recommend the boring reliable option for this project type and wait for his yes?
  6. Anything he already knows he wants banned or avoided?
     Then write his answers into CLAUDE.md §1 and §2, delete those two marker comments, and flip
     `**INTAKE: NOT DONE**` to `**INTAKE: DONE**`.
     **Pass condition:** §1 and §2 contain Sonny's answers in his terms, he has confirmed the stack
     in writing, and the INTAKE line reads `DONE`. Do NOT proceed on silence or a guess.

- [x] **TASK B** — Create the minimum repo skeleton for the approved stack: root config, `.gitignore` (dependencies, build output, env files, local DB files, OS junk), and only the folders that will hold a file this week. `git init` if needed. Fill CLAUDE.md §3.
      **Pass condition:** tree matches §3 exactly, no empty speculative folders, `.gitignore` covers env + build output.

- [x] **TASK C** — Create the dependency manifest and install **only** the dependencies approved in TASK A. Then read the real installed versions back from the lockfile and write them into CLAUDE.md §2.
      **Pass condition:** install completes clean, §2 lists real pinned versions (no "latest"), and no unapproved package appears in the manifest.

- [x] **TASK D** — Add lint + format config appropriate to the stack. Fill CLAUDE.md §6. Then prove both directions: run the linter on clean code (must exit 0), then on a throwaway file containing a deliberate violation (must exit non-zero). Delete the throwaway file.
      **Pass condition:** both the pass AND the fail case demonstrated with real output. A linter that never fails is decoration.

- [x] **TASK E** — Add the test runner and exactly ONE trivial passing test (assert a pure helper returns a known value). Nothing more.
      **Pass condition:** the runner discovers and passes 1 test, shown in real output.

- [x] **TASK F** — Define the single `verify` script that chains the checks from D and E plus the build, shortest-feedback-first. Run it. Fill CLAUDE.md §4.6 with the exact command.
      **Pass condition:** the chained command has been executed and exits 0, with real output pasted. This is the gate every later task must pass. If it is not green here, do not continue — fix it or ask.

- [x] **TASK G** — Add `.env.example` listing every variable the project will need, placeholder values only. Confirm and record the build tool's client-exposure prefix rule in LESSONS.md.
      **Pass condition:** no real secret in the repo, `.env` is gitignored, and the prefix rule is written down.

- [x] **TASK H** — Build the thinnest end-to-end slice that actually runs: one entry point rendering or responding with one real thing, wired the way real features will be wired. No styling, no polish, no second feature.
      **Pass condition:** it runs, `verify` passes, and Sonny can see it work.

- [x] **TASK I** — With Sonny, write the real v1 roadmap into Phase 1 below as micro-tasks per the
      rules at the bottom of this file. Ask; do not assume. Then flip CLAUDE.md §0 from
      `**BOOTSTRAP: INCOMPLETE**` to `**BOOTSTRAP: COMPLETE**`.
      **Pass condition:** Sonny has confirmed the list, every task states its own pass condition, this
      returns nothing —
  ```bash
  grep -n "<!-- SETUP:FILL" CLAUDE.md
  ```
  — and the gate line reads `COMPLETE`. Do not flip the gate while any marker remains or while
  the verify command from TASK F is not green.

---

## PHASE 1 — v1 FEATURE WORK

_Confirmed with Sonny on 2026-08-17. Builds on the running `Desktop.jsx` shell from TASK H._

- [x] **P1** — Add the cyberpunk grid/matrix wallpaper (CSS/SVG only, no photo) plus the ambient radial-gradient overlay to `src/components/Desktop.jsx`.
      **Pass condition:** dev server shows the dark base + glowing grid/matrix layer + radial glow behind where icons will sit; `verify` passes.

- [x] **P2** — Add the "PouyaOS Professional" branding text, subtly placed bottom-right, to `Desktop.jsx`.
      **Pass condition:** text visible in the bottom-right corner in the browser; `verify` passes.

- [x] **P3** — Create `src/data/desktopIcons.js`: the 13-icon config array (id, label, column, icon glyph). Resume's entry uses a PDF-file-style icon.
      **Pass condition:** file exports an array of 13 well-formed entries; `verify` passes.

- [x] **P4** — Create `src/components/DesktopIcon.jsx`: renders one icon (glyph + label), static, no interactivity.
      **Pass condition:** rendering it with a sample icon prop shows the glyph and label; `verify` passes.

- [x] **P5** — Render all 13 icons from `desktopIcons.js` via `DesktopIcon` in the 2-column left-side grid in `Desktop.jsx`.
      **Pass condition:** all 13 icons visible in 2 columns in the browser; `verify` passes.

- [x] **P6** — Add Framer Motion `drag`/`dragMomentum={false}` to `DesktopIcon.jsx` so each icon can be dragged anywhere.
      **Pass condition:** dragging an icon in the browser moves it and it stays where dropped; `verify` passes.

- [x] **P7** — Add single-click focus state to `DesktopIcon.jsx`: clicking toggles an active border on that icon.
      **Pass condition:** clicking an icon shows a focus border, clicking elsewhere clears it; `verify` passes.

- [x] **P8** — Create `src/components/Window.jsx`: a generic placeholder window (title bar + empty body), used by 12 of the 13 icons.
      **Pass condition:** rendering it standalone with a title prop shows a titled window frame; `verify` passes.

- [x] **P9** — Create `src/components/ResumeWindow.jsx`: styled to look like a PDF viewer (page background, PDF-red toolbar, page layout) with placeholder page content. Real resume PDF is swapped in later once Sonny provides the file.
      **Pass condition:** rendering it standalone looks like a PDF document/viewer, not the generic `Window`; `verify` passes.

- [x] **P10** — Wire double-click on a `DesktopIcon` to call `openApp(id)`, opening `Window` for 12 icons and `ResumeWindow` for Resume.
      **Pass condition:** double-clicking Resume opens the PDF-styled window, double-clicking any other icon opens the generic placeholder window; `verify` passes.

- [x] **P11** — Add a right-click context menu on `DesktopIcon` ("Open", "Pin to Taskbar", "Properties") positioned at `e.clientX`/`e.clientY`.
      **Pass condition:** right-clicking an icon shows the menu at the cursor; left-click elsewhere closes it; `verify` passes.

- [x] **P12** — Add a right-click context menu on the empty desktop ("Refresh", "Change Wallpaper", "Display Settings") in `Desktop.jsx`; left-click closes it.
      **Pass condition:** right-clicking empty desktop shows the menu, left-click anywhere closes it; `verify` passes.

- [x] **P13** — Create `src/components/Taskbar.jsx`: fixed bottom bar with glassmorphism (`backdrop-filter: blur`, translucent dark background, top border), empty otherwise.
      **Pass condition:** bar visible fixed to the bottom with the blur/glass effect; `verify` passes.

- [x] **P14** — Add the left launcher icons to `Taskbar.jsx`: Start, Widgets, Search, File Explorer (static, with click state).
      **Pass condition:** all 4 icons visible on the taskbar left, clicking one shows an active state; `verify` passes.

- [x] **P15** — Add center-left pinned/quick-launch app icons to `Taskbar.jsx` (e.g. Music, Terminal, Messaging), with click state.
      **Pass condition:** pinned icons visible, clicking one shows an active state; `verify` passes.

- [x] **P16** — Create `src/components/SystemTray.jsx`: right-aligned tray container, mounted inside `Taskbar.jsx`.
      **Pass condition:** empty tray container visible on the taskbar's far right; `verify` passes.

- [x] **P17** — Add utility icons to `SystemTray.jsx`: hidden-icons arrow, Wi-Fi, Volume, Battery (static).
      **Pass condition:** all 4 icons visible in the tray; `verify` passes.

- [x] **P18** — Add the live clock widget to `SystemTray.jsx`: time + date, updating every second via `setInterval` (cleaned up on unmount).
      **Pass condition:** clock visibly ticks once per second in the browser and matches the system clock; `verify` passes.

---

## PHASE 2 — DESKTOP INTERACTION + "THIS PC" APP

_Requested by Sonny on 2026-08-17. Builds on the Phase 1 desktop shell._

- [x] **P19** — Add keyboard interaction to `Desktop.jsx`: `Enter` opens the focused icon's app, `Escape` clears the active selection (global keydown listener, cleaned up on unmount).
      **Pass condition:** pressing Enter after clicking an icon opens its window; pressing Escape after clicking an icon clears the focus border; `verify` passes.

- [x] **P20** — Update the icon and desktop context menu item sets in `Desktop.jsx`: icon menu becomes Open/Rename/Delete/Properties, desktop menu becomes View/Sort by/Refresh/Next Desktop Wallpaper/Paste/New/Personalize/Open Terminal (new items are inert placeholders, matching the existing Properties/Refresh style).
      **Pass condition:** right-clicking an icon shows the 4 new items; right-clicking the desktop shows the 8 new items; `verify` passes.

- [x] **P21** — Enhance `Window.jsx`: add an `icon` prop shown in the title bar, and Minimize/Maximize-Restore/Close controls top-right (minimize hides the body, maximize toggles a full-size layout).
      **Pass condition:** rendering `Window` standalone shows all 3 controls; clicking minimize hides the body and clicking it again restores it; clicking maximize toggles full-size; `verify` passes.

- [x] **P22** — Create `src/components/ThisPCWindow.jsx`: wraps content in the enhanced `Window`, with a top navigation bar (Back/Forward/Refresh/address bar reading "This PC > Local Disk (C:)"/Search box) and a secondary ribbon tab row (File/Home/Share/View).
      **Pass condition:** rendering it standalone shows the nav bar and ribbon tabs inside a `Window` frame; `verify` passes.

- [x] **P23** — Add the left Quick Access sidebar to `ThisPCWindow.jsx`: Desktop, Downloads, Documents, Pictures, Music, Videos, Local Disk (C:).
      **Pass condition:** sidebar list with all 7 items visible; `verify` passes.

- [x] **P24** — Add the "Folders" grid section to `ThisPCWindow.jsx` main content: 6 folder tiles (Desktop, Downloads, Documents, Pictures, Music, Videos).
      **Pass condition:** 6 folder tiles visible in a grid under a "Folders" heading; `verify` passes.

- [x] **P25** — Add the "Devices and drives" section to `ThisPCWindow.jsx`: Local Disk (C:) 142 GB free of 476 GB and System Reserved/Recovery (D:) 2 GB free of 15 GB, each with a horizontal used-space progress bar.
      **Pass condition:** both drives visible with proportionally correct progress bars; `verify` passes.

- [x] **P26** — Wire the "This PC" icon in `Desktop.jsx` to open `ThisPCWindow` instead of the generic `Window` (same pattern as Resume's `ResumeWindow`).
      **Pass condition:** double-clicking "This PC" opens `ThisPCWindow`; every other non-Resume icon still opens the generic `Window`; `verify` passes.

---

## PHASE 3 — RESIZABLE WINDOWS + CONTACT INFO APP

_Requested by Sonny on 2026-08-17. `react-rnd` approved by Sonny (named explicitly in his
request) — added to CLAUDE.md §2. Contact content uses placeholders per Sonny's choice; swap
`src/data/contactInfo.js` for his real details whenever he provides them._

- [x] **P27** — Install `react-rnd`, record the version in CLAUDE.md §2, and rewrite `Window.jsx` to use it for 8-direction resize (min 480×320) and title-bar-only dragging, with a configurable default size (650×500), keeping Minimize/Maximize-Restore/Close working (maximize fills the desktop bounds and remembers the prior size/position to restore to).
      **Pass condition:** dragging the title bar moves the window; resizing from an edge/corner works down to the 480×320 floor; minimize/maximize/restore/close all still work; `verify` passes.

- [x] **P28** — Create `src/data/contactInfo.js`: placeholder contact fields (name, location, phone/WhatsApp, website) and a social profiles list (Twitter/X, Facebook, Instagram, LinkedIn, Spotify), using generic placeholder values, not the reference screenshot's real third-party info.
      **Pass condition:** file exports a well-formed contact object; `verify` passes.

- [x] **P29** — Create `src/components/ContactInfoApp.jsx` skeleton: a menu bar (File/Edit/Format/View/Help) plus Read/Edit toggle buttons, and a "Find in document" search input, meant to render inside `Window`.
      **Pass condition:** rendering it standalone inside `Window` shows the menu bar, Read/Edit toggle, and search input; `verify` passes.

- [x] **P30** — Add the formatted contact content area to `ContactInfoApp.jsx`: dark notepad-style key/value rows (Name, Based In, Phone/WhatsApp, Website, Official Profiles) driven by `contactInfo.js`, with clickable links.
      **Pass condition:** all contact fields and links render correctly from the data file; `verify` passes.

- [x] **P31** — Add the status bar to `ContactInfoApp.jsx`: line count, word count, character count, and read time computed from the contact content, plus a static "sync status" label.
      **Pass condition:** status bar shows real computed counts matching the rendered content; `verify` passes.

- [x] **P32** — Add a "Copy All Details" button to `ContactInfoApp.jsx` that copies the formatted contact text via `navigator.clipboard.writeText`, with a toast/tooltip confirmation ("Copied to clipboard!").
      **Pass condition:** clicking the button copies the expected text and shows the confirmation; `verify` passes.

- [x] **P33** — Wire the "Contact Info" icon in `Desktop.jsx` to open `ContactInfoApp` (via `Window`, default size 650×500) instead of the generic `Window`.
      **Pass condition:** double-clicking "Contact Info" opens `ContactInfoApp` at the right default size; every other non-special icon still opens the generic `Window`; `verify` passes.

---

## PHASE 4 — REAL WINDOW MANAGER (TASKBAR-INTEGRATED MINIMIZE)

_Requested by Sonny on 2026-08-17: minimize should hide the whole window, every open window
should show a running icon in the taskbar, and closing a window should remove that icon —
matching normal Windows OS taskbar/system-tray behavior._

- [x] **P34** — In `src/components/Window.jsx`, change `isMinimized` from internal `useState` to a controlled prop (`isMinimized`, `onMinimizeToggle`); render nothing (`return null`) for the whole window when minimized instead of only hiding the body.
      **Pass condition:** rendering `Window` standalone with `isMinimized={true}` renders nothing; clicking the minimize button calls `onMinimizeToggle` instead of toggling internal state; `verify` passes.

- [x] **P35** — In `src/components/ResumeWindow.jsx`, add `isMinimized`/`onMinimizeToggle` props and a minimize ("_") button next to its close button in the PDF-style toolbar; return `null` when `isMinimized` is true.
      **Pass condition:** standalone render with `isMinimized={true}` renders nothing; the new minimize button calls `onMinimizeToggle`; `verify` passes.

- [x] **P36** — In `src/components/Desktop.jsx`, replace the single `openAppId` state with an `openWindows` array of `{ id, isMinimized }`, plus `openApp`/`closeApp`/`toggleMinimize` handlers; update icon double-click and the icon context menu's "Open" action to call `openApp`; render one window per `openWindows` entry (Resume/This PC/Contact Info/generic branches) so multiple windows can be mounted at once, each wired to its own `isMinimized`/`onMinimizeToggle`/`onClose`.
      **Pass condition:** opening two different icons shows both windows mounted at once; closing one leaves the other open; `verify` passes.

- [x] **P37** — In `src/components/Taskbar.jsx`, accept `openWindows` (with icon/label/isMinimized) and an `onWindowClick` prop; render one running-app button per open window (highlighted when not minimized), clicking it toggles minimize/restore via `onWindowClick(id)`. Wire it from `Desktop.jsx`.
      **Pass condition:** opening an app shows its icon in the taskbar; clicking a restored window's taskbar icon minimizes it and dims the icon, clicking again restores it; closing the window removes its taskbar icon; `verify` passes.

---

## PHASE 5 — ICON HOVER STATES + RUBBER-BAND MULTI-SELECT

_Requested by Sonny on 2026-08-17: hover feedback on desktop/taskbar/tray icons, plus a
click-and-drag rectangle to multi-select desktop icons like a normal OS desktop._

- [x] **P38** — In `src/components/DesktopIcon.jsx`, add a hover background/transition to the icon container (distinct from the existing selected-state style).
      **Pass condition:** hovering a desktop icon in the browser shows a highlight that clears on mouse-leave, without changing selected-icon styling; `verify` passes.

- [x] **P39** — In `src/components/Taskbar.jsx` and `src/components/SystemTray.jsx`, ensure every icon (left launchers, pinned apps, running-app buttons, and the tray's hidden-icons arrow/Wi-Fi/Volume/Battery) has a hover highlight — convert the tray's plain `<span>` icons to `<button>`s with the same hover treatment used elsewhere in the taskbar.
      **Pass condition:** hovering any taskbar or system-tray icon in the browser shows a highlight; `verify` passes.

- [x] **P40** — In `src/components/Desktop.jsx` and `src/components/DesktopIcon.jsx`, replace the single-select `activeIconId` state with a multi-select `selectedIconIds` array (rename the `isActive` prop to `isSelected`); a single click on an icon replaces the selection with just that icon, `Escape` clears the whole selection, and `Enter` opens the app only when exactly one icon is selected.
      **Pass condition:** clicking icon A then icon B highlights only B; pressing Escape clears all highlights; `verify` passes.

- [x] **P41** — In `src/components/Desktop.jsx` and `src/components/DesktopIcon.jsx` (forwarding a ref for hit-testing), add left-click-drag rubber-band selection on the empty desktop background: dragging draws a translucent rectangle, and releasing selects every icon whose bounds intersect it (replacing the prior selection); a completed drag-select must not also trigger the desktop's existing click-to-deselect handler.
      **Pass condition:** dragging a rectangle over two or more icons selects exactly those icons; a plain click with no movement still clears the selection as before; `verify` passes.

---

## PHASE 6 — GMAIL-STYLE COMPOSE APP

_Requested by Sonny on 2026-08-17, from a screenshot of Gmail's "New Message" compose window:
a Gmail icon opens a custom-built recreation of that screen. To is locked to
`llarenasonny@yahoo.com` (copyable, not removable by guest), the subject line gets a
category dropdown (Pricing/Product Inquiry/Software Development/Web Development/Other), the
body gets real text-styling controls, and — per Sonny's answer when asked about Send — a
guest must give their name + email in a gate dialog before the compose window opens, and Send
itself stays a visual-only placeholder (like the rest of v1's deferred send/booking logic) since
real sending is a future backend integration, not a v1 concern._

- [x] **P42** — Add a `GmailGlyph` inline SVG (Gmail's colored-envelope icon) to `src/components/DesktopIcon.jsx`, triggered by icon token `'gmail'`; add a matching `gmail` entry to `src/data/desktopIcons.js`.
      **Pass condition:** a recognizable multi-color Gmail envelope icon renders on the desktop; `verify` passes.

- [x] **P43** — Create `src/components/GmailGuestGate.jsx`: a modal asking for the guest's Name and Email (both required) with Continue/Cancel actions, meant to gate opening the compose window.
      **Pass condition:** standalone render shows Name/Email inputs and a Continue button disabled until both are filled; `verify` passes.

- [x] **P44** — Create `src/components/GmailComposeApp.jsx` skeleton: a `To` field locked to `llarenasonny@yahoo.com` with a copy-to-clipboard button, a `Subject` input paired with a category dropdown (Pricing/Product Inquiry/Software Development/Web Development/Other) that prefixes the subject text, and a body area pre-filled with a signature line from a `guest` prop (`{ name, email }`).
      **Pass condition:** standalone render shows the locked/copyable To field, the category dropdown updating the subject prefix, and the body pre-filled with the guest's name/email; `verify` passes.

- [x] **P45** — Add a real text-styling toolbar to `GmailComposeApp.jsx`'s body: make the body a `contentEditable` area and wire Bold/Italic/Underline/Strikethrough/ordered-list/unordered-list/indent/outdent/blockquote/clear-formatting buttons to `document.execCommand`.
      **Pass condition:** clicking Bold with body text selected toggles bold formatting; `verify` passes.

- [x] **P46** — Add the Send action to `GmailComposeApp.jsx`: clicking Send shows a "Message sent (demo)" confirmation toast, matching the placeholder pattern already used for other v1 send/booking actions; no real email is transmitted.
      **Pass condition:** clicking Send shows the confirmation toast; `verify` passes.

- [x] **P47** — Wire it together in `src/components/Desktop.jsx`: opening the Gmail icon (double-click or the icon context menu's "Open") shows `GmailGuestGate` first; submitting it stores the guest's name/email for the session and opens `GmailComposeApp` inside the existing generic `Window` (title "New Message", default size 700×550) with that guest info — reopening later in the same session skips the gate.
      **Pass condition:** opening Gmail prompts for name/email once, then opens the compose window prefilled and taskbar-integrated; reopening afterward skips the gate; `verify` passes.

---

## PHASE 7 — WIRE IN REAL ICON IMAGES

_Sonny saved real icon PNGs into `src/assets/icons/` (named after each icon's `id`, per the
convention documented in CLAUDE.md §3) and asked to wire them into the desktop icon grid and the
taskbar, replacing the emoji/inline-SVG placeholders wherever a real file exists. Renamed
`Paint.png`→`paint.png`, `visitors-art.png`→`visitor-arts.png`, `windows.png`→`start.png` to
match the convention. No file was provided for `music-lab` or `resume`, so those keep their
current emoji/`PdfGlyph` placeholder._

- [x] **P48** — Create `src/assets/icons/index.js` exporting an `iconImages` map keyed by icon `id` (importing every PNG currently in that folder); update `src/components/DesktopIcon.jsx` to accept an `id` prop and render `iconImages[id]` as an `<img>` when present (falling back to the existing `PdfGlyph`/emoji rendering otherwise, and dropping the now-redundant inline `GmailGlyph`); pass `id={icon.id}` from both icon columns in `src/components/Desktop.jsx`.
      **Pass condition:** every desktop icon with a matching file in `src/assets/icons/` renders that real image instead of its emoji/glyph; Resume and Music Lab (no file provided) keep their current look; `verify` passes.

- [x] **P49** — Update `src/components/Taskbar.jsx` so `TaskbarButton` and `RunningAppButton` accept an `id` and render `iconImages[id]` (from the same map) when present, falling back to the existing emoji otherwise; pass `id` through for the left launchers, pinned apps, and running-app buttons; update the `openWindows` prop built in `src/components/Desktop.jsx` to include each window's `id`.
      **Pass condition:** the Start and Search taskbar buttons show their real icons; any open window with a matching icon file (e.g. Gmail) shows its real icon in its running-app taskbar button; everything without a file still shows its emoji; `verify` passes.

---

## PHASE 8 — TEXT GLOW + NON-OVERLAPPING ICON DRAG

_Requested by Sonny on 2026-08-17: a subtle black blurry glow behind text sitting directly on
the desktop (icon labels + the watermark), and icons must not be droppable on top of each other
when dragged — free dragging anywhere on the desktop already works from `P6`, this only adds the
no-overlap constraint on release._

- [x] **P50** — Add a subtle black blurry text-shadow glow to the icon label in `src/components/DesktopIcon.jsx` and the "SonnyOS Professional" watermark in `src/components/Desktop.jsx`.
      **Pass condition:** both texts show a visible soft black glow around their characters in the browser; `verify` passes.

- [x] **P51** — Extract a `rectsIntersect(a, b)` pure helper into `src/utils/geometry.js` with a co-located `geometry.test.js` (one overlapping case, one non-overlapping case); refactor the marquee hit-test in `src/components/Desktop.jsx` to use it instead of its inline check.
      **Pass condition:** `npm run test` shows the new geometry tests passing; marquee selection behaves exactly as before; `verify` passes.

- [x] **P52** — In `src/components/DesktopIcon.jsx`, back the icon's position with explicit framer-motion `x`/`y` motion values, remember the pre-drag position on `onDragStart`, and on `onDragEnd` use a new `getOtherRects(id)` prop (provided by `src/components/Desktop.jsx` from its existing `iconRefs` map) plus `rectsIntersect` to spring the icon back to its pre-drag position if it now overlaps another icon.
      **Pass condition:** dragging one icon on top of another and releasing snaps it back to where it started; dragging it to any empty spot on the desktop keeps it there; `verify` passes.

---

## PHASE 9 — PAINT APP + VISITOR ARTS GALLERY

_Requested by Sonny on 2026-08-17 (as a Principal Frontend Engineer brief, with two reference
screenshots): a real HTML5 Canvas Paint editor whose "Save Artwork" action pushes into a shared
gallery that the "Visitor Arts" app renders live. `desktopIcons.js` already has `paint` and
`visitor-arts` entries (currently opening the generic placeholder `Window`); this phase replaces
that placeholder for both. Uses Context API for the shared artwork list — already approved in
CLAUDE.md §2 — kept out of `Desktop.jsx` (already 311 lines, over the §5 250-line guidance) as
its own bounded concern. No backend exists, so "global" here means shared across windows within
one page load, not persisted across reloads or visitors — flagged to Sonny, not silently implied
otherwise._

- [x] **P53** — Create `src/data/galleryArtworks.js` (a small seed list of placeholder guest artworks — id/title/author/timestamp/imageData, using inline generated SVG data-URI thumbnails, no real drawings needed) and `src/context/GalleryContext.jsx` exporting `GalleryProvider` and a `useGallery()` hook (`artworks`, `addArtwork`, `deleteArtwork`); wrap `<Desktop />` with `GalleryProvider` in `src/App.jsx`.
      **Pass condition:** a component under `GalleryProvider` calling `useGallery()` sees the seeded artworks array; `verify` passes.

- [x] **P54** — Create `src/utils/floodFill.js`: a pure flood-fill function operating on `ImageData` (color-tolerant, 4-directional) with `floodFill.test.js` covering a fill-changes-the-matching-region case and a fill-is-a-no-op-when-the-target-color-already-matches case.
      **Pass condition:** `npm run test` shows both new cases passing; `verify` passes.

- [x] **P55** — Create `src/components/paint/PaintCanvas.jsx`: a `forwardRef` canvas component with a fixed internal drawing resolution (CSS-scaled to fill its container) supporting the Brush tool (color/size/opacity props) plus an internal undo/redo history stack, exposing `undo()`/`redo()`/`clear()`/`getDataUrl()` via `useImperativeHandle` and reporting `{ canUndo, canRedo }` through an `onHistoryChange` prop.
      **Pass condition:** rendering it standalone and drawing a stroke, then calling `undo()` via the ref, removes that stroke; `verify` passes.

- [x] **P56** — Extend `PaintCanvas.jsx` with Eraser, Line, Rectangle, and Circle tools (selected via a `tool` prop), each committing to the undo history on pointer-up with a live preview while dragging.
      **Pass condition:** standalone rendering with each tool prop value draws the expected shape kind on drag, and each commits as one undoable step; `verify` passes.

- [x] **P57** — Extend `PaintCanvas.jsx` with the Fill Bucket tool using `floodFill.js` from `P54`.
      **Pass condition:** clicking with the fill tool changes the clicked region to the current color and is one undoable step; `verify` passes.

- [x] **P58** — Create `src/components/paint/PaintToolbar.jsx`: the top menu bar (File/Edit/Image/Colors/Help — inert, matching the other inert menu bars already in the app), a tool button row (Brush/Eraser/Line/Rectangle/Circle/Fill), size and opacity sliders, a color palette row, and the Save/Undo/Redo/Clear/Download buttons (moved here from the original P59 split, since a toolbar's buttons and its sliders don't split cleanly across files without hurting cohesion — see LESSONS.md) — fully controlled via props, no local state.
      **Pass condition:** standalone rendering shows all controls and each fires its corresponding `on*` prop with the right value when used; `verify` passes.

- [x] **P59** — Create `src/components/PaintApp.jsx`: composes `PaintToolbar` + `PaintCanvas`, owns tool/color/size/opacity/title state, the header instruction line, the `undo`/`redo`/`clear`/`getDataUrl` handlers wired to the `PaintCanvas` ref (feeding `PaintToolbar`'s buttons and a real file download), and an "Open Visual Arts" button via an `onOpenGallery` prop.
      **Pass condition:** standalone rendering lets you draw, undo/redo/clear, and download a PNG of the canvas; `verify` passes.

- [x] **P60** — Wire the "Save Artwork" action in `PaintApp.jsx`: convert the canvas to a PNG data URL via `getDataUrl()`, build `{ id, title, author: 'Guest', timestamp, imageData }` (title from a small text input, defaulting to "Untitled"), call `addArtwork` from `useGallery()`, and show a brief confirmation toast.
      **Pass condition:** clicking Save Artwork adds a new entry to the shared gallery state and shows the toast; `verify` passes.

- [x] **P61** — Create `src/components/VisitorArtsApp.jsx` skeleton: left info sidebar (title, description, live `artworks.length` count, "Open Paint" button via an `onOpenPaint` prop) and a main-area header (breadcrumb-style path + search input), matching the reference screenshot's shell.
      **Pass condition:** standalone rendering shows the sidebar with a real count from `useGallery()` and the header; `verify` passes.

- [x] **P62** — Add the art-card grid to `VisitorArtsApp.jsx`: one card per artwork from `useGallery()` (thumbnail, title, "Saved" status), filtered live by the search input from `P61`.
      **Pass condition:** typing in the search box narrows the visible cards by title; `verify` passes.

- [x] **P63** — Add per-card actions to `VisitorArtsApp.jsx`: clicking a thumbnail opens a fullscreen preview modal, a Download button saves the PNG via a temporary `<a download>`, and a Delete button calls `deleteArtwork` and removes the card.
      **Pass condition:** each of the three actions behaves as described in the browser; `verify` passes.

- [x] **P64** — Wire `PaintApp`/`VisitorArtsApp` into `src/components/Desktop.jsx`: open them via the existing generic `Window` for the `paint`/`visitor-arts` icons (replacing the placeholder branch), passing `onOpenGallery`/`onOpenPaint` callbacks that call the existing `openApp`.
      **Pass condition:** double-clicking Paint and Visitor Arts each open their real app; saving art in Paint and switching to Visitor Arts (via its taskbar icon or the cross-launch button) shows it immediately; `verify` passes.

---

## PHASE 10 — WIRE IN THIS PC FOLDER/DRIVE ICONS

_Sonny saved `desktop.png`, `downloads.png`, `pictures.png`, `music.png`, `videos.png`,
`local-disk-c.png`, `local-disk-d.png` into `src/assets/icons/` and asked to wire them into
`ThisPCWindow.jsx`'s Quick Access sidebar, Folders grid, and Devices and drives section,
replacing the emoji placeholders wherever a real file exists. No file was provided for
`Documents`, so it keeps its emoji._

- [x] **P65** — Add the 7 new PNGs to `src/assets/icons/index.js`'s `iconImages` map (keyed
      `desktop`/`downloads`/`pictures`/`music`/`videos`/`local-disk-c`/`local-disk-d`); update
      `src/components/ThisPCWindow.jsx` to attach matching `id`s to its `quickAccess`,
      `thisPcDrives`, and `drives` entries and render `iconImages[id]` as an `<img>` in place of
      the emoji wherever present.
      **Pass condition:** Desktop, Downloads, Pictures, Music, Videos, and both drive tiles show
      their real icon images in This PC's sidebar, folder grid, and drives section; Documents
      keeps its emoji; `verify` passes.

---

## PHASE 11 — THIS PC NAVIGATION + FILE MENUS + MOUSE POLISH

_Requested by Sonny on 2026-08-18, from a screenshot of the "This PC" window: File/Home/Share/View,
Back/Forward/address bar/search box, and every folder/drive tile are currently inert. Confirmed
with Sonny: (1) navigating into a folder/drive shows an empty-folder placeholder for now, real
per-folder content comes later; (2) This PC's File menu = Open new window / Close / Frequent
places, a document-type File menu (Resume, and by the same "notepad" logic from his first message,
Contact Info) = Save As / Download / Print, Home/Share/View are Claude's call — kept as static
inert item lists, matching the existing inert-menu-item pattern already used elsewhere (desktop
right-click menu, Paint's menu bar), rather than inventing new mechanics nobody asked for; (3)
right-click on a tile reuses the existing Open/Rename/Delete/Properties set from the desktop icons.
Also asked to double-check mouse behavior everywhere: `Window.jsx` and `ResumeWindow.jsx` already
`stopPropagation()` on right-click so the browser's native context menu (and native text
selection/copy/paste) works in every window's content — Contact Info, Resume, Gmail's
`contentEditable` body, Paint, and Visitor Arts all confirmed fine as-is, so no task below touches
them for that reason alone._

- [x] **P66** — Extend `Desktop.jsx`'s window model so an app can have more than one independent
      open instance: `openWindows` entries gain an `instanceId` (defaults to `id`), add
      `openNewInstance(id)` that always appends a fresh instance, and switch `closeApp`/
      `toggleMinimize` to operate on `instanceId`; update `Taskbar.jsx`'s running-window buttons to
      key off `instanceId`. Every other icon's existing single-instance open/focus/close/minimize
      behavior must be unchanged.
      **Pass condition:** temporarily calling `openNewInstance('this-pc')` twice produces two
      independently closable/minimizable This PC windows with two separate taskbar running-icons;
      every other icon still single-instances as before; `verify` passes.

- [x] **P67** — Add real navigation state to `ThisPCWindow.jsx`: a location history stack with
      `back()`/`forward()`/`navigateTo()`; wire Back/Forward (disabled at the ends of the stack),
      Refresh (re-runs `navigateTo()` on the current location), and the breadcrumb's 🏠 icon
      (navigates to root) to it; replace the hardcoded address-bar text with the real current
      location's breadcrumb.
      **Pass condition:** navigating updates the breadcrumb and enables Back; Back returns to the
      previous location and enables Forward; 🏠 returns to root; `verify` passes.

- [x] **P68** — Wire left-click select / double-click navigate / right-click context menu (reusing
      the existing Open/Rename/Delete/Properties item set) onto the Quick Access sidebar items,
      the This PC sidebar drive, the Folders grid tiles, and the Devices and drives tiles in
      `ThisPCWindow.jsx`; double-click (or the menu's Open) calls `navigateTo()` from P67.
      **Pass condition:** clicking a tile highlights it, clicking empty space clears the highlight,
      double-clicking navigates and updates the breadcrumb/Back button, right-clicking shows the
      4-item menu; `verify` passes.

- [x] **P69** — Add File/Home/Share/View ribbon dropdowns to `ThisPCWindow.jsx`: File → "Open new
      window" (new `onOpenNewWindow` prop), "Close" (`onClose`), "Frequent places" (the Quick
      Access folders, each calling `navigateTo()` from P67); Home/Share/View → static inert item
      lists. Wire `onOpenNewWindow` from `Desktop.jsx` to the `openNewInstance` added in P66.
      **Pass condition:** File → Open new window opens a second independent This PC window; Close
      closes the current one; Frequent places navigates; Home/Share/View show their static lists;
      `verify` passes.

- [x] **P70** — Add a "This folder is empty" placeholder view in `ThisPCWindow.jsx`'s main pane,
      shown whenever the current location isn't the root, replacing the Folders/Devices grids.
      **Pass condition:** navigating into any folder or drive shows the empty-folder placeholder;
      navigating Back restores the grids; `verify` passes.

- [x] **P71** — Wire the search box in `ThisPCWindow.jsx` to live-filter the root view's Folders and
      Devices tiles by name (case-insensitive substring match), showing a "No results" message when
      nothing matches; the box has no effect (or is disabled) away from the root.
      **Pass condition:** typing part of a folder name narrows the visible tiles; clearing the box
      restores them all; `verify` passes.

- [x] **P72** — Add a File menu to `ResumeWindow.jsx`'s toolbar with Save As / Download / Print:
      Print calls `window.print()`; Save As and Download both trigger a real `<a download>` at
      `/resume.pdf` (the path Sonny will drop the real resume file into later).
      **Pass condition:** Print opens the browser print dialog; Save As/Download attempt to
      download `/resume.pdf`; `verify` passes.

- [x] **P73** — Wire `ContactInfoApp.jsx`'s existing inert "File" menu item with the same Save As /
      Download / Print set: Print calls `window.print()`; Save As/Download build a `Blob` from the
      already-computed `documentText` and download it as `Contact-Info.txt`.
      **Pass condition:** Print opens the print dialog; Save As/Download downloads a real
      `Contact-Info.txt` containing the contact text; `verify` passes.

---

## PHASE 12 — MEMORY WALL APP

_Requested by Sonny on 2026-08-18, from a screenshot of a "Memory Wall" reference: a shared note
wall with a name/message/star-rating form on the left and a searchable, sortable, filterable card
grid on the right. `desktopIcons.js` already has a `memory-wall` entry (currently opening the
generic placeholder `Window`); this phase replaces that placeholder. Confirmed with Sonny: header
copy is rebranded for Sonny (not the reference screenshot's "Pouya"), storage is session-only
in-memory like `GalleryContext` (no backend, per CLAUDE.md §2 — resets on reload, not shared
between real visitors), seeded with a handful of generic placeholder notes (not the reference
screenshot's names/messages), and the ratings filter is exact-match (e.g. "4 stars" shows only
notes rated exactly 4; "0 stars" shows notes posted with no rating selected)._

- [x] **P74** — Create `src/data/memoryWallNotes.js` (a small seed list of generic placeholder
      notes — id/name/message/rating/timestamp, ratings 0-5) and `src/context/MemoryWallContext.jsx`
      exporting `MemoryWallProvider` and a `useMemoryWall()` hook (`notes`, `addNote`), mirroring
      `GalleryContext.jsx`'s shape; wrap `<Desktop />` with it in `src/App.jsx` alongside the
      existing `GalleryProvider`.
      **Pass condition:** a component under `MemoryWallProvider` calling `useMemoryWall()` sees the
      seeded notes array; `verify` passes.

- [x] **P75** — Create `src/components/MemoryWallApp.jsx`: the header (badge + "Leave a mark on
      Sonny's Portfolio" title + description + a live "N / Notes on the wall" count from
      `useMemoryWall()`) and the left "Add your note" form (Your name input, Your message textarea
      with a live 0/420 character counter, a 5-star clickable experience-rating control defaulting
      to unrated) with a "Post to the wall" button that calls `addNote` (built id/timestamp) and
      clears the form.
      **Pass condition:** standalone render shows the header with the real seeded count; filling the
      form and clicking Post adds a new note to `useMemoryWall()`'s `notes` and resets the form;
      `verify` passes.

- [x] **P76** — Add the right-side note-card grid to `MemoryWallApp.jsx`, driven by
      `useMemoryWall()`'s `notes`: each card shows name, star rating, timestamp, and message with a
      color cycled from a small pastel palette (stable per note, not reshuffling on sort/filter);
      above the grid, add a search input (filters by name/message substring), a sort dropdown
      (Newest first / Oldest first), and a ratings-filter dropdown (All ratings / 5..0 stars, exact
      match).
      **Pass condition:** typing in search narrows the cards by name/message; switching sort order
      reorders the cards by timestamp; picking a star count in the ratings filter shows only exact
      matches; posting a new note (from P75) appears in the grid immediately; `verify` passes.

- [x] **P77** — Wire the "Memory Wall" icon in `src/components/Desktop.jsx` to open `MemoryWallApp`
      (via the existing generic `Window`, matching the `visitor-arts` branch's pattern) instead of
      the placeholder `Window`.
      **Pass condition:** double-clicking "Memory Wall" opens the real app at a comfortable default
      size; every other non-special icon still opens the generic placeholder `Window`; `verify`
      passes.

---

## PHASE 13 — DEVELOPER LAB (SHARED EXPLORER ENGINE)

_Requested by Sonny on 2026-08-18, from a screenshot of a "Developer Lab" reference: it's the same
file-explorer shell as `ThisPCWindow.jsx` (nav history, sidebar Quick access + This PC drives,
Folders grid, search, ribbon), just rooted at "Developer Lab" instead of "This PC", with a
different sidebar Quick access list, a "This PC" sidebar section showing only C/D Drive (not the
existing This PC sidebar's own single-drive list — left unchanged), no "Devices and drives"
section in its main pane (it's a subfolder, not a drives root), and a Folders grid of
Projects/Tech Stack/Resume (Resume styled as a PDF file, matching the existing Resume desktop
icon's PDF glyph). Rather than duplicate `ThisPCWindow.jsx`'s ~230 lines wholesale (CLAUDE.md §5:
"Duplicated shapes that can disagree are bugs waiting"), this phase first generalizes the existing
`thispc/*` components into a shared, prop-driven explorer engine, then builds Developer Lab as a
thin config on top of it. Sonny asked to make Projects/Tech Stack/Resume empty for now — they
already get the existing "This folder is empty" placeholder for free, same as every This PC
folder._

- [x] **P78** — Extract the `PdfGlyph` inline SVG out of `src/components/DesktopIcon.jsx` into
      `src/components/icons/PdfGlyph.jsx` (accepting a `className` prop, default `h-8 w-8`); update
      `DesktopIcon.jsx` to import it; update `src/components/thispc/ItemIcon.jsx` to render it when
      `icon === 'pdf'` (mirroring `DesktopIcon.jsx`'s existing token), so any explorer tile can be
      styled as a PDF file.
      **Pass condition:** the Resume desktop icon still renders the PDF glyph via the shared
      component with no visual change; `verify` passes.

- [x] **P79** — Generalize `src/components/thispc/RootView.jsx` to accept `folders` and an optional
      `devices` prop instead of importing `quickAccess`/`drives` from `thisPcLocations.js` directly
      (when `devices` is omitted, the "Devices and drives" section doesn't render at all); update
      `src/components/ThisPCWindow.jsx` to pass `folders={quickAccess}` and `devices={drives}`
      explicitly.
      **Pass condition:** This PC's root view renders identically to before (Folders + Devices
      sections, search filtering both); `verify` passes.

- [x] **P80** — Rename `src/components/thispc/` to `src/components/explorer/`; extract the shared
      explorer engine (navigation history, ribbon config, sidebar, tile/context-menu wiring,
      search, empty-folder view) out of `ThisPCWindow.jsx` into
      `src/components/explorer/ExplorerWindow.jsx`, parameterized by `icon`/`title`/
      `defaultWidth`/`defaultHeight`/`rootLabel`/`quickAccess`/`pcDrives`/`folders`/`devices` (plus
      the existing `onClose`/`isMinimized`/`onMinimizeToggle`/`cascadeOffset`/`onOpenNewWindow`
      instance props); rewrite `ThisPCWindow.jsx` as a thin wrapper passing This PC's existing data
      into `ExplorerWindow`.
      **Pass condition:** This PC's full existing behavior (navigation, tile select/open/context
      menu, ribbon, search, multi-instance) is unchanged when driven through the new shared
      component; `verify` passes.

- [x] **P81** — Create `src/data/developerLabLocations.js` (`quickAccess`: Desktop/Downloads/
      Visitor Arts/Pictures; `pcDrives`: "C Drive"/"D Drive" reusing the existing drive icons;
      `folders`: Projects/Tech Stack/Resume with `icon: 'pdf'` on Resume; no `devices` list) and
      `src/components/DeveloperLabWindow.jsx` as a thin wrapper around `ExplorerWindow` (icon 🛠️,
      title "Developer Lab", `rootLabel: 'Developer Lab'`, no `devices` prop); wire the
      `developer-lab` icon in `src/components/Desktop.jsx` to open it (matching the `this-pc`
      branch's pattern, including `cascadeOffset`/`onOpenNewWindow`).
      **Pass condition:** double-clicking "Developer Lab" opens a real explorer window with Quick
      access (Desktop/Downloads/Visitor Arts/Pictures) and This PC (C Drive/D Drive) in the
      sidebar, a Folders grid (Projects/Tech Stack/Resume-as-PDF) with no Devices section;
      navigating into any tile shows the empty-folder placeholder; every other non-special icon
      still opens the generic placeholder `Window`; `verify` passes.

---

## PHASE 14 — SETTINGS APP

_Requested by Sonny on 2026-08-18, from screenshots of a reference Settings app (System,
Personalization, Contact, Privacy & security, plus his own "Get Support" in place of the
reference's Time & Date/About OS). Confirmed with Sonny: Dark/Light mode and accent color in
Personalization are a **selection UI only for now** — they remember/highlight a choice but do not
re-theme the rest of the already-built desktop shell (real re-theming is tracked in the Backlog
below, not done here); wallpaper selection uses a few CSS-gradient backgrounds Claude builds
(no real photo assets exist in this project yet) instead of the reference's photos; Brightness and
Volume get **real effect** (brightness dims the whole desktop via an overlay, Volume drives the
existing System Tray volume icon) via shared state, since Sonny plans to hook real audio/video into
it later; the Settings button is taskbar-only (no desktop icon), pinned alongside Music/Terminal/
Messaging using the `settings.jpg` asset he already dropped into `src/assets/icons/`. Contact reuses
`src/data/contactInfo.js` (one source of truth with the existing Contact Info app) rather than a
second parallel dataset; Privacy & security and Get Support use generic Sonny-branded text/wiring,
not the reference screenshot's real third-party info._

- [x] **P82** — Create `src/context/SystemSettingsContext.jsx` exporting `SystemSettingsProvider`
      and a `useSystemSettings()` hook (`brightness`, `volume`, `wallpaperId`, `themeMode`,
      `accentColor` + their setters, sensible defaults matching the current look); wrap
      `<Desktop />` with it in `src/App.jsx` alongside the existing providers. Create
      `src/data/wallpapers.js`: a few CSS-gradient wallpaper definitions
      (id/label/swatch/layers/baseColor), including a
      `cyber` entry that reproduces the desktop's current grid+glow look as the default.
      **Pass condition:** a component under the provider can read and set all five values; verify
      passes.

- [x] **P83** — Wire `src/components/Desktop.jsx` to `useSystemSettings()`: replace the hardcoded
      grid/glow background divs with the selected wallpaper's layers from `wallpapers.js`, and add a
      full-screen `pointer-events-none` dimming overlay driven by `brightness` (0% brightness = a
      fully opaque black overlay).
      **Pass condition:** temporarily setting `wallpaperId`/`brightness` (e.g. via a quick manual
      state change) visibly swaps the background and dims the desktop; every window still renders
      normally; `verify` passes.

- [x] **P84** — Wire `src/components/SystemTray.jsx` to `useSystemSettings()`'s `volume`: swap the
      static 🔊 for 🔇 at 0, 🔈 below 50, 🔊 otherwise.
      **Pass condition:** temporarily setting `volume` to 0/30/70 shows the expected icon; `verify`
      passes.

- [x] **P85** — Create `src/components/settings/SystemPage.jsx` (Brightness + Volume sliders bound
      to `useSystemSettings()`, each showing a live percentage) and
      `src/components/settings/PersonalizationPage.jsx` (a wallpaper grid from `wallpapers.js` with a
      checkmark on the selected tile calling `setWallpaperId`, a Dark/Light mode card selector, and
      accent-color swatches — both selection-only, calling `setThemeMode`/`setAccentColor` without
      re-theming anything else); create `src/components/SettingsApp.jsx`: a left sidebar
      (System/Personalization/Contact/Privacy & security/Get Support) plus a content area defaulting
      to System, rendering `SystemPage`/`PersonalizationPage` for those two tabs.
      **Pass condition:** standalone render shows the sidebar and System page by default; dragging
      Brightness dims the desktop and dragging Volume updates the tray icon once mounted under
      `Desktop`; switching to Personalization shows the wallpaper grid (clicking one changes the live
      background) and the mode/accent selectors (clicking highlights the pick); `verify` passes.

- [x] **P86** — Add a `role` field to `src/data/contactInfo.js` (e.g. a one-line title to pair with
      the existing generic name/location); create `src/components/settings/ContactPage.jsx` (an
      avatar-initial card with name/role/location + phone, plus the existing social-profiles grid,
      all sourced from `contactInfo.js`) and `src/components/settings/PrivacySecurityPage.jsx`
      (generic Privacy & Security / Terms of Use / Copyright / Data Collection blocks, rebranded for
      Sonny/SonnyOS — Data Collection should honestly describe what this app actually stores: Memory
      Wall notes and Visitor Arts submissions, session-only); wire both into `SettingsApp.jsx`.
      **Pass condition:** Contact shows the real (generic) contact fields/social links; Privacy &
      security shows the four text blocks; `verify` passes.

- [x] **P87** — Create `src/components/settings/GetSupportPage.jsx` (a short description + a
      "Contact Support via Email" button) accepting an `onOpenGmail` prop; wire it into
      `SettingsApp.jsx` and thread `onOpenGmail` from `src/components/Desktop.jsx`'s existing
      `handleIconOpen('gmail')` (same guest-gate → compose flow as the Gmail desktop icon).
      **Pass condition:** clicking the button opens the Gmail guest gate (or compose window directly
      if already gated this session), identical to opening Gmail from its desktop icon; `verify`
      passes.

- [x] **P88** — Add `settings` to `src/assets/icons/index.js`'s `iconImages` map (the `settings.jpg`
      Sonny already dropped in); add a real, wired Settings button to `Taskbar.jsx`'s pinned-apps
      group (distinct from the decorative Music/Terminal/Messaging buttons, which stay inert) via a
      new `onOpenSettings` prop; wire it in `Desktop.jsx` to open `SettingsApp` through the generic
      `Window` (icon ⚙️, no desktop icon — taskbar-only).
      **Pass condition:** clicking the taskbar's Settings button opens the real Settings app at a
      comfortable size; every other taskbar button and desktop icon is unaffected; `verify` passes.

---

## PHASE 14 ADDENDUM — SETTINGS ICONS

_Requested by Sonny on 2026-08-18, from screenshots of the reference Settings sidebar and its
Brightness/Volume rows: swap the emoji icons for clean line-art SVGs matching that style. No new
icon-library dependency (would violate CLAUDE.md §2) — hand-built inline SVGs, same pattern as the
existing `PdfGlyph.jsx`._

- [x] **P89** — Create `src/components/icons/{MonitorIcon,PaletteIcon,UserIcon,ShieldIcon,
SupportIcon,SunIcon,SpeakerIcon}.jsx` (stroke-based 24x24 SVGs, `className` prop); wire
      System/Personalization/Contact/Privacy & security/Get Support in `SettingsApp.jsx`'s `TABS`
      to their matching icon component, and Brightness/Volume in `SystemPage.jsx`'s `SliderRow` to
      `SunIcon`/`SpeakerIcon`, replacing the emoji.
      **Pass condition:** the Settings sidebar and System page show the new line icons in place of
      the old emoji, with no visual regression elsewhere; `verify` passes.

---

## PHASE 15 — DESKTOP REFRESH EFFECT

_Requested by Sonny on 2026-08-18: right-clicking the desktop and choosing "Refresh" (already an
inert item from P20) should visibly refresh the icons, matching a real Windows desktop._

- [x] **P90** — Wire the desktop context menu's "Refresh" item in `src/components/Desktop.jsx` to a
      `refreshToken` counter passed to every `DesktopIcon`; in `src/components/DesktopIcon.jsx`, add
      an opacity motion value that fades each icon out and back in (staggered by grid position) via
      `framer-motion`'s `animate()` whenever `refreshToken` changes.
      **Pass condition:** right-clicking the desktop and clicking Refresh visibly fades all icons out
      and back in with a slight stagger, without moving any dragged icon's position; `verify` passes.

---

## PHASE 16 — CONTEXT MENU POSITIONING BUG FIX

_Reported by Sonny on 2026-08-18: right-clicking a tile inside "This PC" showed the menu offset
outside the folder window, and dragging the window dragged the menu along with it. Root cause:
`Window.jsx` positions windows via `react-rnd`'s CSS `transform`, and any transformed ancestor
becomes the containing block for `position: fixed` descendants — so `ContextMenu.jsx`, rendered as
a child of `Window` (via `ExplorerWindow.jsx`'s tile menu), was positioned relative to the window
instead of the viewport. Confirmed `ContextMenu` is only nested inside a `Window` there (Desktop's
own icon/desktop menus aren't inside any transformed ancestor, so they were unaffected)._

- [x] **P91** — In `src/components/ContextMenu.jsx`, render the menu through a `createPortal` to
      `document.body` (escaping any transformed ancestor so `position: fixed` is viewport-relative
      again), and add a `window` `mousedown` listener that closes the menu when the mousedown
      target is outside the menu's own DOM node (so starting a window drag, which begins with a
      title-bar mousedown, dismisses any open menu instead of leaving it stranded).
      **Pass condition:** right-clicking a tile inside This PC/Developer Lab shows the menu right
      beside the clicked icon, inside the window's bounds; dragging the window's title bar while a
      menu is open closes it immediately instead of dragging it along; `verify` passes.

---

## PHASE 17 — LARGER DEFAULT WINDOW SIZES + ACCENT-COLORED WINDOW BORDERS

_Requested by Sonny on 2026-08-18. Moves the "Full live re-theming from Settings >
Personalization" backlog item partially up: only the window frame border now follows the selected
accent color (not the taskbar/icons/etc — those stay backlog per Sonny's original scope)._

- [x] **P92** — Set default window size to 1200×800 for Settings, This PC, Blog, Music Lab,
      Developer Lab, and Visitor Arts in `src/components/Desktop.jsx` (Settings/Visitor
      Arts/Blog/Music Lab branches), `src/components/ThisPCWindow.jsx`, and
      `src/components/DeveloperLabWindow.jsx`.
      **Pass condition:** opening each of those six apps shows a 1200×800 window; every other
      icon's window size is unchanged; `verify` passes.

- [x] **P93** — Extract `ACCENT_COLORS` out of `src/components/settings/PersonalizationPage.jsx`
      into `src/data/accentColors.js` (single source of truth); wire
      `src/components/Window.jsx` and `src/components/ResumeWindow.jsx` to read the selected
      `accentColor` from `useSystemSettings()` and use its hex as the window frame's border color,
      at the same 2px (`border-2`) thickness already used for the selected state in
      Personalization.
      **Pass condition:** every window opened from a desktop icon shows a 2px border in the
      currently selected accent color; picking a different accent color in Settings updates all
      open and newly opened windows; `verify` passes.

---

## PHASE 18 — WINDOW FOCUS ORDER, TASKBAR HOVER LABEL, BIGGER FOLDER ICONS

_Reported/requested by Sonny on 2026-08-18. Confirmed with Sonny: (1) clicking anywhere inside a
window (not just its title bar) raises it to front, and a taskbar click on an open-but-behind
window also raises it instead of minimizing it; (2) the taskbar hover "preview" is a small styled
tooltip bubble (icon + name), not a live or mock screenshot; (3) folder-content icons (Folders +
Devices and drives tiles) grow to match the existing desktop icon size — sidebar icons in
This PC/Developer Lab stay as-is._

- [x] **P94** — Give every open window a stacking order driven by its position in
      `src/components/Desktop.jsx`'s `openWindows` array (`zIndex: 20 + index`, so it's always
      bounded by the number of open windows, never able to grow past other overlays' z-index) plus
      a `bringToFront(instanceId)` helper that moves that entry to the end of the array; wire a new
      `onFocus` into the existing `shared` window-prop bundle, and replace the taskbar's
      `onWindowClick={toggleMinimize}` with a handler that raises an open-but-not-topmost window
      instead of minimizing it. Thread `zIndex`/`onFocus` through `src/components/Window.jsx`
      (inline `style` zIndex + `onMouseDownCapture` for focus-on-click-anywhere),
      `src/components/ResumeWindow.jsx` (same, since it has its own frame instead of using
      `Window`), and `src/components/explorer/ExplorerWindow.jsx` /
      `src/components/ThisPCWindow.jsx` / `src/components/DeveloperLabWindow.jsx` (pass-through).
      **Pass condition:** opening Developer Lab then This PC puts This PC on top (as today);
      clicking anywhere on the Developer Lab window (title bar or its content) brings it in front
      of This PC; clicking a behind-but-open window's taskbar icon raises it instead of minimizing
      it; `verify` passes.

- [x] **P95** — Replace the native `title` tooltip on `RunningAppButton` in
      `src/components/Taskbar.jsx` with a small CSS `group`-hover styled bubble (icon's label,
      dark bg, border, positioned above the icon).
      **Pass condition:** hovering a running app's taskbar icon shows the styled label bubble
      instead of the plain browser tooltip; `verify` passes.

- [x] **P96** — Increase the Folders and Devices-and-drives tile icon size in
      `src/components/explorer/RootView.jsx` from `h-6 w-6`/`text-xl`/`text-lg` to `h-8 w-8`/
      `text-2xl` (matching the existing desktop icon glyph size); leave the sidebar `Tile` icons in
      `src/components/explorer/ExplorerWindow.jsx` untouched.
      **Pass condition:** This PC/Developer Lab's Folders and Devices tiles show visibly bigger
      icons matching desktop-icon scale; the sidebar's Quick access/This PC icons are unchanged;
      `verify` passes.

---

## PHASE 19 — ICON FIX, TASKBAR OVERLAP GUARD, TASKBAR PREVIEW UPGRADE

_Reported by Sonny on 2026-08-18. He dropped a replacement `settings.png` into
`src/assets/icons/` but `src/assets/icons/index.js` still imported the old `settings.jpg`
(deleted), so the icon broke. He also wants windows unable to resize/drag over the taskbar, and
wants to revisit P95's taskbar hover treatment with something closer to a real live thumbnail —
pending his answer on approach (P99)._

- [x] **P97** — Fix `src/assets/icons/index.js`'s settings import to point at the actual
      `settings.png` file (was still importing the deleted `settings.jpg`).
      **Pass condition:** the Settings taskbar button and any open Settings window show the new
      icon instead of a broken image; `verify` passes.

- [x] **P98** — Constrain window drag/resize in `src/components/Desktop.jsx`: wrap the
      `openWindows` render in a `pointer-events-none` container sized to exclude the taskbar's 48px
      strip (`bottom-12`), re-enabling `pointer-events-auto` on the actual window elements in
      `src/components/Window.jsx` and `src/components/ResumeWindow.jsx`, so `react-rnd`'s
      `bounds="parent"` now excludes the taskbar for both dragging and resizing.
      **Pass condition:** dragging or resizing any window toward the bottom of the screen stops at
      the taskbar's top edge instead of covering it; clicking/selecting on the empty desktop still
      works exactly as before; `verify` passes.

- [x] **P99** — Sonny chose the live-mounted miniature preview. Extracted
      `src/components/explorer/ExplorerBody.jsx` out of `ExplorerWindow.jsx` and
      `src/components/ResumePage.jsx` out of `ResumeWindow.jsx` (pure refactors, so the real
      content is reusable standalone); added `src/components/TaskbarPreview.jsx` (a small clipped,
      scaled, non-interactive box); wired `src/components/Desktop.jsx` to compute a live preview
      node per open window (reusing the same content components — ContactInfoApp, GmailComposeApp,
      PaintApp, VisitorArtsApp, MemoryWallApp, SettingsApp, ExplorerBody, ResumePage) and pass it
      through to `src/components/Taskbar.jsx`'s `RunningAppButton`, which now mounts the preview
      only while actually hovered (not eagerly for every open window). Fixed two bugs caught by
      actually running the app: the preview's real buttons/inputs were nesting inside the
      taskbar's own `<button>` (invalid HTML) — restructured `RunningAppButton` to wrap the button
      and popup in a plain hover-tracking `<div>` instead; and the popup rendered behind open
      windows because `Taskbar` had no explicit `z-index` while windows now do (P94's 20+index) —
      gave the taskbar `z-40`, safely above any realistic open-window count and still below the
      z-50 modals/context-menu layer.
      **Pass condition:** hovering a running app's taskbar icon shows a small live-scaled preview
      of that app's actual current content, rendered in front of every open window, with no
      console errors; blog/music-lab/games/etc. (no standalone content component) fall back to the
      label-only bubble; `verify` passes.

---

## PHASE 20 — REAL WALLPAPER PHOTOS

_Requested by Sonny on 2026-08-18: he dropped real wallpaper photos into
`src/assets/wallpaper/` and asked to wire them into Settings > Personalization's Background
picker, superseding P82's note that "no real photo assets exist in this project yet". Independent
of the still-blocked P99._

- [x] **P100** — Add the 4 photos in `src/assets/wallpaper/` as new entries in
      `src/data/wallpapers.js` (image-backed `layers` using `background-size: cover`/
      `background-position: center`/`no-repeat`); update `src/components/Desktop.jsx`'s wallpaper
      layer rendering to apply `backgroundPosition`/`backgroundRepeat` from each layer (gradient
      layers are unaffected since they don't set those fields); update the swatch thumbnail button
      in `src/components/settings/PersonalizationPage.jsx` to size/center image swatches the same
      way.
      **Pass condition:** Settings > Personalization's Background grid shows 4 new real-photo
      tiles alongside the existing gradients; clicking one sets it as the live desktop background,
      correctly cropped/centered; `verify` passes.

---

## PHASE 21 — PERSIST SELECTED WALLPAPER

_Requested by Sonny on 2026-08-18: the selected background should survive a page reload instead
of resetting to the default every time._

- [x] **P101** — In `src/context/SystemSettingsContext.jsx`, initialize `wallpaperId` from
      `localStorage` (fallback to `'cyber'` if unset) and add a `useEffect` that writes it back to
      `localStorage` on every change.
      **Pass condition:** picking a wallpaper in Settings > Personalization, then reloading the
      page, shows the same wallpaper still applied; `verify` passes.

---

## PHASE 22 — WINDOW OPEN/CLOSE FADE + HOVER PREVIEW FADE

_Requested by Sonny on 2026-08-18: opening/closing/minimizing/restoring any window (from a desktop
icon or the taskbar) should fade instead of popping instantly, and the P99 taskbar hover preview
should fade in/out too instead of appearing/disappearing abruptly._

- [x] **P102** — In `src/components/Desktop.jsx`, `closeApp` now marks the window `isClosing`
      before actually removing it from `openWindows` after a 180ms delay (`CLOSE_ANIMATION_MS`),
      threaded into the existing `shared` window-prop bundle. In `src/components/Window.jsx` and
      `src/components/ResumeWindow.jsx`, the outer frame becomes a `framer-motion` `motion.div`
      (opacity 0→1 on mount/restore, animated to 0 while `isMinimized || isClosing`) driven by a
      single effect that always defers its `setShouldRender` call inside a `setTimeout` (0ms to
      show immediately, the fade duration to hide) — needed to satisfy this project's stricter
      `react-hooks` lint rules against synchronous `setState` calls in an effect body and against
      reading/writing `ref.current` during render. In `src/components/TaskbarPreview.jsx`, the
      popup becomes a `motion.div` with `initial`/`animate`/`exit` opacity, wrapped in
      `AnimatePresence` in `src/components/Taskbar.jsx` so the exit transition actually plays
      before the popup unmounts.
      **Pass condition:** opening, closing, minimizing, and restoring any window visibly fades
      instead of popping; hovering on/off a taskbar running-app icon fades its preview in and out;
      `verify` passes.

---

## PHASE 23 — MUSIC LAB APP (VIDEO/MUSIC PLAYER)

_Requested by Sonny on 2026-08-18, from a Spotify-style reference screenshot: Music Lab becomes a
real player instead of the generic placeholder `Window`. Confirmed with Sonny: the real video file
he dropped in at `src/assets/music-lab/sonny-drive-incubus.mp4` is the one real Video library
entry; Music entries stay visual-only placeholders (waveform + cosmetic transport controls, no
real audio) until he provides an actual audio file — same "placeholder until asset provided"
pattern already used for Resume/wallpaper. The sidebar's "Your Library" gets a Music/Video toggle
that swaps which list renders below it (not a single mixed list). The screenshot's artist-bio hero
("Pouya Shahri", photo, Follow, About) is replaced: no real photo of Sonny (matching the existing
initials-avatar convention from `ContactPage.jsx`), and the About card holds a short original
article about an interest in music instead of an artist bio — generic placeholder-style copy Sonny
can swap for his own words later, same as `contactInfo.js`. Selecting the Video entry plays it
inline (native `<video>`, real audio via the video's own track); selecting a Music entry drives the
same bottom transport bar and an animated waveform, but only cosmetically (a timer advances the
seek position, no sound)._

- [x] **P103** — Create `src/data/musicLabLibrary.js`: import the real video asset and export
      `videos` (one entry: id/title/subtitle/src), `tracks` (3–4 placeholder music entries:
      id/title/artist/duration in seconds), and `aboutArticle` (an array of short original
      paragraph strings about an interest in music, generic placeholder copy).
      **Pass condition:** importing the file exposes well-formed `videos`/`tracks`/`aboutArticle`;
      `verify` passes.

- [x] **P104** — Create `src/components/musicLab/MusicLabSidebar.jsx`: a Home nav row, "Your
      Library" heading, a Music/Video toggle button pair, and a list of entries for whichever type
      is toggled active (title + subtitle), highlighting the currently selected item; calls
      `onSelectType(type)`/`onSelectItem(item)` props.
      **Pass condition:** standalone render shows Home + toggle + list; clicking the toggle swaps
      which list renders; clicking an item highlights it and fires the callback; `verify` passes.

- [x] **P105** — Create `src/components/musicLab/MusicWave.jsx`: a small row of CSS bars animated
      via framer-motion when an `isPlaying` prop is true (flat/still when false).
      **Pass condition:** standalone render with `isPlaying={true}` shows animating bars,
      `isPlaying={false}` shows static bars; `verify` passes.

- [x] **P106** — Create `src/components/musicLab/MusicLabScreen.jsx`: the hero area — a real
      `<video>` element (native controls) when `activeType === 'video'`, `MusicWave` when
      `activeType === 'music'`, and an initials-avatar idle state (matching `ContactPage.jsx`'s
      gradient-circle pattern) when nothing is selected; a title/subtitle line for the active item;
      a circular Play/Pause button and a Shuffle button.
      **Pass condition:** standalone render with a video item active shows a working `<video>`;
      with a music item active shows the waveform; with nothing active shows the idle avatar state;
      `verify` passes.

- [x] **P107** — Create `src/components/musicLab/MusicLabAbout.jsx`: an "About" card rendering the
      `aboutArticle` paragraphs from `musicLabLibrary.js`.
      **Pass condition:** standalone render shows the About heading and article paragraphs;
      `verify` passes.

- [x] **P108** — Create `src/components/musicLab/MusicLabPlayerBar.jsx`: the bottom persistent
      transport bar — now-playing thumbnail/title, shuffle/prev/play-pause/next/repeat buttons, a
      seek range input with elapsed/total time labels, a volume slider, and a close button — fully
      controlled via props, no local state.
      **Pass condition:** standalone render shows all controls and each fires its corresponding
      `on*` prop with the right value when used; `verify` passes.

- [x] **P109** — Create `src/components/MusicLabApp.jsx`: composes `MusicLabSidebar` +
      `MusicLabScreen` + `MusicLabAbout` + `MusicLabPlayerBar`; owns `activeType`/`activeItem`/
      `isPlaying` state and a real `<video>` ref wired to the player bar's transport controls
      (play/pause/seek/volume/time updates via `onTimeUpdate`/`onLoadedMetadata`) when a video item
      is active.
      **Pass condition:** standalone render lets you pick the video entry from the sidebar and
      play/pause/seek it via the bottom bar; `verify` passes.

- [x] **P110** — Extend `MusicLabApp.jsx`: when a music entry is active, simulate cosmetic playback
      (an interval advances `currentTime` up to the track's fixed `duration` while `isPlaying`, no
      real audio, cleared on unmount/pause/track change) so the same player bar and waveform
      respond identically to music selections.
      **Pass condition:** selecting a music entry and pressing Play animates the waveform and
      advances the seek bar/time display with no real audio; pausing stops the advance; `verify`
      passes.

- [x] **P111** — Wire the `music-lab` icon in `src/components/Desktop.jsx` to open `MusicLabApp`
      (via the existing generic `Window`, default size 1200×800) instead of the placeholder branch
      — remove `music-lab` from the `isLargePlaceholder` list and give it its own explicit size
      branch (matching the `visitor-arts`/`settings` pattern).
      **Pass condition:** double-clicking "Music Lab" opens the real app at 1200×800; every other
      non-special icon still opens the generic placeholder `Window`; `verify` passes.

---

## PHASE 24 — MUSIC LAB ICON POLISH

_Requested by Sonny on 2026-08-18, from close-up screenshots of the reference player's Play
button, transport bar, and sidebar Home/Library rows: swap the emoji controls in Music Lab for
real vector icons matching that look — a vivid-green filled Play/Pause circle in the hero, clean
line/filled icons in the transport bar (shuffle, previous, play-pause, next, repeat, a
cast/connect icon, volume, close), and line icons for Home/Your Library in the sidebar. Same
hand-built inline-SVG pattern already used in `src/components/icons/` (P89) — no new icon-library
dependency._

- [x] **P112** — Create `src/components/icons/{HomeIcon,LibraryIcon,ShuffleIcon,RepeatIcon,
PlayIcon,PauseIcon,PreviousIcon,NextIcon,CastIcon,CloseIcon}.jsx` (24x24, `className` prop,
      matching the existing icon-file convention — Play/Pause/Previous/Next filled, the rest
      stroke-based line icons).
      **Pass condition:** each renders a recognizable icon at its default size with no visual
      regression to existing icons; `verify` passes.

- [x] **P113** — Wire the new icons into Music Lab: `MusicLabSidebar.jsx` (Home/Library icons
      replace 🏠/📚), `MusicLabScreen.jsx` (the hero Play/Pause button becomes a larger vivid-green
      filled circle with a black `PlayIcon`/`PauseIcon`), and `MusicLabPlayerBar.jsx` (Shuffle/
      Previous/Play-Pause/Next/Repeat/Close become real icons, plus a decorative `CastIcon` next to
      the existing `SpeakerIcon`-style volume control), reusing the existing green-tint-when-active
      styling for Shuffle/Repeat.
      **Pass condition:** Music Lab's hero Play button and transport bar show clean vector icons
      matching the reference screenshots, with all existing click behavior unchanged; `verify`
      passes.

---

## PHASE 25 — MUSIC LAB PER-ITEM CONTENT FOLDERS

_Requested by Sonny on 2026-08-18: instead of hardcoding library entries in
`musicLabLibrary.js`, give each video/track its own folder he can drop files into — the media
file, an optional thumbnail, and a plain-text "notepad" for Title/Album. No backend exists (CLAUDE.md
§2), so this is resolved entirely at build time via Vite's `import.meta.glob`, not a runtime file
read. Convention: `src/assets/music-lab/videos/<slug>/` and `.../tracks/<slug>/`, each holding
`media.<ext>` (required for videos, optional for tracks — a track with no media yet keeps the
existing cosmetic waveform-only playback), `thumbnail.<ext>` (optional, falls back to the existing
emoji tile), and `notes.txt` (`Title: ...` / `Album: ...` lines, plus `Duration: m:ss` for a
track with no media yet, since the cosmetic simulation needs an end point). A track that gets a
real `media.*` file automatically switches to real `<audio>` playback, the same way video already
works — no code change needed at that point._

- [x] **P114** — Migrate existing content into the new folder convention: move
      `src/assets/music-lab/sonny-drive-incubus.mp4` to
      `src/assets/music-lab/videos/late-night-drive/media.mp4` with a `notes.txt` (Title: Late
      Night Drive / Album: Incubus); convert the 3 placeholder tracks into
      `src/assets/music-lab/tracks/{focus-mode,late-night-code,coffee-and-commits}/notes.txt`
      (Title/Album/Duration, no media file yet).
      **Pass condition:** the folder tree matches the convention above with real file content;
      `verify` passes (no code references the old flat path yet, so build still succeeds).

- [x] **P115** — Create `src/utils/loadMusicLabLibrary.js`: use `import.meta.glob` (eager, `?url`
      for media/thumbnail, `?raw` for notes.txt) over `../assets/music-lab/videos/*/*` and
      `.../tracks/*/*`, parse each folder's `notes.txt` into `{title, album, duration}`, and export
      `videos`/`tracks` arrays of `{id (folder slug), title, album, duration, mediaSrc,
thumbnailSrc}`, sorted by slug.
      **Pass condition:** importing the file exposes `videos`/`tracks` built from the real folders
      created in P114, with correct titles/albums parsed from their `notes.txt`; `verify` passes.

- [x] **P116** — Update `src/data/musicLabLibrary.js` to re-export `videos`/`tracks` from
      `loadMusicLabLibrary.js` (removing the old hardcoded arrays and the direct video import),
      keeping `aboutArticle` as-is.
      **Pass condition:** `musicLabLibrary.js` no longer hardcodes library entries; `verify`
      passes.

- [x] **P117** — Update `MusicLabSidebar.jsx` and `MusicLabPlayerBar.jsx` to show `item.thumbnailSrc`
      as an `<img>` when present (falling back to the existing emoji tile otherwise), and switch
      every `item.subtitle ?? item.artist` reference to the new unified `item.album` field
      (`MusicLabScreen.jsx` too).
      **Pass condition:** an item with a `thumbnail.*` file shows the real image in the sidebar and
      the now-playing bar; one without still shows the emoji tile; album text displays correctly;
      `verify` passes.

- [x] **P118** — Extend `MusicLabApp.jsx`/`MusicLabScreen.jsx`: when the active music item has a
      real `mediaSrc`, play it through a real (visually hidden) `<audio>` element using the same
      play/pause/seek/volume/time-update wiring already used for video, instead of the cosmetic
      timer; tracks with no `mediaSrc` keep the existing cosmetic simulation, seeded from the
      `notes.txt`-provided `duration`.
      **Pass condition:** a track folder with a real `media.*` file plays real audio via the
      transport bar exactly like video does; a track with no media file still uses the cosmetic
      waveform simulation; `verify` passes.

---

## PHASE 26 — TECH STACK ICON + EXPLORER ICON-SIZE FIX

_Requested by Sonny on 2026-08-18: add a new empty "Tech Stack" desktop icon using the
`tech-stack.png` he dropped into `src/assets/icons/`, use that same logo for the existing (until
now emoji-only) "Tech Stack" folder inside Developer Lab, and fix the Developer Lab/This PC folder
tile icons to match Desktop icon sizing. Root cause of the size mismatch: `ItemIcon.jsx`'s
emoji-fallback branch rendered a bare `<span>` with no fixed box, while its image/PDF branches (and
`DesktopIcon.jsx`) always sit inside a centered `h-8 w-8` box — so any folder tile without a real
image (Projects, and Tech Stack before this phase) rendered visibly smaller/off-center than
image-backed tiles, not actually a stale P96 size value._

- [x] **P119** — Add `tech-stack` to `src/assets/icons/index.js`'s `iconImages` map; add a new
      `{ id: 'tech-stack', label: 'Tech Stack', column: 2, icon: '🧰' }` entry to
      `src/data/desktopIcons.js`; add `id: 'tech-stack'` to the "Tech Stack" entry in
      `src/data/developerLabLocations.js`'s `folders`; wrap `ItemIcon.jsx`'s emoji-fallback branch
      in the same centered `imgClassName` box used by its image/PDF branches.
      **Pass condition:** a new "Tech Stack" desktop icon shows the real logo and opens the generic
      empty placeholder `Window`; Developer Lab's Tech Stack folder tile shows the same logo at the
      same visual size as Projects/Resume and the This PC/Desktop icons; `verify` passes.

---

## PHASE 27 — ZOOM CHAT ICON

_Requested by Sonny on 2026-08-18: add a new empty "Zoom Chat" desktop icon using the Zoom logo he
dropped into `src/assets/icons/` (renamed from `Zoom Chat.png` to `zoom-chat.png` to match this
project's kebab-case icon-file convention)._

- [x] **P120** — Add `zoom-chat` to `src/assets/icons/index.js`'s `iconImages` map; add a new
      `{ id: 'zoom-chat', label: 'Zoom Chat', column: 2, icon: '📹' }` entry to
      `src/data/desktopIcons.js`.
      **Pass condition:** a new "Zoom Chat" desktop icon shows the real Zoom logo and opens the
      generic empty placeholder `Window`; `verify` passes.

---

## PHASE 28 — ZOOM CHAT VIRTUAL AGENT

_Requested by Sonny on 2026-08-18, from a screenshot of a Zoom "Virtual Agent" chat widget: the
`zoom-chat` desktop icon (added Phase 27) becomes a real FAQ chat assistant. Confirmed with Sonny:
the bot avatar uses `zoom-avatar.png` (a robot-in-a-speech-bubble graphic, not a real person photo,
matching this project's existing no-real-photo convention), while the desktop icon/window chrome
keeps the plain `zoom-chat.png` camera logo; the conversation logic is a full port of the FAQ
system Sonny already built for another project (`D:\Projects\Website Portfolio\src\utils\
chat*.js`) — keyword-matched FAQ replies, small-talk auto-replies, and a multiple-choice follow-up
question after each FAQ match — adapted to be pure client-side data/logic with no backend (that
source project's Firebase transcript-saving/speech-recognition/3D-robot-mascot pieces are out of
scope, since this project has no backend and no approved icon-library/3D dependency); "Join a
meeting" is the entry gate into the chat, not a real video call (no meeting backend in v1); no
name/email = no chat, with an explicit restriction message; a 2-second loading screen (matching
the chat header's blue-purple-pink gradient) plays before the chat window appears. The footer
disclaimer is reworded from Zoom's real "may retain transcripts" legal text to something honest
about this being a demo with no real storage, matching the project's established
say-what-actually-happens convention (already used for the Settings Privacy page's Data
Collection text)._

- [x] **P121** — Create `src/data/zoomChatKnowledgeBase.js`: port the 8 FAQ categories (pricing,
      timeline, tech, services, process, availability, contact, portfolio — keywords + response
      text) from the source project's `chatKnowledgeBase.js`, adapted for this portfolio's tone;
      plus `FALLBACK_RESPONSE`, `SUGGESTED_QUESTIONS`, `NAME_PROMPT`, `getEmailPrompt()`,
      `FOLLOW_UPS` (per-category multiple-choice follow-up question + options), and
      `AUTO_REPLY_PATTERNS` (thanks/affirmation/farewell small talk). One cohesive knowledge-base
      data file, not split — same "don't fragment one cohesive unit" call already logged in
      LESSONS.md for `PaintToolbar.jsx`.
      **Pass condition:** importing the file exposes all of the above, well-formed; `verify`
      passes.

- [x] **P122** — Create `src/utils/zoomChatBot.js`: `matchQuestion`/`getBotReply` (keyword-scoring
      FAQ match against `zoomChatKnowledgeBase.js`, ported from the source project's `chatBot.js`),
      `getAutoReply` (small-talk keyword match), `getFollowUp` (category → follow-up question/
      options lookup), and `getTimeBasedGreeting` (random per-time-of-day greeting); add
      `zoomChatBot.test.js` covering one FAQ-match case and one no-match/fallback case.
      **Pass condition:** `npm run test` shows the new cases passing; `verify` passes.

- [x] **P123** — Create `src/components/zoomChat/ZoomChatMessage.jsx`: one message bubble (bot
      avatar uses `zoom-avatar.png`, guest bubble right-aligned), a timestamp, a suggestions row
      (pill buttons), a CTA pill button, a multiple-choice options row, and a special "Join a
      meeting" pill button variant for the initial gate message.
      **Pass condition:** standalone render of each message variant (bot/guest/suggestions/CTA/
      multiple-choice/join-meeting) shows the right content and fires its callback; `verify`
      passes.

- [x] **P124** — Create `src/components/zoomChat/ZoomChatHeader.jsx`: the blue-purple-pink gradient
      header bar with the `zoom-avatar.png` avatar in a circular slot, bold "SONNY" + "Virtual Agent"
      title text, a decorative "..." menu button, and a working close (X) button.
      **Pass condition:** standalone render shows the gradient header with avatar/title/buttons;
      clicking close fires its callback; `verify` passes.

- [x] **P125** — Create `src/components/zoomChat/ZoomChatLoading.jsx`: a full-bleed loading screen
      using the same gradient as the header, with a simple spinner.
      **Pass condition:** standalone render shows the gradient background and a spinning loader;
      `verify` passes.

- [x] **P126** — Create `src/components/ZoomChatApp.jsx` (part 1 — gate/name/email phases): a
      `phase` state machine (`loading` → 2s timeout → `gate` → `name` → `email` → `active`);
      renders `ZoomChatLoading` during `loading`, then `ZoomChatHeader` + a scrollable message list + an input bar; the `gate` phase shows the Join-a-meeting message and advances to `name` on
      click; `name`/`email` phases append the guest's message, validate (non-empty name; non-empty + regex-valid email) with a restriction message on failure, and advance the phase on success.
      **Pass condition:** opening the app shows the 2s loading screen then the gate message;
      clicking Join asks for a name; submitting an empty name shows a restriction message and stays
      on the name phase; a valid name then a valid email reaches the `active` phase; `verify`
      passes.

- [x] **P127** — Extend `ZoomChatApp.jsx` (part 2 — active FAQ phase): on reaching `active`, append
      a time-based greeting with `SUGGESTED_QUESTIONS`; wire free-text input through
      `getAutoReply` → pending multiple-choice follow-up → `getBotReply` (FAQ match, appending its
      category's follow-up question from `getFollowUp` after a short typing-indicator delay) →
      fallback (with a "contact Sonny directly" CTA after 2 consecutive unmatched questions); CTA
      clicks call a new `onOpenGmail` prop.
      **Pass condition:** asking a pricing-style question returns the pricing FAQ answer plus its
      follow-up multiple-choice question; two unmatched questions in a row show the "contact Sonny
      directly" CTA; clicking a CTA calls `onOpenGmail`; `verify` passes.

- [x] **P128** — Wire the `zoom-chat` icon in `src/components/Desktop.jsx` to open `ZoomChatApp`
      (via the existing generic `Window`, sized ~400×600 to match the reference widget's
      proportions) instead of the placeholder branch, passing
      `onOpenGmail={() => handleIconOpen('gmail')}`; add it to `WINDOW_PREVIEW_SIZES`/
      `renderPreviewBody` for a live taskbar preview, matching every other real app.
      **Pass condition:** double-clicking "Zoom Chat" plays the loading screen then opens the real
      chat widget; every other non-special icon still opens the generic placeholder `Window`;
      `verify` passes.

---

## PHASE 29 — MOUSE CURSOR PERSONALIZATION

- [x] **P129** — In `src/context/SystemSettingsContext.jsx`, add a `cursorStyle` state (default
      `'default'`) persisted to `localStorage` the same way `wallpaperId` is. Create
      `src/data/cursorStyles.js` exporting a small list of styles (`default`, `precision`,
      `accent`) with a `label`. Create `src/utils/getCursorValue.js`: a pure helper
      `getCursorValue(styleId, accentHex)` returning a CSS `cursor` value — `'auto'` for
      `default`, a small black-arrow inline-SVG data URI for `precision`, and the same arrow
      tinted with `accentHex` for `accent`. In `src/components/Desktop.jsx`, apply
      `getCursorValue(cursorStyle, accentHex)` to the desktop root's inline `style.cursor`.
      **Pass condition:** switching `cursorStyle` changes the cursor shown over the desktop;
      reloading the page keeps the last chosen style; `verify` passes.

- [x] **P130** — Add a "Mouse cursor" section to `src/components/settings/PersonalizationPage.jsx`
      (below Colors), rendering one button per `cursorStyles` entry (label + a small preview using
      `getCursorValue`), wired to `setCursorStyle`, with the active one highlighted like the
      existing wallpaper/accent pickers.
      **Pass condition:** clicking a cursor option highlights it and the desktop cursor visibly
      changes; `verify` passes.

---

## PHASE 30 — GET SUPPORT: ZOOM CHAT BUTTON

- [x] **P131** — In `src/components/settings/GetSupportPage.jsx`, replace the emoji Gmail button
      with one using the real `gmail` icon from `src/assets/icons/index.js`, and add a second
      button using the `zoom-chat` icon that calls a new `onOpenZoomChat` prop. Thread
      `onOpenZoomChat` through `src/components/SettingsApp.jsx` and wire it in
      `src/components/Desktop.jsx` (`onOpenZoomChat={() => handleIconOpen('zoom-chat')}`) at both
      the real Settings window and the taskbar-preview stub.
      **Pass condition:** Get Support shows an Email button and a Zoom Chat button, each showing
      its real icon; clicking Zoom Chat opens the Zoom Chat window; `verify` passes.

---

## PHASE 31 — DEVELOPER LAB: PROJECTS FOLDER + COMPILATION APP

_Requested by Sonny on 2026-08-19: Developer Lab's existing "Projects" folder (Phase 13) becomes
a real browsable folder holding 7 named project subfolders (Onboarding App, Dental Clinic System,
Expense Tracker Mobile App, Restaurant POS System, Jira Dashboard, SOP Site, AI Automations) plus
an 8th tile, also named "Projects", that is not a normal folder — double-clicking it opens a
compilation app: a searchable left project list + a right detail panel (header, thumbnail, title,
description, tech stack, GitHub link) built from those project folders' content. Confirmed with
Sonny: (1) the "Projects" tile inside the Projects folder is the one that opens the compilation
screen (not the top-level Projects folder tile itself, which stays a normal browsable folder so
more project folders can be dropped in later); (2) include a search box in the compilation app;
(3) each project's notepad carries Title / Description / Tech Stack / GitHub Link. Mirrors the
per-item asset-folder convention already used for Music Lab (Phase 25) — resolved at build time
via `import.meta.glob`, no backend. Sonny will drop in real photos/notes over time; folders start
with placeholder notes and no photo (falls back to the existing folder-icon convention). The
shared explorer engine (Phase 13) currently has no concept of a folder with real nested content —
every non-root location renders the same generic `EmptyFolderView` — so this phase first extends
that engine generically (any folder can carry `children`, any tile can be an `app` tile), then
builds Developer Lab's Projects content as config/data on top of it, leaving This PC and every
other existing folder unchanged._

- [x] **P132** — Extend `src/components/explorer/RootView.jsx` (tile open/context-menu callbacks
      now receive the whole tile object, not just its label) and
      `src/components/explorer/ExplorerBody.jsx` (a unified `openItem(item)` used by both the
      root-level tiles and the tile-context-menu's "Open" action: an item with `kind: 'app'` pushes
      an `{ type: 'app', label, appId }` location, everything else pushes `{ type: 'location',
label, children: item.children }`; the content switch renders `RootView` again — reusing it,
      not duplicating it — for a location carrying `children`, a new optional `renderApp(appId)`
      prop for `type === 'app'` locations, and `EmptyFolderView` otherwise as before; the search box
      is enabled whenever the current location has real tiles to filter, i.e. root or a
      children-bearing folder). Thread the new `renderApp` prop through
      `src/components/explorer/ExplorerWindow.jsx` (defaulting to a no-op).
      **Pass condition:** This PC and every existing Developer Lab folder (Tech Stack, Resume)
      still show "This folder is empty" exactly as before; `verify` passes.

- [x] **P133** — In `src/data/developerLabLocations.js`, give the "Projects" folder entry a
      `children` array: 7 folder tiles (Onboarding App, Dental Clinic System, Expense Tracker
      Mobile App, Restaurant POS System, Jira Dashboard, SOP Site, AI Automations) plus an 8th tile
      also labeled "Projects" (distinct icon, e.g. 🗃️) with `kind: 'app'`,
      `appId: 'projects-compilation'`.
      **Pass condition:** navigating Developer Lab > Projects shows all 8 tiles in a folder grid;
      double-clicking any of the first 7 shows the standard empty-folder placeholder; `verify`
      passes.

- [x] **P134** — Create `src/assets/developer-lab/projects/<slug>/notes.txt` for each of the 7
      projects (slugs: `onboarding-app`, `dental-clinic-system`, `expense-tracker-mobile-app`,
      `restaurant-pos-system`, `jira-dashboard`, `sop-site`, `ai-automations`), each with
      placeholder `Title:` / `Description:` / `Tech Stack:` / `GitHub Link:` lines (Title matching
      the project name, Description a short "details coming soon"-style placeholder, Tech Stack
      and GitHub Link blank) — no `photo.*` yet.
      **Pass condition:** the folder tree matches the convention above with real placeholder
      content in all 7; `verify` passes (nothing references them yet, so the build is unaffected).

- [x] **P135** — Create `src/utils/loadProjectsLibrary.js`: `import.meta.glob` (eager, `?raw`) over
      `../assets/developer-lab/projects/*/notes.txt` plus (eager, `?url`) `.../*/photo.*`, parse
      each folder's notes into `{title, description, techStack, githubLink}` (Tech Stack split on
      commas into an array), and export a `projects` array of `{id (slug), title, description,
techStack, githubLink, photoSrc}` sorted by slug; create `src/data/projectsLibrary.js`
      re-exporting `projects` from it (one source of truth, mirrors `musicLabLibrary.js`).
      **Pass condition:** importing `projectsLibrary.js` exposes a well-formed `projects` array
      built from the 7 real folders created in P134, with correctly parsed fields; `verify` passes.

- [x] **P136** — Create `src/components/projects/ProjectsList.jsx`: a search input (filters by
      title) above a list of entries from `projectsLibrary.js` (thumbnail-or-folder-icon fallback +
      title), highlighting the currently selected entry, calling an `onSelect(id)` prop.
      **Pass condition:** standalone render shows the search box and all 7 projects; typing narrows
      the list by title; clicking an entry highlights it and fires `onSelect`; `verify` passes.

- [x] **P137** — Create `src/components/projects/ProjectDetail.jsx`: renders the selected project's
      header/title, thumbnail-or-fallback, description, tech-stack chips (one per `techStack`
      entry), and a GitHub link button (hidden when `githubLink` is blank); shows a "Select a
      project" empty state when nothing is selected.
      **Pass condition:** standalone render with a sample project shows every field; rendering with
      no project shows the empty-state message; `verify` passes.

- [x] **P138** — Create `src/components/ProjectsApp.jsx`: composes `ProjectsList` + `ProjectDetail`,
      owning `selectedId`/search state, defaulting to the first project in `projectsLibrary.js`
      selected.
      **Pass condition:** standalone render shows the first project's detail by default; clicking a
      different project in the list swaps the detail panel; `verify` passes.

- [x] **P139** — Wire `ProjectsApp` in `src/components/DeveloperLabWindow.jsx`: pass
      `renderApp={(appId) => appId === 'projects-compilation' ? <ProjectsApp /> : null}` through to
      `ExplorerWindow` (from P132).
      **Pass condition:** inside Developer Lab, navigating into Projects then double-clicking the
      "Projects" tile opens the compilation screen with the searchable list and detail panel; every
      other tile/app is unaffected; `verify` passes.

- [x] **P140** — Fix a layout bug caught while checking real photo dimensions for the compilation
      app: `src/components/projects/ProjectDetail.jsx`'s root had no `flex-1`, so inside
      `ProjectsApp.jsx`'s flex row it was shrinking to content width (~218px) instead of filling the
      remaining window space, leaving ~580px of dead space at the default 1200×800 Developer Lab
      size. Add `flex-1` to both the empty-state and populated-state root divs.
      **Pass condition:** the detail panel's hero image/placeholder box now spans the full
      remaining width beside the project list at the default window size; `verify` passes.

---

## PHASE 32 — PROJECTS APP REDESIGN (STANDALONE WINDOW, CATEGORIES, HERO + MORE-PROJECTS)

_Requested by Sonny on 2026-08-19 from a reference screenshot of "Sonny Projects" — supersedes
Phase 31's P132/P133/P139 compilation-app wiring, which embedded the app inline inside Developer
Lab's explorer pane. Confirmed with Sonny: (1) "Projects" opens as its own standalone top-level
window (title "Projects", own taskbar running-icon, minimize/maximize/close — matching
Settings/Gmail's pattern), triggered by double-clicking the "Projects" tile inside Developer Lab >
Projects (the 7 real project subfolders + folder browsing from Phase 31 are unchanged); (2) real
categories, Sonny's own 7 names: Software Dev, Mobile Apps, AI & Smart System, Website and Portal,
Atlassian & Workplace System, Workflow Automation, IT & Systems Administration — Sonny asked for a
1:1 project→category mapping without dictating which project goes where beyond "use these
categories," so Claude assigned one per project by best semantic fit (flagged here for Sonny to
correct): Onboarding App → Workflow Automation, Dental Clinic System → Software Dev, Expense
Tracker Mobile App → Mobile Apps, Restaurant POS System → IT & Systems Administration, Jira
Dashboard → Atlassian & Workplace System, SOP Site → Website and Portal, AI Automations → AI &
Smart System; (3) each project's notepad becomes Title / Description / Tech Stack / Category /
Project Link (renamed from "GitHub Link" — broader than just GitHub), with Description now a
multi-line field (everything until the next recognized label) so Sonny can paste a richer
write-up like the reference's Core Purpose/Key Features-style copy instead of one sentence; (4)
the header copy ("OFFICIAL PROJECTS" eyebrow / "SONNY PROJECTS" title / the AI-integration
description paragraph) is used as-is from the reference; (5) clicking any project card promotes
it to the hero slot at top (confirmed). One deviation from the reference, flagged: the
reference's hero image has its project name baked into the photo itself as a designed graphic, so
the hero area shows no separate text — since Sonny's real project photos won't reliably have text
baked in, Claude's hero also shows the selected project's title/tech-stack chips/Project Link
button beneath the image (Claude's call, easy to remove later if unwanted). The left sidebar's
Categories are an accordion (selecting one expands its project titles inline and collapses the
others) with live counts; the search box filters across every category regardless of which is
expanded. Old `ProjectsList.jsx`/`ProjectDetail.jsx` are deleted, replaced by the category
sidebar + hero + more-projects list below._

- [x] **P141** — Recreate the 7 project notepads at
      `src/assets/developer-lab/projects/<slug>/notes.txt` with the new field set — `Title:` /
      `Description:` (placeholder "Details coming soon.") / `Tech Stack:` (blank) / `Category:`
      (per the mapping above) / `Project Link:` (blank, replacing `GitHub Link:`).
      **Pass condition:** all 7 notepads have the 5 new fields with the correct category assigned
      to each; `verify` passes (nothing parses `Category`/`Project Link` yet, so the build is
      unaffected).

- [x] **P142** — Update `src/utils/loadProjectsLibrary.js`: parse `Description` as a multi-line
      value (everything up to the next recognized `Title|Description|Tech Stack|Category|Project
Link:` label, not just its own line), add `category` and rename `githubLink` → `projectLink`
      in the exported `projects` shape.
      **Pass condition:** importing `projectsLibrary.js` exposes `category`/`projectLink` per
      project, correctly parsed from the 7 real notepads; `verify` passes.

- [x] **P143** — Simplify the explorer engine's app-tile handling back down: in
      `src/components/explorer/ExplorerBody.jsx`, `openItem(item)` now calls a new `onOpenApp(item.appId)`
      prop directly for `kind: 'app'` tiles instead of pushing a `{ type: 'app' }` location; remove
      the now-unused `type === 'app'`/`renderApp` content-switch branch (back to the simple
      root/children/empty three-way from before P132's app support). Thread `onOpenApp` through
      `src/components/explorer/ExplorerWindow.jsx` in place of `renderApp`.
      **Pass condition:** double-clicking the "Projects" tile no longer navigates anywhere inside
      the explorer (calls `onOpenApp` instead, currently a no-op until P144); This PC and every
      folder without `kind: 'app'` tiles are unaffected; `verify` passes.

- [x] **P144** — Wire `src/components/DeveloperLabWindow.jsx`: accept an `onOpenProjects` prop,
      pass `onOpenApp={(appId) => appId === 'projects-compilation' && onOpenProjects()}` to
      `ExplorerWindow` (from P143).
      **Pass condition:** calling the wired callback (temporarily wired to a `console.log` or via
      P145's real wiring) fires when the "Projects" tile is double-clicked; `verify` passes.

- [x] **P145** — Wire `src/components/Desktop.jsx`: add a virtual `'projects'` app (no desktop
      icon, matching the `'settings'` pattern) — a `[1200, 800]` entry in `WINDOW_PREVIEW_SIZES`, a
      `renderPreviewBody` branch returning `<ProjectsApp />`, an `openWindows` render branch
      (`<Window icon="🗃️" title="Projects" defaultWidth={1200} defaultHeight={800}><ProjectsApp
/></Window>`), a taskbar label/icon fallback for `w.id === 'projects'` (label "Projects",
      icon 🗃️, alongside the existing `'settings'` fallback), and
      `onOpenProjects={() => handleIconOpen('projects')}` passed into `DeveloperLabWindow`.
      **Pass condition:** double-clicking the "Projects" tile inside Developer Lab > Projects opens
      a real standalone "Projects" window with its own taskbar running-icon,
      minimize/maximize/close all working; every other window/icon unaffected; `verify` passes.

- [x] **P146** — Create `src/data/projectCategories.js` exporting the fixed, ordered list of
      Sonny's 7 category names (the single source of truth for which categories exist, so one
      with zero projects still shows up rather than only deriving categories from whatever
      `projectsLibrary.js` happens to contain). Create
      `src/components/projects/ProjectsCategorySidebar.jsx`: a search input above an accordion
      list of all 7 categories with live counts from `projectsLibrary.js` (a category with no
      matching projects shows "0", per Sonny's explicit ask, instead of being hidden); selecting a
      category expands its project titles inline beneath it and collapses any other expanded
      category; calls `onSelectCategory(category)`/`onSelectProject(id)` props.
      **Pass condition:** standalone render shows all 7 categories (including any with a 0 count)
      with correct counts; clicking one expands its titles and collapses a previously expanded
      one; typing in search still lets a category expand to its (filtered) matches; `verify`
      passes.

- [x] **P147** — Create `src/components/projects/ProjectsHero.jsx`: the selected project's photo
      (or folder-icon fallback) as a large banner image, with its title, tech-stack chips, and a
      Project Link button (hidden when blank) beneath it; an empty state when nothing is selected.
      **Pass condition:** standalone render with a sample project shows the image, title, chips,
      and link button; rendering with none selected shows the empty state; `verify` passes.

- [x] **P148** — Create `src/components/projects/ProjectsMoreList.jsx`: a "More Projects" heading
      with a live "`N` found" counter, then one card per filtered project (thumbnail-or-fallback,
      title, description, tech-stack chips); clicking a card calls an `onSelect(id)` prop,
      highlighting the currently selected card.
      **Pass condition:** standalone render shows the heading/count and one card per project passed
      in; clicking a card fires `onSelect` and highlights it; `verify` passes.

- [x] **P149** — Rewrite `src/components/ProjectsApp.jsx`: the header (eyebrow "OFFICIAL PROJECTS"
      / title "SONNY PROJECTS" / the AI-integration description paragraph from the reference),
      then `ProjectsCategorySidebar` (left) + `ProjectsHero` and `ProjectsMoreList` stacked (right)
      — owning `selectedCategory`/`selectedId`/search state, defaulting to the first project
      selected; the more-projects list and category counts both respect the active
      category/search filters.
      **Pass condition:** standalone render shows the full header + sidebar + hero + more-projects
      layout; picking a category filters the sidebar's expansion and the more-projects list;
      clicking any card (sidebar or more-projects) promotes it to the hero; `verify` passes.

- [x] **P150** — Delete the now-superseded `src/components/projects/ProjectsList.jsx` and
      `src/components/projects/ProjectDetail.jsx` (replaced by P146–P148).
      **Pass condition:** no remaining import references either file; `verify` passes.

- [x] **P151** — Polish caught during a real-browser check of the finished Phase 32 flow: the
      reference's "SONNY PROJECTS" title is a bold all-caps display style, but
      `src/components/ProjectsApp.jsx`'s `<h1>` rendered plain title-case. Add `uppercase
tracking-wide` to the title so it visually matches without needing a new font dependency
      (none is approved in CLAUDE.md §2).
      **Pass condition:** the title renders in bold uppercase in the browser; `verify` passes.

---

## PHASE 33 — REAL PROJECT CONTENT FIXES (ONBOARDING APP TRIAL)

_Sonny dropped real content into `src/assets/developer-lab/projects/onboarding-app/` to try the
convention end-to-end: an image saved as `onboarding app.jpg` (not the `photo.*` name the loader
looks for) and a `notes.txt` rewrite with a real Description paragraph and a much richer Tech
Stack section than assumed — multiple headed groups (Frontend/Backend/Planned production stack)
with bullet lines, not the flat single-line comma list `loadProjectsLibrary.js`/`ProjectsHero.jsx`/
`ProjectsMoreList.jsx` were built for. Two fixes needed before this real content will render
correctly._

- [x] **P152** — Rename `src/assets/developer-lab/projects/onboarding-app/onboarding app.jpg` to
      `photo.jpg`, matching the convention the loader's `import.meta.glob` actually looks for.
      **Pass condition:** the Onboarding App project shows its real photo instead of the folder-icon
      fallback; `verify` passes.

- [x] **P153** — Update `src/utils/loadProjectsLibrary.js`: stop comma-splitting `Tech Stack` into
      a chip array (`parseTechStack`, now unused — delete it); export `techStack` as the raw
      multi-line string instead, exactly like `description` already works, so a rich multi-section
      write-up (headers + bullet lines) round-trips untouched instead of being mangled by a
      comma-split.
      **Pass condition:** importing `projectsLibrary.js` exposes Onboarding App's `techStack` as its
      full multi-line text, unsplit; `verify` passes.

- [x] **P154** — Update `src/components/projects/ProjectsHero.jsx` and
      `ProjectsMoreList.jsx` to render `techStack` as preserved multi-line text (`whitespace-pre-line`)
      under a "Tech Stack" label instead of the old comma-split pill chips, matching how
      `description` is already displayed; keep it line-clamped in `ProjectsMoreList`'s compact card so
      a long stack doesn't blow up the card height.
      **Pass condition:** Onboarding App's rich Tech Stack section renders readably (line breaks
      preserved) in both the hero and its more-projects card, without pill chips; every other
      project (blank Tech Stack) shows nothing, as before; `verify` passes.

---

## PHASE 34 — PROJECTS WINDOW UI POLISH (SCROLLBAR, LAYOUT, SIDEBAR, HERO CARD)

_Sonny supplied a detailed design-refactor brief on 2026-08-19 to bring the "Projects" window
closer to the reference PouyaOS layout: a custom dark scrollbar, a divider under the header, a
centered max-width content column, a card-styled category sidebar with non-wrapping labels, and a
two-column hero card with a locked aspect-ratio image and a clamped description. No new
dependency — the scrollbar is done with Tailwind v4's built-in arbitrary-variant pseudo-element
support (`[&::-webkit-scrollbar]:...`) wrapped in one reusable class, not a plugin. One scope
addition flagged: the hero card's spec calls for a clamped description, which Phase 32's original
hero deliberately omitted (description lived only in the More Projects cards) — this phase adds it
to the hero too, per Sonny's brief._

- [x] **P155** — Add a reusable `.scrollbar-dark` utility class to `src/index.css` (narrow
      thumb/track styling per Sonny's spec — transparent track, `#2a2a2a` thumb, `#3f3f46` on
      hover, `8px`/rounded-full) using Tailwind v4's `@layer utilities` + arbitrary
      `&::-webkit-scrollbar` variants; apply the class to `ProjectsApp.jsx`'s scrollable root.
      **Pass condition:** the Projects window's scrollbar renders as a narrow dark thumb matching
      the spec instead of the default browser scrollbar; `verify` passes.

- [x] **P156** — Add a divider under the header in `src/components/ProjectsApp.jsx`: `border-b
border-white/10 pb-6 mb-8` on the header block, cleanly separating the title/description area
      from the sidebar + hero content below.
      **Pass condition:** a visible horizontal rule with spacing sits between the description
      paragraph and the categories/hero row; `verify` passes.

- [x] **P157** — Wrap the sidebar+content row in `src/components/ProjectsApp.jsx` in a centered
      max-width container (`max-w-6xl mx-auto px-6 w-full`) so content stops stretching edge-to-edge
      on wide/full-screen windows; apply the same max-width to the header block for a consistent
      column.
      **Pass condition:** at the window's default 1200×800 size (and wider, via maximize), the
      content sits in a centered column with visible side margins instead of spanning the full
      window width; `verify` passes.

- [x] **P158** — Restyle `src/components/projects/ProjectsCategorySidebar.jsx` into a card: replace
      the flush `border-r` panel with a standalone rounded card (`bg-[#141414] border
border-white/10 rounded-xl p-4`) at a fixed `w-72`/`min-w-[280px]`; prevent category labels
      from wrapping (`truncate` on the label span, `shrink-0` on the count badge) so long names like
      "Atlassian & Workplace System" stay on one line.
      **Pass condition:** the sidebar renders as a bordered rounded card instead of a flush side
      panel; every category name (including the longest one) stays on a single line at the
      sidebar's fixed width; `verify` passes.

- [x] **P159** — Rewrite `src/components/projects/ProjectsHero.jsx` as a two-column card
      (`bg-[#141414] border border-white/10 rounded-xl p-6 grid grid-cols-1 md:grid-cols-12 gap-6`):
      the image wrapper (`md:col-span-5`, `aspect-[4/3]`, `object-cover object-center w-full h-full`)
      on one side, and the title/description (new, `line-clamp-3`)/tech-stack/project-link metadata
      (`md:col-span-7`) on the other.
      **Pass condition:** the hero renders as a bordered two-column card with a locked-aspect-ratio
      image on one side and title/clamped-description/tech-stack/link on the other, both at the
      default window size and when the window is maximized; `verify` passes.

- [x] **P160** — Fix a real-browser-caught bug in `src/components/projects/ProjectsHero.jsx`: CSS
      grid's default row-stretch plus `h-full` on the image was overriding `aspect-[4/3]` entirely
      whenever the text column was tall (e.g. Onboarding App's long Tech Stack), stretching the
      image far past its locked ratio instead of cropping it. Add `items-start` to the grid
      container so columns size independently instead of stretching to match each other, and drop
      the now-conflicting `h-full` from the image/placeholder.
      **Pass condition:** with a tall text column (e.g. Onboarding App selected), the image stays at
      its locked 4:3 ratio instead of stretching to match the text height; `verify` passes.

---

## PHASE 35 — PROJECTS: FIXED-HEIGHT SCROLLABLE PANES, VERTICAL HERO, STICKY EDGES

_Sonny supplied a second, more detailed design brief on 2026-08-19 that supersedes Phase 34's
two-column hero card, then a reference screenshot of the finished hero card. Supersedes: the hero
goes back to a vertical stack (full-width image on top, then title/description/tech-stack/link
below it); both the category sidebar and the hero become independently-scrollable fixed-height
cards (not stretching the page), each with a narrower 6px dark scrollbar than Phase 34's 8px
`.scrollbar-dark`, plus sticky pinned edges (search input pinned to the sidebar's top, "View
Project" link pinned to the hero's bottom); both card containers stay visibly rounded despite the
internal scrolling/sticky content — achieved with a non-scrolling `overflow-hidden rounded-xl`
outer wrapper around an inner `overflow-y-auto` scroll container, since a sticky element flush
against a scrolling box's own edge doesn't inherit that box's rounding otherwise. Tech Stack: the
screenshot's pill set (React, React Router, Vite, Node.js, Express, Tailwind CSS, node:sqlite,
ESLint) is a curated short list that doesn't losslessly derive from the rich Frontend/Backend/
Planned-production-stack write-up already in Onboarding App's `notes.txt` — rather than destroy or
auto-mangle that content, Claude's call (flagged, easy to revisit): add a new short `Tags` notes.txt
field (comma-separated) that drives the hero's pill badges specifically, while the existing rich
`Tech Stack` field is untouched and keeps rendering in the "More Projects" card as before. Claude
filled in Onboarding App's real `Tags` line reading the 8 names straight off the screenshot; the
other 6 projects' `Tags` stay blank until Sonny adds them, same "coming soon" pattern as every other
still-empty field._

- [x] **P161** — Add a `.scrollbar-thin` utility class to `src/index.css` (6px width, transparent
      track, `neutral-800` thumb, `neutral-700` on hover), alongside the existing 8px
      `.scrollbar-dark` from Phase 34 (kept as-is for `ProjectsApp.jsx`'s outer page scroll).
      **Pass condition:** the new class exists and compiles into the CSS bundle; `verify` passes.

- [x] **P162** — Add a `Tags` field to the notes.txt convention: update
      `src/utils/loadProjectsLibrary.js`'s `FIELD_LABELS`/output shape to parse and export `tags`
      (comma-separated → array, same split/trim/filter logic the old `parseTechStack` used); add
      `Tags: React, React Router, Vite, Node.js, Express, Tailwind CSS, node:sqlite, ESLint` to
      `src/assets/developer-lab/projects/onboarding-app/notes.txt` (read off the reference
      screenshot); leave the other 6 notepads' `Tags` blank.
      **Pass condition:** importing `projectsLibrary.js` exposes Onboarding App's `tags` as an
      8-item array matching the screenshot; every other project's `tags` is an empty array;
      `verify` passes.

- [x] **P163** — Rewrite `src/components/projects/ProjectsHero.jsx` as a vertical-stack card:
      outer `h-[500px] overflow-hidden rounded-xl border border-white/10 bg-[#141414]` (non-scrolling,
      guarantees the rounded corners), containing an inner `h-full overflow-y-auto scrollbar-thin`
      scroll region with — a full-width `aspect-[16/9]` image frame flush with the card's top
      (`<img>` with `object-cover object-center w-full h-full`, no gap so it shares the outer
      corners), then padded content: title (`text-2xl font-bold text-white mt-4`), description
      (`text-sm text-gray-400 mt-2 leading-relaxed`, no longer clamped now that the card scrolls
      internally), a bold "Tech Stack" label (`text-sm font-bold text-white mt-6 mb-3`) with pill
      badges from the new `tags` field (`flex flex-wrap gap-2`, each
      `bg-white/10 text-gray-200 text-xs px-3 py-1.5 rounded-full border border-white/5
font-medium`) — falling back to nothing when `tags` is empty (the old rich `techStack` text
      no longer renders here, but keeps rendering as before in `ProjectsMoreList.jsx`'s card, so
      Onboarding App's full write-up stays visible somewhere); "View Project ↗"
      (`inline-flex items-center gap-1 text-sm font-semibold text-blue-400 hover:text-blue-300
transition-colors`) pinned via `sticky bottom-0 bg-[#141414] border-t border-white/10 pt-4
text-center`.
      **Pass condition:** the hero renders as a single rounded fixed-height card, image on top full
      width, pill badges for Onboarding App matching the reference screenshot; scrolling keeps
      "View Project" pinned at the bottom without square corners appearing; every other project
      (blank `tags`) shows no pill row; `verify` passes.

- [x] **P164** — Update `src/components/projects/ProjectsCategorySidebar.jsx` with the same
      rounded-corner-safe structure: outer `h-[500px] overflow-hidden rounded-xl border
border-white/10 bg-[#141414]`, inner `h-full overflow-y-auto scrollbar-thin p-4` scroll
      region: sticky search input pinned via `sticky top-0 z-10 bg-[#141414]` (with bottom margin
      so it doesn't crowd the first category button while scrolled), Categories list unchanged.
      **Pass condition:** expanding enough categories to overflow the fixed height scrolls
      internally while the search input stays pinned at the top and the card's corners stay
      visibly rounded; `verify` passes.

- [x] **P165** — Fix a real-browser-caught bug in `src/components/projects/ProjectsHero.jsx`: the
      brief actually offered `aspect-[16/9]` **or** a fixed height like `h-52`/`h-60` as
      alternatives for the image frame, but P163 used `aspect-[16/9]` on top of the card's own fixed
      `h-[500px]` — at this card's width, a 16:9 image computes to ~445–489px tall, consuming
      nearly the entire card and squeezing title/description/pills down to a sliver (measured via
      DOM rects: the image alone was 489px of the 498px visible area). Switch the image wrapper
      from `aspect-[16/9]` to a fixed `h-56`, leaving real room for the content below.
      **Pass condition:** with Onboarding App selected, the title/description/pills are visible
      directly below the image without scrolling, verified via real DOM measurements (not just a
      screenshot); `verify` passes.

---

## PHASE 36 — GAMES ARCADE: SHARED HUB + LOCAL LEADERBOARD ENGINE

_Requested by Sonny on 2026-08-19: turn the existing `games` desktop icon (currently the generic
placeholder `Window`) into a real arcade hub with 5 games — Flappy Bird clone, 2048, Endless
Runner, Typing Speed Test, Memory Flip Card. Confirmed with Sonny: leaderboards are
**localStorage-backed, per-browser only**, for now — no backend/database (that stays banned per
CLAUDE.md §2 until Sonny explicitly approves one; a real shared/global leaderboard is tracked in
the Backlog below for later). Games are built one at a time in the order Sonny listed, starting
with Flappy Bird (Phase 37). This phase builds the shared arcade shell + score-persistence engine
every game phase reuses; no game logic lives here._

- [x] **P166** — Create `src/utils/gameScores.js`: pure localStorage helpers — `readScores(gameId)`
      (safe JSON parse of `localStorage['arcade:<gameId>']`, returns `[]` on missing/corrupt data)
      and `writeTopScores(gameId, scores, sortOrder, limit = 10)` (sorts ascending or descending per
      `sortOrder`, truncates to `limit`, writes back as JSON). Co-located `gameScores.test.js`
      covering a normal round-trip and a corrupt-JSON fallback.
      **Pass condition:** `npm run test` shows both cases passing; `verify` passes.

- [x] **P167** — Create `src/context/GamesContext.jsx`: `GamesProvider` + `useGames()` hook wrapping
      `gameScores.js` — `getTopScores(gameId)` and `submitScore(gameId, { value, label, sortOrder })`
      (stamps a `timestamp`, calls `writeTopScores`, and updates React state so any mounted
      leaderboard re-renders immediately, no reload needed). Wrap `<Desktop />` with it in
      `src/App.jsx` alongside the existing providers.
      **Pass condition:** a component under the provider can submit a score and immediately see it
      via `getTopScores`; `verify` passes.

- [x] **P168** — Create `src/data/gamesCatalog.js`: an array of the 5 games' metadata — `id`,
      `title`, `tagline`, `icon` (emoji, no new asset dependency), `scoreLabel` (e.g. "Best Score",
      "Fastest Time"), `sortOrder` (`'desc'` for points-based games, `'asc'` for the time-based
      Memory Flip), `status` (`'coming-soon'` until that game's own phase lands and flips it to
      `'ready'`).
      **Pass condition:** file exports a well-formed 5-entry array; `verify` passes.

- [x] **P169** — Create `src/components/games/GameLeaderboard.jsx`: given `gameId`/`scoreLabel`/
      `sortOrder` props, renders a ranked "High Scores" list from `useGames().getTopScores(gameId)`
      (rank #, formatted value, each entry's optional `label`, relative date), with a "No scores
      yet — be the first!" empty state.
      **Pass condition:** standalone render with seeded localStorage scores shows them ranked
      correctly; with none, shows the empty state; `verify` passes.

- [x] **P170** — Create `src/components/games/GamesHub.jsx`: the arcade menu — one tile per
      `gamesCatalog.js` entry (icon, title, tagline, live best-score preview via `useGames()`, a
      "Coming soon" badge when `status !== 'ready'`), calling `onSelectGame(id)` on click (disabled
      for coming-soon tiles).
      **Pass condition:** standalone render shows all 5 tiles; clicking a ready tile fires
      `onSelectGame`; coming-soon tiles are inert; `verify` passes.

- [x] **P171** — Create `src/components/GamesApp.jsx`: owns `activeGameId` state, renders
      `GamesHub` by default; selecting a game renders a per-game placeholder view (icon + "Coming
      soon") with a "← Back to Arcade" button, ready for each real game component to slot in as its
      phase lands.
      **Pass condition:** standalone render shows the hub; selecting a game swaps to its placeholder
      view; Back returns to the hub; `verify` passes.

- [x] **P172** — Wire the `games` icon in `src/components/Desktop.jsx` to open `GamesApp` (window,
      default size 1200×800) instead of the generic placeholder `Window`, matching the
      `visitor-arts`/`memory-wall` branch pattern (add to `WINDOW_PREVIEW_SIZES` and
      `renderPreviewBody` too).
      **Pass condition:** double-clicking "Games" opens the real arcade hub; every other non-special
      icon still opens the generic placeholder `Window`; `verify` passes.

---

## PHASE 37 — GAME 1: FLAPPY BIRD CLONE

_First game per Sonny's build order. Canvas-based: gravity + jump-on-click/space, scrolling pipes
with gaps, collision ends the run, score = pipes passed. Plugs into Phase 36's `GamesApp`/
`GameLeaderboard`/`useGames()`._

- [x] **P173** — Create `src/utils/games/flappyBirdPhysics.js`: pure functions —
      `applyGravity(bird, dt)`, `jump(bird)`, `movePipes(pipes, dt, speed)`,
      `spawnPipe(pipes, canvasHeight, gapSize)`, `checkCollision(bird, pipes, canvasHeight)`.
      Co-located test file with one non-colliding case and one colliding case.
      **Pass condition:** `npm run test` shows both cases passing; `verify` passes.

- [x] **P174** — Create `src/components/games/flappybird/FlappyBirdCanvas.jsx`: a `<canvas>`
      rendering the bird (simple shape/emoji) via `requestAnimationFrame`, wired to
      `flappyBirdPhysics.js` for gravity-only free-fall (no pipes yet); click/space calls `jump()`;
      the RAF loop is cancelled on unmount.
      **Pass condition:** standalone render shows the bird falling under gravity; clicking makes it
      jump upward; `verify` passes.

- [x] **P175** — Extend `FlappyBirdCanvas.jsx` to spawn and scroll pipes via `spawnPipe`/
      `movePipes`, incrementing an internal score each time the bird's x-position passes a pipe
      without colliding.
      **Pass condition:** standalone render shows pipes scrolling left and spawning periodically;
      the score visibly increments as they're passed; `verify` passes.

- [x] **P176** — Wire collision in `FlappyBirdCanvas.jsx` via `checkCollision` (pipes + ground/
      ceiling): on collision, stop the RAF loop and call an `onGameOver(score)` prop.
      **Pass condition:** a forced collision calls `onGameOver` with the reached score and the loop
      stops advancing; `verify` passes.

- [x] **P177** — Create `src/components/games/flappybird/FlappyBirdGame.jsx`: composes
      `FlappyBirdCanvas` with a start screen ("Click or press Space to start"), and a game-over
      overlay (final score + `GameLeaderboard` for `'flappy-bird'` + "Play Again"), submitting via
      `useGames().submitScore('flappy-bird', ...)` on game over.
      **Pass condition:** start screen shows before play; a run ending in collision shows the
      overlay with the score and an updated leaderboard; Play Again resets to the start screen;
      `verify` passes.

- [x] **P178** — Wire `FlappyBirdGame` into `src/components/GamesApp.jsx` for
      `id === 'flappy-bird'`, replacing its placeholder view; flip `flappy-bird`'s `status` to
      `'ready'` in `src/data/gamesCatalog.js`.
      **Pass condition:** selecting Flappy Bird from the arcade hub opens the real playable game;
      the other 4 tiles still show "Coming soon"; `verify` passes.

---

## PHASE 38 — GAME 2: 2048

_Second game per Sonny's build order. Pure grid logic (slide/merge/spawn/game-over), no game loop
needed. Plugs into Phase 36's shared hub/leaderboard._

- [x] **P179** — Create `src/utils/games/twenty48Logic.js`: pure functions — `createEmptyGrid()`,
      `spawnTile(grid)` (random empty cell gets 2 [90%] or 4 [10%]), `slideAndMergeRow(row)` (the
      single-row slide+merge+score-delta primitive all 4 directions reduce to via transpose/
      reverse), `move(grid, direction)` returning `{ grid, scoreDelta, moved }`,
      `isGameOver(grid)`. Co-located test file covering a merge case, a no-op-move case, and a
      game-over case.
      **Pass condition:** `npm run test` shows all 3 cases passing; `verify` passes.

- [x] **P180** — Create `src/components/games/twenty48/Grid2048.jsx`: renders a 4×4 `grid` prop as
      colored number tiles (classic 2048 per-value palette), no interactivity.
      **Pass condition:** standalone render with a sample grid shows correctly colored/numbered
      tiles; `verify` passes.

- [x] **P181** — Create `src/components/games/twenty48/Game2048.jsx`: owns grid/score state
      (seeded with two spawned tiles), a keydown listener for arrow keys calling `move()`, spawning
      a new tile after any move that actually changed the grid, and showing the live score.
      **Pass condition:** standalone render lets arrow keys shift/merge tiles and updates the score;
      `verify` passes.

- [x] **P182** — Add the game-over overlay to `Game2048.jsx`: when `isGameOver(grid)` is true, show
      the final score, `GameLeaderboard` for `'2048'`, and "Play Again" (resets grid/score);
      submit via `useGames().submitScore('2048', ...)` on game over.
      **Pass condition:** playing to a full, unmergeable grid shows the overlay with the final score
      and an updated leaderboard; Play Again resets; `verify` passes.

- [x] **P183** — Wire `Game2048` into `GamesApp.jsx` for `id === '2048'`; flip its `status` to
      `'ready'` in `gamesCatalog.js`.
      **Pass condition:** selecting 2048 from the hub opens the real playable game; `verify` passes.

---

## PHASE 39 — GAME 3: ENDLESS RUNNER

_Third game per Sonny's build order. Same canvas/RAF shape as Flappy Bird (Phase 37) but its own
tuning: auto-running character, jump over obstacles, distance-based score with gradually
increasing speed. Plugs into Phase 36's shared hub/leaderboard._

- [x] **P184** — Create `src/utils/games/runnerPhysics.js`: pure functions — `applyGravity`/
      `jump` (this game's own tuning), `moveObstacles(obstacles, dt, speed)`,
      `spawnObstacle(obstacles, groundY)`, `checkCollision(player, obstacles)`. Co-located test file
      with a colliding and a non-colliding case.
      **Pass condition:** `npm run test` shows both cases passing; `verify` passes.

- [x] **P185** — Create `src/components/games/runner/RunnerCanvas.jsx`: ground + player shape via
      `requestAnimationFrame`, gravity/jump only (no obstacles yet), RAF loop cancelled on unmount.
      **Pass condition:** standalone render shows the player jumping over a fixed ground on click/
      space; `verify` passes.

- [x] **P186** — Extend `RunnerCanvas.jsx` with obstacle spawning/scrolling via
      `runnerPhysics.js`, plus a distance-based score that increments every frame and a scroll
      speed that gradually increases the longer the run lasts.
      **Pass condition:** obstacles scroll and spawn; the score increments over time; speed visibly
      increases the longer it runs; `verify` passes.

- [x] **P187** — Wire collision in `RunnerCanvas.jsx` via `checkCollision` → stop the RAF loop and
      call `onGameOver(score)`.
      **Pass condition:** colliding with an obstacle ends the run and reports the reached score;
      `verify` passes.

- [x] **P188** — Create `src/components/games/runner/RunnerGame.jsx`: composes `RunnerCanvas` with
      a start screen, a game-over overlay (`GameLeaderboard` for `'endless-runner'` + "Play Again"),
      submitting via `useGames().submitScore('endless-runner', ...)` on game over.
      **Pass condition:** the full start → play → game-over → replay loop works; `verify` passes.

- [x] **P189** — Wire `RunnerGame` into `GamesApp.jsx` for `id === 'endless-runner'`; flip its
      `status` to `'ready'` in `gamesCatalog.js`.
      **Pass condition:** selecting Endless Runner from the hub opens the real playable game;
      `verify` passes.

---

## PHASE 40 — GAME 4: TYPING SPEED TEST / CODE SPEED RACER

_Fourth game per Sonny's build order. No game loop — a timed typing form: live per-character
correctness highlighting, WPM + accuracy computed on completion. Plugs into Phase 36's shared hub/
leaderboard._

- [x] **P190** — Create `src/data/typingSnippets.js`: a small curated list of short code/tech
      snippets and sentences to type.
      **Pass condition:** exports a non-empty array of strings; `verify` passes.

- [x] **P191** — Create `src/utils/games/typingStats.js`: pure functions —
      `calculateWPM(charsTyped, elapsedMs)` and `calculateAccuracy(correctChars, totalTyped)`.
      Co-located test file with known-value cases for both.
      **Pass condition:** `npm run test` shows both cases passing; `verify` passes.

- [x] **P192** — Create `src/components/games/typing/TypingTestArea.jsx`: renders the target
      snippet with per-character highlighting (correct/incorrect/untyped) as the user types into a
      controlled input, starting an internal timer on the first keystroke, and calling
      `onComplete({ wpm, accuracy })` once the snippet is fully typed.
      **Pass condition:** typing through a snippet (including one mistake) shows correct
      highlighting and calls `onComplete` with a plausible WPM/accuracy; `verify` passes.

- [x] **P193** — Create `src/components/games/typing/TypingSpeedGame.jsx`: picks a random snippet
      from `typingSnippets.js`, renders `TypingTestArea`; on complete shows results (WPM +
      accuracy), `GameLeaderboard` for `'typing-speed'` (value = WPM, `label` = accuracy%),
      submits via `useGames().submitScore`; "Try Again" picks a new random snippet.
      **Pass condition:** completing a snippet shows results and updates the leaderboard; Try Again
      resets with a new snippet; `verify` passes.

- [x] **P194** — Wire `TypingSpeedGame` into `GamesApp.jsx` for `id === 'typing-speed'`; flip its
      `status` to `'ready'` in `gamesCatalog.js`.
      **Pass condition:** selecting it from the hub plays the real game; `verify` passes.

---

## PHASE 41 — GAME 5: MEMORY FLIP CARD (SPEED RUN)

_Fifth and final game per Sonny's build order. Grid of face-down cards, flip two at a time,
fastest-completion-time leaderboard (`sortOrder: 'asc'`, already set in Phase 36's catalog).
Plugs into Phase 36's shared hub/leaderboard._

- [x] **P195** — Create `src/data/memoryCardIcons.js`: a list of 8 unique emoji/tech icons used as
      card faces.
      **Pass condition:** exports 8+ unique entries; `verify` passes.

- [x] **P196** — Create `src/utils/games/memoryDeck.js`: pure `buildShuffledDeck(icons)` returning
      a Fisher-Yates-shuffled array of paired `{ id, icon, isFlipped, isMatched }` cards.
      Co-located test verifying each icon appears exactly twice and the deck size is correct.
      **Pass condition:** `npm run test` shows the deck-validity case passing; `verify` passes.

- [x] **P197** — Create `src/components/games/memory/MemoryCard.jsx`: one flippable card (back by
      default, front when `isFlipped`/`isMatched`), click calls `onFlip(id)`, disabled when already
      matched or flipped.
      **Pass condition:** standalone render shows the back by default and the front when
      `isFlipped` is true; `verify` passes.

- [x] **P198** — Create `src/components/games/memory/MemoryFlipGame.jsx`: grid of `MemoryCard`
      from `buildShuffledDeck`, flip-two-at-a-time logic (a mismatch auto-flips back after a short
      delay via a `setTimeout` cleaned up on unmount — per the existing `react-hooks/refs`
      constraint in LESSONS.md), a move counter, and a timer starting on first flip and stopping
      once all pairs are matched.
      **Pass condition:** matching two cards keeps them face-up; mismatching flips them back after
      the delay; the timer/move count track correctly; `verify` passes.

- [x] **P199** — Add the completion overlay to `MemoryFlipGame.jsx`: once fully matched, show the
      final time + move count, `GameLeaderboard` for `'memory-flip'` (ascending/fastest-time sort),
      submit via `useGames().submitScore`, and "Play Again" reshuffles a fresh deck.
      **Pass condition:** completing the board shows the overlay and updates the leaderboard; Play
      Again reshuffles and resets; `verify` passes.

- [x] **P200** — Wire `MemoryFlipGame` into `GamesApp.jsx` for `id === 'memory-flip'`; flip its
      `status` to `'ready'` in `gamesCatalog.js`.
      **Pass condition:** selecting it from the hub plays the real game; every one of the 5 arcade
      tiles is now a real playable game with a working local leaderboard; `verify` passes.

---

## PHASE 42 — TYPING SPEED TEST REDESIGN (LEVEL/TIER SYSTEM + CLASSROOM ART)

_Requested by Sonny on 2026-08-19 from a reference mockup (classroom scene: a keyboard rack up
top, a whiteboard below, a LEVEL badge and stopwatch HUD) plus a full game-design brief: 100
levels grouped into 10 named tiers of 10 sentences each, a 20-second-per-level timer, a warning
pop-up before every tier change, tap-to-start → countdown → play, live per-key lighting on a
virtual keyboard as the player types, and a leaderboard that tracks highest level reached instead
of WPM. Sonny already dropped `keyboard.png`, `map.avif`, and the mockup itself into
`src/components/games/typing/assets/components/`. Design decisions made to turn the brief into
buildable tasks (flagged here, easy to revisit):_

1. _`map.avif` is used as the real classroom background behind the play area. `keyboard.png` has
   no letter labels on its keys (it's a decorative flat graphic), so real per-key lighting is
   built as an actual QWERTY `VirtualKeyboard.jsx` component styled to match its look (dark navy
   bezel, rounded keys, colored per-row borders, red corner dots) instead of overlaying hit-zones
   on the PNG — `keyboard.png`/the mockup stay as design references only, not imported assets._
2. _Scoring: a run is a single continuous climb through levels 1→100 with no lives — a level's
   20-second timer expiring before the sentence is fully & correctly typed ends the run
   immediately. The leaderboard value is the count of **fully completed** levels (0 if level 1
   is never finished); its label is the name of the tier reached, e.g. "Tier 3 — Capitals". This
   is the "count highest level" rule Sonny gave._
3. _WPM/accuracy are dropped entirely — Sonny's spec for this redesign is level-only scoring, so
   `typingStats.js`'s WPM/accuracy calculators (and the old single-snippet `typingSnippets.js`)
   are deleted rather than kept as unused dual metrics, per CLAUDE.md §5's "don't build for a
   feature you don't have."_
4. _Sonny's rule 5 ("put in the database the sentence to type") is satisfied by the
   `typingTiers.js` data file — no real database exists anywhere in this project (CLAUDE.md §2
   bans one), same pattern as every other data-driven app already built
   (`contactInfo.js`/`memoryWallNotes.js`/etc.)._
5. _The tier-change warning fires once, right before the first level of every tier after Tier 1
   (i.e. before levels 11/21/.../91), showing a random line from a small curated warning pool —
   satisfies "before the tier change, pop up something like 'Hard words incoming!'"._
6. _`typingTiers.js`'s 100-sentence data file will exceed the ≤50-line guideline — kept as one
   task anyway since it's a single cohesive data unit that can't be meaningfully split, the same
   call already logged for `PaintToolbar.jsx` in LESSONS.md._

- [x] **P201** — Create `src/data/typingTiers.js`: export `typingTiers`, an ordered array of 10
      tier objects `{ name, levelStart, levelEnd, sentences }` using Sonny's exact 100 sentences
      (Tier 1 "Warm-Up" levels 1–10 ... Tier 10 "Master Level" levels 91–100, verbatim text and
      order); export `TIER_WARNINGS`, a pool of 5 short "hard words incoming"-style warning
      strings for the tier-change pop-up.
      **Pass condition:** the array has 10 tiers totalling exactly 100 sentences in the right
      order/text; `verify` passes.

- [x] **P202** — Create `src/utils/games/typingLevels.js`: pure functions — `getLevelInfo(level)`
      (locates the tier whose `levelStart..levelEnd` contains `level`, returns
      `{ level, tierIndex, tierName, sentence }`), `isTierStart(level)` (true when `level` equals
      a tier's `levelStart` and `level > 1`), `pickWarning()` (random pick from `TIER_WARNINGS`).
      Co-located `typingLevels.test.js` covering a known level→sentence lookup and a tier-start
      boundary case.
      **Pass condition:** `npm run test` shows both cases passing; `verify` passes.

- [x] **P203** — Create `src/components/games/typing/TypingHud.jsx`: the LEVEL badge (orange
      ribbon style, current level number) and a stopwatch-style countdown readout (seconds
      remaining, clock icon), matching the reference mockup's top-of-screen HUD. Pure
      presentational, props `level`/`secondsLeft`.
      **Pass condition:** standalone render shows both the level badge and the countdown number;
      `verify` passes.

- [x] **P204** — Create `src/components/games/typing/VirtualKeyboard.jsx`: a full QWERTY layout
      (number row, QWERTYUIOP, ASDFGHJKL + wide end keys, ZXCVBNM + spacebar, plus the common
      punctuation keys sentences 41–100 need: `. , ' " ; : ! ?`) styled like the reference —
      dark navy rounded bezel, red corner dots, rounded keys, a distinct border color per row —
      accepting `activeKey`/`activeStatus` (`'correct' | 'incorrect'`) props that tint the
      matching key green/red.
      **Pass condition:** standalone render shows the full keyboard; passing
      `activeKey="a" activeStatus="correct"` highlights the A key green; `verify` passes.

- [x] **P205** — Create `src/components/games/typing/TypingWhiteboard.jsx`: a whiteboard-styled
      panel (white board face + wood-tone frame, per the reference) rendering a `sentence` prop
      with per-character correct/incorrect/untyped coloring against a `typed` prop (logic moved
      out of the current `TypingTestArea.jsx` paragraph).
      **Pass condition:** standalone render with a sample sentence/typed pair shows the whiteboard
      styling with correctly colored characters; `verify` passes.

- [x] **P206** — Rewrite `src/components/games/typing/TypingTestArea.jsx`: replace the one-shot
      `snippet`/`onComplete` props with `level`/`durationMs`/`onLevelComplete({ level, elapsedMs })`/
      `onTimeout()`; look up the sentence via `getLevelInfo(level)`; run a `setInterval` countdown
      from `durationMs` (cleared on unmount/level change) calling `onTimeout()` at zero; render the
      sentence through `TypingWhiteboard` and the countdown through `TypingHud`.
      **Pass condition:** mounting with a level shows its real sentence and a ticking countdown;
      finishing it before time's up calls `onLevelComplete`; letting it hit zero calls `onTimeout`;
      `verify` passes.

- [x] **P207** — Add key-lighting to `TypingTestArea.jsx`: on each keystroke, compare the typed
      character to the expected next character, hold `{ activeKey, activeStatus }` in state and
      clear it after ~150ms via `setTimeout` (cleanup on unmount/re-key, per the existing
      `react-hooks/refs` constraint in LESSONS.md), passed into `VirtualKeyboard` from P204.
      **Pass condition:** typing a correct character flashes that physical key green in the
      browser, an incorrect one flashes red; `verify` passes.

- [x] **P208** — Create `src/components/games/typing/TierWarningBanner.jsx`: an overlay showing a
      random line from `pickWarning()` over the classroom backdrop, auto-dismissing after ~2.5s via
      a cleaned-up `setTimeout` and calling `onDismiss()`.
      **Pass condition:** standalone render shows the warning text and calls `onDismiss` after the
      delay; `verify` passes.

- [x] **P209** — Create `src/components/games/typing/TypingStartScreen.jsx`: a "Tap to Start" idle
      screen over the classroom background (`map.avif`); tapping/clicking begins a 3-2-1 countdown
      overlay that calls `onStart()` once it reaches zero.
      **Pass condition:** standalone render shows tap-to-start; tapping runs the countdown and
      calls `onStart` at the end; `verify` passes.

- [x] **P210** — Rewrite `src/components/games/typing/TypingSpeedGame.jsx`: own a `phase` state
      machine (`'start' | 'tier-warning' | 'playing' | 'game-over'`) and `level` (starts at 1),
      composed over the `map.avif` classroom background scaled to fit the games window; render
      `TypingStartScreen` for `'start'`, `TierWarningBanner` (per `isTierStart`) before showing
      `TypingTestArea` for a tier's first level, `TypingTestArea` for `'playing'` (advancing
      `level` on `onLevelComplete`, re-checking `isTierStart` for the next level, moving to
      `'game-over'` on `onTimeout`).
      **Pass condition:** completing level 10 shows the tier warning before level 11's timer
      starts; letting any level time out moves to the game-over phase; `verify` passes.

- [x] **P211** — Wire the game-over screen in `TypingSpeedGame.jsx`: show the number of fully
      completed levels and the tier name reached as the headline stats, `GameLeaderboard` for
      `'typing-speed'`, and "Play Again" (resets to `level: 1`, phase `'start'`); submit via
      `useGames().submitScore('typing-speed', { value: levelsCompleted, label: tierName, sortOrder:
'desc' })`.
      **Pass condition:** timing out at level N shows N-1 as levels completed plus an updated
      leaderboard; Play Again resets to the start screen; a full tap-to-start → play → tier warning
      → game-over → replay loop works end-to-end in the browser; `verify` passes.

- [x] **P212** — Update `src/data/gamesCatalog.js`: change the `typing-speed` entry's `scoreLabel`
      from `'Best WPM'` to `'Highest Level'` (and its `tagline` to reflect the new survival-climb
      format) to match the new scoring; import and wire Sonny's new
      `assets/components/typing speed test thumbnail.png` as its `thumbnail` field, matching the
      `flappy-bird` entry's existing `thumbnail` pattern (promotes it to the hub's bigger featured
      tile).
      **Pass condition:** the arcade hub tile and the in-game leaderboard header both read
      "Highest Level"; the Typing Speed Test tile renders as a featured tile with the new thumbnail
      image, matching Flappy Bird's; `verify` passes.

- [x] **P213** — Delete `src/data/typingSnippets.js` and `src/utils/games/typingStats.js` (+ its
      co-located test), superseded by `typingTiers.js`/the level system per design decision 3
      above; confirm no remaining imports of either.
      **Pass condition:** both files are gone and `verify` still passes with no dangling-import
      errors.

---

## PHASE 43 — TYPING GAME: OVERLAY GAME-OVER CARD + SOUND

_Requested by Sonny on 2026-08-20: replace the plain full-screen "Game Over" view from Phase 42
(P211) with an image-based overlay card (`typing game over.png`, already dropped into
`assets/components/`) shown on top of the classroom scene — matching the `FlappyBirdGame.jsx`
pattern of pixel-measured text slots and button hit-areas over a designed PNG. Also add a
keyboard click sound per keystroke and looped background music for the whole time the game is
open, using the two files Sonny dropped into `assets/sound/` (`keyboard sound.MP3`,
`typing background music.mp3`). Pixel rects below were measured directly off the 600×600
`typing game over.png` by scanning its pixel data (same technique `FlappyBirdGame.jsx`'s own
comment describes), not eyeballed:_

- _`SCORE_SLOT: { x: 456, y: 272 }`, `LEVEL_SLOT: { x: 456, y: 314 }` — the blank keycap space
  immediately after each baked-in label word, on the card's right side._
- _`REPLAY_RECT: { left: 74, top: 470, width: 209, height: 45 }`,
  `EXIT_RECT: { left: 314, top: 470, width: 206, height: 43 }` — the baked-in button graphics._
- _Claude's call: the card only has one label pair ("SCORE"/"LEVEL"), so SCORE shows
  `completedLevels` (the same value submitted to the leaderboard) and LEVEL shows the level
  reached/died on (`completedLevels + 1`, capped at 100) — two distinct, informative numbers
  rather than duplicating one value under both labels._
- _Background music plays for the entire time the Typing Speed Test view is mounted (idle,
  playing, tier-warning, game-over alike), starting on mount and stopping on unmount/exit —
  "when game open," not gated to only the active-typing phase._

- [x] **P214** — Create `src/components/games/typing/TypingGameOverOverlay.jsx`: renders
      `typing game over.png` at its native 600×600 inside an `absolute inset-0` dark backdrop
      (so the classroom scene stays visible behind it), overlaying `score`/`level` prop values at
      `SCORE_SLOT`/`LEVEL_SLOT` and invisible `Replay`/`Exit` buttons at `REPLAY_RECT`/`EXIT_RECT`
      calling `onReplay`/`onExit` — mirroring `FlappyBirdGame.jsx`'s existing card pattern exactly.
      **Pass condition:** standalone render with sample `score`/`level` shows both numbers in the
      right slots; clicking each button fires its callback; `verify` passes.

- [x] **P215** — In `src/components/games/typing/TypingSpeedGame.jsx`: delete the plain
      `'game-over'` block from Phase 42; extend the classroom-background wrapper to render
      whenever `phase !== 'start'` (so it persists behind the overlay); render
      `TypingGameOverOverlay` (score=`completedLevels`, level=`Math.min(level, 100)`) on top when
      `phase === 'game-over'`, wiring `onReplay={handlePlayAgain}` and accepting an `onExit` prop
      (passed through from `GamesApp.jsx`, matching every other game's existing `onExit` wiring).
      **Pass condition:** reaching game-over shows the classroom scene dimly visible behind the new
      overlay card with correct score/level numbers; Replay restarts at level 1; Exit returns to
      the arcade hub; `verify` passes.

- [x] **P216** — Add the keyboard click sound to `TypingTestArea.jsx`: a `useRef`-held `Audio`
      instance for `assets/sound/keyboard sound.MP3`, created inside a mount-only `useEffect`
      (matching `FlappyBirdGame.jsx`'s existing audio-ref pattern) and played (`currentTime = 0`
      then `.play().catch(() => {})`) on every keystroke, alongside the existing key-flash logic.
      **Pass condition:** typing a character audibly plays the click sound in the browser, for
      both correct and incorrect keystrokes; `verify` passes.

- [x] **P217** — Add looped background music to `TypingSpeedGame.jsx`: a `useRef`-held looping
      `Audio` instance for `assets/sound/typing background music.mp3`, started in a mount-only
      `useEffect` and paused/cleaned up on unmount — playing for as long as the Typing Speed Test
      view stays open, regardless of phase.
      **Pass condition:** opening the game starts the music; navigating back to the arcade hub (or
      closing the Games window) stops it; `verify` passes.

---

## PHASE 44 — TYPING GAME-OVER CARD: BIGGER/BOLDER SCORE, REPOSITIONED

_Requested by Sonny on 2026-08-20 from an annotated reference screenshot of the card: the small
`SCORE`/`LEVEL` inline numbers from Phase 43 (P214) were hard to read; move to one large, bold,
outlined number in the blank keycap row directly below "LEVEL" (row 3), replacing both old slots.
Measured directly off the real 600×600 asset (same pixel-scan technique as before): row 3's blank
keycaps run y≈344–372 (vertical center y≈358), centered under "LEVEL" at x≈308 — same x Sonny's
reference screenshot shows the number sitting at. The outline uses a layered `text-shadow` (not
`-webkit-text-stroke`, which Firefox doesn't support) so it renders consistently everywhere._

- [x] **P218** — In `src/components/games/typing/TypingGameOverOverlay.jsx`: remove the
      `SCORE_SLOT`/`LEVEL_SLOT` constants and their two `<span>` overlays; add a single
      `SCORE_VALUE_SLOT = { x: 308, y: 358 }` rendering the `score` prop at `text-5xl font-black
text-yellow-400` with an 8-direction black `textShadow` outline (drop the now-unused `level`
      prop).
      **Pass condition:** standalone render shows one big, bold, black-outlined yellow number
      centered in row 3 below "LEVEL", matching Sonny's reference screenshot; `verify` passes.

- [x] **P219** — Update `src/components/games/typing/TypingSpeedGame.jsx`'s
      `<TypingGameOverOverlay>` call to drop the now-removed `level` prop (keep `score`).
      **Pass condition:** reaching game-over in the browser shows the new large styled number in
      its new position with no console errors; `verify` passes.

---

## PHASE 45 — MEMORY FLIP CARD REDESIGN (LEVEL/LIVES SURVIVAL CLIMB)

_Requested by Sonny on 2026-08-20: turn the single-board speed-run into a leveling survival climb,
mirroring the Typing Speed Test's Phase 42 redesign. Confirmed with Sonny across a design Q&A:_

1. _Board size: `tiles(n) = 4n`, `pairs(n) = 2n` for level `n` (level 1 = 4 tiles/2 pairs, +4 tiles
   every level after). Once a level's pair requirement would exceed the icon pool size (or a
   32-pair/64-tile practical ceiling — comfortably fits the existing 1200×800 Games window,
   whichever is smaller), the board holds steady at that pair count for every level after instead
   of growing further._
2. _Icons: every board build (including level 1 on every replay) draws a fresh random subset of
   that level's required pair-count from `memoryCardIcons.js`, not a fixed set — so no two runs
   show the same icons. Sonny is expanding `memoryCardIcons.js` with real uploaded icon assets
   (SVG preferred, 256×256 PNG fallback, matching the icon-asset convention in CLAUDE.md §3)._
3. _Lives replace the old plain move-counter as the fail condition: one shared pool of 5 lives for
   the whole climb, never replenished or reset per level. Every mismatched pair costs 1 life;
   reaching 0 ends the run immediately, regardless of which level it happens on. The existing move
   counter stays visible as a stat but no longer gates anything — moves are unlimited._
4. _Scoring pivot: since this is no longer a single-board speed run, the leaderboard flips from
   `scoreLabel: 'Fastest Time'` / `sortOrder: 'asc'` to `scoreLabel: 'Highest Level'` /
   `sortOrder: 'desc'`, reporting fully-completed levels (0 if level 1 is never finished) — same
   convention already used for the Typing Speed Test's Phase 42 pivot._
5. _`buildShuffledDeck(icons)` in `memoryDeck.js` is untouched (it already accepts a plain icon
   array) — a new pure helper picks the random subset before calling it._

- [x] **P220** — Create `src/utils/games/memoryLevels.js`: pure functions `pairsForLevel(level)`
      (`2 * level`) and `boardPairsForLevel(level, iconPoolSize, maxPairs = 32)` (the smallest of
      `pairsForLevel(level)`, `iconPoolSize`, and `maxPairs` — the real pair count a given level's
      board should use). Co-located `memoryLevels.test.js` covering a below-cap level and an
      above-cap level.
      **Pass condition:** `npm run test` shows both cases passing; `verify` passes.

- [x] **P221** — Add `pickRandomIcons(pool, count)` to `src/utils/games/memoryDeck.js`: Fisher-Yates
      shuffle the pool (reusing the existing internal `shuffle` helper) and return the first
      `count` entries. Add a case to `memoryDeck.test.js` asserting the result has `count` unique
      entries all drawn from `pool`.
      **Pass condition:** `npm run test` shows the new case passing; `verify` passes.

- [x] **P222** — Create `src/components/games/memory/MemoryHud.jsx`: presentational header row
      showing a Level badge, a life-icon row (❤️ for remaining lives, 🖤 for lost ones, count from
      a `lives` prop), Moves, and Time — replacing the plain `<h2>`/stats line currently inline in
      `MemoryFlipGame.jsx`.
      **Pass condition:** standalone render with sample `level`/`lives`/`moves`/`elapsedMs` props
      shows all four correctly; `verify` passes.

- [x] **P223** — Rewrite the core loop in `src/components/games/memory/MemoryFlipGame.jsx`: add
      `level` (starts 1) and `lives` (starts 5) state; build each board via
      `pickRandomIcons(memoryCardIcons, boardPairsForLevel(level, memoryCardIcons.length))` then
      `buildShuffledDeck`, rebuilding whenever `level` changes (including first mount); on a
      mismatch, decrement `lives` instead of only counting the move; when `lives` reaches 0, enter
      a `'game-over'` phase; when a board is fully matched, advance to `level + 1` (new board,
      lives carry over, per-level move/timer state resets) instead of ending the run.
      **Pass condition:** losing all 5 lives (across any number of levels) ends the run; clearing a
      board with lives remaining advances to a harder level with a freshly randomized icon set;
      `verify` passes.

- [x] **P224** — Wire the game-over overlay in `MemoryFlipGame.jsx`: show the level reached, submit
      `submitScore('memory-flip', { value: level - 1, sortOrder: 'desc' })`, and "Play Again" resets
      `level` to 1 and `lives` to 5 with a fresh random board. Update `src/data/gamesCatalog.js`'s
      `memory-flip` entry: `scoreLabel: 'Highest Level'`, `sortOrder: 'desc'`, tagline reflecting the
      survival-climb format.
      **Pass condition:** running out of lives shows the level reached and an updated "Highest
      Level" leaderboard; Play Again restarts a fresh climb from level 1; `verify` passes.

- [x] **P225** — Make the board grid in `MemoryFlipGame.jsx` responsive to tile count: derive a
      column count from the current level's tile total (capped at 8 columns) instead of the fixed
      `grid-cols-4`/`max-w-md`, so boards from 4 tiles up to the 64-tile cap all lay out sensibly
      inside the 1200×800 Games window.
      **Pass condition:** level 1 shows a small centered 2×2 board, a high level near the cap shows
      an 8-wide board that still fits on screen without scrolling; `verify` passes.

---

## PHASE 46 — TRIM TO 3 GAMES, MEMORY FLIP: REAL ICONS + THUMBNAIL + FLIP ANIMATION + STATS

_Requested by Sonny on 2026-08-20: drop Endless Runner and 2048 from the arcade (keep Flappy Bird,
Typing Speed Test, Memory Flip Card), give Memory Flip Card a real hub thumbnail
(`youtuber memory flip thumbnail.png`, already dropped into
`src/components/games/memory/assets/components/`), swap its emoji card faces for real icon
images from `src/components/games/memory/assets/flip/` (empty right now — Sonny is dropping
files in; wired via Vite's `import.meta.glob` so any file added there is picked up automatically,
no code change needed per icon), add a real 3D flip animation for cards appearing/disappearing,
and surface Best Score + Total Plays (already tracked by `GamesContext`/`gameScores.js` for every
game, just not shown inside Memory Flip's own HUD yet)._

- [x] **P226** — Remove Endless Runner and 2048 from the arcade: delete
      `src/components/games/runner/`, `src/components/games/twenty48/`,
      `src/utils/games/runnerPhysics.js` (+test), `src/utils/games/twenty48Logic.js` (+test);
      remove their entries from `src/data/gamesCatalog.js`; remove their imports/`GAME_COMPONENTS`
      entries from `src/components/GamesApp.jsx`.
      **Pass condition:** the arcade hub shows exactly 3 games (Flappy Bird, Typing Speed Test,
      Memory Flip Card); `verify` passes with no dangling-import errors.

- [x] **P227** — Wire Memory Flip Card's real thumbnail in `src/data/gamesCatalog.js`: import
      `youtuber memory flip thumbnail.png` from
      `src/components/games/memory/assets/components/` (matching the `flappy-bird`/`typing-speed`
      `thumbnail` pattern) and add it to the `memory-flip` entry.
      **Pass condition:** the arcade hub renders Memory Flip Card as a featured tile with the real
      thumbnail image, Best Score, and Total Plays — matching Flappy Bird's/Typing Speed Test's
      tile; `verify` passes.

- [x] **P228** — Replace `src/data/memoryCardIcons.js`'s emoji list with real images: use
      `import.meta.glob('./flip/*.{png,jpg,jpeg,svg,webp}', { eager: true, import: 'default' })`
      against `src/components/games/memory/assets/flip/` to build the icon pool at build time (so
      any file Sonny drops in that folder is picked up automatically); update
      `src/components/games/memory/MemoryCard.jsx` to render the revealed icon as an `<img>`
      instead of raw emoji text.
      **Pass condition:** with at least one image file in `assets/flip/`, the board renders that
      image on flipped/matched cards; `verify` passes. (Flagged to Sonny: the folder is empty right
      now, so the game has zero icons to deal until real files land there.)

- [x] **P229** — Add a real 3D flip animation to `MemoryCard.jsx` via `framer-motion`: a
      `perspective`-wrapped container with a front face (icon) and back face (blank card back),
      each `backface-visibility: hidden`, animated by rotating the inner element 0↔180deg on
      `isRevealed` change.
      **Pass condition:** flipping a card in the browser visibly rotates it in 3D to reveal the
      icon, and flipping back (mismatch) rotates it back to the blank face, instead of an instant
      swap; `verify` passes.

- [x] **P230** — Add Best Score and Total Plays to `src/components/games/memory/MemoryHud.jsx`
      (new `bestScore`/`totalPlays` props, a second stats row) wired from
      `useGames().getTopScores('memory-flip')`/`getTotalPlays('memory-flip')` in
      `MemoryFlipGame.jsx`.
      **Pass condition:** the in-game HUD shows the current Best Score and Total Plays alongside
      Level/Lives/Moves/Time, updating after each completed run; `verify` passes.

---

## PHASE 47 — MEMORY FLIP CARD: SOUND EFFECTS

_Requested by Sonny on 2026-08-20: flip/correct/wrong sound effects plus looping background
music, matching the same `useRef`-held `Audio` pattern already used for the Typing Speed Test
(Phase 43, P216). Sonny dropped `correct.MP3`, `wrong.MP3`, and `flip card.MP3` into
`src/components/games/memory/assets/audio/` — `flip background music` is not in that folder yet,
so P232 is blocked until that file lands._

- [x] **P231** — Add flip/correct/wrong sound effects to `MemoryFlipGame.jsx`: three
      `useRef`-held `Audio` instances created in a mount-only `useEffect` from
      `assets/audio/{flip card.MP3, correct.MP3, wrong.MP3}`; play the flip sound on every card
      flip in `handleFlip`, the correct sound when a pair matches, the wrong sound the moment a
      pair mismatches (each via `currentTime = 0` then `.play().catch(() => {})`).
      **Pass condition:** flipping a card audibly plays the flip sound, a matching pair plays the
      correct sound, a mismatched pair plays the wrong sound; `verify` passes.

- [x] **P232** — Add looped background music to `MemoryFlipGame.jsx` from
      `assets/audio/flip background music.mp3` (same pattern as Phase 43's P217 — start on
      mount, stop/cleanup on unmount, playing for as long as Memory Flip Card stays open).
      **Pass condition:** opening Memory Flip Card starts the looping music; leaving the game
      stops it with no console errors; `verify` passes.

---

## PHASE 48 — MEMORY FLIP CARD: IMAGE GAME-OVER CARD

_Requested by Sonny on 2026-08-20: replace the plain text "Game Over" screen with an image-based
overlay card (`game over.png`, dropped into
`src/components/games/memory/assets/components/`), matching the same pattern already used for
Typing Speed Test (Phase 43/44) and Flappy Bird — pixel-measured score slot and invisible
Replay/Exit hit-areas over the baked-in card art, layered over the (now-frozen) board instead of
replacing it outright. Pixel rects below were measured directly off the 600x600 `game over.png`
by scanning its alpha channel and cropping candidate regions for visual confirmation, same
technique the earlier phases describe:_

- _`SCORE_VALUE_SLOT: { x: 300, y: 243 }` — center of the blank metallic plate below the baked-in
  "SCORE LEVEL" label. The card has one label over one blank slot (same situation Phase 44 solved
  for Typing), so it shows `level - 1` (levels cleared), the same value submitted to the
  leaderboard — dropping the separate plain-text leaderboard panel entirely, matching Typing's
  card-only precedent._
- _`REPLAY_RECT: { left: 70, top: 272, width: 230, height: 118 }`,
  `EXIT_RECT: { left: 308, top: 272, width: 155, height: 118 }` — the baked-in REPLAY/EXIT button
  graphics. Exit now actually exits (Memory Flip's `onExit` prop, already passed by `GamesApp.jsx`
  to every game, was previously ignored)._

- [x] **P233** — Create `src/components/games/memory/MemoryGameOverOverlay.jsx`: renders
      `game over.png` at its native 600x600 inside an `absolute inset-0` dark backdrop, overlaying
      a `score` prop value at `SCORE_VALUE_SLOT` (big bold outlined yellow number, matching
      `TypingGameOverOverlay.jsx`'s styling) and invisible `Replay`/`Exit` buttons at
      `REPLAY_RECT`/`EXIT_RECT` calling `onReplay`/`onExit`.
      **Pass condition:** standalone render with a sample `score` shows the number in the right
      slot; clicking each button fires its callback; `verify` passes.

- [x] **P234** — In `src/components/games/memory/MemoryFlipGame.jsx`: accept an `onExit` prop;
      delete the plain full-screen "Game Over" block and its `GameLeaderboard` usage; always
      render the HUD + board (wrapped in a `relative` container) and layer
      `MemoryGameOverOverlay` on top (`score={level - 1}`, `onReplay={handlePlayAgain}`,
      `onExit={() => onExit?.()}`) whenever `lives <= 0`.
      **Pass condition:** losing all lives shows the board frozen behind the new image card with
      the correct levels-cleared number; Replay restarts a fresh climb; Exit returns to the arcade
      hub; `verify` passes.

- [x] **P235** — Wire `game background.jpg` (dropped into
      `src/components/games/memory/assets/components/`) as the real backdrop of
      `MemoryFlipGame.jsx`, replacing the plain `bg-[#0d0d0d]` fill — same `bg-cover bg-center`
      inline-`backgroundImage` pattern already used for Typing Speed Test's classroom background.
      **Pass condition:** the Memory Flip play area shows the real background image behind the
      HUD/board instead of a flat dark fill; `verify` passes.

- [x] **P236** — Fix HUD legibility regression from P235: wrap `MemoryHud.jsx`'s content in a
      translucent dark rounded panel (`bg-black/60`, `backdrop-blur-sm`) so Level/Moves/Time/Best
      Score/Total Plays stay readable against the busy background photo instead of sitting as
      bare text directly on it.
      **Pass condition:** all HUD text is clearly legible over the background image in the
      browser; `verify` passes.

---

## PHASE 49 — ARCADE RATING SYSTEM

_Requested by Sonny on 2026-08-20, from a screenshot mockup of the arcade hub with a per-game
5-star average rating badge and a "View/Add Rate" button. Confirmed with Sonny: visitor name is
captured once via a required name gate on first opening the Games icon and remembered forever in
this browser (localStorage, same pattern as `gameScores.js`); the same name can submit more than
one rating/comment on the same game, every submission counts toward the average; ratings/comments
are seeded with 8-10 mock entries per game; scale is 1-5 stars, matching Memory Wall's existing
star control. Storage is localStorage-backed per-browser for now (mirrors the existing
`gameScores.js`/`arcade:` key convention) — Sonny explicitly wants this swapped for a real cloud
database later, tracked in the Backlog below, not a new architectural layer now._

- [x] **P237** — Create `src/data/gameRatingSeeds.js`: exports a `gameRatingSeeds` object keyed by
      each `gamesCatalog` id (`flappy-bird`/`typing-speed`/`memory-flip`), each an array of 8-10
      mock `{ id, name, rating (1-5), comment, timestamp (ISO string) }` entries, generic
      placeholder names/comments (not real visitor data).
      **Pass condition:** the file exports a well-formed object with 8-10 entries per game id;
      `verify` passes.

- [x] **P238** — Create `src/utils/gameRatings.js` (mirroring `gameScores.js`'s shape) with
      `readRatings(gameId)` (returns the stored `arcade:ratings:<gameId>` list from localStorage,
      seeding it from `gameRatingSeeds.js` on first read when nothing is stored yet, falling back
      to the seed list on corrupt data), `addRating(gameId, { name, rating, comment })` (appends a
      new entry with a generated id/timestamp, persists, returns the updated list), and
      `getAverageRating(ratings)` (pure helper: mean of `rating` values rounded to 1 decimal, plus
      count; returns `null` average for an empty list); add `gameRatings.test.js` covering
      write-then-read-back, the corrupt-data fallback, and the average computation.
      **Pass condition:** `npm run test` shows all new cases passing; `verify` passes.

- [x] **P239** — Create `src/utils/gameVisitor.js`: `readVisitorName()`/`writeVisitorName(name)`
      reading/writing a single `arcade:visitorName` localStorage string (same try/catch-safe
      pattern as `gameScores.js`); add `gameVisitor.test.js` covering write-then-read-back and the
      no-value-stored case returning `null`.
      **Pass condition:** `npm run test` shows both cases passing; `verify` passes.

- [x] **P240** — Extend `src/context/GamesContext.jsx`: add `ratingsByGame` state plus
      `getRatings(gameId)`/`getAverageRating(gameId)`/`submitRating(gameId, { name, rating, comment })`
      wired to `gameRatings.js` (from P238), and `visitorName` state (initialized from
      `readVisitorName()`) plus `setVisitorName(name)` (writes via `writeVisitorName` then updates
      state) wired to `gameVisitor.js` (from P239); expose all five from the context value.
      **Pass condition:** a component under `GamesProvider` can read seeded ratings/average, submit
      a new rating and see the average update, and read/set the visitor name; `verify` passes.

- [x] **P241** — Create `src/components/games/GamesNameGate.jsx`: a modal (mirroring
      `GmailGuestGate.jsx`'s structure/styling) asking only for the visitor's name, required,
      Continue disabled until non-empty, with a Cancel action that just dismisses the gate.
      **Pass condition:** standalone render shows the Name input and a Continue button disabled
      until filled; `verify` passes.

- [x] **P242** — Wire the name gate into `src/components/Desktop.jsx`: add `gamesGateOpen` state;
      in `handleIconOpen`, when `id === 'games'` and `useGames().visitorName` is empty, open the
      gate instead of the app (same branch shape as the existing `gmail`/`gmailGateOpen` check);
      render `GamesNameGate` when `gamesGateOpen` is true, with `onSubmit` calling `setVisitorName`
      then `openApp('games')`, and `onCancel` closing the gate.
      **Pass condition:** double-clicking Games with no stored name shows the name gate; submitting
      it opens Games and stores the name; reopening Games afterward (or after a page reload) skips
      the gate; `verify` passes.

- [x] **P243** — Create `src/components/games/GameRatingModal.jsx`: a centered modal (fixed
      backdrop, `stopPropagation` on click/context-menu like other in-window modals) showing the
      game's title, a scrollable list of its ratings/comments from `useGames().getRatings(gameId)`
      (newest first — name, star display, comment, formatted timestamp), an "Add your rating" form
      (a clickable 1-5 star input reusing Memory Wall's `StarRatingInput` pattern, a comment
      textarea, and a Submit button that calls `submitRating(gameId, { name: visitorName, rating,
comment })` and clears the form), and a Close button.
      **Pass condition:** standalone render shows the seeded ratings list and the add-rating form;
      submitting a new rating appears in the list immediately; Close fires its callback; `verify`
      passes.

- [x] **P244** — Update `src/components/games/GamesHub.jsx`: add a title to `FeaturedGameTile`
      (matching `GameTile`'s existing `<h3>`) and a real average-rating badge (stars + numeric
      average, or "No ratings yet") to both tile types via `getAverageRating(game.id)`; add a
      "View/Add Rate" button below each tile (`stopPropagation` so it doesn't also trigger
      `onSelectGame`) that opens `GameRatingModal` (from P243) for that game, and render the modal
      when a game is selected for rating.
      **Pass condition:** every game tile shows its real computed average rating and a working
      "View/Add Rate" button; clicking it opens the modal for the right game; `verify` passes.
      _(One cohesive tile-plus-modal-wiring update — may exceed the usual ≤50-line guidance,
      matching the `PaintToolbar.jsx` precedent in LESSONS.md.)_

---

## PHASE 50 — ARCADE LOGIN/LOGOUT, TIME GREETINGS, SETTINGS MENU

_Requested by Sonny on 2026-08-20, extending Phase 49: a confirmation toast on rating submit; the
existing name-gate reframed as a Login/Logout flow (still no real backend auth — logging out just
clears the stored `arcade:visitorName` and closes the Games window, matching CLAUDE.md §2's
`Auth: none`); a "Logged in as {name}" line plus a random, time-of-day greeting in the Arcade hub
header; and a Settings menu (gear button) with Sound settings (a real mute toggle wired into all
three games' existing `Audio` refs, per Sonny's answer), Background settings (a few preset
hub-only backgrounds, per Sonny's answer — not the OS desktop wallpaper), Logout, About, and
Contact Developer (Zoom Chat / Gmail, reusing the existing apps via `onOpenZoomChat`/`onOpenGmail`,
same pattern as `SettingsApp.jsx`'s Get Support page)._

- [x] **P255** — Add `clearVisitorName()` to `src/utils/gameVisitor.js` (`localStorage.removeItem`
      on the existing key, same try/catch-safe pattern) with a covering case in
      `gameVisitor.test.js`; add `logout()` to `src/context/GamesContext.jsx` that calls it and
      resets `visitorName` state to `null`, exposed from the context value.
      **Pass condition:** `npm run test` shows the new case passing; a component under
      `GamesProvider` calling `logout()` sees `visitorName` become `null` and the localStorage key
      cleared; `verify` passes.

- [x] **P256** — Create `src/utils/arcadeSettings.js`: `readArcadeSettings()`/
      `writeArcadeSettings(partial)` reading/writing a single `arcade:settings` localStorage JSON
      object (`{ soundMuted: boolean, backgroundId: string }`, defaults `false`/`'midnight'`,
      corrupt-data and partial-merge safe); add `arcadeSettings.test.js` covering the defaults,
      write-then-read-back, and the corrupt-data fallback. Extend `GamesContext.jsx` with
      `soundMuted`/`setSoundMuted(muted)` and `backgroundId`/`setBackgroundId(id)` state
      (initialized from `readArcadeSettings()`, each setter also persisting via
      `writeArcadeSettings`), exposed from the context value.
      **Pass condition:** `npm run test` shows all new cases passing; a component under
      `GamesProvider` can read/set both values and see them persist across a fresh `readArcadeSettings()` call; `verify` passes.

- [x] **P257** — Create `src/data/arcadeGreetings.js` (greeting message templates, each containing
      a `{name}` placeholder, grouped into `morning`/`afternoon`/`evening`/`night` arrays of 4-5
      entries) and `src/utils/greeting.js` exporting `getTimeBucket(hour)` (pure: hour → bucket
      name) and `getGreeting(hour, name, randomFn = Math.random)` (picks the bucket's template list
      and a random entry via `randomFn`, substituting `{name}`); add `greeting.test.js` covering
      each bucket's hour boundaries and that a fixed `randomFn` deterministically picks the
      first/last template.
      **Pass condition:** `npm run test` shows all new cases passing; `verify` passes.

- [x] **P258** — Create `src/data/arcadeBackgrounds.js`: 4 preset hub-only backgrounds (id/label/
      Tailwind `className`), first one (`midnight`) matching the hub's current `bg-[#0d0d0d]`
      fill.
      **Pass condition:** file exports a well-formed array of 4 entries; `verify` passes.

- [x] **P259** — Update `src/components/games/GamesNameGate.jsx`: reword as a Login screen
      ("Login to the Arcade" heading, "Login" button label instead of "Continue"), no behavior
      change.
      **Pass condition:** standalone render shows the new copy; `verify` passes.

- [x] **P260** — Add a "Rate has been added" confirmation toast to
      `src/components/games/GameRatingModal.jsx` (mirroring `PaintApp.jsx`'s
      `showSavedToast`/`setTimeout` pattern): shown for ~2s after a successful `submitRating` call.
      **Pass condition:** submitting a rating in the browser shows the toast, which disappears on
      its own after ~2s; `verify` passes.

- [x] **P261** — Create `src/components/games/GamesSettingsMenu.jsx`: a dropdown panel (anchored
      under a gear trigger, closes on outside click) with a Sound section (mute toggle bound to
      `soundMuted`/`setSoundMuted`), a Background section (the `arcadeBackgrounds.js` presets as
      swatch buttons calling `setBackgroundId`, checkmark on the active one), a Logout button
      (calls an `onLogout` prop), an expandable About section (generic Arcade blurb), and a Contact
      Developer section with two buttons calling `onOpenZoomChat`/`onOpenGmail` props.
      **Pass condition:** standalone render shows all five sections; toggling sound, picking a
      background, and clicking Logout/Contact Developer's buttons each fire their expected
      callback; `verify` passes.
      _(One cohesive settings-panel component — may exceed the usual ≤50-line guidance, same
      precedent as P244/`PaintToolbar.jsx`.)_

- [x] **P262** — Wire `src/components/Desktop.jsx`: destructure `logout` from `useGames()`; pass
      `onOpenGmail={() => handleIconOpen('gmail')}`, `onOpenZoomChat={() => handleIconOpen('zoom-chat')}`,
      and `onLogout={() => { logout(); shared.onClose() }}` into the `games` branch's `<GamesApp>`.
      **Pass condition:** these three props reach `GamesApp` for the open Games window; `verify`
      passes.

- [x] **P263** — Update `src/components/GamesApp.jsx`'s hub view: accept `onOpenGmail`/
      `onOpenZoomChat`/`onLogout` props; add a header row showing "Logged in as {visitorName}" plus
      a random time-of-day greeting from `getGreeting()` (from P257, using `new Date().getHours()`)
      next to the existing Arcade title; add the gear button rendering `GamesSettingsMenu` (from
      P261), passing the three props through plus `soundMuted`/`setSoundMuted`/`backgroundId`/
      `setBackgroundId` from `useGames()`; apply the selected background's `className` (from
      `arcadeBackgrounds.js`) to the hub container in place of the hardcoded `bg-[#0d0d0d]`.
      **Pass condition:** the hub shows the login/greeting line and a working settings gear;
      picking a background visibly changes the hub's background; Logout closes the Games window;
      `verify` passes.

- [x] **P264** — Wire real sound muting into `src/components/games/flappybird/FlappyBirdGame.jsx`
      and `FlappyBirdCanvas.jsx`: read `soundMuted` from `useGames()`; gate every `.play()` call on
      `!soundMuted`; pause the looping background-music ref immediately when `soundMuted` becomes
      `true` (resume it if `phase === 'playing'` when it becomes `false`).
      **Pass condition:** muting sound before/during a Flappy Bird run stops the background music
      and jump sound from playing; unmuting mid-run resumes the background music; `verify` passes.

- [x] **P265** — Wire real sound muting into
      `src/components/games/typing/TypingSpeedGame.jsx` and `TypingTestArea.jsx`: same pattern as
      P264 — gate the background-music and key-sound `.play()` calls on `!soundMuted`, lift the
      background-music `Audio` into a ref so a `soundMuted`-keyed effect can pause/resume it.
      **Pass condition:** muting sound stops Typing Speed Test's background music and key sounds;
      unmuting resumes the background music; `verify` passes.

- [x] **P266** — Wire real sound muting into
      `src/components/games/memory/MemoryFlipGame.jsx`: same pattern as P264/P265 — gate the
      flip/correct/wrong one-shot sounds and the looping background music on `!soundMuted`, lift
      the background-music `Audio` into a ref so a `soundMuted`-keyed effect can pause/resume it.
      **Pass condition:** muting sound stops Memory Flip Card's sound effects and background music;
      unmuting resumes the background music; `verify` passes.

---

## PHASE 51 — MOBILE-ADAPTED LAYOUT (RETROACTIVE, ALL COMPONENTS)

_Requested by Sonny on 2026-08-20: everything built so far, and everything built from here on,
must also work on mobile. Confirmed with Sonny: scope is "Adapted mobile layout" — above a
breakpoint, existing desktop behavior (draggable icons, `react-rnd` 8-direction resizable floating
windows, right-click context menus, hover-only tooltips) stays exactly as-is; below the breakpoint,
icons become a simple scrollable list (no drag), windows open full-screen instead of
floating/resizable, right-click menus become tap-triggered action sheets (a small "⋮" button in
place of relying on right-click/long-press), and hover-only affordances become always-visible or
are suppressed. A codebase survey found zero existing responsive infrastructure (no
`tailwind.config`, no breakpoint hook, no touch handling anywhere except `PaintCanvas.jsx`, which
already uses Pointer Events and needs no change) — this phase builds that infrastructure from
scratch, then applies it across the shared shell and all ~14 apps. The breakpoint is Tailwind v4's
default `md` (768px, chosen over `sm` since floating multi-window desktop chrome doesn't fit
tablets any better than phones) — implemented as a `matchMedia` hook rather than a Tailwind config
edit, since Tailwind v4 has no config file in this project (`@tailwindcss/vite` only). Judgment
calls made without a further round-trip, matching the "Claude's call" precedent elsewhere in this
file: the empty-desktop right-click menu is suppressed below the breakpoint (there's no meaningful
empty surface once icons are a list); the taskbar's decorative/inert left-launcher and
Music/Terminal/Messaging pinned icons (never wired to anything since P14/P15) are hidden below the
breakpoint to save space, while the real, wired Settings button stays; a tapped icon/tile opens
directly rather than requiring a double-tap, matching normal mobile app-icon behavior; the purely
decorative `VirtualKeyboard.jsx` (no click handlers, visual-only) is hidden below the breakpoint
rather than squeezed. `src/hooks/` is created here — CLAUDE.md §3 already anticipated this as the
first real hook.

- [x] **P267** — Create `src/hooks/useIsMobile.js`: a hook returning `true`/`false` from
      `window.matchMedia('(max-width: 767px)')`, subscribing to its `change` event and cleaning up
      the listener on unmount (SSR-safe default of `false` isn't needed — this is a client-only
      Vite SPA). Update CLAUDE.md §3 to remove the "`src/hooks/` doesn't exist yet" note now that
      it does.
      **Pass condition:** a component calling the hook reflects `true`/`false` correctly when the
      browser viewport is resized across 767/768px; `verify` passes.

- [x] **P268** — In `src/components/Window.jsx`, when `useIsMobile()` is true: force the window
      into the existing maximize layout (full viewport minus taskbar height) on mount and whenever
      the viewport resizes, and pass `Rnd` `disableDragging` plus every `enableResizing` direction
      as `false` (no drag, no resize handles); minimize/maximize-toggle/close stay working. Above
      the breakpoint, behavior is unchanged.
      **Pass condition:** resizing the browser below 768px with a window open snaps it to
      full-screen with dragging/resize handles inert; above 768px nothing changes; `verify` passes.

- [x] **P269** — In `src/components/ResumeWindow.jsx` (hand-rolled, not `Rnd`-based), when
      `useIsMobile()` is true render as `fixed inset-0` instead of the fixed `w-[420px]` centered
      box; above the breakpoint, unchanged.
      **Pass condition:** below 768px Resume fills the viewport with no horizontal overflow; above
      768px it's pixel-identical to before; `verify` passes.

- [x] **P270** — In `src/components/ContextMenu.jsx`, add a `touchstart` listener alongside the
      existing `mousedown` outside-close listener (same handler function, registered for both
      events) so a menu opened via a tap-triggered mobile entry point still dismisses on tap-outside.
      **Pass condition:** opening a context menu and tapping outside it closes it in a touch-emulated
      viewport; existing mouse behavior is unchanged; `verify` passes.

- [x] **P271** — In `src/components/DesktopIcon.jsx`, add a `variant` prop (`'grid' | 'list'`,
      default `'grid'`); when `'list'`, render a static horizontal row (image/glyph + label, no
      absolute positioning, no `framer-motion` `drag`) instead of today's absolutely-positioned
      draggable tile. Default/grid rendering must stay pixel-identical.
      **Pass condition:** rendering with `variant="list"` shows a plain row with no drag handlers
      attached; default rendering is unchanged; `verify` passes.

- [x] **P272** — In `src/components/DesktopIcon.jsx`'s `'list'` variant, tapping the row calls the
      existing open handler directly (instead of only selecting), and add a trailing "⋮" button that
      opens the existing `ContextMenu` with the same item set used today, so the row doesn't depend
      on right-click.
      **Pass condition:** in list variant, tapping the row opens the app and tapping "⋮" shows the
      context menu; `verify` passes.

- [x] **P273** — In `src/components/Desktop.jsx`, when `useIsMobile()` is true render the 13 icons
      as a single scrollable `variant="list"` column (no absolute `x`/`y` positioning, no marquee-
      select wiring, no drag-collision logic) instead of the free-positioned grid; above the
      breakpoint, unchanged.
      **Pass condition:** below 768px all 13 icons show as a scrollable list, each opening its app
      on tap; above 768px the existing draggable grid is unchanged; `verify` passes.

- [x] **P274** — In `src/components/Desktop.jsx`, suppress the empty-desktop right-click context
      menu when `useIsMobile()` is true; above the breakpoint, unchanged.
      **Pass condition:** below 768px the desktop background menu no longer appears; above 768px
      unchanged; `verify` passes.

- [x] **P275** — In `src/components/Taskbar.jsx`, when `useIsMobile()` is true hide the left
      launcher row (Start/Widgets/Search/File Explorer) and the decorative Music/Terminal/Messaging
      pinned icons, keeping the real Settings button, the running-app buttons, and `SystemTray`
      visible; above the breakpoint, unchanged.
      **Pass condition:** below 768px the taskbar shows only Settings, running-app icons, and the
      system tray; above 768px unchanged; `verify` passes.

- [x] **P276** — In `src/components/Taskbar.jsx`'s `RunningAppButton`, suppress the hover-triggered
      `TaskbarPreview` entirely when `useIsMobile()` is true (moot once windows are full-screen);
      tapping still calls the existing focus/restore handler; above the breakpoint, unchanged.
      **Pass condition:** below 768px tapping a running-app icon still focuses/restores its window
      with no preview popup; above 768px hover preview still works; `verify` passes.

- [x] **P277** — In `src/components/explorer/ExplorerBody.jsx`, when `useIsMobile()` is true stack
      the `w-36` quick-access sidebar as a horizontally scrollable strip above the content pane
      instead of beside it; above the breakpoint, unchanged.
      **Pass condition:** below 768px This PC/Developer Lab show the sidebar as a horizontal strip
      above the folder content with no page overflow; above 768px unchanged; `verify` passes.

- [x] **P278** — In `src/components/explorer/Tile.jsx`, add a trailing "⋮" button (mirroring
      P272) that opens the same context menu already wired today, and thread an `isMobile` prop
      down from `src/components/explorer/ExplorerBody.jsx` (which already computes it via
      `useIsMobile()` since P277) through `RootView.jsx` so a single tap opens the tile directly
      instead of requiring double-click when mobile.
      **Pass condition:** below 768px tapping a tile opens it and "⋮" shows the context menu; above
      768px existing select/double-click/right-click behavior is unchanged; `verify` passes.

- [x] **P279** — In `src/components/VisitorArtsApp.jsx`, when `useIsMobile()` is true stack the
      `w-60` sidebar above the grid (full width) and switch the grid from `grid-cols-4` to
      `grid-cols-2`; above the breakpoint, unchanged.
      **Pass condition:** below 768px the sidebar stacks above a 2-column card grid with no
      overflow; above 768px unchanged; `verify` passes.

- [x] **P280** — In `src/components/VisitorArtsApp.jsx`'s `ArtCard`, when `useIsMobile()` is true
      always show the download/delete buttons instead of `hidden group-hover:flex`; above the
      breakpoint, unchanged.
      **Pass condition:** below 768px each card's download/delete buttons are visible without
      hovering; above 768px they still require hover; `verify` passes.

- [x] **P281** — In `src/components/MemoryWallApp.jsx`, when `useIsMobile()` is true stack the
      `w-72` composer above the notes area (full width) and switch the notes grid from
      `grid-cols-2` to a single column; above the breakpoint, unchanged.
      **Pass condition:** below 768px the composer sits above a single-column notes list with no
      overflow; above 768px unchanged; `verify` passes.

- [x] **P282** — In `src/components/MusicLabApp.jsx` / `src/components/musicLab/MusicLabSidebar.jsx`,
      when `useIsMobile()` is true collapse the `w-60` library rail into a toggleable overlay panel
      (a small header button shows/hides it) instead of a permanent side column; above the
      breakpoint, unchanged.
      **Pass condition:** below 768px the sidebar is hidden by default and opens as an overlay via
      the toggle button; above 768px unchanged; `verify` passes.

- [x] **P283** — In `src/components/musicLab/MusicLabPlayerBar.jsx`, when `useIsMobile()` is true
      collapse the fixed `w-56`/`w-40` outer columns into a single simplified row (art + title,
      Play/Previous/Next only — drop shuffle/repeat/cast/volume) instead of the 3-column bar; above
      the breakpoint, unchanged.
      **Pass condition:** below 768px the player bar is a single row with no horizontal overflow
      and Play/Previous/Next still work; above 768px unchanged; `verify` passes.

- [x] **P284** — In `src/components/SettingsApp.jsx`, when `useIsMobile()` is true collapse the
      `w-56` left nav into a horizontally scrollable tab strip above the content pane instead of a
      side column; above the breakpoint, unchanged.
      **Pass condition:** below 768px the 5 nav items show as a horizontal scrollable strip and
      switching tabs still swaps content; above 768px unchanged; `verify` passes.

- [x] **P285** — In `src/components/ProjectsApp.jsx` / `src/components/projects/ProjectsCategorySidebar.jsx`
      / `src/components/projects/ProjectsHero.jsx`, when `useIsMobile()` is true stack the sidebar
      above the hero/more-list column (both full width) and drop the fixed `h-[500px]` heights in
      favor of natural/scroll-based height; above the breakpoint, unchanged.
      **Pass condition:** below 768px the sidebar, hero, and more-list stack vertically with nothing
      height-clipped; above 768px unchanged; `verify` passes.

- [x] **P286** — In `src/components/paint/PaintToolbar.jsx`, when `useIsMobile()` is true make the
      toolbar row horizontally scrollable (`overflow-x-auto`, `flex-nowrap`) instead of letting it
      overflow/clip; above the breakpoint, unchanged.
      **Pass condition:** below 768px every toolbar control stays reachable via horizontal scroll
      with nothing clipped; above 768px unchanged; `verify` passes.

- [x] **P287** — In `src/components/games/typing/VirtualKeyboard.jsx`, when `useIsMobile()` is true
      render nothing (it's purely decorative — no click handlers anywhere in the file); above the
      breakpoint, unchanged.
      **Pass condition:** below 768px the virtual keyboard no longer renders and typing still works
      via the real input; above 768px unchanged; `verify` passes.

- [x] **P288** — In `src/components/games/flappybird/FlappyBirdGame.jsx`, wrap the game-over card
      in a container that enforces the image's real aspect ratio (`aspect-[400/600]`, `w-full
max-w-[400px] max-h-full` instead of independently-clamped fixed `w-[400px] h-[600px]`) so
      width and height scale together; convert `SCORE_SLOT`/`BEST_SLOT`/`REPLAY_RECT`/`EXIT_RECT`
      from raw pixel offsets (which don't rescale with the card) to percentages of the 400×600 art,
      so the score text and the invisible Replay/Exit hit-boxes stay aligned with the art at any
      viewport size.
      **Pass condition:** shrinking the viewport to a narrow phone width keeps the invisible
      Replay/Exit hit-boxes visually aligned with the button art; `verify` passes.

- [x] **P289** — In `src/components/ContactInfoApp.jsx`, when `useIsMobile()` is true replace the
      `grid-cols-[160px_1fr]` row layout with a stacked label-then-value layout; above the
      breakpoint, unchanged.
      **Pass condition:** below 768px each contact row stacks its label above its value with no
      cramped/overflowing columns; above 768px unchanged; `verify` passes.

- [x] **P290** — In `src/components/GmailGuestGate.jsx`, change the modal's fixed `w-80` to
      `w-80 max-w-[90vw]` so it can't overflow the smallest phone viewports.
      **Pass condition:** at a 320px-wide viewport the modal fits on-screen with margin on both
      sides; `verify` passes.

- [x] **P291** — Manual verification pass: at a phone-width viewport (browser devtools device
      toolbar), open every app from the mobile icon list (Resume, This PC, Contact Info, Gmail,
      Paint, Visitor Arts, Memory Wall, Developer Lab, Settings, Music Lab, Zoom Chat, Projects,
      Games including all 3 games) and confirm each opens full-screen with no horizontal overflow
      and every control stays reachable; log any remaining rough edges found in LESSONS.md.
      **Pass condition:** every app is usable at a phone-width viewport with nothing
      clipped/unreachable; `verify` passes.
      _(Done via a real headless-Chromium pass at 390×844 against the dev server, not just
      devtools inspection. Caught and fixed a real bug in the process: `Window.jsx`'s `Rnd`
      `minWidth`/`minHeight` (480×320) were silently overriding the mobile full-screen `size` prop,
      clipping every app's title bar and toolbar at 480px on a 390px viewport — fixed by passing
      `0` for those props when `isMobile` (see LESSONS.md). Re-verified clean afterward: icon list,
      This PC, Developer Lab, Visitor Arts, Memory Wall, Music Lab, Projects, Paint, Contact Info,
      Resume, and Games (through to Flappy Bird's actual game-over screen, replayed twice, with the
      Exit hit-box confirmed both visually aligned and functionally clickable) all render full-width
      with zero horizontal overflow and zero console errors. Minor, out-of-scope cosmetic-only
      wrapping noticed but not fixed since no task covered it: Memory Wall's header row and Contact
      Info's status bar wrap a little awkwardly on narrow screens — nothing clipped or unusable.)_

---

## PHASE 52 — ARCADE LOGIN ARTWORK + LOADING SCREEN

_Requested by Sonny on 2026-08-20: use `src/components/games/login ui.jpg` (a "World of Sonny"
fantasy-styled login card, 1024×629) as the real Games login UI, and add a 2-second loading modal
between clicking Log In and the arcade actually opening, themed to the login art's dark
navy/amber-orange colors._

- [x] **P292** — Rewrite `src/components/games/GamesNameGate.jsx`: replace the plain modal with the
      `login ui.jpg` background (`aspectRatio: '1024 / 629'`, `bg-cover`), a transparent name input
      absolutely positioned (in `%`) over the art's "YOUR NAME" box, and a transparent submit button
      absolutely positioned over the art's "LOG IN" button (dimmed via a semi-transparent overlay
      while empty, a warm glow on hover once a name is entered); same `onSubmit`/`onCancel` contract
      as before.
      **Pass condition:** double-clicking Games with no stored name shows the art-based login with
      the input and button visually aligned to the art; typing a name and clicking Log In (or
      pressing Enter) still calls `onSubmit(trimmedName)`; `verify` passes.

- [x] **P293** — Create `src/components/games/GamesLoadingScreen.jsx`: a full-screen modal (dark
      navy gradient background, amber "LOADING" label, an amber/orange bar that fills 0%→100% over
      2000ms via a CSS width transition) that calls `onDone` once the 2s elapses. Wire
      `src/components/Desktop.jsx`: add `gamesLoadingName` state; `GamesNameGate`'s `onSubmit` now
      closes the gate and sets `gamesLoadingName` instead of opening Games directly; rendering
      `GamesLoadingScreen` while `gamesLoadingName` is set, whose `onDone` calls `setVisitorName`,
      clears `gamesLoadingName`, and opens the `games` app.
      **Pass condition:** clicking Log In shows the 2s loading screen (matching the login art's
      color scheme) before the arcade hub appears, logged in under the entered name; `verify`
      passes.
      _(Verified via a real headless-Chromium pass against the dev server: login screen renders
      with input/button aligned to the art, submitting shows the loading screen mid-fill at ~900ms,
      then the arcade hub opens showing "Logged in as Sonny" — zero console errors throughout.)_

---

## PHASE 53 — GMAIL LOGIN ARTWORK + ENTER-KEY GATE BYPASS FIX

_Requested by Sonny on 2026-08-20: use the new "Google" login art at
`src/assets/login ui/gmail login ui.png` for the Gmail guest gate (mirroring Phase 52's approach
for Games), and make sure the Gmail inbox can only ever appear once both an email and a name have
been provided, with the gate closing the instant Login is submitted on the name step._

- [x] **P294** — Rewrite `src/components/GmailGuestGate.jsx`: replace the hand-coded Google card
      with `gmail login ui.png` as the background (`aspectRatio: '500 / 889'`, `bg-cover`); overlay
      a transparent hitbox over the art's baked "X" for `onCancel`; on the email step, a real email
      input (`noValidate` + custom `EMAIL_PATTERN` check restored) sits over the art's email box
      and a transparent submit hitbox sits over the art's "Next" button; on the name step, a "back
      to email" chip, a real name input, and a solid redrawn "Login" button (the art has no baked
      art for this step) replace that same region — the redrawn button uses an opaque muted-gray
      fill while disabled instead of CSS `opacity`, since a translucent overlay let the baked
      "Next" text ghost through underneath.
      **Pass condition:** the email step visually matches the new art with the input/button
      aligned to it; an invalid email shows the existing inline error without advancing; a valid
      email advances to a name step whose Login button is solid (no ghosted "Next" text) and
      disabled until a name is entered; `verify` passes.

- [x] **P295** — Fix `src/components/Desktop.jsx`: the global `keydown` handler's Enter-key
      shortcut (open the single selected icon) called `openApp(id)` directly instead of
      `handleIconOpen(id)`, letting a keyboard user open Gmail or Games by selecting the icon and
      pressing Enter without ever passing through `GmailGuestGate`/`GamesNameGate` — changed the
      call to `handleIconOpen(id)` so the same gating applies regardless of input method.
      **Pass condition:** selecting the Gmail icon (single click) and pressing Enter opens the
      login gate, not the inbox; the same is true for Games; double-click behavior is unchanged;
      `verify` passes.
      _(Verified via a real headless-Chromium pass against the dev server: Enter-key-on-selected
      icon opens the gate instead of bypassing it, the full email→name→submit flow works with the
      new art, and the login UI unmounts immediately on submit — zero console errors throughout.)_

- [x] **P296** — Fix `src/components/GmailGuestGate.jsx`'s name step, per Sonny's 2026-08-20
      screenshot: removed the "back to email" chip entirely — its `rounded-full` pill was shorter
      than the art's baked avatar circle, leaving a sliver of the gray avatar poking out below it;
      the art's avatar now just shows through untouched on both steps instead. Also widened the
      redrawn Login/Next button overlay from `w-[42.4%]`/`h-[4.3%]` to `w-[43.2%]`/`h-[4.6%]`
      (left/top nudged to `32%`/`60.5%` to stay centered) — the old size was flush with the baked
      "Next" button's own edge, and sub-pixel rounding left a 1-2px sliver of its blue visible
      past the redrawn Login button's right edge; the extra margin fully covers it now.
      **Pass condition:** the name step shows no gray avatar sliver and no blue sliver beside
      Login, at both the disabled (empty name) and enabled (name filled) states; `verify` passes.
      _(Verified via a headless-Chromium pixel-level pass reproducing Sonny's exact screenshot
      (email `sonny@yahoo.com`, name left empty) — both artifacts confirmed present before the fix
      and gone after, via direct pixel sampling of the rendered screenshot, not just visual
      inspection.)_

---

## PHASE 53.1 — GMAIL GATE POLISH

_Requested by Sonny on 2026-08-20 from a screenshot: the invalid-email error text was floating far
below the card (past the card's bottom edge, well past the "Next" button), and the close ("X")
hitbox gave no hover feedback._

- [x] **P297** — Fix `src/components/GmailGuestGate.jsx`: moved the "Enter a valid email address."
      message from `top-full` (below the whole card) to sit directly under the Next button
      (`top-[66%]`, same `left`/`width` band as the button); added `cursor-pointer` and a
      `hover:bg-black/5` circular highlight to the close ("X") hitbox.
      **Pass condition:** an invalid email shows the error message immediately below Next, not
      below the card; hovering the close hitbox shows a pointer cursor and a faint highlight;
      `verify` passes.

---

## PHASE 54 — GAME CARD REDESIGN (HOVER PLAY) + CLICKABLE RATINGS + ARCADE HEADER LAYOUT

_Requested by Sonny on 2026-08-20, from two Arcade screenshots: (1) a game card with a green
"PLAY" pill button that appears over the thumbnail on hover, and the Flappy Bird title renamed
to match its Spider-Man reskin; (2) the same card design applied to every game (all three
already carry a `thumbnail`, so the old compact `GameTile` branch was unreachable dead code)
with the "View/Add Rate" button removed in favor of a directly clickable rating badge that opens
`GameRatingModal`, plus a hover effect on that badge; (3) the Arcade header reflowed into a
single row — title/subtitle left, "Logged in as X" + a profile icon + the existing settings gear
grouped on the right — matching the reference screenshot's layout._

- [x] **P298** — Rename `title: 'Flappy Bird'` to `title: 'Flappy Spider-Man'` in
      `src/data/gamesCatalog.js`.
      **Pass condition:** the arcade hub and in-game header show "Flappy Spider-Man"; `verify`
      passes.

- [x] **P299** — Redesign `src/components/games/GamesHub.jsx`: delete the unreachable
      `GameTile`/`bestScorePreview` branch (every game already has a `thumbnail`, so
      `FeaturedGameTile` was the only branch ever rendered); rework it into one `GameCard` used
      for all games, with a centered green "PLAY" pill (▶ + text) that fades in over the
      thumbnail on hover; replace `RateButton` with a `RatingButton` — the average-rating badge
      itself, clickable (`stopPropagation` so it doesn't also start the game) with a hover color
      change, opening `GameRatingModal` exactly as the old button did. Kept as one task per the
      `PaintToolbar.jsx` precedent in LESSONS.md — one cohesive card component, splitting it
      would fragment a single visual unit for no real benefit.
      **Pass condition:** every game renders the same card; hovering its thumbnail shows the PLAY
      pill; there is no separate "View/Add Rate" button; clicking the rating badge opens the
      ratings modal without starting the game; `verify` passes.

- [x] **P300** — Reflow the Arcade header in `src/components/GamesApp.jsx` into a single row:
      title + subtitle stay left; "Logged in as {visitorName}", a decorative profile icon, and
      the existing settings-gear button (now a matching circular icon button) move to the right
      in that order; the greeting line moves below the full-width row instead of stacking under
      "Logged in as".
      **Pass condition:** the header matches the reference screenshot's layout in the browser;
      the settings menu still opens from the gear button; `verify` passes.

- [x] **P301** — Sonny asked for a real follow-up on P299's PLAY control, refined over several
      rounds against a reference screenshot: use the
      `src/components/games/assets/play button games screen.png` art instead of the text pill,
      always visible (not a hover overlay) and sized to 1/3 of the card's width, straddling the
      seam between the thumbnail and the title/stats block with a negative top margin (matching
      the reference screenshot's placement) so it never overlaps the description text below;
      only that button — not the thumbnail or the rest of the card — starts the game, so
      `GameCard`'s outer `<button>` wrapper came off and the click handler lives on the PLAY
      button alone, with its own hover scale effect.
      **Pass condition:** the PLAY button art is visible at all times, sized to roughly a third of
      the card's width, overlaps only the thumbnail's bottom edge (never the description text),
      grows slightly on hover, and is the only part of the card that starts the game (clicking
      the thumbnail or title/stats does nothing); `verify` passes.

- [x] **P302** — Sonny reported P301's button still read small at exactly 1/3 width (measured
      368px thumbnail → 123px button) — the source PNG's canvas has transparent padding around
      the visible pill, so a width-accurate box still looks undersized. Bumped
      `src/components/games/GamesHub.jsx`'s PLAY button to 45% of the thumbnail's width (measured
      366px thumbnail → 166px button) with a deeper `-mt-9` overlap to match its taller box.
      **Pass condition:** measured via Playwright, the PLAY button's rendered width is ~45% of
      the thumbnail's; still overlaps only the thumbnail, not the description; `verify` passes.

- [x] **P303** — Sonny asked to keep P302's size but center the button exactly on the seam
      ("middle of the line") between the thumbnail and description, with no dead space either
      side. Since the button's own height is a fixed ratio of its width (a plain fixed
      `-mt-9`/`translate` either overlapped unevenly or left a flow gap once the negative-margin
      math was worked through), `src/components/games/GamesHub.jsx`'s wrapper now pulls up by
      `-mt-[18.8%]` — a CSS percentage margin resolves against the containing block's _width_,
      and 18.8% of the card's width equals exactly half the button's rendered height at its 45%
      sizing, so the button straddles the seam symmetrically at every breakpoint without leaving
      a gap before the title.
      **Pass condition:** measured via Playwright, the PLAY button's vertical center equals the
      thumbnail's bottom edge (confirmed: thumbnail bottom 405.0px, button center 405.0px), with
      no visible gap before the title/stats block; `verify` passes.

- [x] **P304** — Sonny reported the arcade hub's card grid left ~228px of dead space below it
      inside the 1200×800 Games window. Widened `src/components/games/GamesHub.jsx`'s thumbnail
      from `aspect-video` (16:9) to `aspect-square` to close most of that gap, then — per Sonny's
      follow-up that square read too tall — settled on `aspect-[2/1]`, slightly shorter than the
      original 16:9 (measured grid height 400px → 377px), while still cutting the dead space from
      228px down to ~250px close (verified via Playwright bounding boxes at each step). Also added
      explicit `cursor-pointer` to the PLAY button and both `RatingButton` states (rated and
      "No ratings yet") per Sonny's ask for a pointer-cursor hover cue on both.
      **Pass condition:** thumbnail is visibly shorter than the original 16:9 version; hovering
      the PLAY button or a rating badge shows a pointer cursor; `verify` passes.

- [x] **P305** — Renamed `title: 'Memory Flip Card'` to `title: 'Youtuber Memory Flip'` (via an
      intermediate `'Youtube Memory Flip'` per an earlier draft of the same request, then
      corrected) in `src/data/gamesCatalog.js` per Sonny's request.
      **Pass condition:** the arcade hub's third card shows "Youtuber Memory Flip"; `verify`
      passes.

- [x] **P306** — Sonny reported two more visual bugs in `src/components/games/GamesHub.jsx`: (1)
      thumbnails were cropping into each game's title art at the top — `object-cover`'s default
      center anchor was cutting symmetrically top/bottom on the `aspect-[2/1]` box, and the source
      art keeps its title text near the top, so switched to `object-cover object-top`; (2) too
      much dead space between the PLAY button and the title text below it — traced (via a
      Playwright canvas alpha-channel scan of the PNG) to the source asset's own transparent
      padding: the visible pill only occupies pixel rows 59–211 of a 280px-tall canvas, i.e. ~21%
      dead space above it and ~24% below. Cropped that padding out with an `overflow-hidden`
      `aspect-[335/153]` window around the button and a `-mt-[17.61%]` shift on the inner image
      (the fraction `59/335`, since percentage margins resolve against container _width_) so only
      the visible pill renders; recalculated the seam-straddle overlap from P303 down to
      `-mt-[10.28%]` (half of the now-shorter cropped height) to match.
      **Pass condition:** each thumbnail's title art is fully visible at the top, not clipped;
      the gap between the PLAY button and the title/stats text is visibly tight, matching the
      reference screenshot; `verify` passes.

---

## PHASE 55 — ARCADE SETTINGS MENU REDESIGN (GLASSMORPHISM + TOGGLE + EXPANDABLE SECTIONS)

_Requested by Sonny on 2026-08-20, from a screenshot of the settings dropdown: a real iOS-style
toggle switch for Mute, a dark glassmorphism panel that fully covers the thumbnails behind it, the
Background-settings section relabeled "Themes," the About text swapped for the descriptive
paragraph moved out of the main Arcade header (which Sonny asked removed as redundant now that
it lives here), and a new "Contact developer" expandable section (previously always-open) with
real Zoom/Gmail icons instead of plain text buttons._

- [x] **P307** — Rebuilt `src/components/games/GamesSettingsMenu.jsx`: replaced the emoji-label
      Mute button with a real toggle switch (`SoundToggle` — sliding knob, cyan track when muted,
      red knob when not); switched the panel to a glassmorphism style (`bg-slate-900/95`,
      `backdrop-blur-md`, `border-slate-700/60`, `rounded-2xl`, `shadow-2xl`, `z-50`) from the
      flat `bg-[#1a1a1a]`; relabeled "Background settings" to "Themes" with uppercase
      tracking-wide section headers; swapped the
      About text for the "Explore a suite of custom-engineered web experiences…" paragraph
      (importing `iconImages` from `src/assets/icons/index.js` for the new Contact section); made
      "Contact developer" an expandable section (mirroring the existing About `▸`/`▾` pattern)
      showing the `zoom-chat` and `gmail` icons next to their buttons instead of plain text.
      Removed that same paragraph from `src/components/GamesApp.jsx`'s Arcade header (now just the
      "Arcade" heading + greeting) since it now lives in the About section instead.
      **Pass condition:** opening Arcade shows no description paragraph under the heading; opening
      the gear menu shows the glassmorphism panel fully opaque over the thumbnails, a working
      toggle switch for Mute, "Themes" as the section label, and About/Contact developer both
      collapsed by default, expanding to show the new paragraph and the Zoom/Gmail icon buttons
      respectively; `verify` passes.

---

## PHASE 56 — BLOG APP (FACEBOOK-PROFILE-STYLE SCREEN)

_Requested by Sonny on 2026-08-21, from a mockup screenshot (`src/components/blog/assets/
components/blog screen.png`) and 6 icon PNGs he dropped into `src/components/blog/assets/
icons/`. Full plan agreed in `i-create-a-folder-polymorphic-pizza.md`: a name+avatar identity
gate before opening (mirroring the Games arcade's `GamesNameGate`/`gameVisitor.js` pattern) so
likes/comments are attributable and persisted locally for testing; solid-color placeholder
tiles stand in for the mockup's photo collages/Photos grid until Sonny supplies real images
later; `blog icon.png` (blue "S") becomes the real desktop/taskbar/title-bar icon, replacing
both the 📝 emoji and the current stock `src/assets/icons/blog.png`._

- [x] **P308** — Create `src/utils/blogVisitor.js` (localStorage read/write/clear of a
      `{name, avatarColor}` identity, key `blog:visitorIdentity`) and `src/utils/
blogInteractions.js` (localStorage read/write of per-post `{likes: [{name,avatarColor}],
comments: [{id,name,avatarColor,text,timestamp}]}`, key `blog:interactions:<postId>`,
      defaulting to `{likes: [], comments: []}` when absent), mirroring the existing
      `src/utils/gameVisitor.js` / `src/utils/gameRatings.js` shape. Add co-located
      `blogVisitor.test.js` / `blogInteractions.test.js` (one happy-path, one failure-path each),
      mirroring `gameVisitor.test.js` / `gameRatings.test.js`.
      **Pass condition:** new tests cover a read-after-write round trip and a corrupt/missing-data
      fallback for both utils; `verify` passes.

- [x] **P309** — Create `src/components/blog/data/blogPostSeeds.js`: 2–3 seed posts
      (`{id, title, authorName: 'Sonny', collageColors: [...]}`, 6–9 Tailwind background-color
      classes standing in for the mockup's photo collage), starting with no likes/comments.
      **Pass condition:** file exports a non-empty array matching that shape; `verify` passes.

- [x] **P310** — Create `src/context/BlogContext.jsx` exporting `BlogProvider` and `useBlog()`,
      following `src/context/GamesContext.jsx`'s shape: `visitorName`, `visitorAvatarColor`,
      `setVisitor(name, avatarColor)`, `logout()` (backed by `blogVisitor.js`), `posts` (from
      `blogPostSeeds.js` merged with live `blogInteractions.js` state), `toggleLike(postId)`,
      `addComment(postId, text)`, `getAllVisitors()` (unique `{name,avatarColor}` set derived from
      every post's likes+comments). Wrap `<Desktop />` with `<BlogProvider>` in `src/App.jsx`.
      **Pass condition:** `useBlog()` throws outside its provider (matching `useGames()`); `verify`
      passes.

- [x] **P311** — Create `src/components/blog/BlogNameGate.jsx`: a modal (mirroring
      `GamesNameGate.jsx`'s `onSubmit`/`onCancel` props, without its bespoke arcade art) with a
      required name input and an avatar-color picker (~8 swatches — rose/amber/emerald/sky/
      violet/fuchsia/orange/teal — each rendering the shared `user icon.png` silhouette centered
      on that color's disc); `onSubmit(name, avatarColor)` fires only once both are chosen.
      **Pass condition:** submit is disabled until a name is typed and a color is picked; `verify`
      passes.

- [x] **P312** — Create a minimal `src/components/BlogApp.jsx` (accepts
      `onOpenContactInfo`/`onLogout` props, renders just a "Blog — Hi {visitorName}" placeholder
      shell for now — it grows in every task through P319) and wire `src/components/Desktop.jsx`:
      pull `visitorName`/`setVisitor`/`logout` from `useBlog()`; in `handleIconOpen`, gate `'blog'`
      the same way `'games'` is gated (`if (id === 'blog' && !visitorName) { setBlogGateOpen(true);
return }`); render `<BlogNameGate>` when `blogGateOpen`, calling `setVisitor` then
      `openApp('blog')` on submit; add a real `if (w.id === 'blog')` window branch (before the
      generic placeholder fallback, same slot as `'games'`/`'music-lab'`) rendering `<BlogApp
onOpenContactInfo={() => handleIconOpen('contact-info')} onLogout={() => { logout();
shared.onClose() }} />` inside `Window` (`defaultWidth={1200}`, `defaultHeight={800}`); add
      `if (w.id === 'blog') return <BlogApp />` to `renderPreviewBody`; delete the now-dead
      `isLargePlaceholder = w.id === 'blog'` special case.
      **Pass condition:** opening the Blog icon with no stored identity shows the gate; submitting
      it opens a real Blog window showing the placeholder shell; `verify` passes. (Split into
      `.a`/`.b` if this exceeds 50 lines.)

- [x] **P313** — Overwrite `src/assets/icons/blog.png` with the "S" logo currently at
      `src/components/blog/assets/icons/blog icon.png`, then delete that now-redundant local copy
      (everything references the one canonical `iconImages.blog`). Pass `icon={<img
src={iconImages.blog} className="h-4 w-4 rounded-full" alt="" />}` in the P312 window
      branch.
      **Pass condition:** the desktop grid icon, taskbar button, and Blog window's title-bar icon
      all show the "S" logo; `verify` passes.

- [x] **P314** — Create `src/components/blog/BlogTopNav.jsx`: the "S" logo (`iconImages.blog`),
      a white search pill using `search icon.png` (decorative for now), the `bell icon.png`
      notification icon, and "Hi {visitorName} · Log out" using the current visitor's avatar
      disc + `user icon.png`, wired to `useBlog()` and an `onLogout` prop; replace `BlogApp.jsx`'s
      placeholder shell's top bar with it.
      **Pass condition:** the open Blog window shows the real top nav with the signed-in
      visitor's name; `verify` passes.

- [x] **P315** — Create `src/components/blog/BlogProfileCard.jsx`: the plain gray `user icon.png`
      avatar (no color disc — this represents Sonny, the blog owner, not the current visitor) +
      "SONNY LLARENA", a stats row reading real `posts.length` "Posts" and real
      `getAllVisitors().length` "Visitors" from `useBlog()`, an empty "About Me:" placeholder
      section, and a "Contact me:" row that calls an `onOpenContactInfo` prop on click; introduce
      `BlogApp.jsx`'s 3-column grid skeleton (this card in the left column; center/right columns
      still empty for now) and forward `onOpenContactInfo` down to it.
      **Pass condition:** the open Blog window shows the profile card with live stats in a
      left column; `verify` passes.

- [x] **P316** — Create `src/components/blog/BlogNewsWidget.jsx` (static empty placeholder card,
      matching the mockup) and `src/components/blog/BlogPhotosWidget.jsx` (3×3 grid of solid
      Tailwind-color placeholder tiles, no image files); stack both under the profile card in
      `BlogApp.jsx`'s left column.
      **Pass condition:** both render inside a white card under the profile card, matching the
      mockup's sidebar widgets; `verify` passes.

- [x] **P317** — Create `src/components/blog/BlogPostCard.jsx` (author row, a color-tile collage
      from `collageColors`, a like button using `heart icon.png` — grayscale when the current
      visitor hasn't liked, full color when they have, calling `toggleLike` — with a live count,
      a comment list, and a comment input with a `send icon.png` submit button calling
      `addComment`) and `src/components/blog/BlogFeed.jsx` (the "Sonny's Latest Blog" header card
      plus `posts.map` rendering one `BlogPostCard` per seed post); render `BlogFeed` in
      `BlogApp.jsx`'s center column.
      **Pass condition:** every seed post renders in the center column; liking toggles the
      heart's state/count live; submitting a comment appends it to the visible list; `verify`
      passes. (Split into `.a`/`.b` if this exceeds 50 lines.)

- [x] **P318** — Create `src/components/blog/BlogVisitorsPanel.jsx`: a decorative mini search
      input plus a list rendering `useBlog().getAllVisitors()` (each row: avatar disc + name),
      with an empty-state message ("No visitors yet — be the first to comment or like a post!")
      when that list is empty; render it in `BlogApp.jsx`'s right column.
      **Pass condition:** liking or commenting as a new identity makes that visitor appear in the
      right column's list on next render; `verify` passes.

- [x] **P319** — In `src/components/BlogApp.jsx`, finalize the 3-column desktop layout's spacing/
      widths to match the mockup and add the `useIsMobile()` stacked-column fallback (profile
      card, then feed, then visitors, in that order), matching `MemoryWallApp.jsx`'s inline-branch
      convention.
      **Pass condition:** desktop viewport shows the 3-column mockup layout with correct column
      widths; a viewport under 767px shows a single usable stacked column; `verify` passes.

- [x] **P320** — Full visual/mobile polish pass across all `src/components/blog/*` files (spacing,
      colors, and proportions matched against the mockup screenshot) plus a final `npm run
verify`. Verified with a real Playwright browser pass (temporary local install, not added to
      `package.json`/stack): opened Blog from a clean profile, completed the name+avatar gate,
      confirmed the 3-column desktop layout matches the mockup, liked a post and added a comment
      (both persisted and showed live, correct counts), confirmed the new visitor appeared in the
      Visitors panel with their chosen avatar color, then resized to a 390px mobile viewport and
      scrolled through the full stacked column (profile card → News → Photos → all 3 feed posts →
      Visitors) with no console errors.
      **Pass condition:** side-by-side with the mockup, layout/spacing/colors match; `npm run
verify` passes clean.

---

## PHASE 57 — BLOG APP: THEME, HEADER REDESIGN, ACTIVITY FEED, MOCK DATA

_Requested by Sonny on 2026-08-21, as 9 numbered changes against the just-shipped Blog app
(commit `ab41929`). Grouped into 8 tasks below; each cites which of Sonny's numbered items it
covers._

- [x] **P321** (covers #1) — Create `src/components/blog/theme.js` exporting brand-blue Tailwind
      class constants for RGB(24, 119, 242) (`#1877F2`). Replace every `bg-indigo-700`/
      `bg-indigo-800`/`bg-indigo-600`/`text-indigo-200`/`focus:border-indigo-500` usage in
      `BlogTopNav.jsx`, `BlogProfileCard.jsx`, and `BlogNameGate.jsx` with the new constants.
      **Pass condition:** the top nav, profile card, and gate's Continue button all render in
      `#1877F2`; `verify` passes.

- [x] **P322** (covers #2, #3) — Create `src/components/blog/BlogUserMenu.jsx`: an outside-
      click-to-close dropdown (mirroring `GamesSettingsMenu.jsx`'s pattern) anchored under the
      header avatar, with three rows — "ABOUT" (toggles a short inline blurb), "Contact
      Developer" (calls `onOpenContactInfo`), "Log out" (calls `onLogout`) — per Sonny's
      screenshot. In `BlogTopNav.jsx`, remove the "Hi, {name}" text and "Log out" button; make
      the avatar itself the clickable trigger for this menu.
      **Pass condition:** clicking the header avatar opens the 3-row menu; each row does its
      real action and closes the menu; `verify` passes.

- [x] **P323** (covers #5) — Remove the native OS-style title bar for the Blog window: in
      `Desktop.jsx`, add `hideTitleBar` to the Blog `<Window>` and switch to the render-prop form
      to forward `toggleMaximize`/`isMaximized`, plus `shared.onClose`, into `BlogApp`. In
      `BlogApp.jsx`, accept and forward `onClose`/`onMaximize`/`isMaximized`. In `BlogTopNav.jsx`,
      give the nav bar itself the `window-title-bar cursor-move` classes (so dragging still
      works, mirroring `ZoomChatHeader.jsx`) and add a small close/maximize button cluster
      (`onMouseDown` `stopPropagation`'d, styled with the new brand blue) in place of the removed
      chrome; add matching `stopPropagation` to the search input and icon buttons so clicks don't
      trigger a drag.
      **Pass condition:** the old dark "Blog"/minimize/maximize/close bar is gone; the window can
      still be dragged (via the nav bar), maximized, and closed; `verify` passes. (Split into
      `.a`/`.b` if this exceeds 50 lines.)

- [x] **P324** (covers #4) — In `BlogApp.jsx`, wrap the 3-column row in a centered
      `mx-auto w-full max-w-6xl` container so it stops stretching to the window's full width when
      maximized, leaving even margins on both sides instead.
      **Pass condition:** at a maximized (e.g. 1920px-wide) window size, the 3-column content is
      capped and centered with visible side margins, not stretched edge-to-edge; `verify` passes.

- [x] **P325** (covers #6) — Create `src/utils/blogActivity.js` (localStorage-backed activity
      log, key `blog:activity`, a `readActivityLog` reader taking a seed fallback and a
      `logActivity` writer taking `type`/`name`/`avatarColor`/`postId`, newest-first, capped
      length). Wire `BlogContext.jsx` to log a
      `'join'` entry from `setVisitor`, a `'like'` entry from `toggleLike` (only when newly
      liking, not un-liking), and a `'comment'` entry from `addComment`; expose `activity` from
      the context. Create `src/components/blog/BlogActivityPanel.jsx`: an outside-click-to-close
      dropdown (same pattern as `BlogUserMenu.jsx`) listing activity rows (avatar + "{name}
      entered Sonny's blog" / "liked '{post title}'" / "commented on '{post title}'", post title
      resolved from `posts` by `postId` at render time — never duplicated into the stored
      entry), each row clickable and scrolling the relevant post into view. Wire it to
      `BlogTopNav.jsx`'s bell button.
      **Pass condition:** joining, liking, and commenting each add a real, correctly-worded row
      to the bell dropdown; clicking a post-related row scrolls that post into view; `verify`
      passes. (Split into `.a`/`.b` if this exceeds 50 lines.)

- [x] **P326** (covers #7) — Create `src/components/blog/data/mockBlogActivity.js`: 20 mock
      visitors (name + avatar color) distributed across the 3 seed posts' likes/comments plus a
      matching chronological activity log (deterministic fabricated timestamps, no bare
      `Date.now()`/`new Date()`), via a `buildMockInteractionsAndActivity()` builder. Wire it in
      `BlogContext.jsx` as the seed fallback passed to `readInteractions`/`readActivityLog` so a
      fresh browser profile sees this mock content on first load (real interactions still persist
      and layer on top exactly as before).
      **Pass condition:** a cleared-localStorage load of Blog shows the mock likes/comments on
      each post and a populated activity dropdown with at least 20 distinct mock visitors;
      `verify` passes.

- [x] **P327** (covers #8) — Darken the typed-text color (not just placeholder) in both search
      inputs (`BlogTopNav.jsx`, `BlogVisitorsPanel.jsx`) and the comment input
      (`BlogPostCard.jsx`) to an explicit dark class (e.g. `text-slate-900`).
      **Pass condition:** typed text in all three inputs renders clearly dark, not light gray;
      `verify` passes.

- [x] **P328** (covers #9) — Add `cursor-pointer` (plus a subtle hover cue) to the like/heart
      button, the comment-send button (`BlogPostCard.jsx`), the bell/activity button, and the
      header user-avatar button (`BlogTopNav.jsx`).
      **Pass condition:** hovering each of the four controls shows a pointer cursor; `verify`
      passes.

---

## PHASE 58 — BLOG NAME GATE: ART-BASED LOGIN UI

_Requested by Sonny on 2026-08-21: use `src/components/blog/assets/components/blog login
ui.png` as the Blog gate's visual, mirroring the Games arcade's art-based
`GamesNameGate.jsx` technique (background art + precisely-positioned transparent interactive
elements on top) instead of the current plain white-card modal._

- [x] **P329** — Rewrite `src/components/blog/BlogNameGate.jsx` to use `blog login ui.png` as a
      `bg-cover` background on a `1080/500`-aspect-ratio container (mirroring
      `GamesNameGate.jsx`'s technique), with transparent absolutely-positioned elements laid over
      the art's own drawn boxes: the name input, the 8 avatar-color circles (mapped 1:1 to
      `AVATAR_COLORS`' order, matching the art's row-major layout), the "Login" submit button,
      and the "close" link. Add a visible selected-state ring on the chosen avatar circle (the
      art has no built-in selection indicator) and a dimmed/disabled visual on the Login button
      until both a name and an avatar are chosen.
      **Pass condition:** every overlaid control visually lines up with its drawn counterpart in
      the art (verified via a Playwright screenshot comparison); the gate behaves exactly as
      before (name + avatar required to submit); `verify` passes.

- [x] **P330** — Sonny reported three bugs in the P329 art-based gate: (1) the art's baked-in
      "Enter your name" text kept showing through behind typed text; (2) typed text wasn't
      centered; (3) the Login button looked translucent/non-solid and Sonny couldn't tell why it
      was unclickable. Sonny then replaced `blog login ui.png` itself with a version that drops
      the baked-in input box and Login button entirely (keeping the branding/avatar-picker card),
      removing the root cause. Rebuilt those two controls in
      `src/components/blog/BlogNameGate.jsx` as real, fully self-styled elements in that now-empty
      space: a bordered white input with a native (properly-hiding) centered `placeholder`, and a
      self-rendered "Login" button — solid brand-blue `#1877F2` when enabled, solid slate-300/500
      when disabled — plus a small hint below it ("Enter your name to continue" / "Pick an avatar
      to continue") explaining why it's inactive.
      **Pass condition:** typed name shows centered with no ghosting; the Login button is always
      fully opaque and clearly clickable once both fields are set, with a hint explaining the
      disabled state otherwise; `verify` passes.

---

## PHASE 59 — BLOG GATE: LOADING SCREEN

_Requested by Sonny on 2026-08-21: after clicking Login on the Blog gate, show a loading screen
overlaid on the login UI using `src/components/blog/assets/components/loading icon.png`
(an 8-blade ring around an "S" logo), with a circling animation — Sonny's own words: "just
change the shade color of 8 rings one by one circling animation" — before opening the Blog
window. Mirrors the existing `GamesLoadingScreen.jsx` staging pattern (`isLoading` prop +
`children` render slot on the name gate) exactly._

- [x] **P331** — Add `src/components/blog/BlogLoadingScreen.jsx`: renders the loading icon over
      a dimmed backdrop for 2s (`onDone` fires after `LOADING_MS`), with a `.blog-loading-sweep`
      overlay (new `@keyframes`/class in `src/index.css`, mirroring the existing
      `.neon-border-orange` convention) — a masked conic-gradient wedge, sized to the ring's
      measured inner/outer radius and rotated in 8 discrete `steps()` to land on each of the 8
      blade centers in turn, blended with `mix-blend-mode: screen` so each blade visibly
      lightens as the highlight reaches it, circling continuously. Gave `BlogNameGate.jsx` the
      same `isLoading`/`children` shape as `GamesNameGate.jsx` (fades and disables the form while
      loading, renders the loading screen as a sibling overlay) and wired `Desktop.jsx`'s
      `blogGateOpen` flow to stage the submitted identity, mount `BlogLoadingScreen`, then call
      `setBlogVisitor`/open the Blog window from its `onDone`.
      **Pass condition:** clicking Login shows the loading icon over the dimmed gate; a
      Playwright screenshot comparison across three frames confirms the highlighted blade moves
      to a different position each time (circling, not static); after ~2s the Blog window opens
      with the submitted identity; `verify` passes.

---

## PHASE 60 — BLOG DROPDOWNS: WHITE THEME, MUTUAL EXCLUSIVITY

_Requested by Sonny on 2026-08-21 with a reference screenshot: recolor the Activity panel and
the User Icon (avatar) dropdown from the current dark `#18191a` styling to white, restyle the
scrollbar, and make the two dropdowns mutually exclusive — opening one must close the other._

- [x] **P332** — Recolor `BlogActivityPanel.jsx` and `BlogUserMenu.jsx` from the current dark
      near-black theme to a white background with dark slate text and light slate separators
      and hover states. Added a new light-scrollbar utility class to `src/index.css`, mirroring
      the three existing scrollbar utility classes already there, and applied it to the
      Activity panel's scrollable list. Replaced `BlogTopNav.jsx`'s two independent open-state
      booleans (one for the user menu, one for the activity panel) with a single shared
      open-panel state so the bell and avatar buttons both write to the same slot, meaning
      opening one inherently closes the other.
      **Pass condition:** both dropdowns render on a white background with visibly darker
      separators and hover states, matching Sonny's reference screenshot; the Activity list
      (which overflows its max-height) shows the new thin scrollbar; a Playwright pass confirms
      opening the Activity panel then clicking the avatar closes it and opens the User menu, and
      vice versa; the verify command passes.

---

## PHASE 61 — BLOG: 150 MOCK VISITORS, VISITOR SEARCH, ACTIVITY TIMESTAMPS

_Requested by Sonny on 2026-08-21: scale the mock data up to roughly 150 visitors with random
comments and likes so the blog looks lived-in, add real visitor search, cap the sidebar Visitors
list at 20 with a total count and a "View all N Visitors" modal, and add a date/time stamp to
every Activity entry spanning from December 2025 to the present._

- [x] **P333** — Rewrote `mockBlogActivity.js` to generate exactly 150 mock visitors (a
      deterministically shuffled combination of first/last names, so results are reproducible
      but not repetitive) using a small seeded random-number generator instead of sequential
      ticks. Every visitor is guaranteed at least one like (so all 150 always surface as
      visitors), with a chance of a second like and a chance of a comment drawn from a larger
      pool of comment text. Timestamps are spread pseudo-randomly across December 1, 2025
      through the moment the page loads, then sorted newest-first. Added
      `src/utils/blogSeedVersion.js` (with tests) so a stored-but-stale local visitor/activity
      seed is cleared and regenerated whenever the mock data shape changes, and wired it into
      `BlogContext.jsx`. Raised the real activity log's storage cap in `blogActivity.js` from 200
      to 500 — the old cap was silently truncating the seeded history to the most recent ~200
      entries, which cut off everything before roughly April 2026 and broke the December 2025
      start date.
      **Pass condition:** a fresh browser profile shows exactly 150 distinct visitors; the
      activity log's oldest entry (scrolled to the bottom) is dated December 1-2, 2025; `verify`
      passes.

- [x] **P334** — Added a formatted date/time line under every row in `BlogActivityPanel.jsx`
      (`Aug 21, 2026, 4:12 PM` style, via a small local formatter).
      **Pass condition:** every activity row shows a second line with a readable date and time
      that matches its underlying timestamp; `verify` passes.

- [x] **P335** — Wired real search into `BlogVisitorsPanel.jsx`'s existing (previously
      decorative) search box, capped its visible list to 20 matches, and added a total-visitor
      count plus a "View all N Visitors" link below the list once there are more visitors than
      the cap. Added `BlogVisitorsModal.jsx`: a centered overlay (lightly dimmed backdrop, not
      the heavier dimming used by the gate) with its own search box, a scrollable full visitor
      list using the same light scrollbar utility, and a close button, dismissible by the close
      button or by clicking the backdrop.
      **Pass condition:** the sidebar panel never shows more than 20 rows and its search filters
      them live; the total count and "View all" link read the true visitor count; the modal
      opens centered over a dimmed (not opaque) background, its own search filters the full
      list, and it closes via its close button or a backdrop click; `verify` passes.

---

## PHASE 62 — BLOG POST CARD: COLLAPSED COMMENTS, VIEW-MORE MODAL

_Requested by Sonny on 2026-08-21 with a reference screenshot of a single collapsed comment
under plain heart/comment-bubble stat icons: show only the latest comment by default, add a
"View more comments" link that opens a scrollable modal of every comment, drop the "+" before
the like count, and replace the "N comments" text with an icon matching the screenshot plus a
bare number._

- [x] **P336** — Added `src/utils/formatRelativeTime.js` (with tests) for Facebook-style
      relative timestamps ("4h", "3d", "2mo"), and `src/components/icons/CommentIcon.jsx`, an
      inline SVG speech-bubble outline matching the screenshot's icon — mirroring the existing
      `src/components/icons/` convention already used elsewhere in the app rather than adding a
      new PNG asset. In `BlogPostCard.jsx`: dropped the "+" before the like count, replaced the
      "N comments" text with the new icon plus a bare number, collapsed the comment list to only
      the most recently added comment (now with its relative time next to the name), and added a
      "View more comments" link (shown only when a post has more than one comment) that opens a
      new `BlogCommentsModal.jsx` — a centered, scrollable overlay listing every comment for that
      post with a close button, mirroring `BlogVisitorsModal.jsx`'s structure.
      **Pass condition:** each post shows only its single latest comment by default with a
      relative timestamp; the like/comment stats read as icon-plus-number only, no "+" and no
      "comments" word; clicking "View more comments" opens a centered scrollable modal listing
      every comment for that post, closable via its close button or a backdrop click; `verify`
      passes.

---

## PHASE 63 — BLOG: SPONSORED WIDGET FOR THE ARCADE GAMES

_Requested by Sonny on 2026-08-21 with a reference screenshot: add a "Sponsored" widget to the
left sidebar, below Photos, showing the 3 games from the Games app — each game's own thumbnail
card plus a short caption, with the caption text matching the screenshot exactly._

- [x] **P337** — Added `src/components/blog/BlogSponsoredWidget.jsx`, reusing `gamesCatalog`
      from `src/data/gamesCatalog.js` (the same source of truth the Games app itself reads from)
      for each game's thumbnail image, paired with a small local caption map holding Sonny's
      exact screenshot wording per game id ("Play the best flappy game", "Test your typing
      speed", "Flip your favorite Youtuber") rather than reusing the existing longer in-app
      taglines. Wired it into `BlogApp.jsx`'s left column, directly below `BlogPhotosWidget`.
      After a first pass, Sonny asked for three refinements in the same session: a taller
      widget with each caption sitting above a much larger (4x), full-card-width thumbnail
      instead of a small thumbnail beside the caption; and each thumbnail made clickable
      (pointer cursor, hover feedback) and wired through `BlogApp.jsx` and `Desktop.jsx`'s
      existing `handleIconOpen('games')` gate — the same Games-arcade login/name-gate flow the
      desktop icon itself uses. The first "full width" attempt used `object-cover`, which
      cropped thumbnails whose aspect ratio didn't match the fixed box (caught from a follow-up
      screenshot); switched to `object-contain` on a neutral background so every thumbnail shows
      uncropped, letterboxed rather than cut off.
      **Pass condition:** a "Sponsored" card renders below Photos with all 3 arcade game
      thumbnails shown at full width and full height with no cropping, each with its caption
      above it matching the screenshot verbatim; clicking a thumbnail opens the Games arcade's
      login gate (or the Games window directly if already logged in); `verify` passes.

---

## PHASE 64 — BLOG HEADER CLEANUP: WINDOW CONTROLS INTO USER MENU, FIXED SEARCH

_Requested by Sonny on 2026-08-21: remove the Maximize and Close buttons from the Blog header
entirely, add "Minimize" and "Maximize" as text entries in the User Icon dropdown instead
(explicitly no "Close" entry there), stop the header search box from stretching with the window
(fix it at twice the width of the Visitors panel's search box), and make it actually search blog
posts instead of being decorative._

- [x] **P338** — Removed the Maximize/Close icon-button cluster from `BlogTopNav.jsx`. Added
      "Minimize" and "Maximize" text buttons to `BlogUserMenu.jsx` (between "Contact Developer"
      and "Log out", matching the existing row style), wired through `BlogApp.jsx` to
      `Desktop.jsx`'s existing `shared.onMinimizeToggle` and the window's `toggleMaximize` — the
      same mechanisms every other window's native minimize/maximize already use — and removed
      the now-fully-unused `onClose`/`isMaximized` prop plumbing between `Desktop.jsx`,
      `BlogApp.jsx`, and `BlogTopNav.jsx` (the window can still be closed via "Log out", which
      already closed it before this change). Changed the header search box from `flex-1`
      (stretched to fill the header) to a fixed `w-96` — exactly twice the Visitors panel
      search box's rendered width — and lifted a `searchQuery` state into `BlogApp.jsx` so typing
      in it filters `BlogFeed.jsx`'s posts by title, showing a "No blogs match your search."
      message when nothing matches.
      **Pass condition:** the header shows no Maximize or Close button; the User Icon dropdown
      has working "Minimize" and "Maximize" entries and no "Close" entry; the search box stays a
      fixed width regardless of window size; typing a post's title into it shows only that post,
      and a search with no matches shows the empty-state message; `verify` passes.

---

## PHASE 65 — BLOG HEADER: ALIGN CONTENT TO THE BODY CONTAINER

_Requested by Sonny on 2026-08-21: after the P338 header cleanup, the logo/search sat flush
against the window's left edge while the bell/avatar drifted next to the search box instead of
staying pinned to the right — because removing the search box's old `flex-1` stretch also
removed the only thing pushing the bell/avatar rightward. Sonny asked to align the header to the
same container the body content uses, keep it non-stretchable, and pin the bell/avatar to the
header's right edge._

- [x] **P339** — Restructured `BlogTopNav.jsx`: the outer draggable bar keeps its full-width
      blue background (title bars stay draggable edge-to-edge, matching every other window), but
      its content is now a `mx-auto max-w-6xl justify-between` row — the same max-width container
      the body content below already uses — split into a left group (logo + fixed-width search)
      and a right group (bell + avatar), so the two rows line up edge-to-edge instead of the
      header hugging the window's raw edges.
      **Pass condition:** at a wide viewport, the header's content row shares the exact same
      left/right edges as the body's container (verified via measured bounding boxes, not just a
      screenshot); the bell and avatar sit at the header's right edge; the search box still does
      not stretch; `verify` passes.

---

## PHASE 66 — BLOG HEADER: BLUE PILL ON A NEUTRAL BAR

_Requested by Sonny on 2026-08-21 with a mockup: instead of the P339 approach (full-width blue
bar with an aligned content row inside it), restyle so the blue background itself is confined to
a centered pill matching the body's container width, sitting on a neutral bar matching the app's
own background color. Sonny also flagged that the header and body containers were "not aligned"
in his own browser after this change._

- [x] **P340** — In `BlogTopNav.jsx`, moved the brand-blue background off the full-width outer
      bar and onto the inner `max-w-6xl` content row itself (adding `rounded-lg` so it reads as
      a pill), leaving the outer bar `bg-slate-100` — the same neutral tone `BlogApp.jsx` already
      uses as its base background — so only a thin neutral strip shows on either side of the pill
      on wide windows. The outer bar keeps `window-title-bar cursor-move` so the whole strip
      (pill and neutral margins alike) stays draggable. Investigated Sonny's alignment report:
      the body's scroll container reserves a vertical scrollbar gutter that the non-scrolling
      header never did, so on a real browser with a classic (non-overlay) scrollbar the two
      containers' available centering width differed by the scrollbar's width. Fixed by
      measuring the scroll container's own reserved scrollbar width in `BlogApp.jsx` (comparing
      its offset width against its client width, re-measured via `ResizeObserver` and on window
      resize) and passing it down so `BlogTopNav.jsx` adds the same amount to its own right
      padding — avoided fixing this via
      `overflow-y-auto` directly on the header (which would have clipped the Activity/User
      dropdowns, both absolutely positioned inside it).
      **Pass condition:** the blue background only covers the centered pill, not the full window
      width; the neutral bar on either side matches the app's own background; a Playwright
      measurement confirms the pill's left/right edges match the body container's edges exactly
      (0px difference); the Activity and User dropdowns still render in full, uncut; `verify`
      passes.

---

## PHASE 67 — BLOG: RECOLOR HEADER PILL AND PROFILE CARD TO REFERENCE BLUE

_Requested by Sonny on 2026-08-21: use the color from
`src/components/blog/assets/components/blog color.jpg` for the header pill and the profile card
("the first container")._

- [x] **P341** — Sampled the reference image's exact pixel color via a headless-browser canvas
      (`#3E51A0`, a muted indigo-blue, distinct from the previous Facebook-blue `#1877F2`) rather
      than eyeballing it, then updated `BRAND_BLUE_BG` in `src/components/blog/theme.js` — the
      single source of truth already consumed by exactly the two elements Sonny meant
      (`BlogProfileCard.jsx`'s card background and `BlogTopNav.jsx`'s header pill) and nothing
      else, so no other blue accents (the gate's Login button, the "View all Visitors" link,
      etc., which hardcode their own hex rather than importing this token) were affected.
      **Pass condition:** the header pill and the profile card both render the sampled `#3E51A0`
      background color, verified via a live Playwright color check; `verify` passes.

---

## PHASE 68 — BLOG: FLOATING CHAT WIDGET (SHARED VIRTUAL-AGENT KNOWLEDGE)

_Requested by Sonny on 2026-08-22, from two reference screenshots: a floating Messenger-style
chat bubble and launcher icon inside the Blog app (assets already dropped at
`src/components/blog/assets/icons/chat bubbles template.png` and `chat icon.png`), copying that
visual design, fixed-positioned, with the icon docked at the bottom of the bubble when it's open.
Sonny asked for the "same chat knowledge as Zoom chat" and said more knowledge would be added
later — read as: reuse the existing Sonny-virtual-agent bot/knowledge base
(`src/data/zoomChatKnowledgeBase.js` + `src/utils/zoomChatBot.js`) as the single source of truth
behind both surfaces, rather than fork a second copy, since Sonny will keep growing it. Skips
Zoom Chat's loading/gate/name/email phases entirely — the Blog visitor already gave their name via
`BlogNameGate` before reaching the widget, so it opens straight into a time-based greeting._

- [x] **P342** — Created `src/components/blog/BlogChatButton.jsx` (the floating launcher, `chat
icon.png`) and `src/components/blog/BlogChatMessage.jsx` (bubble rendering copying the
      reference template: right-aligned blue bubbles, left-aligned gray bubbles, a centered
      gray timestamp divider shown only across a >60s gap instead of Zoom Chat's per-message
      timestamp, plus the same suggestion-chip/CTA/multiple-choice shapes Zoom Chat already
      renders). Added `BRAND_BLUE_MESSAGE_BG` to `src/components/blog/theme.js` (the existing
      `#1877F2` interactive blue already used for links/buttons elsewhere in the app, distinct
      from the indigo `BRAND_BLUE_BG` brand color) as the bubble/CTA color's single source of
      truth. Created `src/components/blog/BlogChatWidget.jsx` composing both into a fixed
      bottom-right stack (bubble window above, launcher icon anchored directly below it, matching
      the reference's docked layout) and mounted it in `src/components/BlogApp.jsx` (root div made
      `relative` to anchor it).
      **Pass condition:** opening Blog shows the floating launcher icon fixed at the bottom-right
      of the window; clicking it opens an empty bubble window matching the reference template's
      header/input chrome; `verify` passes.

- [x] **P343** — Moved `ANYTHING_ELSE_REPLY`/`CONTACT_CTA` out of `ZoomChatApp.jsx` and into
      `src/data/zoomChatKnowledgeBase.js` (one copy, both surfaces import it — CLAUDE.md §5's "one
      source of truth per concept"). Wired `BlogChatWidget.jsx` to the shared bot: opening the
      widget for the first time greets with `getTimeBasedGreeting(visitorName)` (the Blog
      identity from `BlogContext`) plus `SUGGESTED_QUESTIONS`; submitting a message runs the same
      auto-reply → pending-follow-up → category-match → fallback-with-suggestions →
      two-consecutive-misses-triggers-contact-CTA chain Zoom Chat already uses. The CTA's "Send
      project details"/"Contact Sonny directly" buttons open Gmail compose via a new
      `onOpenGmail` prop threaded `Desktop.jsx` → `BlogApp.jsx` → `BlogChatWidget.jsx` (mirroring
      Zoom Chat's own `onOpenGmail` wiring, including the `renderPreviewBody` inert-callback
      branch). Minimize (−) hides the bubble and keeps the conversation; Close (×) hides it and
      resets the conversation so reopening re-greets. Sized the bubble responsively via the
      existing `useIsMobile()` hook (a fixed `w-80`/`h-[440px]` on desktop, a near-full-width
      `w-[calc(100vw-2rem)]`/`h-[65vh]` on mobile) per the standing mobile-adaptation requirement.
      **Pass condition:** a live Playwright pass — open, greet-by-name, ask "how much does a
      project cost", see the matched category reply + follow-up multiple-choice options, minimize
      (conversation preserved on reopen), close (conversation resets) — all behave as described at
      both a desktop and a 375px-wide viewport; `verify` passes. Flagged to Sonny, not fixed here
      (outside this task's scope): at viewport heights ≈ the window's own default height (e.g.
      1200×800 apps on an 800px-tall viewport), `Window.jsx`'s centering math
      (`(innerHeight - TASKBAR_HEIGHT - height) / 2`) goes negative and the window's bottom edge —
      where this widget now docks — renders partly behind the taskbar; unrelated to this widget
      and affects every 1200×800-default app already, not something to silently fix under a chat-
      widget task.

---

## PHASE 69 — BLOG: CHAT WIDGET DOCKING FIX + PROFILE MENU ICON REDESIGN

_Requested by Sonny on 2026-08-22, from two screenshots: (1) the Phase 68 chat widget was
anchoring to the Blog window's own bottom-right corner rather than the visible 3-column content,
so on a wide/maximized window it floated in the empty gutter past the Visitors column instead of
staying docked to it; (2) the profile ("user icon") dropdown should match a reference screenshot's
icon+chevron layout instead of the plain centered-text list it had._

- [x] **P344** — Re-anchored `BlogChatWidget.jsx` to the same centered `max-w-6xl` content box the
      3-column layout uses (`BlogApp.jsx` now wraps it in a matching `p-4`/`mx-auto max-w-6xl`
      positioning layer, `pointer-events-none` outside the widget itself) instead of the raw
      window edge, confirmed via measured DOM geometry with the window maximized to 1600px wide
      (chat button's right edge lands within ~15px of the Visitors column's right edge, not
      ~200px out in dead space at the window's true edge). Shrunk the launcher icon from 56px to
      50px (90%, per Sonny's updated `chat icon.png`) and swapped the chat panel header avatar
      from the reused Zoom bot icon to the Blog app's own icon (`iconImages.blog`).
      **Pass condition:** live Playwright pass confirms the chat button's right edge tracks the
      Visitors column edge (not the window edge) at both default and maximized window widths;
      launcher measures 50×50px; chat header avatar loads `blog.png`; `verify` passes.

- [x] **P345** — Rebuilt `BlogUserMenu.jsx` from Sonny's reference screenshot: left-aligned inline
      SVG icon + label per row (About/Contact Developer/Minimize/Maximize/Log out), a trailing
      chevron on About and Contact Developer only, divider lines between rows — replacing the
      previous centered-text-only buttons. Preserved the existing About inline-expand behavior.
      **Pass condition:** live Playwright screenshot matches the reference layout; `verify` passes.

---

## PHASE 70 — WINDOWS-STYLE BOOT + SIGN-IN GATE BEFORE THE DESKTOP

_Requested by Sonny on 2026-08-22: add a "Windows Start up" boot screen and a Windows-11-style
"sign in screen" in front of the desktop shell — visitors land on the boot video, then a Guest
sign-in screen, and only reach `Desktop` after clicking "Sign in" (no name/email fields, just a
click, with a hover effect + pointer cursor on the button). Reference assets (one `.mp4`, two
`.jpg`) were dropped untracked in `src/components/windows startup/`. Confirmed with Sonny: the
video keeps its sound (not muted), and `startup image.jpg` is not used at all — the loading
screen plays the video directly on a plain black backdrop instead._

- [x] **P346** — Relocate the 2 used reference assets from `src/components/windows startup/` into
      `src/components/startup/assets/`, renamed to `windows-startup.mp4` and
      `sign-in-screen.jpg`; leave `startup image.jpg` untouched in the old folder since it isn't
      used.
      **Pass condition:** the 2 renamed files exist only at their new path; `git status` shows no
      other files changed.

- [x] **P347** — Add `src/components/startup/StartupLoadingScreen.jsx`: a full-screen `<video>`
      (`autoPlay`, `playsInline`, sound on — no `muted`) that calls `onDone` on `onEnded` or
      `onError`; since unmuted autoplay is blocked by browsers without a prior user gesture,
      attempt `videoRef.current.play()` on mount and, if it rejects, show a "Click anywhere to
      continue" hint and let the screen's own click handler retry `play()` (now inside a real
      gesture); once playback actually starts (`onPlay`), arm a safety-timeout fallback so a
      stuck video can never strand a visitor.
      **Pass condition:** `verify` passes; component compiles and exports `onDone` as its only
      prop.

- [x] **P348** — Add `src/components/startup/SignInScreen.jsx`: renders `sign-in-screen.jpg` in a
      16:9 CSS-contain box (`width: min(100vw, calc(100vh * 16 / 9))`, `aspectRatio: '16 / 9'` —
      not `bg-cover` on the full viewport, which would let a vertically off-center overlay drift
      out of alignment on non-16:9 screens) with a real, accessible `<button>` absolutely
      positioned over the art's "Sign in" graphic, `cursor-pointer`, a blue-violet hover/
      focus-visible glow, and an `onSignIn` prop fired on click.
      **Pass condition:** `verify` passes; button is keyboard-focusable and fires `onSignIn` on
      both click and Enter.

- [x] **P349** — Wire `src/App.jsx` into a 3-phase state machine (`boot` → `signin` → `desktop`):
      render `StartupLoadingScreen`, then `SignInScreen`, then the existing 5 context providers +
      `Desktop` only once sign-in is clicked.
      **Pass condition:** `verify` passes; loading a fresh page shows the boot video, then the
      sign-in screen, and only mounts `Desktop` after the Sign in button is clicked.

---

## PHASE 71 — BOOT/SIGN-IN V2: ONE COMBINED VIDEO + A SIGNING-IN TRANSITION VIDEO

_Requested by Sonny on 2026-08-22, superseding Phase 70's separate video + still-image approach.
Sonny dropped two new videos directly into `src/components/startup/assets/`: `loading screen
v2.mp4` (6.15s, 3840×2160) — a single boot animation that ends on the exact Guest/Sign-in frame
the old `sign-in-screen.jpg` was a still of — and `loading screen2.mp4` (2.04s, 3840×2160) — a
short "signing in" spinner. New flow: play video 1 unmuted, let it end and pause naturally on its
last frame (no separate sign-in image needed anymore), reveal a plain `cursor-pointer` "Sign in"
button over the art (no hover glow this time — confirmed with Sonny, keep the pointer cursor
only), then on click play video 2 unmuted before mounting the real desktop. The old
`SignInScreen.jsx`, `sign-in-screen.jpg`, and `windows-startup.mp4` are removed entirely._

- [x] **P350** — Delete `src/components/startup/SignInScreen.jsx` and the now-unused
      `src/components/startup/assets/sign-in-screen.jpg` /
      `src/components/startup/assets/windows-startup.mp4`; rename the 2 new videos to
      `loading-screen-v2.mp4` and `loading-screen-2.mp4` in that same assets folder.
      **Pass condition:** the old component and its 2 assets no longer exist; the 2 new videos
      exist at their renamed paths; `git status` shows no other files changed.
      _(2026-08-24: confirmed `windows-startup.mp4`'s file lock cleared — it's gone from disk and
      nothing references it. All 3 old files removed, both videos renamed.)_

- [x] **P351** — Add `src/components/startup/useUnmutedAutoplay.js`: a small hook (`videoRef`,
      `needsClickToPlay`, `retryPlay`) factoring out the "attempt unmuted `play()` on mount, fall
      back to a click-to-continue prompt on rejection" logic that both boot videos need, so it
      isn't duplicated across the two screen components below.
      **Pass condition:** `verify` passes; hook exports exactly those 3 values.

- [x] **P352** — Rewrite `src/components/startup/StartupLoadingScreen.jsx` to play
      `loading-screen-v2.mp4` (via the new hook) and, once it ends (or errors), reveal a plain
      `cursor-pointer` `<button>` absolutely positioned over the video's baked-in "Sign in"
      graphic — no hover glow — firing a new `onSignIn` prop on click; arm a safety-timeout after
      playback starts so a stuck video can't strand a visitor before the button ever appears.
      **Pass condition:** `verify` passes; component exports `onSignIn` as its only prop.

- [x] **P353** — Add `src/components/startup/SigningInScreen.jsx`: plays `loading-screen-2.mp4`
      (via the same hook) and calls `onDone` on `onEnded` or `onError`, with the same
      safety-timeout pattern.
      **Pass condition:** `verify` passes; component exports `onDone` as its only prop.

- [x] **P354** — Rewire `src/App.jsx`'s phase machine to `boot` → `signing-in` → `desktop`:
      `StartupLoadingScreen`'s `onSignIn` moves to `signing-in`, `SigningInScreen`'s `onDone` moves
      to `desktop` (mounting the existing 5 providers + `Desktop`, unchanged).
      **Pass condition:** `verify` passes; loading a fresh page plays video 1, pauses on its Sign
      in frame, clicking it plays video 2, and it ends into the real desktop.

---

_Requested by Sonny on 2026-08-23: build the Store app's landing page from the mockup in
`src/components/store/assets/components/store landing page.png` (an Amazon-style layout reskinned
as "Sonny's" store) plus the header icons in `src/components/store/assets/icons/` and the one
seeded product in `src/components/store/product/VIBE CODER/`. Confirmed scope: the product grid
shows the 1 real product plus grayed-out "Coming soon" tiles for the rest; "Add to cart" and the
sidebar filters are visual only for now — cart state and real filtering are separate future work._

- [x] **P355** — Create `src/components/store/data/storeProducts.js`: export the seeded product
      array transcribed from `VIBE CODER.txt` (name, description, gender, colors, sizes, material,
      sleeveType, style, image import from `Vibe Coder Front.png`) plus placeholder display fields
      the mockup needs but the txt doesn't provide (badge, rating, reviewCount, boughtCount,
      deliveryEstimate — commented as placeholder dressing), and a `STORE_GRID_SIZE = 4` constant.
      **Pass condition:** `verify` passes; the module exports 1 product object with every field.

- [x] **P356** — Create `src/components/store/theme.js`: brand color constants sampled exactly
      from `store landing page.png` (header navy, secondary/footer navy, gold search-button, gold
      "Add to cart" CTA, "Best Seller" ribbon, star-rating orange, link-text blue, body/secondary
      text gray, page background gray), matching `blog/theme.js`'s plain Tailwind-class-string
      convention.
      **Pass condition:** `verify` passes; every color matches its source region in the mockup.

- [x] **P357** — Create `src/components/store/StoreHeader.jsx` (desktop layout only): navy header
      bar with the Sonny logo (`sonny store logo.png`), "Deliver to / Philippines" block (using
      `pin address.png`), a search bar with an "All" dropdown and gold search button
      (`search.png`), EN/flag text, "Hello, Sign in" / "Returns & Orders" links, and a cart icon
      (`cart.png`) + label.
      **Pass condition:** `verify` passes; rendering `StoreHeader` standalone shows every element
      from the mockup's header.

- [x] **P358** — Create `src/components/store/StoreNav.jsx` (desktop layout only): secondary navy
      bar with a hamburger "All" trigger and the link row (Sonny Promo, Today's Deals, Customer
      Service, Prime Video, Gift Cards, Sell, Registry).
      **Pass condition:** `verify` passes.

- [x] **P359** — Add mobile layout to `StoreHeader.jsx` and `StoreNav.jsx` via `useIsMobile()`:
      header collapses to logo + full-width search + cart icon on one row (deliver-to/sign-in/
      returns/language move below or hide), nav's link row becomes horizontally scrollable.
      **Pass condition:** `verify` passes; a mobile-width viewport shows no horizontal page
      overflow and every header/nav element stays reachable.

- [x] **P360** — Create `src/components/store/StoreProductCard.jsx`: presentational card from a
      `product` prop — image, "Best Seller" ribbon, title, subline, star rating + review count,
      social-proof line, "Click to see price" link, delivery estimate, gold "Add to cart" button
      (no click handler yet, per Sonny's confirmed visual-only scope).
      **Pass condition:** `verify` passes; rendering with the seeded Vibe Coder product shows every
      field from the mockup's card.

- [x] **P361** — Create `src/components/store/StoreComingSoonCard.jsx`: a grayed-out placeholder
      tile matching `StoreProductCard`'s footprint with a centered "Coming soon" label.
      **Pass condition:** `verify` passes.

- [x] **P362** — Create `src/components/store/StoreProductGrid.jsx` (desktop layout only): renders
      one `StoreProductCard` per `storeProducts.js` entry, then `StoreComingSoonCard` tiles up to
      `STORE_GRID_SIZE`, in a 4-column grid.
      **Pass condition:** `verify` passes; the grid shows 1 real card + 3 "Coming soon" tiles.

- [x] **P363** — Add mobile layout to `StoreProductGrid.jsx` via `useIsMobile()`: single-column
      grid, full-width cards.
      **Pass condition:** `verify` passes; a mobile-width viewport shows stacked cards with no
      horizontal overflow.

- [x] **P364** — Create `src/components/store/StoreSidebar.jsx` (desktop layout only): "Popular
      Shopping Ideas" tags + "See more", "Free Shipping by Amazon" checkbox, "Gender" checkbox
      group, "Color" swatch grid, "Customer Reviews" star filter — checkboxes/swatches only toggle
      their own local selected look, no grid filtering wired yet (per Sonny's confirmed scope).
      **Pass condition:** `verify` passes; clicking a checkbox/swatch visibly toggles its selected
      state.

- [x] **P365** — Add mobile layout to `StoreSidebar.jsx` via `useIsMobile()`: collapse the panel
      into a `<details>`-style "Filters" toggle above the grid, collapsed by default.
      **Pass condition:** `verify` passes; a mobile-width viewport shows the collapsed toggle
      instead of the full sidebar, expanding on click.

- [x] **P366** — Create `src/components/store/StoreFooter.jsx` (desktop layout only): 4-column
      dark footer ("Get to Know Us", "Make Money with Us", "Payment Products", "Let Us Help You")
      with static placeholder link labels.
      **Pass condition:** `verify` passes.

- [x] **P367** — Add mobile layout to `StoreFooter.jsx` via `useIsMobile()`: stack the 4 columns
      vertically.
      **Pass condition:** `verify` passes; a mobile-width viewport shows stacked footer columns.

- [x] **P368** — Create `src/components/StoreApp.jsx`: thin orchestrator composing `StoreHeader` +
      `StoreNav` + a body row (`StoreSidebar` + `StoreProductGrid`) + `StoreFooter` in a scrollable
      page container, switching the body row row→column via `useIsMobile()` the same way
      `BlogApp.jsx` does.
      **Pass condition:** `verify` passes; rendering `StoreApp` standalone shows the full landing
      page top to bottom.

- [x] **P369** — Wire the Store icon in `src/components/Desktop.jsx`: import `StoreApp`, add
      `store: [1200, 800]` to `WINDOW_PREVIEW_SIZES`, add a `store` branch to `renderPreviewBody`,
      and add a `w.id === 'store'` branch in the open-window switch rendering
      `<Window icon="🛒" title="Store" defaultWidth={1200} defaultHeight={800}><StoreApp /></Window>`.
      **Pass condition:** `verify` passes; double-clicking the Store desktop icon opens the full
      landing page inside a real window.

- [x] **P370** — Polish caught during a real-browser check of the finished Store landing page:
      `StoreSidebar.jsx`'s headings and checkbox labels ("Popular Shopping Ideas", "Free Shipping
      by Amazon", "Gender", "Color", "Customer Reviews", and every option label) had no explicit
      text color, so they inherited `Window.jsx`'s chrome-wide `text-white` and rendered invisible
      against the sidebar's white background. Add `STORE_BODY_TEXT` to both the desktop and mobile
      `<details>` sidebar containers.
      **Pass condition:** `verify` passes; a live screenshot shows every sidebar heading/label
      legible against the white background.

_Requested by Sonny on 2026-08-23 after reviewing the live Store page: header search-bar sizing/
colors, secondary-nav height, product-card description + hover affordances, and temporarily
duplicating the one real product across all 4 grid slots._

- [x] **P371** — Adjust `StoreHeader.jsx`'s search bar: explicit white input background, gray
      (`bg-gray-200`) "All" dropdown, +50% bar height, shrink the visible pill to 90% width
      (leaving a gap before the language block), and replace the flag emoji (which falls back to
      literal "US" text without a color-emoji font) with an inline SVG `UsFlagIcon` — a real
      country selector is future work.
      **Pass condition:** `verify` passes; a live screenshot shows a white search input, gray "All"
      dropdown, taller/narrower search bar, and a drawn US flag with no "US"/"us" fallback text.

- [x] **P372** — Increase `StoreNav.jsx`'s bar height by ~25% (the "Sonny Promo" / secondary nav
      row).
      **Pass condition:** `verify` passes; a live screenshot shows a visibly taller secondary nav
      bar than before.

- [x] **P373** — In `StoreProductCard.jsx`: render `product.description` in black text, clamped by
      default and expanding to the full text on hover; add a hover effect to the card container;
      add `cursor-pointer` plus a hover effect to the product image.
      **Pass condition:** `verify` passes; a live screenshot/interaction shows the description
      present in black, expanding on hover, the card reacting on hover, and a pointer cursor with a
      visible hover effect over the product image.

- [x] **P374** — In `StoreProductGrid.jsx`, fill every grid slot up to `STORE_GRID_SIZE` by cycling
      through `storeProducts` (currently just the Vibe Coder hoodie repeated) instead of rendering
      `StoreComingSoonCard` placeholders; delete `StoreComingSoonCard.jsx` since it becomes unused.
      **Pass condition:** `verify` passes; the grid shows 4 Vibe Coder cards, no "Coming soon"
      tiles.

- [x] **P375** — Fix caught during a real-browser re-check of P371–P374: taller header/nav plus
      the new per-card description made the Store page's total content taller than the 800px
      window, and because `StoreApp.jsx`'s `StoreHeader`/`StoreNav`/`StoreFooter` (and their body
      row) had no `shrink-0`, flexbox shrank them instead of letting the outer `overflow-auto`
      scroll — `StoreNav`'s "Sonny Promo" bar was squeezed to invisible. Add `shrink-0` to
      `StoreHeader.jsx`, `StoreNav.jsx`, `StoreFooter.jsx`, and the body row in `StoreApp.jsx` so
      the page scrolls as a whole instead of compressing its own chrome.
      **Pass condition:** `verify` passes; a live screenshot shows the full-height secondary nav
      bar with all its links legible.

_Requested by Sonny on 2026-08-23 after a further review of the product card: name styling/
casing, dropping an unsourced placeholder line, a fixed-size card with a hover-modal for the full
description, and a darker Add to cart hover state._

- [x] **P376** — In `StoreProductCard.jsx`, restyle the product name link: bigger
      (`text-base`), bold, default black, hover turns orange
      (`hover:text-orange-500`), replacing the always-blue link style. In
      `storeProducts.js`, fix the `title` string so the product's short name
      is in ALL CAPS and the rest stays Start Case (`"VIBE CODER Unisex
Heavyweight Fleece Pullover Hoodie"`).
      **Pass condition:** `verify` passes; a live screenshot shows the bigger
      bold black name turning orange on hover.

- [x] **P377** — Remove the unsourced `subline` ("Top Rated Streetwear Pick")
      from `StoreProductCard.jsx` and delete the now-unused `subline` field
      from `storeProducts.js`.
      **Pass condition:** `verify` passes; the card no longer renders that
      line.

- [x] **P378** — In `StoreProductCard.jsx`: drop the previous hover-expand
      behavior on the description (the card must stay a fixed size), keep it
      permanently clamped to 3 lines, detect real truncation via a ref
      (`scrollHeight > clientHeight`), and show a "See more" text only when
      truncated; hovering "See more" opens a centered modal (matching the
      existing `fixed inset-0 ... bg-black/30` pattern from
      `BlogArticleModal.jsx`) showing the full description, closing on
      mouse-leave.
      **Pass condition:** `verify` passes; the card's size no longer changes
      on hover, and hovering "See more" shows the full description in a
      modal.

- [x] **P379** — Add a darker gold hover state to the "Add to cart" button in
      `StoreProductCard.jsx` (`STORE_GOLD_CTA_HOVER_BG` in `theme.js`) plus an
      explicit pointer cursor.
      **Pass condition:** `verify` passes; hovering the button shows a
      visibly darker gold with a pointer cursor.

- [x] **P380** — Fix caught after Sonny tested P378's "See more" hover-modal live: the modal
      covered the trigger, so the browser saw the mouse leave "See more" the instant it appeared,
      hiding it again and re-triggering `onMouseEnter` — an open/close flicker loop. In
      `StoreProductCard.jsx`, make the modal fully `pointer-events-none` on desktop (outer overlay
      and inner box) so it can never steal the hover, enlarge the "See more" hit area with
      padding + a matching negative margin, and switch to tap-to-open/tap-to-close (with an
      explicit × button) on mobile via `useIsMobile()`, since touch has no real hover state to
      drive open/close.
      **Pass condition:** `verify` passes; hovering "See more" on desktop shows a stable
      (non-flickering) modal, and on a mobile-width viewport tapping "See more" opens it and the ×
      button closes it.

---

_Requested by Sonny on 2026-08-23, after a brainstorm on using each product's
`product details.txt` notepad (Gender/Color/Sizes/Material/Sleeve type/Style, plus Name/
Description) as the source of the Store's filter facets and search fields. Confirmed scope:
`StoreSidebar.jsx`'s Gender + Color filters and `StoreHeader.jsx`'s search (name + description
only) get wired to real data; Free Shipping and Customer Reviews stay cosmetic since no notepad
field backs them; results sort by `rating` descending — `reviewCount` is left out of the sort
since it's a placeholder string ("171.2K") with no real numeric data yet, not worth parsing for a
value that's about to be replaced._

- [x] **P381** — Create `src/components/store/filterStoreProducts.js`: pure function
      `filterStoreProducts(products, { genders, color, query })` — filters by `genders` (a `Set`;
      empty = no filter, else `genders.has(product.gender)`), by `color` (a name string; `null` =
      no filter, else `product.colors.includes(color)`), and by `query` (case-insensitive
      substring match against `product.name`, `product.title`, and `product.description`; empty =
      no filter) — then sorts the surviving products by `rating` descending. Add
      `filterStoreProducts.test.js` beside it: one happy-path test (mixed gender/color/query
      combination returns the expected subset, sorted by rating) and one failure-path test (a
      query matching nothing returns `[]` with no error).
      **Pass condition:** `npm run verify` passes with both new tests green.

- [x] **P382** — In `StoreSidebar.jsx`: replace the internal `selectedGenders`/`selectedColor`
      `useState` calls with controlled props (`selectedGenders`, `onToggleGender`, `selectedColor`,
      `onSelectColor`) from a parent; change `COLORS` from a flat hex array to `{ hex, name }`
      pairs (names matching `storeProducts.js`'s `colors` strings, e.g. `'Black'`, `'Navy Blue'`),
      rendering `aria-label={color.name}` and comparing `selectedColor === color.name`. Leave
      `freeShipping` as local state — no product field backs it yet, so it stays cosmetic.
      **Pass condition:** `verify` passes; rendering `StoreSidebar` with props supplied from a
      parent stub shows the passed-in selection state, and clicking a swatch/checkbox calls the
      passed-in handler instead of touching local state.

- [x] **P383** — In `StoreHeader.jsx`: accept `searchQuery`/`onSearchChange` props and make the
      search `<input>` controlled (`value={searchQuery}`, `onChange={(e) =>
onSearchChange(e.target.value)}`).
      **Pass condition:** `verify` passes; typing in the search input calls `onSearchChange` with
      the new value on every keystroke.

- [x] **P384** — In `StoreProductGrid.jsx`: accept a `products` prop instead of importing
      `storeProducts` directly. When `products` is empty, render a centered "No products match
      your search." message instead of the grid (guards the existing `% storeProducts.length`
      cycle logic from a divide-by-zero); otherwise keep cycling through `products` to fill
      `STORE_GRID_SIZE` slots as today.
      **Pass condition:** `verify` passes; passing `products={[]}` renders the message with no
      console error; passing a 1-item array still fills 4 grid slots by cycling.

- [x] **P385** — In `StoreApp.jsx`: lift `selectedGenders` (Set), `selectedColor`, and
      `searchQuery` state; pass the filter props into `StoreSidebar` (P382) and the search props
      into `StoreHeader` (P383); call `filterStoreProducts(storeProducts, { genders:
selectedGenders, color: selectedColor, query: searchQuery })` (P381) and pass the result into
      `StoreProductGrid` as `products` (P384).
      **Pass condition:** `verify` passes; live in the Store window, checking "Unisex" keeps the
      Vibe Coder card visible while checking any other single gender empties the grid, and typing
      "xyz" into search shows the "No products match" message.

- [x] **P386** — Fix caught after Sonny tested P380's scoped "See more" popover live: it still
      covered the whole card behind a `bg-black/30` backdrop, dimming the image/price/Add to cart
      just to show more text. In `StoreProductCard.jsx`, move the popover inside the description's
      own `relative` wrapper (`absolute left-0 right-0 top-0`, no backdrop, bordered white box) so
      it only overlays the description area, leaving the rest of the card fully visible.
      **Pass condition:** `verify` passes; hovering "See more" shows a compact bordered popover
      over just the description, with the product image and Add to cart button still visible at
      full opacity.

---

_Requested by Sonny on 2026-08-24: wire a product details page (PDP), reached by clicking a
product's image or name on the Store landing grid, replicating
`src/components/store/assets/components/Product details page v1.png` (collapsed) and `v2.png`
(expanded), plus `Size Chart Modal Screen.png`, using the real facts in
`src/components/store/product/VIBE CODER/product details.txt` (includes the real price, PHP
1750.00). Confirmed scope: full buy-box visual fidelity but with the real price, not the mockup's
fake one; all 5 real colors get swatches but every swatch still shows the existing Black photos
(no invented per-color photography); the image gallery column stays `sticky` while the details +
buy-box columns scroll under it; no new window — `StoreApp.jsx` swaps its own body between grid
and details view._

- [x] **P387** — In `src/components/store/data/storeProducts.js`: add `price: 1750`, import
      `Vibe Coder Back.png`/`Vibe Coder Side.png` and add an `images` array holding the front,
      back, and side imports, add `careInstructions: 'Machine Wash'`, add the Style-section
      facts not already modeled (`neckStyle`, `styleName`, `fitType`, `pattern`, `theme`,
      `seasons`, `hemlineForm`, `occasion`, `sweaterForm`), and the Item-details facts not already
      modeled (`ageRangeDescription`, `modelName`, `itemTypeName`) — all transcribed verbatim from
      `product details.txt`.
      **Pass condition:** `verify` passes; the product object exports every new field with the
      exact notepad values.

- [x] **P388** — Requested by Sonny once the notepad's real price landed: in
      `StoreProductCard.jsx`, replace the placeholder "Click to see price" link with the real
      price, bold and sized like a real price tag (`PHP 1,750.00` formatted from the new
      `product.price` field added in P387).
      **Pass condition:** `verify` passes; every card on the Store landing grid shows "PHP
      1,750.00" instead of "Click to see price".

- [x] **P389** — In `src/components/store/theme.js`: add `STORE_INSTOCK_GREEN`, `STORE_BUYNOW_BG`,
      `STORE_BUYNOW_HOVER_BG` sampled from Amazon's real in-stock green and Buy Now orange
      (matching this file's existing "sample the real brand token" convention).
      **Pass condition:** `verify` passes.

- [x] **P390** — Create `src/components/store/StoreDetailsAccordion.jsx`: reusable collapsible
      section taking `title`, `rows` (`{label, value}[]`), and optional `children`; header row has
      the title plus a down-arrow toggle button (`cursor-pointer`, hover background, rotates 180°
      when open); collapsed by default; open state renders a `divide-y` label/value row grid (bold
      label, plain value) followed by `children` if provided.
      **Pass condition:** `verify` passes; rendering it standalone with 2 rows starts collapsed,
      and clicking the arrow reveals both rows separated by a divider line.

- [x] **P391** — Create `src/components/store/StoreProductGallery.jsx` (desktop layout only):
      vertical thumbnail strip (from `product.images`) beside a larger main image; local
      `activeImageIndex` state defaulting to 0, thumbnail `onMouseEnter` swaps the main image.
      **Pass condition:** `verify` passes; rendering it standalone and hovering the 2nd/3rd
      thumbnail swaps the main image to Back/Side.

- [x] **P392** — Create `src/components/store/StoreSizeChartModal.jsx`: same modal shell as
      `blog/BlogCommentsModal.jsx` (`fixed inset-0 bg-black/30` backdrop closes on click, centered
      white card, × button), containing the "US Mens Hoodies" size table (Brand Size/Chest/Sleeve
      Length/Shoulder/Center back length, S–4XL) transcribed from `Size Chart Modal Screen.png`.
      **Pass condition:** `verify` passes; rendering it standalone shows the full table and calling
      `onClose` (backdrop click or × ) is wired.

- [x] **P393** — Create `src/components/store/StoreProductBuyBox.jsx` (desktop layout only): price
      (`PHP 1,750.00` from `product.price`), delivery estimate + green "In Stock" line (reusing
      `product.deliveryEstimate`), a quantity `<select>` (1–10, decorative), Add to Cart/Buy Now
      buttons (decorative, no cart logic — matching `StoreProductCard.jsx`'s existing Add to Cart),
      and Ships from/Sold by/Returns/Payment/Gift options lines genericized to "Sonny's Store", plus
      an Add to List button.
      **Pass condition:** `verify` passes; rendering it standalone shows the formatted price and
      every buy-box line.

- [x] **P394** — Create `src/components/store/StoreProductInfo.jsx` (desktop layout only): title,
      rating/review-count link, bought-count line, color swatches (hex dot per `product.colors`
      entry, ring on the selected one, same visual language as `StoreSidebar.jsx`'s color filter),
      size buttons (from `product.sizes`) plus a "Size Chart" link that opens
      `StoreSizeChartModal` (P392), then a "Product details" heading with 3 `StoreDetailsAccordion`
      (P390) instances — Top highlights (Fabric type from `product.material`, Care instructions,
      plus the description as an "About this item" paragraph via `children`), Style (Color from
      the selected-color prop, then the Style-section fields), Item details (Product name from
      `product.name`, Age Range Description, Model Name, Item Type Name, Customer Reviews from
      `product.rating`/`reviewCount`).
      **Pass condition:** `verify` passes; rendering it standalone shows all 3 accordions collapsed
      by default, each expanding to the correct rows from the notepad.

- [x] **P395** — Create `src/components/store/StoreProductDetails.jsx` (desktop layout only):
      orchestrator owning `selectedColor` (default `product.colors[0]`) and `selectedSize` state;
      renders a "← Back to results" link (calls `onBack` prop), then a flex row with
      `StoreProductGallery` (P391) in a `sticky top-4 self-start` column and a flex-1 row holding
      `StoreProductInfo` (P394) and `StoreProductBuyBox` (P393).
      **Pass condition:** `verify` passes; rendering it standalone with the seeded product shows
      gallery + info + buy box side by side, and scrolling the page keeps the gallery in place
      while info/buy-box scroll underneath.

- [x] **P396** — In `StoreProductCard.jsx`: add an `onSelect` prop; wire it into the image and
      title `<a href="#">` elements' `onClick` (`e.preventDefault(); onSelect(product.id)`).
      **Pass condition:** `verify` passes; clicking either element calls `onSelect` with the
      product's id.

- [x] **P397** — In `StoreProductGrid.jsx`: accept an `onSelect` prop and forward it to every
      `StoreProductCard` (P396).
      **Pass condition:** `verify` passes.

- [x] **P398** — In `StoreApp.jsx`: add `selectedProductId` state; when set, render
      `StoreProductDetails` (P395) for the matching `storeProducts` entry with an `onBack` prop
      that clears the selection, in place of the `StoreSidebar`+`StoreProductGrid` row; pass
      `setSelectedProductId` as `StoreProductGrid`'s `onSelect` (P397). Header/Nav/Footer stay
      rendered either way.
      **Pass condition:** `verify` passes; live in the Store window, clicking the product image or
      name swaps the grid for the details view, and "← Back to results" returns to the grid with
      filters intact.

- [x] **P399** — Add mobile layout to `StoreProductGallery.jsx` and `StoreProductDetails.jsx` via
      `useIsMobile()`: gallery drops the vertical strip for a horizontal thumbnail row and swaps
      the main image on tap instead of hover; details stacks gallery → info → buy box in normal
      flow with no `sticky`.
      **Pass condition:** `verify` passes; at a mobile viewport the page is a single scrolling
      column and tapping a thumbnail swaps the main image.

- [x] **P400** — Add mobile layout to `StoreProductInfo.jsx` and `StoreProductBuyBox.jsx` via
      `useIsMobile()`: full-width stacked sections, size/color rows wrap instead of overflowing.
      **Pass condition:** `verify` passes; at a mobile viewport every section in both components
      reads full-width with no horizontal overflow.

- [x] **P401** — Fix caught after Sonny reviewed the live PDP: in `StoreProductDetails.jsx`, give
      the root container an explicit `bg-white` so the details page reads white like the rest of
      the Store's content surfaces (product cards, sidebar), instead of inheriting the page's gray
      `STORE_PAGE_BG`.
      **Pass condition:** `verify` passes; the details view's background is white.

- [x] **P402** — Fix caught after Sonny reviewed the live PDP: in `StoreProductBuyBox.jsx`, wrap
      the price through Add to List in a bordered, slightly rounded container — Sonny first asked
      for Add to List to sit outside the border, then corrected that to include it inside.
      **Pass condition:** `verify` passes; the buy box shows one rounded border around everything
      from the price down through Add to List.

- [x] **P403** — Fix caught after Sonny reviewed the live PDP: in `StoreProductGallery.jsx`, give
      the main image a fade in/out crossfade when swapping between thumbnails, using
      `framer-motion`'s `AnimatePresence` + `motion.img` (already a project dependency; matches the
      fade convention already used in `Window.jsx`) instead of an instant `src` swap.
      **Pass condition:** `verify` passes; hovering (desktop) or tapping (mobile) a different
      thumbnail crossfades the main image instead of swapping instantly.

- [x] **P403A** — Requested by Sonny live on the PDP: in `StoreProductGallery.jsx`, add a
      magnifier hover effect to the main image (desktop only, no hover on touch) — a small square
      lens follows the cursor over the image, showing a zoomed-in (~2.5x) crop of the same image
      under the cursor via a background-image lens, `cursor-zoom-in` on the image itself.
      **Pass condition:** `verify` passes; hovering the main image on desktop shows a lens that
      tracks the cursor and displays a magnified crop; nothing changes on mobile.

---

_Requested by Sonny on 2026-08-24: build a local admin portal so Sonny can manage the product
catalog through a login-gated UI backed by a real local database, structured so it can point at a
hosted database later without a rebuild. Confirmed scope (see the approved plan): build-it-yourself
(Express + better-sqlite3 + multer, no managed CMS), mock login credentials (real auth is later
hardening, not now), a minimalist/modern Shopify-admin-styled UI reusing the existing
`sonny store logo.png`, and product codes auto-generated by the server on create and immutable on
edit. This is a new backend + database architectural layer — explicitly approved by Sonny per
CLAUDE.md §2. Nothing here touches `storeProducts.js` or the public Store pages; wiring the public
site to this database is a separate future task. (P400 has since been completed by the parallel
Store PDP work below/above — this note originally deferred it, kept here only for history.)_

- [x] **P404** — Scaffold backend config: create `backend/.env.example` (placeholders for `PORT`,
      `ADMIN_USERNAME`, `ADMIN_PASSWORD`), add `backend/data/` and `backend/uploads/` to
      `.gitignore`, and add a second `files: ['backend/**/*.js']` block to `eslint.config.js` using
      `globals.node` instead of `globals.browser`.
      **Pass condition:** `verify` passes.

- [x] **P405** — Install `express`, `better-sqlite3`, and `multer` as dependencies in
      `package.json`.
      **Pass condition:** `npm run build` and `npm run test` still pass (nothing imports them yet);
      real installed versions recorded in the task's closing report. Installed:
      `express@5.2.1`, `better-sqlite3@13.0.3`, `multer@2.2.0`.

- [x] **P406** — Create `backend/db.js`: opens/creates `backend/data/catalog.db` via
      `better-sqlite3` and runs an idempotent `CREATE TABLE IF NOT EXISTS products` schema
      (flat columns mirroring `storeProducts.js`'s fields; `colors`/`sizes`/`images` as JSON-text
      columns; `code TEXT UNIQUE`, `id` auto-increment primary key).
      **Pass condition:** running the module creates `backend/data/catalog.db` with the `products`
      table, no errors; `verify` passes.

- [x] **P407** — Create `backend/productCode.js` (`generateProductCode(id)` →
      `'PRD-' + String(id).padStart(4, '0')`; `stripImmutableFields(body)` removes `code`/`id` from
      an incoming update body) plus `backend/productCode.test.js` covering the happy path and the
      "client tries to send a code" rejection path.
      **Pass condition:** `npm run test` passes including the two new tests.

- [x] **P408** — Create `backend/middleware/requireAuth.js` (checks a bearer token against the
      mock session) and `backend/routes/auth.js` (`POST /api/login` checks the env-configured mock
      `ADMIN_USERNAME`/`ADMIN_PASSWORD` and returns a token on success).
      **Pass condition:** `verify` passes (not yet mounted into a server).

- [x] **P409** — Add `GET /api/products` and `GET /api/products/:code` handlers to
      `backend/routes/products.js`, reading from `backend/db.js` (public read, no auth needed).
      **Pass condition:** `verify` passes.

- [x] **P410** — Add `POST /api/products` to `backend/routes/products.js`: gated by
      `requireAuth`, inserts the row, then assigns `code` via `generateProductCode(id)`.
      **Pass condition:** `verify` passes.

- [x] **P411** — Add `PUT /api/products/:code` and `DELETE /api/products/:code` to
      `backend/routes/products.js`: both gated by `requireAuth`; `PUT` runs the incoming body
      through `stripImmutableFields()` before saving so `code` can never be overwritten.
      **Pass condition:** `verify` passes.

- [x] **P412** — Create `backend/server.js`: Express app mounting the auth and products routers,
      serving `backend/uploads/` statically at `/uploads`, `multer` configured for the photo
      upload field(s), listening on `process.env.PORT`. Photo uploads go through a dedicated
      `POST /api/uploads` route (multer, returns saved file URLs) rather than mixed into the
      JSON-based product routes.
      **Pass condition:** `node --env-file=backend/.env backend/server.js` starts; a GET request
      to `/api/products` returns `[]` on an empty catalog. Verified live: server logged
      "Admin portal API listening on port 4000" and a GET to `/api/products` returned `[]` (200).

- [x] **P413** — Add a `server.proxy` entry to `vite.config.js` (`/api` and `/uploads` →
      `http://localhost:<PORT>`) and an npm `"server"` script running
      `node --env-file=backend/.env backend/server.js`.
      **Pass condition:** with both `npm run dev` and `npm run server` running, a `fetch` to
      `/api/products` from the Vite dev origin returns the backend's response. Verified live:
      `curl http://localhost:5173/api/products` returned `[]` (200) while both were running.

- [x] **P414** — Create `src/admin/adminTheme.js` (Shopify-style color tokens: light background,
      white sidebar, `#008060` accent — same pattern as `src/components/store/theme.js`) and
      `src/admin/AdminLayout.jsx` (static sidebar using `sonny store logo.png` + nav placeholder,
      topbar) — no data wiring yet.
      **Pass condition:** `verify` passes.

- [x] **P415** — Create `src/admin/api.js` (fetch helper attaching the stored token) and
      `src/admin/AdminLogin.jsx` (form posting to `/api/login`, stores the returned token in
      `sessionStorage` on success).
      **Pass condition:** `verify` passes.

- [x] **P416** — Create `src/admin/AdminApp.jsx` (renders `AdminLogin` or `AdminLayout` based on
      whether a token is in `sessionStorage`) and wire it into `src/main.jsx` via a
      `window.location.pathname.startsWith('/admin')` check at the render root.
      **Pass condition:** `verify` passes; visiting `/admin` shows the login form instead of the
      desktop boot sequence. Verified live via Playwright: `/admin` renders "Admin sign in", not
      the desktop boot video.

- [x] **P417** — Create `src/admin/AdminProductsPage.jsx`: fetches `GET /api/products` and renders
      them as a table; mount it inside `AdminLayout` as the default logged-in view.
      **Pass condition:** `verify` passes; logging into `/admin` shows an (empty) products table.
      Verified live via Playwright: logging in with the mock credentials renders the Products
      table with "No products yet."

- [x] **P418** — Create `src/admin/AdminProductForm.jsx` with Basic Info + Variants sections,
      wired to `POST /api/products` from an "Add product" action on `AdminProductsPage.jsx`.
      **Pass condition:** `verify` passes; submitting the form creates a product that appears in
      the table with an auto-generated `PRD-000x` code. Verified live via Playwright: submitting
      "Test Hoodie" produced code `PRD-0001` in the table (test data removed afterward).

- [x] **P419** — Add a Photos section to `AdminProductForm.jsx`: multi-file upload input with
      thumbnail previews, submitted as `multipart/form-data` to the `multer`-backed
      `POST /api/uploads` endpoint (uploaded first, then its returned URLs go into the product's
      JSON `images` field).
      **Pass condition:** `verify` passes; uploaded photos show as thumbnails and are retrievable
      from `/uploads/...` after saving. Verified live via Playwright: uploading a photo showed a
      preview thumbnail, and after saving, the file was present on disk and returned 200 from
      `/uploads/<filename>` (test artifacts removed afterward).

- [x] **P420** — Add the Product Details section (Top Highlights / Style / Item Details, matching
      the existing product notepad structure) to `AdminProductForm.jsx`; wire an edit mode using
      `PUT /api/products/:code` with the code field shown read-only.
      **Pass condition:** `verify` passes; editing a product and changing any other field leaves
      its code unchanged. Verified live via Playwright: created `PRD-0001`, edited its name and
      price, code remained `PRD-0001` throughout (test artifacts removed afterward).

- [x] **P421** — Add a delete action (with a confirm step) to `AdminProductsPage.jsx`'s table,
      calling `DELETE /api/products/:code`.
      **Pass condition:** `verify` passes; deleting a product removes it from both the table and
      `catalog.db`. Verified live via Playwright: created then deleted "Delete Test Hoodie",
      table showed "No products yet." and `GET /api/products` returned `[]` afterward.

- [x] **P422** — Append LESSONS.md entries for anything that surprised us across P404–P421 (e.g.
      `better-sqlite3` native-module build behavior on Windows, `--env-file` quirks), or note
      "none" if nothing did.
      **Pass condition:** `npm run verify` still green. Logged: the destructure-to-omit
      `no-unused-vars` lint trap, and the background-task/TaskStop "completed" status not proving
      an `npm run <script>`-spawned process actually exited on this setup.

---

_Requested by Sonny on 2026-08-24, after trying the live admin portal: the logo is invisible on
`AdminLogin.jsx`'s white background (it's designed for a dark backdrop, per its use in
`StoreHeader.jsx`'s navy header), the sidebar only has one nav item, there's no way to log out or
change any portal-wide color, and the native file input under Photos looks like unstyled browser
chrome. Confirmed scope: fix login contrast using the Store's own navy
(`STORE_HEADER_BG`/`#131921`), add Settings + Logout to `AdminLayout.jsx`, add a
runtime-selectable accent color (reusing the existing `src/data/accentColors.js` palette already
used by the desktop's Personalization settings — one source of truth, not a second color list),
and restyle the Photos file input as a real button._

- [x] **P423** — Give `AdminLogin.jsx`'s card the same navy background as `StoreHeader.jsx`
      (`#131921`) so the logo (built for a dark backdrop) is visible, adjusting label/input/link
      text colors for contrast against navy instead of white.
      **Pass condition:** `verify` passes; the logo is visibly legible on the login page. Verified
      live via Playwright screenshot: the white "Sonny" logo is clearly visible against the navy
      background.

- [x] **P424** — Add a "Settings" nav item to `AdminLayout.jsx`'s sidebar (a new
      `src/admin/AdminSettingsPage.jsx` placeholder) and a "Log out" button in the topbar (clears
      the stored token, returns to `AdminLogin`); `AdminApp.jsx` gets a small `view` state
      ('products' | 'settings') so the sidebar can switch between them.
      **Pass condition:** `verify` passes; clicking Settings swaps the main content, clicking Log
      out returns to the login form. Verified live via Playwright: login → Products page,
      clicking Settings swaps to the placeholder, clicking Log out returns to the sign-in form.

- [x] **P425** — Add a runtime-selectable accent color: `src/admin/AdminSettingsContext.jsx`
      (mirrors `src/context/SystemSettingsContext.jsx`'s pattern) holds `accentColor`, persisted to
      `localStorage`, sourced from the existing `src/data/accentColors.js` palette; wire the chosen
      hex as a `--admin-accent` CSS variable on `AdminLayout.jsx`'s root, and change
      `adminTheme.js`'s accent tokens to reference `var(--admin-accent)` (with `/10` opacity for
      the soft/active tint and `hover:brightness-90` instead of a separate hover hex) so every
      accent-colored element in the portal updates together. Add the picker UI to
      `AdminSettingsPage.jsx`.
      **Pass condition:** `verify` passes; picking a different color in Settings changes the "Add
      product" button and active nav highlight, and the choice survives a page reload. Verified
      live via Playwright: default green (`rgb(34,197,94)`) → picked purple → button became
      `rgb(168,85,247)` → survived a full page reload.

- [x] **P426** — Restyle the native file input in `AdminProductForm.jsx`'s Photos section using
      Tailwind's `file:` variant (styled button-like appearance for the "Choose files" control)
      instead of default unstyled browser chrome.
      **Pass condition:** `verify` passes; the Photos file picker renders as a themed button, not
      plain browser text. Hit a real bug getting here: composing the class at the call site as
      `` `file:${ADMIN_ACCENT_BG}` `` never appears as literal text in source, so Tailwind's
      scanner silently generated no CSS for it — fixed by adding
      `ADMIN_ACCENT_FILE_BUTTON_BG`/`_HOVER` as full literal strings in `adminTheme.js`. Verified
      live via Playwright: `getComputedStyle(input, '::file-selector-button').backgroundColor`
      now resolves to the accent color instead of transparent, and a screenshot confirms a real
      green "Choose Files" button.

- [x] **P427** — Sonny picked blue in Settings and wants it as the portal's actual brand default
      (matching the desktop app's own default accent — `SystemSettingsContext.jsx` defaults to
      `'blue'` too): change `AdminSettingsContext.jsx`'s `DEFAULT_ACCENT_ID` from `'green'` to
      `'blue'`. Also updated `adminTheme.js`'s hardcoded `var(--admin-accent, ...)` fallback from
      Shopify green to the same blue, so the login page (which sits outside
      `AdminSettingsProvider`) matches too.
      **Pass condition:** `verify` passes; clearing `localStorage` and reloading `/admin` shows
      the blue accent by default. Verified live via Playwright in a fresh, storage-free browser
      context: the "Add product" button rendered `rgb(59, 130, 246)` (`#3b82f6`) with no stored
      preference at all.

---

_Requested by Sonny on 2026-08-24: configure real "Add to cart" behavior (currently the buttons on
both `StoreProductCard.jsx` and `StoreProductBuyBox.jsx` are inert) and add a Shopping Cart page,
per the new reference mockup `Shopping cart landing page.png`. Cart state is client-only (matches
the existing localStorage-backed pattern used elsewhere, e.g. arcade scores) — no backend
involvement, since the Store's product catalog read is the only backend piece in scope._

- [x] **P428** — Create `src/context/StoreCartContext.jsx` (mirrors `AdminSettingsContext.jsx`'s
      provider/hook/localStorage pattern): `StoreCartProvider` holds a `storeCart`-localStorage-
      backed `items` array of `{productId, color, size, quantity}`, with `addItem` (merges
      quantity into an existing matching line), `updateQuantity`, `removeItem`, and a derived
      `itemCount`; export a `useStoreCart()` hook. Wrap `StoreApp.jsx`'s returned JSX in the new
      provider.
      **Pass condition:** `verify` passes. Verified: `npm run verify` green (52 tests passed).

- [x] **P429** — Wire the two existing inert "Add to cart" buttons to `useStoreCart().addItem()`:
      `StoreProductBuyBox.jsx` (needs `selectedColor`/`selectedSize` passed down as new props from
      `StoreProductDetails.jsx`, using its own `quantity` state) and `StoreProductCard.jsx` (quick-
      add using `product.colors[0]` / `product.sizes[2]`, quantity 1).
      **Pass condition:** `verify` passes; clicking either button adds a line to the cart. Verified:
      `npm run verify` green (52 tests passed).

- [x] **P430** — `StoreHeader.jsx`: read `itemCount` from `useStoreCart()` and show it as a small
      badge on the cart icon (reusing `STORE_BADGE_BG` from `theme.js`), hidden when the cart is
      empty.
      **Pass condition:** `verify` passes; adding an item updates the header badge count. Verified:
      `npm run verify` green (52 tests passed).

- [x] **P431** — Create `src/components/store/StoreCartPage.jsx` recreating the "Shopping Cart"
      mockup (normal web sizing, not literal mockup proportions, per Sonny's earlier mockup-sizing
      note): heading, one row per cart line (thumbnail, title linking back to that product's
      details, Color/Size, a +/− quantity stepper wired to `updateQuantity`, a Delete link wired to
      `removeItem`, line price), a subtotal footer, and an empty-cart state. Wire it into
      `StoreApp.jsx` by replacing the ad hoc `selectedProductId`-only view logic with an explicit
      `view` ('grid' | 'details' | 'cart') state — the header cart icon sets `view = 'cart'`, and
      the cart page's own back link returns to `'grid'`.
      **Pass condition:** `verify` passes; clicking the header cart icon shows the cart page with
      correct items/quantities/subtotal, editing quantity and deleting both work live, and an empty
      cart shows the empty state. Verified live via Playwright: added a quick-add line and a
      qty-2/Navy Blue/XL line from product details (badge went 1 → 3), cart page showed both lines
      with correct color/size/price and a `PHP 5,250.00` subtotal, `+` on the first line bumped
      qty/price/badge/subtotal together, Delete removed a line, deleting the rest showed the empty
      state with a working "Continue shopping" link, and a full page reload (re-running the boot →
      sign-in sequence) preserved the badge count via `localStorage`.

- [x] **P432** — Verify the full flow live (Playwright): add from a grid card, add from a product
      details page, change quantity in the cart, delete an item, confirm the empty state, confirm
      the count persists across a reload (localStorage). Append LESSONS.md entries for anything
      that surprised us, or note "none".
      **Pass condition:** `npm run verify` still green. Verified: full flow above passed with no
      console/page errors; logged a Windows-path `require()` gotcha and a role-vs-text locator
      timeout refinement to LESSONS.md.

- [x] **P433** — `AdminProductForm.jsx`: add an optional `options: string[]` to `DETAIL_SECTIONS`
      field entries, and support native autocomplete in the detail-field render loop (an
      `<input list="...">` paired with a sibling `<datalist>` when a field defines `options`;
      fields without `options` render exactly as today). Wire `options` for the "Top Highlights"
      section's `careInstructions` field only, as the working proof: Machine Wash Cold, Tumble Dry
      Low / Machine Wash Cold, Do Not Bleach, Tumble Dry Low, Do Not Iron / Machine Wash Warm,
      Tumble Dry Low, Do Not Bleach / Hand Wash Only, Lay Flat to Dry / Hand Wash Cold, Do Not
      Bleach, Dry Flat, Do Not Iron / Hand Wash Cold, Line Dry / Dry Clean Only / Machine
      Washable, Do Not Tumble Dry / Spot Clean Only. No new dependency — native HTML only, per
      CLAUDE.md §2.
      **Pass condition:** `verify` passes; typing in Care instructions shows the 9 suggestions,
      picking one fills the field, and typing a value not in the list still saves.
      _(2026-08-24: `npm run verify` green — 0 errors, 9 pre-existing-pattern warnings, 52 tests;
      confirmed the 9 option strings compile into the production bundle. Full live browser
      verification of the datalist wiring done at P436, once all fields' data existed.)_

- [x] **P434** — Data only, no render-logic changes: add `options` arrays to `neckStyle`,
      `fitType`, `pattern`, and `theme` in `DETAIL_SECTIONS` (Amazon/apparel-vocabulary values
      approved by Sonny 2026-08-24).
      **Pass condition:** `verify` passes; each field's datalist shows its approved suggestions
      and still accepts a typed value outside the list.
      _(2026-08-24: `npm run verify` green — 0 errors, 9 pre-existing warnings, 52 tests.)_

- [x] **P435** — Data only: add `options` arrays to `seasons`, `sleeveType`, `hemlineForm`, and
      `occasion` in `DETAIL_SECTIONS`.
      **Pass condition:** same as P434.
      _(2026-08-24: `npm run verify` green — 0 errors, 9 pre-existing warnings, 52 tests.)_

- [x] **P436** — Data only: add `options` arrays to `sweaterForm`, `ageRangeDescription`, and
      `itemTypeName` in `DETAIL_SECTIONS`.
      **Pass condition:** same as P434.
      _(2026-08-24: `npm run verify` green — 0 errors, 9 pre-existing warnings, 52 tests; ran
      `prettier --write` first since the 6-value `ageRangeDescription` array tripped
      `format:check`'s line-wrap rule. Live-verified via npx-cached Playwright (per LESSONS.md's
      existing pattern), reusing the already-running dev+backend servers and a real login token
      fetched from `backend/.env` without displaying it: `careInstructions`, `neckStyle`,
      `sweaterForm`, `ageRangeDescription`, and `itemTypeName` datalists each rendered exactly
      their approved option lists; `styleName`/`modelName` correctly had no datalist; a value
      typed outside the list was still accepted; zero console errors; no product was saved, so
      the shared dev DB stayed untouched.)_

---

_Requested by Sonny on 2026-08-24, after trying the live Shopping Cart page: it read as a plain
white page with a small thumbnail, not matching the `Shopping cart landing page.png` reference
(gray page behind a white cart card) — and there was no checkout entry point yet._

- [x] **P437** — `StoreCartPage.jsx`: switch the page background to `STORE_PAGE_BG` (gray, matching
      the rest of the Store) with the cart content in its own white rounded card (per the reference
      mockup), enlarge each line's product thumbnail to a `32rem` centered box (~4x the prior
      `h-32`/`w-32`), and add an inert "Proceed to Checkout" button next to the subtotal (its own
      landing page comes later).
      **Pass condition:** `verify` passes; the cart page shows a gray backdrop behind a white card,
      a substantially larger centered product photo, and a Checkout button. Verified live via
      Playwright: gray page visible around the white card in both a normal and a maximized window,
      the thumbnail rendered far larger than before, and scrolling down revealed the subtotal next
      to a working (inert) "Proceed to Checkout" button — `npm run verify` green throughout (52
      tests).

- [x] **P438** — `StoreCartPage.jsx`: Sonny asked to cut the P437 thumbnail size by 25% — `32rem`
      (512px) → `24rem`/`h-96`/`w-96` (384px).
      **Pass condition:** `npm run verify` passes.

---

## PHASE 72 — STORE SIGN IN / ACCOUNT (MOCK, NO REAL AUTH)

_Requested by Sonny on 2026-08-24, with 3 Amazon reference screenshots: a hover flyout under the
header's "Hello, sign in" block (yellow "Sign in" button + "New customer? Start here." link), and
a full-page sign-in card (logo, heading, single field, yellow "Continue" button, footer links).
Confirmed scope: no real authentication — a visitor just types a name, which becomes the header's
greeting. Sign-in asks "Enter name"; sign-up asks "Enter name to create account" and sits on a navy
background instead of white, because the "Sonny" logo's lettering is white and disappears on a
white page — the navy header is the only place it currently reads correctly._

- [x] **P439** — Add a hover flyout under the "Hello, sign in" block in `StoreHeader.jsx`: a small
      white card (shown on `group-hover`, positioned below the block) containing a yellow "Sign
      in" button and a "New customer? Start here." link, firing new `onSignInClick` /
      `onSignUpClick` props.
      **Pass condition:** `npm run verify` passes; hovering the block reveals the card and each
      control fires its prop on click.
      _(2026-08-24: Sonny reported the pure-`group-hover` version could close before he reached the
      button — the small gap between trigger and flyout briefly hovers neither. Reworked to
      JS-driven open/close state with a close delay (cancelled by re-entering either element), plus
      a `bg-black/50` backdrop dimming the page below the header while it's open, matching the
      reference screenshots. Follow-up rounds: shortened the delay 2s → 1s; added an
      outside-mousedown listener that closes the menu immediately; fixed the backdrop only dimming
      a sliver the width of the trigger (it was `inset-x-0` on the *trigger's* own narrow box —
      moved it to the full-width header container instead); discovered `StoreHeader`'s root is a
      flex item of `StoreApp`'s column flex container, so a bare `position:relative` with no
      z-index falls back to DOM order for flex-item stacking — `StoreNav`/the product grid, being
      later siblings, painted over the header's backdrop regardless of the backdrop's own `z-40`;
      fixed by giving the header root itself an explicit `z-40`. Also fixed the menu staying stuck
      open (backdrop and all) after clicking "Sign in"/"Start here." navigated to a different page,
      since moving into a descendant button never fires the trigger's `onMouseLeave` — both clicks
      now explicitly close the menu before firing their nav callback. Verified end-to-end with a
      Playwright script driving the real dev build.)_

- [x] **P440** — Create `src/components/store/StoreSignInPage.jsx`: centered white card on the
      page background — "Sonny" logo, "Sign in" heading, "Enter name" label + text input, yellow
      "Continue" button that calls `onSignIn(name)` (disabled/no-op while the field is empty), and
      a "New customer? Start here." link calling `onSignUp`.
      **Pass condition:** `npm run verify` passes; typing a name and clicking Continue calls
      `onSignIn` with that name.
      _(2026-08-24: Sonny asked to drop the "Sonny" logo from this page — the "Sonny" wordmark
      renders white-on-transparent, so on this page's white background it was invisible anyway.)_

- [x] **P441** — Create `src/components/store/StoreSignUpPage.jsx`: same card layout as P440 but
      the page background is the header's navy (`STORE_HEADER_BG`) so the logo's white lettering
      is visible; heading "Create account", label "Enter name to create account" + text input,
      yellow "Continue" button calling `onSignUp(name)`, and a link back to sign in calling
      `onSignIn`.
      **Pass condition:** `npm run verify` passes; typing a name and clicking Continue calls
      `onSignUp` with that name.
      _(2026-08-24: Sonny asked for Sign in and Create account to share the same plain white
      background with no logo on either — dropped the navy background and the logo from this
      page, matching `StoreSignInPage.jsx`'s style exactly.)_

- [x] **P442** — Wire it together in `StoreApp.jsx`: add a `userName` state and `'signin'` /
      `'signup'` values to `view`; the header flyout's two props switch to those views; each page's
      success callback sets `userName` and returns to `'grid'`; pass a `userName` prop into
      `StoreHeader.jsx` so the block reads "Hello, {userName}" (bold line becomes "Account") once
      signed in instead of "Hello, sign in" / "Sign in".
      **Pass condition:** `npm run verify` passes; clicking Sign in → entering a name → Continue
      returns to the store grid with the header greeting showing that name.

- [x] **P443** — `StoreHeader.jsx`: make the signed-in "Hello, {userName} / Account" block
      click-to-toggle (not hover) a small flyout with a "Sign out" button, calling a new
      `onSignOutClick` prop; wire `StoreApp.jsx` to clear `userName` on sign-out.
      **Pass condition:** `npm run verify` passes; clicking "Account" reveals "Sign out", and
      clicking it returns the header to "Hello, sign in" / "Sign in".
      _(2026-08-24: reused the existing account-menu state/backdrop/outside-click machinery from
      P439 rather than a second implementation. Whole P439-P443 flow — hover open with delay,
      outside-click close, sign in → sign up → sign in → complete sign-in → open Account → sign out
      — verified end-to-end with a Playwright script against the real dev build; `npm run verify`
      green throughout (52 tests).)_

---

## PHASE 73 — STORE CHECKOUT (MOCK, NO REAL PAYMENT)

_Requested by Sonny on 2026-08-24, with an Amazon "Payment Options" checkout reference screenshot
(5-step indicator: Shipping Address / Shipping Options / Payment Options (active) / Gift Options /
Place Order; a white card with a two-column credit-card form + gift-card/bank-account column;
Back/Next buttons). Confirmed scope: reuse the existing `StoreHeader`/`StoreNav` chrome (no
separate simplified logo bar); stub all 5 steps so the flow is fully clickable end-to-end, with
Payment Options built out to match the screenshot in detail; Back/Next are functional and the
Place Order step shows real order details pulled from the cart plus a mock "Place your order"
action — no real payment gateway or order backend, per the §2/Backlog ban on payments and new
architectural layers. Card-network badges (Visa/Mastercard/etc.) are plain text badges, not real
logos, since no icon library or image assets exist for them and neither can be added._

- [x] **P444** — Create `src/components/store/StoreCheckoutSteps.jsx`: export a `CHECKOUT_STEPS`
      array (5 entries — `shipping-address`, `shipping-options`, `payment`, `gift-options`,
      `place-order` — each `{ key, label, heading }`) and a component rendering the numbered step
      row ("01 Shipping Address" … "05 Place Order"), active step bold + `STORE_STAR_COLOR`, other
      steps `STORE_SECONDARY_TEXT`, with a `border-b border-gray-200 pb-3` beneath the row.
      **Pass condition:** `npm run verify` passes; rendering with `activeStep="payment"` bolds only
      "03 Payment Options" in orange.

- [x] **P445** — Create `src/components/store/StoreCheckoutPlaceholderStep.jsx`: a small reusable
      stub body (one descriptive paragraph, `text-sm text-gray-600`) shared by the three
      not-yet-built steps (Shipping Address, Shipping Options, Gift Options) so their placeholder
      markup isn't duplicated three times.
      **Pass condition:** `npm run verify` passes.

- [x] **P446** — Create `src/components/store/StoreCheckoutPaymentStep.jsx`: the detailed Payment
      Options body matching the screenshot — two-column `grid md:grid-cols-2` (right column
      `md:border-l md:border-gray-200 md:pl-8`); left column "Credit or Debit Card" with Name on
      card / Card Number / Security Code + Expiration month+year `<select>`s, styled like
      `StoreSignInPage.jsx`'s inputs; right column "Gift Cards & Promotional Codes" (`STORE_LINK_BLUE`
      link text) and "Add a Bank Account" heading; bottom small print ("Sonny's Store accepts all
      major credit and debit cards") plus a row of plain bordered text badges (VISA, Mastercard,
      Amex, Discover, JCB, UnionPay).
      **Pass condition:** `npm run verify` passes.
      _(2026-08-24: landed at ~95 lines, over the §4.4 ≤50-line guideline — the two-column
      credit-card form is one cohesive visual unit, same call as `PaintToolbar.jsx`'s logged
      precedent to keep a single control cluster whole rather than fragment it across files.)_

- [x] **P447** — Create `src/components/store/StoreCheckoutPlaceOrderStep.jsx`: reuse the
      `useStoreCart()` + `storeProducts.find` join from `StoreCartPage.jsx` to list order line
      items (thumbnail, title, qty, price) and a subtotal, plus a "Place your order" button that
      flips local state to an inline mock confirmation ("Order placed — this is a demo, no real
      order was submitted"), matching the no-backend precedent set by Sign In/Sign Up.
      **Pass condition:** `npm run verify` passes; with items in the cart, the step lists them and
      clicking "Place your order" shows the mock confirmation.

- [x] **P448** — Create `src/components/store/StoreCheckoutPage.jsx`: orchestrator with internal
      `step` state (`useState('shipping-address')`) over `CHECKOUT_STEPS`; gray page wrapper
      (`shrink-0 flex-1 p-4 ${STORE_PAGE_BG} ${STORE_BODY_TEXT}`) rendering `StoreCheckoutSteps`,
      then a white card (`mx-auto mt-3 max-w-5xl rounded-lg bg-white p-6 shadow-sm`) whose header
      row shows the current step's `heading` plus a light-gray "Next" button advancing `step`
      (except on `place-order`, which renders `StoreCheckoutPlaceOrderStep`'s own action instead);
      body switches on `step` across the placeholder/payment/place-order components; a `← Back`
      link below the card steps back through `CHECKOUT_STEPS` or calls the `onExitToCart` prop on
      the first step.
      **Pass condition:** `npm run verify` passes; clicking Next/Back moves through all 5 steps in
      order.

- [x] **P449** — Wire it into `StoreApp.jsx` (add `'checkout'` to the `view` union and render
      `<StoreCheckoutPage onExitToCart={() => setView('cart')} />` when active) and
      `StoreCartPage.jsx` (add an `onCheckout` prop wired to the existing inert "Proceed to
      Checkout" button, passed from `StoreApp.jsx` as `() => setView('checkout')`).
      **Pass condition:** `npm run verify` passes; from the Cart page, clicking "Proceed to
      Checkout" opens the checkout flow at Shipping Address.

- [x] **P450** — Verify the full flow live in the running dev app: Cart → Proceed to Checkout →
      Next through all 5 steps → Payment Options visually matches the reference screenshot's
      structure → Place Order shows the actual cart items/subtotal → "Place your order" shows the
      mock confirmation → Back steps back through the flow, and Back from step 1 returns to Cart.
      **Pass condition:** every step in the click-through above behaves as described.
      _(2026-08-24: verified end-to-end with a Playwright script against the real dev build —
      added item to cart, Proceed to Checkout, stepped through all 5 headings via Next, Payment
      Options screenshot matches the reference mockup's structure (steps bar, two-column form,
      gift-card/bank-account column, card-network badges), Place Order listed the real cart line
      item/qty/total, Place your order showed the mock confirmation, and 5x Back correctly
      unwound Place Order → … → Shipping Address → Shopping Cart. Caught and fixed one bug this
      pass missed if it had only been visual: the year `<select>` clipped to "202" instead of
      "2026" because it inherited `w-full` from a shared `INPUT_CLASS` inside an unconstrained
      flex row — split the shared class so `w-full` is applied only at each call site that needs
      it, with `w-16`/`w-20` on the month/year selects instead.)_

---

## PHASE 75 — ADMIN PORTAL: STALE-SESSION BUG + STYLE NAME AUTOCOMPLETE

_Sonny asked on 2026-08-24 where the admin catalog saves locally and reported "Product is not
working," plus asked for the "Style name" field to get autocomplete like its sibling fields.
Diagnosis: the catalog is a real SQLite file at `backend/data/catalog.db` (created by `db.js`
relative to its own location, not the cwd) — confirmed by inspection, no bug there. "Product is
not working" traced to two possible causes: (1) the backend (`npm run server`) not running at all
— `npm run dev` only starts the Vite frontend, so if the API is down, login itself fails with a
cryptic "Request failed: 502"; (2) a real bug — `backend/middleware/requireAuth.js` keeps valid
tokens in an in-memory `Set` with no persistence, so restarting the backend (routine during local
dev, no nodemon configured) silently invalidates every session server-side while the token in
`sessionStorage` still looks valid to `AdminApp.jsx`, which only checks "is there a token string,"
never validating it against the server. The products list still loads fine (`GET /products` has no
auth), so the page looks normal — but every write (add/edit/delete a product, upload a photo) then
fails with an unexplained "Unauthorized," which is indistinguishable from "broken" to a user with
no reason to suspect a stale token. Reproduced both failure modes end-to-end with Playwright against
the real dev build before fixing._

- [x] **P451** — `src/admin/api.js`: when `apiFetch` gets a 401 back on a request that carried a
      Bearer token, clear the token and dispatch a `window` `'admin:unauthorized'` event (a plain
      login failure, which never carries a token, is unaffected). Wire `AdminApp.jsx` to listen for
      that event and drop back to `AdminLogin`; `AdminLogin.jsx` takes a new `notice` prop and shows
      it above the form.
      **Pass condition:** `npm run verify` passes; overwriting `sessionStorage`'s token with a
      value the backend never issued, then trying to save a product, bounces to the login screen
      showing "Session expired — please sign in again." instead of a bare unexplained error.
- [x] **P452** — `src/admin/AdminProductForm.jsx`: give the `styleName` field an `options` list
      (researched real apparel "style name" vocabulary — Baseball, Henley, Rugby, Bolero, Camisole,
      Duster, Peplum, etc. — distinct from the existing Neck style/Item type lists) so it gets the
      same native-`<datalist>` autocomplete as its sibling Style-section fields; no other code
      change needed since the JSX already renders a `<datalist>` whenever `field.options` exists.
      **Pass condition:** `npm run verify` passes; the Style name field's datalist contains the new
      options.
      _(Verified both end-to-end with Playwright against the real dev build; test rows created
      during diagnosis — PRD-0001–0003 — were deleted from `backend/data/catalog.db` at Sonny's
      request afterward.)_

---

## PHASE 76 — CONNECT THE STORE TO THE ADMIN CATALOG (DRAFT → PREVIEW → PUBLISH)

_Sonny asked on 2026-08-24 how a product saved in admin gets onto the Store — answer: it didn't,
the Store rendered a hardcoded static file (`src/components/store/data/storeProducts.js`,
1 product: VIBE CODER) completely disconnected from `backend/data/catalog.db`. Confirmed scope
after a plan-mode design pass (see chat): admin Save creates a Draft (admin-only); a Preview button
renders the actual Store product page inline in the admin Products page; a separate Publish action
is what makes a product visible on the real Store. VIBE CODER is removed from the Store, not
migrated — the Store shows its existing empty state until Sonny publishes something himself. No
"unpublish" endpoint (not requested); the color-swatch hex dictionary staying tied to the 5 mock
color names (admin-entered colors outside that list get an uncolored swatch, not a crash) is a
known, accepted gap, not fixed here._

- [x] **P453** — `backend/db.js`: add `published INTEGER NOT NULL DEFAULT 0` to the products table
      (fresh installs) plus a `PRAGMA table_info` migration guard that `ALTER TABLE`s it in for the
      already-existing `catalog.db`. `backend/routes/products.js`: `deserializeProduct` exposes
      `published` as a boolean; `GET /` filters to `published = 1` when `?published=true` is passed
      (admin's own fetch, with no query param, is unaffected — still sees every row); new
      `PATCH /:code/publish` (behind `requireAuth`) flips it to published. `published` is
      deliberately excluded from `PRODUCT_FIELDS` so the regular Save/Edit flow can never touch it.
      **Pass condition:** `npm run verify` passes.
- [x] **P454** — Create `src/utils/mapCatalogProduct.js` (`mapCatalogProductToStoreProduct`), the
      one place that turns a catalog DB row into the shape every Store component expects —
      guarantees `colors`/`sizes`/`images` are always arrays, derives the singular `image` from
      `images[0]`, and leaves `rating`/`reviewCount`/`boughtCount`/`badge`/`deliveryEstimate`
      undefined (no real data source; existing components render fine without them, apart from 2
      small guards added below). Used by both the Store's live fetch and the admin preview.
      **Pass condition:** `npm run verify` passes; happy-path and missing-fields unit tests pass.
- [x] **P455** — `src/components/store/StoreProductInfo.jsx`: only add the "Customer Reviews" row
      when both `rating`/`reviewCount` are present (was a raw template string that printed the
      literal text "undefined ★ (undefined reviews)"). `src/components/store/StoreProductCard.jsx`:
      wrap the badge ribbon in `{product.badge && (...)}` so a missing badge renders nothing
      instead of an empty colored box.
      **Pass condition:** `npm run verify` passes.
- [x] **P456** — Create `src/context/StoreCatalogContext.jsx` (`StoreCatalogProvider` +
      `useStoreCatalog`, mirroring `StoreCartContext.jsx`'s pattern exactly): fetches
      `GET /api/products?published=true` once on mount, maps rows via P454's mapper, exposes
      `{ products, loading, error }` (a failed fetch — e.g. the backend not running — sets a short
      error string instead of silently rendering an empty grid).
      **Pass condition:** `npm run verify` passes.
- [x] **P457** — Wire the Store off the static file: split `StoreApp.jsx` into a thin outer
      `StoreApp` (renders `StoreCatalogProvider`) and `StoreAppContent` (reads `products` from
      `useStoreCatalog()`, shows the `error` string inline above the grid if set); swap the same
      hook into `StoreCartPage.jsx` and `StoreCheckoutPlaceOrderStep.jsx` in place of the static
      import; `StoreProductGrid.jsx`'s `STORE_GRID_SIZE` becomes a local constant (its only
      remaining consumer). Delete `src/components/store/data/storeProducts.js` (the VIBE CODER
      image assets under `src/components/store/product/VIBE CODER/` are left on disk, orphaned but
      harmless).
      **Pass condition:** `npm run verify` passes; with an empty catalog the Store grid shows "No
      products match your search."
- [x] **P458** — Create `src/admin/AdminProductPreview.jsx`: maps the given product via P454 and
      renders the real `StoreProductDetails` inline (wrapped in a local `StoreCartProvider` so Add
      to cart/Buy Now don't crash — `StoreProductDetails`/`StoreProductBuyBox` call `useStoreCart()`
      unconditionally), with a header bar showing draft/published status plus Publish (hidden once
      published) and Close buttons. Wire `AdminProductsPage.jsx`: a Status column (Draft/Published
      badge), a Preview button per row, and `handlePublish` (`PATCH /:code/publish`) updating both
      the row and the open preview on success.
      **Pass condition:** `npm run verify` passes.
- [x] **P459** — Verify the full flow end-to-end against the real dev build with Playwright: Store
      grid empty with zero published rows → create a draft in admin → Preview renders the real
      product page inline with no "undefined"/empty-badge artifacts → Store still shows the empty
      grid (draft isn't public) → Publish → Store now shows the product in the grid and its detail
      page → Add to cart → Cart page resolves the line item's name/price/subtotal correctly (no
      "undefined"/"NaN"). Confirmed all of the above; test row deleted afterward.
      **Pass condition:** every step above behaves as described; `npm run verify` green throughout
      (21 test files, 54 tests).

---

## PHASE 77 — ADMIN PRODUCT FORM: LABELED PHOTO SLOTS (MAIN / BACK / SIDE)

_Sonny asked on 2026-08-25, with a reference "+" icon, for the Photos section of
`AdminProductForm.jsx` to have 3 named buttons — Main image, Back view, Side view — each able to
add or delete its own photo, instead of one plain multi-file input with no control over order and
no per-photo delete. Confirmed via a plan-mode design pass: exactly 3 fixed slots (not
extensible), uploads still happen on Save (not immediately per slot, same as before). No backend
or Store changes needed — `StoreProductGallery.jsx` already just treats `images[0]` as the default
shown image and maps the rest as thumbnails in array order, so the 3 slots simply determine that
order (skipping any left empty) and the existing `POST /api/uploads` (10-file limit) comfortably
covers 3._

- [x] **P460** — `src/admin/AdminProductForm.jsx`: replaced the flat `files`/`previews` state with
      a 3-slot `photoSlots` state (`{ file, preview }` per slot, `initPhotoSlots` mapping an
      existing product's `images[0..2]` into Main/Back/Side by position on edit); replaced
      `handleFilesChange` with `handleSlotFileChange`/`handleSlotRemove`; `handleSubmit`'s image
      step is now `buildImages()` — batch-uploads only the slots with a newly-picked file (same
      `POST /uploads` call as before), splices the returned URLs back into position, falls back to
      each slot's existing URL otherwise, then drops empty slots. JSX: each slot shows its label,
      an empty slot is a dashed-circle "+" button (plain CSS, no new icon asset/library — none
      existed anywhere in `src/admin/` to begin with), a filled slot is the thumbnail with a small
      red circular "×" remove button.
      **Pass condition:** `npm run verify` passes; verified end-to-end with Playwright against the
      real dev build — Add product starts with 3 empty "+" slots; filling Main/Back/Side and Save
      persists the 3 URLs in that exact order; editing that product loads the 3 existing photos
      back into their matching slots; removing Side and saving again leaves exactly 2 images.
      Test product (`PRD-0006`) deleted afterward; a pre-existing unrelated product (`PRD-0005`,
      not created by this session) was left untouched.

---

## PHASE 78 — TASKBAR: START MENU + CLOCK/CALENDAR FLYOUT

_Sonny asked on 2026-08-25 to wire up the two decorative taskbar controls (Start button,
clock/date) into a Windows-11-style Start Menu and Clock/Calendar flyout, closely following a
reference screenshot (`src/components/task bar/component/Task Bar.png`). Confirmed via a
plan-mode design pass: Start Menu shows a bigger-icon "Recently used" row (in-memory only, not
persisted) plus a scrollable alphabetical list sourced from the existing 17 `desktopIcons`, a
Settings/Power icon rail, and a decorative 3-item Power flyout (Sleep/Restart/Shut down, no real
OS action exists to hook up — confirmed with Sonny). The clock flyout adds a seconds-accurate big
clock + full date + a real month-grid calendar (pure helper + tests) with a decorative "Today"
placeholder. Both use the project's existing opacity+y+scale pop transition (no slide-up exists
anywhere in this codebase), anchor above the taskbar via the `TaskbarPreview.jsx`
`bottom-full`/glass-shell idiom, and get a full-width bottom-sheet variant on mobile. The Start
button is newly shown on mobile too (Sonny confirmed; Widgets/Search/Explorer stay hidden)._

- [x] **P461** — Copy `src/components/task bar/icons/power icon.png` to
      `src/assets/icons/power.png`; import it in `src/assets/icons/index.js` and add `power` to
      the `iconImages` map (grep first per the 2026-08-18 LESSONS.md entry — confirmed no existing
      `power` key).
      **Pass condition:** `npm run verify` passes.
- [x] **P462** — Create `src/components/icons/AppGlyph.jsx` (id/icon → image / `PdfGlyph` / raw
      emoji, with size-class props), extracting the resolution logic from `DesktopIcon.jsx`
      (lines ~65-71). Refactor `DesktopIcon.jsx`'s grid and list variants to render
      `<AppGlyph id={id} icon={icon} />` in place of their inline `glyph` ternary + wrapping span;
      drop the now-unused local `PdfGlyph` import there.
      **Pass condition:** `npm run verify` passes; desktop icon grid/list rendering is visually
      unchanged (verified live).
- [x] **P463** — Create `src/utils/calendarGrid.js` (`buildCalendarGrid(year, month, today)`,
      returns a flat 42-cell array with `{ date, day, isCurrentMonth, isToday }`, using `Date`'s
      own rollover normalization for leading/trailing days) and `calendarGrid.test.js` (happy
      path: August 2026 — starts Saturday, has both leading and trailing days; edge path: November
      2026 — starts Sunday, zero leading days).
      **Pass condition:** `npm run verify` passes; both tests pass.
- [x] **P464** — Create `src/utils/recentApps.js` (`addRecentAppId(currentIds, id, maxLength=6)`
      — dedupe, move-to-front, cap) and `recentApps.test.js` (happy path: prepend a new id; edge
      path: re-adding an existing id moves it to front without duplicating).
      **Pass condition:** `npm run verify` passes; both tests pass.
- [x] **P465** — `src/components/Desktop.jsx`: add `recentAppIds` state; `openApp(id)` calls
      `addRecentAppId` (P464), guarded to only track ids present in `desktopIcons`; pass
      `recentAppIds` and `onOpenApp={handleIconOpen}` as new props on the existing `<Taskbar />`
      call (unused there until P467).
      **Pass condition:** `npm run verify` passes; opening two different desktop icons then
      reopening the first leaves `recentAppIds` as `[first, second]` with no duplicate (verified
      live, e.g. via a temporary console log removed before commit).
- [x] **P466.a** — Create `src/components/StartMenu.jsx`: outer glass-panel shell (desktop
      ~560px-wide/`max-h-[70vh]` and mobile full-width-bottom-sheet className variants, pop-in
      transition per plan), the left icon rail (Settings via `iconImages.settings` calling
      `onOpenApp('settings')`; Power via `iconImages.power` toggling a local `isPowerOpen` state)
      and a `StartMenuPowerFlyout` (3 decorative text rows: Sleep/Restart/Shut down, no icons).
      Not yet imported/rendered anywhere.
      **Pass condition:** `npm run verify` passes.
- [x] **P466.b** — `src/components/StartMenu.jsx`: add the "Recently used" tile grid (bigger
      `AppGlyph` at `h-10 w-10`, resolved from the `recentAppIds` prop against `desktopIcons`,
      empty-state placeholder text when none) and the `flex-1 overflow-y-auto` alphabetical app
      list (`desktopIcons` sorted by label, `AppGlyph` at `h-5 w-5`) — `shrink-0` on the recent
      section so only the list scrolls. Both call a shared `handleOpen(id)` helper that calls
      `onOpenApp` then `onClose`.
      **Pass condition:** `npm run verify` passes.
- [x] **P467** — `src/components/Taskbar.jsx`: `TaskbarButton` gains an optional controlled
      `isActive` prop; pull the `'start'` entry out of the `leftLaunchers` map and render it
      directly inside a new `<div ref={startAreaRef} className="relative">` alongside a
      conditional `<AnimatePresence><StartMenu .../></AnimatePresence>`, wired to new
      `isStartMenuOpen` state and a `mousedown`-outside-`startAreaRef` close effect; accept and
      forward `onOpenApp`/`recentAppIds` props; the remaining `leftLaunchers` (Widgets/Search/
      Explorer) stay `!isMobile`-gated, but the Start button now renders unconditionally.
      **Pass condition:** `npm run verify` passes; verified live — mobile viewport shows only the
      Start icon among the left launchers; clicking Start opens the panel; clicking outside or
      re-clicking Start closes it.
- [x] **P468** — Create `src/components/ClockCalendarFlyout.jsx`: big clock with seconds + full
      weekday date (from the `now` prop), month header with prev/next chevrons over local
      `viewedMonth` state, weekday-initials row, and a `grid-cols-7` day grid from
      `buildCalendarGrid` (P463), memoized on the viewed year/month plus `now.toDateString()`;
      today's cell gets an accent-colored outline via the existing
      `useSystemSettings`/`accentColors` pattern (`Window.jsx` lines ~28-29); static "Today"
      section with a no-op `+` and placeholder text. Desktop and mobile (full-width bottom sheet)
      className variants. Not yet imported/rendered anywhere.
      **Pass condition:** `npm run verify` passes.
- [x] **P469** — `src/components/SystemTray.jsx`: add `relative` to the root; turn the time/date
      block into a `<button>`; add `trayRef` + `isFlyoutOpen` state + mousedown-outside-`trayRef`
      close effect; render `ClockCalendarFlyout` inside `AnimatePresence`, passing `now` and
      `onClose`. Compact tray `formatTime`/`formatDate` stay unchanged.
      **Pass condition:** `npm run verify` passes; verified live — clicking the clock opens the
      flyout with live-ticking seconds, chevrons move between months, today's cell is highlighted,
      outside click closes it.
- [x] **P470** — Verify the full flow live in the running dev app (desktop + mobile viewports):
      Start Menu opens/closes on click and outside-click; opening 2-3 different apps populates
      Recently Used most-recent-first with no duplicates; clicking a recent tile or an
      alphabetical-list row opens the correct window and closes the menu; Power flyout
      opens/closes. Clock flyout: seconds tick live, month navigation works across a year boundary
      (December → January), today's cell is highlighted on the correct day, outside click closes
      it.
      **Pass condition:** every step above behaves as described; `npm run verify` green
      throughout.

---

## PHASE 78 ADDENDUM — START MENU LAYOUT + SHARP CORNERS + BIGGER CLOCK

_Sonny reviewed Phase 78 live against a cropped reference screenshot of the real Windows 11 Start
Menu (all-apps view) on 2026-08-25 and asked for closer fidelity: the reference is a genuine
two-column layout (an independently-scrolling A-Z list with letter-group headers on the left, a
non-scrolling pinned/recent tile grid on the right, divided by a vertical rule) rather than one
stacked scrolling column; both new panels should have sharp corners, not rounded; and the
Clock/Calendar flyout should be noticeably bigger with larger text._

- [x] **P471** — `src/components/StartMenu.jsx`: restructure the main content into two side-by-side
      columns matching the reference — group `sortedApps` by first letter into a new
      `groupedApps` module-level constant (`{ letter, items }[]`, `#` for any non-letter-leading
      label), render it as the left column (`min-w-0 flex-1 overflow-y-auto`, a small `letter`
      header above each group) so only that column scrolls independently; move the "Recently used"
      tile grid into a `w-[220px] shrink-0 border-l border-white/10 overflow-y-auto` right column
      in its place.
      **Pass condition:** `npm run verify` passes; verified live — left column lists every app
      grouped under a letter header and scrolls on its own; right column shows the recent tiles
      unscrolled, separated by a visible vertical divider.
- [x] **P472** — `src/components/StartMenu.jsx` and `src/components/ClockCalendarFlyout.jsx`:
      remove the rounded corners on both panels' desktop and mobile variants (`rounded-2xl`,
      `rounded-t-2xl`) so both modals render with sharp corners.
      **Pass condition:** `npm run verify` passes; verified live via screenshot — neither panel
      shows any corner rounding on desktop or mobile.
- [x] **P473** — `src/components/ClockCalendarFlyout.jsx`: increase the desktop panel width from
      `w-[320px]` to `w-[480px]` (1.5x) with proportionally larger padding, and bump the font sizes
      one step up across the clock (`text-3xl` → `text-4xl`), date, month header, weekday row, day
      grid, and Today section (mobile shares the same text elements, so it gets the same bump).
      **Pass condition:** `npm run verify` passes; verified live — the desktop flyout is visibly
      larger with readable, larger text, still anchored correctly above the taskbar.
- [x] **P474** — `src/index.css`: add a `.scrollbar-overlay` utility (transparent track, transparent
      thumb by default, thumb fades to a translucent white on container `:hover`, constant 6px
      width so nothing reflows) matching the file's existing `.scrollbar-*` convention. Apply it to
      both scrollable columns in `src/components/StartMenu.jsx` (the A-Z list and the Recently used
      column) in place of the default browser scrollbar.
      **Pass condition:** `npm run verify` passes; verified live — the scrollbar thumb is invisible
      until the list is hovered, then fades in; no layout shift when it appears.
- [x] **P475** — `src/components/StartMenu.jsx`: increase the Recently used tile icon from
      `h-10 w-10` to `h-40 w-40` (4x) with a proportionally bigger emoji-fallback `textClassName`;
      switch that column's tile grid from `grid-cols-2` to `grid-cols-1` since two 160px icons no
      longer fit side by side in the 220px column.
      **Pass condition:** `npm run verify` passes; verified live — recent-app icons render
      noticeably larger, one per row, with no overlap or clipping.

---

## PHASE 78 ADDENDUM 2 — START MENU POLISH (SCROLLBAR, 3-WIDE RECENTS, TILE HOVER, FLUSH TASKBAR)

_Sonny reviewed the live Start Menu against the reference again on 2026-08-25 and asked for:
a thinner scrollbar, the Recently used tiles arranged 3-across (matching the reference's
"Productivity" row) with smaller icons, a persistent gray tile background with a light-gray hover
border, and both new panels flush against the taskbar with no gap. Confirmed via a plan-mode
follow-up question: the scrollbar reduction is the scrollbar's own CSS width/height, not the
modal's height; mobile keeps its current single-column recents layout unchanged since only the
desktop reference view was referenced — the 3-column/smaller-icon treatment is `md:`-only._

- [x] **P476** — `src/index.css`: reduce `.scrollbar-overlay::-webkit-scrollbar`'s `width`/`height`
      from `6px` to `3px` (50%).
      **Pass condition:** `npm run verify` passes.
- [x] **P477** — `src/components/StartMenu.jsx`: make the Recently used tile grid, icon size, and
      column width responsive — mobile (`grid-cols-1`, `h-40 w-40` icon, `w-[220px]` column) stays
      as-is; add `md:grid-cols-3`, `md:h-[120px] md:w-[120px]` icon (`md:text-7xl` emoji fallback),
      and `md:w-[420px]` column for desktop. Widen the desktop root panel from `w-[560px]` to
      `w-[760px]` so the alphabetical-list column's actual pixel width is unchanged.
      **Pass condition:** `npm run verify` passes; verified live — desktop shows 3 smaller tiles
      per row, mobile is visually unchanged, the list column's width looks the same as before.
- [x] **P478** — `src/components/StartMenu.jsx`: give each Recently used tile button a persistent
      `bg-white/5` background and a `border border-transparent` that becomes `hover:border-white/30`
      on hover (kept alongside the existing `hover:bg-white/10`).
      **Pass condition:** `npm run verify` passes; verified live — tiles show a gray box at rest
      and a visible light-gray border on hover, no layout shift.
- [x] **P479** — `src/components/StartMenu.jsx` and `src/components/ClockCalendarFlyout.jsx`:
      remove `mb-2` from each panel's desktop anchoring className so both sit flush against the
      taskbar's top edge with no gap (mobile already uses `mb-0`, untouched).
      **Pass condition:** `npm run verify` passes; verified live via screenshot — no visible gap
      between either panel and the taskbar.

---

## PHASE 79 — TASKBAR: HOVER-ONLY HIGHLIGHT, BIGGER ICONS, EQUAL SPACING, PINNED REORDER

_Sonny asked on 2026-08-25 to fix a `TaskbarButton` bug (clicking a pinned icon toggled a
persistent highlight that only cleared on a second click, instead of just tracking hover), grow
the taskbar icons 20%, make the gaps between pinned icons uniform, and replace the decorative
Widgets/Explorer/Music/Terminal/Messaging placeholders with a fixed, functional row: Start >
Search > Developer Lab > Music Lab > Settings > Store > Blog, with Developer Lab/Music Lab/Store/
Blog wired to actually open their windows. Search itself is intentionally left unwired — Sonny is
building the real Search Modal (from `src/components/search modal/*.png` mockups) in a parallel
session, so its click handler is left for that work to land._

- [x] **P480** — `src/components/Taskbar.jsx`: removed `TaskbarButton`'s internal
      `isActiveState` click-toggle; the highlight now comes only from the explicit `isActive` prop
      (Start button, unaffected) or the `hover:bg-white/10` CSS class, so a plain pinned icon
      highlights only while the mouse is over it.
      **Pass condition:** `npm run test` and `npm run build` pass; verified live — clicking Developer
      Lab/Music Lab/Settings/Store/Blog no longer leaves a stuck highlight, hovering does.
- [x] **P481** — `src/components/Taskbar.jsx`: bumped `TaskbarButton`/`RunningAppButton` from
      `h-9 w-9` to `h-[43px] w-[43px]` (20%) and `IconGlyph`'s image from `h-5 w-5` to `h-6 w-6`
      (20%); bumped the taskbar row and running-window group from `gap-1` to `gap-2`.
      **Pass condition:** `npm run test` and `npm run build` pass.
- [x] **P482** — `src/components/Taskbar.jsx`: replaced the `leftLaunchers`/`pinnedApps` arrays
      with one `pinnedTaskbarApps` list (Search, Developer Lab, Music Lab, Settings, Store, Blog)
      rendered as a single equally-spaced row directly after Start (desktop only, sharing the
      container's `gap-2`); Developer Lab/Music Lab/Store/Blog call `onOpenApp(id)`, Settings keeps
      calling `onOpenSettings`; mobile keeps showing just Start + Settings, matching the prior
      P275/P467 mobile scope.
      **Pass condition:** `npm run test` and `npm run build` pass; verified live — the row reads
      Start, Search, Developer Lab, Music Lab, Settings, Store, Blog with equal gaps; clicking
      Developer Lab, Music Lab, Store, or Blog opens the matching window.

**Known blocker (not this task's to fix):** `npm run lint` currently fails on
`src/components/SearchModal.jsx` (unused import in `Taskbar.jsx`, plus a
`react-hooks/set-state-in-effect` error inside `SearchModal.jsx`) — that file is mid-edit in a
parallel session building the real Search Modal. `format:check`, `build`, and `test` all pass on
their own; full `npm run verify` will go green once that other session finishes wiring it up.

---

## PHASE 80 — DESKTOP RIGHT-CLICK MENU: WINDOWS-11 REDESIGN

_Sonny asked on 2026-08-25 to rebuild the desktop background's right-click menu to strictly match
a Windows-11-style screenshot (light rounded panel, indigo-blue text, grouped rows with dividers):
View and Sort open an interactive submenu beside the main menu (submenu ≈1/3 the main menu's
height); View picks the desktop icon size (small/medium/large, non-persisted — resets to the
default, medium, on every visit/guest per Sonny's note); Sort picks Name (alphabetical) or Size;
System/Personalization open the existing Settings window on their matching tab; Open Terminal
shows a "coming soon" placeholder (a real terminal is deferred, tracked in Backlog below); Contact
Developer opens the existing Contact Info window. The icon right-click menu (Open/Rename/Delete/
Properties) shares the same `ContextMenu` component, so it picks up the new visual style for free._

- [x] **P483** — Redesign `src/components/ContextMenu.jsx` to the screenshot's light Windows-11
      style (white/near-white rounded panel, indigo-blue item text, thin full-width divider support
      via a `{ divider: true }` item entry, a trailing `›` chevron on any item flagged
      `hasSubmenu: true`); update the desktop-background menu's item list in `Desktop.jsx` to the
      screenshot's exact grouping/order: View›, Sort›, Refresh, divider, System, Personalization,
      Open Terminal, divider, Contact Developer (handlers stay stubbed for now).
      **Pass condition:** `npm run format:check`, `npm run build`, `npm run test` all pass; a live
      screenshot shows the light-themed menu with the correct grouping/order/dividers/chevrons.
- [x] **P484** — Add click-to-open submenu support to `ContextMenu.jsx` (an item with
      `submenuItems` renders a second panel flush against its right edge, closing when the parent
      menu closes or an outside click lands) and consume it end-to-end for "View": add an
      `iconSize` state (`'small' | 'medium' | 'large'`, default `'medium'`, in-memory only) to
      `Desktop.jsx`; thread it into `DesktopIcon.jsx`'s grid variant so the glyph/label/container
      scale together at each size without changing the gap between icons; the View submenu's three
      options set that state and show a filled-dot marker on the active choice.
      **Pass condition:** clicking View opens the submenu beside the main menu; clicking outside
      either panel closes both; selecting each size visibly rescales every desktop icon with
      unchanged, non-overlapping spacing; verified live at all three sizes; the format check, the
      build, and the test suite all pass.
- [x] **P485** — Wire the desktop menu's "Sort" item to open a Name/Size submenu (same mechanism
      as P484): add a `sizeKB` field to each entry in `src/data/desktopIcons.js`; add a `sortBy`
      state (`'name' | 'size'`, default `'name'`) to `Desktop.jsx`; sort `column1`/`column2` by the
      active choice before rendering, with a filled-dot marker on the active option.
      **Pass condition:** choosing Name/Size visibly reorders desktop icons within each column;
      `npm run format:check`/`build`/`test` pass.
- [x] **P486** — Give `SettingsApp.jsx` an `initialTab` prop (default `'system'`); make
      `Desktop.jsx`'s "System"/"Personalization" desktop-menu items open the Settings window on
      that respective tab (extend the relevant `openWindows` entry with a `tab` field, read it in
      the `w.id === 'settings'` render branch).
      **Pass condition:** right-click → System opens Settings on the System tab; right-click →
      Personalization opens it on the Personalization tab; `npm run format:check`/`build`/`test`
      pass.
- [x] **P487** — Wire the desktop menu's "Open Terminal" to show a small self-dismissing "Coming
      soon" toast instead of doing nothing (no new dependency); add a Backlog entry below noting a
      real terminal app is deferred.
      **Pass condition:** clicking Open Terminal shows "Coming soon" and it disappears on its own;
      the Backlog section lists the deferred terminal; `npm run format:check`/`build`/`test` pass.
- [x] **P488** — Wire the desktop menu's "Contact Developer" item to the existing
      `handleIconOpen('contact-info')` path (the same Contact Info window Blog's user menu already
      opens).
      **Pass condition:** right-click → Contact Developer opens the Contact Info window;
      `npm run format:check`/`build`/`test` pass.

---

## PHASE 81 — DESKTOP ICON GRID: ALIGNMENT + SNAP-TO-GRID DRAGGING

_Sonny flagged on 2026-08-25 that the two desktop icon columns don't line up row-to-row — root
cause is that icons are laid out in two independent flexbox columns with no fixed per-icon height,
so two-word labels ("Contact Info", "Memory Wall", etc.) wrap to 2 lines and push everything below
them in that column down, drifting out of alignment with the other column. Rather than patch the
label height, Sonny asked for the more thorough fix: an invisible fixed-size grid tiling the whole
desktop (cell size fixed to the Large icon preset regardless of the current View size selection),
with icons dragging between discrete grid cells instead of floating freely. Confirmed with Sonny:
dragged positions are session-only (reset on reload, matching `iconSize`/`sortBy`'s existing
non-persisted precedent); columns fill dynamically based on viewport height (the `column: 1|2`
field is removed); choosing Sort re-arranges everything into sorted grid order, discarding any
manual dragging._

- [x] **P489** — Add `src/utils/desktopGrid.js` (grid cell size constants derived from the Large
      icon preset plus a 2-line label reserve, `cellToPixel(row, col)`, `pixelToNearestCell(x, y)`,
      and `computeAutoLayout(icons, viewportHeight)` for column-major placement) with a co-located
      `desktopGrid.test.js` covering the column-major fill and a too-short-viewport edge case.
      **Pass condition:** `desktopGrid.test.js` passes; `npm run format:check`/`build`/`test` pass;
      no UI change yet.
- [x] **P490** — In `Desktop.jsx`, seed a new `iconPositions` state (`id -> {row, col}`) from
      `computeAutoLayout` and render every desktop icon absolutely positioned via `cellToPixel`,
      replacing the two `column`-driven flex columns; remove the now-unused `column` field from
      every entry in `src/data/desktopIcons.js`.
      **Pass condition:** reloading the desktop shows one continuous grid with every row aligned
      across columns regardless of label wrapping; `npm run format:check`/`build`/`test` pass.
- [x] **P491** — Add an `onDragEnd` handler in `DesktopIcon.jsx` that calls a new
      `onDropAt(id, row, col)` prop (via `pixelToNearestCell`); in `Desktop.jsx`, commit the move
      into `iconPositions` if the target cell is empty, otherwise leave it unchanged; either way
      the icon's motion `x`/`y` reset to 0, which — since its `left`/`top` props always reflect its
      current authoritative cell — both lands it exactly on a newly-committed cell and springs it
      back to its old one when the drop was rejected, with no separate "remembered position" ref
      needed. Removed the now-obsolete live per-frame overlap check in `handleDrag` (and, since
      that was its only caller, the `getOtherRects` prop/plumbing in both files — folded in from
      P493 below, which this made redundant).
      **Pass condition:** dragging an icon onto an empty cell keeps it there after drop; dragging
      one icon onto another springs it back to its pre-drag spot; verified live in the dev server
      via simulated drag-and-drop; `verify` passes.
- [x] **P492** — In `Desktop.jsx`, reset `iconPositions` to a fresh `computeAutoLayout` call
      whenever `sortBy` changes.
      **Pass condition:** dragging an icon to a new spot, then choosing Sort → Name or Size,
      reflows every icon (including the dragged one) into sorted grid order; `verify` passes.
- [x] **P493** — ~~Remove the now-unused `getOtherRects` prop and its plumbing~~ — folded into
      P491 above: removing the live overlap check made `getOtherRects` dead code immediately, so
      ESLint's `no-unused-vars` forced its removal in the same pass rather than leaving `verify`
      red between tasks.

---

## PHASE 81 ADDENDUM — DESKTOP GRID REFLOW ON RESIZE (P489-P493 FOLLOW-UP)

_Flagged after P489-P493 landed: the grid layout is computed once from `window.innerHeight` at
mount, so shrinking the browser window post-load never reflows it — later-row icons in a column
can end up hidden behind the taskbar. Sonny asked on 2026-08-25 to close this gap, using the same
policy Sort already uses (P492): a layout change re-arranges everything from scratch rather than
trying to preserve manually-dragged positions._

- [x] **P507** — In `Desktop.jsx`, add a debounced `window.resize` listener that recomputes
      `iconPositions` via `computeAutoLayout` (reading `sortedIcons` through a ref kept in sync
      each render, so the listener itself can stay mount-only with an empty dependency array).
      **Pass condition:** shrinking the browser window after the desktop has loaded re-arranges
      every icon back into a valid grid within the new viewport, with nothing left hidden behind
      the taskbar; verified live in the dev server; `verify` passes.

---

## PHASE 82 — REAL TERMINAL APP (COMMAND PROMPT LOOK)

_Sonny asked directly on 2026-08-25 to replace the "Open Terminal" Coming-soon toast (Phase 80,
P487; deferred in Backlog) with an actual terminal window, copying a classic Windows Command
Prompt's look exactly from a screenshot he provided: square (non-rounded) corners, a light title
bar, and specific boot-banner text. Command execution itself is out of scope — Sonny will supply
the command list in a future task; for now the prompt only echoes input and reports it as not
recognized, matching real cmd.exe's own behavior for an unknown command._

- [x] **P494** — Add a `square`/`titleBarClassName` variant to `src/components/Window.jsx` (drops
      the rounded corners/accent border and switches the caption-button hover styles when
      `square` is set; `titleBarClassName` overrides the default dark title-bar background/text).
      **Pass condition:** `npm run format:check`/`build`/`test` pass; no visual change to any
      existing window (all keep `square` unset).
- [x] **P495** — Add `src/components/TerminalApp.jsx`: a black, monospace console that renders the
      boot banner ("Sonny Window [ Version 10.0.239495.090 ]", "(C) Sonny Corporation. All rights
      reserved.", a blank line, "Type /help for command") followed by an interactive
      `C:\Users\Guest>` prompt; Enter echoes the typed line and prints a cmd-style "not recognized"
      message (no real commands yet).
      **Pass condition:** `npm run format:check`/`build`/`test` pass.
- [x] **P496** — Wire it into `Desktop.jsx`: import `TerminalApp`, add a `terminal` entry to
      `WINDOW_PREVIEW_SIZES`/`renderPreviewBody`, render it through `Window` with `square`,
      `titleBarClassName="bg-[#f3f3f3] text-black"`, icon `">_"`, title "Command Prompt"; change
      the desktop menu's "Open Terminal" `onClick` from the `Coming soon` toast to
      `openApp('terminal')`; remove the now-dead `toastMessage` state it was the only user of;
      give the taskbar running-button its label/icon fallback for `terminal` (matching the
      existing `projects` special case).
      **Pass condition:** right-click desktop → Open Terminal opens the window; verified live via
      screenshot against Sonny's reference screenshot (square corners, light title bar, exact boot
      text, working prompt); `npm run verify` passes (pre-existing unrelated warnings only).

---

## PHASE 81 — TASKBAR VOLUME: REAL MIXER-STYLE MASTER CONTROL

_Sonny asked on 2026-08-25 (after pasting a Windows volume-flyout screenshot) to make the taskbar's
speaker icon functional, "the same with the windows native function of volume." Confirmed with him
directly: this is a real-mixer model — a master volume/mute in the tray that multiplies on top of
each app's own independent volume/mute (Music Lab keeps its own separate slider, scaled by the
master; the arcade games' existing sound on/off toggle is effectively each game's own 100%/0%
channel fader, likewise scaled by the master). Nothing here persists across reloads, matching the
existing in-memory-only pattern already used for brightness/theme/accent. Full design at
`C:\Users\SonnyLlarena\.claude\plans\make-the-volume-button-stateful-oasis.md`._

- [x] **P497** — Add `isMuted` state (boolean, default `false`, in-memory only — no localStorage)
      to `src/context/SystemSettingsContext.jsx` alongside the existing `volume`, exposed via
      `useSystemSettings()`.
      **Pass condition:** the format check, the build, and the test suite all pass.
- [x] **P498** — Add a `muted` boolean prop (default `false`) to
      `src/components/icons/SpeakerIcon.jsx`: when true, swap the two sound-wave arc paths for a
      single "X" mark, reusing the existing speaker-cone path.
      **Pass condition:** the format check, the build, and the test suite all pass; no visual
      change when `muted` is omitted.
- [x] **P499** — Create `src/components/VolumeFlyout.jsx`, mirroring
      `src/components/ClockCalendarFlyout.jsx`'s shape exactly (same `panelMotion`, same
      dark blurred panel styling, positioned flush against the tray, narrower width): a "Speakers"
      header, a native range-input slider bound to `volume`/`setVolume` from
      `useSystemSettings()` styled with the existing `accent-*` convention and the current accent
      color (same resolution `ClockCalendarFlyout.jsx` already does via `accentColors`), the live
      percentage next to the slider, and a mute button (`SpeakerIcon` with `muted={isMuted}`) that
      calls `setIsMuted((m) => !m)`.
      **Pass condition:** the format check, the build, and the test suite all pass (not yet
      rendered anywhere).
- [x] **P500** — Wire it into `src/components/SystemTray.jsx`: give `TrayButton` an `onClick`
      prop; add `isVolumeOpen` state + a `volumeAreaRef` mirroring the clock's
      `isFlyoutOpen`/`clockAreaRef` pattern exactly (its own outside-mousedown-close effect,
      `AnimatePresence`); the tray's own `SpeakerIcon` gets `muted={isMuted || volume === 0}`.
      **Pass condition:** clicking the tray speaker icon opens the flyout beside the clock one;
      dragging the slider updates the shown percentage live; clicking the flyout's speaker icon
      toggles mute and the tray icon glyph changes to match; clicking outside closes it; the
      format check, the build, and the test suite all pass.
- [x] **P501** — In `src/components/MusicLabApp.jsx`, import `useSystemSettings()` and change the
      existing volume effect (currently setting `videoRef.current.volume`/
      `audioRef.current.volume` straight from local `volume`) to
      `effective = isMuted ? 0 : (volume / 100) * (masterVolume / 100)`; Music Lab's own slider/
      state stay otherwise unchanged.
      **Pass condition:** playing a track in Music Lab while its own slider stays at 100% gets
      audibly quieter as the taskbar master slider is lowered; toggling master mute silences it;
      unmuting restores it; the format check, the build, and the test suite all pass.
- [x] **P502** — In `src/components/games/flappybird/FlappyBirdGame.jsx`, add one `useEffect`
      reading `volume`/`isMuted` from `useSystemSettings()` that sets `.volume` on all 3 existing
      Audio refs (`bgMusicRef`, `gameOverAudioRef`, `jumpAudioRef`) to the effective volume
      (`soundMuted` forces 0; otherwise `isMuted` forces 0, else `volume / 100`), re-running
      whenever `volume`, `isMuted`, or `soundMuted` change; no change to existing play/pause/loop
      logic.
      **Pass condition:** with the game's own sound on, lowering the taskbar master volume
      audibly lowers its background music/SFX; the game's own sound toggle still independently
      silences it regardless of the master; the format check, the build, and the test suite all
      pass.
- [x] **P503** — Same pattern as P502, applied to
      `src/components/games/flappybird/FlappyBirdCanvas.jsx`'s jump-sound Audio object.
      **Pass condition:** same as P502, verified for this file's sound; the format check, the
      build, and the test suite all pass.
- [x] **P504** — Same pattern as P502, applied to all Audio objects in
      `src/components/games/memory/MemoryFlipGame.jsx` (flip/correct/wrong SFX + background
      music).
      **Pass condition:** same as P502, verified for this file's sounds; the format check, the
      build, and the test suite all pass.
- [x] **P505** — Same pattern as P502, applied to the background-music Audio object in
      `src/components/games/typing/TypingSpeedGame.jsx`.
      **Pass condition:** same as P502, verified for this file's sound; the format check, the
      build, and the test suite all pass.
- [x] **P506** — Same pattern as P502, applied to the keystroke-sound Audio object in
      `src/components/games/typing/TypingTestArea.jsx`.
      **Pass condition:** same as P502, verified for this file's sound; the format check, the
      build, and the test suite all pass.
- [x] **P507** — Sonny supplied a real Windows-style volume-change chime (copied from
      `src/components/task bar/volume change sound.MP3` into `src/assets/sounds/volume-change.mp3`
      — a new shared system-sounds folder, alongside the existing `src/assets/icons/`
      convention). Wire it into `src/components/VolumeFlyout.jsx`: on every slider `onChange`
      (while the resulting level is above 0), play the chime with its own `.volume` set to the new
      level being set (so it plays quiet at a low level, loud at a high one), matching native
      Windows' own volume-change sound; skip playing it at 0/while muted; no change to the mute
      button (real Windows doesn't chime on mute/unmute, only on level changes).
      **Pass condition:** dragging the slider plays the chime at a volume proportional to the new
      level; dragging to 0 plays nothing; the format check, the build, and the test suite all
      pass.
- [x] **P508** — Sonny asked the tray/flyout speaker icon to visually reflect the level, not just
      muted/unmuted: extend `src/components/icons/SpeakerIcon.jsx` with a `volume` prop (0-100,
      default 100) alongside the existing `muted` prop — muted or `volume <= 0` shows the "X"
      mark, `volume <= 33` shows one sound-wave arc, `<= 66` shows two, and above that shows three;
      pass `volume={volume}` from both `src/components/SystemTray.jsx`'s tray icon and
      `src/components/VolumeFlyout.jsx`'s mute-button icon (both already have `volume` in scope).
      **Pass condition:** the icon shows 0/1/2/3 wave arcs correctly at each tier live; the format
      check, the build, and the test suite all pass.

---

## PHASE 83 — TERMINAL: REAL COMMANDS + "OPENING X..." DOTS ANIMATION

_Sonny confirmed on 2026-08-25 the terminal's command list and behavior: `/help` lists commands,
`/clear` wipes the terminal's text, and every command that opens something (an app window, or the
taskbar volume flyout) shows ~1 second of literal dots-cycling "Opening X..." text in the terminal
before the thing actually opens — not a spinner icon, and not anything real cmd.exe/Windows
Terminal does natively; it's a CLI/installer convention being added fresh. Full design at
`C:\Users\SonnyLlarena\.claude\plans\giggly-stirring-comet.md`._

- [x] **P509** — In `src/components/TerminalApp.jsx`, add a `COMMANDS` registry array
      (`{ command, kind, description, appId?, label? }`), `findCommand`/`buildHelpLines` helpers,
      and rewrite `handleKeyDown` to dispatch on `kind` (`'help'` prints the generated command
      list, `'clear'` wipes `history` instantly with no echo, anything unmatched keeps the
      existing "not recognized" line).
      **Pass condition:** `/help` lists `/help` and `/clear`; `/clear` instantly wipes the console;
      `npm run verify` passes.
- [x] **P510** — In `src/components/TerminalApp.jsx`, add the dots-loading mechanism: timing
      constants (250ms tick, 1000ms total), `loadingLine` state, `intervalRef`/`timeoutRef`/
      `isMountedRef` with an unmount-cleanup `useEffect`, `runOpenCommand`/`dispatchOpen`, an
      `onOpenApp = () => {}` prop, `disabled={loadingLine !== null}` on the input, and every
      `kind: 'open'` command (`/settings`, `/resume`, `/projects`, `/contact`, `/store`, `/games`,
      `/blog`, `/paint`, `/musiclab`, `/gmail`) wired to call `onOpenApp(appId)` after the
      animation.
      **Pass condition:** each open-command shows "Opening {label}" cycling 1→2→3 trailing dots
      (repeating) for ~1 second, then settles on a "done." line and calls `onOpenApp`; a second
      Enter mid-animation is a no-op; closing the terminal window mid-animation throws no console
      errors; `npm run verify` passes.
- [x] **P511** — In `src/components/Desktop.jsx`, pass `onOpenApp={handleIconOpen}` to the real
      `w.id === 'terminal'` `<TerminalApp>` instance and `onOpenApp={() => {}}` to the
      `renderPreviewBody` instance.
      **Pass condition:** typing `/musiclab` (etc.) in the real terminal window opens that app
      after the loading animation; `npm run verify` passes.
- [x] **P512** — Add `isVolumeFlyoutOpen`/`setIsVolumeFlyoutOpen` (`useState(false)`, unpersisted)
      to `src/context/SystemSettingsContext.jsx` alongside the existing fields; update
      `src/components/SystemTray.jsx` to consume it from `useSystemSettings()` instead of its own
      local `isVolumeOpen` state (toggle button, outside-click-close effect, `AnimatePresence`
      condition all repointed, behavior unchanged).
      **Pass condition:** the tray speaker icon still opens/closes `VolumeFlyout` exactly as
      before; `npm run verify` passes.
- [x] **P513** — In `src/components/TerminalApp.jsx`, add a `/volume` command
      (`kind: 'volume'`, no `appId`) that runs the same dots animation then calls
      `setIsVolumeFlyoutOpen(true)` (from `useSystemSettings()`) instead of `onOpenApp`.
      **Pass condition:** `/volume` shows the animation, then opens the same flyout the speaker
      icon controls; verified live in the dev server; `npm run verify` passes.

## PHASE 79 — START MENU FOOTER HOVER POLISH

_Sonny asked on 2026-08-25 for a hover effect on the Start Menu's Settings and Power icon buttons:
a highlight that slides in left-to-right rather than snapping on instantly, as smooth as the Start
Menu's own open/close transition. Reference: a Windows 11 Start Menu screenshot showing the Power
row highlighted mid-hover (used for the slide-reveal look only, not the full-width labeled layout,
which this project's narrow icon rail doesn't use)._

- [x] **P514** — In `src/components/StartMenu.jsx`, replace the instant `hover:bg-white/10` on the
      Settings and Power buttons with a `group relative overflow-hidden` button wrapping an
      absolutely-positioned `aria-hidden` background `<span>` (`origin-left scale-x-0` →
      `group-hover:scale-x-100`, `transition-transform duration-200 ease-out` to match the panel's
      own `panelMotion` timing); icon `<img>` gets `relative z-10` to stay above it.
      **Pass condition:** hovering Settings or Power in the browser shows the highlight sliding in
      from the left edge (not an instant snap) and clearing the same way on mouse-leave; both
      buttons' click behavior (opening Settings / toggling the Power flyout) is unchanged;
      `npm run verify` passes.
      _(2026-08-25: P514 itself was confirmed working live — a screenshot Sonny sent showed the
      slide highlight rendering correctly on Power. Follow-up clarified the real ask was bigger:
      match real Windows 11's default Start Menu view, where Settings/Power show icon + text label
      in a wider rail, not an icon-only square — see P515.)_
- [x] **P515** — In `src/components/StartMenu.jsx`, widen the footer rail on desktop only (`isMobile`
      keeps the existing `w-14` icon-only square buttons unchanged, since touch has no hover) to
      `w-40`, and change the Settings/Power buttons to `w-full` rows (`gap-3 px-3 py-2`) with the
      icon plus a `text-sm whitespace-nowrap` label ("Settings" / "Power") next to it; the P514
      sliding highlight `<span>` now covers the full labeled row instead of just the icon square.
      **Pass condition:** on desktop, Settings/Power show icon + text label matching real Windows
      11's default Start Menu row style, with the same hover slide-in highlight now spanning the
      full row; on mobile the buttons are unchanged (icon-only); `npm run verify` passes.
      _(2026-08-25: found marked `[x]` but the code on disk didn't match this spec — a prior
      uncommitted edit had the label hidden until hover (button grew `w-9` → `hover:w-40`) instead
      of always-visible on desktop, and the rail never widened. First rewrote it to match this
      written spec (permanent `w-40` label row + sliding highlight span) — but Sonny then supplied
      two real Windows 11 screenshots (default = icon-only Settings/Power, hover = the button
      itself expanding to icon+label) proving this task's own written spec was wrong, not the
      original code: real Windows 11 keeps the rail icon-only at rest and only reveals the label
      on hover, it doesn't show the label permanently. Reverted to the `w-9`→`hover:w-40`
      expanding-button technique (icon-only `h-9 w-9`, `absolute z-20` so the hover-expand
      overlays instead of widening the rail, `overflow-hidden` clipping the label text until
      hover). Verified live with Playwright screenshots against both references: default state
      icon-only, hover expands to icon+label with a dark background, matches exactly. Also caught
      and fixed a real bug this exposed — `StartMenuPowerFlyout`'s `z-10` sat below the expanding
      Power button's `z-20`, so clicking Power (which requires hovering it) rendered the button on
      top of "Shut down"; bumped the flyout to `z-30`. `npm run verify` passes.)_
      _(2026-08-25 continued: per-button expand still looked like a floating rounded "pill" popping
      over the app list instead of an integrated Fluent-style panel. Sonny supplied a third
      reference showing the *whole* footer rail expanding together as one flush, flat-highlighted
      column (icon+label for both Settings and Power revealed simultaneously, individual row
      highlighted per-hover) — rebuilt around a single `group` rail: static `w-14` spacer child
      (preserves layout so the app-list/recently-used columns never shift) plus a real rail
      `absolute inset-y-0 left-0 z-30 ... hover:w-[340px]` overlay containing both buttons, each
      just `opacity-0 group-hover:opacity-100` for its label (no per-label width/max-width clip —
      an earlier `max-w-0` attempt double-clipped against the rail's own edge and produced a visible
      seam, per Sonny's "should be seamless" note; opacity-only avoids a second moving edge). First
      pass expanded only to `w-40`/`w-48`, which was narrower than the app-list's actual text width
      and let list entries bleed through past the overlay's right edge; reserving that width
      permanently in the layout (widening the static spacer) stopped the bleed but forced app-list
      entries onto two lines even at rest, so per Sonny that reserve was reverted — instead the
      overlay's hover width was extended to `340px`, matching exactly where the "Recently used"
      column begins (`760px` panel − `420px` desktop recent-column = `340px`), fully overlaying the
      app list with zero bleed and no permanent-reserve cost; the `border-l` between the app-list
      and "Recently used" columns was also dropped per Sonny. Verified live via Playwright
      screenshots at rest, mid-transition, hovered, and
      with the Power flyout open (still opens above the overlay, `z-30` still wins). `npm run verify`
      passes.)_

---

## PHASE 84 — TERMINAL: REAL ICON, FRAMELESS CLOSE BUTTON, START MENU/SEARCH/TASKBAR ENTRY

_Sonny supplied `src/assets/icons/terminal icon.png` and a reference screenshot of real
`cmd.exe`, asking for: that icon on the terminal window (replacing the `>_` text glyph), the
close button styled like the reference (permanently red, not just on hover — confirmed with
Sonny), and Terminal made discoverable from the Start Menu app list, the Search modal, and a new
pinned taskbar icon between Settings and Store. Confirmed with Sonny: Start Menu/Search Modal both
read from the single `desktopIcons.js` list that also drives the desktop icon grid, so making
Terminal appear there without also adding an unwanted 14th desktop icon needed a small
`hideFromDesktop` exclusion flag — he chose no desktop icon._

- [x] **P515** — Add `terminal` to `src/assets/icons/index.js`'s `iconImages` map (importing
      `./terminal icon.png`).
      **Pass condition:** `npm run verify` passes.
- [x] **P516** — Add a `terminal` entry (`label: 'Command Prompt'`, `icon: '>_'`, `sizeKB: 289`,
      `hideFromDesktop: true`) to `src/data/desktopIcons.js`; in `src/components/Desktop.jsx`,
      filter `hideFromDesktop` icons out of the desktop-grid's `sortedIcons` only (Start Menu and
      Search Modal keep reading the full unfiltered list, so Terminal appears there); remove the
      now-redundant `w.id === 'terminal'` label/icon fallback branches in the taskbar
      `openWindows` mapping (the new `desktopIcons` entry makes them dead code).
      **Pass condition:** Terminal shows in the Start Menu's alphabetical app list and is
      searchable in the Search modal; no "Command Prompt" icon appears on the desktop; `verify`
      passes.
- [x] **P517** — In `src/utils/filterApps.js`, also match a query against `app.id` (not just
      `app.label`), so typing "terminal" finds "Command Prompt".
      **Pass condition:** typing "terminal" in the Search modal surfaces Command Prompt; `verify`
      passes.
- [x] **P518** — In `src/components/Desktop.jsx`, replace the terminal `<Window>`'s `icon=">_"`
      with `<AppGlyph id="terminal" icon=">_" className="h-4 w-4" />` (the real PNG, matching how
      every other icon-bearing surface resolves through `iconImages`).
      **Pass condition:** the terminal window's title bar shows the real terminal icon instead of
      the `>_` text glyph; `npm run verify` passes.
- [x] **P519** — In `src/components/Taskbar.jsx`, add a `terminal`/`Command Prompt`/`>_` entry
      to `pinnedTaskbarApps`, between the `settings` and `store` entries.
      **Pass condition:** a pinned terminal icon sits in the taskbar between Settings and Store
      and opens the terminal window on click; `npm run verify` passes.
- [x] **P520** — In `src/components/Window.jsx`, change the `square` variant's close button from
      hover-only red (`hover:bg-red-600 hover:text-white`) to permanently red
      (`bg-red-600 text-white hover:bg-red-700`), matching the real Command Prompt reference
      screenshot; minimize/maximize stay bare glyphs with their existing hover highlight, no
      borders on any of the three (non-`square` windows are unaffected).
      **Pass condition:** the terminal window's close button is solid red at rest, not just on
      hover; every other window's close button is unchanged; `npm run verify` passes.

---

## PHASE 85 — TERMINAL POLISH: BLINKING CURSOR, ACTIVE-FOCUS, CHROME MATCHING REAL CMD.EXE

_Sonny compared a live screenshot of our terminal against the real Windows cmd.exe side by side
and asked for closer chrome matching, plus a real terminal-style caret. He corrected P520 (Phase
84): the close button should go back to red-on-hover only, not permanently red — the reference
screenshot that looked permanently red was just captured mid-hover._

- [x] **P521** — In `src/components/Window.jsx`, revert the `square` close button to hover-only
      red (`hover:bg-red-600 hover:text-white`, dropping the permanent `bg-red-600 text-white`
      from P520); make all three `square` caption buttons flush to the title bar's top/right/
      bottom edges with zero gap (full-height buttons, no outer padding on that side) instead of
      floating with a margin from the border; reduce the `square` title bar from `h-10` to `h-9`
      (~10% shorter).
      **Pass condition:** hovering the terminal's close button turns it red, not-hovering shows no
      red; the close button sits flush against the top-right corner with no visible gap; the
      title bar is visibly shorter than before; every non-`square` window is unchanged;
      `verify` passes.
- [x] **P522** — In `src/components/TerminalApp.jsx`, add a blinking terminal-style cursor: an
      invisible real `<input>` (`text-transparent caret-transparent`, absolutely positioned) keeps
      handling all keystrokes, while a mirrored `<span>` underneath renders the same text plus a
      `.terminal-cursor` blinking `_` (new `@keyframes terminal-cursor-blink` in `src/index.css`,
      hard on/off, no cursor while `loadingLine !== null`); accept a new `isActive` prop and
      `useEffect(() => { if (isActive) inputRef.current?.focus() }, [isActive])` so switching back
      to an already-open terminal window refocuses typing without needing a click inside its body;
      wire `isActive={index === openWindows.length - 1 && !w.isMinimized}` from
      `src/components/Desktop.jsx`'s real terminal instance.
      **Pass condition:** the cursor blinks after the prompt when empty and right after typed text
      (e.g. `/help_`); it disappears during the ~1s open-command loading animation; bringing the
      terminal window to the front refocuses the input with no extra click; `npm run verify`
      passes.
- [x] **P523** — Add a `.scrollbar-classic` utility to `src/index.css` (boxy, square-cornered,
      gray-on-dark, no rounded thumb — unlike this project's existing rounded scrollbar utilities)
      and apply it to the terminal's scrollable console `<div>` in `TerminalApp.jsx`, approximating
      classic Windows console scrollbar styling (note: `::-webkit-scrollbar-button` can only be
      given a solid background, not an arrow glyph, via plain CSS).
      **Pass condition:** `npm run verify` passes; scrolling the terminal after enough output shows
      the boxy gray scrollbar instead of the browser default.

---

## PHASE 86 — TERMINAL: FOCUS ON ANY CLICK, NOT JUST THE INPUT'S OWN AREA

_Sonny reported that only clicking the exact invisible input area let him type — clicking the
title bar, or other parts of the console body, didn't. Root cause: calling `inputRef.focus()`
inside `onMouseDown` worked for an instant, but the browser's own default mousedown behavior (blur
the current focus, since the actual click target — a `<span>`/title-bar `<div>` — isn't itself
focusable) ran right after and undid it. Fix is `event.preventDefault()` on the mousedown before
calling `.focus()`, which stops that default un-focus step without affecting anything else
(confirmed live: window dragging via the title bar still works)._

- [x] **P524** — In `src/components/TerminalApp.jsx`, add `e.preventDefault()` before
      `inputRef.current?.focus()` in the console body's `onMouseDown`.
      **Pass condition:** clicking anywhere in the console body (boot text, blank space, existing
      output) focuses the input and typing lands in it; verified live; `npm run verify` passes.
- [x] **P525** — Convert `TerminalApp` to `forwardRef` with `useImperativeHandle` exposing a
      `focus()` method; in `src/components/Desktop.jsx`, add a `terminalHandleRef`, pass it as
      `ref` to the real `<TerminalApp>` instance, and override that window's `onFocus` prop to
      call `e.preventDefault()`, the original `shared.onFocus()` (bring-to-front), and
      `terminalHandleRef.current?.focus()` — since `Window.jsx`'s outer wrapper already fires
      `onFocus` via `onMouseDownCapture` for a mousedown anywhere in the window, including the
      title bar, which `TerminalApp`'s own body-level handler can't reach.
      **Pass condition:** clicking the terminal's title bar while it's already the active window
      focuses the input and typing lands in it; dragging the window by its title bar still works;
      `npm run verify` passes.

---

## PHASE 87 — START MENU: POWER FLYOUT WIDTH ALIGNMENT + ICONS

_Sonny reported the Sleep/Restart/Shut down flyout shown on clicking Power in the Start Menu's
footer rail looked misaligned next to a genuine Windows 10 reference screenshot — it renders at a
fixed 144px width instead of tracking the rail's hover-expanded width, leaving a visible gap and
reading as a separate, narrower floating box instead of a flush continuation of the rail. Mid-task
he also supplied a reference image of moon/power/restart glyphs and asked for matching icons on
each option, which were previously bare text rows._

- [x] **P526** — In `src/components/StartMenu.jsx`, change `StartMenuPowerFlyout`'s className
      (line 36) from a fixed `w-36 left-2` to `inset-x-0`, so the flyout always spans 100% of its
      positioned ancestor (the footer rail)'s current width instead of a hardcoded 144px. Also add
      three new line-icon components (`src/components/icons/MoonIcon.jsx`, `RestartIcon.jsx`,
      `PowerIcon.jsx`, matching the existing `WifiIcon.jsx`/`SpeakerIcon.jsx`/`SunIcon.jsx`
      `currentColor`-stroke convention) and render one beside each flyout option's label, keyed via
      a `POWER_OPTIONS` array of `{ label, Icon }` instead of the old bare string array.
      **Pass condition:** hovering the footer rail so it expands, then clicking Power, shows the
      Sleep/Restart/Shut down flyout spanning the same width as the expanded rail (flush left/
      right edges matching the Settings/Power rows), each option prefixed with its matching icon;
      `npm run verify` passes; confirmed live via Playwright screenshot.

---

## PHASE 88 — START MENU: DEFAULT RECENTLY USED APPS

_Sonny asked for the Start Menu's "Recently used" tile grid to ship with 6 default apps instead of
showing the empty "Apps you open will show up here." state on first load — matching real Windows
11, which seeds Recommended with a few defaults rather than starting blank._

- [x] **P527** — Add `DEFAULT_RECENT_APP_IDS` (`resume`, `projects`, `blog`, `store`, `games`,
      `terminal`) to `src/utils/recentApps.js`; initialize `Desktop.jsx`'s `recentAppIds` state
      with it instead of `[]`. Still in-memory only/unpersisted (P464-465 design), and still
      overridden by real usage the moment an app is opened (`addRecentAppId` still dedupes/
      reorders/caps at 6).
      **Pass condition:** opening the Start Menu with no apps yet opened shows the 6 default tiles;
      opening any app moves it to the front and the list stays capped at 6; `npm run verify` passes.

---

## PHASE 89 — START MENU: POWER FLYOUT SQUARE CORNERS + HOVER-OUT CLOSE

_Sonny asked for square (not rounded) corners on the Power flyout, then caught a real bug live:
moving the mouse off the rail while the flyout was open left a clipped, garbled sliver of it
behind (the rail's real CSS `:hover` had collapsed back to 56px, independent of the flyout's own
open/closed React state, so `overflow-hidden` cut it down) — the exact failure mode noted as a
risk in P526 but not fixed there since it only reproduces by actually moving the mouse away, not
by clicking._

- [x] **P528** — In `src/components/StartMenu.jsx`: drop `rounded-lg`/`rounded` from
      `StartMenuPowerFlyout`'s container/buttons (square corners); force the footer rail's width to
      `w-[340px]` whenever `isPowerOpen` is true instead of relying only on `hover:w-[340px]`, so it
      can never be narrower than the flyout while open; add
      `onMouseLeave={() => setIsPowerOpen(false)}` on the rail so moving the mouse off it closes
      the flyout instead of leaving it clipped.
      **Pass condition:** flyout corners are square; clicking Power then moving the mouse fully off
      the rail closes the flyout cleanly (no clipped/garbled remnant); confirmed live via Playwright
      screenshots before/after mouse-out; `npm run verify` passes.

---

## PHASE 90 — POWER BUTTON ACTIONS: RESTART, SLEEP, SHUT DOWN

_Sonny wants the Power flyout's Sleep/Restart/Shut down buttons to actually do something: fade the
screen out, hold on black, then either return to the boot loading video (Restart, and Sleep after
an Esc "wake up" prompt) or attempt to close the tab (Shut down — browsers only allow
`window.close()` on a script-opened tab, so a real visitor's tab won't actually close; a static
fallback message covers that case). Split into three small increments: .a stands up the shared
plumbing (Start Menu → Taskbar → Desktop → App wiring, plus a new `PowerTransitionOverlay.jsx`
doing a generic fade-then-return-to-boot, which is already the complete Restart behavior); .b adds
Sleep's Esc-to-wake branch; .c adds Shut down's close-attempt/fallback branch. Each is independently
verifiable live._

- [x] **P529.a** — New `src/components/PowerTransitionOverlay.jsx` (`{ action, onComplete }`
      props): `fixed inset-0 z-50 bg-black` shell, a `framer-motion` div fading opacity 0→1 over
      ~500ms, then (for any `action`) holding until ~3000ms total elapsed before calling
      `onComplete()`. Wire it up: `StartMenu.jsx`'s `POWER_OPTIONS` gains an `action` id per entry
      (`sleep`/`restart`/`shutdown`), the flyout's button `onClick` passes it through, `StartMenu`
      gains an `onPowerAction` prop called after closing the menu; `Taskbar.jsx` forwards
      `onPowerAction` to `StartMenu`; `Desktop.jsx` adds `powerAction` state, passes
      `onPowerAction={setPowerAction}` to `Taskbar`, and renders
      `{powerAction && <PowerTransitionOverlay action={powerAction} onComplete={onExitToBoot} />}`;
      `App.jsx` passes `onExitToBoot={() => setPhase('boot')}` to `<Desktop />`.
      **Pass condition:** clicking Restart in the Power flyout fades the live desktop to black over
      ~500ms, holds black to ~3s total, then shows the boot loading video screen again; confirmed
      live via Playwright; `npm run verify` passes.
- [x] **P529.b** — In `PowerTransitionOverlay.jsx`, add the `sleep` branch: after the fade, wait
      ~2000ms then fade in "Press Esc to wake up" (styled like `StartupLoadingScreen`'s existing
      "Click anywhere to continue" hint), and attach a `keydown` listener (mirroring the pattern in
      `Desktop.jsx`) so **Esc** calls `onComplete()` at any point once the screen is black.
      **Pass condition:** clicking Sleep fades to black, shows "Press Esc to wake up" after the
      delay, and pressing Esc returns to the boot loading screen; confirmed live via Playwright;
      `npm run verify` passes.
- [x] **P529.c** — In `PowerTransitionOverlay.jsx`, add the `shutdown` branch: after the fade, show
      a placeholder "Shutting down…" message for ~3000ms, call `window.close()`, and if the tab is
      still alive shortly after, show a static "You can close this tab now" fallback line and stop
      (no `onComplete()` call — matches the "PC is off" metaphor with no way back short of
      reloading the page).
      **Pass condition:** clicking Shut down fades to black, shows the placeholder, then shows the
      fallback message (since the close attempt is expected to be blocked in this test environment
      too); confirmed live via Playwright; `npm run verify` passes.

---

## PHASE 91 — FLUSH CAPTION BUTTONS ON EVERY WINDOW

_Sonny asked for every window's minimize/maximize/close buttons to get the same "seamless"
(flush-to-the-edge, no border-radius, no gap) treatment Command Prompt already had via
`Window.jsx`'s `square` variant — the classic Win32 titlebar look, vs. the small rounded floating
buttons every other window used. Split by file since each is an independent, self-contained edit._

- [x] **P530** — In `src/components/Window.jsx`, make the caption-button _shape_ unconditional
      (drop the `square` ternary for the title bar's padding, the button-group wrapper, and each
      button's size/border-radius — always `pl-3` with no right/vertical padding, always
      `flex h-full items-stretch` wrapper, always `flex h-full w-9 items-center justify-center`
      buttons). Keep the `square` ternary only for hover color (Terminal's light title bar needs
      dark hover overlays; every other window's dark title bar needs light ones) and for the frame
      theme (rounded-lg/accent-border vs. square/black), which are unchanged.
      **Pass condition:** every window that renders through `Window.jsx` (Projects, Store, Games,
      Settings, Gmail, Contact Info, Paint, Visitor Arts, Memory Wall, Music Lab, This PC,
      Developer Lab, the fallback window) now has flush, square-cornered caption buttons matching
      Command Prompt's; `npm run verify` passes.
- [x] **P531** — In `src/components/ResumeWindow.jsx` (hand-rolled title bar, not `Window.jsx`):
      restyle the existing Minimize/Close buttons to the same flush/square shape, and add a real
      Maximize/Restore button (`isMaximized` state, glyph swap, `positionClasses` gains a
      maximized branch — `fixed inset-x-0 top-0 bottom-12` on desktop, filling the desktop area
      above the 48px taskbar — leaving the existing centered `w-[420px]` box as the restored state
      and mobile's always-fullscreen behavior untouched).
      **Pass condition:** Resume's title bar has 3 flush, square-cornered buttons; Maximize fills
      the desktop area above the taskbar and Restore returns it to its centered size;
      `npm run verify` passes.
- [x] **P532** — In `src/components/zoomChat/ZoomChatHeader.jsx` (hand-rolled title bar, not
      `Window.jsx`): same flush/square restyle for its existing Minimize/Maximize/Close buttons
      (drop `rounded-full`, drop the gap, go full-height); also switch Close's hover to
      `hover:bg-red-500/80` (it previously shared the generic white hover with Minimize/Maximize)
      to match the red-on-hover affordance every other window's close button already has.
      **Pass condition:** Zoom Chat's caption buttons are flush and square-cornered with a
      red-hover Close, matching the rest of the app; `npm run verify` passes.
- [x] **P533** — Sonny clarified "make their edges pointed" meant the window frames themselves,
      not just the caption buttons: drop `rounded-lg` from `Window.jsx`'s default (non-`square`)
      frame className and from `ResumeWindow.jsx`'s frame className, so every window's outer
      corners are square like Command Prompt's, not just its buttons.
      **Pass condition:** no window (Projects, Store, Resume, Zoom Chat, etc.) has rounded outer
      corners any more; `npm run verify` passes.

Blog's window was left out of scope — its minimize/maximize/restore controls live inside a
dropdown menu (`BlogUserMenu`, opened from the avatar in `BlogTopNav`), not as a visible
caption-button row, so there was nothing there resembling the Command Prompt pattern to restyle.

---

## PHASE 92 — REMOVE THE SECOND ("SIGNING IN") LOADING SCREEN

_Sonny swapped in a new boot video (`startup screen(1).mp4`, replacing `loading-screen-v2.mp4`)
and then asked to remove the second loading screen entirely — clicking Sign In on the boot video
was jumping into a separate `SigningInScreen` video before finally reaching the desktop; he wants
clicking straight through to the desktop instead, with nothing to accidentally jump into._

- [x] **P534** — In `src/App.jsx`, drop the `'signing-in'` phase branch and its `SigningInScreen`
      import; `StartupLoadingScreen`'s `onSignIn` now calls `setPhase('desktop')` directly instead
      of `setPhase('signing-in')`. Delete the now-dead `src/components/startup/SigningInScreen.jsx`
      and its video asset `src/components/startup/assets/loading-screen-2.mp4` (confirmed nothing
      else imports either).
      **Pass condition:** clicking Sign In on the boot video goes straight to the desktop with no
      second video in between; confirmed live via Playwright (video count is 0 and the taskbar's
      Start button is visible immediately after the click); `npm run verify` passes.

---

## PHASE 93 — BOOT VIDEO: MID-PLAYBACK SIGN-IN GATE, PLAYS INSTANTLY

_Sonny wants the boot video to pause exactly where the "Sign in" button appears on screen (8.2s
into `startup screen(1).mp4`), require a click on that specific button area (not anywhere on
screen) to continue, and the video to start playing immediately with no visible "click to
continue" prompt at any point — including the pre-existing autoplay-blocked fallback, which
previously required a click before anything played at all._

- [x] **P535** — In `src/components/startup/StartupLoadingScreen.jsx`: add an `onTimeUpdate`
      handler that pauses the video the first time `currentTime` crosses `PAUSE_AT_S = 8.2` and
      sets `isPausedForClick`; render a `Sign in`-labeled button positioned/sized to the actual
      button graphic in the video frame (measured via a canvas pixel scan of the paused frame:
      `top-[57.5%] left-[45.5%] h-[4%] w-[9%]`, replacing the old, differently-calibrated
      coordinates left over from the removed P534 button) whose `onClick` resumes playback; remove
      the "Click anywhere to continue" hint text and whole-screen resume-click entirely — the
      resume gesture is now scoped to that one button. `onEnded`/`onError`/a 10s safety timeout
      (reset via a new `onPause` handler so it doesn't fire mid-pause) all call the same `finish()`
      (wrapped in `useCallback` to satisfy `exhaustive-deps`) straight into `onSignIn`, so nothing
      else is needed at the end of the video.
      **Pass condition:** the video pauses within a frame or two of 8.2s; clicking anywhere other
      than the Sign in button does nothing; clicking the button resumes playback and the video
      plays through to the desktop with no further prompt; confirmed live via Playwright, including
      a canvas pixel scan proving the button's measured bounds actually match the video's visible
      button graphic; `npm run verify` passes.
- [x] **P536** — In `src/components/startup/useUnmutedAutoplay.js`: when the initial unmuted
      `play()` is rejected (the browser's autoplay-without-gesture block), fall back to playing
      **muted** immediately (browsers always allow muted autoplay) instead of leaving the video
      frozen waiting for a click; add an `unmute()` export, called from
      `StartupLoadingScreen.jsx`'s screen-click and Sign-in-button-click handlers, so sound is
      restored transparently on the first real user gesture instead of requiring a dedicated
      "click to continue" prompt.
      **Pass condition:** with no user interaction at all, the video's `currentTime` is already
      advancing within ~1.5s of page load (`muted: true`); after the Sign in button click,
      `muted: false`; confirmed live via Playwright with zero clicks before the pause point;
      `npm run verify` passes.
- [x] **P537** — Sonny corrected P536: he doesn't want the muted-autoplay fallback at all — real
      audio matters more than guaranteed instant playback. Reverted
      `useUnmutedAutoplay.js`/`StartupLoadingScreen.jsx` to only ever attempt unmuted `play()`
      (dropping the `video.muted = true` fallback branch and the now-unused `unmute()` export/
      calls); if a browser blocks that, the video simply waits for any click (silently, no visible
      prompt, per the earlier "no click anywhere to continue text" request) rather than starting
      muted.
      **Pass condition:** the video's `muted` property is `false` at every point, including before
      any click, confirmed live via Playwright; `npm run verify` passes.
- [x] **P538** — Swapped in Sonny's final boot video (`startup video final.mp4`, from
      `src/components/windows startup/assets/`, replacing
      `src/components/startup/assets/loading-screen-v2.mp4`, same filename so no import changes
      needed) — confirmed H.264 (`avc1`) via the byte-scan technique from the earlier video-swap
      lesson. Same underlying Sign In screen content as the previous export (identical measured
      button color/bounds), but a different trim: the boot-logo → Sign In cut now happens between
      7.40s–7.50s instead of ~8.2s, found by seeking `video.currentTime` directly across the new
      11.517s duration and screenshotting until the frame flipped. Updated
      `StartupLoadingScreen.jsx`'s `PAUSE_AT_S` from `8.2` to `7.5`; left the Sign
      in button's `top-[57.5%] left-[45.5%] h-[4%] w-[9%]` bounds unchanged since the canvas pixel
      scan reproduced the exact same color-transition percentages as before.
      **Pass condition:** video plays immediately unmuted (or silently waits for a click if
      blocked, never muted); pauses cleanly within a frame or two of 7.5s on a fully-settled Sign
      In frame; only the Sign in button area resumes it (confirmed an off-target click during the
      pause does nothing); resumes unmuted and continues straight to the desktop; confirmed live
      via Playwright end-to-end; `npm run verify` passes.
- [x] **P539** — Sonny re-exported `startup video final.mp4` (same source folder, file shrank from
      ~19.6MB to ~16.8MB — a re-encode, not new content) and asked to reload it. Re-copied over
      `loading-screen-v2.mp4`, re-confirmed H.264, and re-measured from scratch rather than
      assuming the re-encode kept identical timing: duration is still 11.517s and the boot-logo →
      Sign In cut still lands between 7.40s–7.50s, so `PAUSE_AT_S` stayed at `7.5`. Re-ran the
      canvas pixel scan for the Sign in button too — same RGB (31,59,183) at the same ~46.0%–54.0%
      / ~57.75%–61.25% boundaries, so the `top-[57.5%] left-[45.5%] h-[4%] w-[9%]` bounds from
      P538 needed no change. No code touched; this was asset-swap + re-verification only.
      **Pass condition:** confirmed live via Playwright — same pass conditions as P538, all still
      hold against the re-encoded file; `npm run verify` passes.
- [x] **P540** — Live-tested (Playwright) whether unmuted autoplay can ever start with zero click,
      including across a reload in the _same_ browser profile after a prior engaged visit — it
      cannot: Chromium blocks unmuted `autoPlay` per page-load regardless of prior interaction on
      that origin, so the video sits on a frozen first frame until any click, every time. Given
      the standing "don't mute the audio" rule (see LESSONS.md's muted-autoplay-fallback entry),
      Sonny chose to keep real audio and add a visible hint instead of muting. Added
      `{needsClickToPlay && <p>Click anywhere to start</p>}` to `StartupLoadingScreen.jsx`,
      bottom-center, `text-sm text-white/70` — shown only while waiting for the very first
      gesture; `retryPlay()` already flips `needsClickToPlay` false synchronously on click, so it
      disappears the instant the video starts. Confirmed it does NOT reappear during the later
      mid-video pause-for-Sign-in gate (P535/P537 stay hint-free, per that explicit instruction).
      **Pass condition:** hint visible before first click, gone immediately after (count 0 in the
      DOM), stays absent through the mid-video pause, off-target clicks during that pause still do
      nothing, Sign in button still resumes and reaches the desktop; zero console errors;
      confirmed live via Playwright; `npm run verify` passes (24/24 test files, 62/62 tests).
- [x] **P541** — Added a hover glow to the invisible Sign in click-target from P538, so hovering
      the exact button area gives visual feedback. Iterated through three passes based on Sonny's
      visual feedback against live screenshots (zoomed crops, not just full-frame): 1. `hover:bg-white/10 hover:shadow-[0_0_18px_6px_rgba(64,120,255,0.6)]` — visible border
      line; the flat `bg-white/10` fill has a hard edge at the `rounded-md` corners that reads
      as a rectangle outline against the softer blurred shadow around it. 2. Removed the fill, widened/softened the shadow to
      `hover:shadow-[0_0_28px_12px_rgba(64,120,255,0.45)]`, and shrank the hit-box itself
      (`h-[3.8%] w-[7.2%]`, down from the P538-calibrated `h-[4%] w-[9%]`) — still a visible
      line, this time INSIDE the button: the shrunk box no longer reached the real video
      button's edges, so the blur bloomed against the button's own darker fill instead of
      outward from its true boundary, reading as an inset ring. 3. Restored the hit-box to the original calibrated `top-[57.5%] left-[45.5%] h-[4%] w-[9%]`
      (matches/slightly exceeds the real button — never shrink it below the P538 pixel-scan
      measurements) and used a smaller blur-only shadow with no spread:
      `hover:shadow-[0_0_14px_rgba(64,120,255,0.4)]`. Zoomed screenshot confirms a clean soft
      outward glow with no hard edge inside or outside the button.
      **Pass condition:** confirmed via Playwright hover + zoomed-crop screenshot on the paused
      Sign In frame — glow is visibly present, borderless, and doesn't intrude into the button's
      own fill; `npm run verify` passes (24/24 test files, 62/62 tests).

---

## Backlog — DO NOT START

Anything here is out of scope until Sonny moves it up.

- Anything listed as "explicitly NOT in v1" in CLAUDE.md §1
- Deployment, CI/CD, monitoring — until v1 runs locally
- Performance optimisation — until something measurably needs it
- Auth, payments, or any third-party integration not in the §2 stack
- Additional dependencies, frameworks, or architectural layers
- **Full live re-theming from Settings > Personalization** — Dark/Light mode still only updates
  selection state (Phase 14, P85); accent color now drives the window frame border (Phase 17,
  P93), but re-skinning the taskbar/icons/everything else to respect accent color or theme mode is
  real follow-up work Sonny confirmed he wants done later, not now.
- **Shared/global arcade leaderboard across all visitors** — Phase 36's leaderboards (P166–P200)
  are localStorage-backed, per-browser only, per Sonny's explicit 2026-08-19 answer. A real
  cross-visitor leaderboard needs a backend + database, which is a new architectural layer banned
  by CLAUDE.md §2 without Sonny's explicit sign-off — he confirmed he wants this "built later," so
  it stays here until he moves it up and approves the stack addition it requires.
- **Cloud database for arcade ratings/comments** — Phase 49's ratings/comments (P237-P244) are
  localStorage-backed, per-browser only, matching the existing scores/plays pattern. Sonny
  explicitly said this is a placeholder and he wants a real cloud database later — that's a new
  architectural layer banned by CLAUDE.md §2 without his explicit sign-off, so it stays here until
  he moves it up and approves the stack addition it requires.

---

## How to write a task

One line. Imperative. Names the exact file(s). ≤50 lines of change. States its own pass condition.

**If you cannot write the pass condition, the task is not defined well enough to start.**

Good: `Add a 300ms debounce to the search input in src/components/SearchBar.jsx. Pass: typing 5 characters fires one request, not five.`

Bad: `Improve search performance.`
