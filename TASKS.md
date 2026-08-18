# TASKS.md — Live Sprint Board (Dynamic)

> **Claude:** work ONLY the first unchecked `[ ]`. Verify. Then flip to `[x]`.
> ≤50 lines of change per task. If it won't fit, split into `.a` / `.b` here FIRST, then do `.a`.
> Never work ahead. Never batch. Never soften a task's wording to make it pass.

**Current task pointer:** `_(Phase 24 complete — awaiting Sonny for next steps)_`
**Last verified:** 2026-08-18 — `npm run verify` → PASS
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

---

## How to write a task

One line. Imperative. Names the exact file(s). ≤50 lines of change. States its own pass condition.

**If you cannot write the pass condition, the task is not defined well enough to start.**

Good: `Add a 300ms debounce to the search input in src/components/SearchBar.jsx. Pass: typing 5 characters fires one request, not five.`

Bad: `Improve search performance.`
