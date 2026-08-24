# TASKS.md — Live Sprint Board (Dynamic)

> **Claude:** work ONLY the first unchecked `[ ]`. Verify. Then flip to `[x]`.
> ≤50 lines of change per task. If it won't fit, split into `.a` / `.b` here FIRST, then do `.a`.
> Never work ahead. Never batch. Never soften a task's wording to make it pass.

**Current task pointer:** `_(Store PDP complete through P403A, including the mobile layout pass (P400) — the local admin portal (P404–P422: backend + local SQLite database + Shopify-styled /admin UI, explicitly approved per CLAUDE.md §2) is now complete and verified live end-to-end; P350's asset cleanup remains deferred as noted below; no new unchecked task follows P422 as of 2026-08-24)_`
**Last verified:** 2026-08-24 — `npm run verify` → PASS (0 errors, 6 pre-existing-pattern warnings, 49 tests); live Playwright confirmed the full PDP flow at 1440px and at a 390px mobile viewport with zero console errors throughout: grid → details navigation, thumbnail hover/tap crossfade, color/size selection, all 3 accordions expanding with lined rows, the Size Chart modal, the bordered buy-box card (including Add to List), the white details background, and the magnifier lens tracking the cursor over the main image
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

- [ ] **P350** — Delete `src/components/startup/SignInScreen.jsx` and the now-unused
      `src/components/startup/assets/sign-in-screen.jpg` /
      `src/components/startup/assets/windows-startup.mp4`; rename the 2 new videos to
      `loading-screen-v2.mp4` and `loading-screen-2.mp4` in that same assets folder.
      **Pass condition:** the old component and its 2 assets no longer exist; the 2 new videos
      exist at their renamed paths; `git status` shows no other files changed.
      _(2026-08-22: `SignInScreen.jsx`, `sign-in-screen.jpg` deleted and both videos renamed;
      `windows-startup.mp4` is still on disk — locked by a running `npm run dev`/browser session
      still holding it open — deletion deferred until that lock clears.)_

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
