# TASKS.md — Live Sprint Board (Dynamic)

> **Claude:** work ONLY the first unchecked `[ ]`. Verify. Then flip to `[x]`.
> ≤50 lines of change per task. If it won't fit, split into `.a` / `.b` here FIRST, then do `.a`.
> Never work ahead. Never batch. Never soften a task's wording to make it pass.

**Current task pointer:** `_(Phase 10 complete — awaiting Sonny for next steps)_`
**Last verified:** 2026-08-17 — `npm run verify` → PASS
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

## Backlog — DO NOT START

Anything here is out of scope until Sonny moves it up.

- Anything listed as "explicitly NOT in v1" in CLAUDE.md §1
- Deployment, CI/CD, monitoring — until v1 runs locally
- Performance optimisation — until something measurably needs it
- Auth, payments, or any third-party integration not in the §2 stack
- Additional dependencies, frameworks, or architectural layers

---

## How to write a task

One line. Imperative. Names the exact file(s). ≤50 lines of change. States its own pass condition.

**If you cannot write the pass condition, the task is not defined well enough to start.**

Good: `Add a 300ms debounce to the search input in src/components/SearchBar.jsx. Pass: typing 5 characters fires one request, not five.`

Bad: `Improve search performance.`
